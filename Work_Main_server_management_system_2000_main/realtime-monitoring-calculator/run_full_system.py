
import asyncio
import logging
import threading
import os
import sys
from typing import List, Dict
from datetime import datetime

# Add paths
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
sys.path.append(os.path.join(current_dir, '../Main_system'))

# Import components
from main_orchestrator import TradingSystemOrchestrator, load_config
from bot_manager import WebDashboard
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class LogCapture(logging.Handler):
    """Capture logs for dashboard"""
    def __init__(self, max_logs=100):
        super().__init__()
        self.logs = []
        self.max_logs = max_logs
        
    def emit(self, record):
        try:
            log_entry = {
                'timestamp': datetime.fromtimestamp(record.created).isoformat(),
                'level': record.levelname,
                'message': record.getMessage()
            }
            self.logs.append(log_entry)
            if len(self.logs) > self.max_logs:
                self.logs.pop(0)
        except Exception:
            self.handleError(record)

# Global log capture
log_capture = LogCapture()
logging.getLogger().addHandler(log_capture)

class IntegratedSystem:
    def __init__(self):
        self.orchestrator = None
        self.dashboard = None
        self.dashboard_thread = None
        
    async def initialize(self):
        # Load env and config
        load_dotenv()
        config = load_config()
        
        # Initialize Orchestrator
        self.orchestrator = TradingSystemOrchestrator(config)
        
        # Attach log capture to orchestrator
        self.orchestrator.get_logs = lambda: log_capture.logs
        
        # Initialize Dashboard
        self.dashboard = WebDashboard(port=5000, orchestrator=self.orchestrator)
        
    def start_dashboard(self):
        """Start dashboard in a separate thread"""
        logger.info("Starting Web Dashboard on port 5000...")
        self.dashboard.app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
        
    async def start(self):
        await self.initialize()
        
        # Start dashboard thread
        self.dashboard_thread = threading.Thread(target=self.start_dashboard)
        self.dashboard_thread.daemon = True
        self.dashboard_thread.start()
        
        # Start orchestrator (blocks)
        logger.info("Starting Trading Orchestrator...")
        await self.orchestrator.start()

if __name__ == "__main__":
    system = IntegratedSystem()
    try:
        asyncio.run(system.start())
    except KeyboardInterrupt:
        logger.info("System stopping...")
