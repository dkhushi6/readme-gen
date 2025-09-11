import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, repoName, branch = "main" } = body;

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
    let packageJson = null;
    try {
      const packageRes = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}/contents/package.json?ref=${branch}`
      );
      //decoding
      packageJson = JSON.parse(
        Buffer.from(packageRes.data.content, "base64").toString("utf-8")
      );
    } catch {
      packageJson = null;
    }

    return NextResponse.json({ success: true, repo: repo.data, packageJson });
  } catch (error) {
    console.error("GitHub API error", error);
  }
}
