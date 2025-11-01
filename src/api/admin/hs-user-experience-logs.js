import request from '@/utils/request'

// 查询HsUserExperienceLogs列表
export function listHsUserExperienceLogs(query) {
  return request({
    url: '/api/v1/hs-user-experience-logs',
    method: 'get',
    params: query
  })
}

// 查询HsUserExperienceLogs详细
export function getHsUserExperienceLogs(id) {
  return request({
    url: '/api/v1/hs-user-experience-logs/' + id,
    method: 'get'
  })
}

// 新增HsUserExperienceLogs
export function addHsUserExperienceLogs(data) {
  return request({
    url: '/api/v1/hs-user-experience-logs',
    method: 'post',
    data: data
  })
}

// 修改HsUserExperienceLogs
export function updateHsUserExperienceLogs(data) {
  return request({
    url: '/api/v1/hs-user-experience-logs/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserExperienceLogs
export function delHsUserExperienceLogs(data) {
  return request({
    url: '/api/v1/hs-user-experience-logs',
    method: 'delete',
    data: data
  })
}

