import React, { useState, useEffect } from 'react';
import './Kitchen.css';

const Kitchen = () => {
  const stations = ['Main', 'Bar', 'Dessert'];
  const [selectedStation, setSelectedStation] = useState('Main');
  const [compactMode, setCompactMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock orders - TODO: Replace with API calls
  // const fetchKitchenOrders = async () => {
  //   const response = await fetch('/api/kitchen/orders');
  //   return response.json();
  // };
  // const updateOrderStatus = async (kotId, status) => {
  //   const response = await fetch(`/api/kitchen/orders/${kotId}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status }),
  //   });
  //   return response.json();
  // };

  const [orders, setOrders] = useState([
    {
      id: 1,
      kotNumber: 'KOT-123456',
      tableNumber: 'T-05',
      station: 'Main',
      status: 'Pending',
      createdAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      items: [
        { name: 'Chicken Biryani', quantity: 2, notes: 'Extra spicy' },
        { name: 'Butter Chicken', quantity: 1, notes: '' },
        { name: 'Dal Makhani', quantity: 1, notes: 'No onions' }
      ]
    },
    {
      id: 2,
      kotNumber: 'KOT-123457',
      tableNumber: 'T-12',
      station: 'Bar',
      status: 'Preparing',
      createdAt: new Date(Date.now() - 8 * 60000), // 8 minutes ago
      items: [
        { name: 'Mango Lassi', quantity: 3, notes: '' },
        { name: 'Coca Cola', quantity: 2, notes: 'Extra ice' }
      ]
    },
    {
      id: 3,
      kotNumber: 'KOT-123458',
      tableNumber: 'T-08',
      station: 'Main',
      status: 'Ready',
      createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      items: [
        { name: 'Paneer Tikka', quantity: 2, notes: '' },
        { name: 'Spring Rolls', quantity: 1, notes: '' }
      ]
    },
    {
      id: 4,
      kotNumber: 'KOT-123459',
      tableNumber: 'T-15',
      station: 'Dessert',
      status: 'Pending',
      createdAt: new Date(Date.now() - 3 * 60000), // 3 minutes ago
      items: [
        { name: 'Gulab Jamun', quantity: 4, notes: 'Warm' },
        { name: 'Ice Cream', quantity: 2, notes: '' }
      ]
    },
    {
      id: 5,
      kotNumber: 'KOT-123460',
      tableNumber: 'T-03',
      station: 'Main',
      status: 'Preparing',
      createdAt: new Date(Date.now() - 20 * 60000), // 20 minutes ago (overdue)
      items: [
        { name: 'Chicken Tikka', quantity: 3, notes: 'Well done' },
        { name: 'Butter Naan', quantity: 4, notes: '' }
      ]
    },
    {
      id: 6,
      kotNumber: 'KOT-123461',
      tableNumber: 'T-07',
      station: 'Bar',
      status: 'Pending',
      createdAt: new Date(Date.now() - 2 * 60000), // 2 minutes ago
      items: [
        { name: 'Mango Lassi', quantity: 2, notes: '' }
      ]
    },
    {
      id: 7,
      kotNumber: 'KOT-123462',
      tableNumber: 'T-11',
      station: 'Main',
      status: 'Ready',
      createdAt: new Date(Date.now() - 12 * 60000), // 12 minutes ago
      items: [
        { name: 'Dal Makhani', quantity: 1, notes: '' },
        { name: 'Butter Chicken', quantity: 2, notes: 'Mild spice' }
      ]
    },
    {
      id: 8,
      kotNumber: 'KOT-123463',
      tableNumber: 'T-09',
      station: 'Dessert',
      status: 'Preparing',
      createdAt: new Date(Date.now() - 6 * 60000), // 6 minutes ago
      items: [
        { name: 'Ice Cream', quantity: 3, notes: 'Vanilla only' }
      ]
    }
  ]);

  // Filter orders by station and sort by newest first
  const filteredOrders = orders
    .filter(order => order.station === selectedStation)
    .sort((a, b) => b.createdAt - a.createdAt);

  // Calculate time since created
  const getTimeSince = (date) => {
    const minutes = Math.floor((Date.now() - date) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  // Check if order is overdue (more than 15 minutes)
  const isOverdue = (date) => {
    const minutes = Math.floor((Date.now() - date) / 60000);
    return minutes > 15;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Ready':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Update order status
  const handleStatusChange = (orderId, newStatus) => {
    // TODO: Replace with actual API call
    // await updateOrderStatus(orderId, newStatus);
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Get next status
  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'Pending': 'Preparing',
      'Preparing': 'Ready',
      'Ready': 'Completed'
    };
    return statusFlow[currentStatus] || 'Pending';
  };

  // Auto-refresh orders (simulate real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: Fetch new orders from API
      // const newOrders = await fetchKitchenOrders();
      // setOrders(newOrders);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="kitchen-page">
      {/* Header */}
      <div className="kitchen-header">
        <div className="kitchen-header-content">
          <div>
            <h1 className="kitchen-header-title">Kitchen Display System</h1>
            <p className="kitchen-header-subtitle">Real-time order management</p>
          </div>

          {/* Controls */}
          <div className="kitchen-header-controls">
            {/* View Mode Toggle */}
            <div className="kitchen-view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`kitchen-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <svg className="kitchen-view-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`kitchen-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                <svg className="kitchen-view-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Compact Mode Toggle */}
            <button
              onClick={() => setCompactMode(!compactMode)}
              className={`kitchen-compact-toggle ${compactMode ? 'active' : ''}`}
            >
              <svg className="kitchen-compact-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Compact
            </button>
          </div>
        </div>
      </div>

      {/* Station Tabs */}
      <div className="kitchen-station-tabs">
        <div className="kitchen-station-tabs-container">
          {stations.map((station) => (
            <button
              key={station}
              onClick={() => setSelectedStation(station)}
              className={`kitchen-station-tab ${selectedStation === station ? 'active' : ''}`}
            >
              {station}
              <span className="kitchen-station-badge">
                {orders.filter(o => o.station === station && o.status !== 'Completed').length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Display */}
      <div className="kitchen-orders-container">
        {viewMode === 'grid' ? (
          <div className={`kitchen-orders-grid ${compactMode ? 'compact' : ''}`}>
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`kitchen-order-card ${compactMode ? 'compact' : ''} ${isOverdue(order.createdAt) ? 'overdue' : ''}`}
              >
                {/* Order Header */}
                <div className="kitchen-order-header">
                  <div className="kitchen-order-info">
                    <div className={`kitchen-order-kot ${compactMode ? 'compact' : ''}`}>
                      <h3 className="kitchen-order-kot-number">{order.kotNumber}</h3>
                      {isOverdue(order.createdAt) && (
                        <span className="kitchen-order-overdue-badge">OVERDUE</span>
                      )}
                    </div>
                    <p className="kitchen-order-table">Table {order.tableNumber}</p>
                  </div>
                  <span className={`kitchen-order-status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                {/* Time */}
                <div className={`kitchen-order-timer ${isOverdue(order.createdAt) ? 'overdue' : ''}`}>
                  <svg className="kitchen-order-timer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="kitchen-order-timer-text">{getTimeSince(order.createdAt)}</span>
                </div>

                {/* Items List */}
                <div className={`kitchen-order-items ${compactMode ? 'compact' : ''}`}>
                  {order.items.map((item, idx) => (
                    <div key={idx} className={`kitchen-order-item ${compactMode ? 'compact' : ''}`}>
                      <div className="kitchen-order-item-header">
                        <span className="kitchen-order-item-name">{item.name}</span>
                        <span className="kitchen-order-item-quantity">{item.quantity}x</span>
                      </div>
                      {item.notes && (
                        <p className="kitchen-order-item-notes">Note: {item.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={`kitchen-order-actions ${compactMode ? 'compact' : ''}`}>
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'Preparing')}
                      className={`kitchen-action-btn accept ${compactMode ? 'compact' : ''}`}
                    >
                      Accept & Start Preparing
                    </button>
                  )}
                  {order.status === 'Preparing' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'Ready')}
                      className={`kitchen-action-btn ready ${compactMode ? 'compact' : ''}`}
                    >
                      Mark as Ready
                    </button>
                  )}
                  {order.status === 'Ready' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'Completed')}
                      className={`kitchen-action-btn completed ${compactMode ? 'compact' : ''}`}
                    >
                      Mark as Completed
                    </button>
                  )}
                  {order.status !== 'Pending' && order.status !== 'Completed' && (
                    <button
                      onClick={() => handleStatusChange(order.id, getNextStatus(order.status))}
                      className={`kitchen-action-btn next ${compactMode ? 'compact' : ''}`}
                    >
                      Next: {getNextStatus(order.status)}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`kitchen-orders-list ${compactMode ? 'compact' : ''}`}>
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`kitchen-order-list-item ${isOverdue(order.createdAt) ? 'overdue' : ''}`}
              >
                <div className="kitchen-order-list-content">
                  {/* Left: Order Info */}
                  <div className="kitchen-order-list-info">
                    <div className="kitchen-order-list-header">
                      <h3 className="kitchen-order-list-kot">{order.kotNumber}</h3>
                      <span className="kitchen-order-list-table">Table {order.tableNumber}</span>
                      {isOverdue(order.createdAt) && (
                        <span className="kitchen-order-overdue-badge">OVERDUE</span>
                      )}
                      <span className={`kitchen-order-status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className={`kitchen-order-timer ${isOverdue(order.createdAt) ? 'overdue' : ''}`}>
                      <svg className="kitchen-order-timer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="kitchen-order-timer-text">{getTimeSince(order.createdAt)}</span>
                    </div>
                    <div className="kitchen-order-list-items">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="kitchen-order-list-item-badge">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          {item.notes && (
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                              ({item.notes})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="kitchen-order-list-actions">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Preparing')}
                        className="kitchen-action-btn accept"
                      >
                        Accept & Start
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Ready')}
                        className="kitchen-action-btn ready"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'Ready' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Completed')}
                        className="kitchen-action-btn completed"
                      >
                        Complete
                      </button>
                    )}
                    {order.status !== 'Pending' && order.status !== 'Completed' && (
                      <button
                        onClick={() => handleStatusChange(order.id, getNextStatus(order.status))}
                        className="kitchen-action-btn next"
                      >
                        Next: {getNextStatus(order.status)}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="kitchen-empty-state">
            <svg className="kitchen-empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="kitchen-empty-state-title">No orders for {selectedStation} station</h3>
            <p className="kitchen-empty-state-text">New orders will appear here automatically</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;


