// import { sendPostData } from '@/api/fwCmn/api'
// 객체js 선언
import CommonCpnt from '@/form-model/fwCmn/commonCpnt' // 컴포넌트관련 공통객체
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tabForm: new CommonCpnt(), // 탭정보 공통객체
      cpntUpdateAuthYn: '', // 화면수정권한여부
      cpntCrudAuth: '' // 화면수정권한여부 CRUD
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      ['permission_addRoutes']
    ])
  },
  methods: {
    // 해당 컴포넌트에서 수정기능을 사용할 수 있는지 여부를 리턴하는 함수
    // 미사용으로 인한 제거
    // store.state로 옮김 - by 임재원 대리 2022.09.19
    // getStateUptAuthYn(cpntId) {
    //   this.tabForm.cpntId = cpntId
    //   this.tabForm.cpntUserId = this.userId

    //   sendPostData('/fwCmn/getCpntUpdtAuthYn', this.tabForm).then(response => {
    //     if (response.data === 'Y') {
    //       this.cpntUpdateAuthYn = true
    //     } else {
    //       this.cpntUpdateAuthYn = false
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 해당 컴포넌트에 접근할 수 있는지 여부를 리턴하는 함수
    getMenuAuthYn(cpntId) {
			const array = this.permission_addRoutes

      const cmpnList = [] // new Array()
      for (var i = 0; i < array.length; i++) {
        const dept1 = array[i]

        const data = {
          name: dept1.name,
          path: dept1.path,
          id: dept1.id,
          cpntMvYn: dept1.cpntMvYn
        }
        // 1 Depth 정보 push
        cmpnList.push(data)

        // 2  Depth 정보 존재할 경우
        if (dept1.children != null) {
          for (var j = 0; j < dept1.children.length; j++) {
            const dept2 = dept1.children[j]

            const data = {
              name: dept2.name,
              path: dept2.path,
              id: dept2.id,
              cpntMvYn: dept2.cpntMvYn
            }
            cmpnList.push(data)

            // 3 Depth 정보 존재할 경우
            if (dept2.children != null) {
              for (var k = 0; k < dept2.children.length; k++) {
                const dept3 = dept2.children[k]

                const data = {
                  name: dept3.name,
                  path: dept3.path,
                  id: dept3.id,
                  cpntMvYn: dept3.cpntMvYn
                }
                cmpnList.push(data)
              }
            }
          }
        }
      }

      let selCmptPath = ''
      let selCpntMvYn = 'N'
      for (var t = 0; t < cmpnList.length; t++) {
        const cmpnListData = cmpnList[t]

        // cmpnListData.name : 메뉴번호
        // cmpnListData.id : 화면번호
        if (cmpnListData.id === cpntId) {
          selCmptPath = cmpnListData.path
          if (cmpnListData.cpntMvYn === 'Y') {
            selCpntMvYn = cmpnListData.cpntMvYn
          }
        }
      }

      if (selCmptPath === '' || selCpntMvYn !== 'Y') {
        return false
      } else {
        return true
      }
    }
  }
}
