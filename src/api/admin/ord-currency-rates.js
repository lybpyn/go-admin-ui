import request from '@/utils/request'

// 查询OrdCurrencyRates列表
export function listOrdCurrencyRates(query) {
  return request({
    url: '/api/v1/ord-currency-rates',
    method: 'get',
    params: query
  })
}

// 查询OrdCurrencyRates详细
export function getOrdCurrencyRates(id) {
  return request({
    url: '/api/v1/ord-currency-rates/' + id,
    method: 'get'
  })
}

// 新增OrdCurrencyRates
export function addOrdCurrencyRates(data) {
  return request({
    url: '/api/v1/ord-currency-rates',
    method: 'post',
    data: data
  })
}

// 修改OrdCurrencyRates
export function updateOrdCurrencyRates(data) {
  return request({
    url: '/api/v1/ord-currency-rates/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdCurrencyRates
export function delOrdCurrencyRates(data) {
  return request({
    url: '/api/v1/ord-currency-rates',
    method: 'delete',
    data: data
  })
}

