import request from '@/utils/request'

// 查询HsUserBankCards列表
export function listHsUserBankCards(query) {
  return request({
    url: '/api/v1/hs-user-bank-cards',
    method: 'get',
    params: query
  })
}

// 查询HsUserBankCards详细
export function getHsUserBankCards(id) {
  return request({
    url: '/api/v1/hs-user-bank-cards/' + id,
    method: 'get'
  })
}

// 新增HsUserBankCards
export function addHsUserBankCards(data) {
  return request({
    url: '/api/v1/hs-user-bank-cards',
    method: 'post',
    data: data
  })
}

// 修改HsUserBankCards
export function updateHsUserBankCards(data) {
  return request({
    url: '/api/v1/hs-user-bank-cards/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserBankCards
export function delHsUserBankCards(data) {
  return request({
    url: '/api/v1/hs-user-bank-cards',
    method: 'delete',
    data: data
  })
}

