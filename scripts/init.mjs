// Rename this template copy to match its repository name.
//
// Rewrites the project's identity in three places:
//   - package.json  "name"        -> npm-safe slug   (e.g. "q3-review")
//   - index.html    <title>       -> display title   (e.g. "Q3 Review")
//   - README.md     first heading -> display title
//
// Re-runnable: it matches on structure, not on the old "vinta-slides" text,
// so you can run it again to rename to something else.
//
// Usage:
//   node scripts/init.mjs                 # infer name from git remote / folder
//   node scripts/init.mjs my-cool-deck    # explicit name
//   npm run init -- my-cool-deck

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Best guess of the project name, in priority order. */
function detectName() {
  const arg = process.argv[2]?.trim();
  if (arg) return arg;

  // GitHub Actions provides "owner/repo".
  const ghRepo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (ghRepo) return ghRepo;

  try {
    const url = execSync('git config --get remote.origin.url', {
      cwd: root,
      encoding: 'utf8',
    }).trim();
    const match = url.match(/([^/:]+?)(?:\.git)?$/);
    if (match) return match[1];
  } catch {
    // no git remote; fall through
  }

  return basename(root);
}

/** "q3-review" / "Q3_Review" -> "q3-review" (valid npm package name). */
function toSlug(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'my-deck';
}

/** "q3-review" -> "Q3 Review". */
function toTitle(name) {
  return name
    .trim()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Read, transform, write — only if the file exists and content changed. */
function patch(relPath, transform) {
  const file = resolve(root, relPath);
  if (!existsSync(file)) return;
  const before = readFileSync(file, 'utf8');
  const after = transform(before);
  if (after !== before) {
    writeFileSync(file, after);
    console.log(`  updated ${relPath}`);
  }
}

const rawName = detectName();
const slug = toSlug(rawName);
const title = toTitle(rawName);

// Don't rename the template back onto itself.
if (slug === 'vinta-react-deck-template' || slug === 'vinta-slides') {
  console.log(`Skipping rename: "${slug}" is the template itself.`);
  process.exit(0);
}

console.log(`Renaming template -> slug "${slug}", title "${title}"`);

// package.json "name": "..." (first occurrence, the top-level field)
patch('package.json', (s) =>
  s.replace(/("name"\s*:\s*")[^"]*(")/, `$1${slug}$2`)
);

// index.html <title>...</title>
patch('index.html', (s) =>
  s.replace(/(<title>)[\s\S]*?(<\/title>)/, `$1${title}$2`)
);

// README.md first markdown heading line
patch('README.md', (s) =>
  s.replace(/^#\s+.*$/m, `# ${title}`)
);

console.log('Done.');
