import request from '@/utils/request'

// 查询HsInviteCommissions列表
export function listHsInviteCommissions(query) {
  return request({
    url: '/api/v1/hs-invite-commissions',
    method: 'get',
    params: query
  })
}

// 查询HsInviteCommissions详细
export function getHsInviteCommissions(id) {
  return request({
    url: '/api/v1/hs-invite-commissions/' + id,
    method: 'get'
  })
}

// 新增HsInviteCommissions
export function addHsInviteCommissions(data) {
  return request({
    url: '/api/v1/hs-invite-commissions',
    method: 'post',
    data: data
  })
}

// 修改HsInviteCommissions
export function updateHsInviteCommissions(data) {
  return request({
    url: '/api/v1/hs-invite-commissions/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsInviteCommissions
export function delHsInviteCommissions(data) {
  return request({
    url: '/api/v1/hs-invite-commissions',
    method: 'delete',
    data: data
  })
}

