
from chronos import ChronosPipeline
import inspect

print("Checking ChronosPipeline...")
if hasattr(ChronosPipeline, 'from_pretrained'):
    print("ChronosPipeline has from_pretrained")
else:
    print("ChronosPipeline does NOT have from_pretrained")

print(f"Methods: {[m for m in dir(ChronosPipeline) if not m.startswith('_')]}")
