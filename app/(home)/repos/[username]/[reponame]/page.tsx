"use client";
import { Card } from "@/components/ui/card";
import { AlertCircle, Eye, GitBranch, LucideLink, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "next/navigation";
import SpecificRepoCard from "@/components/specific-repo-card";
import axios from "axios";
import { Repo } from "@/lib/repo";
import { Button } from "@/components/ui/button";
const page = () => {
  const params = useParams();
  const username = params?.username as string;
  const repoName = params?.reponame as string;
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    const handleSpecificRepo = async () => {
      const res = await axios.post("/api/public/single-repo", {
        username,
        repoName,
      });
      if (res.data) {
        setRepo(res.data.repos);
      }
    };
    if (username && repoName) {
      handleSpecificRepo();
    }
  }, [username, repoName]);
  if (!repo) {
    return <p>Loading...</p>;
  }
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
      <SpecificRepoCard repo={repo} />
    </div>
  );
};

export default page;
