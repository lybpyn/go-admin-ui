import request from '@/utils/request'

// 查询OrdGiftcardCategory列表
export function listOrdGiftcardCategory(query) {
  return request({
    url: '/api/v1/ord-giftcard-category',
    method: 'get',
    params: query
  })
}

// 查询OrdGiftcardCategory详细
export function getOrdGiftcardCategory(id) {
  return request({
    url: '/api/v1/ord-giftcard-category/' + id,
    method: 'get'
  })
}

// 新增OrdGiftcardCategory
export function addOrdGiftcardCategory(data) {
  return request({
    url: '/api/v1/ord-giftcard-category',
    method: 'post',
    data: data
  })
}

// 修改OrdGiftcardCategory
export function updateOrdGiftcardCategory(data) {
  return request({
    url: '/api/v1/ord-giftcard-category/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdGiftcardCategory
export function delOrdGiftcardCategory(data) {
  return request({
    url: '/api/v1/ord-giftcard-category',
    method: 'delete',
    data: data
  })
}

