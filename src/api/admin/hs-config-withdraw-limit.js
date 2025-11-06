import request from '@/utils/request'

// 查询HsConfigWithdrawLimit列表
export function listHsConfigWithdrawLimit(query) {
  return request({
    url: '/api/v1/hs-config-withdraw-limit',
    method: 'get',
    params: query
  })
}

// 查询HsConfigWithdrawLimit详细
export function getHsConfigWithdrawLimit(id) {
  return request({
    url: '/api/v1/hs-config-withdraw-limit/' + id,
    method: 'get'
  })
}

// 新增HsConfigWithdrawLimit
export function addHsConfigWithdrawLimit(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-limit',
    method: 'post',
    data: data
  })
}

// 修改HsConfigWithdrawLimit
export function updateHsConfigWithdrawLimit(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-limit/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigWithdrawLimit
export function delHsConfigWithdrawLimit(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-limit',
    method: 'delete',
    data: data
  })
}

