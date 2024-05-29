/**
 *Created by PanJiaChen on 16/11/29.
 * @param {Sting} url
 * @param {Sting} title
 * @param {Number} w
 * @param {Number} h
 */
 import { sendPostData } from '@/api/fwCmn/api'

 /**
  * window popup 호출
  * @param {Sting} cpntFileNm : 화면정보관리에 등록되어있는 파일명 (ex: _1010/LAM1010-005P)
  * , 화면정보관리에 등록되지 않은 화면의 경우 해당 화면 직접 호출
  *   (직접호출시 경로는 '/#/popup/views/pages/' 이하)
  * @param {Number} cpntCount : 중복 팝업을 위한 넘버링
  * , 입력하지 않을경우 중복되서 뜨지 않고 하나의 화면만 호출
  * @param {Sting} cpntNm : 직접 호출시 사용할 title 명
  * , 직접호출 아닐 시 입력할 필요 없음
  */
export default {
data() {
 return {
   requestData: {},
   responseData: {},
   url: '',
   title: '',
   rate: 0.0,
   widthRate: 0.0, // 가로 비율
   heightRate: 0.0, // 세로 비율
   popWidth: 0,
   popHeight: 0,
   numbering: '',
   formName: '',
   winPopupData: {},
   saperator: '',
   clickCnt: 0, // 더블클릭 판별 변수, clickCnt가 1이 아닐 때 setparam 호출 방지
   popupList: []
 }
},
methods: {
  openWindowPopupForMessage(formName, cpntCount, saperator) {
    //  console.log('openWindowPopup')
     this.clickCnt += 1
     this.requestData = { 'cpntFileNm': this[formName].cpntFileNm }
     this.url = '/#/popup/views/pages/'
     this.formName = formName
     this.saperator = saperator
    //  console.log('url::: ' + this.url)
    //  console.log('saperator::: ' + this.saperator)
    //  console.log('formName::: ' + this.formName)
     if (cpntCount != null) {
       this.numbering = '_' + cpntCount
     }
     // 더블클릭 예외처리
    //  console.log('clickCnt:::' + this.clickCnt)
    var response = {
      'data':
      {
      'list':
      [{
      'cpntMngtNo': '8020091',
      'cpntNm': '쪽지 확인',
      'cpntFileNm': '_8020/CMN8020-093P',
      'cpntWidthRt': '30%',
      'cpntHeightRt': '0%',
      'cpntGrpPath': 'cmn'
      }]
    }
    }
    this.$_setting_window_popup_params(response)
    this.$_open_window_popup()
    //  console.log('OUT : ' + this.url)
    //  console.log('OUT : ' + this.title)
  },
 openWindowPopup(formName, cpntCount, saperator) {
  //  console.log('openWindowPopup')
   this.clickCnt += 1
   this.requestData = { 'cpntFileNm': this[formName].cpntFileNm }
   this.url = '/#/popup/views/pages/'
   this.formName = formName
   this.saperator = saperator
  //  console.log('url::: ' + this.url)
  //  console.log('saperator::: ' + this.saperator)
  //  console.log('formName::: ' + this.formName)
   if (cpntCount != null) {
     this.numbering = '_' + cpntCount
   }
   // 더블클릭 예외처리
  //  console.log('clickCnt:::' + this.clickCnt)
  
   if (this.clickCnt === 1) {
      sendPostData('/fwCmn/getPopupData', this.requestData).then(response => {
        console.log('response', response)
        this.$_setting_window_popup_params(response)
        this.$_open_window_popup()
        this.clickCnt = 0
    }).catch(err => {
      this.clickCnt = 0
      console.log(err)
    })
   }

  //  console.log('OUT : ' + this.url)
  //  console.log('OUT : ' + this.title)
 },

 $_setting_window_popup_params(response) {
  //  console.log('셋팅파람 호출')
    if (response !== null && response.data.list.length !== 0) {
      this.responseData = response.data.list[0]
      this.url += this.responseData.cpntGrpPath + '/' + this.responseData.cpntFileNm
      // var fileNmWords = this.responseData.cpntFileNm
      // fileNmWords = fileNmWords.split('/')
      // fileNmWords = fileNmWords.slice(-1)
      this.title = '[' + this.responseData.cpntMngtNo + '] ' + this.responseData.cpntNm + this.numbering
      this.widthRate = this.responseData.cpntWidthRt.slice(0, -1) / 100.0

      // 입력된 세로 비율 값이 있을경우 DB값 넣어주기
      if (this.responseData.cpntHeightRt !== '0%' && this.responseData.cpntHeightRt !== '%') {
        // console.log('입력된 세로비율 적용')
        this.heightRate = this.responseData.cpntHeightRt.slice(0, -1) / 100.0
      } else {
        // 없을경우 가로값을 세로값으로(가로, 세로 비율 일치)
        // console.log('세로비율에 가로비율 적용')
        this.heightRate = this.widthRate
      }
    } else {
      this.url += this[this.formName].cpntFileNm
      this.title = this[this.formName].cpntNm + this.numbering
      this.rate = 0.9
      this.widthRate = this.rate
      this.heightRate = this.rate
    }
},
 /**
  * window popup 호출
  * 개발자 직접 호출 금지
  */
 $_open_window_popup() {
    //  console.log('open window popup')
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top
      var left = 0
      var top = 0
      var w = 0
      var h = 0

      const width = screen.width
      const height = screen.height
      w = width * this.widthRate
      h = height * this.heightRate

      left = ((width / 2) - (w / 2)) + dualScreenLeft
      top = ((height / 2) - (h / 2)) + dualScreenTop

    this.winPopupData = this[this.formName].data
    var dataKeys = Object.keys(this.winPopupData)

    for (let index = 0; index < dataKeys.length; index++) {
      const objectKey = dataKeys[index]
      var saperatedObejectKey = objectKey
      if (this.saperator !== undefined && this.saperator !== '') {
        saperatedObejectKey = this.saperator + '.' + objectKey
      }
      if (typeof this.winPopupData[objectKey] === 'object') {
        sessionStorage.setItem(saperatedObejectKey, JSON.stringify(this.winPopupData[objectKey]))
      } else {
        sessionStorage.setItem(saperatedObejectKey, this.winPopupData[objectKey])
      }
    }
    if (this.saperator !== undefined && this.saperator !== '') {
      this.url += '?saperator=' + this.saperator
    }
    // console.log('호출 직전 url::: ' + this.url)
    console.log('this.title', this.title)
    console.log('toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
    const newWindow = window.open(this.url, this.title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

      if (this.popupList.length === 0) {
        this.popupList = []
        sessionStorage.setItem('popupList', JSON.stringify(this.popupList))
      } else {
        this.popupList = JSON.parse(sessionStorage.getItem('popupList'))
      }

      // console.log('받아온 리스트 ==>')
      // console.log(this.popupList)

      this.popupList.push(this.title)
      const popupSet = new Set(this.popupList) // 중복제거 (Set 자료형 특징 이용)
      this.popupList = [...popupSet]
      // console.log(this.popupList)
      sessionStorage.setItem('popupList', JSON.stringify(this.popupList))

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus()
    }
  },
  // 윈도우 팝업 종료
  $_closeAllWindowPopup() {
    var targetList = JSON.parse(sessionStorage.getItem('popupList'))

    if (targetList) {
      // console.log('타겟 리스트 ===>')
      // console.log(targetList)

      for (var i = 0; i < targetList.length; i++) {
        var targetWindow = window.open('', targetList[i])
        targetWindow.close()
      }
    }
    targetList = []
    sessionStorage.setItem('popupList', JSON.stringify(targetList))
  }
}
}
