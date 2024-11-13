// File: app/api/users/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { User } from '@/app/models/User';

// GET all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new user
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const user = await User.create(data);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update user
export async function PUT(req) {
  try {
    await connectDB();
    const data = await req.json();
    const { _id, ...updateData } = data;
    
    const user = await User.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req) {
  try {
    await connectDB();
    const data = await req.json();
    const user = await User.findByIdAndDelete(data._id);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}