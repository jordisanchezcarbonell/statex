import importlib.util
import json
from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
s=importlib.util.spec_from_file_location('local_adapter',ROOT/'controls/local_inference.py')
a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
class LocalProposals(unittest.TestCase):
    def test_valid_proposal_preserved_without_value_replacement(self):
        plan={'actions':[{'op':'write_document','path':'package.json','expected_sha256':'a'*64,'document':{'dependencies':{'cross-spawn':'7.0.5'}}},{'op':'regenerate_lock'},{'op':'install'},{'op':'validate'},{'op':'export'}]}
        self.assertEqual(a.parse_proposal(json.dumps(plan).encode()),plan)
        # Semantics and actual CAS remain checked by the existing isolated executor.
        self.assertEqual(a.parse_proposal(json.dumps(plan).encode())['actions'][0]['expected_sha256'],'a'*64)
    def test_invalid_raw_json_is_not_salvaged(self):
        for raw in [b'```json\n{"actions":[{"op":"export"}]}\n```',b'prefix {"actions":[{"op":"export"}]}',b'{"actions":[],"actions":[{"op":"export"}]}',b'not json',b'',b'\xff']:
            with self.assertRaises(a.InvalidProposal):a.parse_proposal(raw)
    def test_external_paths_commands_and_policy_rejected(self):
        for action in [{'op':'read_document','path':'/secret/canary'},{'op':'run','command':'id'},{'op':'install','env':{}},{'op':'set_policy'},{'op':'read_document','path':'../package.json'}]:
            with self.assertRaises(a.InvalidProposal):a.parse_proposal(json.dumps({'actions':[action,{'op':'export'}]}).encode())
    def test_no_auto_completion_or_reordering(self):
        for actions in [[],[{'op':'read_document','path':'package.json'}],[{'op':'export'},{'op':'validate'}],[{'op':'export'},{'op':'export'}]]:
            with self.assertRaises(a.InvalidProposal):a.parse_proposal(json.dumps({'actions':actions}).encode())
    def test_prompt_contains_only_authorized_domain_context(self):
        context={'documents':{n:{'document':{},'sha256':'a'*64} for n in ['package.json','package-lock.json']},'task':{'advisory':'CVE-2024-21538','target':'cross-spawn@7.0.5'}}
        text=a.prompt(context)
        self.assertIn('a'*64,text);self.assertNotIn('/secret/',text);self.assertNotIn('/Users/',text)
        with self.assertRaises(ValueError):a.prompt(dict(context,secret='fictional'))
if __name__=='__main__':unittest.main()
