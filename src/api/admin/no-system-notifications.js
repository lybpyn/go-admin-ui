import request from '@/utils/request'

// 查询NoSystemNotifications列表
export function listNoSystemNotifications(query) {
  return request({
    url: '/api/v1/no-system-notifications',
    method: 'get',
    params: query
  })
}

// 查询NoSystemNotifications详细
export function getNoSystemNotifications(id) {
  return request({
    url: '/api/v1/no-system-notifications/' + id,
    method: 'get'
  })
}

// 新增NoSystemNotifications
export function addNoSystemNotifications(data) {
  return request({
    url: '/api/v1/no-system-notifications',
    method: 'post',
    data: data
  })
}

// 修改NoSystemNotifications
export function updateNoSystemNotifications(data) {
  return request({
    url: '/api/v1/no-system-notifications/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除NoSystemNotifications
export function delNoSystemNotifications(data) {
  return request({
    url: '/api/v1/no-system-notifications',
    method: 'delete',
    data: data
  })
}

