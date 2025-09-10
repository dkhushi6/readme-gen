"use client";

import GithubPublicRepos from "@/components/repo/get-public-repos";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const username = params?.username as string;
  if (username) {
    console.log("username", username);
  }
  return <GithubPublicRepos username={username} />;
};

export default Page;
