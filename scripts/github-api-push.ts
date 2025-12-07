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
  'attached_assets',
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
  'stock_images',
];

// Binary file extensions
const BINARY_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.mp4', '.mp3', '.pdf', '.zip', '.woff', '.woff2', '.ttf', '.eot'];

function isBinaryFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.includes(ext);
}

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

function getAllFiles(dir: string, baseDir: string = ''): { path: string; content: string; isBinary: boolean }[] {
  const files: { path: string; content: string; isBinary: boolean }[] = [];
  
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
          const isBinary = isBinaryFile(fullPath);
          if (isBinary) {
            // Read binary files as base64
            const content = fs.readFileSync(fullPath).toString('base64');
            files.push({ path: relativePath, content, isBinary: true });
          } else {
            // Read text files normally
            const content = fs.readFileSync(fullPath, 'utf-8');
            files.push({ path: relativePath, content, isBinary: false });
          }
        } catch (e) {
          console.log(`Skipping file: ${relativePath}`);
        }
      }
    }
  } catch (e) {
    console.error(`Error reading directory ${dir}:`, e);
  }
  
  return files;
}

async function initializeRepo(octokit: any, owner: string) {
  console.log('📝 Checking repository state...');
  
  try {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: REPO_NAME,
      path: 'README.md',
      message: 'Initialize repository',
      content: Buffer.from('# Singularity Housing Website\n\nProfessional website for Singularity Housing, LLC').toString('base64'),
    });
    console.log('✓ Repository initialized');
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (e: any) {
    if (e.status !== 422) {
      throw e;
    }
    console.log('✓ Repository already initialized');
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
    const textFiles = files.filter(f => !f.isBinary);
    const binaryFiles = files.filter(f => f.isBinary);
    console.log(`Found ${files.length} files (${textFiles.length} text, ${binaryFiles.length} binary)`);
    
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
      const fileType = file.isBinary ? '(binary)' : '(text)';
      process.stdout.write(`  [${count}/${files.length}] ${file.path} ${fileType}...`);
      
      const blob = await octokit.git.createBlob({
        owner,
        repo: REPO_NAME,
        content: file.isBinary ? file.content : Buffer.from(file.content).toString('base64'),
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
      message: 'Add all project files including images\n\nIncludes:\n- All source code files\n- Image assets from attached_assets folder\n- Configuration files',
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
