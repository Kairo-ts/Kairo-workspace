import { execSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { getGitRepos, repoUrlToDirName, repoUrlToPath } from "./env.js";

const repos = getGitRepos();

for (const repoUrl of repos) {
  const dirName = repoUrlToDirName(repoUrl);
  const repoDir = repoUrlToPath(repoUrl);

  mkdirSync(path.resolve("..", "packs"), { recursive: true });

  if (!existsSync(repoDir)) {
    console.log(`git clone ${repoUrl}`);
    execSync(`git clone ${repoUrl} ${repoDir}`, {
      cwd: "..",
      stdio: "inherit",
      shell: true,
    });
  }

  console.log(`npm install: ${dirName}`);
  execSync("npm install", {
    cwd: repoDir,
    stdio: "inherit",
    shell: true,
  });

  console.log(`npm update: ${dirName}`);
  execSync("npm update", {
    cwd: repoDir,
    stdio: "inherit",
    shell: true,
  });
}
