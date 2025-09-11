import { auth } from "@/lib/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const repos = await axios.get(
      "https://api.github.com/user/repos?per_page=100&page=1&sort=update",
      {
        headers: {
          Authorization: `token ${session.user.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return NextResponse.json({ success: true, repos: repos.data });
  } catch {
    return NextResponse.json(
      { error: "Error in fetching repos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const { repoName, username } = await req.json();

  if (!repoName) {
    return NextResponse.json({ error: "repo name not found" });
  }
  if (!username) {
    return NextResponse.json({ error: "username not found" });
  }

  console.log("repoName before session", repoName);

  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  console.log("repoName after session", repoName);
  console.log("username", username);

  try {
    const repos = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}`,
      {
        headers: {
          Authorization: `token ${session.user.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return NextResponse.json({ success: true, repos: repos.data });
  } catch {
    return NextResponse.json(
      { error: "Error in fetching repos" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: "login first" });
  }

  const { repoName, username, readme, branch = "main" } = await req.json();
  if (!repoName) {
    return NextResponse.json({ error: "repo name not found" });
  }
  if (!username) {
    return NextResponse.json({ error: "username not found" });
  }

  if (!readme) {
    return NextResponse.json({ error: "readme content not found" });
  }

  const encodedReadme = Buffer.from(readme).toString("base64");
  let existingReadme: string | undefined;
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}/contents/README.md?ref=${branch}`,
      { headers: { Authorization: `token ${session.user.accessToken}` } }
    );
    console.log(res.data);
    existingReadme = res.data.sha;
  } catch {
    return NextResponse.json(
      { error: "Error in fetching existing readme" },
      { status: 500 }
    );
  }
  try {
    const publish = await axios.put(
      `https://api.github.com/repos/${username}/${repoName}/contents/README.md`,
      {
        message: "docs: update README with latest changes",
        content: encodedReadme,
        branch,
        sha: existingReadme,
      },
      {
        headers: {
          Authorization: `token ${session.user.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return NextResponse.json({ success: true, commit: publish.data });
  } catch {
    return NextResponse.json(
      { error: "Error in publishing README" },
      { status: 500 }
    );
  }
}
