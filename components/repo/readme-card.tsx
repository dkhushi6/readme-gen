"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Copy, Eye, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ReadmeCard = ({ readme }: { readme: string }) => {
  const [isPreview, setIsPreview] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(readme);
    } catch (err) {
      console.error("failed to copy", err);
    }
  };

  return (
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

      {/* README Content */}
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
  );
};

export { ReadmeCard };
