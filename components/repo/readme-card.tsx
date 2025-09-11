"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Copy, Eye, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { useSession } from "next-auth/react";
type ReadmeCardProps = {
  readme: string;
  username: string;
  repoName: string;
};
const ReadmeCard = ({ readme, username, repoName }: ReadmeCardProps) => {
  const { data: session } = useSession();
  const [isPreview, setIsPreview] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(readme);
    } catch (err) {
      console.error("failed to copy", err);
    }
  };
  const handlePublishCode = async () => {
    if (session?.user?.accessToken && session.user.username === username) {
      setIsPrivate(true);
    }

    const res = await axios.put("/api/private/all-repo", {
      repoName,
      readme,
      username,
    });
    console.log(res.data);
  };
  return (
    <div className="flex flex-col gap-4">
      <Card className="relative p-4 max-h-[600px] overflow-auto">
        {/* Actions */}
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Copy Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground border-border hover:bg-accent transition"
          >
            <Copy className="h-4 w-4" />
          </Button>
          {/* Toggle Button with text */}
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
      {isPrivate && (
        <Button
          onClick={() => handlePublishCode()}
          className="w-full rounded-xl"
        >
          Publish
        </Button>
      )}
    </div>
  );
};

export { ReadmeCard };
