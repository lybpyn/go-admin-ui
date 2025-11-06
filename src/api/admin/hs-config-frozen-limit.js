import request from '@/utils/request'

// 查询HsConfigFrozenLimit列表
export function listHsConfigFrozenLimit(query) {
  return request({
    url: '/api/v1/hs-config-frozen-limit',
    method: 'get',
    params: query
  })
}

// 查询HsConfigFrozenLimit详细
export function getHsConfigFrozenLimit(id) {
  return request({
    url: '/api/v1/hs-config-frozen-limit/' + id,
    method: 'get'
  })
}

// 新增HsConfigFrozenLimit
export function addHsConfigFrozenLimit(data) {
  return request({
    url: '/api/v1/hs-config-frozen-limit',
    method: 'post',
    data: data
  })
}

// 修改HsConfigFrozenLimit
export function updateHsConfigFrozenLimit(data) {
  return request({
    url: '/api/v1/hs-config-frozen-limit/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigFrozenLimit
export function delHsConfigFrozenLimit(data) {
  return request({
    url: '/api/v1/hs-config-frozen-limit',
    method: 'delete',
    data: data
  })
}

