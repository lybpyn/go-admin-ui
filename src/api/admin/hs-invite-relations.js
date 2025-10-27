import request from '@/utils/request'

// 查询HsInviteRelations列表
export function listHsInviteRelations(query) {
  return request({
    url: '/api/v1/hs-invite-relations',
    method: 'get',
    params: query
  })
}

// 查询HsInviteRelations详细
export function getHsInviteRelations(userId) {
  return request({
    url: '/api/v1/hs-invite-relations/' + userId,
    method: 'get'
  })
}

// 新增HsInviteRelations
export function addHsInviteRelations(data) {
  return request({
    url: '/api/v1/hs-invite-relations',
    method: 'post',
    data: data
  })
}

// 修改HsInviteRelations
export function updateHsInviteRelations(data) {
  return request({
    url: '/api/v1/hs-invite-relations/' + data.userId,
    method: 'put',
    data: data
  })
}

// 删除HsInviteRelations
export function delHsInviteRelations(data) {
  return request({
    url: '/api/v1/hs-invite-relations',
    method: 'delete',
    data: data
  })
}

