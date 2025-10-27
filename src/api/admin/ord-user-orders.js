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

