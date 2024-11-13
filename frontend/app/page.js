'use client'

import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers()
  }, [])

const fetchUsers = async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  setUsers(data)
}

const handleSubmit = async (userData) => {
  try {
    const method = userData._id ? 'PUT': 'POST';
    const response = await fetch('/api/users' , {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if(!response.ok) {
      fetchUsers();
      setShowForm(false);
      setSelectedUser(null)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const handleDelete = async (user) => {
  if(window.confirm('Are you sure you want to delete this user')) {
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({_id: user._id}),
      });
      if(response.ok) {
        fetchUsers();
      }
    } catch(error) {
      console.error('Error:', error);
    }
  }
}

const handleEdit = (user) => {
  setSelectedUser(user);
  setShowForm(true)
}

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
      <h1  className="text-2xl font-bold">User Management</h1>
      <button
      onClick={() => setShowForm(true)}
      className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >Add User</button>
      </div>
      {
        showForm ? (
          <div className="mb-6">
            <UserForm 
            user={selectedUser}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedUser(null);
            }}
            />
          </div>
        ) : (
          <UserList 
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          />
        )
      }
    </div>
  );
}
