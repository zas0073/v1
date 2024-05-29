import request from '@/utils/request'
import { sendGetParamsByBlob, sendPostDataListByBlob } from '@/api/fwCmn/api'

export function uploadFiles(form) {
  if (form && form.get('fileNo') !== null && form.get('fileNo') !== 'undefined' && form.get('fileNo') !== '' && form.get('fileNo') !== 'null') {
    return uploadFilesAdd(form)
  } else {
    return uploadFilesNew(form)
  }
}

export function uploadFilesNew(form) {
  return request({
    url: '/lms/fwCmn/uploadFiles',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

export function uploadFilesAdd(form) {
  return request({
    url: '/lms/fwCmn/uploadFilesAdd',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

export function downloadFile(param) {
  return new Promise((resolve, reject) => {
    sendGetParamsByBlob('/fwCmn/downloadFile', param).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', param.fileNm)
      document.body.appendChild(link)
      link.click()
      resolve(true)
      }).catch(err => {
        console.log(err)
        reject(false)
      })
    })
}

// 파일 2개이상일 경우, 압축하여 멀티 다운로드
export function multiDownloadFile(fileList, zipFileName) {
  return new Promise((resolve, reject) => {
    sendPostDataListByBlob('/fwCmn/multiDownloadFile', fileList).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', zipFileName)
      document.body.appendChild(link)
      link.click()
      resolve(true)
    }).catch(err => {
      console.log(err)
      reject(false)
    })
  })
}

export function msgToFile(msg, fileNm) {
  const url = window.URL.createObjectURL(new Blob([msg]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileNm)
  document.body.appendChild(link)
  link.click()
}

// ######################### ERP ########################
// 첨부파일 (ERP연동)
export function uploadFilesErp(form) {
  if (form && form.get('fileNo') !== null && form.get('fileNo') !== 'undefined' && form.get('fileNo') !== '' && form.get('fileNo') !== 'null') {
    return uploadFilesAddErp(form)
  } else {
    return uploadFilesNewErp(form)
  }
}

export function uploadFilesNewErp(form) {
  return request({
    url: '/lms/fwCmn/uploadFilesErp',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

export function uploadFilesAddErp(form) {
  return request({
    url: '/lms/fwCmn/uploadFilesAddErp',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}
export function uploadFile(form) {
  return request({
    url: '/lms/fwCmn/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}
export function uploadFileExt(form) {
  return request({
    url: '/lms/fwCmn/uploadFileExt',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}
export function updateUploadFile(form) {
    return request({
      url: '/lms/fwCmn/updateUploadFile',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: form
  })
}
export function updateUploadFileExt(form) {
  return request({
    url: '/lms/fwCmn/updateUploadFileExt',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}
  export function updateUploadFileMeta(form) {
    return request({
      url: '/lms/fwCmn/updateUploadFileMeta',
      method: 'post',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencode'
      },
      data: form
    })
}
export function webUploadFile(form) {
  return request({
    url: '/lms/fwCmn/webUploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}
  export function webUpdateUploadFile(form) {
    return request({
      url: '/lms/fwCmn/webUpdateUploadFile',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: form
  })
}
  export function webUpdateUploadFileMeta(form) {
    return request({
      url: '/lms/fwCmn/webUpdateUploadFileMeta',
      method: 'post',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencode'
      },
      data: form
    })
}
export function webDownloadFile(param) {
  return new Promise((resolve, reject) => {
    sendGetParamsByBlob('/fwCmn/webDownloadFile', param).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', param.fileNm)
      document.body.appendChild(link)
      link.click()
      resolve(true)
      }).catch(err => {
        console.log(err)
        reject(false)
      })
    })
}
// 파일 2개이상일 경우, 압축하여 멀티 다운로드
export function webMultiDownloadFile(fileList, zipFileName) {
  return new Promise((resolve, reject) => {
    sendPostDataListByBlob('/fwCmn/webMultiDownloadFile', fileList).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', zipFileName)
      document.body.appendChild(link)
      link.click()
      resolve(true)
    }).catch(err => {
      console.log(err)
      reject(false)
    })
  })
}

