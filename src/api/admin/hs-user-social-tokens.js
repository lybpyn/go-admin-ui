import request from '@/utils/request'

// 查询HsUserSocialTokens列表
export function listHsUserSocialTokens(query) {
  return request({
    url: '/api/v1/hs-user-social-tokens',
    method: 'get',
    params: query
  })
}

// 查询HsUserSocialTokens详细
export function getHsUserSocialTokens(id) {
  return request({
    url: '/api/v1/hs-user-social-tokens/' + id,
    method: 'get'
  })
}

// 新增HsUserSocialTokens
export function addHsUserSocialTokens(data) {
  return request({
    url: '/api/v1/hs-user-social-tokens',
    method: 'post',
    data: data
  })
}

// 修改HsUserSocialTokens
export function updateHsUserSocialTokens(data) {
  return request({
    url: '/api/v1/hs-user-social-tokens/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsUserSocialTokens
export function delHsUserSocialTokens(data) {
  return request({
    url: '/api/v1/hs-user-social-tokens',
    method: 'delete',
    data: data
  })
}

