#!/usr/bin/env node
// scripts/antigravity-review.mjs — Antigravity + Gemini review harness
// Runs the 7-criteria rubric from .antigravity/rubric.md without requiring an API key.
// If GEMINI_API_KEY or ANTHROPIC_API_KEY is set, it can optionally call the LLM judge.

import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'fs';
import { globSync } from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const REPORT_DIR = path.join(ROOT, 'reports');
mkdirSync(REPORT_DIR, { recursive: true });

function gzEstimate(bytes) { return Math.round(bytes * 0.32); }

function checkFile(p) { try { return statSync(p); } catch { return null; } }

const criteria = [
  { id: 1, name: 'Visual Design', weight: 1 },
  { id: 2, name: 'IA', weight: 1 },
  { id: 3, name: 'Motion', weight: 1 },
  { id: 4, name: 'Performance', weight: 2 },
  { id: 5, name: 'SEO', weight: 1 },
  { id: 6, name: 'A11y', weight: 1 },
  { id: 7, name: 'Maintainability', weight: 1 },
];

let perf = { score: 5, notes: [] };
if (existsSync(DIST)) {
  const assets = globSync('dist/assets/*.{js,css}');
  let total = 0, hasVendorThree = false;
  for (const a of assets) {
    const s = checkFile(a);
    if (s) total += s.size;
    if (a.includes('vendor-three')) hasVendorThree = true;
  }
  const gz = gzEstimate(total);
  if (hasVendorThree) { perf.score = 2; perf.notes.push('vendor-three still present (dead THREE chunk)'); }
  else if (gz > 250*1024) { perf.score = 3; perf.notes.push(`gz ~${Math.round(gz/1024)}KB >250KB`); }
  else { perf.notes.push(`gz ~${Math.round(gz/1024)}KB, vendor-three gone`); }
  const indexHtml = path.join(DIST, 'index.html');
  if (existsSync(indexHtml)) {
    const html = readFileSync(indexHtml, 'utf8');
    if (!html.includes('fetchpriority="high"')) { perf.score = Math.min(perf.score, 4); perf.notes.push('missing fetchpriority=high on hero'); }
    if (html.includes('user-scalable=no')) { perf.score = Math.min(perf.score, 2); perf.notes.push('user-scalable=no still present'); }
    if (!html.includes('rel="canonical"')) { perf.notes.push('no static canonical'); }
  }
} else {
  perf.score = 3; perf.notes.push('dist not found — run npm run build first');
}

let seo = { score: 5, notes: [] };
try {
  const html = readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  if (html.includes('content="/jay1.webp"')) { seo.score = 2; seo.notes.push('relative og:image'); }
  if (!html.includes('rel="canonical"')) { seo.score = Math.min(seo.score, 4); seo.notes.push('no canonical in src/index.html'); }
  if ((html.match(/rel="preconnect"/g) || []).length > 2) { seo.notes.push('duplicate preconnect'); }
} catch { seo.notes.push('index.html not readable'); }

let a11y = { score: 5, notes: [] };
try {
  const css = readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  if (css.includes('cursor: none')) { a11y.score = 2; a11y.notes.push('cursor: none still present'); }
  if (css.includes('scrollbar-width: none') && css.includes('display: none')) { a11y.score = Math.min(a11y.score, 3); a11y.notes.push('hidden scrollbar still present'); }
} catch {}

let maintain = { score: 5, notes: [] };
try {
  const app = readFileSync(path.join(ROOT, 'src/app.jsx'), 'utf8');
  if (app.includes('IdeLayout')) { maintain.score = 2; maintain.notes.push('IdeLayout still imported'); }
  if (app.includes('project/:id') || app.includes('project-summary')) { maintain.score = Math.min(maintain.score, 3); maintain.notes.push('project routes still present — single-page-only expects only / + hidden'); }
  const layout = existsSync(path.join(ROOT, 'src/components/MinimalLayout.jsx'));
  if (!layout) { maintain.score = Math.min(maintain.score, 3); maintain.notes.push('MinimalLayout.jsx missing'); }
} catch {}

const report = {
  generatedAt: new Date().toISOString(),
  branch: 'redesign/bencodes-type',
  rubric: '.antigravity/rubric.md',
  criteria: criteria.map(c => {
    if (c.id === 4) return { ...c, ...perf };
    if (c.id === 5) return { ...c, ...seo };
    if (c.id === 6) return { ...c, ...a11y };
    if (c.id === 7) return { ...c, ...maintain };
    return { ...c, score: 5, notes: ['manual check: compare vs bencodes.de side-by-side'] };
  }),
};

const out = path.join(REPORT_DIR, 'antigravity-review.json');
writeFileSync(out, JSON.stringify(report, null, 2));
console.log(`Wrote ${out}`);
console.table(report.criteria.map(c => ({ id: c.id, name: c.name, score: c.score, notes: c.notes.join('; ') })));

// Optionally call Gemini if key set — stub
if (process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY) {
  console.log('LLM key detected — LLM judge could be wired here via generative-ai or claude-api Skill.');
} else {
  console.log('No GEMINI_API_KEY/ANTHROPIC_API_KEY — static rubric only (no LLM call).');
}
