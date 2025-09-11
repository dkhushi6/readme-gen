import { Repo } from "./repo";
import { PackageJson } from "./package-json";
import { categorizeDependencies } from "./categeory-dependency";

export const promptReadme = (repo: Repo, packageJson?: PackageJson | null) => {
  const categorized =
    packageJson?.dependencies || packageJson?.devDependencies
      ? categorizeDependencies({
          ...packageJson?.dependencies,
          ...packageJson?.devDependencies,
        })
      : {};

  const techOverview = Object.entries(categorized)
    .filter(([category, deps]) => Object.keys(deps).length > 0)
    .map(
      ([category, deps]) =>
        `- **${category}:** ${Object.keys(deps)
          .map((d) => `\`${d}\``)
          .join(", ")}`
    )
    .join("\n");

  return `
  You are a README generator. 
Strictly respond in **Markdown format** only. 
Do not include explanations or extra text outside of the README.

# 🚀 **${repo.name}**

${
  packageJson?.keywords?.length
    ? packageJson.keywords
        .map(
          (kw) =>
            `![Badge](https://img.shields.io/badge/${encodeURIComponent(
              kw
            )}-blue)`
        )
        .join(" ")
    : ""
}

---

## 🎯 **Overview**
**Description:** ${
    repo.description ||
    packageJson?.description ||
    "An open-source project built with modern tooling to help developers get started quickly."
  }

---

## ✨ **Features**
List key features.

---

## ⚡ **Installation**
Clone the repository and install dependencies:

\`\`\`bash
git clone ${repo.clone_url}
cd ${repo.name}
npm install
\`\`\`

${
  packageJson?.scripts
    ? `### 🛠️ **Available Scripts**
\`\`\`bash
${Object.entries(packageJson.scripts)
  .map(([script, cmd]) => `npm run ${script}   # ${cmd}`)
  .join("\n")}
\`\`\``
    : ""
}

---

## 🔥 **Tech Stack**
${techOverview || "This project uses modern JavaScript/TypeScript tooling."}

---

## 🛠️ **Usage**
Run the project:

\`\`\`bash
npm start
\`\`\`

Example usage in code:

\`\`\`js
// Example usage
import something from "${repo.name}";
\`\`\`

---

## 🤝 **Contributing**
1. **Fork** the repo 🍴  
2. **Create** a new branch 🌱  
3. **Commit** your changes 💡  
4. **Push** to the branch 🚀  
5. **Open** a Pull Request 🎯  

👉 See issues here: ${repo.html_url}/issues

---

## 📜 **License**
**${repo.license?.name || packageJson?.license || "MIT"}**

---

## 🔗 **Links**
- 🌐 **GitHub:** ${repo.html_url}
- 🏠 **Homepage:** ${repo.homepage || "Not provided"}
`;
};
