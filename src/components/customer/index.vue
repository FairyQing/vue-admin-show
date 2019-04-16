<template>
  <div class="app-container">
    <div class="search" >
      <el-input class="searchInput" placeholder="输入搜索关键字" v-model="input4">
      </el-input>
      <el-button class="searchbutton" type="primary"  style="margin-left: 12px;" >查询</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row class="list" >
      <el-table-column label="客户编号"  align="center"  >
        <template slot-scope="scope">
          {{scope.row.Idnumber}}
        </template>
      </el-table-column>
      <el-table-column label="客户姓名"  align="center"  >
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="客户等级" width="200" align="center">
        <template slot-scope="scope">
          <span>
          {{Grade(scope.row.grade)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="认证" width="200" align="center">
        <template slot-scope="scope">
          {{hasAuth(scope.row.auth)}}
        </template>
      </el-table-column>
      <el-table-column label="状态"width="200" align="center">
        <template slot-scope="scope">
          {{customerStatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="dialogShow('check',scope.row)">查看</el-button>
          <el-button type="text" size="mini" @click="dialogShow('edit',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next,jumper"
      :page-count="totalPage"
      :current-page="page"
      @current-change="changePage"
    >
    </el-pagination>
 </div>

</template>

<script>
  import {mapMutations} from 'vuex'
  import {ERR_OK,customerGrade,customerStatus,hasAuth} from 'api/config';
  import {getCustomerList,editOneCustomer} from "api/customer";
  import {historyPageMixin} from "common/js/mixin"

  export default {
    data() {
      return {
        value1: '',
        name:'check',
        input4:'',
        deleteArr:[],
        form: {},
        title:'',
        list: null,
        listLoading: true,
        currentPage:1,
        pagesize:5,
        totalPage:null,
        textarea:'',
      }
    },
    mixins:[historyPageMixin],
    methods: {
      Grade(grade){
        if(grade===customerGrade.gOne){
          return grade='A';
        }
        if(grade===customerGrade.gTwo){
          return grade='B';
        }else{
          return grade='C';
        }
      },
      customerStatus(status){
        return status===customerStatus.normal?'正常':"黑名单";
      },
      hasAuth(auth){
        return auth===hasAuth.hasl?'认证':"未认证";
      },
      _getList(page) {
        getCustomerList(page).then((ops)=>{
          this.list=ops.content;
          this.totalPage=ops.totalPages;
          this.listLoading=false;
        })
      },
      dialogShow(type,row){
        this.title=type==='check'?'查看详情':'信息修改';
        this.$router.push({path:`/customer/${type}/${this.page}`,query:{type,id:row.id}});
      },
    }
  }
</script>

<style scoped>
  .el-table{
    font-size: 12px;
  }
  .search
  {
    width:90%;
    margin: 0 auto;
    background: #F2F2F2;
  }
  .list{
    width:90%;
    margin: 0 auto;
    margin-top: 2%;
  }
  .searchInput{
    margin-top: 20px;
    margin-left: 50px;
    width:25%;
    margin-bottom: 20px;
  }
  .searchbutton{
    margin-top: 20px;
    margin-left: 50px;
  }
  .pagination{
    text-align: center;
  }


</style>
