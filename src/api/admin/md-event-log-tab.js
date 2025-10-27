import request from '@/utils/request'

// 查询MdEventLogTab列表
export function listMdEventLogTab(query) {
  return request({
    url: '/api/v1/md-event-log-tab',
    method: 'get',
    params: query
  })
}

// 查询MdEventLogTab详细
export function getMdEventLogTab(id) {
  return request({
    url: '/api/v1/md-event-log-tab/' + id,
    method: 'get'
  })
}

// 新增MdEventLogTab
export function addMdEventLogTab(data) {
  return request({
    url: '/api/v1/md-event-log-tab',
    method: 'post',
    data: data
  })
}

// 修改MdEventLogTab
export function updateMdEventLogTab(data) {
  return request({
    url: '/api/v1/md-event-log-tab/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除MdEventLogTab
export function delMdEventLogTab(data) {
  return request({
    url: '/api/v1/md-event-log-tab',
    method: 'delete',
    data: data
  })
}

