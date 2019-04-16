<template>
  <div class="app-container">
    <div class="search">
      <el-input class="searchInput" placeholder="输入搜索关键字" v-model="input4"></el-input>
      <el-button class="searchbutton" type="primary" style="margin-left: 12px;">查询</el-button>
      <el-button class="searchbutton" type="primary" style="margin-left: 1%" @click="dialogShow('add')">增加来源</el-button>
    </div>
    <el-table :data="list"  border fit highlight-current-row class="list">
      <el-table-column label="编号" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.number}}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          {{SourceStatus(scope.row.disabled)}}
        </template>
      </el-table-column>
      <el-table-column label="地点" align="center">
        <template slot-scope="scope">
          {{scope.row.address}}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="150" align="center">
        <template slot-scope="scope">
          {{SourceType(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100"  align="center">
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
      :page-count="totalPage"
      :current-page.sync="currentPage3"
      @current-change="changePage">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称" label-width="100px"  prop="name">
          <el-input v-model.trim="form.name" placeholder="输入车辆来源"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px"  >
          <el-radio v-model="form.disabled" :label="false">营业中</el-radio>
          <el-radio v-model="form.disabled" :label="true" :disabled="disable">禁用中</el-radio>
        </el-form-item>
        <el-form-item label="地点" label-width="100px" prop="address">
          <el-input v-model.trim="form.address" placeholder="请输入地点"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px" >
          <el-radio v-model="form.type" label="OWN">4S店</el-radio>
          <el-radio v-model="form.type" label="COPORATE">厂家</el-radio>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px" prop="tel">
          <el-input v-model.trim="form.tel"  placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import carGraph from 'graph/car.graphql';
  import gql from 'graphql-tag';
  import {filterAttr} from 'common/js'
  import {ERR_OK, carSourceType, carSourceStatus} from 'api/config';
  /* import {historyPageMixin} from "common/js/mixin"*/
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
        currentPage3:1,
        isable:true,
        type1:'',
        input4: '',
        deleteArr: [],
        form: {},
        page:1,
        size:20,
        title: '',
        dialogFormVisible: false,
        list: [],
        listLoading: true,
        currentPage: null,
        pagesize: 5,
        totalPage: null,
        checkBoxList: [],
        CarSourceConnection:'',
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
        }
      }
    },
    apollo:{
      list1: {
        query: carGraph.CarSourceList,
        update: data => data.CarSourceList,
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
      list: {
        query: carGraph.CarSourceList,
        update: data => data.CarSourceList.content,
        variables(){
          return {
            namelike:"%"+this.input4+"%",
            paginator:{
              page:this.page,
              size:this.size
            }
          }
        }
      }

    },
    created(){
      setTimeout(()=>{
        this.totalPage=this.list1.totalPages;
      },1000)
    },
    /* mixins: [historyPageMixin],*/
    methods: {
      changePage(){
        this.page=this.currentPage3;
      },
      Status(status) {
        return status === carSourceStatus.start ? '启用' : "禁用";
      },
      statusColor(status) {
        return `color:${status === carSourceStatus.start ? '#797979' : "#F00000"};`
      },
      SourceType(SourceType) {
        return SourceType === carSourceType.shop ? '4S店' : "厂家";
      },
      SourceStatus(Status) {
        return Status === carSourceStatus.start ? '禁用中' : "营业中";
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
          mutation: carGraph.disabled,
          variables:{
            carsource:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("禁用成功");
        }}).catch((error) => {console.error(error)});

      },
      enable(row){
        this.form=Object.assign({}, row);
        this.form.disabled=false;
        this.$apollo.mutate({
          mutation: carGraph.enabled,
          variables:{
            carsource:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("启用成功");
        }}).catch((error) => {console.error(error)});
      },
      callback(text) {
        this.dialogFormVisible = false;
        this.$message.success(text);
        setTimeout(()=>{
          this.$apollo.queries.list.refetch();
        },100)

      },
      /*      handleSizeChange: function (size) {
              this.pagesize = size;
            },
            handleCurrentChange: function (currentPage) {
              this.currentPage = currentPage;
            },*/
      addTag() {
        this.$apollo.mutate({
          mutation: carGraph.addCar,
          variables:{
            carsource:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("添加成功");
        }}).catch((error) => {console.error(error)});
      },
      editTag() {
        this.$apollo.mutate({
          mutation: carGraph.editCar,
          variables:{
            carsource:filterAttr(this.form,'disabled')
          },
        }).then((data) => {if(data.errors){alert("报错！");}else{
          this.callback("修改成功");
        }}).catch((error) => {console.error(error)});

      },
      dialogShow(type,row) {
        this.dialogFormVisible = true;
        this.$nextTick(()=>{
          this.$refs.form.resetFields();
          this.type = type;
          this.form = type === 'add' ? {type:'OWN',disabled:false} : Object.assign({}, row);
          this.title = type === 'add' ? '添加来源' : '信息修改'
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
    }
  }
</script>

<style scoped>
  .el-table {
    font-size: 12px;
  }
  .search {
    width: 90%;
    margin: 0 auto;
    background: #F2F2F2;
  }
  .list {
    width: 90%;
    margin: 0 auto;
    margin-top: 2%;
  }
  .searchInput {
    margin-top: 20px;
    margin-left: 50px;
    width: 25%;
    margin-bottom: 20px;
  }
  .searchbutton {
    margin-top: 20px;
    margin-left: 50px;
  }
  .pagination {
    text-align: center;
  }
</style>
