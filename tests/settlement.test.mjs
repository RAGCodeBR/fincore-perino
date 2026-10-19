import test from 'node:test';
import assert from 'node:assert/strict';
import { confirmedSettlement } from '../src/lib/settlement.ts';

test('confirmation settles only the requested occurrence, retaining amounts, bank and the entire series',()=>{
 for(const kind of ['despesa','receita']) {
  const before={id:'one',kind,status:'previsto',amount:123,bankId:'bank',seriesId:'monthly',date:'2026-10-01',paidDate:'',juros:2,discount:1};
  const after=confirmedSettlement(before,before,'2026-10-18','2026-10-19');
  assert.deepEqual(after,{...before,status:'realizado',paidDate:'2026-10-18'});
  assert.equal(before.status,'previsto');
 }
});
test('invalid or future dates and stale occurrences cannot be confirmed',()=>{
 const entry={id:'one',status:'previsto'};
 for(const date of ['', '2026-10-20', '2026-02-30', 'not-a-date']) assert.throws(()=>confirmedSettlement(entry,entry,date,'2026-10-19'));
 assert.throws(()=>confirmedSettlement(undefined,entry,'2026-10-19','2026-10-19'));
 assert.throws(()=>confirmedSettlement({...entry,status:'realizado'},entry,'2026-10-19','2026-10-19'));
});
test('confirmed reversal explicitly clears the persisted settlement date',()=>{
 const entry={id:'one',status:'realizado',paidDate:'2026-10-18',amount:123};
 assert.deepEqual(confirmedSettlement(entry,entry,'','2026-10-19'),{...entry,status:'previsto',paidDate:''});
});
