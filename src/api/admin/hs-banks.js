import request from '@/utils/request'

// 查询HsBanks列表
export function listHsBanks(query) {
  return request({
    url: '/api/v1/hs-banks',
    method: 'get',
    params: query
  })
}

// 查询HsBanks详细
export function getHsBanks(id) {
  return request({
    url: '/api/v1/hs-banks/' + id,
    method: 'get'
  })
}

// 新增HsBanks
export function addHsBanks(data) {
  return request({
    url: '/api/v1/hs-banks',
    method: 'post',
    data: data
  })
}

// 修改HsBanks
export function updateHsBanks(data) {
  return request({
    url: '/api/v1/hs-banks/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsBanks
export function delHsBanks(data) {
  return request({
    url: '/api/v1/hs-banks',
    method: 'delete',
    data: data
  })
}

