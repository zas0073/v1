import { errorControlMixin } from '@/mixins/errorControlMixin';
import { searchSelectProps } from '@/assets/defaultProps';
import capitalizeString from '@/assets/functions/capitalizeString';

export const searchControlMixin = {
  mixins: [errorControlMixin],
  data: (vm) => {
    return {
      searchSelectProps,
      searchOptionItems: [],  // 검색 대상
      filters: [], // 사용할 filter string 배열
      defaultSearchType: null, // 각 View에서 입력
      searchType: null, // lazySearchType을 적용할 때 사용
      lazySearchType: null, // 각 View에서 vm.$route.query확인헤서 type 입력
      searchText: null,  // lazySearchText을 적용할 때 사용
      lazySearchText: null, // 각 View에서 vm.$route.query확인헤서 text 입력
      tableOptions: {
        page: (vm.$route.query.page && parseInt(vm.$route.query.page, 10)) || 1,
        itemsPerPage: parseInt(vm.$route.query.size, 10) || 10,
      },
      totalCount: 0,
      listItems: [],
      listUrl: '',
      contentsLoading: false,
    };
  },
  computed: {
    computedListItems () {
      return this.listItems;
    },
    computedPaging () {
      return {
        page: this.tableOptions.page,
        size: this.tableOptions.itemsPerPage,
      };
    },
    computedSearch () {
      let search = {};

      search[`${this.searchType}`] = this.searchText;

      return search;
    },
    computedFilters () {
      let filters = {};

      this.filters.forEach(filter => {
        filters[`${filter}`] = this[`${filter}`];
      });

      return filters;
    },
    computedParams () {
      return {
        ...this.computedPaging,
        ...this.computedSearch,
        ...this.computedFilters,
      };
    },
    computedListUrl () {
      return this.listUrl;
    },
  },
  mounted () {
    this.getList();
  },
  watch: {
    computedPaging (newVal, oldVal) {
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
        return;
      }

      this.pushSearchQuery();
    },
    '$route.query' () {
      // 페이징 처리
      this.tableOptions = {
        page: (this.$route.query.page && parseInt(this.$route.query.page, 10)) || 1,
        itemsPerPage: parseInt(this.$route.query.size, 10) || 10,
      };

      let dynamicData = {
        defaultSearchType: this.defaultSearchType, // 기본 검색 타입
        searchTypes: this.searchTypes, // 검색 타입들
        searchOptionItems: this.searchOptionItems,
        filters: this.filters,
      };

      dynamicData = this.assignSearchQuery(this, dynamicData);

      for (const key in dynamicData) {
        this[`${key}`] = dynamicData[`${key}`];
      }

      this.getList();
    },
  },
  methods: {
    capitalizeString,
    assignSearchQuery (vm, dynamicData) {
      let searchType = dynamicData.defaultSearchType;
      let searchText = null;

      dynamicData.searchOptionItems.forEach(item => {
        if (item.value && vm.$route.query[`${item.value}`]) {
          searchType = item.value;
          searchText = vm.$route.query[`${item.value}`];
        }
      });

      dynamicData['searchType'] = searchType;
      dynamicData['lazySearchType'] = searchType;
      dynamicData['searchText'] = searchText;
      dynamicData['lazySearchText'] = searchText;

      // 필터 처리
      dynamicData.filters.forEach(filter => {
        dynamicData[`${filter}`] = vm.$route.query[`${filter}`] && vm.$route.query[`${filter}`].split(',') || null;
        dynamicData[`lazy${vm.capitalizeString(filter)}`] = vm.$route.query[`${filter}`] && vm.$route.query[`${filter}`].split(',') || null;
      });

      return dynamicData;
    },
    pushSearchQuery () {
      let searchQuery = {};

      for (const key in this.computedParams) {
        if (!this.computedParams[key] || this.computedParams[key].length === 0) {
          continue;
        }

        searchQuery[key] = Array.isArray(this.computedParams[key]) && this.computedParams[key].join(',') || this.computedParams[key];
      }

      return this.$router.push({ name: this.$route.name, params: this.$route.params, query: { ...searchQuery } });
    },
    getList () {
      this.listItems = [];
      this.totalCount = 0;
      this.contentsLoading = true;

      this.$axios.get(this.computedListUrl, {
            params: this.computedParams,
          },
      ).then(response => {
        if (response.data.code === 'SUCCESS' && response.data.data) {
          const listItems = response.data.data;

          this.listItems = listItems.content;
          this.totalCount = listItems.totalElements;
        }
      }).catch((error) => {
        this.errorControl(error);
      }).finally(() => {
        this.contentsLoading = false;
      });
    },
    searchList () {
      this.tableOptions.page = 1;

      this.searchType = this.lazySearchType;
      this.searchText = this.lazySearchText;

      this.filters.forEach(filter => {
        this[`${filter}`] = this[`lazy${this.capitalizeString(filter)}`] || null;
      });

      this.pushSearchQuery();
    },
    valueCompare (a, b) {
      return a === b || a === Number(b);
    },
  },
};
