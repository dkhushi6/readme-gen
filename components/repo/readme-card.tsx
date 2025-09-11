"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Copy, Eye, Code, LucideLoaderCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
type ReadmeCardProps = {
  readme: string;
  username: string;
  repoName: string;
};
const ReadmeCard = ({ readme, username, repoName }: ReadmeCardProps) => {
  const { data: session } = useSession();
  const [isPreview, setIsPreview] = useState(true);
  const isOwner = session?.user?.username === username;
  const [loading, setLoading] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(readme);
      toast.success("README copied from the clipboard");
    } catch (err) {
      console.error("failed to copy", err);
    }
  };
  const handlePublishCode = async () => {
    setLoading(true);
    try {
      await axios.put("/api/private/all-repo", {
        repoName,
        readme,
        username,
      });
    } catch {
      console.error("error publishing");
    } finally {
      toast.success("Your README has been successfully updated on GitHub");

      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Card className="relative p-4 max-h-[600px] overflow-auto">
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground border-border hover:bg-accent transition"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground border-border hover:bg-accent transition px-2"
          >
            {isPreview ? (
              <>
                <Code className="h-4 w-4" />
                <span className="text-xs">Code</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span className="text-xs">Preview</span>
              </>
            )}
          </Button>
        </div>
        {isPreview ? (
          <div className="prose dark:prose-invert max-w-none text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
            {readme}
          </pre>
        )}
      </Card>
      {isOwner && (
        <Button
          onClick={() => handlePublishCode()}
          className="w-full rounded-xl"
        >
          {loading && (
            <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          {loading ? "Publishing" : "Publish"}
        </Button>
      )}
    </div>
  );
};

export { ReadmeCard };
