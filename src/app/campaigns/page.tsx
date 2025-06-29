"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Play,
  MessageSquare,
  Users, 
  Edit,
  Trash2
} from "lucide-react";
import Link from "next/link";

// Types
interface Campaign {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  recipients: string;
  totalRecipients: number;
  deliveryRate: number;
  created: string;
  tags: string[];
  scheduledDate: string | null;
}

// Sample data for different campaign states
const campaignData = {
  all: [
    {
      id: 1,
      name: "Black Friday Promotion",
      description: "Special discount campaign for Black Friday",
      status: "running",
      progress: 75,
      recipients: "7,500 / 10,000",
      totalRecipients: 10000,
      deliveryRate: 97.8,
      created: "2024-01-10",
      tags: ["VIP Customers", "Active Users"],
      scheduledDate: null,
    },
    {
      id: 2,
      name: "Customer Feedback Survey",
      description: "Collect feedback from recent purchasers",
      status: "scheduled",
      progress: 0,
      recipients: "0 / 5,000",
      totalRecipients: 5000,
      deliveryRate: 0,
      created: "2024-01-12",
      tags: ["Recent Customers"],
      scheduledDate: "2024-01-15 10:00 AM",
    },
    {
      id: 3,
      name: "Product Launch Announcement",
      description: "Announce new product to all subscribers",
      status: "draft",
      progress: 0,
      recipients: "0 / 15,000",
      totalRecipients: 15000,
      deliveryRate: 0,
      created: "2024-01-08",
      tags: ["All Subscribers"],
      scheduledDate: null,
    },
    {
      id: 4,
      name: "Welcome Series - Week 1",
      description: "First welcome message for new subscribers",
      status: "completed",
      progress: 100,
      recipients: "2,340 / 2,340",
      totalRecipients: 2340,
      deliveryRate: 98.5,
      created: "2024-01-05",
      tags: ["New Subscribers"],
      scheduledDate: null,
    },
    {
      id: 5,
      name: "Flash Sale Alert",
      description: "24-hour flash sale notification",
      status: "failed",
      progress: 25,
      recipients: "1,250 / 5,000",
      totalRecipients: 5000,
      deliveryRate: 89.2,
      created: "2024-01-03",
      tags: ["Premium Customers"],
      scheduledDate: "2024-01-03",
    },
  ],
};

// Filter data by status
const getFilteredData = (status: string): Campaign[] => {
  if (status === "all") return campaignData.all;
  return campaignData.all.filter((campaign) => campaign.status === status);
};

// Calculate stats
const getStats = (data: Campaign[]) => {
  const totalCampaigns = data.length;
  const activeCampaigns = data.filter(
    (c: Campaign) => c.status === "running"
  ).length;
  const scheduledCampaigns = data.filter(
    (c: Campaign) => c.status === "scheduled"
  ).length;
  const completedCampaigns = data.filter(
    (c: Campaign) => c.status === "completed"
  );
  const avgDeliveryRate =
    completedCampaigns.length > 0
      ? (
          completedCampaigns.reduce(
            (sum: number, c: Campaign) => sum + c.deliveryRate,
            0
          ) / completedCampaigns.length
        ).toFixed(1)
      : 96.8;

  return {
    totalCampaigns,
    activeCampaigns,
    scheduledCampaigns,
    avgDeliveryRate,
  };
};

const StatusBadge = ({
  status,
  scheduledDate,
}: {
  status: string;
  scheduledDate: string | null;
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "running":
        return { bg: "bg-green-100", text: "text-green-800", label: "running", hover: "hover:bg-blue-200" };
      case "scheduled":
        return { bg: "bg-blue-100", text: "text-blue-800", label: "scheduled", hover: "hover:bg-blue-200"  };
      case "draft":
        return { bg: "bg-yellow-100", text: "text-yellow-800", label: "draft", hover: "hover:bg-blue-200"  };
      case "completed":
        return { bg: "bg-gray-100", text: "text-gray-800", label: "completed", hover: "hover:bg-blue-200"  };
      case "failed":
        return { bg: "bg-red-100", text: "text-gray-800", label: "completed", hover: "hover:bg-blue-200"  };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", label: status, hover: "hover:bg-blue-200"  };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex flex-col justify-center items-center">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${config.bg} ${config.text} ${config.hover}`}
      >
        {config.label}
      </span>
      {scheduledDate && (
        <span className="text-xs text-gray-500 mt-1 text-center whitespace-nowrap">{scheduledDate}</span>
      )}
    </div>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="flex flex-col min-w-[80px]">
      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
        <div
          className="bg-blue-600 h-3 sm:h-4 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-xs text-gray-600 mt-1 text-center">{progress}%</span>
    </div>
  );
};

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 rounded-xl text-xs font-bold border text-black whitespace-nowrap"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const ActionDropdown = ({ campaignId }: { campaignId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: string) => {
    console.log(`${action} campaign ${campaignId}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-500 p-1 rounded-md hover:bg-gray-100"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-3 text-start py-2 text-xs font-semibold text-black uppercase border-b border-gray-100">
            Actions
          </div>
          
          <button
            onClick={() => handleAction('view')}
            className="w-full flex items-center px-3 py-1 text-sm text-black hover:bg-gray-50"
          >
            View Details
          </button>
          
          <button
            onClick={() => handleAction('edit')}
            className="w-full flex items-center px-3 py-1 text-sm text-black hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-3 text-black" />
            Edit
          </button>
        
          <button
            onClick={() => handleAction('delete')}
            className="w-full flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-3 text-red-500" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default function CampaignsDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const tabs = [
    { id: "all", label: "All", count: campaignData.all.length },
    {
      id: "running",
      label: "Running",
      count: campaignData.all.filter((c) => c.status === "running").length,
    },
    {
      id: "scheduled",
      label: "Scheduled",
      count: campaignData.all.filter((c) => c.status === "scheduled").length,
    },
    {
      id: "draft",
      label: "Draft",
      count: campaignData.all.filter((c) => c.status === "draft").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: campaignData.all.filter((c) => c.status === "completed").length,
    },
  ];

  const filteredCampaigns = useMemo(() => {
    const statusFiltered = getFilteredData(activeTab);
    if (!searchTerm) return statusFiltered;

    return statusFiltered.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [activeTab, searchTerm]);

  const stats = getStats(campaignData.all);

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-4 w-full">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage your SMS marketing campaigns
            </p>
          </div>
          <Link href={"campaigns/new"} className="w-full sm:w-auto font-bold inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm rounded-md shadow-sm text-gray-100 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            New Campaign
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-black font-bold mb-1">
                  Total Campaigns
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.totalCampaigns}
                </p>
              </div>
              <div className="flex-shrink-0">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-black font-bold mb-1">
                  Active Campaigns
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.activeCampaigns}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Play className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-black font-bold mb-1">Scheduled</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.scheduledCampaigns}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-black font-bold mb-1">
                  Avg. Delivery Rate
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.avgDeliveryRate}%
                </p>
              </div>
              <div className="flex-shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4 sm:mb-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  All Campaigns
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  View and manage your SMS campaigns
                </p>
              </div>
              <div className="w-full sm:w-auto sm:max-w-xs relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-4 sm:mb-6 ">
              <div className="bg-gray-100 rounded-lg p-1 w-2/5 ">
                <nav className="flex space-x-1 min-w-max ">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Table Container with Horizontal Scroll */}
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead >
                      <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-nowrap text-gray-500 uppercase tracking-wider min-w-[250px]">
                          Campaign
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-nowrap text-gray-500 uppercase tracking-wider min-w-[120px]">
                          Status
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-nowrap text-gray-500 uppercase tracking-wider min-w-[100px]">
                          Progress
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-nowrap text-gray-500 uppercase tracking-wider min-w-[130px]">
                          Recipients
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-nowrap text-gray-500 uppercase tracking-wider min-w-[120px]">
                          Delivery Rate
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-nowrap text-gray-500 uppercase tracking-wider min-w-[100px]">
                          Created
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-bold text-nowrap text-gray-500 uppercase tracking-wider min-w-[80px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCampaigns.map((campaign) => (
                        <tr key={campaign.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-4">
                            <div className="flex flex-col space-y-2">
                              <div className="text-sm font-medium text-black">
                                {campaign.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {campaign.description}
                              </div>
                              <div>
                                <TagList tags={campaign.tags} />
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <StatusBadge
                              status={campaign.status}
                              scheduledDate={campaign.scheduledDate}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <ProgressBar progress={campaign.progress} />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                {campaign.recipients}
                              </span>
                              <span className="text-xs flex items-center text-gray-500">
                                <Users className="w-3 h-3 mr-1" />
                                {campaign.totalRecipients.toLocaleString()} total
                              </span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              {campaign.deliveryRate > 0 ? (
                                <>
                                  <span className="text-sm font-medium text-gray-900">
                                    {campaign.deliveryRate}%
                                  </span>
                                  <span className="text-xs flex items-center text-gray-500">
                                    <TrendingUp className="h-3 w-3 mr-1 text-gray-400" /> 
                                    <span>Delivered</span>
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {campaign.created}
                          </td>
                          <td className="px-3 sm:px-6 py-4 text-right">
                            <ActionDropdown campaignId={campaign.id} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  {searchTerm
                    ? "No campaigns match your search."
                    : "No campaigns found."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}