import { Repo } from "./repo";

export const promptReadme = (repo: Repo) => `
You are an expert technical writer. Generate a **concise README.md** in Markdown for the following GitHub repository. 
Use the provided metadata and best practices. Do not invent facts.

---

## Repository Metadata
- Name: ${repo.name}
- Description: ${repo.description || "No description provided"}
- Owner: ${repo.owner?.login} (${repo.owner?.html_url})
- Language: ${repo.language || "Not specified"}
- Stars/Forks/Issues: ${repo.stargazers_count}/${repo.forks_count}/${
  repo.open_issues_count
}
- License: ${repo.license?.name || "MIT"}
- Homepage: ${repo.homepage || "Not provided"}
- GitHub URL: ${repo.html_url}

---

## README

# ${repo.name}

## Overview
Briefly explain what the project does and why it matters.

## Features
List key features.

## Installation
Clone the repo and install dependencies:
\`\`\`bash
git clone ${repo.clone_url}
# or via SSH
git clone ${repo.ssh_url}
\`\`\`

## Usage
Provide minimal code example or usage instructions.

## Contributing
Steps to fork, branch, commit, and PR. See issues: ${repo.html_url}/issues

## License
${repo.license?.name || "MIT"}

## Links
- GitHub: ${repo.html_url}
- Homepage: ${repo.homepage || "Not provided"}
`;
