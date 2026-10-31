import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProgress, summarize, matchTopic, nextTopic } from '../dist/core.mjs';
const topics = [{id:'start',title:'Discovery',summary:'Customer workflow',bridge:'BI',learn:['Metric baseline'],requires:[]},{id:'api',title:'FastAPI',summary:'Typed service',bridge:'Python',learn:['Authorization'],requires:['start']}];
test('new visitors start with zero progress and the first actionable topic', () => {
  const p = {version:1,topics:{}};
  assert.deepEqual(summarize(topics,p),{total:2,done:0,active:0,percent:0});
  assert.equal(nextTopic(topics,p).id,'start');
});
test('resume active work, then respect prerequisite ordering', () => {
  assert.equal(nextTopic(topics,{topics:{start:{status:'done'}}}).id,'api');
  assert.equal(nextTopic(topics,{topics:{api:{status:'active'}}}).id,'api');
  assert.equal(nextTopic(topics,{topics:{start:{status:'done'},api:{status:'done'}}}),null);
});
test('imports accept valid notes but reject unknown IDs and invalid states', () => {
  const p = validateProgress({version:1,topics:{start:{status:'done',notes:'Evidence'}}},['start','api']);
  assert.equal(p.topics.start.notes,'Evidence');
  assert.throws(()=>validateProgress({version:1,topics:{unknown:{status:'done'}}},['start']));
  assert.throws(()=>validateProgress({version:1,topics:{start:{status:'hacked'}}},['start']));
  assert.throws(()=>validateProgress({version:1,topics:{start:{status:'done',notes:{}}}},['start']));
  assert.throws(()=>validateProgress({version:1,topics:[]},['start']));
  assert.throws(()=>validateProgress(null,['start']));
});
test('imported notes are bounded and inherited fields are not copied', () => {
  const p=validateProgress({version:1,topics:{api:{status:'todo',notes:'x'.repeat(6000)}}},['api']);
  assert.equal(p.topics.api.notes.length,5000);
  assert.deepEqual(Object.keys(p),['version','topics']);
});
test('filters combine case-insensitive topic/phase search with status', () => {
  const p={topics:{api:{status:'done'}}};
  assert.ok(matchTopic(topics[1],{title:'Build an application'},'python','done',p));
  assert.ok(matchTopic(topics[1],{title:'Build an application'},'application','done',p));
  assert.ok(!matchTopic(topics[1],{title:'Build an application'},'python','active',p));
  assert.ok(!matchTopic(topics[0],{title:'Frame'},'python','all',p));
  assert.ok(matchTopic(topics[0],{title:'Frame'},'  metric  ','todo',p));
});
