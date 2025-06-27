import {
  Send,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Plus,
  CheckCircle,
  MessageSquare,
  FileText,
  XCircle,
  Clock,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 rounded p-2 lg:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back! Here&apos;s what&apos;s happening with your SMS
              campaigns.
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Send className="w-4 h-4" />
              Send SMS
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              New Campaign
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Total Messages Sent */}
          <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-black">
                Total Messages Sent
              </div>
              <Send className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12,847</div>
            <div className="text-sm text-green-600">+12.5% from last month</div>
          </div>

          {/* Delivery Rate */}
          <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-black">
                Delivery Rate
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">98.2%</div>
            <div className="text-sm text-green-600">+0.8% from last month</div>
          </div>

          {/* Failed Messages */}
          <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-black">
                Failed Messages
              </div>
              <AlertTriangle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">234</div>
            <div className="text-sm text-red-600">-5.2% from last month</div>
          </div>

          {/* Account Balance */}
          <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-black">
                Account Balance
              </div>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              $2,847.50
            </div>
            <div className="text-sm text-gray-500">-$125.00 from last month</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Active Campaigns */}
          <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Active Campaigns
              </h2>
              <p className="text-gray-600">
                Monitor your ongoing and scheduled campaigns
              </p>
            </div>

            <div className="space-y-6">
              {/* Black Friday Promotion */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col items-start gap-3">
                    <div className="font-semibold text-gray-900">
                      Black Friday Promotion
                    </div>
                    <span className="bg-blue-600 text-gray-50 font-bold text-xs  px-2 py-1 rounded-full">
                      running
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      7,500 / 10,000
                    </div>
                    <div className="text-sm text-gray-500">97.8% delivered</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              {/* Customer Feedback Survey */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col items-center gap-3">
                    <div className="font-semibold text-gray-900">
                      Customer Feedback Survey
                    </div>
                    <div className="flex ">
                      <span className="bg-gray-100 text-black py-1 text-xs font-bold px-2  rounded-full flex items-center gap-1">
                        scheduled
                      </span>
                      <div className="text-sm ms-2 flex justify-center items-center text-gray-500">
                        <Clock className="w-3 h-3" />
                        2024-01-15 10:00 AM
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">0 / 5,000</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-300 h-2 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              {/* Product Launch Announcement */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col items-start gap-3">
                    <div className="font-semibold text-gray-900">
                      Product Launch Announcement
                    </div>
                    <span className="bg-gray-100 text-black text-xs font-bold px-2 py-1 rounded-full">
                      draft
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      0 / 15,000
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-300 h-2 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 text-black border rounded-sm bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-200 hover:text-gray-900 py-2 flex items-center justify-center gap-2 transition-colors">
              <BarChart3 className="w-4 h-4" />
              View All Campaigns
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Recent Activity
              </h2>
              <p className="text-gray-600">
                Latest updates from your SMS operations
              </p>
            </div>

            <div className="space-y-4">
              {/* Summer Sale Campaign */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">
                    Summer Sale Campaign
                  </div>
                  <div className="text-sm text-gray-600">
                    Campaign completed successfully
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />2 hours ago
                  </div>
                </div>
              </div>

              {/* OTP Message Sent */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">
                    OTP Message Sent
                  </div>
                  <div className="text-sm text-gray-600">
                    Sent to +1234567890
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />4 hours ago
                  </div>
                </div>
              </div>

              {/* Welcome Template Updated */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">
                    Welcome Template Updated
                  </div>
                  <div className="text-sm text-gray-600">
                    Template modified by John Doe
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />6 hours ago
                  </div>
                </div>
              </div>

              {/* Flash Sale Campaign */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">
                    Flash Sale Campaign
                  </div>
                  <div className="text-sm text-gray-600">
                    Campaign failed - insufficient balance
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />8 hours ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-600 rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Quick Actions
            </h2>
            <p className="text-gray-600">Common tasks to get you started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Send SMS</h3>
            </button>

            <button className="p-6 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all text-left group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Create Campaign
              </h3>
            </button>

            <button className="p-6 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-left group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
