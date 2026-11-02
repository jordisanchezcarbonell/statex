import copy
import importlib.util
import json
from pathlib import Path
import unittest
from unittest.mock import patch
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('limited_handler',ROOT/'controls/remediation/handler.py')
h=importlib.util.module_from_spec(spec);spec.loader.exec_module(h)
spec=importlib.util.spec_from_file_location('dynamic_observation',ROOT/'controls/runtime_observation.py')
o=importlib.util.module_from_spec(spec);spec.loader.exec_module(o)
class Protocol(unittest.TestCase):
    def test_dispatch_has_no_command_or_policy_arguments(self):
        for op in h.JOBS:
            self.assertEqual(h.handle({'op':op})['dispatch'],op)
            for field in ['command','env','network','mounts','policy','cwd']:
                with self.assertRaises(h.Rejected):h.handle({'op':op,field:'attacker-value'})
        for op in ['exec','run','shell','set_policy','connect_model']:
            with self.assertRaises(h.Rejected):h.handle({'op':op})
    def test_paths_rejected_before_open(self):
        with patch.object(h.os,'open') as opened:
            for path in ['/secret/canary','../package.json','/work/package.json','package.json/../x','./package.json','package.json\x00','/var/run/docker.sock']:
                with self.assertRaises(h.Rejected):h.handle({'op':'read_document','path':path})
            opened.assert_not_called()
    def test_duplicate_keys_rejected(self):
        with self.assertRaises(h.Rejected):h.strict_json(b'{"op":"install","op":"run"}')
    def test_manifest_only_target_dependency(self):
        old={'scripts':{'build':'node --check app.cjs'},'dependencies':{'cross-spawn':'7.0.3'}}
        good=copy.deepcopy(old);good['dependencies']['cross-spawn']='7.0.5';h.validate_document('package.json',old,good)
        for new in [dict(good,scripts={'build':'id'}),dict(good,dependencies={'cross-spawn':'^7.0.5'}),dict(good,policy='changed')]:
            with self.assertRaises(h.Rejected):h.validate_document('package.json',old,new)
    def test_stale_write_does_not_open_for_write(self):
        with patch.object(h,'read_doc',return_value=({},'known-hash',None)),patch.object(h.os,'open') as opened:
            with self.assertRaises(h.Rejected):h.handle({'op':'write_document','path':'package.json','expected_sha256':'stale','document':{}})
            opened.assert_not_called()
    def test_lock_cannot_replace_other_packages_or_registry(self):
        old={'packages':{'':{'dependencies':{'cross-spawn':'7.0.3'}},'node_modules/cross-spawn':{'version':'7.0.3','resolved':'old','integrity':'old'},'node_modules/other':{'version':'1.0.0'}}}
        good=copy.deepcopy(old);good['packages']['']['dependencies']['cross-spawn']='7.0.5';entry=good['packages']['node_modules/cross-spawn'];entry.update(version='7.0.5',resolved='https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.5.tgz',integrity='sha512-'+'A'*86+'==')
        h.validate_document('package-lock.json',old,good)
        bad=copy.deepcopy(good);bad['packages']['node_modules/other']['version']='evil'
        with self.assertRaises(h.Rejected):h.validate_document('package-lock.json',old,bad)
        bad=copy.deepcopy(good);bad['packages']['node_modules/cross-spawn']['resolved']='file:/secret/canary'
        with self.assertRaises(h.Rejected):h.validate_document('package-lock.json',old,bad)
class DynamicObservation(unittest.TestCase):
    def test_node_capture_never_inherits_static_conclusions(self):
        trace={'trace.5':'1.000001 execve("/usr/bin/python3.11", [], NULL) = 0\n1.000002 +++ exited with 0 +++\n'}
        result=o.observe(trace,'worker',1,True)
        self.assertEqual(result['status'],'inconclusive')
        self.assertIn('node_npm_shared_fd_and_async_io_not_semantically_accounted',result['reasons'])
    def test_broken_health_and_truncation_inconclusive(self):
        result=o.observe({'trace.5':'1.000001 read(0x3, 0x1234, 0x20)'},'handler',None,False)
        self.assertEqual(result['status'],'inconclusive');self.assertIn('observer_health_failed',result['reasons']);self.assertIn('truncated_trace',result['reasons'])
if __name__=='__main__':unittest.main()
