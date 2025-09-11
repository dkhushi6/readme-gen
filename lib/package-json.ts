export type PackageJson = {
  name: string;
  version: string;
  description?: string;
  main?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  author?: string;
  license?: string;
  keywords?: string[];
};
