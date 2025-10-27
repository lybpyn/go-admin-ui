import request from '@/utils/request'

// 查询MdEventDefinitionTab列表
export function listMdEventDefinitionTab(query) {
  return request({
    url: '/api/v1/md-event-definition-tab',
    method: 'get',
    params: query
  })
}

// 查询MdEventDefinitionTab详细
export function getMdEventDefinitionTab(id) {
  return request({
    url: '/api/v1/md-event-definition-tab/' + id,
    method: 'get'
  })
}

// 新增MdEventDefinitionTab
export function addMdEventDefinitionTab(data) {
  return request({
    url: '/api/v1/md-event-definition-tab',
    method: 'post',
    data: data
  })
}

// 修改MdEventDefinitionTab
export function updateMdEventDefinitionTab(data) {
  return request({
    url: '/api/v1/md-event-definition-tab/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除MdEventDefinitionTab
export function delMdEventDefinitionTab(data) {
  return request({
    url: '/api/v1/md-event-definition-tab',
    method: 'delete',
    data: data
  })
}

