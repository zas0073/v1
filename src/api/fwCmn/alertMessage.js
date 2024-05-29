
export const alertMessage = {
  methods: {
    /**
     * @author 강선우
     * @returns arg 은(는) 필수 입력값 입니다.
     */
    $_getMessageNecessary(arg) {
        return `${arg}은(는) 필수 입력값 입니다.`
    },

    /**
     * @author 강선우
     * @returns arg 을(를) 확인후 진행하시기 바랍니다.
     */
    $_getMessageConfirm(arg) {
      if (arg === '' || arg === undefined) {
        return '확인 후 진행하시기 바랍니다.'
      } else {
        return `${arg}을(를) 확인 후에 진행하시기 바랍니다.`
      }
    },

    /**
     * @author 강선우
     * @returns 정상적으로 완료 되었습니다.
     */
    $_getMessageComplete() {
      return '정상적으로 완료 되었습니다.'
    },
    /**
     * @author 송정아
     * @returns 총 arg 건이 정상적으로 삭제 되었습니다.
     */
     $_getMessageDelComplete(arg) {
      if (arg === '' || arg === undefined) {
        return '정상적으로 삭제 되었습니다.'
      } else {
        return `총 ${arg}건이 정상적으로 삭제되었습니다.`
      }
    },
    /**
     * @author 송정아
     * @returns arg 을(를) 수행하시겠습니까?`
     */
     $_getMessageConfirmQst(arg) {
      if (arg === '' || arg === undefined) {
        return '수행하시겠습니까?'
      } else {
        return `${arg}을(를) 수행하시겠습니까?`
      }
    },

    /**
     * @author 송정아
     * @returns 체크된 항목이 없습니다. (체크박스일 경우)
     */
     $_getChecked(arg) {
      if (arg === '' || arg === undefined) {
        return '체크된 항목이 없습니다.'
      } else {
        return '체크된 ' + `${arg}` + '항목이 없습니다.'
      }
    },
    /**
     * @author 송정아
     * @returns arg 개의 항목을 체크하시기 바랍니다. (체크박스일 경우)
     */
     $_getCheckedCount(arg, unit) {
      if (arg === '' || arg === undefined) {
        return '체크된 항목이 없습니다.'
      } else {
        if (unit === '' || unit === undefined) {
          return `${arg}개의 항목을 체크 하시기 바랍니다.`
        } else {
          return `${arg}${unit}의 항목을 체크 하시기 바랍니다.`
        }
      }
     },
    /**
     * @author 송정아
     * @returns 선택된 항목이 없습니다.
     */
     $_getSelected(arg) {
      if (arg === '' || arg === undefined) {
        return '선택된 항목이 없습니다.'
      } else {
        return `${arg}을(를) 선택 하시기 바랍니다.`
      }
    },
    /**
     * @author 송정아
     * @returns arg 개의 항목을 선택하시기 바랍니다.
     */
     $_getselectedCount(arg, unit) {
      if (arg === '' || arg === undefined) {
        return '선택된 항목이 없습니다.'
      } else {
        if (unit === '' || unit === undefined) {
          return `${arg}개의 항목을 선택 하시기 바랍니다.`
        } else {
          return `${arg}${unit}의 항목을 선택 하시기 바랍니다.`
        }
      }
     },
     /**
      * @author 강선우
      * @returns  중복 Y : 중복 데이터입니다. / 중복 N : 사용 가능한 데이터 입니다.
      */
     $_getCheckedDup(bDup) {
       if (bDup) {
        return '중복 데이터 입니다.'
       } else {
        return `사용 가능한 데이터 입니다.`
       }
     },

     /**
      * @author 강선우
      * @returns 삭제 하시겠습니까?
      */
     $_getDeleteConfirm() {
       return '삭제 하시겠습니까?'
     },

    /**
     * @author 송정아
     * @returns arg 만 사용 가능합니다.
     */
     $_getValidConfirmed(arg) {
      if (arg === '' || arg === undefined) {
        return '사용가능여부를 확인하시기 바랍니다.'
      } else {
        return `${arg}만 사용 가능합니다.`
      }
     },

    /**
     * @author 송정아
     * @returns arg 은(는) 사용이 불가 합니다.
     */
     $_getValidFailed(arg) {
      if (arg === '' || arg === undefined) {
        return '사용불가 항목이 존재합니다.'
      } else {
        return `${arg}은(는) 사용이 불가 합니다.`
      }
     },

    /**
     * @author 송정아
     * @returns arg 이(가) 존재하지 않습니다.
     */
     $_getExistFailed(arg) {
      if (arg === '' || arg === undefined) {
        return '항목이 존재하지 않습니다.'
      } else {
        return `${arg}이(가) 존재하지 않습니다.`
      }
     },

    /**
     * @author 송정아
     * @returns arg 이(가) 존재합니다.
     */
     $_getExist(arg) {
      if (arg === '' || arg === undefined) {
        return '항목이 이미 존재합니다.'
      } else {
        return `${arg}이(가) 존재합니다.`
      }
     },

      /**
      * @author 강선우
      * @returns 조회가 완료 되었습니다.
      */
     $_getSearchComplete() {
       return '조회가 완료 되었습니다.'
     },

     /**
      * @author 강선우
      * @returns 한번에 전송할 수 있는 최대 Size를 초과하였습니다(Max 10,485,760 Byte).
      */
     $_getUploadFileOverflow() {
       return '한번에 전송할 수 있는 최대 Size를 초과하였습니다\n(최대 Size: 1000KB).'
     },

     /**
      * @author 강선우
      * @returns 삭제하기 전에 ${arg}을(를) 확인하시기 바랍니다.
      */
     $_getCheckBeforDelete(arg) {
       return `삭제하기 전에 ${arg}을(를) 확인하시기 바랍니다.`
     },

    /**
     * @author 송정아
     * @returns [arg] 변경항목이 존재합니다. 저장 후에 진행하시기 바랍니다.
     */
     $_getChangeConfirmed(arg) {
      if (arg === '' || arg === undefined) {
        return '변경항목이 존재합니다. 저장 후에 진행하시기 바랍니다.'
      } else {
        return `[${arg}] 변경항목이 존재합니다. 저장 후에 진행하시기 바랍니다.`
      }
     },

      /**
       * @author 강선우
       * @returns '선택된 행이 없습니다.
       */
      $_getSelectedRow() {
        return '선택된 행이 없습니다.'
    },
    /**
     * @author 신지연
     * @returns '(${arg}을(를) ) ${length} 이상 입력해 주시기 바랍니다.
     */
    $_getMsgMinLength(length, arg) {
      let msg = ''
      if (arg !== '' && arg !== undefined) {
        msg = `${arg}을(를)  `
      }
      msg = msg + `${length} 이상 입력해 주시기 바랍니다.`
      return msg
    },
    /**
     * @author 신지연
     * @returns '${arg}는 ${length}을 초과할 수 없습니다.
     */
    $_getMsgMaxLength(length, arg) {
      let msg = ''
      if (arg !== '' && arg !== undefined) {
        msg = `${arg}은(는)  `
      }
      msg = msg + `${length}을(를) 초과할 수 없습니다.`
      return msg
    },
    /**
     * @author 배경호
     * @returns 다른 arg를 다중선택 불가하도록 처리
     */
    $_getMsgDifferentArgs(arg) {
      return `서로 다른 ${arg}이(가) 선택되어 있습니다.`
    },
    /**
     * @author 배경호
     * @returns 조회된 내역이 없습니다.
     */
    $_getMsgNoDataFound(arg) {
      if (arg === '' || arg === undefined) {
        return `조회된 내역이 없습니다.`
      } else {
        return `조회된 ${arg} 내역이 없습니다.`
      }
    },
    /**
     * @author 배경호
     * @returns 잘못된 ${arg} 유형입니다.
     */
     $_getMsgWrongType(arg) {
      if (arg === '' || arg === undefined) {
        return `잘못된 유형입니다.`
      } else {
        return `잘못된 ${arg} 유형입니다.`
      }
    },
    /**
     * @author 김유진
     * @returns ${arg}는 ${arg2}보다 이후일 수 없습니다.
     */
    $_getMsgWrongDateOrderBy(arg, arg2) {
      return `${arg}는 ${arg2}보다 이후일 수 없습니다.`
    },
    /**
     * @author 김유진
     * @returns return `( ${arg}보다 ) ${arg2}을(를) 입력할 수 없습니다.`
     */
    $_getMsgNoMoreInput(arg, arg2) {
      let msg = ''
      if (arg !== '' && arg !== undefined) {
        msg = `${arg}보다 `
      }
      msg = msg + `${arg2}을(를) 입력할 수 없습니다.`
      return msg
    },
    /**
     * @author 최재우
     * @returns `변경된 항목이 없습니다.`
     */
    $_getMsgNotChanged() {
      return `변경된 항목이 없습니다.`
    },

    /**
     * @author 송정아
     * @returns `${arg}이(가) 일치하지 않습니다.`
     */
     $_getMsgCompared(arg) {
      if (arg === '' || arg === undefined) {
        return '비교 데이터가 일치하지 않습니다.'
      } else {
        return `${arg}이(가) 일치하지 않습니다.`
      }
    },

    /**
     * @author 송정아
     * @returns `${arg}이(가) 가능 합니다.`
     */
    $_getPossible(arg) {
      if (arg === '' || arg === undefined) {
        return '처리 가능 합니다.'
      } else {
        return `${arg}이(가) 가능 합니다.`
      }
    },

    /**
     * @author 송정아
     * @returns `${arg}이(가) 불가능 합니다.`
     */
    $_getImpossible(arg) {
      if (arg === '' || arg === undefined) {
        return '처리 불가능 합니다.'
      } else {
        return `${arg}이(가) 불가능 합니다.`
      }
    },

    /**
     * @author 윤준성
     * @returns `${arg1}와 ${arg2}이(가) 일치하지 않습니다.`
     */
    $_getNotEqual(arg1, arg2) {
      return `${arg1}와 ${arg2}이(가) 일치하지 않습니다.`
    },

    $_getMessageLetInput(arg) {
      return `${arg}로 입력해 주세요.`
    },

    $_getNonSeqChar(arg) {
      return `키보드 상 연속된 문자를 ${arg}개 미만으로 입력해 주세요`
    }

  }
}
