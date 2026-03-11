import { getGitRepos } from "./env.js";
import { buildRepos } from "./workspace.js";

const repos = getGitRepos();

await buildRepos(repos, {
  baseDir: "packs",
  label: "workspace",
  diff: true,
});
