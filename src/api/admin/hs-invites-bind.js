import request from '@/utils/request'

// 查询HsInvitesBind列表
export function listHsInvitesBind(query) {
  return request({
    url: '/api/v1/hs-invites-bind',
    method: 'get',
    params: query
  })
}

// 查询HsInvitesBind详细
export function getHsInvitesBind(id) {
  return request({
    url: '/api/v1/hs-invites-bind/' + id,
    method: 'get'
  })
}

// 新增HsInvitesBind
export function addHsInvitesBind(data) {
  return request({
    url: '/api/v1/hs-invites-bind',
    method: 'post',
    data: data
  })
}

// 修改HsInvitesBind
export function updateHsInvitesBind(data) {
  return request({
    url: '/api/v1/hs-invites-bind/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsInvitesBind
export function delHsInvitesBind(data) {
  return request({
    url: '/api/v1/hs-invites-bind',
    method: 'delete',
    data: data
  })
}

