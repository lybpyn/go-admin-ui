import request from '@/utils/request'

// 查询OrdGiftcardRegion列表
export function listOrdGiftcardRegion(query) {
  return request({
    url: '/api/v1/ord-giftcard-region',
    method: 'get',
    params: query
  })
}

// 查询OrdGiftcardRegion详细
export function getOrdGiftcardRegion(id) {
  return request({
    url: '/api/v1/ord-giftcard-region/' + id,
    method: 'get'
  })
}

// 新增OrdGiftcardRegion
export function addOrdGiftcardRegion(data) {
  return request({
    url: '/api/v1/ord-giftcard-region',
    method: 'post',
    data: data
  })
}

// 修改OrdGiftcardRegion
export function updateOrdGiftcardRegion(data) {
  return request({
    url: '/api/v1/ord-giftcard-region/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdGiftcardRegion
export function delOrdGiftcardRegion(data) {
  return request({
    url: '/api/v1/ord-giftcard-region',
    method: 'delete',
    data: data
  })
}

