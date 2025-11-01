import request from '@/utils/request'

// 查询NoNotificationReceivers列表
export function listNoNotificationReceivers(query) {
  return request({
    url: '/api/v1/no-notification-receivers',
    method: 'get',
    params: query
  })
}

// 查询NoNotificationReceivers详细
export function getNoNotificationReceivers(id) {
  return request({
    url: '/api/v1/no-notification-receivers/' + id,
    method: 'get'
  })
}

// 新增NoNotificationReceivers
export function addNoNotificationReceivers(data) {
  return request({
    url: '/api/v1/no-notification-receivers',
    method: 'post',
    data: data
  })
}

// 修改NoNotificationReceivers
export function updateNoNotificationReceivers(data) {
  return request({
    url: '/api/v1/no-notification-receivers/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除NoNotificationReceivers
export function delNoNotificationReceivers(data) {
  return request({
    url: '/api/v1/no-notification-receivers',
    method: 'delete',
    data: data
  })
}

