import { execSync } from "node:child_process";
import { getGitRepos, repoUrlToDirName, repoUrlToPath } from "./env.js";

const repos = getGitRepos();

for (const repoUrl of repos) {
  const dirName = repoUrlToDirName(repoUrl);

  if (dirName === "kairo-workspace") {
    console.log(`skip build (workspace): ${dirName}`);
    continue;
  }

  const repoDir = repoUrlToPath(repoUrl);

  console.log(`\nBUILD START: ${dirName}`);

  try {
    execSync("npm run build", {
      cwd: repoDir,
      stdio: "inherit",
      shell: true,
    });
  } catch {
    console.error(`\nBUILD FAILED: ${dirName}`);
    console.error(`Path: ${repoDir}`);
    process.exit(1);
  }

  console.log(`BUILD SUCCESS: ${dirName}`);
}
