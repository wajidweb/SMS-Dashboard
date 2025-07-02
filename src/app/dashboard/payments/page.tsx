
'use client'
import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Wallet,
  TrendingUp,
  DollarSign,
} from "lucide-react";

// Type definitions
interface Payment {
  id: number;
  amount: number;
  status: "received" | "inprocess";
  type: "paypal" | "usdt" | "bank_payment" | "credit_card";
  date_time: string;
}

interface UsedPayment {
  amount: number;
  date: string;
}

interface PaymentBreakdown {
  received: {
    amount: number;
    count: number;
  };
  used: {
    amount: number;
    count: number;
  };
  available: {
    amount: number;
    count: number;
  };
}

interface SummaryStats {
  availableBalance: number;
  totalUsed: number;
  paymentBreakdown: PaymentBreakdown;
}

type PaymentStatus = "all" | "received" | "inprocess";
type PaymentType = "all" | "paypal" | "usdt" | "bank_payment" | "credit_card";
type QuickDatePeriod = "today" | "thisWeek" | "last7Days" | "thisMonth";

// Mock payment data
const mockPayments: Payment[] = [
  // Today's data (July 2, 2025)
  {
    id: 1,
    amount: 320.00,
    status: "received",
    type: "paypal",
    date_time: "2025-07-02T14:30:00Z",
  },
  {
    id: 2,
    amount: 180.75,
    status: "inprocess",
    type: "usdt",
    date_time: "2025-07-02T13:45:00Z",
  },
  {
    id: 3,
    amount: 450.00,
    status: "received",
    type: "bank_payment",
    date_time: "2025-07-02T12:20:00Z",
  },
  {
    id: 4,
    amount: 95.50,
    status: "received",
    type: "credit_card",
    date_time: "2025-07-02T11:15:00Z",
  },
  // Yesterday's data
  {
    id: 5,
    amount: 250.00,
    status: "received",
    type: "paypal",
    date_time: "2025-07-01T14:30:00Z",
  },
  {
    id: 6,
    amount: 150.75,
    status: "inprocess",
    type: "usdt",
    date_time: "2025-07-01T13:45:00Z",
  },
  {
    id: 7,
    amount: 500.00,
    status: "received",
    type: "bank_payment",
    date_time: "2025-07-01T12:20:00Z",
  },
  // Older data
  {
    id: 8,
    amount: 75.50,
    status: "received",
    type: "credit_card",
    date_time: "2025-06-29T16:15:00Z",
  },
  {
    id: 9,
    amount: 300.25,
    status: "inprocess",
    type: "paypal",
    date_time: "2025-06-29T11:30:00Z",
  },
  {
    id: 10,
    amount: 125.80,
    status: "received",
    type: "usdt",
    date_time: "2025-06-28T09:45:00Z",
  },
  {
    id: 11,
    amount: 450.00,
    status: "received",
    type: "bank_payment",
    date_time: "2025-06-28T14:20:00Z",
  },
  {
    id: 12,
    amount: 89.99,
    status: "inprocess",
    type: "credit_card",
    date_time: "2025-06-27T10:15:00Z",
  },
  {
    id: 13,
    amount: 200.00,
    status: "received",
    type: "paypal",
    date_time: "2025-06-26T15:30:00Z",
  },
  {
    id: 14,
    amount: 350.75,
    status: "received",
    type: "usdt",
    date_time: "2025-06-25T08:45:00Z",
  },
  {
    id: 15,
    amount: 175.25,
    status: "inprocess",
    type: "bank_payment",
    date_time: "2025-06-24T13:20:00Z",
  },
    {
    id: 16,
    amount: 95.50,
    status: "received",
    type: "credit_card",
    date_time: "2025-07-02T11:15:00Z",
  },
   {
    id: 17,
    amount: 89.99,
    status: "inprocess",
    type: "credit_card",
    date_time: "2025-06-27T10:15:00Z",
  },
  
];

// Mock used amounts for calculation
const mockUsedPayments: UsedPayment[] = [
  { amount: 65.25, date: "2025-07-02" },
  { amount: 50.25, date: "2025-07-01" },
  { amount: 75.50, date: "2025-06-29" },
  { amount: 120.00, date: "2025-06-28" },
  { amount: 45.75, date: "2025-06-27" },
];

const PaymentDetailsPage: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus>("all");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<PaymentType>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const recordsPerPage: number = 15;

  const getMonday = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  // Quick date filters
  const setQuickDate = (period: QuickDatePeriod): void => {
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

  // Filter payments based on criteria
  const filteredPayments = useMemo((): Payment[] => {
    return mockPayments.filter((payment) => {
      // Date filtering
      const paymentDate = new Date(payment.date_time)
        .toISOString()
        .split("T")[0];

      if (fromDate && paymentDate < fromDate) return false;
      if (toDate && paymentDate > toDate) return false;

      // Status filtering
      if (statusFilter !== "all" && payment.status !== statusFilter)
        return false;

      // Payment type filtering
      if (paymentTypeFilter !== "all" && payment.type !== paymentTypeFilter)
        return false;

      return true;
    });
  }, [fromDate, toDate, statusFilter, paymentTypeFilter]);

  // Calculate summary statistics
  const summaryStats = useMemo((): SummaryStats => {
    const totalReceived = filteredPayments
      .filter(p => p.status === "received")
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    const totalUsed = mockUsedPayments.reduce((sum, used) => sum + used.amount, 0);
    const availableBalance = totalReceived - totalUsed;

    const stats: SummaryStats = {
      availableBalance,
      totalUsed,
      paymentBreakdown: {
        received: {
          amount: totalReceived,
          count: filteredPayments.filter(p => p.status === "received").length
        },
        used: {
          amount: totalUsed,
          count: mockUsedPayments.length
        },
        available: {
          amount: availableBalance,
          count: 1 // This represents the current balance, so count is always 1
        }
      }
    };

    return stats;
  }, [filteredPayments]);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [fromDate, toDate, statusFilter, paymentTypeFilter]);

  // Format functions
  const formatDateTime = (dateString: string): string => {
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

  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  const getStatusColor = (status: Payment["status"]): string => {
    switch (status) {
      case "received":
        return "bg-green-100 text-green-800 border-green-200";
      case "inprocess":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentTypeLabel = (type: Payment["type"]): string => {
    switch (type) {
      case "paypal":
        return "PayPal";
      case "usdt":
        return "USDT";
      case "bank_payment":
        return "Bank Payment";
      case "credit_card":
        return "Credit Card";
      default:
        return type;
    }
  };

  const getPaymentTypeColor = (type: Payment["type"]): string => {
    switch (type) {
      case "paypal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "usdt":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "bank_payment":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "credit_card":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setToDate(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatusFilter(e.target.value as PaymentStatus);
  };

  const handlePaymentTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPaymentTypeFilter(e.target.value as PaymentType);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 lg:p-4">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Details
            </h1>
            <p className="text-gray-600">
              Comprehensive overview of your payment transactions
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
                    { key: "today" as const, label: "Today" },
                    { key: "thisWeek" as const, label: "This Week" },
                    { key: "last7Days" as const, label: "Last 7 Days" },
                    { key: "thisMonth" as const, label: "This Month" },
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
                      onChange={handleFromDateChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      onChange={handleToDateChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
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
                    onChange={handleStatusFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All</option>
                    <option value="received">Received</option>
                    <option value="inprocess">In Process</option>
                  </select>
                </div>

                {/* Payment Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Type
                  </label>
                  <select
                    value={paymentTypeFilter}
                    onChange={handlePaymentTypeFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="paypal">PayPal</option>
                    <option value="usdt">USDT</option>
                    <option value="bank_payment">Bank Payment</option>
                    <option value="credit_card">Credit Card</option>
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
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summaryStats.availableBalance)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Used Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summaryStats.totalUsed)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                    Received
                  </span>
                  <span className="ml-3 text-sm text-gray-700">
                    {summaryStats.paymentBreakdown.received.count} payments
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(summaryStats.paymentBreakdown.received.amount)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium border bg-red-100 text-red-800 border-red-200">
                    Used
                  </span>
                  <span className="ml-3 text-sm text-gray-700">
                    {summaryStats.paymentBreakdown.used.count} transactions
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(summaryStats.paymentBreakdown.used.amount)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200">
                    Available
                  </span>
                  <span className="ml-3 text-sm text-gray-700">
                    Current balance
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(summaryStats.paymentBreakdown.available.amount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Details
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredPayments.length)} of{" "}
              {filteredPayments.length} payments
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="w-1/4 px-6 py-4 text-sm text-gray-900">
                      <div className="truncate">
                        {formatDateTime(payment.date_time)}
                      </div>
                    </td>
                    <td className="w-1/4 px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="w-1/4 px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="w-1/4 px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getPaymentTypeColor(
                          payment.type
                        )}`}
                      >
                        {getPaymentTypeLabel(payment.type)}
                      </span>
                    </td>
                  </tr>
                ))}
                {/* Fill empty rows to maintain consistent height */}
                {Array.from({
                  length: Math.max(0, recordsPerPage - currentPayments.length),
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
                      let pageNum: number;
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
        {filteredPayments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No payments found
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

export default PaymentDetailsPage;