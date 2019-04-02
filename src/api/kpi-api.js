/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from '@/apiconfig/index'

export function fetchData(params) {
  return fetch(`${baseUrl}/getKpiData`, params)
}

export function saveData(params) {
  return fetch(`${baseUrl}/saveKpiData`, params)
}
