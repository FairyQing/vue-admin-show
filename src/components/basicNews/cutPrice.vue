<template>

  <div class="app-container cut">
    <div class="adiv">
      <el-table  :data="list"  v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="changeColor">
        <el-table-column label="人数" align="center">
          <template slot-scope="scope">
            {{scope.row.people}}
          </template>
        </el-table-column>
        <el-table-column label="金额"  align="center">
          <template slot-scope="scope">
            {{scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column label="有效时间" align="center"  width="240" >
          <template slot-scope="scope">
            {{scope.row.time}}
          </template>
        </el-table-column>
        <el-table-column label="操作"    align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogShow('edit',scope.row)" > 编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog  width="30%" :title="title" :visible.sync="dialogFormVisible" style="height:500px;margin-top: 140px;">
      <el-form :model="form">
        <el-form-item label="人数" label-width="60px">
          <el-input class="a" v-model="form.people" auto-complete="off" style="color:red;"></el-input>
        </el-form-item>
        <el-form-item label="金额" label-width="60px">
          <el-input class="a" v-model="form.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="有限时间" label-width="80px" style="margin-left: 7px;">
          <el-input class="b" v-model="form.time" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {ERR_OK,storeStatusType,storeType} from 'api/config';
  import {getStoreList,addOneStore,deleteSomeStore,editOneStore,editStatusStore} from 'api/store'


  export default {
    data() {
      return {
        title:"编辑",
        dialogFormVisible:false,
        form:{},
        list:[{
          people:'121',
          money:'3000',
          time:'24h'
        },
          {
            people:'123',
            money:'3000',
            time:'48h'
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
      change(){
        console.log("11")
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
      dialogShow(type,row){
        this.dialogFormVisible=true;
        this.form=row;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  .cut{
    .el-input__inner{
      color: #7e91e7;
    }
    .adiv{
      height:500px;
      width:90%;
      margin: 0px auto;
      background: white ;
    }
    .a{
      width:200px;
      margin-left: 30px;
    }
    .b{
      width:200px;
      margin-left: 4px;
    }
  }

</style>
