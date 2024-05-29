/*
** 업무 메세지만 정의 **
* $_MSG_BRW0001(arg) 미정의
* $_MGS_FNI0000(arg, args2)
*/
export const lmsMessage = {
  methods: {
    /**
     * @author 최형욱
     * @returns ${arg}은(는) ${args2}자리 입니다.
     */
    $_MSG_BRW0002(arg, args2) {
      return `${arg}은(는) ${args2}자리 입니다.`
    },
    /**
     * @author 최형욱
     * @returns 지급거래처와 예금주 정보가 일치하지 않습니다.
     */
     $_MSG_BRW0003() {
      return `지급거래처와 예금주 정보가 일치하지 않습니다.`
    },
    /**
     * @author 최형욱
     * @returns 유효하지 않은 ${arg}입니다.
     */
     $_MSG_BRW0004(arg) {
      return `유효하지 않은 ${arg}입니다.`
    },
    /**
     * @author 최형욱
     * @returns 최초자심위 진행월이 도래하지 않아 조회할 수 없습니다.
     *          / 최초자심위 진행월의 결산이 확정 되지 않아 조회할 수 없습니다.
     */
     $_MSG_BRW0009(arg) {
      if (arg === '1' || arg === '3') {
        return `최초자심위 진행월이 도래하지 않아 조회할 수 없습니다.`
      } else if (arg === '2') {
        return `최초자심위 진행월의 결산이 확정 되지 않아 조회할 수 없습니다.`
      }
    },
    /**
     * @author 최형욱
     * @returns 결재처리가 완료되지 않은 항목이 있습니다.
     */
     $_MSG_BRW0011(arg) {
       if (arg === 'list') {
         return `결재처리가 완료되지 않은 항목이 있습니다.`
       } else {
         return `결재처리가 완료되지 않았습니다.`
       }
    },
    /**
     * @author 최형욱
     * @returns 담당${arg}만 승인이 가능합니다.
     */
     $_MSG_BRW0012(arg) {
        return `담당${arg}만 승인이 가능합니다.`
    },
    /**
     * @author 배경호
     * @returns 하나의 행만 처리가 가능합니다.
     */
    $_MGS_BRW4031_05() {
      return `한개 의 행 만 처리가 가능합니다.`
    },
    /**
     * @author 배경호
     * @returns 하나의 행만 처리가 가능합니다.
     */
     $_MGS_BRW4031_06() {
      return `ERP확정이 처리되어 회수가 불가능 합니다.`
    },
    /**
     * @author 배경호
     * @returns 모두 0이 될수 없습니다.
     */
    $_MGS_BRW4050_01() {
      return `지급금액은 0 보다 커야합니다.`
    },
    /**
     * @author 배경호
     * @returns 첨부파일이 존재하지 않습니다.
     */
     $_MGS_BRW4050_03() {
      return `이미 승인완료 처리가 되어있습니다.`
    },
    /**
     * @author 배경호
     * @returns 첨부파일이 존재하지 않습니다.
     */
     $_MGS_BRW4051_01() {
      return `정상입니다.`
    },
    /**
     * @author 박종근
     * @returns 결산년월이 존재하지 않습니다.
     */
     $_MGS_SPC3008_01() {
      return `결산년월이 존재하지 않습니다.`
    },
    /**
     * @author 박종근
     * @returns 기준년월이 존재하지 않습니다.
     */
     $_MGS_SPC3009_01() {
      return `기준년월이 존재하지 않습니다.`
    },
    /**
     * @author 강신선
     * @returns 결재가 (진행/취소)되어 ${arg}(이/가) 불가합니다.
     *
     */
    $_MGS_FNI0001(arg, arg2) {
      if (arg2 === '' || arg2 === undefined) {
        return `${arg}이(가) 불가한 상태입니다. 확인 후 진행하시기 바랍니다.`
      } else {
        return `결재가 ${arg2}되어 ${arg}이(가) 불가합니다.`
      }

      /*
      if (arg === '취소') {
        return `결재가 진행되어 ${arg}이(가) 불가합니다.`
      } else if (arg === '승인') {
        return `결재가 취소되어 ${arg}이 불가합니다.`
      } else if (arg === '반려') {
        return `결재가 취소되어 ${arg}가 불가합니다.`
      }
      */
    },
    /**
     * @author 최동용
     * @returns arg가 등록된 arg2 (은/는) 삭제 할 수 없습니다.
     */
    $_MGS_DEAL0001(arg, args2) {
      return `${arg}가 등록된 ${args2}은(는) 삭제 할 수 없습니다.`
    },
    /**
     * @author 배경호
     * @returns 모두 0이 될수 없습니다.
     */
     $_MGS_BRW4031_09() {
      return `처리금액은 0 보다 커야합니다.`
    },
    /**
     * @author 배경호
     * @returns 두 금액 비교 처리
     */
     $_MGS_BRW4031_10(arg, args2) {
      return `${arg} 보다 ${args2}이 더 큽니다.`
    },
    /**
     * @author 배경호
     * @returns 두 금액 비교 처리
     */
     $_MGS_BRW4031_11(arg, args2) {
      return `회수처리대상금액 보다 채권별회수합계금액이 더 큽니다. (회수처리대상금액 : ${arg}, 채권별회수합계금액 : ${args2})`
    },
    /**
     * @author 배경호
     * @returns 완제 시 회수처리불가
     */
     $_MGS_BRW4031_12() {
      return `해당 차주는 채권완제 상태입니다.`
    },
    /**
     * @author 배경호
     * @returns 상계배당, 잔급납부시 체크
     */
     $_MGS_BRW4031_13(arg) {
      return `처리항목이 상계배당, 잔금납부시 ${arg} 은(는) 필수입니다.`
    },
    /**
     * @author 배경호
     * @returns 완제 시 회수처리불가
     */
     $_MGS_BRW4031_15() {
      return `준비년도 및 합계행은 선택이 불가능 합니다.`
    },

    /**
     * @author 배경호
     * @returns 순서대로 미선택시
     */
     $_MGS_BRW4031_19() {
      return `조기상환인 경우 상환차수를 순서대로 선택해주세요.`
    },
    /**
     * @author 배경호
     * @returns 순서대로 미선택시
     */
     $_MGS_BRW4031_20() {
      return `낙찰가는 입찰보증금 + 잔금 보다 클수 없습니다.`
    },
    /**
     * @author 배경호
     * @returns 출자전환 차주 !== 회수처리 차주
     */
     $_MGS_BRW4031_21() {
      return `출자전환한 차주와 회수처리 차주가 다릅니다.`
    },

    /**
     * @author 배경호
     * @returns 출자전환 차주 !== 회수처리 차주
     */
     $_MGS_BRW4031_23() {
      return `이미 출자전환 처리가 되어 있습니다.`
    },
    /**
     * @author 배경호
     * @returns 출자전환 차주 !== 회수처리 차주
     */
     $_MGS_BRW4031_24(arg) {
      return `${arg} 처리가 실패하였습니다.`
    },
    /**
     * @author 배경호
     * @returns 회수/가지급 시작이 안된 경우
     */
     $_MGS_BRW4031_25(arg, args2) {
      return `${arg} 월 결산진행중 이므로 ${args2}처리 가 불가능 합니다.`
    },

    /**
     * @author 배경호
     * @returns Current 생성시 체크
     */
     $_MGS_BRW4031_28() {
      return `Closing일자 이후 거래 가능합니다.`
    },
    /**
     * @author 배경호
     * @returns 회수유형 별 체크
     */
     $_MGS_BRW4031_29(arg) {
      return `반제처리되지 않은 ${arg}이 존재합니다.`
    },
    /**
     * @author 배경호
     * @returns 회수유형 별 체크
     */
     $_MGS_BRW4031_30(arg, args2) {
      return `채권금액산정에 미처리 금액이 존재합니다. (총처리대상금액 : ${arg}, 처리한금액 : ${args2})`
    },
    /**
     * @author 배경호
     * @returns 두 금액 비교 처리
     */
     $_MGS_BRW4031_40(arg, args2, args3, args4) {
      return `${arg} 보다 ${args2}이 더 큽니다.(${arg} : ${args3}, ${args2} : ${args4})`
    },
    /**
     * @author 배경호
     * @returns 회수금액산정 금액 체크
     */
     $_MGS_BRW4031_41(arg) {
      return `회수금액산정시 미처리금액이 존재합니다. (미처리금액 : ${arg})`
    },
    /**
     * @author 배경호
     * @returns 회수금액산정 금액 체크
     */
     $_MGS_BRW4031_42(arg) {
      return `회수금액산정시 처리금액은 0 보다 커야합니다. (회수처리대상금액 : ${arg})`
    },
    /**
     * @author 배경호
     * @returns 선급금체크
     */
     $_MGS_BRW4031_44(arg) {
      return `유입전환시 반제처리할 ${arg}이 없습니다.`
    },
    /**
     * @author 배경호
     * @returns 상계배당 체크
     */
     $_MGS_BRW4031_45() {
      return `입찰보증금 + 잔금은 낙찰가보다 클수 없습니다.`
    },
    /**
     * @author 배경호
     * @returns 채권완제체크
     */
     $_MGS_BRW4031_46() {
      return `채권완제가 선택되었습니다.`
    },
    /**
     * @author 배경호
     * @returns 채권완제체크
     */
     $_MGS_BRW4031_47() {
      return `담보모두해지가 선택되었습니다.`
    },

    /**
     * @author 강신선
     * @returns 차주사후관리
     */
     $_MGS_BRW4003_01() {
      return `유입물건은 선택이 불가합니다. 유입물건 사후관리[3021] 화면을 통해 등록하시기 바랍니다.`
    },
    /**
     * @author 조봉주
     * @returns 첨부파일등록후 저장확인 메세지
     */
     $_MGS_SPC3001_01(arg) {
      return `${arg}이 변경되었습니다. 저장 버튼을 클릭하여 반영된 파일을 저장해 주십시오.`
    },
    /**
     * @author 조봉주
     * @returns deal연결 대상 검증
     */
     $_MGS_SPC3001_02(arg) {
      return `${arg}가 존재하지 않습니다. [2001] Deal관리 화면에서 수정후 진행하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 특정 대상 미존재시 추가조치 메세지
     */
     $_MGS_SPC3001_03(arg, addMsg) {
      return `${arg}이(가) 없습니다. ${addMsg}`
    },
    /**
     * @author 조봉주
     * @returns deal연결 저장시 확인 메세지
     */
     $_MGS_SPC3001_04() {
      return `DEAL 정보를 저장 하시겠습니까? 저장거래시 기등록 데이터 삭제후 인수 데이터 기준으로 등록 진행됩니다.`
    },
    /**
     * @author 조봉주
     * @returns 검증 결과메세지
     */
     $_MGS_SPC3001_05(arg) {
      return `${arg}은 0보다 커야 합니다.`
    },
    /**
     * @author 조봉주
     * @returns 비율 검증 결과 메세지
     */
     $_MGS_SPC3001_06() {
      return `투자비율의 합은 100이어야 합니다.`
    },
    /**
     * @author 조봉주
     * @returns 업로드시 데이터 건수 불일치 메세지
     */
     $_MGS_SPC3002_01(arg1, arg2) {
      return `입력한 데이터 값[${arg1}]과 처리예정 데이터 건수[${arg2}]가 일치하지 않습니다. 확인후 진행하십시오.`
    },
    /**
     * @author 조봉주
     * @returns BASIS 검증
     */
     $_MGS_SPC3002_02(arg1, arg2) {
      return `${arg1} 된 BASIS입니다. ${arg2} 취소후 거래하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 결산처리 확인을 통한 취소 검증
     */
     $_MGS_SPC3002_03() {
      return `결산처리가 완료되어 취소가 불가합니다. 결산 취소후 진행하십시오.`
    },
    /**
     * @author 조봉주
     * @returns
     */
     $_MGS_SPC3003_01(arg) {
      return `${arg}을(를) 정확히 입력하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 유입물건voucher 검증
     */
     $_MGS_SPC3004_01() {
      return `Voucher 내역은 최소 1행은 존재해야 합니다.`
    },
    /**
     * @author 조봉주
     * @returns 유입물건voucher 검증
     */
     $_MGS_SPC3004_02() {
      return `SPC 선 조회 후 출력할 수 있습니다.`
    },
    /**
     * @author 조봉주
     * @returns 유입물건voucher 검증
     */
     $_MGS_SPC3004_03() {
      return `SPC 조회를 통해 발행인을 입력하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 분기검증
     */
     $_MGS_SPC3015_01() {
      return `현재보다 이전분기의 대상만 전표생성이 가능합니다. 이전 분기를 입력하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 수수료생성 검증
     */
     $_MGS_SPC3015_02(arg) {
      return `SPC번호[${arg}]의 수수료가 생성되지 않았습니다. 수수료생성 처리후 진행 하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 확정처리 검증
     */
     $_MGS_SPC3015_03(arg) {
      return `SPC번호[${arg}]의 확정처리가 완료되지 않았습니다. 수수료상세조회 화면에서 확정 처리후 진행 하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 전표검증
     */
     $_MGS_SPC3015_04(arg) {
      return `SPC번호[${arg}]은 전표가 생성된 대상 입니다. 전표 재생성 필요시 전표취소후 진행 하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 전표취소검증
     */
     $_MGS_SPC3015_05(arg) {
      return `SPC번호[${arg}] 취소할 전표가 없습니다. 확인 후 진행하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 전표취소검증
     */
     $_MGS_SPC3015_06(arg) {
      return `SPC번호[${arg}] ERP처리완료 된 전표는 취소할 수 없습니다. 확인 후 진행하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 전표생성여부 확인
     */
     $_MGS_SPC3015_07(arg) {
      return `SPC번호[${arg}] 전표생성이 되지않아 진행이 불가합니다. 전표생성후 진행하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 전표처리여부 확인
     */
     $_MGS_SPC3015_08(arg) {
      return `SPC번호[${arg}] 이미 처리된 전표입니다. 확인 후 진행하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 회수수수료 비고 저장 검증
     */
     $_MGS_SPC3015_09(arg) {
      return `SPC번호[${arg}] 전표가 생성된 대상 입니다. 비고 저장 필요시 전표취소후 진행 하십시오.`
    },
     /**
     * @author 조봉주
     * @returns 전표생성 혹은 확정여부 Y인 경우 수수료생성 불가 검증
     */
      $_MGS_SPC3015_10(arg) {
        return `${arg}행 확정여부 혹은 전표생성 여부가 Y입니다. 전표생성취소와 수수료상세조회화면에서 확정 취소후 진행하십시오.`
      },
    /**
     * @author 조봉주
     * @returns 저장 가능 검증
     */
     $_MGS_SPC3016_01(arg) {
      return `${arg}행 확정여부가 Y입니다. 확정 취소후 저장 하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 회수수수료 수정시 사유 검증
     */
     $_MGS_SPC3016_02(arg) {
      return `${arg}행 수정사유 혹은 회수수수료제외사유코드 입력후 저장 하십시오. 저장거래시 필수 항목입니다.`
    },
    /**
     * @author 조봉주
     * @returns 확정시 기확정건 검증
     */
     $_MGS_SPC3016_03(arg1, arg2) {
      return `${arg1}행 확정여부가 ${arg2}입니다. 체크 제외 후 진행 하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 수익율관리 행추가시
     */
     $_MGS_SPC3099_01() {
      return `정상 조회후 행추가 가능합니다. 신규코드의 경우 신규코드추가 버튼을 클릭하십시오.`
    },
    /**
     * @author 조봉주
     * @returns 수익율관리 삭제시
     */
     $_MGS_SPC3099_02() {
      return `삭제 진행 하시겠습니까? 첫번째 행 대상을 삭제합니다.`
    }
  }
}
