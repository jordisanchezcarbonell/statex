"""Trusted assertions run on controller; candidate output is always untrusted."""
import json

def repaired(manifest, lock):
    # Deliberately narrow repair for this experiment; no arbitrary version ranges.
    return (manifest.get('dependencies') == {'cross-spawn':'7.0.5'}
            and lock.get('packages', {}).get('node_modules/cross-spawn', {}).get('version') == '7.0.5'
            and lock.get('packages', {}).get('', {}).get('dependencies') == {'cross-spawn':'7.0.5'})

def behavior(stdout, value):
    try:
        return json.loads(stdout) == {'message': value}
    except (ValueError, UnicodeError):
        return False
