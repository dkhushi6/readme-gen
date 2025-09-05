import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { promptReadme } from "@/lib/readme-prompt";

export async function POST(req: NextRequest) {
  const { repoData } = await req.json();

  // Start streaming from the AI SDK
  const { textStream } = streamText({
    model: google("gemini-2.5-flash"),
    prompt: promptReadme(repoData),
  });

  let fullText = "";

  for await (const textPart of textStream) {
    console.log(textPart);
    fullText += textPart;
  }
  console.log("readme", fullText);

  // Return the complete generated README
  return NextResponse.json({
    message: "README created successfully",
    readme: fullText,
  });
}
