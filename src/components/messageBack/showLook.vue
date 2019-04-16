<template>

  <div class="app-container">

    <div class="span2">
      <el-form :model="form" class="demo-form-inline">
        <h4>保险单</h4>
        <el-form-item label="编号" label-width="80px" style="margin-left: 43px;margin-top: -20px;">
          <el-input class="wxx" auto-complete="off" :disabled="true" style="margin-left: 27px;"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px" style="margin-left: 25%;margin-top: -60px;">
        <el-select  :disabled="true" v-model="form.receptionStatus"  style=" width:20%;margin-left: 2.4%;">
          <el-option
            v-for="item in optionStatus"
            :key="item.valueStatus"
            :label="item.label"
            :disabled="true"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item class="Wxx " label="创建时间" label-width="80px" style="margin-left: 50%;margin-top: -62px;">
          <el-date-picker
            type="datetime"
            value-format="timestamp"
            :disabled="true"
            style="width:27%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="保险时间" label-width="80px" style="margin-left: 70%;margin-top: -60px;">
          <el-date-picker
            type="date"
            value-format="timestamp"
            :disabled="true"
            style="width:46%;">
          </el-date-picker>
        </el-form-item>
        <h4 style="margin-top: 60px;">客户信息</h4>
        <el-form-item label="客户姓名" label-width="80px" style="margin-top: -20px;margin-left: 70px;">
          <el-input class="wxx " v-model.trim="form.customer&&form.customer.name" auto-complete="off" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item class="Tel" label="联系方式" label-width="80px" style="margin-left: 26.7%;">
          <el-input  v-model.trim="form.customer&&form.customer.phone" auto-complete="off"  :disabled="true" style="width:20.2%;margin-left: 2px;"  ></el-input>
        </el-form-item>
        <el-form-item class="Tel" label="微信名" label-width="80px" style="margin-left: 49.3%;">
          <el-input  :disabled="true" v-model.trim="form.customer&&form.customer.wechatName"
                    auto-complete="off" style="margin-left: 9px;width:27%;"></el-input>
        </el-form-item>
        <el-form-item class="Tel" label="微信号" label-width="90px" style="margin-left:68.7%;">
          <el-input  :disabled="true" v-model.trim="form.customer&&form.customer.wechatNumber"
                    auto-complete="off" style="margin-left: 9px;width:46%;"></el-input>
        </el-form-item>
        <el-form-item  label="客户地址" label-width="80px"style="margin-left: 70px;">
          <textarea  v-model.trim="form.customer&&form.customer.address" :disabled="true"
                     auto-complete="off"
                     style="width:40%;height: 80px;resize: none;border-radius: 4px;border:1px solid #DDE0E7; background-color: #FFFFFF"></textarea>
        </el-form-item>
        <div v-for="(item,index) in list" style="margin-top: 40px;">
          <h4 >记录{{index+1}}</h4>
          <el-form-item  label="业务员" label-width="80px" style="margin-left: 57px;margin-top: -10px;">
            <el-input class="wxx " :disabled="true" v-model="item.empName"
                      auto-complete="off" style="margin-left: 12px;"></el-input>
          </el-form-item>
          <el-form-item class="Wxx" label="沟通时间" label-width="80px" style="margin-left: 26.7%;">
            <el-date-picker
              :disabled="true"
              v-model="item.empResponseTime"
              type="datetime"
              value-format="timestamp"
              style="width:20%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="沟通记录" label-width="80px" style="margin-left: 70px;" >
            <textarea   v-model="item.result" :disabled="true"  auto-complete="off" style="width:100%;height: 120px;resize: none;border-radius: 4px;border:1px solid #DDE0E7; background-color: #FFFFFF"></textarea>
          </el-form-item>
          <el-form-item class="Wxx" label="状态" label-width="80px" style="margin-top:-16px;margin-left: 42px;">
            <el-select  :disabled="true" v-model="form.status"  style=" width:15%;margin-left: 28px;">
              <el-option
                v-for="item in optionStatus"
                :key="item.valueStatus"
                :label="item.label"
                :disabled="true"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="客户等级" label-width="80px" style="margin-left: 26.7%;margin-top: -80px;">
            <el-select  :disabled="true" v-model="form.customer&&form.customer.grade" placeholder="请选择"
                        style="width:20%;height:60px;margin-top: 20px;">
              <el-option
                v-for="item in optionGrade"
                :key="item.valueGrade"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="分配时间" label-width="80px" style="margin-left: 50%;margin-top: -84px;">
            <el-date-picker
              v-model="item.empResponseTime"
              type="datetime"
              value-format="timestamp"
              :disabled="true"
              style="width:28%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="分配人" label-width="80px" style="margin-left: 70%;margin-top:-60px;">
            <el-input  :disabled="true" v-model="item.empName"
                       auto-complete="off" style="margin-left: 12px;width:47.5%;"></el-input>
          </el-form-item>
          <el-form-item  label="主管" label-width="80px" style="margin-left: 40px;margin-top: -5px; ">
            <el-input class="wxx " :disabled="true" v-model="item.supervisorName" auto-complete="off" style="margin-left: 30px;"></el-input>
          </el-form-item>
          <el-form-item class="Wxx"  label="意见" label-width="80px" style="margin-left: 25.2%;">
            <el-input  v-model="item.supervisorOpinion" :disabled="true"  auto-complete="off" style="width:20%;margin-left: 25px;" ></el-input>
          </el-form-item>
          <el-form-item  label="查看时间" label-width="80px" style="margin-left: 50%;margin-top:-60px;">
            <el-date-picker
              v-model="item.empResponseTime"
              type="datetime"
              value-format="timestamp"
              :disabled="true"
              style="width:28%;">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <el-button class="btn" type="primary" @click="backTo">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {timeZero} from 'common/js';
  import {ERR_OK,customerGrade,receptionStatus,callType} from 'api/config';
  import {getCustomerList,addOneCustomer,editOneCustomer,editReceptionStatus,takeMask,get} from 'api/buyCar'
  import {getEmployeeList} from "api/employee";
  import {getInsurance} from "api/insurance"
  import {setHistoryPage} from 'common/js/auth'


  export default {
    data() {
      return {
        status:'',
        grade:'',
       list:[],
        radioOne:false,
        radioTwo:false,
        optionGrade:[{
          value: 1,
          label: 'A'
        },
          {
            value: 2,
            label: 'B'
          },
          {
            value:3,
            label: 'C'
          }],
        optionStatus:[{
          value:1,
          label: '待分配'
        }, {
          value: 2,
          label: '待回访'
        }, {
          value: 3,
          label: '已回访'
        }, {
          value: 4,
          label: '已转化'
        }, {
          value:5,
          label: '已结束'
        }],
        employeeId: '',
        form:{},
        elRadioType:"3",
      }
    },
    created() {
      setHistoryPage(this.$route.params.page);
      let id=this.$route.query.id;
      this._getList(id);
    },
    filters:{
      timeFormat(val){
        let time=new Date(val);
        let year=time.getFullYear();
        let month=timeZero(time.getMonth()+1);
        let date=timeZero(time.getDate());
        let hour=timeZero(time.getHours());
        let minute=timeZero(time.getMinutes());
        return `${year}年${month}月${date}日${hour}时${minute}分`
      }
    },
    methods:{
      backTo(){
        this.$router.back();
      },
      callback(text){
        this._getList(id);
        this.$message.success(text);
      },
      _getList(id){
        getInsurance(id).then((ops)=>{
          this.form=ops;

          this.list= this.form.record.recordItemStack.reverse();
          if(this.form.customer.callType===1)
          {
            this.elRadioType="1";
            this.radioOne=true;
            this.radioTwo=false;
          }else {
            this.elRadioType="2";
            this.radioOne=false;
            this.radioTwo=true;
          }
        })
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
 .span2 {
   width:100%;
   background: white;
 }
 .el-input.is-disabled .el-input__inner
 {
   cursor: default;
   background-color: #FFFFFF;
 }
 .el-select .el-input.is-disabled .el-input__inner
 {
   cursor: default;
   background-color: #FFFFFF;
 }
 .Tel {
   margin-top: -62px;
   margin-left: 250px;
 }

 .Type {
   margin-top: -62px;
   margin-left: 520px;
 }

 .wxx {
   width: 15%;
   height: 40px;
 }

 .Wxx {
   margin-top: -62px;
   margin-left: 210px;
 }

  .btn
  {
    margin-left:95%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
