import Mock from 'mockjs';
const Random = Mock.Random;

Mock.mock('/api/index/recommend', 'get', {
  msg: 'ok',
  code: 200,
  status: true,
  data: {
    'list|10-20': [
      {
        id: '@string("number", 10)',
        title: '@ctitle',
        questionNum: '@natural(5, 10)',
        quoteNum: Random.natural(1, 1000)
      }
    ]
  }
});
