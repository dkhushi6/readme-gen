"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Repo } from "@/lib/repo";
import GetSpecificRepo from "@/components/repo/get-specific-repo";
import { useSession } from "next-auth/react";

const RepoPage = () => {
  const params = useParams();
  const username = params?.username as string;
  const repoName = params?.reponame as string;
  const [repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRepo = async () => {
      if (!username || !repoName) {
        setError("Username and repo name are required");
        setLoading(false);
        return;
      }

      try {
        console.log("repoName", repoName);
        if (session?.user?.accessToken && session.user.username === username) {
          console.log("Fetching private repo...");
          const res = await axios.post(
            "/api/private/all-repo",
            { repoName, username },
            {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          );
          console.log(res.data);
          setRepo(res.data.repos);
        } else {
          // Fetch public repo
          console.log("Fetching public repo...");
          const res = await axios.post("/api/public/single-repo", {
            username,
            repoName,
          });
          setRepo(res.data.repo);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [username, repoName, session]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!repo) return <p>No repo found.</p>;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
      <GetSpecificRepo repo={repo} />
    </div>
  );
};

export default RepoPage;
