import request from '@/utils/request'

// 查询HsConfigCheckinRewards列表
export function listHsConfigCheckinRewards(query) {
  return request({
    url: '/api/v1/hs-config-checkin-rewards',
    method: 'get',
    params: query
  })
}

// 查询HsConfigCheckinRewards详细
export function getHsConfigCheckinRewards(id) {
  return request({
    url: '/api/v1/hs-config-checkin-rewards/' + id,
    method: 'get'
  })
}

// 新增HsConfigCheckinRewards
export function addHsConfigCheckinRewards(data) {
  return request({
    url: '/api/v1/hs-config-checkin-rewards',
    method: 'post',
    data: data
  })
}

// 修改HsConfigCheckinRewards
export function updateHsConfigCheckinRewards(data) {
  return request({
    url: '/api/v1/hs-config-checkin-rewards/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigCheckinRewards
export function delHsConfigCheckinRewards(data) {
  return request({
    url: '/api/v1/hs-config-checkin-rewards',
    method: 'delete',
    data: data
  })
}

