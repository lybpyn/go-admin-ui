import request from '@/utils/request'

// 查询HsMerchants列表
export function listHsMerchants(query) {
  return request({
    url: '/api/v1/hs-merchants',
    method: 'get',
    params: query
  })
}

// 查询HsMerchants详细
export function getHsMerchants(id) {
  return request({
    url: '/api/v1/hs-merchants/' + id,
    method: 'get'
  })
}

// 新增HsMerchants
export function addHsMerchants(data) {
  return request({
    url: '/api/v1/hs-merchants',
    method: 'post',
    data: data
  })
}

// 修改HsMerchants
export function updateHsMerchants(data) {
  return request({
    url: '/api/v1/hs-merchants/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsMerchants
export function delHsMerchants(data) {
  return request({
    url: '/api/v1/hs-merchants',
    method: 'delete',
    data: data
  })
}

