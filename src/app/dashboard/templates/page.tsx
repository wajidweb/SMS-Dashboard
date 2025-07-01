'use client'
import React, { useState, useEffect } from 'react';
import { Search,  Edit, Copy, Trash2, FileText, X, Check } from 'lucide-react';

interface SMSTemplate {
  id: string;
  name: string;
  category: 'Transactional' | 'Promotional' | 'OTP';
  content: string;
  createdAt: string;
  variables: string[];
}

const SMSTemplateManager = () => {
  const [templates, setTemplates] = useState<SMSTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<SMSTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Transactional' as SMSTemplate['category'],
    content: ''
  });

  // Load templates from localStorage on component mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem('sms-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  // Save templates to localStorage whenever templates change
  useEffect(() => {
    localStorage.setItem('sms-templates', JSON.stringify(templates));
  }, [templates]);

  // Extract variables from template content
  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  };

  // Filter templates based on search term
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get category stats
  const categoryStats = {
    total: templates.length,
    transactional: templates.filter(t => t.category === 'Transactional').length,
    promotional: templates.filter(t => t.category === 'Promotional').length,
    otp: templates.filter(t => t.category === 'OTP').length
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.content) return;

    const variables = extractVariables(formData.content);
    
    if (editingTemplate) {
      // Update existing template
      setTemplates(prev => prev.map(template => 
        template.id === editingTemplate.id 
          ? { ...template, ...formData, variables }
          : template
      ));
      setEditingTemplate(null);
    } else {
      // Create new template
      const newTemplate: SMSTemplate = {
        id: Date.now().toString(),
        ...formData,
        variables,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTemplates(prev => [...prev, newTemplate]);
    }

    // Reset form
    setFormData({ name: '', category: 'Transactional', content: '' });
    setIsCreateModalOpen(false);
  };

  // Handle edit
  const handleEdit = (template: SMSTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      content: template.content
    });
    setIsCreateModalOpen(true);
  };

  // Handle copy
  const handleCopy = (template: SMSTemplate) => {
    navigator.clipboard.writeText(template.content);
    // You could add a toast notification here
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  // Close modal and reset form
  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingTemplate(null);
    setFormData({ name: '', category: 'Transactional', content: '' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Transactional': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Promotional': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'OTP': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Stats */}
      <div className="bg-blue-600 text-white rounded-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <FileText className="w-10 h-10 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">Content Templates</h1>
              <p className="text-blue-100 mt-1">Create and manage SMS message templates</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold">{categoryStats.total}</div>
              <div className="text-sm text-blue-100">Total Templates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold">{categoryStats.transactional}</div>
              <div className="text-sm text-blue-100">Transactional</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold">{categoryStats.promotional}</div>
              <div className="text-sm text-blue-100">Promotional</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold">{categoryStats.otp}</div>
              <div className="text-sm text-blue-100">OTP</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-blue-500 px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">SMS Templates</h2>
                    <p className="text-blue-100 text-sm">Manage your message templates</p>
                  </div>
             
                </div>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Templates List */}
              <div className="divide-y divide-gray-100">
                {filteredTemplates.length === 0 ? (
                  <div className="p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                    <p className="text-gray-500 mb-6">
                      {searchTerm ? 'Try adjusting your search terms' : 'Create your first SMS template to get started'}
                    </p>
                   
                  </div>
                ) : (
                  filteredTemplates.map((template) => (
                    <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {template.name}
                            </h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(template.category)}`}>
                              {template.category}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {template.content}
                          </p>

                          {template.variables.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {template.variables.map((variable, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono"
                                >
                                  {`{{${variable}}}`}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-sm text-gray-500">
                            Created: {new Date(template.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleCopy(template)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Copy content"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(template)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit template"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(template.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete template"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Create/Edit Template Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
              <div className="bg-blue-500 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">
                  {editingTemplate ? 'Edit Template' : 'Create Template'}
                </h3>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter template name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as SMSTemplate['category'] }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="Transactional">Transactional</option>
                    <option value="Promotional">Promotional</option>
                    <option value="OTP">OTP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Enter your message template..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use {`{{variable}}`} for dynamic content (e.g., {`{{name}}`}, {`{{code}}`})
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition-all font-medium flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {editingTemplate ? 'Update Template' : 'Save Template'}
                  </button>
                  {editingTemplate && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTemplate(null);
                        setFormData({ name: '', category: 'Transactional', content: '' });
                      }}
                      className="px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
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

      {/* Mobile Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingTemplate ? 'Edit Template' : 'Create Template'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter template name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as SMSTemplate['category'] }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="Transactional">Transactional</option>
                  <option value="Promotional">Promotional</option>
                  <option value="OTP">OTP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Enter your message template..."
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Use {`{{variable}}`} for dynamic content (e.g., {`{{name}}`}, {`{{code}}`})
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition-all font-medium flex items-center justify-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {editingTemplate ? 'Update Template' : 'Save Template'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMSTemplateManager;