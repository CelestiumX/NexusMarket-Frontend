"use client"
import React, { useState, useMemo } from 'react';
import MyOrder from '@/components/order/my-order';

const OrderPage = () => {
  // Sample orders data
  const orders = [
    {
      id: 'NM-2023-001',
      status: 'Delivered',
      date: '7 days ago',
      items: 1,
      type: 'Digital',
      hash: '0x123456...',
      description: 'Digital Art Collection',
      quantity: 'Qty: 1 x 50 XLM',
      amount: '50.00 XLM',
      statusColor: 'text-green-500',
      action: 'Request Refund',
      paid: true,
    },
    {
      id: 'NM-2023-002',
      status: 'Processing',
      date: '3 days ago',
      items: 1,
      type: 'Physical',
      hash: '0xabcdef...',
      description: 'Handmade Ceramic Mug',
      quantity: 'Qty: 2 x 25 XLM',
      amount: '50.00 XLM',
      statusColor: 'text-blue-500',
      action: '',
      paid: true,
    },
    {
      id: 'NM-2023-003',
      status: 'Pending',
      date: '1 day ago',
      items: 1,
      type: 'Physical',
      hash: '',
      description: 'Vintage Vinyl Record',
      quantity: 'Qty: 1 x 75 XLM',
      amount: '75.00 XLM',
      statusColor: 'text-orange-500',
      action: '',
      paid: false,
    },
    {
      id: 'NM-2023-003',
      status: 'Pending',
      date: '1 day ago',
      items: 1,
      type: 'Physical',
      hash: '',
      description: 'Vintage Vinyl Record',
      quantity: 'Qty: 2 x 75 XLM',
      amount: '100.00 XLM',
      statusColor: 'text-orange-500',
      action: '',
      paid: false,
    },
  ];

  // State for tabs, search, status filter, and date range
  const [activeTab, setActiveTab] = useState('myOrders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateRange, setDateRange] = useState('');

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleDateRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange(e.target.value);
  };


  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
     
      const matchesSearch =
        order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());

     
      const matchesStatus =
        statusFilter === 'All Statuses' || order.status === statusFilter;

      
      const matchesDateRange =
        dateRange === '' || order.date.toLowerCase().includes(dateRange.toLowerCase());

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [searchQuery, statusFilter, dateRange, orders]);

  return (
    <div className="px-7  text-white min-h-screen">
      <div className="mb-6 pt-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-gray-400 md:text-lg">View and manage your orders</p>
      </div>
      <div className="flex justify-between flex-col mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => handleTab('myOrders')}
            className={`px-4 py-2 rounded ${
              activeTab === 'myOrders'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => handleTab('sellerOrders')}
            className={`px-4 py-2 rounded ${
              activeTab === 'sellerOrders'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Seller Orders
          </button>
        </div>
        <div className="flex flex-col items-start md:flex-row mt-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-background/80 text-white border md:w-[75%] border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="bg-background/80 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none md:ml-4 mt-2 md:mt-0"
          >
            <option>All Statuses</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Pending</option>
          </select>
          <button className="bg-background/80 text-white border border-gray-600 rounded mt-2 md:mt-0 md:ml-4 px-4 py-2 flex items-center space-x-1 hover:bg-gray-700">
            <span>Date range</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      {activeTab === 'myOrders' && <MyOrder orders={filteredOrders} />}
      {activeTab === 'sellerOrders' && <p>No Seller Order yet</p>}
    </div>
  );
};

export default OrderPage;