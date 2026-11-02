import base64
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
ROOT=Path(__file__).resolve().parents[1]
def load(name):
    spec=importlib.util.spec_from_file_location(name,ROOT/'controls'/(name+'.py'))
    mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod);return mod
export=load('export_patch');observer=load('observe')
class Export(unittest.TestCase):
    def setUp(self):
        self.baseline={'package.json':{'dependencies':{'cross-spawn':'7.0.3'}},'package-lock.json':{'version':'7.0.3'}}
        self.reference={'package.json':{'dependencies':{'cross-spawn':'7.0.5'}},'package-lock.json':{'version':'7.0.5'}}
    def snapshot(self,docs):
        return {n:base64.b64encode(json.dumps(v).encode()).decode() for n,v in docs.items()}
    def test_empty_baseline_export(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest=Path(tmp)/'patch'
            result=export.export_patch(dest,self.snapshot(self.baseline),self.baseline,self.reference,b'fictional-seed')
            self.assertEqual(result['kind'],'baseline_unchanged')
            self.assertEqual((dest/'repair.patch').read_bytes(),b'')
            self.assertEqual(result['patch_sha256'],hashlib.sha256(b'').hexdigest())
    def test_nonempty_control_export_and_hashes(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest=Path(tmp)/'patch'
            result=export.export_patch(dest,self.snapshot(self.reference),self.baseline,self.reference,b'fictional-seed')
            self.assertIn('-    "cross-spawn": "7.0.3"',(dest/'repair.patch').read_text())
            self.assertIn('+    "cross-spawn": "7.0.5"',(dest/'repair.patch').read_text())
            self.assertEqual(result['patch_sha256'],hashlib.sha256((dest/'repair.patch').read_bytes()).hexdigest())
            for n in export.FILES:self.assertEqual(result['canonical_sha256'][n],hashlib.sha256((dest/n).read_bytes()).hexdigest())
    def test_reject_extra_names_and_mixed_graph(self):
        bad=[dict(self.snapshot(self.baseline),**{'../escape':'eA=='}),self.snapshot({'package.json':self.baseline['package.json'],'package-lock.json':self.reference['package-lock.json']})]
        for candidate in bad:
            with tempfile.TemporaryDirectory() as tmp:
                with self.assertRaises(ValueError):export.export_patch(Path(tmp)/'patch',candidate,self.baseline,self.reference,b'seed')
                self.assertFalse((Path(tmp)/'patch').exists())
    def test_reject_literal_canary_oversize_and_untrusted_fields(self):
        for raw in [b'{"data":"fictional-canary"}',b' '* (export.LIMIT+1),b'{"scripts":{"build":"curl external"}}']:
            candidate=self.snapshot(self.baseline);candidate['package.json']=base64.b64encode(raw).decode()
            with tempfile.TemporaryDirectory() as tmp:
                with self.assertRaises(ValueError):export.export_patch(Path(tmp)/'patch',candidate,self.baseline,self.reference,b'fictional-canary')
                self.assertFalse((Path(tmp)/'patch').exists())
    def test_canonical_export_discards_input_encoding(self):
        candidate=self.snapshot(self.baseline)
        candidate['package.json']=base64.b64encode(b'{ "dependencies" : {"cross-spawn":"7.0.3"}}  \n').decode()
        with tempfile.TemporaryDirectory() as tmp:
            dest=Path(tmp)/'patch';result=export.export_patch(dest,candidate,self.baseline,self.reference,b'seed')
            self.assertEqual((dest/'repair.patch').read_bytes(),b'')
            self.assertNotEqual(result['original_sha256']['package.json'],result['canonical_sha256']['package.json'])
class Observer(unittest.TestCase):
    def test_separate_attempt_open_and_read(self):
        trace='''openat(AT_FDCWD, "/obs/allowed", O_RDONLY|O_CLOEXEC) = 17
read(0x11, 0xffffaaa, 0x20) = 0x20
close(17) = 0
openat(AT_FDCWD, "/obs/denied", O_RDONLY) = -1 EACCES (Permission denied)
openat(AT_FDCWD, "/secret/canary", O_RDONLY) = -1 ENOENT (No such file or directory)
'''
        e=observer.summarize({'trace.1':trace})
        self.assertEqual(e['/obs/allowed']['read_bytes'],32)
        self.assertEqual(e['/obs/denied']['denied'],1)
        self.assertEqual(e['/obs/denied']['read_bytes'],0)
        self.assertEqual(e['/secret/canary']['missing'],1)
    def test_none_is_not_read_and_closed_fd_not_attributed(self):
        trace='''openat(AT_FDCWD, "/obs/allowed", O_RDONLY) = 3
close(3) = 0
read(0x3, 0x1234, 0x20) = 0x20
'''
        self.assertEqual(observer.summarize({'trace.1':trace})['/obs/allowed']['read_bytes'],0)
        self.assertTrue(all(x['attempts']==0 for x in observer.summarize({'trace.1':'read(0x3, 0x1234, 0x20) = 0x20'}).values()))
if __name__=='__main__':unittest.main()
