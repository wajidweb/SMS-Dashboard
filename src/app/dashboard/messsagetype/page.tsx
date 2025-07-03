'use client'
import React, { useState } from 'react';
import { Search, Copy, Edit, Trash2 } from 'lucide-react';

interface MessageType {
  id: string;
  name: string;
  createdAt: string;
}

export default function MessageTypePage() {
  const [messageTypes, setMessageTypes] = useState<MessageType[]>([
    {
      id: '1',
      name: 'Transactional',
      createdAt: '7/3/2025'
    },
    {
      id: '2',
      name: 'Promotional',
      createdAt: '7/3/2025'
    },
    {
      id: '3',
      name: 'OTP',
      createdAt: '7/3/2025'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryStats = () => {
    const total = messageTypes.length;
    return { total };
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    
    if (editingId) {
      setMessageTypes(prev => prev.map(mt => 
        mt.id === editingId 
          ? { ...mt, name: formData.name }
          : mt
      ));
      setEditingId(null);
    } else {
      const newMessageType: MessageType = {
        id: Date.now().toString(),
        name: formData.name,
        createdAt: new Date().toLocaleDateString()
      };
      setMessageTypes(prev => [...prev, newMessageType]);
    }
    setFormData({ name: '' });
  };

  const handleEdit = (messageType: MessageType) => {
    setFormData({ name: messageType.name });
    setEditingId(messageType.id);
  };

  const handleDelete = (id: string) => {
    setMessageTypes(prev => prev.filter(mt => mt.id !== id));
  };

  const filteredMessageTypes = messageTypes.filter(mt =>
    mt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gray-50 p-2 lg:p-4">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Types</h1>
              <p className="text-gray-600">Create and manage SMS message types</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-500">Total Message Types</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">{messageTypes.length > 0 ? messageTypes.length : 0}</div>
                <div className="text-sm text-gray-500">Active Types</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">Last Updated</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">{messageTypes.filter(mt => mt.createdAt === new Date().toLocaleDateString()).length}</div>
                <div className="text-sm text-gray-500">Created Today</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search message types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Message Types List */}
            <div className="space-y-4">
              {filteredMessageTypes.map((messageType) => (
                <div key={messageType.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{messageType.name}</h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Message Type
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Created: {messageType.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(messageType)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(messageType.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Create/Edit Form */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId ? 'Edit Message Type' : 'Create Message Type'}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Type Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter message type name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}