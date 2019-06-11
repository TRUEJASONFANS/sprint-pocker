// 测试一个function, 文件名必须以*.test.(j|t)s 结尾
const sum = function (a, b) {
    return a + b;
  };
  
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
