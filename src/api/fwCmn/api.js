import request from '@/utils/request'
import requestToBatch from '@/utils/requestToBatch'

export function sendGetParams(url, params) {
  return request({
    url: '/lms' + url,
    method: 'get',
    params
  })
}

export function sendGetData(url, query) {
  return request({
    url: '/lms' + url,
    method: 'get',
    data: query
  })
}

export function sendPostParams(url, params) {
  return request({
    url: '/lms' + url,
    method: 'post',
    params
  })
}

export function sendPostData(url, query) {
  return request({
    url: '/lms' + url,
    method: 'post',
    data: query
  })
}

export function sendPutData(url, data) {
  return request({
    url: '/lms' + url,
    method: 'put',
    data
  })
}

export function sendDeleteData(url, data) {
  return request({
    url: '/lms' + url,
    method: 'delete',
    data
  })
}

export function sendGetParamsByBlob(url, params) {
  return request({
    url: '/lms' + url,
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export function sendPostParamsByBlob(url, params) {
  return request({
    url: '/lms' + url,
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}

export function sendPostDataListByBlob(url, list) {
  return request({
    url: '/lms' + url,
    method: 'post',
    data: list,
    responseType: 'blob'
  })
}

export function sendGetDataListByBlob(url, list) {
  return request({
    url: '/lms' + url,
    method: 'get',
    data: list,
    responseType: 'blob'
  })
}

export function sendGetParamsToBatchToBatch(url, params) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'get',
    params
  })
}

export function sendGetDataToBatchToBatch(url, query) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'get',
    data: query
  })
}

export function sendPostParamsToBatch(url, params) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'post',
    params
  })
}

export function sendPostDataToBatch(url, query) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'post',
    data: query
  })
}

export function sendPutDataToBatch(url, data) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'put',
    data
  })
}

export function sendDeleteDataToBatch(url, data) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'delete',
    data
  })
}

export function sendGetParamsByBlobToBatch(url, params) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export function sendPostParamsByBlobToBatch(url, params) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}

export function sendPostDataListByBlobToBatch(url, list) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'post',
    data: list,
    responseType: 'blob'
  })
}

export function sendGetDataListByBlobToBatch(url, list) {
  return requestToBatch({
    url: '/lmsbatch' + url,
    method: 'get',
    data: list,
    responseType: 'blob'
  })
}
export function sendPostDataWithoutLms(url, query) {
  return request({
    url: url,
    method: 'post',
    data: query
  })
}

