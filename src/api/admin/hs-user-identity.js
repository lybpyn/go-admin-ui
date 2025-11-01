import request from '@/utils/request'

// 查询HsUserIdentity列表
export function listHsUserIdentity(query) {
  return request({
    url: '/api/v1/hs-user-identity',
    method: 'get',
    params: query
  })
}

// 查询HsUserIdentity详细
export function getHsUserIdentity(id) {
  return request({
    url: '/api/v1/hs-user-identity/' + id,
    method: 'get'
  })
}

// 新增HsUserIdentity
export function addHsUserIdentity(data) {
  return request({
    url: '/api/v1/hs-user-identity',
    method: 'post',
    data: data
  })
}

// 修改HsUserIdentity
export function updateHsUserIdentity(data) {
  return request({
    url: '/api/v1/hs-user-identity/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserIdentity
export function delHsUserIdentity(data) {
  return request({
    url: '/api/v1/hs-user-identity',
    method: 'delete',
    data: data
  })
}

