import { Repo } from "./repo";

export const promptReadme = (repo: Repo) => `
You are an expert technical writer and open-source maintainer. 
Your task is to generate a **complete README.md** file in Markdown format 
for the following GitHub repository using the provided metadata. 

Do not invent random facts, but if a field is missing, use general best practices.

---

## Repository Metadata
- Name: ${repo.name}
- Full Name: ${repo.full_name}
- Description: ${repo.description || "No description provided"}
- Owner: ${repo.owner?.login} (${repo.owner?.html_url})
- Primary Language: ${repo.language || "Not specified"}
- Topics: ${
  repo.topics && repo.topics.length > 0 ? repo.topics.join(", ") : "None"
}
- Stars: ${repo.stargazers_count}
- Forks: ${repo.forks_count}
- Issues: ${repo.open_issues_count}
- License: ${repo.license?.name || "MIT"}
- Homepage: ${repo.homepage || "Not provided"}
- Created: ${repo.created_at}
- Last Updated: ${repo.updated_at}
- Clone URL: ${repo.clone_url}
- SSH URL: ${repo.ssh_url}
- GitHub URL: ${repo.html_url}

---

## README Schema
# ${repo.name}

[Badges: stars, forks, license, language, last update]

## 🚀 Overview
Explain what this project is, who it’s for, and why it matters.

## ✨ Features
List of core features. Highlight repo topics if available.

## 📦 Installation
- Include both HTTPS and SSH clone options.
- Show dependency installation commands.

## 🛠️ Usage
- Provide code snippets for running/using the project.
- If homepage/demo exists, link to it.

## 📚 Documentation
- Add setup/configuration details.
- Reference external docs if homepage exists.

## 🤝 Contributing
- Steps to fork, branch, commit, and PR.
- Mention issues link: ${repo.html_url}/issues

## 🧪 Testing
- Show how to run tests if common (e.g., npm test, pytest).

## 📄 License
- State license clearly: ${repo.license?.name || "MIT"}

## 📊 Repo Insights
- Stars: ${repo.stargazers_count}
- Forks: ${repo.forks_count}
- Open Issues: ${repo.open_issues_count}
- Created: ${repo.created_at}
- Last Updated: ${repo.updated_at}

## 🌐 Links
- GitHub Repo: ${repo.html_url}
- Homepage: ${repo.homepage || "Not provided"}
- Issues: ${repo.html_url}/issues
- Pull Requests: ${repo.html_url}/pulls
`;
