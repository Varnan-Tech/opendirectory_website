const { execSync } = require("child_process");
const path = require("path");

const repoDir = "C:\\Users\\Fariz\\OneDrive\\Desktop\\experiments\\opendirectory_website";

function run(cmd) {
  console.log(">", cmd);
  try {
    const r = execSync(cmd, { cwd: repoDir, encoding: "utf8", shell: "cmd.exe" });
    console.log(r);
    return r;
  } catch (e) {
    console.error("Error:", e.message);
    return null;
  }
}

// Stage all files
run('git add -A');

// Commit
run('git commit -m "fix: resolve all Copilot PR review comments"');

// Push
run('git push');
