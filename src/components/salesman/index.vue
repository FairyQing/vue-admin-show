<template>
  <div class="app-container">
    <div class="search">
      <el-input class="searchInput" placeholder="输入搜索关键字" v-model="input4">
      </el-input>
      <el-button class="searchButton" type="primary"  style="margin-left: 12px;" >查询</el-button>
      <el-button class="searchButton" type="primary" style="margin-left: 1%" @click="dialogShow('add')">增加业务员</el-button>
    <!--
      <el-button class="searchButton" type="danger" @click="deleteOne" style="margin-left: 1%;">批量离职</el-button>
    -->
    </div>
    <el-table :data="list.content"  border fit highlight-current-row class="list"  @selection-change="checkAll">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column label="工号" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.number}}
        </template>
      </el-table-column>
      <el-table-column label="业务员姓名"  width="150"  align="center"  >
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column label="门店" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.shop&&scope.row.shop.name}}
        </template>
      </el-table-column>
      <el-table-column label="状态"  width="100" align="center">
        <template slot-scope="scope">
          {{EmployeeStatus(scope.row.disabled)}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.createtime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="dialogShow('edit',scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="forBid(scope.row)" :style="statusColor(scope.row.disabled)">
            {{Status(scope.row.disabled)}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev,pager,next,jumper"
      :page-count="list.totalPages"
      :current-page.sync="currentPage3"
      @current-change="changePage">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="业务员" label-width="100px" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入业务员名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="100px" prop="tel">
          <el-input v-model.trim="form.tel"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-radio v-model="form.disabled" :label="false" >正常</el-radio>
          <el-radio v-model="form.disabled" :label="true" :disabled="isable" >离职</el-radio>
        </el-form-item>
        <el-form-item label="门店" label-width="100px">
          <el-select  v-model="form.shop.id" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in storeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="dialogConfirm">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {ERR_OK,employeeStatus,carSourceStatus} from 'api/config';
  import {getStoreList} from 'api/store';
  import salesmanGraph from 'graph/salesman.graphql';
  import gql from 'graphql-tag';
  import {filterAttr} from 'common/js'
  //import {historyPageMixin} from "common/js/mixin"
  let validateTel=(rule, value, callback) => {
    let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    if (!reg.test(value)) {
      callback(new Error('手机号格式不正确'));
    } else {
      callback();
    }
  };
  export default {
    data() {
      return {
        isable:true,
        currentPage3:1,
        input4:'',
        deleteArr:[],
        form: {
          shop:{}
        },
        page:1,
        size:10,
        title:'',
        dialogFormVisible: false,
        list:{},
        currentPage:null,
        checkBoxList:[],
        storeList: [],
        rules:{
          tel:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { max: 11, message: '长度不超过11位', trigger: 'blur' },
            { validator: validateTel, trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入业务员', trigger: 'blur' },
          ],
        }
      }
    },
    //mixins:[historyPageMixin],
    apollo:{
      list: {
        query: salesmanGraph.findSalesmanList,
        update: data => data.SalesmanList,
        variables(){
          return {
            namelike:"%"+this.input4+"%",
            paginator:{
              page:this.page,
              size:this.size
            }
          }
        }
      },
      storeList:{
        query:salesmanGraph.findShopList,
        update: data => data.ShopList.content,
        variables:{
          paginator:{
            "page":1,"size":10
          }
        },
      }
    },

    methods: {
      Status(status) {
        return status === carSourceStatus.start ? '启用' : "禁用";
      },
      statusColor(status) {
        return `color:${status === carSourceStatus.start ? '#797979' : "#F00000"};`
      },
      changePage(){
        this.page=this.currentPage3;
      },
      selectChange(val){
       this.form.shop.name=window.event.target.innerText;
      },
      checkAll(selection){
        this.deleteArr=[]
        selection.forEach((item)=>{
          this.deleteArr.push(item.id);
        })
      },
      EmployeeStatus(status){
        return status===employeeStatus.normal?'正常':"离职";
      },
      CheckChange(id){
        this.deleteArr.push(id);
      },
     dialogShow(type,row){
       this.dialogFormVisible = true;
       this.$nextTick(()=>{
         this.$refs.form.resetFields();
         this.type=type;
         this.form = type === 'add' ? {shop:{},disabled:false} :JSON.parse(JSON.stringify(row));
         console.log(this.form)
         this.title = type === 'add' ? '添加业务员' : '业余员信息修改';
       })
      },
      dialogConfirm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let form=this.form;
            let fn=this.type === 'add'?this.addTag():this.editTag();
          } else {
            return false;
          }
        });
      },
      addTag() {
        this.$apollo.mutate({
          mutation: salesmanGraph.addSalesman,
          variables:{
            salesman:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("添加成功");
        }}).catch((error) => {console.error(error)});

      },
      editTag() {
        console.log(this.form);
        this.$apollo.mutate({
          mutation: salesmanGraph.editSalesman,
          variables:{
            salesman:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("修改成功");
        }}).catch((error) => {console.error(error)});

      },
      callback(text){
      this.dialogFormVisible=false;
      this.$message.success(text);
      setTimeout(()=>{
        this.$apollo.queries.list.refetch();
      },100)
    },
      forBid(row) {
        if(row.disabled===true){
          this.enable(row)
        }else{
          this.disable(row)
        }
      },
      disable(row){
        this.form=Object.assign({}, row);
        this.form.disabled=true;
        this.$apollo.mutate({
          mutation: salesmanGraph.disabled,
          variables:{
            salesman:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("禁用成功");
        }}).catch((error) => {console.error(error)});

      },
      enable(row){
        this.form=Object.assign({}, row);
        this.form.disabled=false;
        this.$apollo.mutate({
          mutation: salesmanGraph.enabled,
          variables:{
            salesman:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("启用成功");
        }}).catch((error) => {console.error(error)});

      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      deleteOne(){
        deleteOneEmployee(this.deleteArr).then(() => {
          this.callback('操作成功')
          this.deleteArr=[];
          this.checkBoxList=this.checkBoxList.map(()=>{
            return false;
          })
        })
      },
  }};
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
  .searchButton{
    margin-top: 20px;
    margin-left: 50px;
  }
  .pagination{
    text-align: center;
  }
  .el-button-danger
  {
    border:none;
  }

</style>
