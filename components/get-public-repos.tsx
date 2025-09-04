"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  LucideLink,
  Star,
  GitBranch,
  Circle,
  Eye,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
};

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  HTML: "bg-orange-400",
  CSS: "bg-purple-500",
  default: "bg-gray-400",
};

const GithubPublicRepos = ({ username }: { username: string }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!username) return;

    const fetchRepos = async () => {
      try {
        const res = await axios.post("/api/public/all-repo", { username });
        console.log(res);
        setRepos(res.data.repos);
      } catch (err: any) {
        setError(err.response?.status === 404 ? "User not found" : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

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
        {repos.map((repo) => {
          const langColor =
            languageColors[repo.language || "default"] ||
            languageColors.default;
          return (
            <Card
              onClick={() => {
                router.push(`/repos/${username}/${repo.name}`);
              }}
              key={repo.id}
              className="p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between h-60 bg-gradient-to-t from-gray-50 dark:from-neutral-800 to-white dark:to-neutral-900"
            >
              {/* Repo Name + Link */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg truncate">{repo.name}</h3>
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <LucideLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Description */}
              {repo.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                  {repo.description}
                </p>
              )}

              {/* Repo Stats */}
              <div className="flex flex-col gap-2 mt-auto text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-3 flex-wrap">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <Circle className={`w-3 h-3 ${langColor}`} />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{repo.watchers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{repo.open_issues_count}</span>
                  </div>
                </div>
                <div className="text-gray-400">
                  Updated {formatDistanceToNow(new Date(repo.updated_at))} ago
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GithubPublicRepos;
