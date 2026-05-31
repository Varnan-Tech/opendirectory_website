import JSZip from 'jszip';

const REPO_OWNER = 'Varnan-Tech';
const REPO_NAME = 'opendirectory';
const BRANCH = 'main';

const githubHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'opendirectory-website/1.0',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

type TreeEntry = { path: string; type: 'blob' | 'tree'; sha: string };

async function listSkillFiles(skillName: string): Promise<TreeEntry[]> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url, { headers: githubHeaders(), next: { revalidate: 600 } });
  if (!res.ok) {
    throw new Error(`GitHub tree fetch failed: ${res.status}`);
  }
  const json = (await res.json()) as { tree: TreeEntry[]; truncated: boolean };
  const prefix = `skills/${skillName}/`;
  return json.tree.filter(t => t.type === 'blob' && t.path.startsWith(prefix));
}

async function fetchFileRaw(path: string): Promise<ArrayBuffer> {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Raw file fetch failed (${res.status}): ${path}`);
  }
  return res.arrayBuffer();
}

export async function buildSkillZip(skillName: string): Promise<ArrayBuffer> {
  const files = await listSkillFiles(skillName);
  if (files.length === 0) {
    throw new Error(`Skill not found: ${skillName}`);
  }

  const zip = new JSZip();
  const prefix = `skills/${skillName}/`;

  const chunks: Promise<void>[] = [];
  for (const file of files) {
    chunks.push(
      fetchFileRaw(file.path).then(buf => {
        const relativePath = file.path.slice(prefix.length);
        zip.file(`${skillName}/${relativePath}`, buf);
      })
    );
  }
  await Promise.all(chunks);

  return zip.generateAsync({ type: 'arraybuffer', compression: 'DEFLATE' });
}

const SAFE_NAME = /^[a-zA-Z0-9_-]{1,64}$/;
export function isSafeSkillName(name: string): boolean {
  return SAFE_NAME.test(name);
}
