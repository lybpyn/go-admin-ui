import request from '@/utils/request'

// 查询HsUserWithdrawal列表
export function listHsUserWithdrawal(query) {
  return request({
    url: '/api/v1/hs-user-withdrawal',
    method: 'get',
    params: query
  })
}

// 查询HsUserWithdrawal详细
export function getHsUserWithdrawal(id) {
  return request({
    url: '/api/v1/hs-user-withdrawal/' + id,
    method: 'get'
  })
}

// 新增HsUserWithdrawal
export function addHsUserWithdrawal(data) {
  return request({
    url: '/api/v1/hs-user-withdrawal',
    method: 'post',
    data: data
  })
}

// 修改HsUserWithdrawal
export function updateHsUserWithdrawal(data) {
  return request({
    url: '/api/v1/hs-user-withdrawal/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserWithdrawal
export function delHsUserWithdrawal(data) {
  return request({
    url: '/api/v1/hs-user-withdrawal',
    method: 'delete',
    data: data
  })
}

// 审批HsUserWithdrawal
export function approveHsUserWithdrawal(data) {
  return request({
    url: '/api/v1/hs-user-withdrawal/' + data.id + '/approve',
    method: 'post',
    data: data
  })
}

