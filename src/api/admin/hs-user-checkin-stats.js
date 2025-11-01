import request from '@/utils/request'

// 查询HsUserCheckinStats列表
export function listHsUserCheckinStats(query) {
  return request({
    url: '/api/v1/hs-user-checkin-stats',
    method: 'get',
    params: query
  })
}

// 查询HsUserCheckinStats详细
export function getHsUserCheckinStats(id) {
  return request({
    url: '/api/v1/hs-user-checkin-stats/' + id,
    method: 'get'
  })
}

// 新增HsUserCheckinStats
export function addHsUserCheckinStats(data) {
  return request({
    url: '/api/v1/hs-user-checkin-stats',
    method: 'post',
    data: data
  })
}

// 修改HsUserCheckinStats
export function updateHsUserCheckinStats(data) {
  return request({
    url: '/api/v1/hs-user-checkin-stats/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserCheckinStats
export function delHsUserCheckinStats(data) {
  return request({
    url: '/api/v1/hs-user-checkin-stats',
    method: 'delete',
    data: data
  })
}

