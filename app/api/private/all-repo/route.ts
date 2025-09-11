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
