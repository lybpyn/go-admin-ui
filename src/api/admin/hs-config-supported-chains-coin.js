import request from '@/utils/request'

// 查询HsConfigSupportedChainsCoin列表
export function listHsConfigSupportedChainsCoin(query) {
  return request({
    url: '/api/v1/hs-config-supported-chains-coin',
    method: 'get',
    params: query
  })
}

// 查询HsConfigSupportedChainsCoin详细
export function getHsConfigSupportedChainsCoin(id) {
  return request({
    url: '/api/v1/hs-config-supported-chains-coin/' + id,
    method: 'get'
  })
}

// 新增HsConfigSupportedChainsCoin
export function addHsConfigSupportedChainsCoin(data) {
  return request({
    url: '/api/v1/hs-config-supported-chains-coin',
    method: 'post',
    data: data
  })
}

// 修改HsConfigSupportedChainsCoin
export function updateHsConfigSupportedChainsCoin(data) {
  return request({
    url: '/api/v1/hs-config-supported-chains-coin/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigSupportedChainsCoin
export function delHsConfigSupportedChainsCoin(data) {
  return request({
    url: '/api/v1/hs-config-supported-chains-coin',
    method: 'delete',
    data: data
  })
}

