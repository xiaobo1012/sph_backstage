/**
 * @author xiaobo1012
 * @Description:  首页模拟数据
 * @date 2023/11/14 17:22:52
 */
const data = require('./data.json')
module.exports = [
  {
    url: '/home/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data
       }
    }
  }
]
