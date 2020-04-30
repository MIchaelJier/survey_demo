import { get, post } from './http';

export const index_recommend = p =>
  get('/allSurveyList', p);

export const detail_questions = p =>
  get('/SearchSurveyListById', p);

export const login = p => post('/login', p);

export const register = p => post('/register', p);

export const submit_answer = p =>
  post('/addAnswerItem', p);
  
  
export const submit_survey = (p, config) =>
  post('/addSurveyItem', p, config);
