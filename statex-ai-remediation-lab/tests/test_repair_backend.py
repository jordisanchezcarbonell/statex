"""Controller dispatch tests with a SIMULATED isolated executor; no Docker/model."""
import importlib
from pathlib import Path
import sys
import unittest
from unittest.mock import Mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'controls'))
try:
    runner = importlib.import_module('run_repair_cycle')
finally:
    sys.path.pop(0)


class BackendDispatch(unittest.TestCase):
    def backend(self):
        backend = runner.Backend.__new__(runner.Backend)
        backend.run = Mock()
        backend.volume = 'SIMULATED_VOLUME'
        return backend

    def test_failed_lock_prevents_commit_install_and_export(self):
        backend = self.backend()
        backend.run.action.return_value = {'ok': True}
        backend.run.job.return_value = {'commands': [{'exit': 1}]}
        self.assertFalse(backend.apply({'path': 'package.json', 'document': {}}))
        self.assertEqual(backend.run.action.call_count, 1)
        self.assertEqual(backend.run.job.call_count, 1)
        backend.run.accept_and_export.assert_not_called()

    def test_controller_generates_commits_and_installs_not_model(self):
        backend = self.backend()
        backend.run.action.return_value = {'ok': True}
        backend.run.snapshot.return_value = {'package-lock.json': {'sha256': 'current-lock-hash'}}
        lock = {'SIMULATED': 'npm calculated graph'}
        backend.run.job.side_effect = [
            {'commands': [{'exit': 0}], 'persistent_source_unchanged': {'app.cjs': True},
             'documents': {'package.json': {'SIMULATED': 'manifest'}, 'package-lock.json': lock}},
            {'commands': [{'exit': 0}], 'persistent_source_unchanged': {'app.cjs': True}}
        ]
        self.assertTrue(backend.apply({'path': 'package.json', 'document': {'SIMULATED': 'manifest'}}))
        requests = [call.args[0] for call in backend.run.job.call_args_list]
        self.assertEqual(requests, [{'op': 'regenerate_lock'}, {'op': 'install'}])
        commit = backend.run.action.call_args_list[1].args[0]
        self.assertEqual(commit, {'op': 'write_document', 'path': 'package-lock.json',
                                 'expected_sha256': 'current-lock-hash', 'document': lock})
        backend.run.accept_and_export.assert_not_called()

    def test_independent_validator_rejects_wrong_behavior_even_with_exit_zero(self):
        backend = self.backend()
        backend.run.job.return_value = {
            'commands': [{'exit': 0}], 'build': {'exit': 0},
            'persistent_source_unchanged': {'app.cjs': True},
            'cases': {'hello': {'exit': 0, 'stdout': '{"message":"wrong"}'}}}
        self.assertFalse(backend.test())

    def test_validator_rejects_persistent_source_mutation(self):
        backend = self.backend()
        backend.run.job.return_value = {
            'commands': [{'exit': 0}], 'build': {'exit': 0},
            'persistent_source_unchanged': {'app.cjs': False},
            'cases': {'hello': {'exit': 0, 'stdout': '{"message":"hello"}'}}}
        self.assertFalse(backend.test())


if __name__ == '__main__':
    unittest.main()
