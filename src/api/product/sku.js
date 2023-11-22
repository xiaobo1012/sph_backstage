import request from '@/utils/request'

/**
 * 根据分页器去后端获取数据
 * GET /admin/product/list/{page}/{limit}
 */
export function reqSkuData(page, limit) {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}

/**
 * 上架sku产品
 * GET /admin/product/onSale/{skuId}
 */
export function onSale(skuId) {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}

/**
 * 下架sku产品
 * GET /admin/product/cancelSale/{skuId}
 */
export function cancelSale(skuId) {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}

/**
 * 获取sku的详情页
 * GET /admin/product/getSkuById/{skuId}
 */
export function skuDetail(skuId) {
  return request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'GET'
  })
}

/**
 * 删除数据接口
 * DELETE /admin/product/deleteSku/{skuId}
 */
export function deleteSku(skuId) {
  return request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  })
}
