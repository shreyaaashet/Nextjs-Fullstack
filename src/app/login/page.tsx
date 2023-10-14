"use client";
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { toast } from 'react-hot-toast';



function Page() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if(user.email.length > 0 && user.password.length > 0){
    setDisableButton(false);
    }else{
      setDisableButton(true);
    }
    }, [user])
    


  const onLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try{
     setLoading(true);

     const response = await axios.post("/api/users/login", user)
     console.log('sign up success', response.data);
     toast.success("login successful !");
     router.push("/profile");

    } catch (error:any) {
      toast.error('Login Failed!');
      console.log(error.message)
    }
    finally{
      setLoading(false);
      
    }
    
  }
  return (
<div className="bg-gray-100 h-screen flex justify-center items-center ">
      <form  onSubmit={onLogin}
        className="bg-white p-8 rounded shadow-md w-4/6">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-800 ">{loading? "Processing": "Log In"}</h2>
   
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email"
           name="email"
           value={user.email}
           onChange={(e)=>setUser({...user,email:e.target.value})}
            className="border rounded px-3 py-2 w-full text-gray-700" 
            placeholder='email'
            />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input type="password" id="password"
           name="password"
           value={user.password}
           onChange={(e)=>setUser({...user,password:e.target.value})}
            className="border rounded px-3 py-2 w-full text-gray-700" 
            placeholder='password'
            />
        </div>
        <button 
         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mb-2">
          {disableButton? "Please Enter your Credentials": "Login"}
        </button>
        <Link className='text-neutral-800' href={'/signup'}>Create an Account</Link>
      </form>
    </div>
  );
};

export default Page;
  