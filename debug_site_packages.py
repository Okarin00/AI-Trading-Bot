
import os
import sys

site_packages = [p for p in sys.path if 'site-packages' in p and 'anaconda3' in p]
if site_packages:
    path = site_packages[0]
    print(f"Checking {path}")
    try:
        files = os.listdir(path)
        chronos_files = [f for f in files if 'chronos' in f.lower()]
        print("Found chronos files/dirs:")
        for f in chronos_files:
            print(f)
    except Exception as e:
        print(f"Error: {e}")
else:
    print("Could not find site-packages in sys.path")
