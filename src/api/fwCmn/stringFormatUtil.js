import { parseTime } from '@/utils'
import { maskRrgsNo } from '@/filters'

/*
* 사용법( *.vue 파일안에서 선언)
* import stringFormatUtil from '@/api/fwCmn/stringFormatUtil'
* export default {
*  ...
*  mixins: [stringFormatUtil],
* ...
* methods 안에서 꺼내 쓸 수 있음
*/
export const stringFormatUtil = {
  methods: {
    /*
    * 일 차이 구하기
    */
    $_dateDiff(_date1, _date2) {
      const diffDate_1 = new Date(_date1)
      const diffDate_2 = new Date(_date2)
      diffDate_1.setHours(0)
      diffDate_1.setMinutes(0)
      diffDate_1.setSeconds(0)
      diffDate_1.setMilliseconds(0)

      diffDate_2.setHours(0)
      diffDate_2.setMinutes(0)
      diffDate_2.setSeconds(0)
      diffDate_2.setMilliseconds(0)

      const startDate = this.$Date.fromJSDate(diffDate_1)
      const endDate = this.$Date.fromJSDate(diffDate_2)
      return Math.floor(startDate.diff(endDate, ['days'])['values'].days)
    },
    /**
     * 입력된 날짜를 0시0분0초로 초기화
     * @param {*} date
     */
    $_resetDate(date) {
      const chgDate = new Date(date)
      chgDate.setHours(0)
      chgDate.setMinutes(0)
      chgDate.setSeconds(0)
      chgDate.setMilliseconds(0)
      return chgDate
    },
    /**
     * 잔여일 계산
     */
    $_leftDay(_date1, _date2, addDay) {
      const leftDay = this.$_dateDiff(_date1, _date2)
      if ((leftDay + 1 + (addDay || 0)) < 0) {
        return 0
      } else {
        return leftDay + 1 + (addDay || 0)
      }
    },
    /**
     * 두 날짜 사이의 개월 수 구하기
     * @param {*} d1 시작일
     * @param {*} d2 종료일
     */
    $_monthDiff(d1, d2) {
      let months
      months = (d2.getFullYear() - d1.getFullYear()) * 12
      months -= d1.getMonth()
      months += d2.getMonth()
      return months <= 0 ? 0 : months
    },
    /*
    * yyyyMMdd 날짜문자열을 gubun으로 포맷을 변경
    */
    $_to_date_format(date_str, gubun) {
      const yyyyMMdd = String(date_str)
      const sYear = yyyyMMdd.substring(0, 4)
      const sMonth = yyyyMMdd.substring(4, 6)
      const sDate = yyyyMMdd.substring(6, 8)

      return sYear + gubun + sMonth + gubun + sDate
    },
    /**
     * 지난달 마지막 날 구하기
     */
    $_bf_month_lastday(date) {
      var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      var lastMonth = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1))
      return lastMonth
    },
    /**
     * 문자열을 날짜로 변경
     * @param {*} date_str 날짜 문자열
     */
    $_string_to_date(date_str) {
      if (!date_str) {
        return ''
      }
      let yyyyMMdd = String(date_str)
      yyyyMMdd = yyyyMMdd.replace('-', '')
      const sYear = yyyyMMdd.substring(0, 4)
      const sMonth = yyyyMMdd.substring(4, 6)
      const sDate = yyyyMMdd.substring(6, 8)
      return new Date(sYear, sMonth - 1, sDate)
    },
    $_get_gmt_string_to_date(date_str) {
      function z(n) { return (n < 10 ? '0' : '') + n }
      if (date_str.len < 11) {
        alert('(' + date_str + ') 시간 정보가 포함되어야 GMT정보를 포함할 수 있습니다.')
        return
      }
      let offset = new Date().getTimezoneOffset()
      const sign = offset < 0 ? '+' : '-'
      offset = Math.abs(offset)
      const gmt = sign + z(offset / 60 | 0) + ':' + z(offset % 60) // +09:00
      return new Date(date_str + gmt)
    },
    $_numberWithCommas(x) {
      if (!x) {
        return 0
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    // 콤마삭제
    $_unComma(x) {
      if (!x) {
        return 0
      }
      return x.toString().replace(/[^\d]+/g, '')
    },
    /**
     * 날짜 형식 지정
     * @param {*} dt new Date
     * @param {*} format {y}-{m}-{d}
     */
    $_parseTime(dt, format) {
      return parseTime(dt, format)
    },
    /**
     * 윤년여부 체크
     * 작성자 : 강선우
     */
    $_isLeapYear(date_str) {
      const year = date_str.substring(0, 4)
      if (year % 400 === 0) {
        return true
      }
      if (year % 100 === 0) {
        return false
      }
      if (year % 4 === 0) {
        return true
      }
      return false
    },

    /**
     * 해당일자를 입력받아 해당월의 마지막 일자 return
     * 작성자 : 강선우
     */
    $_lastDay(date_str) {
      const yyyyMMdd = String(date_str)
      let days = '31'
      const year = yyyyMMdd.substring(0, 4)
      const month = yyyyMMdd.substring(4, 6)

      if (Number(month) === 2) {
          if (this.$_isLeapYear(year + month + '01')) { days = '29' } else { days = '28' }
      } else if (Number(month) === 4 || Number(month) === 6 || Number(month) === 9 || Number(month) === 11) {
        days = '30'
      }
      return days
    },

    $_isNull(arg) {
      if (typeof arg === 'undefined' || arg === null || arg === '') {
        return true
      } else {
        return false
      }
    },

    $_dataMasking(arg, cnt) {
      if (typeof arg === 'undefined' || arg === null || arg === '') {
        return ''
      }
      let tmp = ''
      for (let i = 0; i < cnt; i++) {
        tmp = tmp + '*'
      }
    return arg.substring(0, arg.length - cnt) + tmp
    },

    $_stringMasking(value, auth) {
      if (!value) {
        return ''
      }

      const target = String(value)

      if (auth) {
        return target
      } else {
        let tmp = ''
        for (let i = 0; i < target.length; i++) {
          tmp += '*'
        }
        return tmp
      }
    },

    $_nameMasking(value, auth) {
      if (!value) {
        return ''
      }

      const target = String(value)
      if (auth) {
        return target
      } else {
        if (target.length > 2) {
          const nameArr = target.split('')
          nameArr.forEach(function(name, i) {
            if (i === 0) {
              return
            }
            nameArr[i] = '*'
          })
          return nameArr.join().replace(/,/g, '')
        } else {
          return target.replace(/.$/, '*')
        }
      }
    },

    $_phoneMasking(value, separator, auth) {
      if (!value) {
        return ''
      }

      const strValue = String(value).replace(/-/g, '')

      if (strValue.length !== 11 && strValue.length !== 10) {
        return ''
      }
      if (auth) {
        if (separator) {
          return this.$_stringToPhoneNo(strValue)
        } else {
          return strValue
        }
      } else {
        // 권한이 없는 경우
        const strArr = this.$_stringToPhoneNo(strValue).split('-')
        strArr[1] = this.$_stringMasking(strArr[1]) // 중간번호 마스킹
        if (separator) {
          return strArr.join('-')
        } else {
          return strArr.join('')
        }
      }
    },

    $_rsdtMasking(value, separator, auth) {
      if (!value) {
        return ''
      }

      const strValue = String(value).replace(/-/g, '')
      if (auth) {
        if (separator) {
          return this.$_stringToRrgsNo(strValue)
        } else {
          return strValue
        }
      } else {
        if (separator) {
          return maskRrgsNo(this.$_stringToRrgsNo(strValue), 6)
        } else {
          return maskRrgsNo(strValue, 6)
        }
      }
    },

    /**
     * 문자열을 글자수 단위로 잘라서 '-'로 연결하여 리턴
     * 작성자 : 강선우
     */
    $_stringSplit(str, ...arg) {
      var arr = []
      let tmp = str
      for (var i = 0; i < arg.length; i++) {
        arr.push(tmp.substring(0, arg[i]))
        tmp = tmp.substring(arg[i])
      }
      return arr.join('-')
    },

    /**
     * 문자열을 전화번호 포멧으로 변경
     * ex) 01088889999 => 010-8888-9999 / 0288889999 => 02-8888-9999
     * 작성자 : 강선우
     */
    $_stringToPhoneNo(str) {
      if (!str || str === 'undefined' || str === 'null') return ''
      if (str.length === 11) {
        return this.$_stringSplit(str, 3, 4, 4)
      } else if (str.length === 8) {
        return this.$_stringSplit(str, 4, 4)
      } else if (str.length === 10) {
        if (str.substring(0, 2) === '02') {
          return this.$_stringSplit(str, 2, 4, 4)
        } else {
          return this.$_stringSplit(str, 3, 3, 4)
        }
      } else if (str.length === 9) {
        if (str.substring(0, 2) === '02') {
          return this.$_stringSplit(str, 2, 3, 4)
        }
      }
      return str
    },

    /**
     * 문자열을 주민번호, 법인번호 포멧으로 변경
     * ex) 8910101111111 => 891010-1111111
     * 작성자 : 강선우
     */
    $_stringToRrgsNo(str) {
      if (!str || str === 'undefined' || str === 'null') return ''
      return this.$_stringSplit(str, 6, 7)
    },

    /**
     * 문자열을 사업자 포멧으로 변경
     * ex) 1122233333 => 11-222-33333 / 0001122233333 => 11-222-33333
     * 작성자 : 강선우
     */
    $_stringToBrno(str) {
      if (!str || str === 'undefined' || str === 'null') return ''
      let tmp = ''
      if (str.length === 10) tmp = str
      else tmp = str.substring(str.length - 10)

      return this.$_stringSplit(tmp, 3, 2, 5)
    },

    /**
     * 문자열을 카드번호 포멧으로 변경
     * ex) 1234567891234567 => 1234-5678-9123-4567
     * 작성자 : 강선우
     */
    $_stringToCardNo(str) {
      if (!str || str === 'undefined' || str === 'null') return ''
      return this.$_stringSplit(str, 4, 4, 4, 4)
    },

    /**
     * 한글만 입력하였는지 체크
     * 작성자 : 송정아
     */
    // $_checkHangle(str) {
    //   const checkStr = str.slice(-1)
    //   const regex = /^[ㄱ-ㅎ|가-힣|]+$/
    //   if (regex.exec(checkStr) === null) {
    //     return false
    //   }
    //   return true
    // },
    $_checkNumberReverse(val) {
      const regex = /[ㄱ-ㅎ|가-힣|]+$/
      const reg = /[ㄱ-ㅎ|가-힣|]/g
      let res = val
      if (regex.exec(val) !== null) {
        res = val.replace(reg, '')
      }
      return res
    },
    $_checkHangle(val) {
      const regex = /^[ㄱ-ㅎ|가-힣|]+$/
      const reg = /[^ㄱ-ㅎ|가-힣|]/g
      let res = val

      if (regex.exec(val) === null) {
        res = val.replace(reg, '')
      }
      return res
    },
    //  $_checkNumber(str) {
    //   const checkStr = str.slice(-1)
    //   const regex = /^[0-9]+$/
    //   if (regex.exec(checkStr) === null) {
    //     return false
    //   }
    //   return true
    // },
    /**
     * 숫자만 입력하였는지 체크
     * 작성자 : 송정아
     */
    $_checkNumber(val) {
      const regex = /^[0-9]+$/
      const reg = /[^0-9]/g
      let res = val

      if (regex.exec(val) === null) {
        res = val.replace(reg, '')
      }
      return res
    },
    $_checkNumberMask(val) {
      const regex = /^[0-9|*]+$/
      const reg = /[^0-9|*]/g
      let res = val

      if (regex.exec(val) === null) {
        res = val.replace(reg, '')
      }
      return res
    },
    //  $_checkChar(str) {
    //   const checkStr = str.slice(-1)
    //   const regex = /^[a-zA-Z]+$/
    //   if (regex.exec(checkStr) === null) {
    //     return false
    //   }
    //   return true
    // },
    /**
     * 영어만 입력하였는지 체크
     * 작성자 : 송정아
     */
    $_checkChar(val) {
      const regex = /^[a-zA-Z]+$/
      const reg = /[^a-zA-Z]/g

      if (regex.exec(val) === null) {
        return val.replace(reg, '')
      }
      return val
    },
    /**
     * 영어만 입력하였는지 체크 (대문자)
     * 작성자 : 송정아
     */
     $_checkUpperChar(val) {
      const regex = /^[A-Z]+$/
      const reg = /[^A-Z]/g

      if (regex.exec(val) === null) {
        return val.replace(reg, '')
      }
      return val
    },
    /**
     * 영어만 입력하였는지 체크 (소문자))
     * 작성자 : 송정아
     */
     $_checkLowerChar(val) {
      const regex = /^[a-z]+$/
      const reg = /[^a-z]/g

      if (regex.exec(val) === null) {
        return val.replace(reg, '')
      }
      return val
    },
    //  $_checkSpecialChar(str) {
    //   const checkStr = str.slice(-1)
    //   const regex = /[@~!#$%^&*()?+=\/]/
    //   if (regex.exec(checkStr) !== null) {
    //     return false
    //   }
    //   return true
    // },
    /**
     * 특수문자 체크 (제한)
     * 작성자 : 송정아
     */
    $_checkSpecialChar(val) {
      const regex = /[@~!#$%^&*()?+=\/]/
      const reg = /[@~!#$%^&*()?+=\/]/g

      if (regex.exec(val) !== null) {
        return val.replace(reg, '')
      }
      return val
    },
    /**
     * 숫자만 입력하였는지 체크 (숫자 전체)
     * 작성자 : 송정아
     */
     $_checkFullNumber(str) {
      const regex = /^[0-9]+$/
      if (regex.exec(str) === null) {
        return false
      }
      return true
    },

    /**
     * 숫자 입력 시, 콤마 포맷팅 전환
     * 작성자 : 송정아
     */
     $_formattingCommaAmt(str) {
       str = String(str)
       return this.$_numberWithCommas(this.$_unComma(str))
     },
      $_formattingCommaAmtNumber(str) {
       str = String(str)
       return this.$_numberWithCommas(Number(this.$_unComma(str)))
     },

    //  $_formattingCommaAmt(str) {
    //   let checkStr = ''
    //   for (let i = 0; i < str.length; i++) {
    //     const tmp = str.slice(i, i + 1)
    //     if (tmp !== ',') {
    //       checkStr = checkStr + tmp
    //     }
    //   }
    //   const result = this.$_numberWithCommas(checkStr)
    //   return result
    // },

    $_defaultCommaAmt(str) {
      for (let i = 0; i < str.length; i++) {
        const tmp = str.slice(i, i + 1)
        if (tmp === ',') {
          str = str.replace(',', '')
        }
      }
      return str
    },
    /**
     * 숫자 입력 시, 날짜 포맷팅 전환
     * 작성자 : 송정아
     */
     $_formattingDate(str) {
      // 숫자만 입력되도록
      str = this.$_checkNumber(str)
      str = String(this.$_unFormatting(str, '-'))
      let result = str

      if (str.length > 4) {
        if (str.length <= 6) {
          result = str.substr(0, 4) + '-' + str.substr(4, str.length - 4)
        } else if (str.length > 6) {
          result = str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, str.length - 6)
        }
      }
      return result
     },
    //  $_formattingDate(str) {
    //   const checkStr = str.slice(-1)
    //   const year = str.substr(0, 4)
    //   let result = str

    //   if (str.length === 5 && checkStr !== '-') {
    //     result = year + '-' + checkStr
    //   } else if (str.length === 8 && checkStr !== '-') {
    //     const yyyymm = str.substr(0, 7)
    //     result = yyyymm + '-' + checkStr
    //   }

    //   return result
    // },
    $_unFormatting(str, pattern) {
      for (let i = 0; i < str.length; i++) {
        const tmp = str.slice(i, i + 1)
        if (tmp === pattern) {
          str = str.replace(pattern, '')
        }
      }
      return str
    },
    $_defaultPattern(str) {
      for (let i = 0; i < str.length; i++) {
        const tmp = str.slice(i, i + 1)
        if (tmp === '-') {
          str = str.replace('-', '')
        }
      }
      return str
    },
    /**
     * 지정한 패턴에 맞게 포맷팅 전환
     * 작성자 : 송정아
     */
     $_formattingPattern(str, pattern) {
      // 숫자만 입력되도록
      this.$_checkNumber(str)

      const patternArr = pattern.split('-')

      // pattern 값에 따른 분기 처리
      // n-n 일 경우와 n-n-n 일 경우만 가능
      str = String(this.$_unFormatting(str, '-'))
      let resultStr = str

      if (patternArr.length === 2) { // n-n 패턴일 경우
        const patternVl = Number(patternArr[0])
        if (str.length > patternVl) {
          resultStr = str.substr(0, patternVl) + '-' + str.substr(patternVl, str.length - patternVl)
        }
      } else if (patternArr.length === 3) { // n-n-n 패턴일 경우
        const patternVl1 = Number(patternArr[0])
        const patternVl2 = Number(patternArr[1])
        const patternVlSum = patternVl1 + patternVl2

        if (str.length > patternVl1) {
          if (str.length <= patternVlSum) {
            resultStr = str.substr(0, patternVl1) + '-' + str.substr(patternVl1, str.length - patternVl1)
          } else if (str.length > patternVlSum) {
            resultStr = str.substr(0, patternVl1) + '-' + str.substr(patternVl1, patternVl2) + '-' + str.substr(patternVlSum, str.length - patternVlSum)
          }
        }
      }

      return resultStr
     },
    // $_formattingPattern(str, pattern) {
    //   const patternArr = pattern.split('-')
    //   const checkStr = str.slice(-1)
    //   let result = str

    //   let sumPatternVl = Number(patternArr[0])
    //   for (let i = 0; i < patternArr.length; i++) {
    //     var checkLength = str.length - 1

    //     if (i === 0) {
    //       // 최초 포맷팅할 경우
    //       if (checkLength === Number(patternArr[i]) && checkStr !== '-') {
    //         const tmp = str.substr(0, checkLength)
    //         result = tmp + '-' + checkStr
    //         return result
    //       }
    //     } else {
    //       // 최초 포맷팅 이후에는 포맷팅 갯수만큼 더해진 length 체크
    //       const addCnt = i
    //       sumPatternVl = sumPatternVl + Number(patternArr[i])

    //       if (checkLength === (sumPatternVl + addCnt) && checkStr !== '-') {
    //         const tmp = str.substr(0, (sumPatternVl + addCnt))
    //         result = tmp + '-' + checkStr
    //         return result
    //       }
    //     }
    //   }
    //   return result
    // },
    $_defaultPatternMasking(str, pStr) {
      const checkStr = str.slice(-1)

      let newStr = pStr
      let pCnt = 0 // 패턴 갯수 체크
      for (let i = 0; i < str.length; i++) {
        const tmp = str.slice(i, i + 1)
        if (tmp === '-') { pCnt++ }
      }

      if (str.length > pStr.length + pCnt) {
        newStr = newStr + checkStr
      } else if (str.length < pStr.length + pCnt && str.length === 1) {
        newStr = checkStr
      } else {
        newStr = newStr.substr(0, str.length - pCnt)
      }

      return newStr
    },

    /**
     * 숫자 입력 시, 지정한 패턴에 맞게 포맷팅 전환
     * 작성자 : 송정아
     */
    $_patternMasking(str, pattern, maskingStart, maskingCnt) {
      str = this.$_checkNumberMask(str)

      const patternArr = pattern.split('-')

      // pattern 값에 따른 분기 처리
      // n-n 일 경우와 n-n-n 일 경우만 가능
      str = String(this.$_unFormatting(str, '-'))
      // 마스킹처리
      let tmpStr = ''
      let checkVl = 0
      for (var i = 0; i < str.length; i++) {
        let tmp = ''
        if (i >= (maskingStart - 1) && checkVl < maskingCnt) {
          tmp = '*'
          checkVl++
        } else {
          tmp = str[i]
        }
        tmpStr += tmp
      }
      str = tmpStr
      let resultStr = str

      if (patternArr.length === 2) { // n-n 패턴일 경우
        const patternVl = Number(patternArr[0])
        if (str.length > patternVl) {
          resultStr = str.substr(0, patternVl) + '-' + str.substr(patternVl, str.length - patternVl)
        }
      } else if (patternArr.length === 3) { // n-n-n 패턴일 경우
        const patternVl1 = Number(patternArr[0])
        const patternVl2 = Number(patternArr[1])
        const patternVlSum = patternVl1 + patternVl2

        if (str.length > patternVl1) {
          if (str.length <= patternVlSum) {
            resultStr = str.substr(0, patternVl1) + '-' + str.substr(patternVl1, str.length - patternVl1)
          } else if (str.length > patternVlSum) {
            resultStr = str.substr(0, patternVl1) + '-' + str.substr(patternVl1, patternVl2) + '-' + str.substr(patternVlSum, str.length - patternVlSum)
          }
        }
      }
      return resultStr
    },
    $_formattingPatternMasking(str, pattern, maskingStart, maskingCnt) {
      const patternArr = pattern.split('-')
      let checkStr = str.slice(-1)
      let result = str
      let formattingChk = false // 별도의 포맷팅 처리 여부
      let mCnt = 0 // 마스킹처리 갯수 체크
      for (let i = 0; i < str.length; i++) {
        const tmp = str.slice(i, i + 1)
        if (tmp === '*') { mCnt++ }
      }

      let sumPatternVl = Number(patternArr[0])
      for (let i = 0; i < patternArr.length; i++) {
        var checkLength = str.length - 1

        if (i === 0) {
          // 최초 포맷팅할 경우
          if (checkLength === Number(patternArr[i]) && checkStr !== '-') {
            formattingChk = true
            const tmp = str.substr(0, checkLength)
            if (str.length + 1 > maskingStart && mCnt < maskingCnt) {
              checkStr = '*'
            }
            result = tmp + '-' + checkStr
            return result
          }
        } else {
          // 최초 포맷팅 이후에는 포맷팅 갯수만큼 더해진 length 체크
          const addCnt = i
          sumPatternVl = sumPatternVl + Number(patternArr[i])

          if (checkLength === (sumPatternVl + addCnt) && checkStr !== '-') {
            formattingChk = true
            const tmp = str.substr(0, (sumPatternVl + addCnt))

            if (str.length + 1 > maskingStart && mCnt < maskingCnt) {
              checkStr = '*'
            }
            result = tmp + '-' + checkStr
            return result
          }
        }
      }

      if (!formattingChk) {
        if (str.length + 1 > maskingStart && mCnt < maskingCnt) {
          checkStr = '*'
          result = result.substr(0, result.length - 1) + checkStr
        }
      }

      return result
    },
    /**
     * 소문자 입력 시, 대문자 전환
     * 작성자 : 송정아
     */
    $_toUpperCase(str) {
      const checkStr = str.slice(-1)
      const regex = /^[a-z]+$/
      let result = str

      if (regex.exec(checkStr) !== null) {
        result = str.toUpperCase()
      }
      return result
    },
    $_validCheckRrno(str) {
      let resultMsg = ''
      let chk = true

      // 숫자만 입력되었는지 확인
      chk = this.$_checkFullNumber(str)
      if (!chk) { resultMsg = '숫자' }

      // 자릿수 확인(13자리)
      if (str.length !== 13) {
        chk = false
        resultMsg = '13자리 숫자'
      }

      if (chk) {
        // 유효성검사(맨끝자리를 제외한 각자리의 숫자를 순서대로 곱해서 합을 구한다음 11로 나눈 나머지를 11로 뺀 숫자와 끝자리 비교)
        const vArr = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
        let sum = 0
        const endStr = str.slice(-1)
        for (let i = 0; i < str.length - 1; i++) {
          const tmp = str.slice(i, i + 1)
          const calc = Number(tmp) * Number(vArr[i])
          sum = sum + calc
        }
        const cValue = 11 - (sum % 11)
        const lastValue = (cValue + '').slice(-1)

        if (Number(endStr) !== Number(lastValue)) {
          resultMsg = '유효한 주민등록번호'
        }

        for (let i = 0; i < str.length; i++) {
          const tmp = str.slice(i, i + 1)
          if (tmp === '-') {
            str = str.replace('-', '')
          }
        }
      }

      return resultMsg
    },
    $_validCheckCorpno(str) {
      let resultMsg = ''
      let chk = true

      // 유효성검사(맨끝자리를 제외한 각자리의숫자를 순서대로 곱해서 합을 구한 다음 10으로 나눈 나머지를 10으로 뺀 숫자와 끝자리 비교)
      const vArr = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
      let sum = 0
      const endStr = str.slice(-1)

      for (let i = 0; i < str.length; i++) {
        const tmp = str.slice(i, i + 1)
        if (tmp === '-') {
          str = str.replace('-', '')
        }
      }

      // 숫자만 입력되었는지 확인
      chk = this.$_checkFullNumber(str)
      if (!chk) { resultMsg = '숫자' }

      // 자릿수 확인(13자리)
      if (str.length !== 13) {
        chk = false
        resultMsg = '13자리 숫자'
      }

      if (chk) {
        for (let i = 0; i < str.length - 1; i++) {
          const tmp = str.slice(i, i + 1)
          const calc = Number(tmp) * Number(vArr[i])

          sum = sum + calc
        }
        const cValue = 10 - Number(sum % 10)

        let failCheck = cValue
        if (cValue === 10) {
          failCheck = 0
        }

        if (failCheck !== Number(endStr)) {
          resultMsg = '유효한 법인등록번호'
        }
      }

      return resultMsg
    },
    $_validCheckBrno(str) {
      let resultMsg = ''
      let chk = true

      // 유효성검사(맨끝자리를 제외한 각자리의 숫자를 순서대로 곱해서 합을 구한다음 (8자리까지와 9자리 로직 다름) 마지막 숫자를 더한 값이 10의 자리 수일때 유효)
      const vArr = [1, 3, 7, 1, 3, 7, 1, 3, 5]
      let sum = 0
      const endStr = str.slice(-1)

      for (let i = 0; i < str.length; i++) {
        const tmp = str.slice(i, i + 1)
        if (tmp === '-') {
          str = str.replace('-', '')
        }
      }

      // 숫자만 입력되었는지 확인
      chk = this.$_checkFullNumber(str)
      if (!chk) { resultMsg = '숫자' }

      // 자릿수 확인(10자리)
      if (str.length !== 10) {
        chk = false
        resultMsg = '10자리 숫자'
      }

      if (chk) {
        for (let i = 0; i < str.length - 1; i++) {
          const tmp = str.slice(i, i + 1)
          const calc = Number(tmp) * Number(vArr[i])

          // 9번째 자리수 별도 로직 적용
          if (i === 8) {
            if (calc < 10) {
              sum = sum + (calc % 10)
            } else {
              sum = sum + parseInt(calc / 10) + Number(calc % 10)
            }
          } else {
            sum = sum + (calc % 10)
          }
        }
        const cValue = (sum + Number(endStr)) % 10

        if (cValue !== 0) {
          resultMsg = '유효한 사업자등록번호'
        }
      }

      return resultMsg
    }
  },
  filters: {
    numberWithCommas(x) {
      if (!x || isNaN(x)) {
        return 0
      }

      const xStr = x.toString()
      const xArr = xStr.split('.')
      const xRs = xArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      let xPoint = xArr[1]
      if (xPoint === undefined) {
        xPoint = ''
      } else {
        xPoint = '.' + xPoint
      }
      // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return xRs + xPoint
    },

    parseTime(x, dateFormat) {
      const dt = new Date(x)
      let format = '{y}-{m}-{d} {h}:{i}'
      if (dateFormat) {
        format = dateFormat
      }
      return parseTime(dt, format)
    }
  }
}
