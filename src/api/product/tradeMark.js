import request from '@/utils/request'

/**
 * 获取品牌的分页列表
 * /admin/product/baseTrademark/{page}/{limit}
 * get
 */
export function reqTradeMarkPage(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

/**
 * 新增品牌
 * /admin/product/baseTrademark/save
 * post
 * 参数：品牌名称，品牌logo
 *
 * 修改品牌
 * /admin/product/baseTrademark/update
 * put
 * 参数：id 品牌名称 品牌LOGO
 */
export function addOrUpdateTradeMark(tradeMark) {
  if (tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark
    })
  }
}

/**
 * 删除选中的品牌
 * /admin/product/baseTrademark/remove/{id}
 * delete
 */
export function deleteTradeMark(id) {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 获取品牌列表
 * /admin/product/baseTrademark/getTrademarkList
 */
export function TrademarkList() {
  return request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}

/**
 *
 * /admin/product/baseTrademark/get/{id}
 * get
 */
export function baseTrademark(id) {
  return request({
    url: `/admin/product/baseTrademark/get/${id}`,
    method: 'get'
  })
}

