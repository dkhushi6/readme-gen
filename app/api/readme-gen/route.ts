import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { promptReadme } from "@/lib/readme-prompt";

export async function POST(req: NextRequest) {
  const { repoData, packageJson } = await req.json();

  const { textStream } = streamText({
    model: google("gemini-2.5-flash"),
    prompt: promptReadme(repoData, packageJson),
  });

  let fullText = "";

  for await (const textPart of textStream) {
    fullText += textPart;
  }

  return NextResponse.json({
    message: "README created successfully",
    readme: fullText,
  });
}
