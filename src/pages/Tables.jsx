import React, { useState } from 'react';
import './Tables.css';

const Tables = () => {
  const [tables, setTables] = useState([
    { id: 1, number: 'T-01', seats: 4, status: 'Available' },
    { id: 2, number: 'T-02', seats: 2, status: 'Occupied' },
    { id: 3, number: 'T-03', seats: 6, status: 'Available' },
    { id: 4, number: 'T-04', seats: 4, status: 'Reserved' },
    { id: 5, number: 'T-05', seats: 2, status: 'Occupied' },
    { id: 6, number: 'T-06', seats: 8, status: 'Available' },
    { id: 7, number: 'T-07', seats: 4, status: 'Available' },
    { id: 8, number: 'T-08', seats: 6, status: 'Occupied' },
    { id: 9, number: 'T-09', seats: 2, status: 'Reserved' },
    { id: 10, number: 'T-10', seats: 4, status: 'Available' },
    { id: 11, number: 'T-11', seats: 6, status: 'Occupied' },
    { id: 12, number: 'T-12', seats: 8, status: 'Available' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [showStatusMenu, setShowStatusMenu] = useState(null);

  // Mock API hooks - TODO: Replace with actual API calls
  // const fetchTables = async () => {
  //   const response = await fetch('/api/tables');
  //   return response.json();
  // };
  // const createTable = async (tableData) => {
  //   const response = await fetch('/api/tables', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(tableData),
  //   });
  //   return response.json();
  // };
  // const updateTable = async (id, tableData) => {
  //   const response = await fetch(`/api/tables/${id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(tableData),
  //   });
  //   return response.json();
  // };
  // const deleteTable = async (id) => {
  //   const response = await fetch(`/api/tables/${id}`, {
  //     method: 'DELETE',
  //   });
  //   return response.json();
  // };

  const [newTable, setNewTable] = useState({
    number: '',
    seats: 4,
    status: 'Available'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Occupied':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Reserved':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredTables = tables.filter(table => {
    const matchesSearch = table.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || table.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddTable = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    // await createTable(newTable);
    const newId = Math.max(...tables.map(t => t.id)) + 1;
    setTables([...tables, { ...newTable, id: newId }]);
    setNewTable({ number: '', seats: 4, status: 'Available' });
    setShowAddModal(false);
  };

  const handleChangeStatus = (tableId, newStatus) => {
    // TODO: Replace with actual API call
    // await updateTable(tableId, { status: newStatus });
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, status: newStatus } : table
    ));
    setShowStatusMenu(null);
  };

  const handleOpenOrder = (tableId) => {
    // TODO: Navigate to order page or open order modal
    alert(`Opening order for table ${tables.find(t => t.id === tableId)?.number}`);
  };

  const handleMerge = (tableId) => {
    // TODO: Implement merge functionality
    alert(`Merge functionality for table ${tables.find(t => t.id === tableId)?.number}`);
  };

  const handleEdit = (tableId) => {
    // TODO: Open edit modal
    alert(`Edit functionality for table ${tables.find(t => t.id === tableId)?.number}`);
  };

  return (
    <div className="tables-page" style={{ minHeight: 'auto', padding: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Table Management</h1>
        <p className="page-subtitle">Manage and monitor all restaurant tables</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="controls-bar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <button
            onClick={() => setStatusFilter('All')}
            className={`filter-btn ${statusFilter === 'All' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('Available')}
            className={`filter-btn ${statusFilter === 'Available' ? 'active' : ''}`}
          >
            Available
          </button>
          <button
            onClick={() => setStatusFilter('Occupied')}
            className={`filter-btn ${statusFilter === 'Occupied' ? 'active' : ''}`}
          >
            Occupied
          </button>
          <button
            onClick={() => setStatusFilter('Reserved')}
            className={`filter-btn ${statusFilter === 'Reserved' ? 'active' : ''}`}
          >
            Reserved
          </button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="tables-grid">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className={`table-card ${table.status.toLowerCase()}`}
            // TODO: Add drag-and-drop handlers here
            // onDragStart={(e) => handleDragStart(e, table.id)}
            // onDragOver={(e) => handleDragOver(e)}
            // onDrop={(e) => handleDrop(e, table.id)}
            // draggable={true}
          >
            {/* Status Badge */}
            <div className={`table-status ${table.status.toLowerCase()}`}>
              {getStatusIcon(table.status)}
              {table.status}
            </div>

            {/* Table Content */}
            <div className="table-header">
              <h3 className="table-number">{table.number}</h3>
            </div>

            <div className="table-info">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{table.seats} Seats</span>
            </div>

            {/* Actions */}
            <div className="table-actions">
              <button
                onClick={() => handleOpenOrder(table.id)}
                className="action-btn"
                title="Open Order"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Open</span>
              </button>
                
              {/* Actions Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setShowActionsMenu(showActionsMenu === table.id ? null : table.id)}
                  className="action-btn"
                  title="More Actions"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  <span>More</span>
                </button>

                {/* Actions Dropdown */}
                {showActionsMenu === table.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleMerge(table.id);
                          setShowActionsMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        Merge Tables
                      </button>
                      <button
                        onClick={() => {
                          handleEdit(table.id);
                          setShowActionsMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Table
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={() => {
                          setShowStatusMenu(showStatusMenu === table.id ? null : table.id);
                          setShowActionsMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Change Status
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Change Menu */}
              {showStatusMenu === table.id && (
                <div className="absolute right-3 bottom-16 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleChangeStatus(table.id, 'Available')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Available
                    </button>
                    <button
                      onClick={() => handleChangeStatus(table.id, 'Occupied')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Occupied
                    </button>
                    <button
                      onClick={() => handleChangeStatus(table.id, 'Reserved')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Reserved
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTables.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tables found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Floating Add Table Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="add-table-btn"
        aria-label="Add New Table"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => {
          setShowAddModal(false);
          setNewTable({ number: '', seats: 4, status: 'Available' });
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Table</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewTable({ number: '', seats: 4, status: 'Available' });
                }}
                className="modal-close"
                aria-label="Close Modal"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddTable}>
              <div className="form-group">
                <label className="form-label">Table Number</label>
                <input
                  type="text"
                  required
                  value={newTable.number}
                  onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                  placeholder="e.g., T-13"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Number of Seats</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="20"
                  value={newTable.seats}
                  onChange={(e) => setNewTable({ ...newTable, seats: parseInt(e.target.value) })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Status</label>
                <select
                  value={newTable.status}
                  onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
                  className="form-select"
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewTable({ number: '', seats: 4, status: 'Available' });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Click outside to close menus */}
      {(showActionsMenu || showStatusMenu) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowActionsMenu(null);
            setShowStatusMenu(null);
          }}
        ></div>
      )}
    </div>
  );
};

export default Tables;


