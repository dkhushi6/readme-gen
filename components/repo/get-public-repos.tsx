"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Repo } from "@/lib/repo";
import { useSession } from "next-auth/react";
import { AllReposCard } from "./all-repos-card";

const GithubPublicRepos = ({ username }: { username?: string }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    console.log("session from client:", session);
  }, [session]);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        if (session && session.user?.accessToken && !username) {
          const res = await axios.get("/api/private/all-repo", {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          });
          setRepos(res.data.repos);
        } else if (username) {
          const res = await axios.post("/api/public/all-repo", { username });
          console.log("res from username", res.data);
          setRepos(res.data.repos);
        } else {
          setError("Username is required to fetch public repos");
        }
      } catch (err: any) {
        setError(err.response?.status === 404 ? "User not found" : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username, session]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (repos.length === 0)
    return <p className="text-center mt-10">No public repos found.</p>;

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">
        {username}'s Public Repositories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <AllReposCard key={repo.id} repo={repo} username={username} />
        ))}
      </div>
    </div>
  );
};

export default GithubPublicRepos;
