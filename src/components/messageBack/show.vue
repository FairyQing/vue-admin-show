<template>

  <div class="app-container">

    <div class="aDiv2">
      <el-form :model="form" class="demo-form-inline">
        <h4>接待表</h4>
        <el-form-item label="编号" label-width="80px" style="margin-left: 42px;margin-top: -20px;">
          <el-input class="wxx" auto-complete="off" :disabled="true" style="margin-left: 26px;"></el-input>
        </el-form-item>
        <el-form-item label="关注车型" label-width="80px" style="margin-left:26%;margin-top: -60px;">
          <el-input   auto-complete="off" :disabled="true" style="width:20%;"></el-input>
        </el-form-item>
        <el-form-item class="Wxx wxx" label="创建时间" label-width="80px" style="margin-left: 48%;">
          <el-date-picker
            type="datetime"
            value-format="timestamp"
            :disabled="true"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="Type" label="客户类型" label-width="80px" style="margin-left: 70%;">
          <el-radio v-model="elRadioType" label="1" v-show="radioOne" style="margin-left: 20px;">来访</el-radio>
          <el-radio v-model="elRadioType" label="2" v-show="radioTwo">回访</el-radio>
        </el-form-item>
        <el-form-item label="回访状态" label-width="80px" style="margin-left: 69px;">
          <el-select  :disabled="true" v-model="form.receptionStatus"  class="wxx">
            <el-option
              v-for="item in optionStatus"
              :key="item.valueStatus"
              :label="item.label"
              :disabled="true"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <h4 style="margin-top: 60px;">客户信息</h4>
        <el-form-item label="客户姓名" label-width="80px" style="margin-top: -20px;margin-left: 70px;">
          <el-input class="wxx " v-model.trim="form.customer&&form.customer.name" auto-complete="off"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="Tel" label="联系方式" label-width="80px" style="margin-left: 26%;">
          <el-input v-model.trim="form.customer&&form.customer.phone" auto-complete="off"
                    :disabled="true" style="width:20%;"></el-input>
        </el-form-item>
        <el-form-item class="Tel" label="微信名" label-width="80px" style="margin-left: 47.5%;">
          <el-input  :disabled="true" v-model.trim="form.customer&&form.customer.wechatName"
                      auto-complete="off" style="width:25%;margin-left: 0.6%" ></el-input>
        </el-form-item>
        <el-form-item class="Tel" label="微信号" label-width="90px" style="margin-left: 69%;">
          <el-input :disabled="true" v-model.trim="form.customer&&form.customer.wechatNumber"
                    auto-complete="off" style="width:45%;margin-left: 0.6%"></el-input>
        </el-form-item>

        <div v-for="(item,index) in list" style="margin-top: 90px;">
          <h4 >记录{{index+1}}</h4>
        <el-form-item label="业务员" label-width="80px" style="margin-left: 57px;margin-top: -18px;">
          <el-input class="wxx " :disabled="true" v-model="item.empName"
                    auto-complete="off" style="margin-left: 12px;"></el-input>
        </el-form-item>
        <el-form-item class="Wxx" label="沟通时间" label-width="80px" style="margin-left: 26%;">
          <el-date-picker
            v-model="item.empResponseTime"
            type="datetime"
            placeholder="选择日期"
            value-format="timestamp"
            :disabled="true"
           style="width:20%;">
          </el-date-picker>
        </el-form-item>
          <el-form-item label="关注车型" label-width="80px" style="margin-top: -62px;margin-left: 48%;">
            <el-input  auto-complete="off" :disabled="true" style="width:25%"></el-input>
          </el-form-item>
        <el-form-item label="沟通记录" label-width="80px" style="margin-left: 70px;">
          <textarea   v-model="item.result" :disabled="true" auto-complete="off"
                    style="width:100%;height: 120px;resize: none;border-radius: 4px;border:1px solid #DDE0E7 ;line-height: 36px; background-color: #FFFFFF;">
          </textarea>
        </el-form-item>
          <el-form-item class="Wxx" label="状态" label-width="80px" style="margin-top: -9px;margin-left: 42px;">
            <el-select  :disabled="true" v-model="form.receptionStatus"  style=" width:15%;margin-left: 28px;">
              <el-option
                v-for="item in optionStatus"
                :key="item.valueStatus"
                :label="item.label"
                :disabled="true"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="Wxx" label="客户等级" label-width="80px" style="margin-left: 26%;margin-top: -80px;">
            <el-select  :disabled="true" v-model="form.customer&&form.customer.grade"
                       style="width:20%;height:60px;margin-top: 19px;">
              <el-option
                v-for="item in optionGrade"
                :key="item.valueGrade"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="分配时间" label-width="80px" style="margin-left: 48%;margin-top: -84px;">
            <el-date-picker
              v-model="item.empResponseTime"
              type="datetime"
              value-format="timestamp"
              :disabled="true"
              style="width:25%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="分配人" label-width="80px" style="margin-left: 70%;margin-top:-60px;">
            <el-input  :disabled="true" v-model="item.empName"
                       auto-complete="off" style="margin-left: 12px;width:46.6%;"></el-input>
          </el-form-item>
        <el-form-item label="主管" label-width="80px" style="margin-top: -5px;margin-left: 42px;">
          <el-input  :disabled="true" v-model="item.supervisorName"
                    auto-complete="off" style="margin-left: 28px;width:15%;"></el-input>
        </el-form-item>
        <el-form-item  label="主管意见" label-width="80px" style="margin-top: -62px;margin-left:26%;">
          <el-input class="border" :disabled="true" v-model="item.supervisorOpinion"
                    auto-complete="off" style="width:20%;"></el-input>
        </el-form-item>
          <el-form-item  label="查看时间" label-width="80px" style="margin-left: 48%;margin-top:-60px;">
            <el-date-picker
              v-model="item.empResponseTime"
              type="datetime"
              placeholder="选择日期"
              value-format="timestamp"
              :disabled="true"
              style="width:25%;">
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
  import {ERR_OK, customerGrade, receptionStatus, callType} from 'api/config';
  import {getCustomerList, addOneCustomer, editOneCustomer, editReceptionStatus, takeMask, get} from 'api/buyCar'
  import {getEmployeeList} from "api/employee";
  import {setHistoryPage} from 'common/js/auth'


  export default {
    data() {
      return {
        list:[],
        radioOne: false,
        radioTwo: false,
        optionGrade: [{
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
        valueGrade: '',
        optionStatus: [{
          value: 1,
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
          value: 5,
          label: '战败'
        }],
        valueStatus: '',
        options: [],
        employeeId: '',
        form: {},
        elRadioType: "3",
      }
    },
    created() {
      setHistoryPage(this.$route.params.page);
      let id = this.$route.query.id;
      this._getList(id);
    },//点击返回的页面还在这个数据的对应的页面，而不是回到第一页
    filters: {
      timeFormat(val) {
        let time = new Date(val);
        let year = time.getFullYear();
        let month = timeZero(time.getMonth() + 1);
        let date = timeZero(time.getDate());
        let hour = timeZero(time.getHours());
        let minute = timeZero(time.getMinutes());
        return `${year}年${month}月${date}日${hour}时${minute}分`
      }
    },
    methods: {
      backTo() {
        this.$router.back();
      },
      callback(text) {
        this._getList(id);
        this.$message.success(text);
      },
      _getList(id) {
        get(id).then((ops) => {
          this.form = ops;
          this.list= this.form.record.recordItemStack.reverse();
          this.valueStatus = this.form.receptionStatus;
          this.valueGrade = this.form.customer.grade;
          this.employeeId = this.form.employee.name;
          if (this.form.customer.callType === 1) {
            this.elRadioType = "1";
            this.radioOne = true;
            this.radioTwo = false;
          } else {
            this.elRadioType = "2";
            this.radioOne = false;
            this.radioTwo = true;
          }
        })
      },
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">


  .aDiv2 {
    width: 100%;
    background: white;
  }

  .Tel {
    margin-top: -62px;
    margin-left: 250px;
  }

  .type {
    width: 250px;
    height: 60px;
  }

  .Type {
    margin-top: -62px;
    margin-left: 520px;
  }

  .el-input.is-disabled .el-input__inner {
    cursor: default;
    background-color: #FFFFFF;
  }

  .el-select .el-input.is-disabled .el-input__inner {
    cursor: default;
    background-color: #FFFFFF;
  }

  .wxx {
    width:15%;
    height: 40px;
  }

  .Wxx {
    margin-top: -62px;
    margin-left: 210px;
  }

  .btn {
    margin-left: 95%;
    margin-top: 80px;
    margin-bottom: 20px;
  }
</style>
