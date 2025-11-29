
from dataclasses import dataclass
from datetime import datetime

@dataclass
class MarketTick:
    timestamp: datetime
    symbol: str
    price: float
    volume: float
    side: str
    trade_id: str

def process_tick(tick):
    print(f"Tick: {tick}")
    try:
        print(f"Price: {tick.price}")
    except Exception as e:
        print(f"Attribute access failed: {e}")
        
    try:
        print(f"Price: {tick['price']}")
    except Exception as e:
        print(f"Item access failed: {e}")

t = MarketTick(datetime.now(), "SOLUSDT", 100.0, 1.0, "buy", "1")
process_tick(t)
