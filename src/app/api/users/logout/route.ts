//  remove the stored cookies token for logout
import { NextResponse } from "next/server";


export async function POST() {
  
  try {
  const response= NextResponse.json(
    {message:"Logout sucessful",success:true,}
  )
  // setting the cookies empty as a response 
  response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
  return response;

    
  }catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
