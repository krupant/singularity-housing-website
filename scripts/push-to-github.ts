// Script to push code to GitHub
import { createRepository, getAuthenticatedUser } from '../server/github';
import { execSync } from 'child_process';

const REPO_NAME = 'singularity-housing-website';
const REPO_DESCRIPTION = 'Professional website for Singularity Housing, LLC - Innovative housing solutions for vulnerable populations';

async function pushToGitHub() {
  try {
    console.log('🔄 Getting GitHub user info...');
    const user = await getAuthenticatedUser();
    console.log(`✅ Authenticated as: ${user.login}`);

    console.log(`\n🔄 Creating repository: ${REPO_NAME}...`);
    const result = await createRepository(REPO_NAME, REPO_DESCRIPTION, false);

    if (!result.success) {
      console.log(`⚠️  ${result.error}`);
      console.log('Attempting to use existing repository...');
    } else {
      console.log(`✅ Repository created: ${result.repoUrl}`);
    }

    const remoteUrl = `https://github.com/${user.login}/${REPO_NAME}.git`;
    
    console.log('\n🔄 Configuring git...');
    
    try {
      execSync('git status', { stdio: 'pipe' });
    } catch {
      console.log('Initializing git repository...');
      execSync('git init', { stdio: 'inherit' });
    }

    try {
      execSync('git remote remove origin', { stdio: 'pipe' });
    } catch {
    }
    
    console.log(`Adding remote: ${remoteUrl}`);
    execSync(`git remote add origin ${remoteUrl}`, { stdio: 'inherit' });

    console.log('\n🔄 Staging all files...');
    execSync('git add -A', { stdio: 'inherit' });

    console.log('🔄 Creating commit...');
    try {
      execSync('git commit -m "Initial commit: Singularity Housing website"', { stdio: 'inherit' });
    } catch {
      console.log('No new changes to commit or commit already exists');
    }

    console.log('\n🔄 Pushing to GitHub...');
    execSync('git branch -M main', { stdio: 'inherit' });
    execSync('git push -u origin main --force', { stdio: 'inherit' });

    console.log('\n✅ Successfully pushed to GitHub!');
    console.log(`\n📁 Repository URL: https://github.com/${user.login}/${REPO_NAME}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

pushToGitHub();
