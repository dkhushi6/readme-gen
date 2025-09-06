"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import img from "@/public/dash.png";
import Image from "next/image";
const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSearch = () => {
    if (username.trim()) {
      router.push(`/repos/${username.trim()}`);
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center px-6 text-center bg-background "
      style={{ height: "calc(100vh - 70px)" }}
    >
      {/* Heading */}
      <Image src={img} alt="gitimg" width={250} height={250} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex gap-4 mb-6"
      >
        <motion.span
          className="text-6xl md:text-7xl font-extrabold text-primary drop-shadow-sm"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Read
        </motion.span>
        <motion.span
          className="text-6xl md:text-7xl font-extrabold text-secondary drop-shadow-sm"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
        >
          Me
        </motion.span>
        <motion.span
          className="text-6xl md:text-7xl font-extrabold text-accent drop-shadow-sm"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
        >
          Gen
        </motion.span>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
      >
        Instantly generate{" "}
        <span className="font-semibold text-secondary">
          clean, professional
        </span>{" "}
        <span className="font-semibold text-primary">README files</span> for any
        GitHub repository. Just enter a username and explore their projects.
      </motion.p>

      {/* Input + Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex items-center gap-2 w-full max-w-xl border border-border rounded-xl p-3 bg-card shadow-lg"
      >
        <Input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username..."
          className="flex-1 border-none focus:ring-0 text-foreground placeholder:text-muted-foreground bg-transparent"
        />
        <Button
          onClick={handleSearch}
          className="px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
        >
          <Search className="mr-2 h-5 w-5" /> Get Repos
        </Button>
      </motion.div>
    </div>
  );
};

export default Page;
