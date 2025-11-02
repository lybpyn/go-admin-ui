import request from '@/utils/request'

// 查询OrdOrderGiftcardImages列表
export function listOrdOrderGiftcardImages(query) {
  return request({
    url: '/api/v1/ord-order-giftcard-images',
    method: 'get',
    params: query
  })
}

// 查询OrdOrderGiftcardImages详细
export function getOrdOrderGiftcardImages(id) {
  return request({
    url: '/api/v1/ord-order-giftcard-images/' + id,
    method: 'get'
  })
}

// 新增OrdOrderGiftcardImages
export function addOrdOrderGiftcardImages(data) {
  return request({
    url: '/api/v1/ord-order-giftcard-images',
    method: 'post',
    data: data
  })
}

// 修改OrdOrderGiftcardImages
export function updateOrdOrderGiftcardImages(data) {
  return request({
    url: '/api/v1/ord-order-giftcard-images/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdOrderGiftcardImages
export function delOrdOrderGiftcardImages(data) {
  return request({
    url: '/api/v1/ord-order-giftcard-images',
    method: 'delete',
    data: data
  })
}

