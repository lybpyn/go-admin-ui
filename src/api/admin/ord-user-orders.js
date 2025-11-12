import request from '@/utils/request'

// 查询OrdUserOrders列表
export function listOrdUserOrders(query) {
  return request({
    url: '/api/v1/ord-user-orders',
    method: 'get',
    params: query
  })
}

// 查询OrdUserOrders详细
export function getOrdUserOrders(id) {
  return request({
    url: '/api/v1/ord-user-orders/' + id,
    method: 'get'
  })
}

// 新增OrdUserOrders
export function addOrdUserOrders(data) {
  return request({
    url: '/api/v1/ord-user-orders',
    method: 'post',
    data: data
  })
}

// 修改OrdUserOrders
export function updateOrdUserOrders(data) {
  return request({
    url: '/api/v1/ord-user-orders/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdUserOrders
export function delOrdUserOrders(data) {
  return request({
    url: '/api/v1/ord-user-orders',
    method: 'delete',
    data: data
  })
}

// 查询我的订单
export function listMyAssignedOrdUserOrders(query) {
  return request({
    url: '/api/v1/ord-user-orders/my-assigned',
    method: 'get',
    params: query
  })
}

// 接受订单
export function acceptOrdUserOrders(id) {
  return request({
    url: '/api/v1/ord-user-orders/' + id + '/accept',
    method: 'post'
  })
}

// 获取订单详情
export function getOrdUserOrdersDetail(id) {
  return request({
    url: '/api/v1/ord-user-orders/' + id,
    method: 'get'
  })
}

// 批量核销订单
export function batchWriteOffOrdUserOrders(data) {
  return request({
    url: '/api/v1/ord-giftcard-writeoffs/batch',
    method: 'post',
    data: data
  })
}

// 获取订单图片
export function getOrdOrderGiftcardImages(query) {
  return request({
    url: '/api/v1/ord-order-giftcard-images',
    method: 'get',
    params: query
  })
}

// 获取供应商列表
export function listOrdGiftCardSuppliers(query) {
  return request({
    url: '/api/v1/ord-gift-card-suppliers',
    method: 'get',
    params: query
  })
}

// 取消接单
// 取消接单
export function cancelAcceptOrdUserOrders(data) {
  return request({
    url: '/api/v1/ord-user-orders/' + data.id + '/cancel-accept',
    method: 'post',
    data: data
  })
}
