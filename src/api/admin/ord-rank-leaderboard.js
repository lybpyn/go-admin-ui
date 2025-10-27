import request from '@/utils/request'

// 查询OrdRankLeaderboard列表
export function listOrdRankLeaderboard(query) {
  return request({
    url: '/api/v1/ord-rank-leaderboard',
    method: 'get',
    params: query
  })
}

// 查询OrdRankLeaderboard详细
export function getOrdRankLeaderboard(rank) {
  return request({
    url: '/api/v1/ord-rank-leaderboard/' + rank,
    method: 'get'
  })
}

// 新增OrdRankLeaderboard
export function addOrdRankLeaderboard(data) {
  return request({
    url: '/api/v1/ord-rank-leaderboard',
    method: 'post',
    data: data
  })
}

// 修改OrdRankLeaderboard
export function updateOrdRankLeaderboard(data) {
  return request({
    url: '/api/v1/ord-rank-leaderboard/' + data.rank,
    method: 'put',
    data: data
  })
}

// 删除OrdRankLeaderboard
export function delOrdRankLeaderboard(data) {
  return request({
    url: '/api/v1/ord-rank-leaderboard',
    method: 'delete',
    data: data
  })
}

