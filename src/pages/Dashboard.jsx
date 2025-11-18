import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css';

const Dashboard = () => {

  // Local state for mobile sidebar toggling (was missing and caused ReferenceError)
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Mock data - TODO: Replace with API calls
  // const fetchDashboardData = async () => {
  //   const response = await fetch('/api/dashboard/stats');
  //   return response.json();
  // };

  const statsData = {
    totalSalesToday: 45230,
    activeTables: 12,
    pendingOrders: 8,
    avgKitchenTime: '18 min'
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      table: 'T-05',
      items: 3,
      amount: 1250,
      status: 'Preparing',
      time: '2 min ago'
    },
    {
      id: 'ORD-002',
      table: 'T-12',
      items: 5,
      amount: 2890,
      status: 'Ready',
      time: '5 min ago'
    },
    {
      id: 'ORD-003',
      table: 'T-08',
      items: 2,
      amount: 850,
      status: 'Served',
      time: '8 min ago'
    },
    {
      id: 'ORD-004',
      table: 'T-15',
      items: 4,
      amount: 1650,
      status: 'Preparing',
      time: '10 min ago'
    },
    {
      id: 'ORD-005',
      table: 'T-03',
      items: 6,
      amount: 3200,
      status: 'Ready',
      time: '12 min ago'
    }
  ];

  // Mock sales trend data (last 7 days)
  const salesTrend = [120, 180, 150, 220, 200, 250, 280];

  const getStatusColor = (status) => {
    switch (status) { 
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Served':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: '1.5rem' }}>
          {/* 4 Stat Cards */}
          <div className="stats-grid">
            {/* Total Sales Today */}
            <div className="stat-card stat-card-green">
              <div className="stat-icon-wrapper">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="stat-label">Total Sales Today</p>
              <p className="stat-value">₹{statsData.totalSalesToday.toLocaleString()}</p>
              <p className="stat-change" style={{ color: 'var(--success-color)' }}>+12% from yesterday</p>
            </div>

            {/* Active Tables */}
            <div className="stat-card stat-card-blue">
              <div className="stat-icon-wrapper">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="stat-label">Active Tables</p>
              <p className="stat-value">{statsData.activeTables}</p>
              <p className="stat-change" style={{ color: 'var(--primary-color)' }}>of 20 total</p>
            </div>

            {/* Pending Orders */}
            <div className="stat-card stat-card-yellow">
              <div className="stat-icon-wrapper">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="stat-label">Pending Orders</p>
              <p className="stat-value">{statsData.pendingOrders}</p>
              <p className="stat-change" style={{ color: 'var(--warning-color)' }}>In kitchen</p>
            </div>

            {/* Avg Kitchen Time */}
            <div className="stat-card stat-card-purple">
              <div className="stat-icon-wrapper">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="stat-label">Avg Kitchen Time</p>
              <p className="stat-value">{statsData.avgKitchenTime}</p>
              <p className="stat-change" style={{ color: 'var(--purple-color)' }}>Target: 15 min</p>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Sales Trend Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h2 className="chart-title">Sales Trend (Last 7 Days)</h2>
                <span className="chart-period">Weekly</span>
              </div>
              {/* Static SVG Chart */}
              <div className="chart-container">
                {salesTrend.map((value, index) => {
                  const maxValue = Math.max(...salesTrend);
                  const height = (value / maxValue) * 100;
                  return (
                    <div key={index} className="chart-bar-wrapper">
                      <div className="chart-bar" style={{ height: `${height}%` }}></div>
                      <span className="chart-bar-label">Day {index + 1}</span>
                    </div>
                  );
                })}
              </div>
              <div className="chart-footer">
                <div className="chart-total">
                  Total: <strong>₹{salesTrend.reduce((a, b) => a + b, 0) * 100}</strong>
                </div>
                <div className="chart-trend">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  ↑ 15% increase
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links-card">
              <h2 className="quick-links-title">Quick Links</h2>
              <div className="quick-links">
                <a href="#" className="quick-link quick-link-blue">
                  <div className="quick-link-icon">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="quick-link-text">Tables</span>
                  <svg className="quick-link-arrow h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="quick-link quick-link-green">
                  <div className="quick-link-icon">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="quick-link-text">Menu</span>
                  <svg className="quick-link-arrow h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="quick-link quick-link-purple">
                  <div className="quick-link-icon">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="quick-link-text">Reports</span>
                  <svg className="quick-link-arrow h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="quick-link quick-link-gray">
                  <div className="quick-link-icon">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="quick-link-text">Settings</span>
                  <svg className="quick-link-arrow h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="recent-orders-card">
            <div className="recent-orders-header">
              <h2 className="recent-orders-title">Recent Orders</h2>
            </div>
            <div className="table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Table</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={order.id} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.table}</td>
                      <td>{order.items} items</td>
                      <td className="order-amount">₹{order.amount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* TODO: Replace with API call */}
            {/* const fetchRecentOrders = async () => {
              const response = await fetch('/api/orders/recent');
              return response.json();
            }; */}
          </div>
    </div>
  );
};

export default Dashboard;


