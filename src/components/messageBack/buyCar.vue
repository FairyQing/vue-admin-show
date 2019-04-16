<template>

  <div class="app-container">
    <div class="aDiv1">
      <el-input class="search" placeholder="输入查询关键字" clearable>
      </el-input>
      <el-button type="primary" style="margin-left: 12px;">查询</el-button>
      <el-button type="primary" @click="dialogShow('add')">添加来访记录</el-button>
      <div class="time">
        <h4 style="height:100%;width:18%;font-weight: normal;position: absolute;margin-top: 10px;text-align: center;">起止日期</h4>
        <el-date-picker
          v-model="valueFour"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        style="width:80%;margin-left: 20%;height:100%;position: absolute">
        </el-date-picker>
      </div>
    </div>

    <div class="aDiv2">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit
                highlight-current-row :header-cell-style="changeColor">
        <el-table-column label="客户姓名"  align="center" style="border:none;">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.name}}
          </template>
        </el-table-column>
        <el-table-column label="联系电话"  align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.phone}}
          </template>
        </el-table-column>
        <el-table-column label="客户等级" align="center" width="90">
          <template slot-scope="scope">
            {{scope.row.customer&&graDe(scope.row.customer.grade)}}
          </template>
        </el-table-column>
        <el-table-column label="类型" width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&tyPe(scope.row.customer.callType)}}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">
            {{statUs(scope.row.receptionStatus)}}
          </template>
        </el-table-column>
        <el-table-column label="微信名" width="90" align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.wechatName}}
          </template>
        </el-table-column>
        <el-table-column label="微信号" align="center">
          <template slot-scope="scope">
            {{scope.row.customer&&scope.row.customer.wechatNumber}}
          </template>
        </el-table-column>
        <el-table-column label="分配人" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.assignerName}}
          </template>
        </el-table-column>
        <el-table-column label="分配时间"  align="center">
          <template slot-scope="scope">
            <!--{{ getTime(scope.row.record) |timeFormat}}-->
            {{ scope.row.assignerTime |timeFormat}}
          </template>
        </el-table-column>
        <el-table-column label="销售员" width="90" align="center">
          <template slot-scope="scope">
            {{scope.row.employee&&scope.row.employee.name}}
          </template>
          .
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogShow('show',scope.row)"> 查看</el-button>
            <el-button type="text" size="mini" @click="dialogShow('allot',scope.row)" :class="buttonStyle(scope)" :disabled="btn(scope)" >{{Status(scope.row.receptionStatus)}}</el-button>
            <el-button type="text" size="mini" @click="dialogShow('back',scope.row)" :class="newButtonStyle(scope)" :disabled="newBtn(scope)">{{newStatus(scope.row.receptionStatus)}}</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog width="54%" :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" class="Form" >
          <el-form-item label="客户姓名" label-width="80px">
            <el-input class="wxx" v-model.trim="form.customer&&form.customer.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="Tel" label="联系方式" label-width="80px" >
            <el-input class="wxx" v-model.trim="form.customer&&form.customer.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="Type" label="客户类型"  label-width="80px" style="margin-left: 500px;">
            <template>
              <el-radio v-model="form.customer.callType" label="1">来访</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="关注车型" label-width="80px">
            <el-input class="type" v-model.trim="form.carType" auto-complete="off" style="width:160px;"></el-input>
          </el-form-item>
          <el-form-item class="wxN" label="微信号"  label-width="90px"
                        style="margin-left: 228px;margin-top: -82px;">
            <el-input class="wxx" v-model.trim="form.customer&&form.customer.wechatNumber" auto-complete="off"
                      style="margin-left: 10px;"></el-input>
          </el-form-item>
          <el-form-item class="Wxx" label="微信名"  label-width="80px" style="margin-left: 485px;">
            <el-input class="wxx" v-model.trim="form.customer&&form.customer.wechatName" auto-complete="off"
                      style="width:160px;margin-left: 13px;"></el-input>
          </el-form-item>
          <el-form-item label="接待人" label-width="80px" style="margin-left: -15px;">
            <el-select   @change="employeeChange" v-model="employeeId" placeholder="请选择" style="margin-left: 15px;width:160px;">
              <el-option
                v-for="item in options"
                :key="item.employeeId"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="接待时间" label-width="80px" style="margin-left: 250px;">
            <el-date-picker
              v-model="recordItemStack.empResponseTime"
              type="datetime"
              placeholder="选择日期"
              value-format="timestamp"
              style="width:226px;margin-left: -3px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="接待记录" label-width="80px">
            <textarea v-model.trim="recordItemStack.result" auto-complete="off"
                      style="width:410px;height: 80px;resize: none;border-radius: 4px;border:1px solid #DDE0E7;"></textarea>
          </el-form-item>
          <el-form-item label="状态" label-width="80px" style="margin-left: -25px;">
            <el-select v-model="form.receptionStatus" placeholder="请选择" style="margin-left:26px; width:160px;">
              <el-option
                v-for="item in optionStatus"
                :key="item.receptionStatus"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="客户等级" label-width="80px" style="margin-left: 250px">
            <el-select v-model="form.customer.grade" placeholder="请选择" style="width:160px;height:60px;">
              <el-option
                v-for="item in optionGrade"
                :key="item.grade"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主管" label-width="80px" style="margin-left: -22px;">
            <el-input class="wxx" v-model.trim="recordItemStack.supervisorName" auto-complete="off"
                      style="margin-left: 22px;"></el-input>
          </el-form-item>
          <el-form-item class="Wxx" label="意见" label-width="80px" style="margin-left: 228px;">
            <el-input v-model.trim="recordItemStack.supervisorOpinion" auto-complete="off"
                      style="width:160px;margin-left: 22px;"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="btn" type="primary" @click="dialogConfirm()">{{ message }}</el-button>
      </el-dialog>
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
            <el-input auto-complete="off" v-model="number"  placeholder="工号" style="width:160px;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogConfirm()">发送短信</el-button>
        </div>
      </el-dialog>
      <el-dialog width="54%" :title="title" :visible.sync="dialogFormVisibleTwo">
        <el-form :model="form" class="Form">
          <el-form-item label="关注车型" label-width="80px">
            <el-input class="type" v-model.trim="form.carType" auto-complete="off" style="margin-left: 2px;"></el-input>
          </el-form-item>
          <el-form-item label="回访人" label-width="80px" style="margin-left: -15px;margin-top: -19px;">
            <el-select
              v-model="employeeId"
              placeholder="请选择"
              style="margin-left:17px;background-color: #DDE0E7;">
              <el-option
                v-for="item in options"
                :key="item.employeeId"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="回访时间" label-width="80px" style="margin-left: 310px;">
            <el-date-picker
              v-model="emTime"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              style="width:200px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="回访记录" label-width="80px"  >
            <textarea v-model.trim="result" auto-complete="off"
                      style="width:512px;height: 80px;resize: none;border-radius: 4px;border:1px solid #DDE0E7;"></textarea>
          </el-form-item>
          <el-form-item label="状态" label-width="80px" style="margin-left: -25px;margin-top: -13px;">
            <el-select v-model="form.receptionStatus" placeholder="请选择" style="margin-left:26px; width:200px;">
              <el-option
                v-for="item in optionStatus"
                :key="item.receptionStatus"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="客户等级" label-width="80px" style="margin-left: 310px">
            <el-select v-model="form.customer.grade" placeholder="请选择" style="width:200px;height:60px;">
              <el-option
                v-for="item in optionGrade"
                :key="item.grade"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主管" label-width="80px" style="margin-left: -24px;margin-top: -15px;">
            <el-input class="wxx" v-model.trim="supervisorName" auto-complete="off"
                      style="margin-left: 24px;width:200px;"></el-input>
          </el-form-item>
          <el-form-item class="Wxx" label="意见" label-width="80px" style="margin-left: 288px;">
            <el-input v-model.trim="supervisorOpinion" auto-complete="off"
                      style="margin-left: 22px;width:200px;"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="btn" type="primary" @click="dialogConfirm()">{{ message }}</el-button>
      </el-dialog>
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
    <router-view></router-view>

  </div>
</template>
<script>
  import {timeZero} from 'common/js';
  import {ERR_OK, customerGrade, receptionStatus, callType,buycar} from 'api/config';
  import {getCustomerList, addOneCustomer, editCustomerGrade, editReceptionStatus, takeMask} from 'api/buyCar'
  import {getEmployeeList,addEmployeeNumber} from "api/employee";
  import {addRecord} from "api/record";
  import {historyPageMixin} from 'common/js/mixin';


  export default {
    data() {
      return {
        receptionStatus:'',
        grade:'',
        valueFour:'',
        currentPage3:1,
        supervisorName:'',
        supervisorOpinion:'',
        recordItemStack:{},
        emTime:'',
        result:'',
        number:'',
        size:10,
        dialogFormVisibleTwo: false,
        dialogFormVisibleOne: false,
        titleOne: '分配人员',
        optionGrade:
          [{
          value: 1,
          label: 'A'
        },
          {
            value: 2,
            label: 'B'
          },
          {
            value: 3,
            label: 'C'
          }],
        optionStatus:[ {
          value: 3,
          label: '已回访'
        }, {
          value: 4,
          label: '已转化'
        }, {
          value: 5,
          label: '战败'
        }],
        options: [],
        employeeId: '',
        title: '',
        form: {
          customer:{
          }
        },
        dialogFormVisible: false,
        list: [],
        listLoading: false,
        totalPage: null,
        message: '保存信息',
      }
    },
    mixins:[historyPageMixin],
    filters: {
      timeFormat(val) {
        let time = new Date(val);
        let year = time.getFullYear();
        let month = timeZero(time.getMonth() + 1);
        let date = timeZero(time.getDate());
        let hour = timeZero(time.getHours());
        let minute = timeZero(time.getMinutes());
        return `${year}-${month}-${date}  ${hour}:${minute}`
      }
    },
    methods: {
      changeColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background:#F2F2F2'
        } else {
          return ''
        }
      },//设置表格的第一行的背景色
      employeeChange(){
          this.recordItemStack.empName=window.event.target.innerText;
      },//使查看页面的第一条记录的回访人===添加来访记录时候的接待人
      newBtn(scope){
        if(scope.row.receptionStatus===1 || scope.row.receptionStatus===2)
        {
          return false;
        }else{
          return true;
        }
      },
      btn(scope) {
        if(scope.row.receptionStatus===1)
        {
          return false;
        }else{
          return true;
        }
      },
      newButtonStyle(scope){
        if(scope.row.receptionStatus===1 || scope.row.receptionStatus===2)
        {
          return 'green';
        }else{
          return 'red';
        }
      },
      buttonStyle(scope){
        return `${scope.row.receptionStatus===1?'green':'red'}`
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
      //上面6段代码对应的是分配和回访按钮的颜色和是否允许被点击和根据状态显示的内容
      graDe(grade) {
        if (grade === customerGrade.gOne) {
          return grade = "A"
        } else if (grade === customerGrade.gTwo) {
          return grade = "B"
        } else {
          return grade = "C"
        }
      },
      tyPe(calltype) {
        return calltype === callType.typeOne ? "来访" : "回访";
      },
      _getEmployeeList(){
        getEmployeeList().then((ops) => {
          this.options = ops.content;
        });
      },
      statUs(status) {
        if (status === receptionStatus.statusOne) {
          return status = "待分配"
        } else if (status === receptionStatus.statusTwo) {
          return status = "待回访"
        } else if (status === receptionStatus.statusThree) {
          return status = "已回访"
        } else if (status === receptionStatus.statusFour) {
          return status = "已转化"
        } else {
          return status = "战败"
        }
      },
      //上面3段代码对应的是根据从后台获取的等级，类型，状态的数值生成对应的汉字
      dialogConfirm() {
        if (this.type === 'add') {
          this.dialogFormVisible = false;
          this.addOneJiLu();
        } else if (this.type === 'allot') {
           this.form.employee.id=this.employeeId;
          this.dialogFormVisibleOne = false;
          this.allotCustomer();
          this.addNumber();
        } else if (this.type === 'back') {
          this.dialogFormVisibleTwo=false;
          this.editRecptionStauts();
          this.addOneRecord();
          this.editGrade();
        }
      },
      allotCustomer() {
        let form = this.form;
        takeMask(form.assignerName, this.employeeId, form.id).then(() => {
          this.callback("分配成功")
        })
      },//点击分配时候重新分配一个人
      addNumber(){
        addEmployeeNumber(this.number,this.employeeId);
      },//点击分配时候分配的工号
      editGrade() {
        editCustomerGrade(this.form.customer, this.form.customer.id).then(() => {
          this.callback("操作完成")
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
      },//点击回访的时候添加的记录，回访时间，意见，主管
      editRecptionStauts() {
        editReceptionStatus(this.form.receptionStatus, this.form.id).then(() => {
        })
      },//点击回访的时候重新选择状态
      addOneJiLu() {
        let customer = this.form.customer;
        let record = this.form.record;
        record.recordItemStack=[this.recordItemStack];
       if (this.form.carType && customer.callType && customer.grade && customer.name
          && customer.phone && customer.wechatName && customer.wechatNumber && this.form.receptionStatus && this.recordItemStack.empResponseTime
          && this.recordItemStack.result && this.recordItemStack.supervisorName
          && this.recordItemStack.supervisorOpinion) {
          addOneCustomer(this.employeeId, this.form).then(() => {
            this.callback('添加成功');
          })
        }
        else {
          this.$message.info('请填写完整的信息后进行添加');
        }
      },//点击添加的事件
      callback(text) {
        this._getList(this.page-1);
        this.dialogFormVisible = false;
        this.$message.success(text);
      },
      _getList(page) {
        this.listLoading = true;
        getCustomerList(page,this.size).then((ops) => {
          this.list = ops.content;
          this.totalPage = ops.totalPages;
          this.listLoading = false;
        })
      },//获取数据
      dialogShow(type, row) {
         this._getEmployeeList();
        if (type === 'add') {
          this.dialogFormVisible = true;
          this.employeeId = '';
          this.form = {
            customer: {callType:"1" },
            record: {},
            receptionStatus:3
          };
          this.recordItemStack={};
        }
        else if (type === 'allot') {
          this.form={ customer:{}, employee:{},id:row.id };
          this.dialogFormVisibleOne = true;
          this.employeeId = row.employee.id;
         this.number=null;
        }
        else if (type === 'back') {
          this.dialogFormVisibleTwo = true;
          this.form = {
            id:row.id,
            carType:row.carType,
            customer:{
              grade:null,
              id:row.customer.id
            },
            record: {},
            receptionStatus:null
          };
         this.employeeId=row.employee.id;
        }
        if (type === 'show') {
          this.title = type === 'show' ? '查看详情' : '';
          this.$router.push({path: `/HF/${type}/${this.page}`, query: {type, id: row.id}});
        }
        this.type = type;
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
  .el-table {
    width: 100%;
    margin-left: 5.5%;
    font-size: 12px;
  }

  .aDiv1 {
    height: 100px;
    margin: 20px auto;
    width: 90%;
    background: #F2F2F2;
  }

  .el-select .el-input__inner {
    width: 120px;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 120px;
  }

  .el-input__inner {
    width: 125%;
  }

  .aDiv2 {
    height: 500px;
    width: 90%;
    background: white;
  }

  .Tel {
    margin-top: -62px;
    margin-left: 250px;
  }

  .type {
    width: 200px;
    height: 60px;
  }

  .Type {
    margin-top: -62px;
    margin-left: 520px;
  }

  .Form {
    width: 600px;
  }

  .wxx {
    width: 160px;
    height: 40px;
  }

  .Wxx {
    margin-top: -62px;
    margin-left: 210px;
  }

  .btn {
    margin-left:54%;
  }
  .send {
    margin-top: -62px;
    margin-left: 455px;
  }

  .search {
    margin-top: 30px;
    height: 40px;
    width: 200px;
    margin-left: 20px;
  }

  .page {
    margin-top: 30px;
    text-align: center;
  }

  .el-radio__label {
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
