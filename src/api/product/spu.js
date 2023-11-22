import request from '@/utils/request'

/**
 * 获取
 * GET /admin/product/{page}/{limit}
 */
export function getSpuValueList(page, limit, category3Id) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {
      category3Id
    }
  })
}

/**
 * 获取spu基本信息
 * GET /admin/product/getSpuById/{spuId}
 */
export function getSpu(spuId) {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

/**
 * 获取品牌信息
 * GET /admin/product/baseTrademark/getTrademarkList
 */
export function getTrademarkList() {
  return request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}

/**
 * 获取SPU图片的接口
 * GET /admin/product/spuImageList/{spuId}
 */
export function getSpuImageList(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

/**
 * 获取平台全部的销售属性
 * GET /admin/product/baseSaleAttrList
 */
export function getBaseSaleAttrList() {
  return request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}

/**
 * 添加spu|修改spu
 * POST /admin/product/saveSpuInfo
 * POST /admin/product/updateSpuInfo
 */
export function reqAddOrUpdateSpu(spuInfo) {
  // 如果携带的参数里面有id——————修改spu
  if (spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo
    })
  } else {
    // 没有id则说明是增加spu
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo
    })
  }
}

/**
 * 删除spu
 * DELETE /admin/product/deleteSpu/{spuId}
 */
export function deleteSpu(spuId) {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}

/*****************************  添加skuform *************************************************************/
/**
 * 获取skuForm中的图片
 * GET /admin/product/spuImageList/{spuId}
 */
export function reqSpuImageList(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

/**
 * 获取skuForm中的销售属性列表
 * GET /admin/product/spuSaleAttrList/{spuId}
 */
export function reqSpuSaleAttrList(spuId) {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

/**
 * skuForm获取平台属性的列表
 * GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
 */
export function reqAttrInfoList(category1Id, category2Id, category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

/**
 * 保存SKU的数据
 * POST /admin/product/saveSkuInfo
 */

export function saveSkuInfo(skuInfo) {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
  })
}

/**
 * 获取SKU列表的数据
 * GET /admin/product/findBySpuId/{spuId}
 */
export function reqSkuList(spuId) {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
