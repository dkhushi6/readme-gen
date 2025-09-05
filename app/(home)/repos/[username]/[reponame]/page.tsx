"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Repo } from "@/lib/repo";
import GetSpecificRepo from "@/components/repo/get-specific-repo";
import { useSession } from "next-auth/react";
const page = () => {
  const params = useParams();
  const username = params?.username as string;
  const repoName = params?.reponame as string;
  const [repo, setRepo] = useState<Repo | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        if (session && session.user?.accessToken && repoName && !username) {
          // Fetch private also of user repo
          console.log("FETCHING FROM PRIVATE");
          const res = await axios.post(
            "/api/private/all-repo",
            { repoName },
            {
              headers: { Authorization: `Bearer ${session.user.accessToken}` },
            }
          );
          setRepo(res.data.repo);
        } else if (username && repoName) {
          // Fetch public single repo
          const res = await axios.post("/api/public/single-repo", {
            username,
            repoName,
          });
          setRepo(res.data.repo);
        } else {
          console.log("Username and repoName are required to fetch repo");
        }
      } catch (err: any) {
        console.log("Error fetching repo:", err.response?.data || err.message);
      }
    };

    fetchRepo();
  }, [username, repoName, session]);

  if (!repo) {
    return <p>Loading...</p>;
  }
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
      <GetSpecificRepo repo={repo} />
    </div>
  );
};

export default page;
