import request from '@/utils/request'

// 查询HsConfigWithdrawFee列表
export function listHsConfigWithdrawFee(query) {
  return request({
    url: '/api/v1/hs-config-withdraw-fee',
    method: 'get',
    params: query
  })
}

// 查询HsConfigWithdrawFee详细
export function getHsConfigWithdrawFee(id) {
  return request({
    url: '/api/v1/hs-config-withdraw-fee/' + id,
    method: 'get'
  })
}

// 新增HsConfigWithdrawFee
export function addHsConfigWithdrawFee(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-fee',
    method: 'post',
    data: data
  })
}

// 修改HsConfigWithdrawFee
export function updateHsConfigWithdrawFee(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-fee/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsConfigWithdrawFee
export function delHsConfigWithdrawFee(data) {
  return request({
    url: '/api/v1/hs-config-withdraw-fee',
    method: 'delete',
    data: data
  })
}

