import { get } from './http';

export const index_recommend = () => get('api/index/recommend');

export const detail_questions = () => get('api/detail/questions');
