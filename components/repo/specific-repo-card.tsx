import React from "react";
import { buttonVariants } from "../ui/button";
import {
  AlertCircle,
  Circle,
  Eye,
  GitBranch,
  LucideLink,
  Star,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "../ui/card";
import { Repo } from "@/lib/repo";
import { languageColors } from "@/lib/language-color";
import Link from "next/link";

const SpecificRepoCard = ({ repo }: { repo: Repo }) => {
  const langColor =
    languageColors[repo.language || "default"] || languageColors.default;
  return (
    <Card className="p-6 bg-gradient-to-t from-gray-50 dark:from-neutral-800 to-white dark:to-neutral-900 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">{repo.name}</h1>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          <LucideLink className="w-5 h-5" />
        </Link>
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
      </div>
    </Card>
  );
};

export default SpecificRepoCard;
