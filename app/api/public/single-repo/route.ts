import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, repoName } = body;
  if (!username) {
    return NextResponse.json({ message: "username not found" });
  }
  if (!repoName) {
    return NextResponse.json({ message: "repoName not found" });
  }
  const repo = await axios.get(
    `https://api.github.com/users/${username}/${repoName}`
  );
  console.log(repo);
  //fetch data from the response
  return NextResponse.json({ success: true, repos: repo.data });
}
