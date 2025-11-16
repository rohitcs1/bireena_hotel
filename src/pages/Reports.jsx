import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [dateRange, setDateRange] = useState('today');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Mock data - TODO: Replace with API calls
  // const fetchReports = async (startDate, endDate) => {
  //   const response = await fetch(`/api/reports?startDate=${startDate}&endDate=${endDate}`);
  //   return response.json();
  // };

  // Calculate date ranges
  const getDateRange = (range) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    switch (range) {
      case 'today':
        return { start: today, end: endDate };
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return { start: yesterday, end: new Date(yesterday.getTime() + 86400000 - 1) };
      case '7days':
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return { start: sevenDaysAgo, end: endDate };
      case '30days':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return { start: thirtyDaysAgo, end: endDate };
      default:
        return { start: today, end: endDate };
    }
  };

  const dateRangeData = getDateRange(dateRange);

  // Mock statistics
  const stats = {
    revenue: 125450,
    orders: 342,
    avgOrderValue: 367.25,
    voids: 8
  };

  // Mock top-selling items
  const topSellingItems = [
    { id: 1, name: 'Chicken Biryani', quantity: 145, revenue: 50750, category: 'Main' },
    { id: 2, name: 'Butter Chicken', quantity: 128, revenue: 48640, category: 'Main' },
    { id: 3, name: 'Paneer Tikka', quantity: 98, revenue: 24500, category: 'Starters' },
    { id: 4, name: 'Mango Lassi', quantity: 156, revenue: 18720, category: 'Drinks' },
    { id: 5, name: 'Dal Makhani', quantity: 87, revenue: 17400, category: 'Main' },
    { id: 6, name: 'Gulab Jamun', quantity: 112, revenue: 8960, category: 'Desserts' },
    { id: 7, name: 'Butter Naan', quantity: 203, revenue: 10150, category: 'Main' },
    { id: 8, name: 'Spring Rolls', quantity: 76, revenue: 13680, category: 'Starters' }
  ];

  // Mock waiter performance
  const waiterPerformance = [
    { id: 1, name: 'John Doe', orders: 89, revenue: 32680, avgOrderValue: 367.19, tables: 45 },
    { id: 2, name: 'Jane Smith', orders: 76, revenue: 27920, avgOrderValue: 367.37, tables: 38 },
    { id: 3, name: 'Mike Johnson', orders: 68, revenue: 24960, avgOrderValue: 367.06, tables: 34 },
    { id: 4, name: 'Sarah Williams', orders: 54, revenue: 19820, avgOrderValue: 367.41, tables: 27 },
    { id: 5, name: 'David Brown', orders: 55, revenue: 20170, avgOrderValue: 366.73, tables: 28 }
  ];

  // Mock chart data (last 7 days)
  const chartData = [
    { day: 'Mon', revenue: 18000, orders: 48 },
    { day: 'Tue', revenue: 22000, orders: 58 },
    { day: 'Wed', revenue: 19500, orders: 52 },
    { day: 'Thu', revenue: 24000, orders: 64 },
    { day: 'Fri', revenue: 28000, orders: 75 },
    { day: 'Sat', revenue: 32000, orders: 85 },
    { day: 'Sun', revenue: 25000, orders: 67 }
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  const maxOrders = Math.max(...chartData.map(d => d.orders));

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Export handlers
  const handleExportCSV = () => {
    // TODO: Implement CSV export
    alert('CSV export functionality will be implemented');
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert('PDF export functionality will be implemented');
  };

  const sortedTopItems = getSortedData(topSellingItems);
  const sortedWaiters = getSortedData(waiterPerformance);

  return (
    <div className="reports-page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reports-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1>Reports</h1>
              <p>Analytics and performance insights</p>
            </div>
            <div className="reports-header-actions">
              <button
                onClick={handleExportCSV}
                className="reports-export-btn reports-export-btn-csv"
              >
                <svg className="reports-export-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="reports-export-btn reports-export-btn-pdf"
              >
                <svg className="reports-export-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4m5 4v6m5-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="reports-date-range">
          <div className="reports-date-buttons">
            <button
              onClick={() => setDateRange('today')}
              className={`reports-date-btn ${dateRange === 'today' ? 'active' : ''}`}
            >
              Today
            </button>
            <button
              onClick={() => setDateRange('yesterday')}
              className={`reports-date-btn ${dateRange === 'yesterday' ? 'active' : ''}`}
            >
              Yesterday
            </button>
            <button
              onClick={() => setDateRange('7days')}
              className={`reports-date-btn ${dateRange === '7days' ? 'active' : ''}`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setDateRange('30days')}
              className={`reports-date-btn ${dateRange === '30days' ? 'active' : ''}`}
            >
              Last 30 Days
            </button>
          </div>
          <p className="reports-date-info">
            Showing data from {formatDate(dateRangeData.start)} to {formatDate(dateRangeData.end)}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="reports-stats-grid">
          {/* Revenue Card */}
          <div className="reports-stat-card revenue">
            <div className="reports-stat-header">
              <p className="reports-stat-label">Total Revenue</p>
              <div className="reports-stat-icon revenue">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="reports-stat-value">₹{stats.revenue.toLocaleString()}</p>
            <p className="reports-stat-change positive">+12.5% from previous period</p>
          </div>

          {/* Orders Card */}
          <div className="reports-stat-card orders">
            <div className="reports-stat-header">
              <p className="reports-stat-label">Total Orders</p>
              <div className="reports-stat-icon orders">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="reports-stat-value">{stats.orders}</p>
            <p className="reports-stat-change positive">+8.3% from previous period</p>
          </div>

          {/* Avg Order Value Card */}
          <div className="reports-stat-card avg-order">
            <div className="reports-stat-header">
              <p className="reports-stat-label">Avg Order Value</p>
              <div className="reports-stat-icon avg-order">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="reports-stat-value">₹{stats.avgOrderValue.toFixed(2)}</p>
            <p className="reports-stat-change positive">+5.2% from previous period</p>
          </div>

          {/* Voids Card */}
          <div className="reports-stat-card voids">
            <div className="reports-stat-header">
              <p className="reports-stat-label">Voids</p>
              <div className="reports-stat-icon voids">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="reports-stat-value">{stats.voids}</p>
            <p className="reports-stat-change negative">-2 from previous period</p>
          </div>
        </div>

        {/* Charts */}
        <div className="reports-charts-grid">
          {/* Revenue Chart */}
          <div className="reports-chart-card">
            <h3 className="reports-chart-title">Revenue Trend</h3>
            <div className="reports-chart-container">
              {chartData.map((data, index) => {
                const height = (data.revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="reports-chart-bar-wrapper">
                    <div 
                      className="reports-chart-bar revenue" 
                      style={{ height: `${height}%` }}
                      title={`₹${data.revenue.toLocaleString()}`}
                    ></div>
                    <span className="reports-chart-label">{data.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="reports-chart-legend">
              <div className="reports-chart-legend-item">
                <div className="reports-chart-legend-dot revenue"></div>
                <span>Revenue</span>
              </div>
            </div>
          </div>

          {/* Orders Chart */}
          <div className="reports-chart-card">
            <h3 className="reports-chart-title">Orders Trend</h3>
            <div className="reports-chart-container">
              {chartData.map((data, index) => {
                const height = (data.orders / maxOrders) * 100;
                return (
                  <div key={index} className="reports-chart-bar-wrapper">
                    <div 
                      className="reports-chart-bar orders" 
                      style={{ height: `${height}%` }}
                      title={`${data.orders} orders`}
                    ></div>
                    <span className="reports-chart-label">{data.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="reports-chart-legend">
              <div className="reports-chart-legend-item">
                <div className="reports-chart-legend-dot orders"></div>
                <span>Orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="reports-tables-grid">
          {/* Top Selling Items */}
          <div className="reports-table-card">
            <div className="reports-table-header">
              <h3 className="reports-table-title">Top Selling Items</h3>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th 
                      className={`sortable ${sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                      onClick={() => handleSort('name')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        Item
                        {sortConfig.key === 'name' && (
                          <svg className="reports-table-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                      </span>
                    </th>
                    <th 
                      className={`sortable ${sortConfig.key === 'quantity' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                      onClick={() => handleSort('quantity')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        Qty
                        {sortConfig.key === 'quantity' && (
                          <svg className="reports-table-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                      </span>
                    </th>
                    <th 
                      className={`sortable ${sortConfig.key === 'revenue' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                      onClick={() => handleSort('revenue')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        Revenue
                        {sortConfig.key === 'revenue' && (
                          <svg className="reports-table-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTopItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="reports-table-item-name">{item.name}</div>
                        <div className="reports-table-item-category">{item.category}</div>
                      </td>
                      <td>
                        <span className="reports-table-number">{item.quantity}</span>
                      </td>
                      <td>
                        <span className="reports-table-value">₹{item.revenue.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Waiter Performance */}
          <div className="reports-table-card">
            <div className="reports-table-header">
              <h3 className="reports-table-title">Waiter Performance</h3>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th 
                      className={`sortable ${sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                      onClick={() => handleSort('name')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        Waiter
                        {sortConfig.key === 'name' && (
                          <svg className="reports-table-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                      </span>
                    </th>
                    <th 
                      className={`sortable ${sortConfig.key === 'orders' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                      onClick={() => handleSort('orders')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        Orders
                        {sortConfig.key === 'orders' && (
                          <svg className="reports-table-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                      </span>
                    </th>
                    <th 
                      className={`sortable ${sortConfig.key === 'revenue' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                      onClick={() => handleSort('revenue')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        Revenue
                        {sortConfig.key === 'revenue' && (
                          <svg className="reports-table-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                      </span>
                    </th>
                    <th 
                      className={`sortable ${sortConfig.key === 'avgOrderValue' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                      onClick={() => handleSort('avgOrderValue')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        Avg Value
                        {sortConfig.key === 'avgOrderValue' && (
                          <svg className="reports-table-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedWaiters.map((waiter) => (
                    <tr key={waiter.id}>
                      <td>
                        <span className="reports-table-item-name">{waiter.name}</span>
                      </td>
                      <td>
                        <span className="reports-table-number">{waiter.orders}</span>
                      </td>
                      <td>
                        <span className="reports-table-value">₹{waiter.revenue.toLocaleString()}</span>
                      </td>
                      <td>
                        <span className="reports-table-number">₹{waiter.avgOrderValue.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;


