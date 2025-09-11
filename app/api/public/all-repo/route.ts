import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username } = body;
  if (!username) {
    return NextResponse.json({ message: "username not found" });
  }
  const repos = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100&page=1&sort=update`
  );
  //fetch data from the response
  return NextResponse.json({ success: true, repos: repos.data });
}
