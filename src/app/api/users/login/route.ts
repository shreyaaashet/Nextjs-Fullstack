import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody,"from req");
    // check if the user exists 
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User doesn't exist! Please sign up first." }, { status: 400 });
    }

    console.log("User exists");
    console.log("Password:", password);
    console.log("User Password:", user.password);

    if (typeof user.password === 'undefined') {
      console.log("User password is undefined:", user);
      return NextResponse.json({ error: "Invalid user data." }, { status: 400 });
    }
    
    // check the password if same/ correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log("Password doesn't match");
      return NextResponse.json({ error: "Password doesn't match! Please try again." }, { status: 400 });
    }
    
    // after everything is verified, i.e., user and password, create a token
    const tokenData = {
      id: user._id, // this way stored in db 
      username: user.username,
      email: user.email,
    };
    
    // create the token (signed) and set expiresIn
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET !, { expiresIn: "1d" });
    
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    
    // set the response in the logged-in user's cookies 
    response.cookies.set("token", token, {
      httpOnly: true
    });
    
    return response;

  } catch (error:any) { 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
