import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const data = JSON.parse(await readFile('dist/data/roadmap.json', 'utf8'));
const topics = data.phases.flatMap(p => p.topics);
const ids = new Set(topics.map(t => t.id));
const resources = new Set(data.resources.map(r => r.id));
assert.equal(data.phases.length, 6);
assert.equal(topics.length, 36);
assert.equal(ids.size, topics.length, 'Topic IDs must be unique');
assert.equal(data.phases.flatMap(p => p.weekly).length, 24);
assert.equal(topics.reduce((s, t) => s + t.hours, 0), data.weeks * data.hoursPerWeek);
const visited = new Set();
for (const topic of topics) {
  for (const key of ['title','summary','bridge','artifact','gate']) assert.ok(topic[key]?.trim(), `${topic.id}: missing ${key}`);
  assert.ok(topic.learn.length >= 3);
  for (const id of topic.requires) assert.ok(visited.has(id), `Prerequisite ${id} for ${topic.id} must appear earlier`);
  for (const id of topic.resources) assert.ok(resources.has(id), `Missing resource ${id}`);
  visited.add(topic.id);
}
for (const resource of data.resources) assert.equal(new URL(resource.url).protocol, 'https:');
for (const file of ['dist/index.html','dist/styles.css','dist/app.mjs','dist/core.mjs','dist/assets/favicon.svg','dist/assets/social-card.png','dist/.nojekyll','docs/roadmap.md','docs/weekly-plan.md']) await access(file);
const html = await readFile('dist/index.html', 'utf8');
assert.match(html, /name="description"/);
assert.match(html, /og:image/);
assert.match(html, /<dialog[^>]+aria-labelledby/);
for (const file of ['dist/app.mjs','dist/core.mjs','scripts/serve.mjs']) execFileSync(process.execPath, ['--check', file]);
console.log('Validated 6 stages, 36 topics, 24 weeks, 216 hours, prerequisite order, resources, assets, and script syntax.');
