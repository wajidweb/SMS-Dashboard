"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Info,
  Send,
  Save,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";

const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageType, setMessageType] = useState("Promotional");
  const [senderId, setSenderId] = useState("");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [messageTypeDropdownOpen, setMessageTypeDropdownOpen] = useState(false);
  const templateDropdownRef = useRef<HTMLDivElement>(null);
  const messageTypeDropdownRef = useRef<HTMLDivElement>(null);

  const targetGroups = [
    {
      id: "vip",
      name: "VIP Customers",
      description: "High-value customers",
      count: 1250,
    },
    {
      id: "new",
      name: "New Subscribers",
      description: "Recently subscribed users",
      count: 890,
    },
    {
      id: "inactive",
      name: "Inactive Users",
      description: "Users who haven't engaged recently",
      count: 2340,
    },
    {
      id: "recent",
      name: "Recent Purchasers",
      description: "Customers who bought in last 30 days",
      count: 567,
    },
  ];

  const templates = [
    { name: "Welcome Message", type: "transactional" },
    { name: "Promotional Offer", type: "promotional" },
    { name: "Event Reminder", type: "transactional" },
  ];

  const messageTypes = ["Promotional", "Transactional", "OTP"];

  // Calculate summary values
  const totalRecipients = selectedGroups.reduce((sum, groupId) => {
    const group = targetGroups.find((g) => g.id === groupId);
    return sum + (group ? group.count : 0);
  }, 0);

  const messageLength = messageContent.length;
  const estimatedCost = (totalRecipients * 0.05).toFixed(2);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        templateDropdownRef.current &&
        !templateDropdownRef.current.contains(event.target as Node)
      ) {
        setTemplateDropdownOpen(false);
      }
      if (
        messageTypeDropdownRef.current &&
        !messageTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setMessageTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isFormValid =
    campaignName && messageContent && selectedGroups.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-2 lg:p-4">
      <div className="w-full max-w-none mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={"/campaigns"}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Campaign
            </h1>
            <p className="text-gray-500 text-sm">
              Set up a new SMS marketing campaign
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Campaign Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                Campaign Details
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Basic information about your campaign
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Black Friday Sale 2024"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Brief description of your campaign"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-1">
                Message Content
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Choose a template or create a custom message
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Use Template (Optional)
                  </label>
                  <div className="relative" ref={templateDropdownRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setTemplateDropdownOpen(!templateDropdownOpen)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-left flex items-center justify-between"
                    >
                      {selectedTemplate || "Select a template"}
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          templateDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {templateDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
                        {templates.map((template) => (
                          <div
                            key={template.name}
                            onClick={() => {
                              setSelectedTemplate(template.name);
                              setTemplateDropdownOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-gray-200 cursor-pointer flex items-center first:rounded-t-lg last:rounded-b-lg"
                          >
                            <span className="text-sm text-gray-900">
                              {template.name}
                            </span>
                            <span className="text-xs px-2 py-1 text-black border font-bold ms-3 rounded-full">
                              {template.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Content
                  </label>
                  <textarea
                    placeholder="Type your message here..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {messageLength}/160 characters
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-black font-bold mb-2">
                    Message Type
                  </label>
                  <div className="relative" ref={messageTypeDropdownRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setMessageTypeDropdownOpen(!messageTypeDropdownOpen)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white text-left flex items-center justify-between"
                    >
                      {messageType}
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          messageTypeDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {messageTypeDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
                        {messageTypes.map((type) => (
                          <div
                            key={type}
                            onClick={() => {
                              setMessageType(type);
                              setMessageTypeDropdownOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer first:rounded-t-lg last:rounded-b-lg transition-colors"
                          >
                            <span className="text-sm text-gray-900">
                              {type}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                Target Audience
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Select the groups you want to target
              </p>

              <div className="space-y-3">
                {targetGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={group.id}
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => handleGroupToggle(group.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div>
                        <label
                          htmlFor={group.id}
                          className="text-sm  text-black font-semibold cursor-pointer"
                        >
                          {group.name}
                        </label>
                        <p className="text-xs text-gray-500">
                          {group.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm  text-gray-900 font-semibold">
                        {group.count.toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-500">contacts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Schedule Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Schedule Campaign
                    </label>
                    <p className="text-xs text-gray-500">
                      Send at a specific time
                    </p>
                  </div>
                  <button
                    onClick={() => setScheduleEnabled(!scheduleEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      scheduleEnabled ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        scheduleEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {scheduleEnabled && (
                  <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {/* Date Input */}
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-black" />
                        </div>
                        <input
                          type="date"
                          id="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-datetime-edit]:opacity-0 [&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-datetime-edit-text]:opacity-0 [&::-webkit-datetime-edit-month-field]:opacity-0 [&::-webkit-datetime-edit-day-field]:opacity-0 [&::-webkit-datetime-edit-year-field]:opacity-0 [&::-webkit-inner-spin-button]:opacity-0 [&::-webkit-calendar-picker-indicator]:opacity-0"
                          style={{
                            colorScheme: "light",
                          }}
                          onFocus={(e) => e.target.showPicker?.()}
                        />
                        {!scheduleDate && (
                          <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                            <span className="text-black text-sm">
                              Pick a date
                            </span>
                          </div>
                        )}
                        {scheduleDate && (
                          <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                            <span className="text-black text-sm">
                              {new Date(scheduleDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Time Input */}
                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Time
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-black" />
                        </div>
                        <input
                          type="time"
                          id="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-datetime-edit]:opacity-0 [&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-datetime-edit-text]:opacity-0 [&::-webkit-datetime-edit-hour-field]:opacity-0 [&::-webkit-datetime-edit-minute-field]:opacity-0 [&::-webkit-datetime-edit-ampm-field]:opacity-0 [&::-webkit-inner-spin-button]:opacity-0 [&::-webkit-calendar-picker-indicator]:opacity-0"
                          onFocus={(e) => e.target.showPicker?.()}
                        />
                        {!scheduleTime && (
                          <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                            <span className="text-black text-sm">--:-- --</span>
                          </div>
                        )}
                        {scheduleTime && (
                          <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                            <span className="text-black text-sm">
                              {(() => {
                                const [hours, minutes] =
                                  scheduleTime.split(":");
                                const hour = parseInt(hours);
                                const ampm = hour >= 12 ? "PM" : "AM";
                                const displayHour =
                                  hour === 0
                                    ? 12
                                    : hour > 12
                                    ? hour - 12
                                    : hour;
                                return `${displayHour}:${minutes} ${ampm}`;
                              })()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sender ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., YourBrand"
                    value={senderId}
                    onChange={(e) => setSenderId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Campaign Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Campaign Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Target Groups:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedGroups.length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Total Recipients:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {totalRecipients.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Message Length:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {messageLength} chars
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estimated Cost:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${estimatedCost}
                  </span>
                </div>
              </div>

              {!isFormValid && (
                <div className="mt-4 p-3  border  rounded-lg flex items-start  gap-2">
                  <Info className="w-4 h-4  flex-shrink-0" />
                  <div>
                    <p className="text-xs  font-medium">
                      Please fill in all required fields to continue
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                disabled={!isFormValid}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isFormValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
                Launch Campaign
              </button>

              <button className="w-full py-3 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
