<template>

  <div class="app-container">
    <div class="span1">
      <el-input class="search" placeholder="输入查询关键字" clearable>
      </el-input>
      <el-button type="primary" style="margin-left: 12px;"   >查询</el-button>
      <div class="time">
        <h4 style="height:100%;width:18%;font-weight: normal;position: absolute;margin-top: 10px;text-align: center;">起止日期</h4>
        <el-date-picker
          v-model="value4"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:80%;margin-left: 20%;height:100%;position: absolute">
        </el-date-picker>
      </div>
    </div>
    <div class="span2">
      <el-table class="w"  :data="list"  v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="changeColor">
        <el-table-column label="客户姓名" align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.name}}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.phone}}
          </template>
        </el-table-column>
        <el-table-column label="客户等级" align="center"  width="90" >
          <template slot-scope="scope">
            {{scope.row.customer&&graDe(scope.row.customer.grade)}}
          </template>
        </el-table-column>
        <el-table-column label="回访状态" width="80"  align="center">
          <template slot-scope="scope">
            {{statUs(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column label="保险到期时间"   align="center">
          <template slot-scope="scope">
            {{scope.row.insuranceExpTime}}
          </template>
        </el-table-column>
        <el-table-column label="微信名" width="90"  align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.wechatName}}
          </template>
        </el-table-column>
        <el-table-column label="微信号"   align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.wechatNumber}}
          </template>
        </el-table-column>
        <el-table-column label="分配人" width="100"  align="center">
          <template slot-scope="scope">
            {{scope.row.assignerName}}
          </template>
        </el-table-column>
        <el-table-column label="分配时间"  align="center">
          <template slot-scope="scope">
            {{ scope.row.assignerTime |timeFormat}}
          </template>
        </el-table-column>
        <el-table-column label="销售员" width="90"  align="center">
          <template slot-scope="scope">
            {{scope.row.employee&&scope.row.employee.name}}
          </template>.
        </el-table-column>
        <el-table-column label="操作"  width="150"    align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogShow('show',scope.row)"> 查看</el-button>
            <el-button type="text" size="mini" @click="dialogShow('allot',scope.row)" :class="buttonStyle(scope)" :disabled="btn(scope)"  >{{Status(scope.row.status)}}</el-button>
            <el-button type="text" size="mini" @click="dialogShow('back',scope.row)" :class="newButtonStyle(scope)" :disabled="newBtn(scope)" >{{newStatus(scope.row.status)}}</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!--显示的页面-->
      <el-dialog width="30%" :title="titleOne" :visible.sync="dialogFormVisibleOne"
                 style="height:500px;margin-top: 140px;">
        <el-form :model="form">
          <el-form-item label="请选择回访人" label-width="120px" style="margin-top: -30px;">
            <el-select v-model="employeeId" placeholder="请选择" style="margin-left:-97px;width:160px;margin-top: 50px;">
              <el-option
                v-for="item in options"
                :key="item.employeeId"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input v-model="number" auto-complete="off" placeholder="工号" style="width:160px;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogConfirm()">发送短信</el-button>
        </div>
      </el-dialog>
      <!--显示的分配弹框-->
      <el-dialog width="54%" :title="title" :visible.sync="dialogFormVisibleTwo">
        <el-form :model="form" class="Form">
          <el-form-item label="回访人" label-width="80px" style="margin-left: -14px;margin-top: -19px;">
            <el-select v-model="employeeId" placeholder="请选择" style="margin-left:14px;">
              <el-option
                v-for="item in options"
                :key="item.employeeId"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="沟通时间" label-width="80px" style="margin-left: 310px;">
            <el-date-picker
              v-model="emTime"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              style="width:200px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="沟通结果" label-width="80px"  >
            <textarea v-model.trim="result" auto-complete="off"
                      style="width:512px;height: 80px;resize: none;border-radius: 4px;border:1px solid #DDE0E7;"></textarea>
          </el-form-item>
          <el-form-item label="回访状态" label-width="80px" style="margin-top: -13px;margin-top: -14px;">
            <el-select v-model="valueStatus" placeholder="请选择" style="width:200px;">
              <el-option
                v-for="item in optionStatus"
                :key="item.valueStatus"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="客户等级" label-width="80px" style="margin-left: 310px">
            <el-select v-model="valueGrade" placeholder="请选择" style="width:200px;height:60px;">
              <el-option
                v-for="item in optionGrade"
                :key="item.valueGrade"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主管" label-width="80px" style="margin-left: -27px;margin-top: -19px;">
            <el-input class="wxx" v-model.trim="supervisorName" auto-complete="off"
                      style="margin-left: 27px;width:200px;"></el-input>
          </el-form-item>
          <el-form-item class="Wxx" label="意见" label-width="80px" style="margin-left: 283px;">
            <el-input v-model.trim="supervisorOpinion" auto-complete="off"
                      style="margin-left: 27px;width:200px;"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="btn" type="primary" @click="dialogConfirm()">保存信息</el-button>
      </el-dialog>
      <!--回访的弹框-->
      <div class="page">
        <el-pagination
          background
          layout="prev,pager, next,jumper"
          :page-count="totalPage"
          :current-page="page"
          :current-page.sync="currentPage3"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {timeZero} from 'common/js';
  import {ERR_OK,customerGrade,receptionStatus,callType,buycar} from 'api/config';
  import {getEmployeeList,addEmployeeNumber} from "api/employee";
  import {addRecord} from "api/record";
  import {getInsuranceList,takeMask,editInsuranceStatus,editCustomerGrade} from "api/insurance";
  import {historyPageMixin} from 'common/js/mixin';

  export default {
    data() {
      return {
        value4:'',
        currentPage3:1,
        supervisorName:'',
        supervisorOpinion:'',
        emTime:'',
        result:'',
        number:'',
        recordItemStack:{},
        size:10,
        dialogFormVisibleOne:false,
        dialogFormVisibleTwo:false,
        callType:'',
        optionGrade: [{
          value: 1,
          label: 'A'
        }, {
            value: 2,
            label: 'B'
          }, {
            value:3,
            label: 'C'
          }],
        valueGrade:'',
        optionStatus:
          [ {
            value: 3,
            label: '已回访'
          }, {
            value: 4,
            label: '已转化'
          }, {
            value: 5,
            label: '已结束'
          }],
        valueStatus:'',
        options: [],
        employeeId: '',
        title:'',
        titleOne:'分配人员',
        form:{
        },
        dialogFormVisible: false,
        list:[],
        listLoading: false,
        dialogIDVisible:false,
        totalPage:null,
        elRadioType:"3",
      }
    },
    mixins:[historyPageMixin],
    filters:{
      timeFormat(val){
        let time=new Date(val);
        let year=time.getFullYear();
        let month=timeZero(time.getMonth()+1);
        let date=timeZero(time.getDate());
        let hour=timeZero(time.getHours());
        let minute=timeZero(time.getMinutes());
        return `${year}-${month}-${date}  ${hour}:${minute}`
      }
    },//根据时间戳形成对应的时间
    methods:{
      callback(text){
        this._getList(this.page-1);
        this.dialogFormVisible=false;
        this.$message.success(text);
      },
      _getList(page){
        this.listLoading = true;
        getInsuranceList(page,this.size).then((ops)=>{
          this.list=ops.content;
          this.totalPage=ops.totalPages;
          this.listLoading = false;
        })
      },
      newBtn(scope){
        if(scope.row.status===1 || scope.row.status===2) {
          return false;
        }else{
          return true;
        }
      },
      btn(scope) {
        if(scope.row.status===1)
        {
          return false;
        }else{
          return true;
        }
      },
      newButtonStyle(scope){
        if(scope.row.status===1 || scope.row.status===2)
        {
          return 'green';
        }else{
          return 'red';
        }
      },
      buttonStyle(scope){
        return `${scope.row.status===1?'green':'red'}`
      },
      newStatus(status) {
        if(status===1 || status===2)
        {
          return '回访'
        }else{
          return '已回访'
        }
      },
      Status(status){
        return status===buycar.start?'分配':"已分配";
      },
      changeColor({ row, column, rowIndex, columnIndex }){
        if(rowIndex===0)
        {
          return 'background:#F2F2F2'
        }else
        {
          return ''
        }
      },
      graDe(grade){
        if(grade===customerGrade.gOne)
        {
          return grade="A"

        }else if(grade===customerGrade.gTwo)
        {
          return  grade="B"
        }else{
          return  grade="C"
        }
      },
      tyPe(calltype){
        return calltype===callType.typeOne?"保险":"回访";
      },
      statUs(status){
        if(status===receptionStatus.statusOne)
        {
          return status="待分配"
        }else if(status===receptionStatus.statusTwo)
        {
          return status="待回访"
        }else if(status===receptionStatus.statusThree)
        {
          return status="已回访"
        }else if(status===receptionStatus.statusFour)
        {
          return status="已转化"
        }
        else {
          return status="已结束"
        }
      },
      addNumber(){
        addEmployeeNumber(this.number,this.employeeId).then(()=>{
        })
      },
      editGrade(){
        editCustomerGrade(this.form.customer,this.form.customer.id).then(()=>{
        })
      },
      editStauts(){
        editInsuranceStatus(this.valueStatus,this.form.id).then(()=>{
          this.callback("回访成功");
        })
      },
      allotCustomer() {
        let form=this.form;
        takeMask(form.assignerName,this.employeeId,form.id).then(()=>{
          this.callback("分配成功")
        })
      },
      addOneRecord() {
        let employee;
        this.options.some((item)=>{
          if(item.id===this.employeeId){
            employee=item;
            return true;
          }
        });
        addRecord(this.form.id,employee.name,this.emTime,this.result,this.supervisorName,this.supervisorOpinion).then(() => {
        })
      },
      dialogShow(type,row){
        this.form=Object.assign({},row);
        getEmployeeList().then((ops)=>{
          this.options=ops.content;
        })
        if(type==='show')
        {
          this.$router.push({path: `/HF/showLook/${this.page}`, query: {id: row.id}});
        }
        if(type==='allot')
        {
          this.dialogFormVisibleOne=true;
          this.employeeId=null;
          this.number=null;
          this.form=Object.assign({},row);
        }
        if(type==='back'){
          this.dialogFormVisibleTwo=true;
          this.employeeId=row.employee.id;
          this.form.status=this.valueStatus;
          this.form.customer.grade=this.valueGrade;
          this.valueStatus=null;
          this.valueGrade=null;
          this.employeeId=row.employee.id;
          this.form={
            customer:{},
            record:{
            }
          };
          this.form.id=row.id;
          this.form.customer=row.customer;
        }
        this.type=type;
      },
      dialogConfirm(){
        this.dialogFormVisible = false;
        if(this.type==='allot')
        {
          this.dialogFormVisibleOne = false;
          this.form.employee.id=this.employeeId;
          this.allotCustomer();
          this.addNumber();
        }else if(this.type==='back'){
          this.dialogFormVisibleTwo=false;
          this.editStauts();
          this.editGrade();
          this.addOneRecord();
        }
      }

    }

  }
</script>

<style scoped>
  .green
  {
    color: #797979;
  }
  .red{
    color: #FF0000;
  }
  .el-table{
    width:100%;
    /*margin: 2px auto;*/
    margin-left: 5.5%;
    font-size: 12px;
  }
  .span1
  {
    height:100px;
    margin:20px auto;
    width:90%;
    background: #F2F2F2;
  }
  .el-select .el-input__inner
  {
    width:120px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner
  {
    width:120px;
  }
  .el-input__inner
  {
    width:125%;
  }
  .span2{
    height:500px;
    width:90%;
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
    margin-left: 250px;
  }

  .type
  {
    width:140px;
    height:60px;
  }
  .Type
  {
    margin-top: -62px;
    margin-left: 520px;
  }
  .Form
  {
    width:600px;
  }
  .wxx
  {
    width:140px;
    height:40px;
  }
  .Wxx
  {
    margin-top: -62px;
    margin-left: 210px;
  }
  .btn
  {
    margin-left:54%;
  }
  .send
  {
    margin-top: -62px;
    margin-left: 455px;
  }
  .search
  {
    margin-top: 30px;
    height:40px;
    width:200px;
    margin-left: 20px;
  }
  .page
  {
    margin-top: 30px;
    text-align: center;
  }
  .el-radio__label
  {
    display: inline-block;
    margin-top: -30px;
  }
  .time{
    height:42px;
    width:50%;
    margin-left: 45%;
    margin-top: -41px;
    position: relative;
  }
</style>
