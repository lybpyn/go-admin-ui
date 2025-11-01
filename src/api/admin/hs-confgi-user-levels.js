import request from '@/utils/request'

// 查询HsConfgiUserLevels列表
export function listHsConfgiUserLevels(query) {
  return request({
    url: '/api/v1/hs-confgi-user-levels',
    method: 'get',
    params: query
  })
}

// 查询HsConfgiUserLevels详细
export function getHsConfgiUserLevels(id) {
  return request({
    url: '/api/v1/hs-confgi-user-levels/' + id,
    method: 'get'
  })
}

// 新增HsConfgiUserLevels
export function addHsConfgiUserLevels(data) {
  return request({
    url: '/api/v1/hs-confgi-user-levels',
    method: 'post',
    data: data
  })
}

// 修改HsConfgiUserLevels
export function updateHsConfgiUserLevels(data) {
  return request({
    url: '/api/v1/hs-confgi-user-levels/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfgiUserLevels
export function delHsConfgiUserLevels(data) {
  return request({
    url: '/api/v1/hs-confgi-user-levels',
    method: 'delete',
    data: data
  })
}

