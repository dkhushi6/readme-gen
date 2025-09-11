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
      className="p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between h-60 bg-card cursor-pointer"
    >
      {/* Repo Name + Link */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg truncate text-foreground">
            {repo.name}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              repo.private
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            {repo.private ? "Private" : "Public"}
          </span>
        </div>

        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <LucideLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Description */}
      {repo.description && (
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {repo.description}
        </p>
      )}

      {/* Repo Stats */}
      <div className="flex flex-col gap-2 mt-auto text-xs text-muted-foreground">
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
        <div className="text-muted-foreground">
          Updated {formatDistanceToNow(new Date(repo.updated_at))} ago
        </div>
      </div>
    </Card>
  );
};

export { AllReposCard };
