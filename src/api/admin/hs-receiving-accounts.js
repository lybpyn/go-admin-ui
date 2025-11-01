import request from '@/utils/request'

// 查询HsReceivingAccounts列表
export function listHsReceivingAccounts(query) {
  return request({
    url: '/api/v1/hs-receiving-accounts',
    method: 'get',
    params: query
  })
}

// 查询HsReceivingAccounts详细
export function getHsReceivingAccounts(id) {
  return request({
    url: '/api/v1/hs-receiving-accounts/' + id,
    method: 'get'
  })
}

// 新增HsReceivingAccounts
export function addHsReceivingAccounts(data) {
  return request({
    url: '/api/v1/hs-receiving-accounts',
    method: 'post',
    data: data
  })
}

// 修改HsReceivingAccounts
export function updateHsReceivingAccounts(data) {
  return request({
    url: '/api/v1/hs-receiving-accounts/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsReceivingAccounts
export function delHsReceivingAccounts(data) {
  return request({
    url: '/api/v1/hs-receiving-accounts',
    method: 'delete',
    data: data
  })
}

