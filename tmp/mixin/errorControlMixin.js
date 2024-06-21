import {sync} from 'vuex-pathify';

export const errorControlMixin = {
  data: () => ({}),
  computed: {
    showLoginDialog: sync('app/showLoginDialog'),
  },
  methods: {
    errorControl(error) {
      if (error && error.response && error.response.status === 401) {
        this.showLoginDialog = true;

        return this.$dialog.message.error('로그인이 필요합니다.');
      }

      if (error && error.response && error.response.status === 404) {
        return this.$dialog.message.error('불러올 데이터가 없습니다.');
      }

      let errorMessage = '처리 중 문제가 발생했습니다. 관리자에게 문의 바랍니다.';

      if (error && error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      if (error && error.response && error.response.data && error.response.data.detail) {
        errorMessage = error.response.data.detail;
      }

      console.log('errorControl.error', {...error}, arguments);

      return this.$dialog.message.warning(errorMessage);
    },
  },
};
