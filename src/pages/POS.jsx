import React, { useState, useEffect } from 'react';
import './POS.css';

const POS = () => {
  const categories = ['All', 'Starters', 'Main', 'Drinks', 'Desserts'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTable, setSelectedTable] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [showKOTPreview, setShowKOTPreview] = useState(false);
  const [kotNumber, setKOTNumber] = useState('');

  // Mock menu items - TODO: Replace with API call
  // const fetchMenuItems = async () => {
  //   const response = await fetch('/api/menu');
  //   return response.json();
  // };

  const menuItems = [
    { id: 1, name: 'Paneer Tikka', price: 250, category: 'Starters', isVeg: true, available: true },
    { id: 2, name: 'Chicken Biryani', price: 350, category: 'Main', isVeg: false, available: true },
    { id: 3, name: 'Butter Chicken', price: 380, category: 'Main', isVeg: false, available: true },
    { id: 4, name: 'Mango Lassi', price: 120, category: 'Drinks', isVeg: true, available: true },
    { id: 5, name: 'Gulab Jamun', price: 80, category: 'Desserts', isVeg: true, available: true },
    { id: 6, name: 'Spring Rolls', price: 180, category: 'Starters', isVeg: true, available: true },
    { id: 7, name: 'Coca Cola', price: 60, category: 'Drinks', isVeg: true, available: true },
    { id: 8, name: 'Ice Cream', price: 100, category: 'Desserts', isVeg: true, available: true },
    { id: 9, name: 'Dal Makhani', price: 200, category: 'Main', isVeg: true, available: true },
    { id: 10, name: 'Chicken Tikka', price: 320, category: 'Starters', isVeg: false, available: true },
  ];

  const tables = ['T-01', 'T-02', 'T-03', 'T-04', 'T-05', 'T-06', 'T-07', 'T-08', 'T-09', 'T-10'];

  const filteredMenuItems = selectedCategory === 'All'
    ? menuItems.filter(item => item.available)
    : menuItems.filter(item => item.category === selectedCategory && item.available);

  const filteredTables = tables.filter(table =>
    table.toLowerCase().includes(tableSearch.toLowerCase())
  );

  // Generate KOT number
  const generateKOTNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `KOT-${timestamp}`;
  };

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18; // 18% GST
  const discountAmount = discount;
  const total = subtotal + gst - discountAmount;

  // Add item to order
  const handleAddItem = (item) => {
    const existingItem = orderItems.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setOrderItems(orderItems.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ));
    } else {
      setOrderItems([...orderItems, {
        ...item,
        quantity: 1,
        notes: ''
      }]);
    }
  };

  // Update quantity
  const handleQuantityChange = (itemId, change) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  // Update item notes
  const handleNotesChange = (itemId, notes) => {
    setOrderItems(orderItems.map(item =>
      item.id === itemId ? { ...item, notes } : item
    ));
  };

  // Remove item
  const handleRemoveItem = (itemId) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  // Save KOT
  const handleSaveKOT = () => {
    if (!selectedTable) {
      alert('Please select a table first');
      return;
    }
    if (orderItems.length === 0) {
      alert('Please add items to the order');
      return;
    }
    const newKOTNumber = generateKOTNumber();
    setKOTNumber(newKOTNumber);
    setShowKOTPreview(true);
    
    // TODO: Replace with actual API call
    // const saveKOT = async () => {
    //   const response = await fetch('/api/kot', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       kotNumber: newKOTNumber,
    //       table: selectedTable,
    //       items: orderItems,
    //       subtotal,
    //       gst,
    //       discount: discountAmount,
    //       total
    //     }),
    //   });
    //   return response.json();
    // };
  };

  // Clear order
  const handleClearOrder = () => {
    if (window.confirm('Are you sure you want to clear the order?')) {
      setOrderItems([]);
      setDiscount(0);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('table-search')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="pos-page" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div className="pos-header">
        <div className="pos-header-content">
          <div>
            <h1 className="pos-header-title">POS - Order Taking</h1>
            <p className="pos-header-subtitle">Quick order entry system</p>
          </div>
          
          {/* Table Selector */}
          <div className="pos-header-controls">
            <div className="table-selector-wrapper">
              <input
                id="table-search"
                type="text"
                placeholder="Search table (Press '/' to focus)"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="table-selector-input"
              />
              <svg className="table-selector-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="table-dropdown"
            >
              <option value="">Select Table</option>
              {filteredTables.map(table => (
                <option key={table} value={table}>{table}</option>
              ))}
            </select>
            {selectedTable && (
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                {selectedTable}
              </div>
            )}
          </div>
        </div>

        {/* Keyboard Shortcut Hint */}
        <div className="keyboard-hint">
          <kbd>/</kbd>
          <span>Search table</span>
        </div>
      </div>

      <div className="pos-layout">
        {/* Left Side - Categories & Menu */}
        <div className="pos-main">
          {/* Table Selector Card */}
          <div className="table-selector-card">
            <label className="table-selector-label">Select Table</label>
            <div className="table-grid">
              {filteredTables.map(table => (
                <button
                  key={table}
                  onClick={() => setSelectedTable(table)}
                  className={`table-btn ${selectedTable === table ? 'active' : ''}`}
                >
                  {table}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Section */}
          <div className="menu-section">
            {/* Categories */}
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="menu-items-grid">
              {filteredMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddItem(item)}
                  className="menu-item-btn"
                >
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">₹{item.price}</p>
                </button>
              ))}
            </div>

            {/* Empty State */}
            {filteredMenuItems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No items available</h3>
                <p className="mt-1 text-sm text-gray-500">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Order Cart */}
        <div className="cart-section">
          <h2 className="cart-header">Order Cart</h2>

          {/* Order Items */}
          {orderItems.length === 0 ? (
            <div className="empty-cart">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3>Cart is empty</h3>
              <p>Add items from the menu to get started</p>
            </div>
          ) : (
            <div className="cart-items">
              {orderItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <p className="item-name-cart">{item.name}</p>
                    <p className="item-price-cart">₹{item.price} each</p>
                    
                    {/* Quantity Controls */}
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="qty-btn"
                        title="Decrease Quantity"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="qty-btn"
                        title="Increase Quantity"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Item Notes */}
                    <input
                      type="text"
                      placeholder="Add notes..."
                      value={item.notes}
                      onChange={(e) => handleNotesChange(item.id, e.target.value)}
                      className="item-notes-input"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-item-btn"
                    title="Remove Item"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Order Summary */}
          {orderItems.length > 0 && (
            <div className="cart-summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">GST (18%):</span>
                <span className="summary-value">₹{gst.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Discount:</span>
                <input
                  type="number"
                  min="0"
                  max={subtotal + gst}
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="discount-input"
                  placeholder="0"
                />
              </div>
              <div className="summary-row total">
                <span className="summary-label">Total:</span>
                <span className="summary-value">₹{total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Save KOT Button */}
          {orderItems.length > 0 && (
            <button
              onClick={handleSaveKOT}
              disabled={!selectedTable}
              className="save-kot-btn"
            >
              Save KOT
            </button>
          )}

          {/* Keyboard Shortcut Hint */}
          {orderItems.length > 0 && (
            <div className="keyboard-hint">
              <span className="font-semibold">Shortcut:</span>
              <kbd>S</kbd>
              <span>to Save KOT</span>
            </div>
          )}
        </div>
      </div>

      {/* KOT Preview Modal */}
      {showKOTPreview && (
        <div className="kot-modal-overlay" onClick={() => {
          setShowKOTPreview(false);
          setOrderItems([]);
          setDiscount(0);
          setSelectedTable('');
        }}>
          <div className="kot-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="kot-modal-header">
              <h2 className="kot-modal-title">KOT Preview</h2>
              <button
                onClick={() => {
                  setShowKOTPreview(false);
                  setOrderItems([]);
                  setDiscount(0);
                  setSelectedTable('');
                }}
                className="kot-modal-close"
                aria-label="Close Modal"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="kot-preview-content">
              {/* KOT Number */}
              <div className="kot-number">{kotNumber}</div>

              {/* KOT Info */}
              <div className="kot-info">
                <p><strong>Table:</strong> {selectedTable}</p>
                <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
              </div>

              {/* Order Items */}
              <div className="kot-items">
                {orderItems.map((item) => (
                  <div key={item.id} className="kot-item">
                    <div>
                      <p className="kot-item-name">{item.name} x {item.quantity}</p>
                      {item.notes && (
                        <p className="kot-item-details">Note: {item.notes}</p>
                      )}
                    </div>
                    <p className="kot-item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="kot-total">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>GST (18%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="summary-row">
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="kot-modal-actions">
              <button
                onClick={() => {
                  setShowKOTPreview(false);
                  setOrderItems([]);
                  setDiscount(0);
                  setSelectedTable('');
                }}
                className="kot-btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // TODO: Print KOT functionality
                  window.print();
                }}
                className="kot-btn-primary"
              >
                Print KOT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;


