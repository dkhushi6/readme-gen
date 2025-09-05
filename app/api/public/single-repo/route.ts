import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, repoName } = body;

    if (!username) {
      return NextResponse.json(
        { error: "username not found" },
        { status: 400 }
      );
    }
    if (!repoName) {
      return NextResponse.json(
        { error: "repoName not found" },
        { status: 400 }
      );
    }

    const repo = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}`
    );

    return NextResponse.json({ success: true, repo: repo.data });
  } catch (err: any) {
    console.error(
      "GitHub API error:",
      err.response?.status,
      err.response?.data || err.message
    );
    return NextResponse.json(
      {
        error: "GitHub API error",
      },
      { status: 500 }
    );
  }
}
