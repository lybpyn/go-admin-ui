import request from '@/utils/request'

// 查询OrdGiftCardSuppliers列表
export function listOrdGiftCardSuppliers(query) {
  return request({
    url: '/api/v1/ord-gift-card-suppliers',
    method: 'get',
    params: query
  })
}

// 查询OrdGiftCardSuppliers详细
export function getOrdGiftCardSuppliers(id) {
  return request({
    url: '/api/v1/ord-gift-card-suppliers/' + id,
    method: 'get'
  })
}

// 新增OrdGiftCardSuppliers
export function addOrdGiftCardSuppliers(data) {
  return request({
    url: '/api/v1/ord-gift-card-suppliers',
    method: 'post',
    data: data
  })
}

// 修改OrdGiftCardSuppliers
export function updateOrdGiftCardSuppliers(data) {
  return request({
    url: '/api/v1/ord-gift-card-suppliers/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdGiftCardSuppliers
export function delOrdGiftCardSuppliers(data) {
  return request({
    url: '/api/v1/ord-gift-card-suppliers',
    method: 'delete',
    data: data
  })
}

