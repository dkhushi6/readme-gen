import { auth } from "@/lib/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${session.user.accessToken}`,
      },
    });
    const username = user.data.login;
    const repos = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${session.user.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    return NextResponse.json({ success: true, repos: repos.data, username });
  } catch (e: any) {
    console.error("GitHub API error:", e.response?.status, e.response?.data);
    return NextResponse.json(
      { error: "GitHub API error", details: e.response?.data || e.message },
      { status: e.response?.status || 500 }
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
    return NextResponse.json({ error: "repo name not found" });
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
  } catch (e: any) {
    console.error("GitHub API error:", e.response?.status, e.response?.data);
    return NextResponse.json(
      { error: "GitHub API error", details: e.response?.data || e.message }
      // { status: e.response?.status || 500 }
    );
  }
}
