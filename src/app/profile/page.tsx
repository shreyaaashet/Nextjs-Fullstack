import Image from 'next/image';
import React from 'react'

function Page() {
  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg w-1/2 p-8">
          <div className="text-center">
            <Image src='' alt=''className="w-32 h-32 rounded-full mx-auto"/>
            <h2 className="text-3xl font-semibold text-gray-800">John Doe</h2>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Username: </h3>
            <p className="mt-4 text-gray-600">
             password : 
             </p>
          </div>
     
        </div>
      </div>
    );
  };
  

export default Page