import React, { useState } from 'react';
import './Billing.css';

const Billing = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSearch, setOrderSearch] = useState('');
  const [discountType, setDiscountType] = useState('flat'); // 'flat' or 'percentage'
  const [discountValue, setDiscountValue] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [serviceChargeEnabled, setServiceChargeEnabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [showSplitBill, setShowSplitBill] = useState(false);
  const [splitType, setSplitType] = useState('equal'); // 'equal' or 'items'
  const [splitCount, setSplitCount] = useState(2);

  // Mock orders - TODO: Replace with API calls
  // const fetchOrders = async () => {
  //   const response = await fetch('/api/orders');
  //   return response.json();
  // };
  // const processPayment = async (paymentData) => {
  //   const response = await fetch('/api/payments', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(paymentData),
  //   });
  //   return response.json();
  // };

  const mockOrders = [
    { id: 1, kotNumber: 'KOT-123456', tableNumber: 'T-05', status: 'Ready' },
    { id: 2, kotNumber: 'KOT-123457', tableNumber: 'T-12', status: 'Ready' },
    { id: 3, kotNumber: 'KOT-123458', tableNumber: 'T-08', status: 'Ready' },
  ];

  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: 'Chicken Biryani',
      quantity: 2,
      price: 350,
      originalPrice: 350
    },
    {
      id: 2,
      name: 'Butter Chicken',
      quantity: 1,
      price: 380,
      originalPrice: 380
    },
    {
      id: 3,
      name: 'Dal Makhani',
      quantity: 1,
      price: 200,
      originalPrice: 200
    },
    {
      id: 4,
      name: 'Butter Naan',
      quantity: 3,
      price: 50,
      originalPrice: 50
    },
    {
      id: 5,
      name: 'Mango Lassi',
      quantity: 2,
      price: 120,
      originalPrice: 120
    }
  ]);

  const filteredOrders = mockOrders.filter(order =>
    order.kotNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
    order.tableNumber.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = discountType === 'flat'
    ? discountValue
    : (subtotal * discountValue) / 100;
  const afterDiscount = subtotal - discountAmount;
  const serviceChargeAmount = serviceChargeEnabled ? (afterDiscount * serviceCharge) / 100 : 0;
  const gst = (afterDiscount + serviceChargeAmount) * 0.18;
  const total = afterDiscount + serviceChargeAmount + gst;

  // Handle order selection
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setOrderSearch('');
    // TODO: Fetch order items from API
    // const items = await fetchOrderItems(order.id);
    // setOrderItems(items);
  };

  // Update item quantity
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems(orderItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Update item price
  const handlePriceChange = (itemId, newPrice) => {
    if (newPrice < 0) return;
    setOrderItems(orderItems.map(item =>
      item.id === itemId ? { ...item, price: parseFloat(newPrice) || 0 } : item
    ));
  };

  // Remove item
  const handleRemoveItem = (itemId) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  // Handle payment
  const handleProcessPayment = () => {
    if (!selectedOrder) {
      alert('Please select an order first');
      return;
    }
    if (orderItems.length === 0) {
      alert('Order is empty');
      return;
    }

    // TODO: Replace with actual API call
    // await processPayment({
    //   orderId: selectedOrder.id,
    //   items: orderItems,
    //   discount: discountAmount,
    //   serviceCharge: serviceChargeAmount,
    //   gst,
    //   total,
    //   paymentMethod
    // });

    setShowInvoicePreview(true);
  };

  // Calculate split amounts
  const getSplitAmounts = () => {
    if (splitType === 'equal') {
      const amountPerPerson = total / splitCount;
      return Array(splitCount).fill(amountPerPerson);
    } else {
      // Split by items - divide items equally
      const itemsPerPerson = Math.ceil(orderItems.length / splitCount);
      const amounts = [];
      for (let i = 0; i < splitCount; i++) {
        const startIdx = i * itemsPerPerson;
        const endIdx = Math.min(startIdx + itemsPerPerson, orderItems.length);
        const personItems = orderItems.slice(startIdx, endIdx);
        const personSubtotal = personItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const personDiscount = discountType === 'flat'
          ? (personSubtotal / subtotal) * discountAmount
          : (personSubtotal * discountValue) / 100;
        const personAfterDiscount = personSubtotal - personDiscount;
        const personServiceCharge = serviceChargeEnabled ? (personAfterDiscount * serviceCharge) / 100 : 0;
        const personGST = (personAfterDiscount + personServiceCharge) * 0.18;
        amounts.push(personAfterDiscount + personServiceCharge + personGST);
      }
      return amounts;
    }
  };

  const splitAmounts = showSplitBill ? getSplitAmounts() : [];

  // Format date/time
  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="billing-page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="billing-header">
          <h1>Billing</h1>
          <p>Process payments and generate invoices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Selection & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Selection */}
            <div className="billing-order-selector">
              <h2 className="billing-order-selector-title">Select Order</h2>
              <div className="billing-order-search">
                <input
                  type="text"
                  placeholder="Search by KOT number or table..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="billing-order-search-input"
                />
                <svg className="billing-order-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {orderSearch && (
                <div className="billing-order-list">
                  {filteredOrders.map(order => (
                    <button
                      key={order.id}
                      onClick={() => handleSelectOrder(order)}
                      className={`billing-order-item ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                    >
                      <div className="billing-order-item-content">
                        <div className="billing-order-info">
                          <p className="billing-order-kot">{order.kotNumber}</p>
                          <p className="billing-order-table">Table {order.tableNumber}</p>
                        </div>
                        <span className="billing-order-status">
                          {order.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedOrder && (
                <div className="billing-order-selected">
                  <p className="billing-order-selected-label">Selected: {selectedOrder.kotNumber}</p>
                  <p className="billing-order-selected-value">Table {selectedOrder.tableNumber}</p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="billing-items-card">
              <div className="billing-items-header">
                <h2 className="billing-items-title">Order Items</h2>
              </div>
              <div className="billing-items-table-wrapper">
                <table className="billing-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <p className="billing-item-name">{item.name}</p>
                        </td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="billing-item-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                            className="billing-item-input billing-item-price-input"
                          />
                        </td>
                        <td>
                          <span className="billing-item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="billing-item-remove"
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-6">
            {/* Bill Summary */}
            <div className="billing-summary-card">
              <h2 className="billing-summary-title">Bill Summary</h2>

              <div className="billing-summary-content">
                {/* Subtotal */}
                <div className="billing-summary-row">
                  <span className="billing-summary-label">Subtotal</span>
                  <span className="billing-summary-value">₹{subtotal.toFixed(2)}</span>
                </div>

                {/* Discount */}
                <div className="billing-discount-group">
                  <div className="billing-discount-header">
                    <span className="billing-discount-label">Discount</span>
                    <div className="billing-discount-controls">
                      <select
                        value={discountType}
                        onChange={(e) => {
                          setDiscountType(e.target.value);
                          setDiscountValue(0);
                        }}
                        className="billing-discount-type"
                      >
                        <option value="flat">₹</option>
                        <option value="percentage">%</option>
                      </select>
                      <input
                        type="number"
                        min="0"
                        max={discountType === 'percentage' ? 100 : subtotal}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                        className="billing-discount-input"
                      />
                    </div>
                  </div>
                  {discountAmount > 0 && (
                    <div className="billing-discount-amount">
                      <span>Discount Amount</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Service Charge */}
                <div className="billing-service-charge-group">
                  <div className="billing-service-charge-header">
                    <div className="billing-service-charge-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="serviceChargeEnabled"
                        checked={serviceChargeEnabled}
                        onChange={(e) => setServiceChargeEnabled(e.target.checked)}
                        className="billing-service-charge-checkbox"
                      />
                      <label htmlFor="serviceChargeEnabled" className="billing-service-charge-label">
                        Service Charge
                      </label>
                    </div>
                    {serviceChargeEnabled && (
                      <div className="billing-service-charge-input-wrapper">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={serviceCharge}
                          onChange={(e) => setServiceCharge(parseFloat(e.target.value) || 0)}
                          className="billing-service-charge-input"
                        />
                        <span className="billing-service-charge-percent">%</span>
                      </div>
                    )}
                  </div>
                  {serviceChargeEnabled && serviceChargeAmount > 0 && (
                    <div className="billing-service-charge-amount">
                      <span>Service Charge</span>
                      <span>₹{serviceChargeAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* GST */}
                <div className="billing-gst-row">
                  <span className="billing-gst-label">GST (18%)</span>
                  <span className="billing-gst-value">₹{gst.toFixed(2)}</span>
                </div>

                {/* Total */}
                <div className="billing-total-section">
                  <div className="billing-total-row">
                    <span className="billing-total-label">Total</span>
                    <span className="billing-total-value">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Bill */}
            {showSplitBill && (
              <div className="billing-split-card">
                <h2 className="billing-split-title">Split Bill</h2>
                <div>
                  <div className="billing-split-type-group">
                    <label className="billing-split-type-label">Split Type</label>
                    <div className="billing-split-radio-group">
                      <div className="billing-split-radio-wrapper">
                        <input
                          type="radio"
                          name="splitType"
                          id="splitEqual"
                          value="equal"
                          checked={splitType === 'equal'}
                          onChange={(e) => setSplitType(e.target.value)}
                          className="billing-split-radio"
                        />
                        <label htmlFor="splitEqual" className="billing-split-radio-label">Equal Split</label>
                      </div>
                      <div className="billing-split-radio-wrapper">
                        <input
                          type="radio"
                          name="splitType"
                          id="splitItems"
                          value="items"
                          checked={splitType === 'items'}
                          onChange={(e) => setSplitType(e.target.value)}
                          className="billing-split-radio"
                        />
                        <label htmlFor="splitItems" className="billing-split-radio-label">By Items</label>
                      </div>
                    </div>
                  </div>
                  <div className="billing-split-count-group">
                    <label className="billing-split-count-label">Number of People</label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={splitCount}
                      onChange={(e) => setSplitCount(parseInt(e.target.value) || 2)}
                      className="billing-split-count-input"
                    />
                  </div>
                  <div className="billing-split-amounts">
                    <h3 className="billing-split-amounts-title">Split Amounts</h3>
                    <div className="billing-split-amount-list">
                      {splitAmounts.map((amount, index) => (
                        <div key={index} className="billing-split-amount-item">
                          <span className="billing-split-amount-label">Person {index + 1}</span>
                          <span className="billing-split-amount-value">₹{amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="billing-payment-card">
              <h2 className="billing-payment-title">Payment Method</h2>
              <div className="billing-payment-methods">
                {['Cash', 'Card', 'UPI'].map((method) => (
                  <label
                    key={method}
                    className={`billing-payment-method ${paymentMethod === method ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="billing-payment-radio"
                    />
                    <span className="billing-payment-label">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="billing-actions">
              <button
                onClick={() => setShowSplitBill(!showSplitBill)}
                className="billing-action-btn billing-action-btn-split"
              >
                {showSplitBill ? 'Cancel Split' : 'Split Bill'}
              </button>
              <button
                onClick={handleProcessPayment}
                className="billing-action-btn billing-action-btn-payment"
              >
                Process Payment
              </button>
              <button
                onClick={() => setShowInvoicePreview(true)}
                className="billing-action-btn billing-action-btn-preview"
              >
                Preview Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      {showInvoicePreview && (
        <div className="billing-invoice-overlay" onClick={() => setShowInvoicePreview(false)}>
          <div className="billing-invoice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="billing-invoice-header">
              <h2 className="billing-invoice-header-title">Invoice</h2>
              <div className="billing-invoice-header-actions">
                <button
                  onClick={() => window.print()}
                  className="billing-invoice-print-btn"
                >
                  <svg className="billing-invoice-print-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={() => setShowInvoicePreview(false)}
                  className="billing-invoice-close-btn"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="billing-invoice-body">
              {/* Invoice Header */}
              <div className="billing-invoice-restaurant">
                <h3 className="billing-invoice-restaurant-name">Restaurant Name</h3>
                <div className="billing-invoice-restaurant-details">
                  <p>123 Main Street, City, State - 123456</p>
                  <p>Phone: +91 1234567890</p>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="billing-invoice-details">
                <div className="billing-invoice-detail-item">
                  <p className="billing-invoice-detail-label">Invoice Number</p>
                  <p className="billing-invoice-detail-value">{selectedOrder?.kotNumber || 'KOT-123456'}</p>
                </div>
                <div className="billing-invoice-detail-item text-right">
                  <p className="billing-invoice-detail-label">Date</p>
                  <p className="billing-invoice-detail-value">{formatDateTime(new Date())}</p>
                </div>
                <div className="billing-invoice-detail-item">
                  <p className="billing-invoice-detail-label">Table</p>
                  <p className="billing-invoice-detail-value">{selectedOrder?.tableNumber || 'T-05'}</p>
                </div>
                <div className="billing-invoice-detail-item text-right">
                  <p className="billing-invoice-detail-label">Payment Method</p>
                  <p className="billing-invoice-detail-value">{paymentMethod}</p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <table className="billing-invoice-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">₹{item.price.toFixed(2)}</td>
                        <td className="text-right font-semibold">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="billing-invoice-summary">
                <div className="billing-invoice-summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="billing-invoice-summary-row discount">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {serviceChargeAmount > 0 && (
                  <div className="billing-invoice-summary-row">
                    <span>Service Charge</span>
                    <span>₹{serviceChargeAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="billing-invoice-summary-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="billing-invoice-summary-total">
                  <span>Total</span>
                  <span className="billing-invoice-summary-total-value">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="billing-invoice-footer">
                <div className="billing-invoice-footer-text">
                  <p>Thank you for your visit!</p>
                  <p>This is a computer-generated invoice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;


