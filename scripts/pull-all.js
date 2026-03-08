import { getGitRepos, getPackageRepos, getTemplateRepos } from "./env.js";
import { pullRepos } from "./workspace.js";

const workspaceRepos = getGitRepos();
const templateRepos = getTemplateRepos();
const packageRepos = getPackageRepos();

try {
  await pullRepos(workspaceRepos, { baseDir: "packs", label: "workspace" });
  await pullRepos(templateRepos, { baseDir: "templates", label: "templates" });
  await pullRepos(packageRepos, { baseDir: "packages", label: "packages" });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
