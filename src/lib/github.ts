import { Octokit } from 'octokit'
import { REPO_OWNER, REPO_NAME, REPO_BRANCH } from '@/lib/constants'

function createOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken })
}

export async function getFileContent(
  accessToken: string,
  filePath: string
): Promise<{ content: string; sha: string }> {
  const octokit = createOctokit(accessToken)
  const { data } = await octokit.rest.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: filePath,
  })

  if (Array.isArray(data) || data.type !== 'file') {
    throw new Error(`Path does not point to a file: ${filePath}`)
  }

  return {
    content: Buffer.from(data.content, 'base64').toString('utf-8'),
    sha: data.sha,
  }
}

export interface FileCommit {
  path: string
  content: string
  encoding: 'base64' | 'utf-8'
}

export async function commitMultipleFiles(
  accessToken: string,
  files: FileCommit[],
  message: string
): Promise<void> {
  const octokit = createOctokit(accessToken)

  const { data: refData } = await octokit.rest.git.getRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `heads/${REPO_BRANCH}`,
  })
  const headSha = refData.object.sha

  const { data: commitData } = await octokit.rest.git.getCommit({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    commit_sha: headSha,
  })

  const treeItems = await Promise.all(
    files.map(async (f) => {
      const { data: blob } = await octokit.rest.git.createBlob({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        content: f.content,
        encoding: f.encoding,
      })
      return {
        path: f.path,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: blob.sha,
      }
    })
  )

  const { data: newTree } = await octokit.rest.git.createTree({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    base_tree: commitData.tree.sha,
    tree: treeItems,
  })

  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    message,
    tree: newTree.sha,
    parents: [headSha],
  })

  await octokit.rest.git.updateRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `heads/${REPO_BRANCH}`,
    sha: newCommit.sha,
  })
}

export async function commitFileContent(
  accessToken: string,
  filePath: string,
  content: string,
  sha: string,
  message: string
): Promise<void> {
  const octokit = createOctokit(accessToken)
  await octokit.rest.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: filePath,
    message,
    content: Buffer.from(content).toString('base64'),
    sha,
  })
}
