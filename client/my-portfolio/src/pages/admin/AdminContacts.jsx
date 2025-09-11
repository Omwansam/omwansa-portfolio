import React, { useState, useEffect } from 'react';
import { apiService } from '../../services';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getContacts();
      // Normalize API response to an array and map fields to UI shape
      const rawList = Array.isArray(data)
        ? data
        : (data && Array.isArray(data.results))
          ? data.results
          : (data && Array.isArray(data.contacts))
            ? data.contacts
            : [];

      const normalized = rawList.map((item) => ({
        id: item.id,
        name: item.name || item.full_name || 'Unknown',
        email: item.email || '',
        subject: item.subject || 'No subject',
        message: item.message || '',
        // Backend likely returns read boolean; derive status for UI chips
        status: typeof item.read === 'boolean' ? (item.read ? 'read' : 'unread') : (item.status || 'unread'),
        createdAt: item.created_at || item.createdAt || new Date().toISOString(),
        phone: item.phone || '',
        company: item.company || ''
      }));

      setContacts(normalized);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to fetch contact messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      await apiService.markContactAsRead(contactId);
      setContacts((prev) => prev.map(c => c.id === contactId ? { ...c, read: true, status: 'read' } : c));
      setSuccess('Contact marked as read');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error marking contact as read:', error);
      setError('Failed to mark contact as read');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await apiService.deleteContact(contactId);
        setContacts(contacts.filter(c => c.id !== contactId));
        setSuccess('Contact message deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        console.error('Error deleting contact:', error);
        setError('Failed to delete contact message');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  // Guard against non-array shapes
  const safeContacts = Array.isArray(contacts) ? contacts : [];
  const filteredContacts = filter === 'all'
    ? safeContacts
    : safeContacts.filter(contact =>
        filter === 'replied' ? contact.status === 'replied' : contact.status === (filter === 'read' ? 'read' : 'unread')
      );

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleReply = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;
    setSelectedContact(contact);
    setReplySubject(contact.subject?.startsWith('Re:') ? contact.subject : `Re: ${contact.subject || 'your message'}`);
    setReplyMessage('');
    setShowReplyModal(true);
  };

  const sendReply = async () => {
    if (!selectedContact) return;
    if (!replyMessage.trim()) {
      setError('Reply message is required');
      setTimeout(() => setError(''), 2500);
      return;
    }
    try {
      await apiService.replyToContact(selectedContact.id, { subject: replySubject, message: replyMessage });
      setSuccess('Reply sent successfully');
      setContacts(prev => prev.map(c => c.id === selectedContact.id ? { ...c, status: 'replied' } : c));
      setShowReplyModal(false);
      setSelectedContact(null);
      setReplySubject('');
      setReplyMessage('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to send reply', err);
      setError('Failed to send reply');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'read':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'replied':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage contact form submissions and inquiries
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {safeContacts.filter(c => c.status === 'unread').length} unread messages
          </span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {['all', 'unread', 'read', 'replied'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                {safeContacts.filter(c => c.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{safeContacts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📧</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {safeContacts.filter(c => c.status === 'unread').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔴</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Read</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {safeContacts.filter(c => c.status === 'read').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Replied</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {safeContacts.filter(c => c.status === 'replied').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Messages</h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{contact.email}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {contact.subject}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {contact.message}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>📅 {formatDate(contact.createdAt)}</span>
                    {contact.company && <span>🏢 {contact.company}</span>}
                    {contact.phone && <span>📞 {contact.phone}</span>}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleViewContact(contact)}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    View
                  </button>
                  {contact.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(contact.id)}
                      className="px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                    >
                      Mark Read
                    </button>
                  )}
                  {contact.status !== 'replied' && (
                    <button
                      onClick={() => handleReply(contact.id)}
                      className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                    >
                      Reply
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Details</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedContact(null);
                  }}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedContact.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{selectedContact.email}</p>
                    {selectedContact.company && (
                      <p className="text-gray-500 dark:text-gray-400">{selectedContact.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                </div>

                {selectedContact.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedContact.phone}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Received
                  </label>
                  <p className="text-gray-600 dark:text-gray-300">{formatDate(selectedContact.createdAt)}</p>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedContact(null);
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  {selectedContact.status !== 'replied' && (
                    <button
                      onClick={() => handleReply(selectedContact.id)}
                      className="px-6 py-3 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                    >
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-xl w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reply to {selectedContact.name}</h3>
              <button
                onClick={() => { setShowReplyModal(false); setReplySubject(''); setReplyMessage(''); }}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                <input disabled value={selectedContact.email} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input value={replySubject} onChange={e => setReplySubject(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea value={replyMessage} onChange={e => setReplyMessage(e.target.value)} rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white text-black resize-none" placeholder="Type your reply..." />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button onClick={() => { setShowReplyModal(false); setReplySubject(''); setReplyMessage(''); }} className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
              <button onClick={sendReply} className="px-5 py-3 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600">Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;