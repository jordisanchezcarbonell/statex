"""Pinned llama.cpp b5046 transport framing, NOT JSON recovery or plan repair.

main.cpp:941 emits this marker on stdout after EOG; :958 adds two newlines.
Introduced after the first pilot; that original outcome is kept unchanged.
"""
import hashlib
SUFFIX=b' [end of text]\n\n\n'
def generated_content(raw):
    if not isinstance(raw,bytes):raise TypeError('bytes required')
    removed=raw.endswith(SUFFIX)
    content=raw[:-len(SUFFIX)] if removed else raw
    return content,{'codec':'llama.cpp-b5046-explicit-eog-stdout-suffix','removed_backend_marker':removed,
                    'removed_bytes':len(SUFFIX) if removed else 0,'raw_sha256':hashlib.sha256(raw).hexdigest(),
                    'content_sha256':hashlib.sha256(content).hexdigest(),'content_bytes':len(content)}
