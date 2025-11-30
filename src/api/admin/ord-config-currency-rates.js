import request from '@/utils/request'

// 查询OrdConfigCurrencyRates列表
export function listOrdConfigCurrencyRates(query) {
  return request({
    url: '/api/v1/ord-config-currency-rates',
    method: 'get',
    params: query
  })
}

// 查询OrdConfigCurrencyRates详细
export function getOrdConfigCurrencyRates(id) {
  return request({
    url: '/api/v1/ord-config-currency-rates/' + id,
    method: 'get'
  })
}

// 新增OrdConfigCurrencyRates
export function addOrdConfigCurrencyRates(data) {
  return request({
    url: '/api/v1/ord-config-currency-rates',
    method: 'post',
    data: data
  })
}

// 修改OrdConfigCurrencyRates
export function updateOrdConfigCurrencyRates(data) {
  return request({
    url: '/api/v1/ord-config-currency-rates/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除OrdConfigCurrencyRates
export function delOrdConfigCurrencyRates(data) {
  return request({
    url: '/api/v1/ord-config-currency-rates',
    method: 'delete',
    data: data
  })
}

export function batchQuery(data) {
  return request({
    url: '/api/v1/ord-config-currency-rates/batch-query',
    method: 'post',
    data: data
  })
}
