export const isHavaEmpty = one => {
  let emptyFlag = 0;
  (function isEmpty(one) {
    if (Reflect.toString.call(one) === '[object Array]') {
      one.forEach(inner => {
        isEmpty(inner);
      });
    } else if (Reflect.toString.call(one) === '[object Object]') {
      Object.keys(one).forEach(item => {
        isEmpty(one[item]);
      });
    } else if(one === '') {
      emptyFlag++;
    }
  })(one);
  return emptyFlag;
};
