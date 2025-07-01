"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  BarChart3,
} from "lucide-react";

// Mock data - replace with your actual data source
const mockMessages = [
  {
    id: 1,
    destination_addr: "+1234567890",
    status: "delivered",
    rate: 0.0012,
    status_at: "2025-06-30T14:30:00Z",
    campaign: "summer-promo",
  },
  {
    id: 2,
    destination_addr: "+1987654321",
    status: "queue",
    rate: 0.0015,
    status_at: "2025-06-30T13:45:00Z",
    campaign: "welcome-series",
  },
  {
    id: 3,
    destination_addr: "+1122334455",
    status: "filled",
    rate: 0.0018,
    status_at: "2025-06-30T12:20:00Z",
    campaign: "summer-promo",
  },
  {
    id: 4,
    destination_addr: "+1555666777",
    status: "delivered",
    rate: 0.0014,
    status_at: "2025-06-29T16:15:00Z",
    campaign: "newsletter",
  },
  {
    id: 5,
    destination_addr: "+1888999000",
    status: "delivered",
    rate: 0.0013,
    status_at: "2025-06-29T11:30:00Z",
    campaign: "summer-promo",
  },
  {
    id: 6,
    destination_addr: "+1444555666",
    status: "queue",
    rate: 0.0016,
    status_at: "2025-06-28T09:45:00Z",
    campaign: "welcome-series",
  },
  {
    id: 7,
    destination_addr: "+1777888999",
    status: "filled",
    rate: 0.0019,
    status_at: "2025-06-28T14:20:00Z",
    campaign: "newsletter",
  },
  {
    id: 8,
    destination_addr: "+1333444555",
    status: "delivered",
    rate: 0.0011,
    status_at: "2025-06-27T10:15:00Z",
    campaign: "summer-promo",
  },
  {
    id: 9,
    destination_addr: "+1666777888",
    status: "delivered",
    rate: 0.0017,
    status_at: "2025-06-26T15:30:00Z",
    campaign: "welcome-series",
  },
  {
    id: 10,
    destination_addr: "+1999000111",
    status: "queue",
    rate: 0.002,
    status_at: "2025-06-25T08:45:00Z",
    campaign: "newsletter",
  },
  {
    id: 11,
    destination_addr: "+1111222333",
    status: "filled",
    rate: 0.0022,
    status_at: "2025-06-24T13:20:00Z",
    campaign: "summer-promo",
  },
  {
    id: 12,
    destination_addr: "+1222333444",
    status: "delivered",
    rate: 0.001,
    status_at: "2025-06-23T11:15:00Z",
    campaign: "welcome-series",
  },
  {
    id: 13,
    destination_addr: "+1333444555",
    status: "delivered",
    rate: 0.0015,
    status_at: "2025-06-22T16:30:00Z",
    campaign: "newsletter",
  },
  {
    id: 14,
    destination_addr: "+1444555666",
    status: "queue",
    rate: 0.0018,
    status_at: "2025-06-21T09:45:00Z",
    campaign: "summer-promo",
  },
  {
    id: 15,
    destination_addr: "+1555666777",
    status: "filled",
    rate: 0.0021,
    status_at: "2025-06-20T14:20:00Z",
    campaign: "welcome-series",
  },
  {
    id: 16,
    destination_addr: "+1666777888",
    status: "delivered",
    rate: 0.0012,
    status_at: "2025-06-19T10:15:00Z",
    campaign: "newsletter",
  },
  {
    id: 17,
    destination_addr: "+1777888999",
    status: "delivered",
    rate: 0.0016,
    status_at: "2025-06-18T15:30:00Z",
    campaign: "summer-promo",
  },
  {
    id: 18,
    destination_addr: "+1888999000",
    status: "queue",
    rate: 0.0019,
    status_at: "2025-06-17T08:45:00Z",
    campaign: "welcome-series",
  },
  {
    id: 19,
    destination_addr: "+1999000111",
    status: "filled",
    rate: 0.0023,
    status_at: "2025-06-16T13:20:00Z",
    campaign: "newsletter",
  },
  {
    id: 20,
    destination_addr: "+1000111222",
    status: "delivered",
    rate: 0.0014,
    status_at: "2025-06-15T11:15:00Z",
    campaign: "summer-promo",
  },
];

const campaigns = [
  "summer-promo",
  "welcome-series",
  "newsletter",
  "holiday-campaign",
  "flash-sale",
];

const MessagingReportPage: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const recordsPerPage = 15;

  const getMonday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Quick date filters
  const setQuickDate = (period: string) => {
    const today = new Date();
    const todayStr = formatDateForInput(today);

    switch (period) {
      case "today":
        setFromDate(todayStr);
        setToDate(todayStr);
        break;
      case "thisWeek":
        const monday = getMonday(today);
        setFromDate(formatDateForInput(monday));
        setToDate(todayStr);
        break;
      case "last7Days":
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        setFromDate(formatDateForInput(sevenDaysAgo));
        setToDate(todayStr);
        break;
      case "thisMonth":
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        setFromDate(formatDateForInput(firstDay));
        setToDate(todayStr);
        break;
    }
  };

  // Filter messages based on criteria
  const filteredMessages = useMemo(() => {
    return mockMessages.filter((message) => {
      // Date filtering
      const messageDate = new Date(message.status_at)
        .toISOString()
        .split("T")[0];

      if (fromDate && messageDate < fromDate) return false;
      if (toDate && messageDate > toDate) return false;

      // Status filtering
      if (statusFilter !== "all" && message.status !== statusFilter)
        return false;

      // Campaign filtering
      if (campaignFilter !== "all" && message.campaign !== campaignFilter)
        return false;

      return true;
    });
  }, [fromDate, toDate, statusFilter, campaignFilter]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const stats = {
      totalMessages: filteredMessages.length,
      totalCharges: filteredMessages.reduce((sum, msg) => sum + msg.rate, 0),
      statusBreakdown: {} as Record<string, { count: number; charges: number }>,
    };

    // Calculate status breakdown
    filteredMessages.forEach((message) => {
      if (!stats.statusBreakdown[message.status]) {
        stats.statusBreakdown[message.status] = { count: 0, charges: 0 };
      }
      stats.statusBreakdown[message.status].count++;
      stats.statusBreakdown[message.status].charges += message.rate;
    });

    return stats;
  }, [filteredMessages]);

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [fromDate, toDate, statusFilter, campaignFilter]);

  // Format functions
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(6);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "queue":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "filled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 lg:p-4">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Message Reports
            </h1>
            <p className="text-gray-600">
              Comprehensive analysis of your messaging campaigns
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {isFilterOpen ? "Hide" : "Show"} Filters
              </button>
            </div>

            <div className={`${isFilterOpen ? "block" : "hidden"} lg:block`}>
              {/* Quick Date Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quick Select
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "today", label: "Today" },
                    { key: "thisWeek", label: "This Week" },
                    { key: "last7Days", label: "Last 7 Days" },
                    { key: "thisMonth", label: "This Month" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setQuickDate(key)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-3 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="delivered">Delivered</option>
                    <option value="queue">Queue</option>
                    <option value="filled">Filled</option>
                  </select>
                </div>

                {/* Campaign Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign
                  </label>
                  <select
                    value={campaignFilter}
                    onChange={(e) => setCampaignFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Campaigns</option>
                    {campaigns.map((campaign) => (
                      <option key={campaign} value={campaign}>
                        {campaign
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Messages
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {summaryStats.totalMessages.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">$</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Charges
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summaryStats.totalCharges)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Status Summary
            </h3>
            <div className="space-y-3">
              {Object.entries(summaryStats.statusBreakdown).map(
                ([status, data]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          status
                        )}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      <span className="ml-3 text-sm text-gray-700">
                        {data.count} messages
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(data.charges)} credits
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Message Details
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredMessages.length)} of{" "}
              {filteredMessages.length} messages
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Charge
                  </th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMessages.map((message) => (
                  <tr
                    key={message.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="w-1/4 px-6 py-4 text-sm font-medium text-gray-900 break-all">
                      {message.destination_addr}
                    </td>
                    <td className="w-1/4 px-6 py-4 text-sm text-gray-900">
                      {formatCurrency(message.rate)}
                    </td>
                    <td className="w-1/4 px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          message.status
                        )}`}
                      >
                        {message.status.charAt(0).toUpperCase() +
                          message.status.slice(1)}
                      </span>
                    </td>
                    <td className="w-1/4 px-6 py-4 text-sm text-gray-900">
                      <div className="truncate">
                        {formatDateTime(message.status_at)}
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Fill empty rows to maintain consistent height */}
                {Array.from({
                  length: Math.max(0, recordsPerPage - currentMessages.length),
                }).map((_, index) => (
                  <tr key={`empty-${index}`} className="h-16">
                    <td className="w-1/4 px-6 py-4">&nbsp;</td>
                    <td className="w-1/4 px-6 py-4">&nbsp;</td>
                    <td className="w-1/4 px-6 py-4">&nbsp;</td>
                    <td className="w-1/4 px-6 py-4">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredMessages.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No messages found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingReportPage;
