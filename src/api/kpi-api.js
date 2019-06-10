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

export function fetchKpiWorkerGroup(params){
	return fetch(`${baseUrl}/fetchKpiWorkerGroup`, params)
}

export function saveKpiWorkerGroup(params){
	return fetch(`${baseUrl}/saveKpiWorkerGroup`, params)
}

export function fetchKpiUsers(params){
	return fetch(`${baseUrl}/fetchKpiUsers`, params)
}

export function saveKpiUsers(params){
	return fetch(`${baseUrl}/saveKpiUsers`, params)
}

export function fetchKpiWorkItem(params){
	return fetch(`${baseUrl}/fetchKpiWorkItem`, params)
}

export function saveKpiWorkItem(params){
	return fetch(`${baseUrl}/saveKpiWorkItem`, params)
}

export function fetchKpiSourceData(params){
	return fetch(`${baseUrl}/fetchKpiSourceData`, params)
}

export function saveKpiSourceData(params){
	return fetch(`${baseUrl}/saveKpiSourceData`, params)
}

export function fetchKpiLabor(params){
  return fetch(`${baseUrl}/fetchKpiLabor`, params)
}

export function saveKpiLabor(params){
  return fetch(`${baseUrl}/saveKpiLabor`, params)
}
