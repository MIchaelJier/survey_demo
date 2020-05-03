import Mock from 'mockjs';
const Random = Mock.Random;

Mock.mock('/api/index/recommend', 'get', {
  msg: 'ok',
  code: 200,
  status: true,
  data: {
    'list|10-20': [
      {
        _id: '@string("number", 10)',
        title: '@ctitle',
        questionNum: '@natural(5, 10)',
        quoteNum: Random.natural(1, 1000)
      }
    ]
  }
});

Mock.mock('/api/detail/questions', 'get', {
  msg: 'ok',
  code: 200,
  status: true,
  data: {
    title: '@ctitle',
    description: '@cparagraph(3)',
    coverPic: 'https://img.yzcdn.cn/vant/cat.jpeg',
    'list|10-15': [
      {
        _id: '@string("number", 10)',
        type: '@natural(1, 5)',
        question: '@ctitle',
        isNecessity: '@boolean',
        'content|2-4': ['@ctitle']
      }
    ]
  }
});
