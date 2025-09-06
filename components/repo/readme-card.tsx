import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";

const ReadmeCard = ({ readme }: { readme: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(readme);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Card className="relative p-4 max-h-[600px] overflow-auto">
      {/* Copy Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground border-border hover:bg-accent transition"
      >
        <Copy className="h-4 w-4" />
      </Button>

      {/* README Content */}
      <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
        {readme}
      </pre>
    </Card>
  );
};

export { ReadmeCard };
