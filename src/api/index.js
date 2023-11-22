// 将所有模块中的API统一暴露出去

// 先引入模块
import * as tradeMark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'

// 对外暴露出去
export default {
  tradeMark,
  attr,
  sku,
  spu
}
