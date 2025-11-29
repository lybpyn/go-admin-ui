import request from '@/utils/request'

// 查询OrdConfigGiftcardRegion列表
export function listOrdConfigGiftcardRegion(query) {
  return request({
    url: '/api/v1/ord-config-giftcard-region',
    method: 'get',
    params: query
  })
}

// 查询OrdConfigGiftcardRegion详细
export function getOrdConfigGiftcardRegion(id) {
  return request({
    url: '/api/v1/ord-config-giftcard-region/' + id,
    method: 'get'
  })
}

// 新增OrdConfigGiftcardRegion
export function addOrdConfigGiftcardRegion(data) {
  return request({
    url: '/api/v1/ord-config-giftcard-region',
    method: 'post',
    data: data
  })
}

// 修改OrdConfigGiftcardRegion
export function updateOrdConfigGiftcardRegion(data) {
  return request({
    url: '/api/v1/ord-config-giftcard-region/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdConfigGiftcardRegion
export function delOrdConfigGiftcardRegion(data) {
  return request({
    url: '/api/v1/ord-config-giftcard-region',
    method: 'delete',
    data: data
  })
}

