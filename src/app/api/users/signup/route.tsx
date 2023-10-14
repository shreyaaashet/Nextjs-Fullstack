// all get , post , delete method 
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs';


connect()

// post request : 

export async function POST(request:NextRequest) {
  try{
   const reqBody= await request.json()
   const {username,email,password}=reqBody // get theese from the request

   console.log(reqBody)
   // check if the user exists 
   const user = await User.findOne({email})

   if (user){
    return NextResponse.json({error:"user already exists! please try another email "},{status:400})
   }
  // hash password
  const salt= await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password,salt)
  // save the user in database 
  const newUser= new User({
    username,
    email,
    password:hashPassword
  })

  const savedUser = await newUser.save()
  console.log(savedUser);

  return NextResponse.json({
    message:"User created sucessfully",
    success:true,
    savedUser
  })

  }catch(error:any)
  {
    return NextResponse.json({error:error.message},{status:500})
  }
  
}