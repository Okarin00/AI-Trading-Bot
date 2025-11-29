
from chronos import ChronosConfig, ChronosPipeline
import inspect

print("Checking ChronosConfig...")
print(f"ChronosConfig init args: {inspect.signature(ChronosConfig.__init__)}")

try:
    print("Attempting to load pipeline...")
    pipeline = ChronosPipeline.from_pretrained("amazon/chronos-t5-base")
    print("Successfully loaded pipeline")
except Exception as e:
    print(f"Error loading pipeline: {e}")
