"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {axios} from "axios";


function Page() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username:"",
  })


  const onSignup=async ()=>{
    console.log(user);
  }
  return (
<div className="bg-gray-100 h-screen flex justify-center items-center ">
      <form className="bg-white p-8 rounded shadow-md w-4/6">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-800 ">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
          <input type="text" id="username"
           name="username" 
           value={user.username} 
           onChange={(e)=>setUser({...user,username:e.target.value})}
            className="border rounded px-3 py-2 w-full"
            placeholder='username'
            />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email"
           name="email"
           value={user.email}
           onChange={(e)=>setUser({...user,email:e.target.value})}
            className="border rounded px-3 py-2 w-full" 
            placeholder='email'
            />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input type="password" id="password"
           name="password"
           value={user.password}
           onChange={(e)=>setUser({...user,password:e.target.value})}
            className="border rounded px-3 py-2 w-full" 
            placeholder='password'
            />
        </div>
        <button onClick={onSignup}
         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mb-2">
          Sign Up
        </button>
        <Link className='text-neutral-800' href={'/login'}>Already a User ? </Link>
      </form>
    </div>
  );
};

export default Page;
  