
import asyncio
import logging
import sys
import os

# Add parent dir to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main_orchestrator import main

async def run_with_timeout():
    # Run main for 30 seconds then cancel
    task = asyncio.create_task(main())
    
    try:
        print("Starting orchestrator for 30 seconds...")
        await asyncio.sleep(30)
        print("Timeout reached. Stopping...")
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            print("Orchestrator stopped.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(run_with_timeout())
