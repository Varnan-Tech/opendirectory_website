const fs = require('fs');

async function main() {
  console.log('Fetching closed PRs from Varnan-Tech/opendirectory...');
  const response = await fetch('https://api.github.com/repos/Varnan-Tech/opendirectory/pulls?state=closed&per_page=10');
  const prs = await response.json();

  const mergedPrs = prs.filter(pr => pr.merged_at !== null);
  console.log(`Found ${mergedPrs.length} merged PRs.`);

  for (const pr of mergedPrs) {
    console.log(`\n--- PR #${pr.number}: ${pr.title} ---`);
    console.log(`Author login: ${pr.user?.login}`);
    console.log(`Author email in PR payload: ${pr.user?.email}`);

    // Fetch commits for this PR
    const commitsUrl = pr.commits_url;
    console.log(`Fetching commits from: ${commitsUrl}`);
    const commitsResponse = await fetch(commitsUrl);
    const commits = await commitsResponse.json();

    if (commits && commits.length > 0) {
      const firstCommit = commits[0];
      console.log(`First commit author email: ${firstCommit.commit?.author?.email}`);
      console.log(`First commit committer email: ${firstCommit.commit?.committer?.email}`);
      
      // Let's find the first commit by the PR author
      const authorCommit = commits.find(c => c.author?.login === pr.user?.login);
      if (authorCommit) {
        console.log(`Author's commit email: ${authorCommit.commit?.author?.email}`);
      } else {
        console.log(`Could not find a commit explicitly linked to the PR author's login.`);
      }
    } else {
      console.log('No commits found or error fetching commits.');
    }
  }
}

main().catch(console.error);
