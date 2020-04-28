import { get, post } from './http';

export const index_recommend = () => get('api/index/recommend');

export const detail_questions = () => get('api/detail/questions');

export const login = p => post('http://localhost:3333/api/login', p);

export const register = p => post('http://localhost:3333/api/register', p);
