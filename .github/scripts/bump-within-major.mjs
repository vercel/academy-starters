// Moves each dependency in the given package.json files to the newest release in its current major
// (for 0.x, its current minor), using only versions published at least two days ago.
// Skips ranges it can't parse (4.x, tags, workspace:, npm:). Prints one line per bump.
//   node .github/scripts/bump-within-major.mjs <package.json...>
import { readFileSync, writeFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);
const files = process.argv.slice(2);
const versions = new Map();
// Only versions published at least two days ago, matching the npm release-age rule on the maintainer's machine.
const cutoff = Date.now() - 2 * 24 * 3600 * 1000;
const list = n => versions.get(n) ?? versions.set(n, run('npm', ['view', n, 'time', '--json'], { maxBuffer: 64 << 20 }).then(r => Object.entries(JSON.parse(r.stdout)).filter(([v, t]) => /^\d+\.\d+\.\d+$/.test(v) && Date.parse(t) < cutoff).map(([v]) => v), () => [])).get(n);
const num = v => v.split(/[.+-]/).slice(0, 3).map(Number);
const cmp = (a, b) => { const x = num(a), y = num(b); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; };
const report = [];
for (const f of files) {
  const p = JSON.parse(readFileSync(f, 'utf8')); let changed = false;
  for (const k of ['dependencies', 'devDependencies']) for (const [n, spec] of Object.entries(p[k] || {})) {
    const m = spec.match(/^([\^~]?)(\d+)\.(\d+)\.(\d+)$/); if (!m) continue;   // skip ranges like 4.x, tags, workspace:, npm:
    const [, pre, maj, min] = m; const cur = `${maj}.${min}.${m[4]}`;
    const all = (await list(n)).filter(v => /^\d+\.\d+\.\d+$/.test(v));
    // Same major; for 0.x, same minor (a 0.x minor is a breaking change).
    const same = all.filter(v => num(v)[0] === +maj && (+maj > 0 || num(v)[1] === +min));
    const best = same.sort(cmp).pop();
    if (best && cmp(best, cur) > 0) { p[k][n] = pre + best; changed = true; report.push(`${f.replace(/\/package\.json$/, '')}: ${n} ${spec} -> ${pre}${best}`); }
  }
  if (changed) writeFileSync(f, JSON.stringify(p, null, 2) + '\n');
}
console.log(report.join('\n')); console.error(`${report.length} bumps across ${new Set(report.map(r => r.split(':')[0])).size} package.json files`);
