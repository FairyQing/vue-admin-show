<template>
  <div class="app-container">
    <div class="search">
      <el-input class="searchInput" placeholder="输入搜索关键字" v-model="input4">
      </el-input>
      <el-button class="searchButton" type="primary"  style="margin-left: 12px;" >查询</el-button>
      <el-button  class="searchButton" type="primary"  @click="dialogShow('add')" style="margin-left: 1%">增加管理员</el-button>
<!--      <el-button  type="danger" @click="deleteOne" style="margin-left: 1%">删除选中</el-button>-->
    </div>
    <el-table :data="list.content"  border fit highlight-current-row class="list" >
      <el-table-column label="账号" width="100" align="center"  >
        <template slot-scope="scope">
          {{scope.row.number}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="联系方式"width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column label="密码" width="0"   align="center">
        <template slot-scope="scope">
          {{scope.row.pwd}}
        </template>
      </el-table-column>
      <el-table-column label="角色"width="150" align="center">
        <template slot-scope="scope">
          {{adminlevel(scope.row.level)}}
        </template>
      </el-table-column>
      <el-table-column label="状态"width="100" align="center">
        <template slot-scope="scope">
          {{adminStatus(scope.row.disabled)}}
        </template>
      </el-table-column>
      <el-table-column label="添加时间"  align="center">
        <template slot-scope="scope">
          {{scope.row.createtime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="dialogShow('edit',scope.row)">修改</el-button>
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
        <el-form-item label="名称" label-width="100px" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px" prop="tel">
          <el-input v-model.trim="form.tel"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-radio v-model="form.level"  label="A"  >超级管理员</el-radio>
          <el-radio v-model="form.level"  label="B" >普通管理员</el-radio>
          <el-radio v-model="form.level"  label="C" >财务管理员</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-radio v-model="form.disabled" :label="false" >正常</el-radio>
          <el-radio v-model="form.disabled" :label="true"  >离职</el-radio>
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model.trim="form.number" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="pwd">
          <el-input v-model.trim="form.pwd" type="password"  placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" label-width="100px" prop="repeatPassword">
          <el-input v-model.trim="form.repeatPassword" type="password" placeholder="请输入确定密码"></el-input>
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
  import {ERR_OK,carSourceStatus,adminlevel} from 'api/config';
  import adminGraph from 'graph/admin.graphql';
  import gql from 'graphql-tag';
  import {filterAttr} from 'common/js'
  var _ = require('lodash');

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
      var that=this;
      var validatorTest2=(rule, value, callback)=> {
        if (that.form.pwd != that.form.repeatPassword) {
          callback(new Error('请重复密码'));
        } else {
          callback();
        }
      };
      return {
        input4:'',
        deleteArr:[],
        form: {},
        title:'',
        dialogFormVisible: false,
        list: {},
        currentPage:null,
        pagesize:5,
        page:1,
        size:10,
        currentPage3:1,
        checkBoxList:[],
        rules:{
          tel:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { max: 11, message: '长度不超过11位', trigger: 'blur' },
            { validator: validateTel, trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          address:[
            { required: true, message: '请输入地点', trigger: 'blur' },
          ],
          pwd:[{required: true, message: '请输入密码', trigger: 'blur' }
          ],
          repeatPassword:[{required: true, message: '请重复密码', trigger: 'blur' },
            {trigger: 'blur',validator:validatorTest2}
          ]
        }
      }
    },
    apollo:{
      list: {
        query: adminGraph.AdministList,
        update: data => data.AdministList,
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
    },
    methods: {
      adminlevel(level){
        if(level===adminlevel.super){
          return level='超级管理员'
        }else if(level===adminlevel.normol){
          return level='普通管理员'
        }else{
          return level='财务管理员'
        }
      },
      Status(status) {
        return status === carSourceStatus.start ? '启用' : "禁用";
      },
      statusColor(status) {
        return `color:${status === carSourceStatus.start ? '#797979' : "#F00000"};`
      },
      adminStatus(disabled) {
        return disabled === carSourceStatus.start ? '离职' : "正常";
      },
      changePage(){
        this.page=this.currentPage3;
      },
      dialogShow(type,row){
        this.dialogFormVisible = true;
        this.$nextTick(()=>{
          this.$refs.form.resetFields();
          this.type=type;
          this.form = type === 'add' ? {disabled:false,level:"A"} :Object.assign({}, row);
          console.log(this.form)
          this.title = type === 'add' ?  '添加管理员' : '管理员信息修改';
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
          mutation: adminGraph.administ,
          variables:{
            administ:_.omit(this.form,['repeatPassword'])
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("修改成功");
        }}).catch((error) => {console.error(error)});
      },




      editTag() {
        this.$apollo.mutate({
          mutation: adminGraph.updateAdmin,
          variables:{
            admin:_.omit(this.form,['repeatPassword','__typename'])
          },
        }).then((data) => {if(data.errors){
          alert("报错！");
        }else{
          this.callback("修改成功");
        }}).catch((error) => {
          // Error
          console.error(error)
          // We restore the initial user input
        });
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
          mutation: adminGraph.disAdmin,
          variables:{
            disAdmin:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){
          alert("报错！");
        }else{
          this.callback("禁用成功");
        }}).catch((error) => {
          console.error(error)
        });

      },
      enable(row){
        this.form=Object.assign({}, row);
        this.form.disabled=false;
        this.$apollo.mutate({
          mutation: adminGraph.enAdmin,
          variables:{
            enAdmin:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){
          alert("报错！");
        }else{
          this.callback("禁用成功");
        }}).catch((error) => {
          console.error(error)
        });
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
