
import sys
import os

print(f"Python executable: {sys.executable}")
print(f"Python path: {sys.path}")

try:
    import chronos
    print("Successfully imported chronos")
    print(f"File: {chronos.__file__}")
except ImportError as e:
    print(f"Failed to import chronos: {e}")

try:
    import torch
    print(f"Successfully imported torch: {torch.__version__}")
except ImportError as e:
    print(f"Failed to import torch: {e}")
