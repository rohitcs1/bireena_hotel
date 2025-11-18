import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showStationModal, setShowStationModal] = useState(false);
  const [editingStation, setEditingStation] = useState(null);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: 'KOT Restaurant',
    address: '123 Main Street, City, State - 123456',
    phone: '+91 1234567890',
    email: 'info@kotrestaurant.com',
    currency: 'INR',
    timezone: 'Asia/Kolkata'
  });

  // Tax Settings
  const [taxSettings, setTaxSettings] = useState({
    gstRate: 18,
    serviceCharge: 10,
    serviceChargeEnabled: true
  });

  // Printer Settings
  const [printers, setPrinters] = useState([
    { id: 1, name: 'Kitchen Printer 1', type: 'KOT', status: 'Connected', ip: '192.168.1.100' },
    { id: 2, name: 'Receipt Printer', type: 'Receipt', status: 'Connected', ip: '192.168.1.101' },
    { id: 3, name: 'Bar Printer', type: 'KOT', status: 'Disconnected', ip: '192.168.1.102' }
  ]);

  // Kitchen Stations
  const [stations, setStations] = useState([
    { id: 1, name: 'Main', enabled: true, printerId: 1 },
    { id: 2, name: 'Bar', enabled: true, printerId: 3 },
    { id: 3, name: 'Dessert', enabled: true, printerId: 1 }
  ]);

  const [newStation, setNewStation] = useState({
    name: '',
    enabled: true,
    printerId: ''
  });

  // Users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@restaurant.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@restaurant.com', role: 'Waiter', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@restaurant.com', role: 'Kitchen', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@restaurant.com', role: 'Waiter', status: 'Inactive' }
  ]);

  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    role: 'Waiter'
  });

  // Show toast
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle Save
  const handleSave = () => {
    // TODO: Replace with actual API calls
    // await updateGeneralSettings(generalSettings);
    // await updateTaxSettings(taxSettings);
    // await updatePrinters(printers);
    // await updateStations(stations);
    // await updateUsers(users);
    showToastMessage('Settings saved successfully!');
  };

  // Handle Reset
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      // TODO: Fetch original settings from API
      showToastMessage('Settings reset to default values');
    }
  };

  // Handle Test Print
  const handleTestPrint = (printerId) => {
    // TODO: Replace with actual print functionality
    // await testPrint(printerId);
    showToastMessage(`Test print sent to printer ${printerId}`);
  };

  // Handle Detect Printers
  const handleDetectPrinters = () => {
    // TODO: Replace with actual printer detection
    // const detectedPrinters = await detectPrinters();
    // setPrinters(detectedPrinters);
    showToastMessage('Printer detection completed. Found 3 printers.');
  };

  // Handle Add/Edit Station
  const handleOpenStationModal = (station = null) => {
    if (station) {
      setEditingStation(station);
      setNewStation({
        name: station.name,
        enabled: station.enabled,
        printerId: station.printerId
      });
    } else {
      setEditingStation(null);
      setNewStation({
        name: '',
        enabled: true,
        printerId: ''
      });
    }
    setShowStationModal(true);
  };

  const handleSaveStation = () => {
    if (!newStation.name.trim()) {
      alert('Please enter station name');
      return;
    }

    if (editingStation) {
      // TODO: Replace with actual API call
      // await updateStation(editingStation.id, newStation);
      setStations(stations.map(s =>
        s.id === editingStation.id ? { ...s, ...newStation } : s
      ));
    } else {
      // TODO: Replace with actual API call
      // await createStation(newStation);
      const newId = Math.max(...stations.map(s => s.id), 0) + 1;
      setStations([...stations, { ...newStation, id: newId }]);
    }

    setShowStationModal(false);
    showToastMessage(`Station ${editingStation ? 'updated' : 'created'} successfully!`);
  };

  // Handle Invite User
  const handleInviteUser = () => {
    if (!inviteData.name.trim() || !inviteData.email.trim()) {
      alert('Please fill all required fields');
      return;
    }

    // TODO: Replace with actual API call
    // await inviteUser(inviteData);
    showToastMessage(`Invitation sent to ${inviteData.email}`);
    setShowInviteModal(false);
    setInviteData({ name: '', email: '', role: 'Waiter' });
  };

  // Handle Update User Role
  const handleUpdateUserRole = (userId, newRole) => {
    // TODO: Replace with actual API call
    // await updateUserRole(userId, newRole);
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
    showToastMessage('User role updated successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'taxes', label: 'Taxes' },
    { id: 'printers', label: 'Printers' },
    { id: 'stations', label: 'Stations' },
    { id: 'users', label: 'Users/Roles' }
  ];

  return (
    <div className="settings-page">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your restaurant settings and preferences</p>
        </div>

        {/* Tabs */}
        <div className="settings-tabs-container">
          <div className="settings-tabs-wrapper">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="settings-tab-content">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div>
                <h2 className="settings-section-title">General Settings</h2>
                <div className="settings-form-grid">
                  <div className="settings-form-group">
                    <label className="settings-label required">Restaurant Name</label>
                    <input
                      type="text"
                      value={generalSettings.restaurantName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, restaurantName: e.target.value })}
                      className="settings-input"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-label required">Phone Number</label>
                    <input
                      type="tel"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                      className="settings-input"
                    />
                  </div>
                  <div className="settings-form-group full-width">
                    <label className="settings-label required">Address</label>
                    <input
                      type="text"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                      className="settings-input"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-label required">Email</label>
                    <input
                      type="email"
                      value={generalSettings.email}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      className="settings-input"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-label">Currency</label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                      className="settings-select"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-label">Timezone</label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                      className="settings-select"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Taxes Tab */}
            {activeTab === 'taxes' && (
              <div>
                <h2 className="settings-section-title">Tax Settings</h2>
                <div className="settings-form-grid">
                  <div className="settings-form-group">
                    <label className="settings-label">GST Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={taxSettings.gstRate}
                      onChange={(e) => setTaxSettings({ ...taxSettings, gstRate: parseFloat(e.target.value) || 0 })}
                      className="settings-input"
                    />
                  </div>
                  <div className="settings-form-group full-width">
                    <div className="settings-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="serviceChargeEnabled"
                        checked={taxSettings.serviceChargeEnabled}
                        onChange={(e) => setTaxSettings({ ...taxSettings, serviceChargeEnabled: e.target.checked })}
                        className="settings-checkbox"
                      />
                      <label htmlFor="serviceChargeEnabled" className="settings-checkbox-label">
                        Enable Service Charge
                      </label>
                    </div>
                    {taxSettings.serviceChargeEnabled && (
                      <div className="mt-4">
                        <label className="settings-label">Service Charge (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={taxSettings.serviceCharge}
                          onChange={(e) => setTaxSettings({ ...taxSettings, serviceCharge: parseFloat(e.target.value) || 0 })}
                          className="settings-input"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Printers Tab */}
            {activeTab === 'printers' && (
              <div>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <h2 className="settings-section-title" style={{ marginBottom: 0 }}>Printer Settings</h2>
                  <button
                    onClick={handleDetectPrinters}
                    className="settings-btn settings-btn-primary"
                  >
                    <svg className="settings-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Detect Printers
                  </button>
                </div>
                <div className="printer-detection-card">
                  <svg className="printer-detection-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <p className="printer-detection-text">Click "Detect Printers" to scan for available printers on your network</p>
                </div>
                <div>
                  {printers.map((printer) => (
                    <div key={printer.id} className="printer-card">
                      <div className="printer-card-header">
                        <div className="flex-1">
                          <div className="printer-name">
                            {printer.name}
                            <span className={`printer-status ${printer.status.toLowerCase()}`}>
                              {printer.status}
                            </span>
                          </div>
                          <div className="printer-details">
                            <div className="printer-detail-item">
                              <span className="printer-detail-label">Type:</span>
                              <span>{printer.type}</span>
                            </div>
                            <div className="printer-detail-item">
                              <span className="printer-detail-label">IP Address:</span>
                              <span>{printer.ip}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleTestPrint(printer.id)}
                          className="settings-btn settings-btn-test"
                        >
                          Test Print
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stations Tab */}
            {activeTab === 'stations' && (
              <div>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <h2 className="settings-section-title" style={{ marginBottom: 0 }}>Kitchen Stations</h2>
                  <button
                    onClick={() => handleOpenStationModal()}
                    className="settings-btn settings-btn-primary"
                  >
                    <svg className="settings-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Station
                  </button>
                </div>
                <div>
                  {stations.map((station) => (
                    <div key={station.id} className="station-card">
                      <div className="station-card-content">
                        <div className="station-info">
                          <div className="station-name">{station.name}</div>
                          <div className="station-printer">
                            Printer: {printers.find(p => p.id === station.printerId)?.name || 'Not assigned'}
                          </div>
                        </div>
                        <div className="station-toggle">
                          <input
                            type="checkbox"
                            id={`station-${station.id}`}
                            checked={station.enabled}
                            onChange={(e) => {
                              setStations(stations.map(s =>
                                s.id === station.id ? { ...s, enabled: e.target.checked } : s
                              ));
                            }}
                            className="settings-checkbox"
                          />
                          <label htmlFor={`station-${station.id}`} className="settings-checkbox-label">
                            Enabled
                          </label>
                        </div>
                        <button
                          onClick={() => handleOpenStationModal(station)}
                          className="station-edit-btn"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users/Roles Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <h2 className="settings-section-title" style={{ marginBottom: 0 }}>Users & Roles</h2>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="settings-btn settings-btn-primary"
                  >
                    <svg className="settings-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Invite User
                  </button>
                </div>
                <div className="users-table-wrapper">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="user-name">{user.name}</div>
                          </td>
                          <td>
                            <div className="user-email">{user.email}</div>
                          </td>
                          <td>
                            <select
                              value={user.role}
                              onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                              className="user-role-select"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Waiter">Waiter</option>
                              <option value="Kitchen">Kitchen</option>
                            </select>
                          </td>
                          <td>
                            <span className={`user-status-badge ${user.status.toLowerCase()}`}>
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <button className="user-action-btn">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button
            onClick={handleReset}
            className="settings-btn-reset"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="settings-btn-save"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="settings-toast">
          <div className="settings-toast-content success">
            <svg className="settings-toast-icon success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="settings-toast-message">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="settings-toast-close"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="settings-modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h2 className="settings-modal-title">Invite User</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="settings-modal-close"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="settings-modal-body">
              <div className="settings-form-grid">
                <div className="settings-form-group full-width">
                  <label className="settings-label required">Name</label>
                  <input
                    type="text"
                    value={inviteData.name}
                    onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                    className="settings-input"
                    placeholder="Enter name"
                  />
                </div>
                <div className="settings-form-group full-width">
                  <label className="settings-label required">Email</label>
                  <input
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                    className="settings-input"
                    placeholder="Enter email"
                  />
                </div>
                <div className="settings-form-group full-width">
                  <label className="settings-label required">Role</label>
                  <select
                    value={inviteData.role}
                    onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                    className="settings-select"
                  >
                    <option value="Waiter">Waiter</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="settings-modal-footer">
              <button
                onClick={() => setShowInviteModal(false)}
                className="settings-modal-btn settings-modal-btn-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteUser}
                className="settings-modal-btn settings-modal-btn-submit"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Station Modal */}
      {showStationModal && (
        <div className="settings-modal-overlay" onClick={() => setShowStationModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h2 className="settings-modal-title">
                {editingStation ? 'Edit Station' : 'Add Station'}
              </h2>
              <button
                onClick={() => setShowStationModal(false)}
                className="settings-modal-close"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="settings-modal-body">
              <div className="settings-form-grid">
                <div className="settings-form-group full-width">
                  <label className="settings-label required">Station Name</label>
                  <input
                    type="text"
                    value={newStation.name}
                    onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                    className="settings-input"
                    placeholder="e.g., Main, Bar, Dessert"
                  />
                </div>
                <div className="settings-form-group full-width">
                  <label className="settings-label">Assign Printer</label>
                  <select
                    value={newStation.printerId}
                    onChange={(e) => setNewStation({ ...newStation, printerId: parseInt(e.target.value) || '' })}
                    className="settings-select"
                  >
                    <option value="">Select Printer</option>
                    {printers.map(printer => (
                      <option key={printer.id} value={printer.id}>{printer.name}</option>
                    ))}
                  </select>
                </div>
                <div className="settings-form-group full-width">
                  <div className="settings-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="station-enabled"
                      checked={newStation.enabled}
                      onChange={(e) => setNewStation({ ...newStation, enabled: e.target.checked })}
                      className="settings-checkbox"
                    />
                    <label htmlFor="station-enabled" className="settings-checkbox-label">
                      Enabled
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="settings-modal-footer">
              <button
                onClick={() => setShowStationModal(false)}
                className="settings-modal-btn settings-modal-btn-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStation}
                className="settings-modal-btn settings-modal-btn-submit"
              >
                {editingStation ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;


