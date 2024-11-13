'use client'
import React, { useState } from 'react'

function UserForm({user, onSubmit, onCancel}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user?._id ? {...formData, _id: user._id} : formData) 
  }
  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input 
      type='text'
      value={formData.name}
      onChange={(e) => setFormData({...formData, name:e.target.value})}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      required
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input 
      type='email'
      value={formData.email}
      onChange={(e) => setFormData({...formData, email:e.target.value})}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      required
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Phone</label>
      <input 
      type='tel'
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone:e.target.value})}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      required
      />
      </div>
      <div className="flex justify-end space-x-2">
        <button 
        type='button'
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
        type='submit'
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          {user?._id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default UserForm
