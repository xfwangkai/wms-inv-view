/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from '@/apiconfig/index'
// 登录接口
export function loginUserNo(params) {
  return fetch(`${baseUrl}/root/login/checkMemberLogin`, params)
}

export function fetchInvData(params) {
  return fetch(`${baseUrl}/getInventoryList`, params)
}

export function invData() {
  let retData = {
    inventoryList: [

    ],
      maxRow: 4,
      maxCol: 10,
      maxAlley: 120,
      maxZone: 1
    }
    return retData
}
