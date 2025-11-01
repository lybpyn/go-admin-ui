import request from '@/utils/request'

// 查询MdUserDeviceTab列表
export function listMdUserDeviceTab(query) {
  return request({
    url: '/api/v1/md-user-device-tab',
    method: 'get',
    params: query
  })
}

// 查询MdUserDeviceTab详细
export function getMdUserDeviceTab(id) {
  return request({
    url: '/api/v1/md-user-device-tab/' + id,
    method: 'get'
  })
}

// 新增MdUserDeviceTab
export function addMdUserDeviceTab(data) {
  return request({
    url: '/api/v1/md-user-device-tab',
    method: 'post',
    data: data
  })
}

// 修改MdUserDeviceTab
export function updateMdUserDeviceTab(data) {
  return request({
    url: '/api/v1/md-user-device-tab/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除MdUserDeviceTab
export function delMdUserDeviceTab(data) {
  return request({
    url: '/api/v1/md-user-device-tab',
    method: 'delete',
    data: data
  })
}

