"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import {
  AlertCircle,
  Circle,
  Eye,
  GitBranch,
  LucideLink,
  Star,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Repo } from "@/lib/repo";
import { Button } from "./ui/button";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  HTML: "bg-orange-400",
  CSS: "bg-purple-500",
  default: "bg-gray-400",
};

type SpecificRepoCardProps = {
  repo: Repo;
};
const SpecificRepoCard = ({ repo }: SpecificRepoCardProps) => {
  const langColor =
    languageColors[repo.language || "default"] || languageColors.default;
  return (
    <Card className="p-6 bg-gradient-to-t from-gray-50 dark:from-neutral-800 to-white dark:to-neutral-900 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">{repo.name}</h1>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <LucideLink className="w-5 h-5" />
        </a>
      </div>
      {repo.description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {repo.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500 dark:text-gray-400">
          {repo.language && (
            <div className="flex items-center gap-1">
              <Circle className={`w-3 h-3 ${langColor}`} />
              <span>{repo.language}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{repo.watchers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span>{repo.open_issues_count}</span>
          </div>
          <div>
            Updated {formatDistanceToNow(new Date(repo.updated_at))} ago
          </div>
        </div>
        <Button className="self-start">Generate ReadMe</Button>
      </div>
    </Card>
  );
};

export default SpecificRepoCard;
