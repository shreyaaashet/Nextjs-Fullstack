import Image from 'next/image';
import React from 'react'

function Page({params}:any) {
  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg w-1/2 p-8">
       
         <h6 className='text-slate-700'> 
       {params.id}
          </h6>     
        </div>
      </div>
    );
  };
  

export default Page