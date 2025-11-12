import request from '@/utils/request'

// 查询HsConfigWithdrawRules列表
export function listHsConfigWithdrawRules(query) {
  return request({
    url: '/api/v1/hs-config-withdraw-rules',
    method: 'get',
    params: query
  })
}

// 查询HsConfigWithdrawRules详细
export function getHsConfigWithdrawRules(id) {
  return request({
    url: '/api/v1/hs-config-withdraw-rules/' + id,
    method: 'get'
  })
}

// 新增HsConfigWithdrawRules
export function addHsConfigWithdrawRules(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-rules',
    method: 'post',
    data: data
  })
}

// 修改HsConfigWithdrawRules
export function updateHsConfigWithdrawRules(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-rules/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigWithdrawRules
export function delHsConfigWithdrawRules(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-rules',
    method: 'delete',
    data: data
  })
}

