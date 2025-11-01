import request from '@/utils/request'

// 查询HsUserWithdrawAddresses列表
export function listHsUserWithdrawAddresses(query) {
  return request({
    url: '/api/v1/hs-user-withdraw-addresses',
    method: 'get',
    params: query
  })
}

// 查询HsUserWithdrawAddresses详细
export function getHsUserWithdrawAddresses(id) {
  return request({
    url: '/api/v1/hs-user-withdraw-addresses/' + id,
    method: 'get'
  })
}

// 新增HsUserWithdrawAddresses
export function addHsUserWithdrawAddresses(data) {
  return request({
    url: '/api/v1/hs-user-withdraw-addresses',
    method: 'post',
    data: data
  })
}

// 修改HsUserWithdrawAddresses
export function updateHsUserWithdrawAddresses(data) {
  return request({
    url: '/api/v1/hs-user-withdraw-addresses/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserWithdrawAddresses
export function delHsUserWithdrawAddresses(data) {
  return request({
    url: '/api/v1/hs-user-withdraw-addresses',
    method: 'delete',
    data: data
  })
}

