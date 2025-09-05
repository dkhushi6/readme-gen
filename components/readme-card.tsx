import React from "react";
import { Card } from "./ui/card";

const ReadmeCard = ({ readme }: { readme: string }) => {
  return (
    <Card className="p-4 max-h-[600px] overflow-auto bg-white dark:bg-gray-900">
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900 dark:text-gray-100">
        {readme}
      </pre>
    </Card>
  );
};

export { ReadmeCard };
