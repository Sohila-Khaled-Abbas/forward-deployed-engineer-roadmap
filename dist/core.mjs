export const STATUSES = ['todo', 'active', 'done'];
export const STORAGE_KEY = 'fieldnotes-fde-v1';

export function validateProgress(raw, ids) {
  if (!raw || raw.version !== 1 || typeof raw.topics !== 'object' || !raw.topics || Array.isArray(raw.topics)) {
    throw new Error('Choose a Fieldnotes progress file (version 1).');
  }
  const allowed = new Set(ids);
  const topics = {};
  for (const [id, item] of Object.entries(raw.topics)) {
    if (!allowed.has(id)) throw new Error('This file contains an unknown topic.');
    if (!item || !STATUSES.includes(item.status) || (item.notes !== undefined && typeof item.notes !== 'string')) {
      throw new Error('The progress file contains an invalid status or note.');
    }
    topics[id] = { status: item.status, notes: (item.notes || '').slice(0, 5000) };
  }
  return { version: 1, topics };
}

export function summarize(topics, progress) {
  const done = topics.filter(t => progress.topics[t.id]?.status === 'done').length;
  const active = topics.filter(t => progress.topics[t.id]?.status === 'active').length;
  return { total: topics.length, done, active, percent: topics.length ? Math.round(done / topics.length * 100) : 0 };
}

export function matchTopic(topic, phase, query = '', status = 'all', progress = { topics: {} }) {
  const text = [topic.title, topic.summary, topic.bridge, phase.title, ...(topic.learn || [])].join(' ').toLowerCase();
  return (!query || text.includes(query.trim().toLowerCase())) &&
    (status === 'all' || (progress.topics[topic.id]?.status || 'todo') === status);
}

export function nextTopic(topics, progress) {
  const done = id => progress.topics[id]?.status === 'done';
  return topics.find(t => progress.topics[t.id]?.status === 'active') ||
    topics.find(t => !done(t.id) && t.requires.every(done)) ||
    topics.find(t => !done(t.id)) || null;
}
