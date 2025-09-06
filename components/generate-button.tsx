import { LucideLoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

type LabelProps = {
  label: string;
  loading: boolean;
  handleReadmeGen: () => void;
};
const GenerateButton = ({ label, loading, handleReadmeGen }: LabelProps) => {
  return (
    <Button disabled={loading} onClick={handleReadmeGen} className="w-full">
      {loading && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
};

export { GenerateButton };
