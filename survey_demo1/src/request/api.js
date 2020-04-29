import { get, post } from './http';

export const index_recommend = p =>
  get('http://localhost:3333/api/allSurveyList', p);

export const detail_questions = p =>
  get('http://localhost:3333/api/SearchSurveyListById', p);

export const login = p => post('http://localhost:3333/api/login', p);

export const register = p => post('http://localhost:3333/api/register', p);

export const submit_answer = p =>
  post('http://localhost:3333/api/addAnswerItem', p);
