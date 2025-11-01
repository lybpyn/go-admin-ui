import request from '@/utils/request'

// 查询HsCarouselBanner列表
export function listHsCarouselBanner(query) {
  return request({
    url: '/api/v1/hs-carousel-banner',
    method: 'get',
    params: query
  })
}

// 查询HsCarouselBanner详细
export function getHsCarouselBanner(id) {
  return request({
    url: '/api/v1/hs-carousel-banner/' + id,
    method: 'get'
  })
}

// 新增HsCarouselBanner
export function addHsCarouselBanner(data) {
  return request({
    url: '/api/v1/hs-carousel-banner',
    method: 'post',
    data: data
  })
}

// 修改HsCarouselBanner
export function updateHsCarouselBanner(data) {
  return request({
    url: '/api/v1/hs-carousel-banner/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除HsCarouselBanner
export function delHsCarouselBanner(data) {
  return request({
    url: '/api/v1/hs-carousel-banner',
    method: 'delete',
    data: data
  })
}

