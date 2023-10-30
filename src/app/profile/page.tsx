"use client";
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

function Page() {
  const router = useRouter();

  const onlogout = async () => {
    try {
      await axios.post('/api/users/logout');
      toast.success("Logout Successful");
      // Push to the login page
      router.push('/login');
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-1/2 p-8">
        <div className="text-center">
        {/* <Image src="/path-to-your-image.jpg" alt="Description" className="w-32 h-32 rounded-full mx-auto" /> */}

          <h2 className="text-3xl font-semibold text-gray-800">Jme</h2>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">Username: </h3>
          <p className="mt-4 text-gray-600">Email: </p>
          <button onClick={onlogout} className="mt-4 text-white bg-blue-400 p-2 rounded">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Page;
