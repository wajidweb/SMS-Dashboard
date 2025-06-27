"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Users, Send, Upload } from "lucide-react";

interface ContactGroup {
  id: string;
  name: string;
  contacts: number;
  selected: boolean;
}

interface FormData {
  template: string;
  message: string;
  vendor: string;
  senderId: string;
  messageType: string;
  scheduleEnabled: boolean;
  scheduleDate: string;
  scheduleTime: string;
}

const SendSMSPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"manual" | "csv" | "groups">(
    "manual"
  );
  const [formData, setFormData] = useState<FormData>({
    template: "",
    message: "",
    vendor: "",
    senderId: "",
    messageType: "Transactional",
    scheduleEnabled: false,
    scheduleDate: "",
    scheduleTime: "",
  });

  const [contactGroups, setContactGroups] = useState<ContactGroup[]>([
    { id: "1", name: "VIP Customers", contacts: 1250, selected: false },
    { id: "2", name: "New Subscribers", contacts: 890, selected: false },
    { id: "3", name: "Inactive Users", contacts: 2340, selected: false },
  ]);

  const [dropdowns, setDropdowns] = useState({
    template: false,
    vendor: false,
    messageType: false,
  });

  // Refs for outside click detection
  const templateRef = useRef<HTMLDivElement>(null);
  const vendorRef = useRef<HTMLDivElement>(null);
  const messageTypeRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        templateRef.current &&
        !templateRef.current.contains(event.target as Node)
      ) {
        setDropdowns((prev) => ({ ...prev, template: false }));
      }
      if (
        vendorRef.current &&
        !vendorRef.current.contains(event.target as Node)
      ) {
        setDropdowns((prev) => ({ ...prev, vendor: false }));
      }
      if (
        messageTypeRef.current &&
        !messageTypeRef.current.contains(event.target as Node)
      ) {
        setDropdowns((prev) => ({ ...prev, messageType: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleGroupToggle = (groupId: string) => {
    setContactGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, selected: !group.selected } : group
      )
    );
  };

  const selectedGroups = contactGroups.filter((group) => group.selected);
  const totalRecipients = selectedGroups.reduce(
    (sum, group) => sum + group.contacts,
    0
  );
  const messageLength = formData.message.length;
  const smsCount = Math.ceil(messageLength / 160) || 0;
  const totalSMS = totalRecipients * smsCount;

  return (
    <div className="min-h-screen bg-gray-50 p-2 lg:p-3">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Send SMS</h1>
          <p className="text-gray-600">
            Send individual or bulk SMS messages to your recipients
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Compose Message */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Compose Message
              </h2>
              <p className="text-gray-600 mb-6">
                Create your SMS message and select recipients
              </p>

              {/* Template Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Use Template (Optional)
                </label>
                <div className="relative" ref={templateRef}>
                  <button
                    onClick={() => toggleDropdown("template")}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <span
                      className={
                        formData.template ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {formData.template || "Select a template"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        dropdowns.template ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdowns.template && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              template: "Welcome Message",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              template: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          Welcome Message{" "}
                          <span className="border px-3 py-1  rounded-md text-sm text-black font-bold">
                            transactional
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              template: "Promotional Offer",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              template: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          OTP Verification{" "}
                          <span className="border px-3 py-1  rounded-md text-sm text-black font-bold">
                            otp
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              template: "Reminder Notice",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              template: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          Promotional Offer{" "}
                          <span className="border px-3 py-1  rounded-md text-sm font-bold text-black">
                            promotional
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Message Content
                  </label>
                  <span className="text-sm text-gray-500">
                    {messageLength}/160 characters ({smsCount} SMS)
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Type your message here..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>
              </div>

              {/* Recipient Selection Tabs */}
              <div className="mb-6 border">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-[#f6f9fc] rounded-xl p-1 w-full">
                  <button
                    onClick={() => setActiveTab("manual")}
                    className={`px-6 py-2 text-sm w-full font-medium rounded-xl transition-all  ${
                      activeTab === "manual"
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    Manual Entry
                  </button>
                  <button
                    onClick={() => setActiveTab("csv")}
                    className={`px-6 py-2 text-sm w-full font-medium rounded-xl transition-all ${
                      activeTab === "csv"
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    CSV Upload
                  </button>
                  <button
                    onClick={() => setActiveTab("groups")}
                    className={`px-6 py-2 text-sm w-full font-medium rounded-xl transition-all ${
                      activeTab === "groups"
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    Groups
                  </button>
                </div>
              </div>

              {/* CSV Upload Tab Content */}
              {activeTab === "csv" && (
                <div className="mt-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center   transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16  rounded-lg flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                      <button className="bg-white border border-gray-300 rounded-lg px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mb-4">
                        <Upload className="w-6 h-6" />
                        <span>Upload CSV File</span>
                      </button>
                      <p className="text-gray-500 text-sm">
                        CSV should contain phone numbers in the first column
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Manual Entry Tab Content */}
              {activeTab === "manual" && (
                <div className="mt-3">
                  <div className="space-y-4">
                    <label className="block text-sm  text-black font-bold">
                      Phone Numbers
                    </label>
                    <textarea
                      placeholder="Enter phone numbers (one per line or comma-separated) +1234567890 +0987654321"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={6}
                    />
                  </div>
                </div>
              )}

              {/* Groups Selection */}
              {activeTab === "groups" && (
                <div>
                  <h3 className="text-lg  text-gray-900 font-bold mb-4">
                    Select Groups
                  </h3>
                  <div className="space-y-4">
                    {contactGroups.map((group) => (
                      <div
                        key={group.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={group.selected}
                            onChange={() => handleGroupToggle(group.id)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {group.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {group.contacts.toLocaleString()} contacts
                            </p>
                          </div>
                        </div>
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Settings & Summary */}
          <div className="space-y-6">
            {/* Message Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Message Settings
              </h2>

              {/* SMS Vendor */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Vendor
                </label>
                <div className="relative" ref={vendorRef}>
                  <button
                    onClick={() => toggleDropdown("vendor")}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <span
                      className={
                        formData.vendor ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {formData.vendor || "Select vendor"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        dropdowns.vendor ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdowns.vendor && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              vendor: "Twilio",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              vendor: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          Twilio{" "}
                          <span className="border px-3 py-1  rounded-md text-sm font-bold text-black">
                            HTTP
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              vendor: "MessageBird",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              vendor: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          MessageBird{" "}
                          <span className="border px-3 py-1  rounded-md text-sm font-bold text-black">
                            HTTP
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              vendor: "MessageBird",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              vendor: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          Local SMPP
                          <span className="border px-3 py-1  rounded-md text-sm font-bold text-black">
                            SMPP
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sender ID */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender ID
                </label>
                <input
                  type="text"
                  value={formData.senderId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      senderId: e.target.value,
                    }))
                  }
                  placeholder="e.g., YourBrand"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Message Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <div className="relative" ref={messageTypeRef}>
                  <button
                    onClick={() => toggleDropdown("messageType")}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <span className="text-gray-900">
                      {formData.messageType}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        dropdowns.messageType ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdowns.messageType && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              messageType: "Transactional",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              messageType: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          Transactional
                        </button>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              messageType: "Promotional",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              messageType: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          Promotional
                        </button>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              messageType: "OTP",
                            }));
                            setDropdowns((prev) => ({
                              ...prev,
                              messageType: false,
                            }));
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors duration-150"
                        >
                          OTP
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Schedule Message
                  </h3>
                  <p className="text-sm text-gray-500">
                    Send message at a specific time
                  </p>
                </div>
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      scheduleEnabled: !prev.scheduleEnabled,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.scheduleEnabled ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.scheduleEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Conditional Date and Time Inputs */}
              {formData.scheduleEnabled && (
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
                        <svg
                          className="h-5 w-5 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="date"
                        id="date"
                        value={formData.scheduleDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            scheduleDate: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-datetime-edit]:opacity-0 [&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-datetime-edit-text]:opacity-0 [&::-webkit-datetime-edit-month-field]:opacity-0 [&::-webkit-datetime-edit-day-field]:opacity-0 [&::-webkit-datetime-edit-year-field]:opacity-0 [&::-webkit-inner-spin-button]:opacity-0 [&::-webkit-calendar-picker-indicator]:opacity-0"
                        style={{
                          colorScheme: "light",
                        }}
                        onFocus={(e) => e.target.showPicker?.()}
                      />
                      {!formData.scheduleDate && (
                        <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                          <span className="text-black text-sm">
                            Pick a date
                          </span>
                        </div>
                      )}
                      {formData.scheduleDate && (
                        <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                          <span className="text-black text-sm">
                            {new Date(formData.scheduleDate).toLocaleDateString()}
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
                        <svg
                          className="h-5 w-5 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="time"
                        id="time"
                        value={formData.scheduleTime}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            scheduleTime: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-datetime-edit]:opacity-0 [&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-datetime-edit-text]:opacity-0 [&::-webkit-datetime-edit-hour-field]:opacity-0 [&::-webkit-datetime-edit-minute-field]:opacity-0 [&::-webkit-datetime-edit-ampm-field]:opacity-0 [&::-webkit-inner-spin-button]:opacity-0 [&::-webkit-calendar-picker-indicator]:opacity-0"
                        onFocus={(e) => e.target.showPicker?.()}
                      />
                      {!formData.scheduleTime && (
                        <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                          <span className="text-black text-sm">
                            --:-- --
                          </span>
                        </div>
                      )}
                      {formData.scheduleTime && (
                        <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                          <span className="text-black text-sm">
                            {(() => {
                              const [hours, minutes] = formData.scheduleTime.split(':');
                              const hour = parseInt(hours);
                              const ampm = hour >= 12 ? 'PM' : 'AM';
                              const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                              return `${displayHour}:${minutes} ${ampm}`;
                            })()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Send Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Send Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-semibold text-gray-900">
                    {totalRecipients.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SMS Parts:</span>
                  <span className="font-semibold text-gray-900">
                    {smsCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total SMS:</span>
                  <span className="font-semibold text-gray-900">
                    {totalSMS.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span className="font-bold text-gray-900">
                    ${(totalSMS * 0.01).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mt-6 flex items-center justify-center space-x-2 transition-colors">
                <Send className="w-5 h-5" />
                <span>Send SMS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendSMSPage;
