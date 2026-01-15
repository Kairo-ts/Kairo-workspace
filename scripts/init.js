import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { getGitRepos, repoUrlToDirName, repoUrlToPath } from "./env.js";

const repos = getGitRepos();

for (const repoUrl of repos) {
  const dirName = repoUrlToDirName(repoUrl);
  const repoDir = repoUrlToPath(repoUrl);

  if (!existsSync(repoDir)) {
    console.log(`git clone ${repoUrl}`);
    execSync(`git clone ${repoUrl}`, {
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
}
