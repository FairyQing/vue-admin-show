
import {getHistoryPage,setHistoryPage,removeHistoryPage} from 'common/js/auth';

export const historyPageMixin={
  data(){
    return {
      page:1
    }
  },
  created(){
    let historyPage=this.getHistoryPage();
    // console.log(historyPage);
    if(historyPage){
      historyPage=+historyPage;//转为数字
      this.page=historyPage; //分页组件的当前页数page同步
      this._getList(historyPage-1);
      // console.log('historyPage',this.page)
      return;
    }
    this._getList(this.page-1);

  },
  destroyed(){
    removeHistoryPage();
  },
  methods:{
    changePage(page) {
      this.page=page;
      this.saveHistoryPage(page);
      this._getList(this.page-1);
      // console.log('currentPage',this.page);
    },
    getHistoryPage(){
      return getHistoryPage();
    },
    saveHistoryPage(page){
      setHistoryPage(page);
    }
  }
};
