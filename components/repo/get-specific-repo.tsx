"use client";

import React, { useState } from "react";

import { Repo } from "@/lib/repo";
import { Button } from "../ui/button";
import axios from "axios";
import { ReadmeCard } from "./readme-card";
import SpecificRepoCard from "./specific-repo-card";

type SpecificRepoCardProps = {
  repo: Repo;
};

const GetSpecificRepo = ({ repo }: SpecificRepoCardProps) => {
  const [readme, setReadme] = useState("");

  const handleReadmeGen = async () => {
    try {
      const res = await axios.post("/api/readme-gen", { repoData: repo });
      if (res?.data?.readme) {
        setReadme(res.data.readme);
      }
    } catch (err) {
      console.error("Error generating README:", err);
    }
  };

  return (
    <div className="space-y-4">
      <SpecificRepoCard repo={repo} />
      <Button className="self-start" onClick={handleReadmeGen}>
        Generate README
      </Button>
      {readme && <ReadmeCard readme={readme} />}
    </div>
  );
};

export default GetSpecificRepo;
