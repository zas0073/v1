// import { sendPostData } from '@/api/fwCmn/api'
export default class Pagination {
    currentPage = 1;
    pageSize = 10;
    pageFrom = 0;
    pageTo = 0;
    total = 0;
    sort = 0;
    orderBy = 0;
    isSorting = 0;
    maxPageSize = 100;

    // 페이징 관련 추가 (2022.05.18)
    chgCol = ''; // 쿼리 ORDER BY 변경될 컬럼
    dfCol = ''; // 쿼리 ORDER BY 기본컬럼

    setAscendingParam() {
        this.pageTo = this.currentPage * this.pageSize
        this.pageFrom = (this.currentPage * this.pageSize) - this.pageSize
    }
    setDescendingParam() {
        this.pageTo = this.total - (this.pageSize * (this.currentPage - 1))
        this.pageFrom = this.pageTo - this.pageSize
    }
    initPagingForm() {
        this.currentPage = 1
        this.pageFrom = 0
        this.pageTo = 0
        this.total = 0
        this.sort = 0
        this.orderBy = 0
        this.isSorting = 0
        this.chgCol = '' // 쿼리 ORDER BY 변경될 컬럼
    }
  }

