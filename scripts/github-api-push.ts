// Push code to GitHub using the API
import { getUncachableGitHubClient, getAuthenticatedUser } from '../server/github';
import * as fs from 'fs';
import * as path from 'path';

const REPO_NAME = 'singularity-housing-website';

// Files and directories to include
const INCLUDE_PATTERNS = [
  'client',
  'server', 
  'shared',
  'scripts',
  'public',
  'index.html',
  'package.json',
  'tsconfig.json',
  'tailwind.config.ts',
  'postcss.config.js',
  'drizzle.config.ts',
  'replit.md',
  'design_guidelines.md',
  '.gitignore',
];

// Files and directories to exclude
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  '.replit',
  'replit.nix',
  '.config',
  'generated-icon.png',
];

function shouldInclude(filePath: string): boolean {
  const parts = filePath.split('/');
  
  for (const part of parts) {
    if (EXCLUDE_PATTERNS.includes(part)) {
      return false;
    }
  }
  
  const root = parts[0];
  return INCLUDE_PATTERNS.includes(root);
}

function getAllFiles(dir: string, baseDir: string = ''): { path: string; content: string }[] {
  const files: { path: string; content: string }[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = baseDir ? `${baseDir}/${item}` : item;
      
      if (!shouldInclude(relativePath)) {
        continue;
      }
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath, relativePath));
      } else if (stat.isFile()) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          files.push({ path: relativePath, content });
        } catch (e) {
          console.log(`Skipping binary file: ${relativePath}`);
        }
      }
    }
  } catch (e) {
    console.error(`Error reading directory ${dir}:`, e);
  }
  
  return files;
}

async function initializeRepo(octokit: any, owner: string) {
  console.log('📝 Initializing repository with README...');
  
  try {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: REPO_NAME,
      path: 'README.md',
      message: 'Initialize repository',
      content: Buffer.from('# Singularity Housing Website\n\nProfessional website for Singularity Housing, LLC').toString('base64'),
    });
    console.log('✓ Repository initialized');
    
    // Wait a moment for GitHub to process
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (e: any) {
    if (e.status !== 422) {
      throw e;
    }
    console.log('Repository already initialized');
  }
}

async function pushToGitHub() {
  try {
    const octokit = await getUncachableGitHubClient();
    const user = await getAuthenticatedUser();
    const owner = user.login;
    
    console.log(`📦 Pushing to ${owner}/${REPO_NAME}...`);
    
    // Initialize repo first if empty
    await initializeRepo(octokit, owner);
    
    // Get all files
    console.log('\n📂 Collecting files...');
    const files = getAllFiles('.');
    console.log(`Found ${files.length} files to push`);
    
    // Get the current main branch SHA
    console.log('\n🔍 Getting current branch state...');
    let parentSha: string | undefined;
    try {
      const { data: ref } = await octokit.git.getRef({
        owner,
        repo: REPO_NAME,
        ref: 'heads/main',
      });
      parentSha = ref.object.sha;
      console.log(`Current HEAD: ${parentSha.substring(0, 7)}`);
    } catch (e) {
      console.log('No existing commits found');
    }
    
    // Create blobs for each file
    console.log('\n🔄 Creating file blobs...');
    const treeItems: { path: string; mode: '100644'; type: 'blob'; sha: string }[] = [];
    
    let count = 0;
    for (const file of files) {
      count++;
      process.stdout.write(`  [${count}/${files.length}] ${file.path}...`);
      const blob = await octokit.git.createBlob({
        owner,
        repo: REPO_NAME,
        content: Buffer.from(file.content).toString('base64'),
        encoding: 'base64',
      });
      treeItems.push({
        path: file.path,
        mode: '100644',
        type: 'blob',
        sha: blob.data.sha,
      });
      console.log(' ✓');
    }
    
    // Create tree
    console.log('\n🌳 Creating tree...');
    const tree = await octokit.git.createTree({
      owner,
      repo: REPO_NAME,
      tree: treeItems,
      base_tree: parentSha,
    });
    
    // Create commit
    console.log('📝 Creating commit...');
    const commitData: any = {
      owner,
      repo: REPO_NAME,
      message: 'Singularity Housing website - Full codebase\n\nProfessional website for Singularity Housing, LLC featuring:\n- Modern minimalist design with Sage & Ink color scheme\n- WCAG AA accessibility compliance\n- Responsive layout with 3D shadow effects\n- Interactive animations throughout',
      tree: tree.data.sha,
    };
    
    if (parentSha) {
      commitData.parents = [parentSha];
    }
    
    const commit = await octokit.git.createCommit(commitData);
    
    // Update main branch reference
    console.log('🔗 Updating main branch...');
    await octokit.git.updateRef({
      owner,
      repo: REPO_NAME,
      ref: 'heads/main',
      sha: commit.data.sha,
      force: true,
    });
    
    console.log('\n✅ Successfully pushed to GitHub!');
    console.log(`\n📁 Repository: https://github.com/${owner}/${REPO_NAME}`);
    
  } catch (error: any) {
    console.error('❌ Error:', error.message || error);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

pushToGitHub();
