import request from '@/utils/request'

// 查询OrdGiftcardDiscounts列表
export function listOrdGiftcardDiscounts(query) {
  return request({
    url: '/api/v1/ord-giftcard-discounts',
    method: 'get',
    params: query
  })
}

// 查询OrdGiftcardDiscounts详细
export function getOrdGiftcardDiscounts(id) {
  return request({
    url: '/api/v1/ord-giftcard-discounts/' + id,
    method: 'get'
  })
}

// 新增OrdGiftcardDiscounts
export function addOrdGiftcardDiscounts(data) {
  return request({
    url: '/api/v1/ord-giftcard-discounts',
    method: 'post',
    data: data
  })
}

// 修改OrdGiftcardDiscounts
export function updateOrdGiftcardDiscounts(data) {
  return request({
    url: '/api/v1/ord-giftcard-discounts/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdGiftcardDiscounts
export function delOrdGiftcardDiscounts(data) {
  return request({
    url: '/api/v1/ord-giftcard-discounts',
    method: 'delete',
    data: data
  })
}

// 批量新增OrdGiftcardDiscounts
export function batchInsertOrdGiftcardDiscounts(data) {
  return request({
    url: '/api/v1/ord-giftcard-discounts/batch-insert',
    method: 'post',
    data: data
  })
}

// 批量修改OrdGiftcardDiscounts
export function batchUpdateOrdGiftcardDiscounts(data) {
  return request({
    url: '/api/v1/ord-giftcard-discounts/batch-update',
    method: 'put',
    data: data
  })
}
