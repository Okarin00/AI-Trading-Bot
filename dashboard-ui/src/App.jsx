import React, { useState, useEffect } from 'react';
import { Activity, Settings, Terminal, BarChart2, DollarSign, Shield, Play, Square } from 'lucide-react';
import axios from 'axios';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Card = ({ children, className }) => (
  <div className={cn("bg-surface rounded-lg p-4 border border-gray-800", className)}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-700 text-gray-300",
    success: "bg-success/20 text-success",
    danger: "bg-danger/20 text-danger",
    warning: "bg-yellow-500/20 text-yellow-500",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded text-xs font-medium", variants[variant])}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "primary", className, ...props }) => {
  const variants = {
    primary: "bg-primary text-black hover:bg-yellow-400",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    danger: "bg-danger text-white hover:bg-red-600",
  };
  return (
    <button
      className={cn("px-4 py-2 rounded font-medium transition-colors flex items-center gap-2", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Main Dashboard ---

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [status, setStatus] = useState({ state: 'stopped', uptime: '0s' });
  const [logs, setLogs] = useState([]);
  const [config, setConfig] = useState({});

  // Mock data for initial render
  useEffect(() => {
    // In real app, fetch from /api/status, /api/logs, /api/config
    setLogs([
      { timestamp: new Date().toISOString(), level: 'INFO', message: 'System initialized' },
      { timestamp: new Date().toISOString(), level: 'INFO', message: 'Connecting to Binance...' },
    ]);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'logs':
        return <LogsView logs={logs} />;
      case 'settings':
        return <SettingsView config={config} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Top Bar */}
      <header className="h-14 border-b border-gray-800 flex items-center px-6 justify-between bg-surface">
        <div className="flex items-center gap-2">
          <Activity className="text-primary" />
          <h1 className="font-bold text-lg tracking-tight">AI Trading Bot <span className="text-xs font-normal text-gray-400 ml-2">v2.0</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Status:</span>
            <Badge variant={status.state === 'running' ? 'success' : 'default'}>
              {status.state.toUpperCase()}
            </Badge>
          </div>
          <Button size="sm" variant={status.state === 'running' ? 'danger' : 'primary'}>
            {status.state === 'running' ? <Square size={16} /> : <Play size={16} />}
            {status.state === 'running' ? 'Stop Bot' : 'Start Bot'}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-surface flex flex-col">
          <nav className="p-4 space-y-2">
            <NavItem icon={<BarChart2 />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavItem icon={<Terminal />} label="System Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
            <NavItem icon={<Settings />} label="Configuration" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
      active ? "bg-gray-800 text-primary" : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
    )}
  >
    {React.cloneElement(icon, { size: 18 })}
    {label}
  </button>
);

const DashboardView = () => (
  <div className="space-y-6">
    {/* Metrics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard title="Portfolio Value" value="$12,450.32" change="+2.4%" icon={<DollarSign className="text-primary" />} />
      <MetricCard title="24h PnL" value="+$320.50" change="+1.2%" variant="success" icon={<Activity className="text-success" />} />
      <MetricCard title="Active Positions" value="3" subtext="SOL, BTC, ETH" icon={<BarChart2 className="text-blue-400" />} />
      <MetricCard title="Risk Level" value="Low" subtext="Max Drawdown: 1.2%" icon={<Shield className="text-success" />} />
    </div>

    {/* Chart Section */}
    <div className="grid grid-cols-3 gap-6 h-96">
      <Card className="col-span-2 flex flex-col">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Market Overview (SOL/USDT)</h3>
        <div className="flex-1 bg-gray-900/50 rounded flex items-center justify-center text-gray-500">
          [TradingView Chart Placeholder]
        </div>
      </Card>
      <Card className="flex flex-col">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Recent Trades</h3>
        <div className="space-y-3">
          <TradeItem type="buy" symbol="SOL/USDT" price="142.50" amount="10.5" time="12:45:30" />
          <TradeItem type="sell" symbol="BTC/USDT" price="64,200.00" amount="0.05" time="12:30:15" />
          <TradeItem type="buy" symbol="ETH/USDT" price="3,450.20" amount="1.2" time="11:15:00" />
        </div>
      </Card>
    </div>
  </div>
);

const MetricCard = ({ title, value, change, subtext, variant, icon }) => (
  <Card>
    <div className="flex justify-between items-start mb-2">
      <span className="text-gray-400 text-sm">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    {change && (
      <div className={cn("text-sm", variant === 'success' ? "text-success" : "text-gray-400")}>
        {change}
      </div>
    )}
    {subtext && <div className="text-sm text-gray-500">{subtext}</div>}
  </Card>
);

const TradeItem = ({ type, symbol, price, amount, time }) => (
  <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2 last:border-0">
    <div>
      <div className="font-medium flex items-center gap-2">
        <span className={type === 'buy' ? "text-success" : "text-danger"}>{type.toUpperCase()}</span>
        <span>{symbol}</span>
      </div>
      <div className="text-gray-500 text-xs">{time}</div>
    </div>
    <div className="text-right">
      <div>{price}</div>
      <div className="text-gray-500 text-xs">{amount}</div>
    </div>
  </div>
);

const LogsView = ({ logs }) => (
  <Card className="h-full flex flex-col">
    <h3 className="text-gray-400 text-sm font-medium mb-4">System Logs</h3>
    <div className="flex-1 overflow-auto font-mono text-sm space-y-1">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-3">
          <span className="text-gray-500">{log.timestamp.split('T')[1].split('.')[0]}</span>
          <span className={cn(
            log.level === 'ERROR' ? "text-danger" :
              log.level === 'WARN' ? "text-yellow-500" : "text-blue-400"
          )}>{log.level}</span>
          <span className="text-gray-300">{log.message}</span>
        </div>
      ))}
    </div>
  </Card>
);

const SettingsView = () => (
  <div className="max-w-2xl mx-auto space-y-6">
    <Card>
      <h3 className="text-lg font-medium mb-4">API Configuration</h3>
      <div className="space-y-4">
        <InputGroup label="Binance API Key" type="password" value="****************" />
        <InputGroup label="Binance Secret Key" type="password" value="****************" />
        <InputGroup label="News API Key" type="password" value="****************" />
      </div>
    </Card>
    <Card>
      <h3 className="text-lg font-medium mb-4">Risk Management</h3>
      <div className="space-y-4">
        <InputGroup label="Risk per Trade (%)" type="number" value="2.0" />
        <InputGroup label="Max Daily Loss (%)" type="number" value="5.0" />
        <InputGroup label="Max Drawdown (%)" type="number" value="15.0" />
      </div>
    </Card>
    <div className="flex justify-end">
      <Button>Save Changes</Button>
    </div>
  </div>
);

const InputGroup = ({ label, type = "text", value }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    <input
      type={type}
      defaultValue={value}
      className="w-full bg-background border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
    />
  </div>
);

export default App;
