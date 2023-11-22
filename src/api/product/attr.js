// 平台属性管理模块API请求

import request from '@/utils/request'

/**
 * 获取一级分类数据
 * GET /admin/product/getCategory1
 */
export function getCategory1() {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}

/**
 * 根据一级分类id获取二级分类数据
 * GET /admin/product/getCategory2/{category1Id}
 */
export function getCategory2(category1Id) {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}

/**
 * 根据二级分类id获取三级分类数据
 * GET /admin/product/getCategory3/{category2Id}
 */
export function getCategory3(category2Id) {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}

/**
 * 根据三级分类的id去获取对应的商品基础属性
 * GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
 */
export function getAttrInfo({ id1: category1Id, id2: category2Id, id3: category3Id }) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

/**
 * 添加属性和属性值的接口
 * POST /admin/product/saveAttrInfo
 *
 * {
 *   "attrName": "string", // 属性名
 *   "attrValueList": [     // 属性值数组
 *     {
 *       "attrId": 0,     // 属性的id
 *       "valueName": "string"    // 属性值
 *     }
 *   ],
 *   "categoryId": 0,   // id3
 *   "categoryLevel": 3,
 * }
 */
export function reqAddOrUpdateAttr(data) {
  return request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}

/**
 * 删除商品属性（一行）
 * DELETE /admin/product/deleteAttr/{attrId}
 */
export function deleteAttr(attrId) {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}
