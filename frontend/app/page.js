// File: app/page.js
'use client';
import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    }
  };

  const handleSubmit = async (userData) => {
    try {
      const method = userData._id ? 'PUT' : 'POST';
      const response = await fetch('/api/users', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save user');
      }
      
      await fetchUsers();
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (user) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch('/api/users', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: user._id }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        
        await fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        setError(error.message);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm ? (
        <div className="mb-6">
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedUser(null);
              setError(null);
            }}
          />
        </div>
      ) : (
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}