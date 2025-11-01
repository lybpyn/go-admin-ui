import request from '@/utils/request'

// 查询HsUsers列表
export function listHsUsers(query) {
  return request({
    url: '/api/v1/hs-users',
    method: 'get',
    params: query
  })
}

// 查询HsUsers详细
export function getHsUsers(id) {
  return request({
    url: '/api/v1/hs-users/' + id,
    method: 'get'
  })
}

// 新增HsUsers
export function addHsUsers(data) {
  return request({
    url: '/api/v1/hs-users',
    method: 'post',
    data: data
  })
}

// 修改HsUsers
export function updateHsUsers(data) {
  return request({
    url: '/api/v1/hs-users/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUsers
export function delHsUsers(data) {
  return request({
    url: '/api/v1/hs-users',
    method: 'delete',
    data: data
  })
}

