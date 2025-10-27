import request from '@/utils/request'

// 查询OrdGiftcardWriteoffs列表
export function listOrdGiftcardWriteoffs(query) {
  return request({
    url: '/api/v1/ord-giftcard-writeoffs',
    method: 'get',
    params: query
  })
}

// 查询OrdGiftcardWriteoffs详细
export function getOrdGiftcardWriteoffs(id) {
  return request({
    url: '/api/v1/ord-giftcard-writeoffs/' + id,
    method: 'get'
  })
}

// 新增OrdGiftcardWriteoffs
export function addOrdGiftcardWriteoffs(data) {
  return request({
    url: '/api/v1/ord-giftcard-writeoffs',
    method: 'post',
    data: data
  })
}

// 修改OrdGiftcardWriteoffs
export function updateOrdGiftcardWriteoffs(data) {
  return request({
    url: '/api/v1/ord-giftcard-writeoffs/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdGiftcardWriteoffs
export function delOrdGiftcardWriteoffs(data) {
  return request({
    url: '/api/v1/ord-giftcard-writeoffs',
    method: 'delete',
    data: data
  })
}

