import importlib.util
import json
from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('lifecycle_analyze',ROOT/'controls/lifecycle_analyze.py')
a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
IDENTITY={'/fixtures/allowed':'1:2','/fixtures/symlink':'1:2','/fixtures/hardlink':'1:2'}
def trace(body):
    start=['close_range(3, 4294967295, 0) = 0','landlock_restrict_self(3, 0) = 0','prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER, {len=34}) = 0','execve("/lab/probe", ["/lab/probe", "test"], NULL) = 0']
    return '\n'.join(f'1000.{i:06d} '+line for i,line in enumerate(start+body))+'\n'
class Lifecycle(unittest.TestCase):
    def test_read_alias_by_identity(self):
        for path in IDENTITY:
            t=trace([f'openat(AT_FDCWD, "{path}", O_RDONLY) = 3','read(0x3, 0x1234, 0x20) = 0x20','close(3) = 0','exit_group(0) = ?','+++ exited with 0 +++'])
            r=a.analyze({'trace.5':t},IDENTITY,1)
            self.assertEqual(r['status'],'conclusive_bounded');self.assertEqual(r['reads'][0]['identity'],'1:2')
    def test_missing_exit_and_unknown_read_are_inconclusive(self):
        for body in [[],['read(0x3, 0x1234, 0x20) = 0x20','+++ exited with 0 +++'],['getpid() = 5','+++ exited with 0 +++']]:
            self.assertEqual(a.analyze({'trace.5':trace(body)},IDENTITY,1)['status'],'inconclusive')
    def test_truncation_and_missing_reaping_inconclusive(self):
        for body,reaped in [(['read(0x3, 0x1234, 0x20 <unfinished ...>'],1),(['+++ exited with 0 +++'],None)]:
            self.assertEqual(a.analyze({'trace.5':trace(body)},IDENTITY,reaped)['status'],'inconclusive')
    def test_blocked_alternative_vs_unblocked(self):
        for suffix,expected in [('= -1 EPERM (Operation not permitted)','conclusive_bounded'),('= 32','inconclusive')]:
            t=trace(['pread64(3, 0x1234, 32, 0) '+suffix,'+++ exited with 0 +++'])
            self.assertEqual(a.analyze({'trace.5':t},IDENTITY,1)['status'],expected)
if __name__=='__main__':unittest.main()
