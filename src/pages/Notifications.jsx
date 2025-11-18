import React, { useState } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Order Ready',
      title: 'Order Ready for Pickup',
      message: 'KOT-123456 for Table T-05 is ready',
      timestamp: new Date(Date.now() - 2 * 60000), // 2 minutes ago
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'Printer Error',
      title: 'Printer Connection Lost',
      message: 'Kitchen Printer 1 is disconnected',
      timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'Low Stock',
      title: 'Low Stock Alert',
      message: 'Chicken Biryani is running low (5 items remaining)',
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      read: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'Order Ready',
      title: 'Order Ready for Pickup',
      message: 'KOT-123457 for Table T-12 is ready',
      timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
      read: true,
      priority: 'high'
    },
    {
      id: 5,
      type: 'Low Stock',
      title: 'Low Stock Alert',
      message: 'Mango Lassi is running low (3 items remaining)',
      timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
      read: true,
      priority: 'medium'
    },
    {
      id: 6,
      type: 'Printer Error',
      title: 'Printer Paper Low',
      message: 'Receipt Printer is running low on paper',
      timestamp: new Date(Date.now() - 90 * 60000), // 1.5 hours ago
      read: true,
      priority: 'low'
    },
    {
      id: 7,
      type: 'Order Ready',
      title: 'Order Ready for Pickup',
      message: 'KOT-123458 for Table T-08 is ready',
      timestamp: new Date(Date.now() - 120 * 60000), // 2 hours ago
      read: true,
      priority: 'high'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    orderReady: true,
    printerError: true,
    lowStock: true,
    paymentReceived: false,
    tableStatus: false
  });

  // Mock data - TODO: Replace with API calls
  // const fetchNotifications = async () => {
  //   const response = await fetch('/api/notifications');
  //   return response.json();
  // };
  // const markAsRead = async (notificationId) => {
  //   const response = await fetch(`/api/notifications/${notificationId}/read`, {
  //     method: 'PUT',
  //   });
  //   return response.json();
  // };
  // const clearAllNotifications = async () => {
  //   const response = await fetch('/api/notifications/clear', {
  //     method: 'DELETE',
  //   });
  //   return response.json();
  // };
  // const updateNotificationSettings = async (settings) => {
  //   const response = await fetch('/api/notifications/settings', {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(settings),
  //   });
  //   return response.json();
  // };

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'Order Ready':
        return (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Printer Error':
        return (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'Low Stock':
        return (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
    }
  };

  // Get notification color
  const getNotificationColor = (type, priority) => {
    if (type === 'Printer Error') {
      return 'bg-red-100 text-red-800 border-red-300';
    }
    if (type === 'Order Ready') {
      return 'bg-green-100 text-green-800 border-green-300';
    }
    if (type === 'Low Stock') {
      return priority === 'high' ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
    return 'bg-blue-100 text-blue-800 border-blue-300';
  };

  // Format time ago
  const getTimeAgo = (date) => {
    const minutes = Math.floor((Date.now() - date) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Mark as read
  const handleMarkAsRead = (id) => {
    // TODO: Replace with actual API call
    // await markAsRead(id);
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    // TODO: Replace with actual API call
    // await markAllAsRead();
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Clear all
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      // TODO: Replace with actual API call
      // await clearAllNotifications();
      setNotifications([]);
    }
  };

  // Update notification settings
  const handleSettingsChange = (key, value) => {
    const newSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(newSettings);
    // TODO: Replace with actual API call
    // await updateNotificationSettings(newSettings);
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications;

  return (
    <div className="notifications-page-loaded w-full min-h-[calc(100vh-64px)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, rgba(224, 231, 255, 0.3) 30%, rgba(224, 231, 255, 0.2) 100%)',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6 animate-slide-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Notifications Center
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-600 ml-12 sm:ml-0">
                {unreadCount > 0 ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <span className="font-semibold text-blue-600">{unreadCount}</span>
                    <span>unread notification{unreadCount > 1 ? 's' : ''}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-green-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    All caught up!
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="group relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="hidden sm:inline">Mark All Read</span>
                    <span className="sm:hidden">Mark Read</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="group relative px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-red-300 text-red-600 font-semibold rounded-xl shadow-sm hover:shadow-lg hover:border-red-400 hover:bg-red-50 transform hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline">Clear All</span>
                    <span className="sm:hidden">Clear</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Notifications Feed */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 md:p-16 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
                  <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
                <p className="text-sm sm:text-base text-gray-500">You're all caught up! Check back later for updates.</p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`group relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl border-2 transition-all duration-300 ease-out transform hover:-translate-y-1 ${
                    !notification.read 
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 shadow-blue-100/50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="absolute top-4 right-4">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </span>
                    </div>
                  )}

                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${getNotificationColor(notification.type, notification.priority)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className={`text-base sm:text-lg font-bold mb-1 ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                              {notification.message}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                              {getTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                className="group/btn p-1.5 sm:p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-all duration-200 transform hover:scale-110"
                                title="Mark as read"
                              >
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Priority Badge */}
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
                            notification.priority === 'high' 
                              ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200' 
                              : notification.priority === 'medium'
                              ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border border-orange-200'
                              : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 bg-current"></span>
                            {notification.priority.toUpperCase()}
                          </span>
                          <span className={`text-xs sm:text-sm font-medium ${
                            notification.type === 'Order Ready' ? 'text-green-600' :
                            notification.type === 'Printer Error' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {notification.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notification Settings */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 animate-slide-in">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Settings</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'orderReady', label: 'Order Ready', icon: '✓', color: 'green' },
                  { key: 'printerError', label: 'Printer Error', icon: '⚠', color: 'red' },
                  { key: 'lowStock', label: 'Low Stock', icon: '📦', color: 'yellow' },
                  { key: 'paymentReceived', label: 'Payment Received', icon: '💰', color: 'blue' },
                  { key: 'tableStatus', label: 'Table Status', icon: '🪑', color: 'purple' }
                ].map((setting) => (
                  <label 
                    key={setting.key}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer border border-transparent hover:border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{setting.icon}</span>
                      <span className="text-sm sm:text-base font-medium text-gray-700">{setting.label}</span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={notificationSettings[setting.key]}
                        onChange={(e) => handleSettingsChange(setting.key, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                        notificationSettings[setting.key] 
                          ? setting.color === 'green' ? 'bg-green-500' :
                            setting.color === 'red' ? 'bg-red-500' :
                            setting.color === 'yellow' ? 'bg-yellow-500' :
                            setting.color === 'blue' ? 'bg-blue-500' :
                            'bg-purple-500'
                          : 'bg-gray-300'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-0.5 ${
                          notificationSettings[setting.key] ? 'translate-x-5' : 'translate-x-0.5'
                        }`}></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Push Preview */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 animate-slide-in">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Push Preview</h2>
              </div>
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl">
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs sm:text-sm font-bold text-gray-900">KOT System</p>
                        <p className="text-xs text-gray-500">now</p>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-gray-800 mb-1">Order Ready for Pickup</p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">KOT-123456 for Table T-05 is ready</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">Push notification preview</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 animate-slide-in">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Statistics</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Total Notifications', value: notifications.length, color: 'gray' },
                  { label: 'Unread', value: unreadCount, color: 'blue' },
                  { label: 'Read', value: notifications.length - unreadCount, color: 'gray' }
                ].map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-sm sm:text-base font-medium text-gray-700">{stat.label}</span>
                    <span className={`text-lg sm:text-xl font-bold ${
                      stat.color === 'blue' ? 'text-blue-600' : 'text-gray-800'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;