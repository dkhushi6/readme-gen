"use client";

import React, { useState } from "react";

import { Repo } from "@/lib/repo";
import axios from "axios";
import { ReadmeCard } from "./readme-card";
import SpecificRepoCard from "./specific-repo-card";
import { GenerateButton } from "../generate-button";

type SpecificRepoCardProps = {
  repo: Repo;
  username: string;
};

const GetSpecificRepo = ({ repo, username }: SpecificRepoCardProps) => {
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReadmeGen = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/readme-gen", { repoData: repo });
      if (res?.data?.readme) {
        setReadme(res.data.readme);
      }
    } catch (err) {
      console.error("Error generating README:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <SpecificRepoCard repo={repo} />
      {readme ? (
        <ReadmeCard readme={readme} username={username} repoName={repo.name} />
      ) : (
        <div className="flex justify-center items-center">
          <GenerateButton
            label="Generate README"
            loading={loading}
            handleReadmeGen={handleReadmeGen}
          />
        </div>
      )}
    </div>
  );
};

export default GetSpecificRepo;
