import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel.mjs";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  try {
  
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);
    // check if the user exists : 
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists! Please try another email" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
