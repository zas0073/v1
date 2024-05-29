// Util
import { sendGetParams, sendPostData } from '@/api/fwCmn/api'
// import { sendGetParams, sendPostData } from '@/api/fwCmn/api'
import { stringFormatUtil } from '@/api/fwCmn/stringFormatUtil'
import { parseTime } from '@/utils'
import { maskPhoneNumber, maskRrgsNo, maskEtc, maskJuso, toTimeFormat } from '@/filters'

// Dialog 팝업 관련 API
import dialogMixin from '@/mixins/dialog-mixins'
// 화면권한 관련
import cpntAuth from '@/api/fwCmn/cpntAuth'
// 공통코드
import LmsCmnCd from '@/form-model/fwCmn/lmsCmnCd'
import LmsSearch from '@/form-model/cmn/lmsSearch'
import { getCmnCodeByGrpCode } from '@/utils/common-code'
import LmsAppUseTrace from '@/form-model/fwCmn/lmsAppUseTrace'
 /*
	lmsCmnUtil.js 를 import 한경우 개별화면에서 중복 import 발생하지않게 유의
 */
export default {
	components:
	{
		LmsAppUseTrace
	},
	mixins: [dialogMixin, stringFormatUtil, cpntAuth],
	data() {
		return {
			dialogKey: 0,
			isModal: false,
			cmnCdList: [],
			formName: '',
			excelExportForm: {
				header: '',
				data: '',
				filterVal: '',
				sheetname: '',
				filename: '',
				bookType: '',
				fileInfo: '',
				titleRow: '',
				autoWidth: '',
				addDat: ''
			},
            excelLogForm: {
                route: '', // ASIS PHP_SELF
                filrNm: '',
                reqDttm: '',
                recordCount: 0,
				userId: this.$store.state.user.userId
            }
		}
	},
	methods: {
		filterCode(targetCode, codList) {
		  return this.$options.filters.cmnCode(targetCode, codList)
		},

		/**
		 * 설명 : 오늘날짜
		 * @author 신지연
		 * @returns 'YYYYMMDD'
		 */
		$_getToday() {
			return parseTime(new Date(), '{y}{m}{d}')
		},
		/* 옵션 안내
		* 팝업 움직일 수 있게 ==> v-draggable (default-고정)
		* 바탕 까맣게 되지 않게 ==> :modal="false" (default-true)
		*/

		/**
		 * 설명 : 모달 다이얼로그 오픈(권장)
		 * @author 신지연
		 */
		$_lmsModal(cpntFileNm, formName, callback) {
			this.isModal = true
			this.formName = formName == null ? 'popupForm' : formName
			this.callPopup(cpntFileNm, callback)
		},

		/**
		 * 설명 : 팝업 다이얼로그 오픈(권장하지않음)
		 *       (바탕이 음영처리 되지않으나, 모달리스 기능은 수행되지않음.)
		 * @author 신지연
		 */
		$_lmsPopup(cpntFileNm, formName, callback) {
			this.isModal = false
			this.formName = formName == null ? 'popupForm' : formName
			this.callPopup(cpntFileNm, callback)
		},

		/**
		 * 설명 : 개발자 직접사용 불가
		 * @author 신지연
		 */
		callPopup(cpntFileNm, callback) {
			++this.dialogKey
			const formName = this.formName
			var cpntName = cpntFileNm
			const underBarIndex = cpntName.indexOf('_')
			const slashIndex = cpntName.indexOf('/')
			if (underBarIndex === 0 && slashIndex > 0) {
				cpntName = cpntName.substring(slashIndex + 1)
			}
			if (!Object.keys(this[formName]).length ||
				((this.$_isNull(this[formName].data) || Object.keys(this[formName].data).length < 1) &&
				this.$_isNull(this[formName].cpntNm))) {
				this.$_lmsPopupOpen(cpntFileNm, formName, cpntName)
			} else {
				this.$_lmsPopupOpenMod(cpntFileNm, formName, this.lmsCmnPopupCallBack)
				// this[formName].data = Object.assign(this[formName].data, data)
				this[formName].useComponent = cpntFileNm
			}
		},
		/**
		 * 설명 : 개발자 직접사용 불가
		 * @author 신지연
		 */
		lmsCmnPopupCallBack(e) {
			const formName = this.formName
			const cpntNm = !this.$_isNull(this[formName].cpntNm) ? this[formName].cpntNm : null
			this[formName] = Object.assign(this[formName], e)
			if (cpntNm != null) {
				this[formName].cpntNm = cpntNm
			}

			if (this[formName].cpntFileNm !== 'undefined' && this[formName].cpntFileNm !== null &&
			this[formName].cpntNm !== 'undefined' && this[formName].cpntNm !== null) {
				if (this[formName].cpntMngtNo !== 'undefined' && this[formName].cpntMngtNo !== null && this[formName].cpntMngtNo !== '') {
					if (!this[formName].cpntNm.startsWith('[')) { this[formName].cpntNm = '[' + this[formName].cpntMngtNo + '] ' + this[formName].cpntNm }
				} else {
					if (!this[formName].cpntNm.startsWith('[')) {
						var fileNmWords = this[formName].cpntFileNm.split('/')
						fileNmWords = fileNmWords.slice(-1)
						this[formName].cpntNm = '[' + fileNmWords[0] + '] ' + this[formName].cpntNm
					}
				}
			}

			this.dialogVisible = true
		},

		/**
		 * 설명 : 공통 단건 조회 모듈화
		 * @author 신지연
		 */
		$_getData(url, value, cdForm, callback) {
			return new Promise((resolve, reject) => {
				sendGetParams(url, cdForm).then(response => {
					this.setChgValue(value, response.data)
					// this[value] = response.data
					resolve(true)

					// 콜백이 필요할때
					if (callback !== undefined) {
						callback(this, response.data)
					}
				}).catch(err => {
					console.log(err)
					reject(false)
				})
			})
		},
		/**
		 * 설명 : 공통코드 단일 조회 모듈화
		 *
		 * @author 임재원 대리
		 * @param {String} cmnGrpCd 공통그룹코드
		 * @param {String} cmnCdArray 리턴 대상 리스트객체
		 * @param {String} uprCmnCd 상위코드 (특정 상위코드의 하위 코드 리스트만 리턴, 상위코드와 일치 비교)
		 * @param {String} xlcdCd 제외코드 (특정 상위코드를 제외한 나머지를 리턴, 공통코드 뒤에서부터 비교)
		 * @returns 코드 리스트
		 *
		 * ex) this.$_getCommonCodeList('TEAM_CD', 'teamCdList', '', '0000') : 상위부서(사업부, 부서)를 제외한 팀 코드만 출력
		 * ex) this.$_getCommonCodeList('TEAM_CD', 'teamCdList', '010000') :  상위부서가 사업부1인 부서만 출력
		 *
		 */
		// CodeDataList API를 사용하여 공통코드 데이터 호출
		$_getCommonCodeList(cmnGrpCd, cmnCdArray, uprCmnCd, xlcdCd) {
			return new Promise((resolve, reject) => {
			const cdForm = new LmsCmnCd()

			// 어떤코드항목을 가져올 것인지 구분자 설정
			cdForm.cmnGrpCd = cmnGrpCd
			cdForm.uprCmnCd = uprCmnCd
			cdForm.xlcdCd = xlcdCd

			// api > CodeDataList 사용
			sendPostData('/fwCmn/cmnCdDataList', cdForm).then(response => {
				this[cmnCdArray] = response.data.list
				resolve(true)
			}).catch(err => {
				console.log(err)
			reject(false)
				})
			})
		},

		/**
		 * 설명 : 공통코드 다건 조회 모듈화
		 * @author 신지연
		 * @param : Object {'CVAP_STCD':'cvapStcdList','CMPN_CD':'cmpnCdList'}
		 */
		// CodeDataList API를 사용하여 데이터 호출
		$_getCommonCodeMultiList(multiCmnGrpCd) {
			return new Promise((resolve, reject) => {
				const cdForm = new LmsCmnCd()
				cdForm.cmnGrpCdList = Object.keys(multiCmnGrpCd)
				// api > CodeDataMultiList 사용
				sendPostData('/fwCmn/cmnCdMultilist', cdForm).then(response => {
					// this.codeByGrpCdAction(response.data.list, multiCmnGrpCd)
					// 받아온 전체 리스트 코드값에 맞게 분할
					Object.keys(multiCmnGrpCd).forEach(CmnGrpCd => {
						this[multiCmnGrpCd[CmnGrpCd]] = getCmnCodeByGrpCode(CmnGrpCd, response.data.list)
					})
					resolve(true)
				}).catch(err => {
					console.log(err)
					reject(false)
				})
			})
		},

		/**
     * 설명 : 공통코드 다건 조회
     * @author 주신우
     *        , commList : 조회된 데이터를 적재할 List
     * @param array
     * @param codeList
     */
    $_getCommonCodeArrayToList(array, codeList) {
      return new Promise((resolve, reject) => {
        const cdForm = new LmsCmnCd()
        cdForm.cmnGrpCdList = array
        // api > CodeDataMultiList 사용
        sendPostData('/fwCmn/cmnCdMultilist', cdForm)
          .then((response) => {
            // this.codeByGrpCdAction(response.data.list, multiCmnGrpCd)
            // 받아온 전체 리스트 코드값에 맞게 분할
            array.forEach((cmnGrpCd) => {
              let codeArray = []
              codeArray = response.data.list.filter((code) => cmnGrpCd === code.cmnGrpCd)
              const object = {
                cmnGrpCd: cmnGrpCd, optionList: codeArray
              }

              codeList.push(object)
            })
            resolve(true)
          })
          .catch((err) => {
            console.log(err)
            reject(false)
          })
      })
    },

		/**
		 * 설명 : 엑셀다운로드 함수 모듈화
		 * @author 신지연
		 * @returns null
		 */
		async $_exportExcel(tableObj, {
			header,
			data,
			filterVal,
			sheetname,
			filename,
			bookType,
			fileInfo,
			titleRow,
			autoWidth,
			addData
		} = {}) {
			console.log('======= 엑셀 출력 시작 = ' + this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
			// 엑셀 고객정보 표기 권한 확인
			const is_Z05 = this.$_getStateFunctionAuth('Z05', this.$store)

			this.excelLogForm.reqDttm = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')

			if (this.$_isNull(data)) {
				data = tableObj._props.data
			}
			const excelData = []
			data.forEach((elm, index) => { excelData[index] = Object.assign({}, elm) })

			if (excelData.length < 1) {
				// await this.$confirm('출력할 데이터가 없습니다. 계속하시겠습니까?(양식출력)')
				this.$alert('조회된 내역이 없습니다.')
				return
			}

			const coltitle = []
			const tfilterVal = []

			if (header == null || header.length < 1 || header[0].length < 1) {
				tableObj.columns.forEach(col => {
					// if (xHeader == null || xHeader.length < 1 || xHeader.indexOf(col.label) < 0)	{// 제외칼럼이 아닌 경우
					if (col.type !== 'hidden' && col.type !== 'selection' && col.type !== 'expand') {	// 제외칼럼, 체크박스, 토글
						coltitle.push(col.label)

						if (this.$_isNull(col.type) || col.type === 'default') {
							tfilterVal.push(col.property)
						} else {
							// 최동용: 2021-10-21 type=index항목 추가
							if (col.type === 'index') {
								col.property = '$index'
								excelData.forEach((obj, index, arr) => {
									obj[col.property + '_shadow'] = index + 1
								})
							} else if (col.type === 'date') {
								excelData.forEach(obj => {
									if (!this.$_isNull(obj[col.property])) {
										obj[col.property + '_shadow'] = this.$moment(obj[col.property]).format('YYYY-MM-DD')
									}
								})
							} else if (col.type === 'datetime') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = toTimeFormat(obj[col.property], 'yyyyLLddhhmmss', 'yyyy-LL-dd HH:mm:ss')
								})
							} else if (col.type === 'dateHM') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = toTimeFormat(obj[col.property], 'yyyyLLddhhmmss', 'yyyy-LL-dd HH:mm')
								})
							} else if (col.type === 'dateHms') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = toTimeFormat(obj[col.property], 'hhmmss', 'HH:mm:ss')
								})
							} else if (col.type === 'dateHms') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = toTimeFormat(obj[col.property], 'hhmmss', 'HH:mm:ss')
								})
							} else if (col.type === 'dateMS') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = obj[col.property].substring(0, 2) + ':' + obj[col.property].substring(2, 4) + ':' + obj[col.property].substring(4, 6) + '.' + obj[col.property].substring(6, 8)
								})
							} else if (col.type === 'phone') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = this.$_stringToPhoneNo(obj[col.property])
								})
							} else if (col.type === 'maskPhone') {
								excelData.forEach(obj => {
									let formatNum = ''
									try {
										formatNum = this.$_stringToPhoneNo(obj[col.property])
									} catch (e) {
										formatNum = obj[col.property]
									}
									obj[col.property + '_shadow'] = maskPhoneNumber(formatNum)
								})
							} else if (col.type === 'maskAccno') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = maskEtc(obj[col.property], 3, 5)
								})
							} else if (col.type.indexOf('maskNm') === 0) {
								let maskNm = ''
								excelData.forEach(obj => {
									if (this.$_isNull(obj[col.property])) {
										maskNm = ''
									} else {
										maskNm = obj[col.property]
										// 2021.09.29 차주명 마스킹 해제
										/*
										let maskFlag = true
										if (col.property === 'brwNm') {
											maskFlag = obj['brwDscd'] === '03'
										} else {
											const maskFlagCol = col.type.split('|')[1]
											maskFlag = this.$_isNull(maskFlagCol) ? true : obj[maskFlagCol]
										}
										if (maskFlag === null || maskFlag !== false) {	// 개인인 경우
											if (obj[col.property].length > 3) {
												maskNm = maskEtc(obj[col.property], 1, 2)
											} else {
												maskNm = maskEtc(obj[col.property], 1, 1)
											}
										} else {
											maskNm = obj[col.property]
										}
										*/
									}
									obj[col.property + '_shadow'] = maskNm
								})
							} else if (col.type === 'exstYn') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = this.$_isNull(obj[col.property]) ? '부' : '여'
								})
							} else if (col.type.indexOf('code') === 0) {
								const list = this[col.type.split('|')[1]]
								if (!this.$_isNull(list) && list.length > 0) {
									excelData.forEach(obj => {
										obj[col.property + '_shadow'] = this.$_findValue('cmnCd', 'cmnCdNm', obj[col.property], list)
									})
								}
							} else if (col.type === 'numberWithCommas') {
								excelData.forEach(obj => {
									if (this.$_isNull(obj[col.property])) {
										obj[col.property + '_shadow'] = ''
									} else {
										obj[col.property + '_shadow'] = this.$_formattingCommaAmt(obj[col.property].toString())
									}
								})
							} else if (col.type === 'maskRbno') {
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = this.$_maskRbno(obj[col.property])
								})
							}

							if (col.type.indexOf('nameMasking') !== -1) {
								// Z05 권한 마스킹 처리 로직 추가(2022.12.07) - 고객명
								excelData.forEach(obj => {
									if (col.type.indexOf('code') !== -1) {
										// 공통 code Mapping인 경우
										obj[col.property + '_shadow'] = this.$_nameMasking(obj[col.property + '_shadow'], is_Z05)
									} else {
										obj[col.property + '_shadow'] = this.$_nameMasking(obj[col.property], is_Z05)
									}
								})
							} else if (col.type.indexOf('phoneMasking') !== -1) {
								// Z05 권한 마스킹 처리 로직 추가(2022.12.07) - 고객 휴대폰 번호
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = this.$_phoneMasking(obj[col.property], true, is_Z05)
								})
							} else if (col.type.indexOf('rsdtMasking') !== -1) {
								// Z05 권한 마스킹 처리 로직 추가(2022.12.07) - 고객 주민번호
								excelData.forEach(obj => {
									obj[col.property + '_shadow'] = this.$_rsdtMasking(obj[col.property], true, is_Z05)
								})
							}
							tfilterVal.push(col.property + '_shadow')
						}
					}
				})
				header = []
				header.push(coltitle)
				filterVal = tfilterVal
			}

			if (titleRow == null) {
				titleRow = 0
			}
			if (addData == null) {
				addData = [[]]
			}
			if (autoWidth == null) {
				autoWidth = true
			}
			if (sheetname == null) {
				sheetname = ['Sheet1']
			}

			import('@/vendor/Export2Excel').then(excel => {
				data = [excelData.map(v => filterVal.map(j => { return v[j] }))]

				if (fileInfo) {
					// 전혁준 추가
					fileInfo.reqDttm = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
					fileInfo.recordCount = excelData.length
				}

				excel.export_json_excel_multi_sheet({
					header,
					data,
					sheetname,
					filename,
					bookType,
					fileInfo,
					titleRow,
					autoWidth,
					addData
				})
				this.downloadLoading = false
				// excelLogForm 셋팅
				this.excelLogForm.route = this.$route.path
				this.excelLogForm.fileNm = filename + '.' + bookType
				this.excelLogForm.recordCount = excelData.length
				this.insertExcelLog(this.excelLogForm)
			})
			console.log('======= 엑셀 출력 끝 = ' + this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
		},

        /**
         * 설명 : 엑셀로그입력(Export 성공 시 호출)
         * @author 전혁준
         * @param excelLogForm
         * @returns null
         */
		async insertExcelLog(excelLogForm) {
            return new Promise((resolve, reject) => {
                sendPostData('/fwCmn/insertExcelLog', this.excelLogForm).then(response => {
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                    reject(false)
                })
            })
		},
		/**
		 * 설명 : 엑셀다운로드(양식다운로드용)
		 * @author 신지연
		 * @returns null
		 */
		async $_exportTemplate(tableObj, {
			header,
			data,
			filterVal,
			sheetname,
			filename,
			bookType,
			titleRow,
			autoWidth,
			addData
		} = {}) {
			if (this.$_isNull(data)) {
				data = tableObj._props.data
			}
			const excelData = []
			data.forEach((elm, index) => { excelData[index] = Object.assign({}, elm) })

			// if (excelData.length < 1) {
			// 	await this.$confirm('출력할 데이터가 없습니다. 계속하시겠습니까?(양식출력)')
			// }
			const coltitle = []
			const tfilterVal = []

			if (header == null || header.length < 1 || header[0].length < 1) {
				tableObj.columns.forEach(col => {
					if (col.type !== 'hidden' && col.type !== 'selection' && col.type !== 'expand') {	// 제외칼럼, 체크박스, 토글
						coltitle.push(col.label)

						if (this.$_isNull(col.type) || col.type === 'default') {
							tfilterVal.push(col.property)
						}
					}
				})
				header = []
				header.push(coltitle)
				filterVal = tfilterVal
			}

			if (titleRow == null) {
				titleRow = 0
			}
			if (addData == null) {
				addData = [[]]
			}
			if (autoWidth == null) {
				autoWidth = true
			}
			if (sheetname == null) {
				sheetname = ['Sheet1']
			}

			import('@/vendor/Export2Excel').then(excel => {
				data = [excelData.map(v => filterVal.map(j => { return v[j] }))]

				excel.export_json_excel_multi_sheet({
					header,
					data,
					sheetname,
					filename,
					titleRow,
					autoWidth,
					bookType,
					addData
				})
				this.downloadLoading = false
			})
		},

		/**
		 * 설명 : list 에서 compareKey 값이 compareValue와 일치하는 rowdata를 찾아 findKey의 값을 return.
		 * @author 신지연
		 * @returns
		 * ex) $_findValue('cmnCd', 'cmnCdNm', '01', codelist)
		 */
		$_findValue(compareKey, findKey, compareValue, list) {
			if (compareValue == null) compareValue = ''
			const item = list.find(e => e[compareKey] === compareValue)
			if (!item) return ''
			return item[findKey]
		},
		/**
		 * 설명 : 해당일자 영업일 여부
		 * @author 신지연
		 * @returns Y/N
		 * ex) $_getBizDayYN('value', '20210826')
		 */
		$_getBizDayYN(value, stndDt) {
			return this.$_getBizDay(value, stndDt, 'YN')
		},
		/**
		 * 설명 : 해당일자 전영업일
		 * @author 신지연
		 * @returns YYYYMMDD
		 * ex) $_getBfBizDay('value','20210826')
		 */
		$_getBfBizDay(value, stndDt) {
			return this.$_getBizDay(value, stndDt, 'BD')
		},
		/**
		 * 설명 : 해당일자가 속한 월말 영업일자
		 * @author 신지연
		 * @returns YYYYMMDD
		 * ex) $_getLstBizDay('value','20210826')
		 */
		$_getLstBizDay(value, stndDt) {
			return this.$_getBizDay(value, stndDt, 'ML')
		},
		/**
		 * 설명 : 구분에 따른 영업일자 (BD : 해당일자 전영업일, ML : 해당일자가 속한 월말 영업일자, YN : 해당일자 영업일 여부)
		 * @author 신지연
		 * @returns YYYYMMDD or Y/N
		 * ex) $_getBizDay('biznDt', '20210826','BD')
		 */
		$_getBizDay(value, stndDt, gbn) {
			if (!this.$_isNull(value) && !this.$_isNull(gbn)) {
				const searchForm = new LmsSearch()
				searchForm.stndDt = stndDt
				searchForm.keywordType = gbn
				this.$_getData('/cmn/getBiznDt', value, searchForm)
			}
		},
		/**
		 * 설명 : 이름(마스킹-개인만 마스킹)
		 * @author 신지연
		 * @returns
		 * ex) $_maskNm(data.brwNm, false)
		 */
		$_maskNm(value, isPs) {	// 이름(마스킹-개인만 마스킹)(개인이 아닌경우 false 전달)
			const tmp = value
			// 2021.09.29 차주명 마스킹 해제
			// if ((isPs === null || isPs !== false) && value != null) {	// 개인인 경우
			//	if (value.length > 3) tmp = maskEtc(value, 1, 2)
			//	else tmp = maskEtc(value, 1, 1)
			// }
			return tmp
		},
		/**
		 * 설명 :주민/사업자등록번호 포멧팅 및 마스킹 (주민등록번호만 마스킹)
		 * @author 신지연
		 * @returns
		 * ex) $_maskRbno(data.rbNo)
		 */
		$_maskRbno(value) {	// 주민사업자등록번호(주민등록번호만 마스킹)
			let tmp = ''
			if (!this.$_isNull(value) && value.length === 10) tmp = this.$_stringToBrno(value)
			else tmp = maskRrgsNo(this.$_stringToRrgsNo(value), 6)
			return tmp
		},
		/**
		 * 설명 :상세주소 마스킹
		 * @author 김유진
		 * @returns
		 * ex) $_maskDetladr(data.detladr)
		 */
		$_maskDetladr(value) {
		if (!value) return ''
        const arr = value.toString().split('')
        return arr.reduce((result, s, index) => {
        if (s === ' ') {
            result += index < 0 ? s : ' '
            return result
        } else {
            result += index < 0 ? s : '*'
        return result
        }
        }, '')
		},
		/**
		 * 설명 : INPUT 입력 시 제한사항 셋팅 함수(sample-coding-guide내의 함수 이동)
		 ** 본함수에 대한 문의는 송정아 과장님께**
		 * @author 신지연
		 * @returns
		 * ex) handleChange('lmsForm.brwNo', $event, 4)
		 */
		handleChange(column, str, gbn) {
			const endStr = str.slice(0, -1)

			if (gbn === 1) { // 한글만
				const hangleChk = this.$_checkHangle(str)
				if (!hangleChk) {
				this.setChgValue(column, endStr)
				// this[column] = endStr
				}
			}

			if (gbn === 2) { // 숫자만
				const numberChk = this.$_checkNumber(str)
				if (!numberChk) {
					this.setChgValue(column, endStr)
				// this[column] = endStr
				}
			}

			if (gbn === 3) { // 콤마포맷팅 (숫자만)
				// 실제 입력데이터 저장
				const amt = this.$_defaultCommaAmt(str)
				this[column + 'Org'] = amt

				const numberChk = this.$_checkNumber(str)
				if (!numberChk) {
					this.setChgValue(column, endStr)
				// this[column] = endStr
				return
				}
				const commaAmt = this.$_formattingCommaAmt(str)
				this.setChgValue(column, commaAmt)
				// this[column] = commaAmt
			}

			if (gbn === 4) { // 대문자 전환 (영어만)
				const charChk = this.$_checkChar(str)

				if (!charChk) {
					this.setChgValue(column, endStr)
				// this[column] = endStr
					return
				}
				const upperCase = this.$_toUpperCase(str)
				this.setChgValue(column, upperCase)
				// this[column] = endStr
			}

			if (gbn === 5) { // 특수문자
				const charChk = this.$_checkSpecialChar(str)
				if (!charChk) {
					this.setChgValue(column, endStr)
					// this[column] = endStr
				}
			}

			if (gbn === 6) { // 날짜포맷팅 (숫자만)
				// 실제 입력데이터 저장
				const dt = this.$_defaultPattern(str)
				this[column + 'Org'] = dt

				const numberChk = this.$_checkNumber(str)
				if (!numberChk) {
					this.setChgValue(column, endStr)
				// this[column] = endStr
					return
				}
				const formatDt = this.$_formattingDate(str)
				this.setChgValue(column, formatDt)
				// this[column] = endStr
			}

			if (gbn === 7) { // 패턴 포맷팅 (숫자만)
				// ex) 주민등록번호의 경우 6-7, 카드번호의 경우 4-4-4-4 등 데이터 성격에 맞추어 지정하여 사용
				const pattern = '6-7'
				const patternStr = this.$_formattingPattern(str, pattern)

				// 실제 입력데이터 저장
				const pStr = this.$_defaultPattern(str)
				this[column + 'Org'] = pStr

				this.setChgValue(column, patternStr)
				// this[column] = endStr
			}

			if (gbn === 8) { // 패턴포맷팅 + 패턴 암호화
			// ex) 계좌번호 123-***-**56789
				const pattern = '3-3-6'
				const maskingStart = 4
				const maskingCnt = 5

				// 실제 입력데이터 저장
				const pStr = this.$_defaultPatternMasking(str, this[column + 'Org'])
				this[column + 'Org'] = pStr

				const patternStr = this.$_formattingPatternMasking(str, pattern, maskingStart, maskingCnt)

				this.setChgValue(column, patternStr)
				// this[column] = endStr
			}

			if (gbn === 9) { // 콤마 적용
				if (str.indexOf(',') > -1) { // , 가 있을 경우
					str = str.replace(/,/g, '')
				} else if (str.substring(0, 1) === '0' && str.length > 1) { // 기존 값이 0 일경우 0 제거
					str = ''
				}

				// 숫자 패턴 검사
				const numberChk = this.$_checkNumber(str)
				if (!numberChk) {
					this.setChgValue(column, endStr)
					return false
				}

				// 실제 입력데이터 저장
				const pStr = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				this.setChgValue(column, pStr)
			}
		},
		setChgValue(keyStr, endStr) {
			const keyArr = keyStr.split('.')
			if (keyArr.length > 1) {
				this[keyArr[0]][keyArr[1]] = endStr
			} else {
				this[keyArr[0]] = endStr
			}
		},
		/**
		 * 설명 : 특정 화면에 대한 수정권한 여부 리턴
		 * @author 송정아
		 * @returns
		 * ex) $_getStateUptAuthYn(화면번호)
		 */
		// 미사용으로 인한 제거
		// store.state로 옮김 - by 임재원 대리 2022.09.19
		// $_getStateUptAuthYn(cpntId) {
		// 	// 상세 구현은 cpntAuth.js
		// 	this.getStateUptAuthYn(cpntId)
		// },
		/**
		 * 해당 컴포넌트에서 조회, 입력, 수정삭제 기능을 사용할 수 있는지 여부 세팅하는 함수
		 * @author 임재원 대리
		 * @param {String} cpntId 화면번호
		 */
		// 미사용으로 인한 제거
		// store.state로 옮김 - by 임재원 대리 2022.09.19
		$_getStateCRUDAuth(store, cpntId) {
			this.cpntCrudAuth = (store.getters['detailAuthMap'][cpntId] !== undefined) ? store.getters['detailAuthMap'][cpntId].crudAuth : ''
		},
		/**
		 * 해당 기능 권한을 사용할 수 있는지 여부를 리턴하는 함수
		 * @author 임재원 대리
		 * @param {String} cpntId 화면번호
		 */
		$_getStateFunctionAuth(cpntId, store) {
			var functionAuth = (store.getters['detailAuthMap'][cpntId] !== undefined) ? store.getters['detailAuthMap'][cpntId].crudAuth : ''
			return (functionAuth === 'Y')
		},
		/**
		 * 해당 컴포넌트에서 조회, 입력, 수정삭제 기능을 사용할 수 있는지 여부를 리턴하는 함수
		 * @author 임재원 대리
		 * @param {String} requiredCRUDAuth 필요 권한 ('R' 읽기, 'C': 쓰기 ,'RC': 읽기 및 쓰기)
		 */
		// 미사용으로 인한 제거
		// store.state로 옮김 - by 임재원 대리 2022.09.19
		// $_isShowableByCRUDAuth(requiredCRUDAuth) {
		// 	const splittedRequiredCRUDAuth = requiredCRUDAuth.split('')
		// 	let result = true

		// 	for (let i = 0; i < splittedRequiredCRUDAuth.length; i++) {
		// 		if (this.cpntCrudAuth.indexOf(splittedRequiredCRUDAuth[i]) < 0) {
		// 			result = false
		// 		}
		// 	}

		// 	return result
		// },
		$_isShowable(requiredCRUDAuth, route) {
			this.cpntCrudAuth = route.meta.crudAuth
			const splittedRequiredCRUDAuth = requiredCRUDAuth.split('')
			let result = true
			for (let i = 0; i < splittedRequiredCRUDAuth.length; i++) {
				if (this.cpntCrudAuth.indexOf(splittedRequiredCRUDAuth[i]) < 0) {
					result = false
				}
			}

			return result
		},

		/**
		 * 설명 : 특정 화면에 대한 접근권한 여부 리턴
		 * @author 신지연
		 * @returns
		 * ex) $_getMenuAuthYn(화면번호)
		 */
		$_getMenuAuthYn(cpntId) {
			return this.getMenuAuthYn(cpntId)
		},

		/**
		 * 설명 : 금액 변환 관련
		 * @author 배경호
		 * @returns
		 * ex)  $_typeChange('addComma', 12345)
		 */
		$_typeChange(type, amt) {
			if (type === 'addComma') {
				return String(amt).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			} else if (type === 'removeComma') {
				if (amt === undefined || amt === 'null') {
					return ''
				} else if (typeof (amt) === 'number') {
					return String(amt)
				} else {
					return amt.replace(/,/g, '')
				}
			} else if (type === 'calc') {
				if (typeof (amt) === 'number') {
					return amt
				} else if (this.$_isNull(amt)) {
					return 0
				} else {
					return parseInt(amt.replace(/,/g, ''))
				}
			}
		},
		/**
		 * 설명 : 금액 변환 관련
		 * @author 배경호
		 * @returns
		 * ex)  $_removeComma('list', 'aaa')
		 */
		$_removeComma(listNm, columnList) {
			const keyArr = listNm.split('.')
			if (keyArr.length > 1) {
				for (let i = 0; i < columnList.length; i++) {
					for (let j = 0; j < this[keyArr[0]][keyArr[1]].length; j++) {
						this[keyArr[0]][keyArr[1]][j][columnList[i]] = this.$_typeChange('calc', this[keyArr[0]][keyArr[1]][j][columnList[i]])
					}
				}
			} else {
				for (let i = 0; i < columnList.length; i++) {
					for (let j = 0; j < this[keyArr[0]].length; j++) {
						this[keyArr[0]][j][columnList[i]] = this.$_typeChange('calc', this[keyArr[0]][j][columnList[i]])
					}
				}
			}
		},
		$_checkNumberWithMinus(val) {
			const regex = /^[-0-9]+$/
			const reg = /[^-0-9]/g
			let res = val

			if (regex.exec(val) === null) {
				res = val.replace(reg, '')
			}
			return res
		},
		// 유형변경) 그리드 출력시 숫자 포맷 지정
		$_numberFormatter(row, column, cellValue, index) {
			const num = Number(cellValue)
			if (!isNaN(num)) {
				return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
			} else {
				return 0
			}
		},
		// 유형변경) 그리드 출력시 일자 포맷 지정
		$_dateFormatter(row, column) {
			const date = row[column.property]
			if (date === undefined || date === null) {
				return ''
			}
			const moment = require('moment') // moment 모듈불러오기
			return moment(date).format('YYYY-MM-DD')
		},
			// SPC검색
		$_handleSearchSpc(form) {
			this.popupForm = {}
			this.popupForm.data = Object.assign({}, this[form])
			this.$_lmsPopup('SPC3099-01P')
		},
			// 차주검색
		$_handleSearchBrw(form) {
			this.popupForm = {}
			this.popupForm.data = Object.assign({}, this[form]) // 필요한 정보만 전달해도 됨 {SPC관리번호:'', 차주번호:''}
			this.$_lmsPopup('BRW4001-01P')
		},
		// 검색조건 자동 바인드
		$_bindCallBackSearchForm(form, targetColumnList, data) {
			for (let i = 0; i < targetColumnList.length; i++) {
				if (this[data].length > 0) {
					if (!this.$_isNull(this[data][0][targetColumnList[i]])) {
						this[form][targetColumnList[i]] = this[data][0][targetColumnList[i]]
					}
				}
			}
		},
		// 검색조건(spc관리번호) 삭제시 명도지워지도록
		$_searchFormInit(form, columnNo, columnNm) {
			if (this.$_isNull(this[form][columnNo])) {
				this[form][columnNm] = ''
			}
		},
		$_insertAppUseTrace(menuNo, taskType, taskDescription, userId) {
			return new Promise((resolve, reject) => {
			const lmsForm = new LmsAppUseTrace()

			lmsForm.menuNo = menuNo
			lmsForm.taskType = taskType
			lmsForm.taskDescription = taskDescription
			lmsForm.fstRegsUserId = userId
			lmsForm.fstChgUserId = userId

			// api > CodeDataList 사용
			sendPostData('/fwCmn/insertAppUseTrace', lmsForm).then(response => {
				resolve(true)
			}).catch(err => {
				console.log(err)
			reject(false)
				})
			})
		},
		/**
		 *	설명 : 카멜표기법 -> 스네이크표기법
		 *	@author 강신선
		*/
		$_camelToUnderscore(key) {
			var result = key.replace(/([A-Z])/g, ' $1')
			return result.split(' ').join('_').toUpperCase()
		},

		/**
		 * 설명 : 부점목록조회
		 *
		 * @author 권민수
		 * @param {String} branchCdArray 리턴 대상 리스트객체
		 * @returns 부점 리스트
		 *
		 * ex) this.$_getBranchList('branchList') :  부점목록조회
		 *
		 */
		// BranchList API를 사용하여 공통코드 데이터 호출
		$_getBranchList(branchCdArray) {
			return new Promise((resolve, reject) => {
			// api > CodeDataList 사용
			sendPostData('/fwCmn/branchList').then(response => {
				this[branchCdArray] = response.data.list
				resolve(true)
			}).catch(err => {
				console.log(err)
			reject(false)
				})
			})
		},

		/**
		 * 설명 : 에이전트목록조회
		 *
		 * @author 권민수
		 * @param {String} agentCdList 에이전트코드(입력)
		 * @param {String} agentArray 리턴 대상 리스트객체
		 * @returns 에이전트 리스트
		 *
		 * ex) this.$_getAgentList('', 'agnetList' ) :  에이전트전체목록조회
		 * ex) this.$_getAgentList(this.agentCdList, 'agnetList') :  에이전트목록조회
		 */
		$_getAgentList(agentCdList, agentArray) {
			return new Promise((resolve, reject) => {
			const form = {
				'agentCdList': []
			}

			form.agentCdList = agentCdList

			// api > CodeDataList 사용
			sendPostData('/fwCmn/agentList', form).then(response => {
				this[agentArray] = response.data.list
				resolve(true)
			}).catch(err => {
				console.log(err)
			reject(false)
				})
			})
		},
		/**
		 * 설명 : sms동일 발송건수 조회
		 *
		 * @author 강신선
		 * @returns sms동일 발송건수
		 *
		 * ex) '리턴대상변수', MEMBER_LIST_NO, CONTRACT_INFO_NO, SMS_DIV, MSG_BODY
		 * ex) this.$_smsOneChke('data', 000001, null, '3', '키움저축은행입니다.신청하신대출은정상적으로취소처리되었습니다.감사합니다.') :  sms동일 발송건수 조회
		 *
		 */
		$_smsOneChke(data, mno, cno, code, msg) {
			return new Promise((resolve, reject) => {
				sendPostData('/fwCmn/getSmsDayDupList', { 'memberListNo': mno, 'contractInfoNo': cno, 'smsDiv': code, 'msgBody': msg }).then(res => {
					this[data] = res.data.metaData.total
					resolve(true)
				}).catch(err => {
					reject(false)
					console.log(err)
				})
			})
		},
		/**
		 * 설명 : 보낸 메시지 건수 체크
		 *
		 * @author 강신선
		 * @returns true, false
		 *
		 * ex) '리턴대상변수', 발송사유코드, MEMBER_LIST_NO or CONTRACT_INFO_NO, 구분(erp,ups)
		 * ex) this.$_smsCntCheck('data', 10, 999999999, 'erp') :  보낸 메시지 건수 체크
		 *
		 */
		$_smsCntCheck(data, sndn, no, div) {
			return new Promise((resolve, reject) => {
				sendPostData('/fwCmn/getSmsCntCheck', { 'sndngRsnCd': sndn, 'no': no, 'div': div }).then(res => {
					this[data] = res.data
					resolve(true)
				}).catch(err => {
					reject(false)
					console.log(err)
				})
			})
		},

		/**
		 * 설명 : 직원목록조회
		 *
		 * @author 권민수
		 * @param {String} empId 직원ID
		 * @returns 직원 리스트
		 *
		 * ex) this.$_getEmpList('empArray') :  직원목록조회
		 *
		 */
		// empIdArray API를 사용하여 공통코드 데이터 호출
		$_getEmpList(empId, empArray) {
			return new Promise((resolve, reject) => {
			// api > CodeDataList 사용
			sendPostData('/fwCmn/empList', { 'empId': empId }).then(response => {
				this[empArray] = response.data.list
				resolve(true)
			}).catch(err => {
				console.log(err)
			reject(false)
				})
			})
		},
		/**
		 * 설명 : 직원목록조회(직원ID, 직원명)
		 *
		 * @author 주혜미
		 * @param {String} empId 직원ID
		 * @returns 직원 리스트(직원ID, 직원명)
		 *
		 * ex) this.$_getEmpList2('empId','empArray') :  직원목록조회(직원ID, 직원명)
		 *
		 */
		// empIdArray API를 사용하여 공통코드 데이터 호출
		$_getEmpList2(empId, empArray) {
			return new Promise((resolve, reject) => {
				sendPostData('/lam/getEmpList2', { 'empId': empId }).then(response => {
					this[empArray] = response.data.list
					resolve(true)
				}).catch(_ => {
					reject(false)
				})
			})
		},

		/**
		 * 설명 : 로그인 유저ID 맨앞으로 정렬
		 *
		 * @author 전혁준
		 * @param 직원 리스트
		 * @returns 직원 리스트(로그인 유저 맨앞으로 정렬된)
		 * @comment empList내의 id 변수명이 id 또는 empId인지 확인
		 *
		 */
		$_userFirstSort(empList, userId) {
			// console.log('_userFirstSort 호출')
			// console.log(empList)
			// console.log(userId)

			var oneList = []
			var otherList = []
			var returnList = []

			for (var i = 0; i < empList.length; i++) {
				if (empList[i].id === userId || empList[i].empId === userId) {
					oneList.push(empList[i])
				} else {
					otherList.push(empList[i])
				}
			}

			returnList = oneList.concat(otherList)
			oneList = []
			otherList = []

			return returnList
		},

		// 숫자만, 한글만, 한글제외
		inputCheck(column, str, gbn, num) {
			let func = ''
			if (gbn === 1) {	// 한글만
				func = '$_checkHangle'
			} else if (gbn === 2) {	// 숫자만
				func = '$_checkNumber'
			} else if (gbn === 3) {	// 한글제외
				func = '$_checkNumberReverse'
			}

			const keyArr = column.split('.')
			if (keyArr.length > 1) {
				if (this.$_isNull(num)) {
					this[keyArr[0]][keyArr[1]] = this[func](str)
				} else {	// 그리드
					this[keyArr[0]][num][keyArr[1]] = this[func](str)
				}
			} else {
				this[keyArr[0]] = this[func](str)
			}
		},
		/**
		 * 설명 : 화면내위치이동
		 *
		 * @author 이봉수
 		 * @param {String} target [필수] 클래스명
 		 * @param {String} dialog dialog인지 page인지 여부(기본: dialog), 옵션:['dialog', 'page']
 		 * @param {String} smooth smooth 여부(기본: smooth), 옵션:['smooth', 'auto']
		 *
		 * ex) this.$nextTick(() => {
		 *         this.moveScrollSpy('.className')
		 *     })
		 * ex) this.$nextTick(() => {
		 *         this.moveScrollSpy('.className', 'dialog', 'smooth')
		 *     })
		 *
		 */
		moveScrollSpy(target, dialog = 'dialog', smooth = 'smooth') {
			if (target) {
				const item = document.querySelector(target)
				const dialogBody = item.closest('.el-dialog__body')
				const behavior = (smooth === 'auto') ? 'auto' : 'smooth'

				if (dialog === 'dialog') { // 기본 Dialog
					if (dialogBody === null || !dialogBody) {
						// alert('이페이지는 page 입니다. page로 수정해주세요.')
						return
					}
					const top = item.offsetTop + 8
					dialogBody.scrollTo({ top, behavior })
				} else if (dialog === 'page') { // Page
					if (dialogBody === undefined || dialogBody) {
						// alert('이페이지는 dialog(기본) 입니다. dialog로 수정해주세요.')
						return
					}
					const top = window.pageYOffset + item.getBoundingClientRect().top
					window.scrollTo({ top, behavior })
				} else { // Error
					throw new Error('worng is dialog type')
				}
			} else {
				throw new Error('target is required')
			}
		},
		/**
		 * 설명 : 금액에 focus가 올 경우 포맷 변경
		 *
		 * @author 강신선
		 * ex) <el-input  @focus="focusAmtFormat" />
		 *
		 */
		focusAmtFormat(e) {
			if (e.target.value === '0') {
				e.target.value = null
			}
			if (e.target.value !== '') {
				const focusValue = parseInt(e.target.value.replace(/[^\d\.]/g, ''))
				e.target.value = focusValue
			}
		},
		/**
		 * 설명 : 금액을 blur처리 경우 포맷 변경
		 *
		 * @author 강신선
		 * ex) <el-input  @blur="blurAmtFormat" />
		 *
		 */
		blurAmtFormat(e) {
			// 글자 체크
			const chkValue = e.target.value
			const regNum = /[^0-9]/
			if (regNum.exec(chkValue) !== null) {
				if (chkValue !== '-') {
					return
				}
			} else if (chkValue === '') {
				e.target.value = 0
			}
			const blurValue = e.target.value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
			e.target.value = blurValue
		},
		$_datePickerInputFormatter({ event, target }) {
			if (target.value.length === 5 && target.value.charAt(4) !== '-') {
				target.value = target.value.substring(0, 4) + '-' + target.value.substring(4, 5)
			}

			if (target.value.length === 8 && target.value.charAt(7) !== '-') {
				target.value = target.value.substring(0, 7) + '-' + target.value.substring(7, 8)
			}

			// const formattedVal = target.value.replace(/-/g, '')
			// if (formattedVal && formattedVal.length === 8) {
			// 	target.value = formattedVal.substr(0, 4) + '-' + formattedVal.substr(4, 2) + '-' + formattedVal.substr(6)
			// }
		},
		$_timePickerInputFormatter({ event, target }) {
			// 함수만 생성, 미구현
		},
		$_insertPrintLog(printPageName, cmnCdList, cmnCdArray) {
			let title = document.title.replace(' - 키움저축은행 소비자금융시스템', '')
			title = title ? ' - ' + title : ''

			if (cmnCdList && cmnCdArray) {
				for (let i = 0; i < cmnCdList.length; i++) {
					if (!cmnCdList[i]) {
						continue
					}
					const item = cmnCdArray.find(e => e['cmnCd'] === cmnCdList[i])
					const printLogForm = {
						acesTrgt: '' + item['cmnCdNm'] + title
					}
					sendPostData('/cmn/_8030/insertPrintLog', printLogForm)
				}

				return
			} else if (cmnCdList && !cmnCdArray) {
				for (let i = 0; i < cmnCdList.length; i++) {
					if (!cmnCdList[i]) {
						continue
					}
					const printLogForm = {
						acesTrgt: `${printPageName}(${cmnCdList[i]})` + title
					}
					sendPostData('/cmn/_8030/insertPrintLog', printLogForm)
				}

				return
			}

			const printLogForm = {
                acesTrgt: '' + printPageName + title
            }

            return new Promise((resolve, reject) => {
				sendPostData('/cmn/_8030/insertPrintLog', printLogForm)
			})
		}
	},
	filters:
	{
		/**
		 * 설명 : 그리드 코드 자동바인딩
		 * @author 신지연
		 * @returns 코드값
		 */
		cmnCode(cmnCd, cmnCdList) { // cmnGrpCd, uprCmnCd
			if (cmnCd == null) cmnCd = ''
			const item = cmnCdList.find(e => e['cmnCd'] === cmnCd)
			if (!item) return ''
			return item['cmnCdNm']
		},
		/**
		 * 설명 : 그리드 ID명 자동바인딩
		 * @author 신지연
		 * @returns 코드값
		 */
		getName(id, nmList) {
			if (id == null) id = ''
			const item = nmList.find(e => e['id'] === id.trim())
			if (!item) return id
			return item['name']
		},
		/**
		 * 설명 : 그리드 날짜 포맷팅
		 * @author 강신선
		 * @returns date
		 */
		date(value, gubun) {
			let date = ''
			if (!(typeof value === 'undefined' || value === null || value === '')) {
				// 숫자만 남기기
				value = value.replace(/[^0-9]/g, '')

				if (gubun === 'YMD') { // 년,월,일
					if (value.length > 8) {
						value = value.substring(0, 8)
					}
					date = toTimeFormat(value, 'yyyyLLdd', 'yyyy-LL-dd')
				} else if (gubun === 'YMDT') {	// 년,월,일,시,분,초
					if (value.length > 14) {
						value = value.substring(0, 14)
					} else if (value.length === 8) {
						value = value.padEnd(14, '0')
					}
					date = toTimeFormat(value, 'yyyyLLddhhmmss', 'yyyy-LL-dd HH:mm:ss')
				} else if (gubun === 'YMDTI') {	// 년,월,일,시,분,초
					if (value.length > 14) {
						value = value.substring(0, 14)
					} else if (value.length === 8) {
						value = value.padEnd(14, '0')
					}
					date = toTimeFormat(value, 'yyyyLLddhhmmss', 'yyyy-LL-dd HH:mm')
				} else if (gubun === 'YM') {	// 년,월
					if (value.length > 6) {
						value = value.substring(0, 6)
					}
					date = toTimeFormat(value, 'yyyyLL', 'yyyy-LL')
				} else if (gubun === 'T') {
					if (value.length >= 14) {
						value = value.substring(0, 14)
						value = value.slice(-6)
					}
					date = toTimeFormat(value, 'hhmmss', 'HH:mm:ss')
				} else if (gubun === 'MS') {
					date = value.substring(0, 2) + ':' + value.substring(2, 4) + ':' + value.substring(4, 6) + '.' + value.substring(6, 8)
				}

				if (date === 'Invalid DateTime') {
					date = ''
				}
			}
			return date
		},
		// yearMonth(value) {
		// 	let date = ''
		// 	try {
		// 		date = toTimeFormat(value, 'yyyyLL', 'yyyy-LL')
		// 		if (date === 'Invalid DateTime') {
		// 			date = ''
		// 		}
		// 	} catch (e) {
		// 		date = ''
		// 		console.log(e)
		// 	}
		// 	return date
		// },
		// /**
		//  * 설명 : 그리드 날짜시간 자동 포멧
		//  * @author 신지연
		//  * @returns formated datetime{string} (YYYY-MM-DD HH:mm:ss)
		//  */
		// datetime(value) {
		// 	let datetime = ''
		// 	try {
		// 		datetime = toTimeFormat(value, 'yyyyLLddhhmmss', 'yyyy-LL-dd HH:mm:ss')
		// 		if (datetime === 'Invalid DateTime') {
		// 			datetime = ''
		// 		}
		// 	} catch (e) {
		// 		datetime = ''
		// 		console.log(e)
		// 	}
		// 	return datetime
		// },
		/**
		 * 설명 : 그리드 데이터 자동 포멧 및 마스킹
		 * @author 신지연
		 * @returns 연락처(010-****-1111)
		 */
		maskPhone(num) {	// 연락처(마스킹)
			let formatNum = ''
			try {
				formatNum = stringFormatUtil.methods.$_stringToPhoneNo(num)
			} catch (e) {
				formatNum = num
				console.log(e)
			}
			return maskPhoneNumber(formatNum)
		},
		/**
		 * 설명 : 그리드 데이터 자동 포멧
		 * @author 신지연
		 * @returns 연락처(010-2222-1111)
		 */
		formatPhone(num) {
			let formatNum = ''
			try {
				formatNum = stringFormatUtil.methods.$_stringToPhoneNo(num)
			} catch (e) {
				formatNum = num
				console.log(e)
			}
			return formatNum
		},
		corno(value) {	// 법인등록번호
			return stringFormatUtil.methods.$_stringToRrgsNo(value)
		},
		maskRrno(value) {	// 주민등록번호(마스킹)
			return maskRrgsNo(stringFormatUtil.methods.$_stringToRrgsNo(value), 6)
		},
		bizrNo(value) {	// 사업자등록번호
			return stringFormatUtil.methods.$_stringToBrno(value)
		},
		maskRbno(value) {	// 주민사업자등록번호(주민등록번호만 마스킹)
			let tmp = ''
			if (!stringFormatUtil.methods.$_isNull(value) && value.length === 10) tmp = stringFormatUtil.methods.$_stringToBrno(value)
			else tmp = maskRrgsNo(stringFormatUtil.methods.$_stringToRrgsNo(value), 6)
			return tmp
		},
		maskNm(value, isPs) {	// 이름(마스킹-개인만 마스킹)(개인이 아닌경우 false 전달)
			const tmp = value
			// 2021.09.29 차주명 마스킹 해제
			// if ((isPs === null || isPs !== false) && value != null) {	// 개인인 경우
			//	if (value.length > 3) tmp = maskEtc(value, 1, 2)
			//	else tmp = maskEtc(value, 1, 1)
			// }
			return tmp
		},
		maskAccno(value) {	// 계좌번호(마스킹)
			return maskEtc(value, 3, 5)
		},
		maskJuso(value, gbn) {	// 상세주소(마스킹)
			const tmp = stringFormatUtil.methods.$_isNull(gbn) ? '02' : gbn	// default 도로명주소
			return maskJuso(value, tmp)
		},
		contractCodeDiv(value) {
			let tmp = ''
			if (!(value === '' || value === undefined || value === null)) {
				tmp = value.substr(0, 3) + '-' + value.substr(3, 2) + '-' + value.substr(5, 2) + '-' + value.substr(7)
			} else {
				tmp = '-'
			}
			return tmp
		}
	}
		/**
		 * 설명 : 매각은행 코드, 이니셜 조회 모듈화
		 * @author 최동용
		 * 미사용 method 주석처리 2022.03.28 임재원 대리
		 $_getCmnDpslBnkcdList(cmnCdArray) {
			return new Promise((resolve, reject) => {
			// api > getDpslBnkcdList 사용
			getDpslBnkcdList().then(response => {
				this[cmnCdArray] = response.data.list
				resolve(true)
			}).catch(err => {
				console.log(err)
			reject(false)
				})
			})
		},*/
		/**
		 * 설명 : 팀코드목록 조회 모듈화
		 * @author 신지연
		 * 공통코드($_getCommonCodeList)와 기능 중복으로 인한 주석처리
		 * 2022.03.28
		 * 임재원대리
		$_getTeamCdList(cmnCdArray, uprCmnCd) {
			return new Promise((resolve, reject) => {
				const cdForm = new LmsCmnCd()

				// 어떤코드항목을 가져올 것인지 구분자 설정
				cdForm.uprCmnCd = uprCmnCd
				// cdForm.usYn = 'Y'
				// api > getTeamCdList 사용
				getTeamCdList(cdForm).then(response => {
					this[cmnCdArray] = response.data.list
					resolve(true)
				}).catch(err => {
					console.log(err)
					reject(false)
				})
			})
		},*/
		/**
		 * 설명 : 공통 조회 모듈화
		 * @author 배경호
		 * 시스템 공통 기능과 중복으로 인한 주석처리
		 * 2022.03.28
		 * 임재원 대리
		$_getList(url, cmnCdArray, cdForm, callback) {
			return new Promise((resolve, reject) => {
				getList(url, cdForm).then(response => {
					this[cmnCdArray] = response.data.list
					resolve(true)

					// 콜백이 필요할때
					if (callback !== undefined) {
						callback(this, response.data.list)
					}
				}).catch(err => {
					console.log(err)
					reject(false)
				})
			})
		},*/
}
