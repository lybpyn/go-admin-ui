import request from '@/utils/request'

// 查询OrdGiftcard列表
export function listOrdGiftcard(query) {
  return request({
    url: '/api/v1/ord-giftcard',
    method: 'get',
    params: query
  })
}

// 查询OrdGiftcard详细
export function getOrdGiftcard(id) {
  return request({
    url: '/api/v1/ord-giftcard/' + id,
    method: 'get'
  })
}

// 新增OrdGiftcard
export function addOrdGiftcard(data) {
  return request({
    url: '/api/v1/ord-giftcard',
    method: 'post',
    data: data
  })
}

// 修改OrdGiftcard
export function updateOrdGiftcard(data) {
  return request({
    url: '/api/v1/ord-giftcard/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdGiftcard
export function delOrdGiftcard(data) {
  return request({
    url: '/api/v1/ord-giftcard',
    method: 'delete',
    data: data
  })
}

// 批量设置OrdGiftcard
export function batchSetOrdGiftcard(data) {
  return request({
    url: '/api/v1/ord-giftcard/batch-set',
    method: 'post',
    data: data
  })
}
