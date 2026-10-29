import test from 'node:test';
import assert from 'node:assert/strict';
import {loginErrorMessage} from '../src/lib/authErrors.ts';
test('connection failures never claim the password is invalid',()=>{
 for(const error of [{message:'Failed to fetch',status:0},{name:'AuthRetryableFetchError',message:'Failed to fetch'},{status:503,message:'unavailable'}]) {
  assert.match(loginErrorMessage(error),/senha não pôde ser verificada/);
 }
 assert.equal(loginErrorMessage({code:'invalid_credentials'}),'E-mail ou senha inválidos.');
 assert.match(loginErrorMessage({code:'email_not_confirmed'}),/ativado/);
 assert.match(loginErrorMessage({status:429}),/Muitas tentativas/);
 assert.doesNotMatch(loginErrorMessage({message:'Unexpected error'}),/senha inválidos/);
});
