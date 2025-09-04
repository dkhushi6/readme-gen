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

  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim());
  };

  // Handle button click
  const handleSearch = async () => {
    if (!username) return;
    try {
      const res = await axios.post("/api/public/all-repo", { username });
      if (res.data) {
        // router.push(`/repos/${username}`);
        console.log("data", res.data);
      }
    } catch (err) {
      console.error("Error fetching repos:", err);
    }
  };

  return (
    <div className="text-5xl flex justify-center items-center h-screen">
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
