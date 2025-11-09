import request from '@/utils/request'

// 查询HsConfigInviteCommission列表
export function listHsConfigInviteCommission(query) {
  return request({
    url: '/api/v1/hs-config-invite-commission',
    method: 'get',
    params: query
  })
}

// 查询HsConfigInviteCommission详细
export function getHsConfigInviteCommission(id) {
  return request({
    url: '/api/v1/hs-config-invite-commission/' + id,
    method: 'get'
  })
}

// 新增HsConfigInviteCommission
export function addHsConfigInviteCommission(data) {
  return request({
    url: '/api/v1/hs-config-invite-commission',
    method: 'post',
    data: data
  })
}

// 修改HsConfigInviteCommission
export function updateHsConfigInviteCommission(data) {
  return request({
    url: '/api/v1/hs-config-invite-commission/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigInviteCommission
export function delHsConfigInviteCommission(data) {
  return request({
    url: '/api/v1/hs-config-invite-commission',
    method: 'delete',
    data: data
  })
}

