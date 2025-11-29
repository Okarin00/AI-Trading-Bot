
import chronos
import inspect

print(f"chronos module: {chronos}")
print(f"chronos dir: {dir(chronos)}")

# Check if there are submodules
import pkgutil
package = chronos
for importer, modname, ispkg in pkgutil.iter_modules(package.__path__):
    print(f"Found submodule: {modname} (is_package: {ispkg})")
