import request from '@/utils/request'

// 查询HsConfigRegions列表
export function listHsConfigRegions(query) {
  return request({
    url: '/api/v1/hs-config-regions',
    method: 'get',
    params: query
  })
}

// 查询HsConfigRegions详细
export function getHsConfigRegions(id) {
  return request({
    url: '/api/v1/hs-config-regions/' + id,
    method: 'get'
  })
}

// 新增HsConfigRegions
export function addHsConfigRegions(data) {
  return request({
    url: '/api/v1/hs-config-regions',
    method: 'post',
    data: data
  })
}

// 修改HsConfigRegions
export function updateHsConfigRegions(data) {
  return request({
    url: '/api/v1/hs-config-regions/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigRegions
export function delHsConfigRegions(data) {
  return request({
    url: '/api/v1/hs-config-regions',
    method: 'delete',
    data: data
  })
}

