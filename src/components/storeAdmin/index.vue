<template>

  <div class="app-container">
    <div class="span1">
      <el-input class="t" placeholder="输入搜索关键字" clearable v-model="namelike">
      </el-input>
      <el-button type="primary"  style="margin-left: 12px;" >查询</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="dialogShow('add')">添加门店</el-button>
    </div>

    <div class="span2">
      <el-table  :data="storeList.content"   border fit highlight-current-row :header-cell-style="changeColor" style="width:100%">
        <el-table-column align="center" label='门店编号'  >
          <template slot-scope="scope" :column-key="scope.row.id">
            {{scope.row.number}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='门店名称'  >
          <template slot-scope="scope" :column-key="scope.row.id">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">
            {{shopStatus(scope.row.disabled)}}
          </template>
        </el-table-column>
        <el-table-column label="地点" align="center">
          <template slot-scope="scope">
            {{scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column label="联系电话"  align="center">
          <template slot-scope="scope">
            {{scope.row.tel}}
          </template>
        </el-table-column>
        <el-table-column label="门店类型"  align="center">
          <template slot-scope="scope">
            {{shopType(scope.row.shopTypeEnum)}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" :class="buttonStyle(scope)" @click="forbid(scope.row)"> {{btnDis(scope.row.disabled)}}</el-button>
            <el-button type="text" size="mini" @click="dialogShow('edit',scope.row)" >编辑</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="52%">
        <el-form :model="form">
          <el-form-item label="门店编号" label-width="80px">
            <el-input class="smallInput" v-model="form.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" label-width="80px">
            <el-input v-model.trim="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" label-width="80px">
            <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" label-width="80px">
            <el-input v-model="form.tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="门店状态" label-width="80px" v-show="isShow">
            <el-radio v-model="elRadio"  label="1"  >营业</el-radio>
            <el-radio v-model="elRadio"  label="2" disabled>禁用</el-radio>
          </el-form-item>
          <el-form-item label="门店类型" label-width="80px">
            <el-radio v-model="elRadioStore"  label="1"  >自营店</el-radio>
            <el-radio v-model="elRadioStore"  label="2" >加盟店</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </div>
      </el-dialog>

      <div class="page">
        <el-pagination
          background
          layout="prev,pager,next,jumper"
          :page-count="storeList.totalPages||1"
          :current-page.sync="currentPage3"
          @current-change="changePage">
        </el-pagination>
      </div>

    </div>
  </div>


</template>
<script>
  import {ERR_OK,storeStatusType,storeType} from 'api/config';
  import storeSource from 'graph/store.graphql'
  import  gql from 'graphql-tag'
  import  {filterAttr} from 'common/js/index'
  import {getStoreList,addOneStore,editOneStore,editStatusStore,deleteOneStore} from 'api/store'

  export default {
    data() {
      return {
        namelike:'',
        size:20,
        value: '',
        disabled:false,
        title:'',
        form:{},
        dialogFormVisible: false,
        page:1,
        isShow:false,
        totalPage:null,
        elRadio:'5',
        elRadioStore:"3",
        currentPage3:1,
        content:{},
        storeList:{
        }
      }
    },
    apollo:{
      storeList:{
        query:storeSource.shopList,
        update:data=>data.ShopList,
        variables(){
          return {
            namelike:"%"+this.namelike+"%",
            paginator:{
              page:this.page,
              size:this.size
            }
          }
        }
      }
    },
    methods:{
      btnDis(disabled){
        if(disabled===true)
        {
          return "启用"
        }else{
          return "禁用"
        }
      },
      shopStatus(disabled){
        if(disabled===true){
          return "禁用"
        }else{
          return "启用"
        }
      },
      shopType(type){
        if(type==="COPORATE")
        {
          return "加盟店"
        }else{
          return "自营店"
        }
      },
      changeColor({ row, column, rowIndex, columnIndex }){
        if(rowIndex===0)
        {
          return 'background:#F2F2F2'
        }else
        {
          return ''
        }
      },//表格第一行的背景色
      changePage(){
        this.page=this.currentPage3;
      },
      buttonStyle(scope){
        return `${scope.row.disabled===true?'green':'red'}`
      },
      forbid(row){
        let a={
          id: row.id,
          shopTypeEnum:row.shopTypeEnum,
          name:row.name,
          address:row.address,
          tel:row.tel,
          number:row.number
        };
        if(row.disabled===false)
        {
          this.$apollo.mutate({
            mutation:storeSource.disabledShop,
            variables:{
              dis:a
            }
          }).then((data) => {if(data.errors){alert("报错！");}else{
            this.callback('禁用成功');
          }}).catch((error) => {console.error(error)});
          
        }else{
          this.$apollo.mutate({
            mutation:storeSource.enabledShop,
            variables:{
              en:a
            }
          }).then((data) => {if(data.errors){alert("报错！");}else{
            this.callback('启用成功');
          }}).catch((error) => {console.error(error)});

        }
      },
      callback(text){
        this.$apollo.queries.storeList.refetch();
        this.$message.success(text);
      },
      common(){
        if(this.elRadioStore==="1")
        {
          this.form.shopTypeEnum="OWN";
        }else{
          this.form.shopTypeEnum="COPORATE";
        }
      },
      dialogShow(type,row){
        this.dialogFormVisible = true;
        this.isShow=false;
        if(type==='add'){
          this.title='门店添加';
          this.form={};
          this.elRadio="1";
          this.isShow=true;
          this.elRadioStore="1";
        }
        else{
          this.title='门店修改';
          // this.form=Object.assign({},row);
          this.form={
            id: row.id,
            shopTypeEnum:row.shopTypeEnum,
            name:row.name,
            address:row.address,
            tel:row.tel,
            number:row.number
          };
          if(this.form.shopTypeEnum==="OWN"){
            this.elRadioStore="1"
          }else{
            this.elRadioStore="2"
          }
        }
        this.type=type;
      },
      addOneStore(){
        let form=this.form;
        if(form.number&&form.name&&form.address&&form.tel)
        {
          this.common();
          this.$apollo.mutate({
              mutation:storeSource.addShop,
              variables:{
                "shop":this.form
        }
          }).then((data) => {if(data.errors){alert("报错！");}else{
            this.callback('添加成功');
          }}).catch((error) => {console.error(error)});

        }else{
          this.$message.info('请填写完整的信息后进行添加');
        }
      },
      editOneStore(){
        this.common();
        this.$apollo.mutate({
          mutation:storeSource.updateShop,
          variables:{
              update:filterAttr(this.form)
          },
        });
        this.callback('修改成功');
      },
      dialogConfirm(){
        this.type==='add'?this.addOneStore():this.editOneStore();
        this.dialogFormVisible=false;
      },
    }
  }
</script>

<style  scoped>
  .el-table
  {
    font-size: 12px;
  }
  .green
  {
    color: #797979;
  }
  .red{
    color: #FF0000;
  }
  .span1
  {
    width: 90%;
    height:100px;
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
    width:200px;
    margin-left: 20px;
    margin-top: 30px;
  }
  .page
  {
    text-align: center;
    margin-top: 30px;
    position: relative;
  }
  .el-button--danger
  {
    border:none;
  }
</style>
