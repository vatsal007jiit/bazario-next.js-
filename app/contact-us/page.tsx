import React from "react";
import Image from "next/image";
import Link from "next/link";
const ContactUs = () => {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="bg-gray-600 text-white p-2  text-3xl font-bold text-center">
        Contact Us
      </div>
      <div className="grid grid-cols-4 m-5  justify-center">
        {[...Array(5)].map((_,index)=>(
            <div className="m-2">
                <Link href="https://google.com">
                <Image
                key={index}
                src="/pic.jpeg"
                blurDataURL="/blur.avif"
                placeholder="blur" 
                width={400}
                height={300}
                layout="responsive"
                alt="scenery"
                className="rounded-md"
                />
                </Link>
                
                <Link href="/login" className="bg-red-800 mt-2 text-white font-semibold px-2 py-1 rounded-lg ">Home</Link>
            </div>
        ))}     
      </div>
    </div>
  );
};

export default ContactUs;
