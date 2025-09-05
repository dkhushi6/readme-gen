import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { Repo } from "@/lib/repo";
import { languageColors } from "@/lib/language-color";
type AllReposCardProps = {
  repo: Repo;
  username?: string;
};
const AllReposCard = ({ repo, username }: AllReposCardProps) => {
  const router = useRouter();
  const langColor =
    languageColors[repo.language || "default"] || languageColors.default;
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
};

export { AllReposCard };
