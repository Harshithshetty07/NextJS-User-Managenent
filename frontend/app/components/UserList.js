'use client'
import React from 'react'

function UserList({users, onEdit, onDelete}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {
            users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                <button
                onClick={() => onEdit(user)}
                className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button 
                onClick={() => onDelete(user)}
                className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList
