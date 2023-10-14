import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';



connect();

export async function POST(request: NextRequest) {
  try{
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    // check if the user exists 
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User doesnt exists! Please sign up first!" }, { status: 400 });
    }
    // check the password if same/ correct
    const validPassword= await bcrypt.compare(password,user.password) // between request and the db stored
    if(!validPassword){
      return NextResponse.json({ error: "Password doesnt match! Please try again " }, { status: 400 });
  }

  // after everything is verified i.e user and password  create a token (send to )=> users cookies to verify whenever user tries to login again 
   
     
  }
  catch(error:any){
    return NextResponse.json({error:error.message},{status:500})

  }
  
  finally{

  }
}
