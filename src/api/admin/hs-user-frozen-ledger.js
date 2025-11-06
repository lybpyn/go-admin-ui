import request from '@/utils/request'

// 查询HsUserFrozenLedger列表
export function listHsUserFrozenLedger(query) {
  return request({
    url: '/api/v1/hs-user-frozen-ledger',
    method: 'get',
    params: query
  })
}

// 查询HsUserFrozenLedger详细
export function getHsUserFrozenLedger(id) {
  return request({
    url: '/api/v1/hs-user-frozen-ledger/' + id,
    method: 'get'
  })
}

// 新增HsUserFrozenLedger
export function addHsUserFrozenLedger(data) {
  return request({
    url: '/api/v1/hs-user-frozen-ledger',
    method: 'post',
    data: data
  })
}

// 修改HsUserFrozenLedger
export function updateHsUserFrozenLedger(data) {
  return request({
    url: '/api/v1/hs-user-frozen-ledger/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserFrozenLedger
export function delHsUserFrozenLedger(data) {
  return request({
    url: '/api/v1/hs-user-frozen-ledger',
    method: 'delete',
    data: data
  })
}

