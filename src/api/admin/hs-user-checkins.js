import request from '@/utils/request'

// 查询HsUserCheckins列表
export function listHsUserCheckins(query) {
  return request({
    url: '/api/v1/hs-user-checkins',
    method: 'get',
    params: query
  })
}

// 查询HsUserCheckins详细
export function getHsUserCheckins(id) {
  return request({
    url: '/api/v1/hs-user-checkins/' + id,
    method: 'get'
  })
}

// 新增HsUserCheckins
export function addHsUserCheckins(data) {
  return request({
    url: '/api/v1/hs-user-checkins',
    method: 'post',
    data: data
  })
}

// 修改HsUserCheckins
export function updateHsUserCheckins(data) {
  return request({
    url: '/api/v1/hs-user-checkins/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserCheckins
export function delHsUserCheckins(data) {
  return request({
    url: '/api/v1/hs-user-checkins',
    method: 'delete',
    data: data
  })
}

