import request from '@/utils/request'

// 查询HsUserLedger列表
export function listHsUserLedger(query) {
  return request({
    url: '/api/v1/hs-user-ledger',
    method: 'get',
    params: query
  })
}

// 查询HsUserLedger详细
export function getHsUserLedger(id) {
  return request({
    url: '/api/v1/hs-user-ledger/' + id,
    method: 'get'
  })
}

// 新增HsUserLedger
export function addHsUserLedger(data) {
  return request({
    url: '/api/v1/hs-user-ledger',
    method: 'post',
    data: data
  })
}

// 修改HsUserLedger
export function updateHsUserLedger(data) {
  return request({
    url: '/api/v1/hs-user-ledger/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserLedger
export function delHsUserLedger(data) {
  return request({
    url: '/api/v1/hs-user-ledger',
    method: 'delete',
    data: data
  })
}

