<template>

  <div class="app-container">
    <div class="span1">
      <el-input class="search" placeholder="输入查询关键字" clearable>
      </el-input>
      <el-button type="primary" style="margin-left: 12px;"  >查询</el-button>
    </div>
    <div class="span2">
      <el-table  :data="list" v-show="tableOne"  v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="changeColor">
        <el-table-column label="砍价编号"  align="center">
          <template slot-scope="scope">
            {{scope.row.kjID}}
          </template>
        </el-table-column>
        <el-table-column label="订单编号"  align="center">
          <template slot-scope="scope">
            {{scope.row.ddID}}
          </template>
        </el-table-column>
        <el-table-column label="总人数" align="center"  width="200"   >
          <template slot-scope="scope">
            {{scope.row.people}}
          </template>
        </el-table-column>
        <el-table-column label="总金额" width="200"  align="center" >
          <template slot-scope="scope">
            {{scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column label="操作"    align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="change"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table  :data="list" v-show="tableTwo"  v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="changeColor">
        <el-table-column label="砍价编号" align="center">
          <template slot-scope="scope">
            {{scope.row.kjID}}
          </template>
        </el-table-column>
        <el-table-column label="订单编号"  align="center">
          <template slot-scope="scope">
            {{scope.row.ddID}}
          </template>
        </el-table-column>
        <el-table-column label="砍价人" align="center"  width="200"  >
          <template slot-scope="scope">
            {{scope.row.people}}
          </template>
        </el-table-column>
        <el-table-column label="砍价金额" width="200"  align="center" >
          <template slot-scope="scope">
            {{scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column label="砍价时间" width="220"  align="center" >
          <template slot-scope="scope">
            {{scope.row.time}}
          </template>
        </el-table-column>
        <el-table-column label="操作"    align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="backTo"> 返回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {ERR_OK,storeStatusType,storeType} from 'api/config';
  import {getStoreList,addOneStore,deleteSomeStore,editOneStore,editStatusStore} from 'api/store'


  export default {
    data() {
      return {
        tableOne:true,
        tableTwo:false,
        form:{},
        list:[{
          kjID:'1234',
       ddID:'45646',
        people:'121',
          money:'3000'
        },
          {
            kjID:'5252',
            ddID:'52424',
            people:'525',
            money:'10000'
          }],
        page:1,
        listLoading: false,
      }
    },
    created() {
      // this._getList(this.page);

    },
    methods:{
      changeColor({ row, column, rowIndex, columnIndex }){
        if(rowIndex===0)
        {
          return 'background:#F2F2F2'
        }else
        {
          return ''
        }
      },
      backTo(){
        this.tableOne=true;
        this.tableTwo=false;
      },
       change(){
         this.tableOne=false;
         this.tableTwo=true;
       },
      callback(){
        // this._getList();
      },
      // _getList(){
      //   this.listLoading = true;
      //   getStoreList().then((ops)=>{
      //     this.list=ops.content;
      //     this.listLoading = false;
      //   })
      // },

    }
  }
</script>

<style scoped>
  .span1
  {
    height:100px;
    width:90%;
    margin: 0 auto;
    background: #F2F2F2;
  }
  .span2{
    height:500px;
    width:90%;
    margin: 20px auto;
    background: white ;
  }
  .t{
    width:600px;
    margin-left: 20px;
    margin-top: 30px;
  }

  .Tel
  {
    margin-top: -62px;
    margin-left: 210px;
  }

  .type
  {
    width:130px;
    height:40px;
  }
  .Type
  {
    margin-top: -62px;
    margin-left: 430px;
  }
  .Form
  {
    height:400px;
    width:600px;
  }
  .wxx
  {
    width:130px;
    height:40px;
    /*margin-left: -430px;*/
    /*margin-top: 62px;*/
  }
  .Wxx
  {
    margin-top: -62px;
    margin-left: 210px;
  }
  .btn
  {
    margin-top: 50px;
    margin-left:240px;
  }
  .send
  {
    margin-top: -62px;
    margin-left: 380px;
  }
  .search
  {
    margin-top: 30px;
    height:40px;
    width:200px;
    margin-left: 20px;
  }
</style>
