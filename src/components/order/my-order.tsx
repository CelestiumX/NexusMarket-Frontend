import React from 'react'
import { OrderProduct } from '@/types/order.types'


const MyOrder: React.FC<{ orders: OrderProduct[] }> = ({ orders }) => {
  return (
    <div>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-background/80 p-4 rounded-lg border border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-600 rounded"></div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Order {order.id}</span>
                  <span className={`text-sm font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  🕒 {order.date} • {order.items} item • {order.type} {order.hash && `• ${order.hash}`}
                </p>
                <p className="text-white">{order.description}</p>
                <p className="text-sm text-gray-400">{order.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{order.amount}</p>
              <div className="flex justify-end space-x-2 mt-2">
                {order.action && (
                  <button className="text-blue-400 hover:underline">{order.action}</button>
                )}
                <button className="text-blue-400 hover:underline">View Details</button>
                <button className="text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
              {order.paid ? (
                <span className="inline-block mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Paid
                </span>
              ) : (
                <span className="inline-block mt-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrder
