import "dotenv/config";
import path from "node:path";

export function getGitRepos() {
  const raw = process.env.GIT_REPOS;
  if (!raw) {
    throw new Error("GIT_REPOS is not defined in .env");
  }

  return raw
    .split(/\s+/)
    .map((v) => v.trim())
    .filter((v) => v && v !== "\\");
}

export function repoUrlToDirName(repoUrl) {
  const name = repoUrl.split("/").pop();
  if (!name || !name.endsWith(".git")) {
    throw new Error(`Invalid repo url: ${repoUrl}`);
  }
  return name.replace(/\.git$/, "");
}

export function repoUrlToPath(repoUrl) {
  return path.resolve("..", "packs", repoUrlToDirName(repoUrl));
}
