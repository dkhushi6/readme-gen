"use client";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }
  return (
    <div className="text-5xl flex justify-center items-center h-screen">
      HOME PAge
    </div>
  );
};

export default page;
