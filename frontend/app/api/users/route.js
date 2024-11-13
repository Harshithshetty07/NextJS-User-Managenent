import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";

export async function GET() {
    try {
        await connectDB()
        const users = await User.find({}).sort({ createdAt: -1});
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Error fecthing users'}, {status: 500});
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const user = await User.create(data);
        return NextResponse.json(user);
    } catch(error) {
        return NextResponse.json({ error: 'Error creatng user'}, {status: 500});
    }
}

export async function PUT(request) {
    try {
        await connectDB();
        const data = await request.json();
        const { _id, ...updateData} = data;
        const user = await User.findByIdAndUpdate(_id, updateData, { new: true});
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating user'}, {status: 500});
    }
}

export async function DELETE(request) {
    try {
        await connectDB();
        const data = await request.json();
        const user = await User.findByIdAndDelete(data._id);
        return NextResponse.json(user);
    } catch(error) {
        return NextResponse.json({ error: "Error deleting user"}, {status: 500});
    }
}