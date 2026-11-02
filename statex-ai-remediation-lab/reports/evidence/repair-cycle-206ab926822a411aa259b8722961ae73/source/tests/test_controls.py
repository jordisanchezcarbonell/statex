import importlib.util
import pathlib
import unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
def load(name):
    spec=importlib.util.spec_from_file_location(name,ROOT/'controls'/(name+'.py'))
    module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module); return module
accept=load('accept'); lab=load('lab')
class Controls(unittest.TestCase):
    def test_vulnerable_and_missing_rejected(self):
        for version in ['7.0.3','7.0.4','^7.0.5','6.0.6','99.0.0']:
            self.assertFalse(accept.repaired({'dependencies':{'cross-spawn':version}},{}))
    def test_exact_repair(self):
        manifest={'dependencies':{'cross-spawn':'7.0.5'}}
        lock={'packages':{'':manifest,'node_modules/cross-spawn':{'version':'7.0.5'}}}
        self.assertTrue(accept.repaired(manifest,lock))
        lock['packages']['node_modules/cross-spawn']['version']='7.0.3'
        self.assertFalse(accept.repaired(manifest,lock))
    def test_behavior_independent(self):
        self.assertTrue(accept.behavior(b'{"message":"hello"}','hello'))
        for output in [b'PASS',b'{"message":"wrong"}',b'{"message":"hello","extra":true}',b'\xff']:
            self.assertFalse(accept.behavior(output,'hello'))
    def test_container_policy(self):
        flags=lab.flags()
        for value in ['--network=none','--read-only','--cap-drop=ALL','--security-opt=no-new-privileges','--user=1000:1000','--log-driver=none']:
            self.assertIn(value,flags)
        self.assertFalse(any('/var/run/docker.sock' in x or 'privileged' in x for x in flags))
if __name__=='__main__': unittest.main()
