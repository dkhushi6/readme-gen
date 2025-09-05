"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ use next/navigation instead of next/router in app dir
import React, { useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSearch = () => {
    if (username) {
      const trimmed = username.trim();
      if (trimmed) {
        router.push(`/repos/${trimmed}`);
      }
    }
  };

  return (
    <div className="text-5xl flex justify-center items-center h-screen ">
      <div className="flex gap-2">
        <Input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
        />
        <Button onClick={handleSearch}>Get Repos</Button>
      </div>
    </div>
  );
};

export default Page;
