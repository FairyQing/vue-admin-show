<!--<template>
  <el-form :inline="true" :model="form" class="demo-form-inline" v-show="show" label-width="100px" style="margin-left: 10%;">
    <div class="carName">
    <el-form-item label="客户编号" >
      <el-input v-border v-model.trim="form.Idnumber" :disabled="isable" ></el-input>
    </el-form-item>
    <el-form-item label="客户姓名" >
      <el-input v-border v-model.trim="form.name"  :disabled="isable"></el-input>
    </el-form-item>
    <el-form-item label="手机号"  >
      <el-input  v-border  v-model.trim="form.phone" :disabled="isable"></el-input>
    </el-form-item>
    <el-form-item label="性别" >
      <el-select v-border :disabled="isable" v-model="form.gender" >
        <el-option
          v-for="item in gender"
          :key="item.value3"
          :label="item.label"
          :value="item.value3">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生年月">
      <el-date-picker
                      v-border
                      :disabled="isable"
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="客户等级" >
      <el-select  v-border v-model="form.grade" :disabled="isable" style="cursor:pointer;">
        <el-option
          v-for="item in gradelist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    </div>
    <el-form-item label="微信号"  style="margin-left: 5%;">
      <el-input  v-border  v-model.trim="form.chatId" :disabled="isable" auto-complete="off" style="width:300px;margin-left: 10%;"></el-input>
    </el-form-item>
    <el-form-item label="微信名"  style="margin-left: 5%;">
      <el-input  v-border  v-model.trim="form.chatName" :disabled="isable" auto-complete="off" style="width:300px;margin-left: 10%;"></el-input>
    </el-form-item>
    <el-form-item label="状态" style="margin-left: 5%;margin-top: 2%;">
      <el-select v-border :disabled="isable" v-model="form.status" style="width:300px;margin-left: 20%;">
        <el-option
          v-for="item in statuslist"
          :key="item.values"
          :label="item.label"
          :value="item.values">
        </el-option>
      </el-select>
    </el-form-item>
    &lt;!&ndash;<el-form-item label="定金" style="margin-left: 7%;margin-top: 2%;">
      <el-select v-border :disabled="isable" v-model="form.hasDeposit" style="width:300px;margin-left: 15%;">
        <el-option
          v-for="item in hasDepositlist"
          :key="item.valueh"
          :label="item.label"
          :value="item.valueh">
        </el-option>
      </el-select>
    </el-form-item>&ndash;&gt;
    <el-form-item label="创建时间" style="margin-left: 5%;margin-top: 2%;">
      <el-date-picker style="width:300px;margin-left: 10%;"
                      v-border
                      :disabled="isable"
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="身份证号"  style="margin-left: 5%;">
      <el-input  v-border  v-model.trim="form.Idcard" :disabled="isable" auto-complete="off" style="width:300px;margin-left: 10%;"></el-input>
    </el-form-item>
    <el-form-item label="身份证地址"  style="margin-left: 5%;">
      <el-input  v-border  v-model.trim="form.Idaddress" :disabled="isable" auto-complete="off" style="width:300px;margin-left: 10%;"></el-input>
    </el-form-item>
    <el-form-item label="现住地址"  style="margin-left: 5%;">
      <el-input  v-border  v-model.trim="form.address" :disabled="isable" auto-complete="off" style="width:300px;margin-left: 10%;"></el-input>
    </el-form-item>
    <el-form-item label="身份证" style="margin-left: 5%;margin-top: 2%;">
        <el-upload class="photo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-form-item>
&lt;!&ndash;    <el-form-item label="驾驶证"style="margin-left: 5%;margin-top: 2%;"><table style="margin-left: 7%" cellpadding="50px">
      <td class="td">
        <el-upload class="photo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog></td></table>
    </el-form-item>   &ndash;&gt;
    <el-form-item label="审核人"  style="margin-left: 6%;margin-top: 2%;">
    <el-input v-border v-model.trim="form.desc" :readOnly="isable" auto-complete="off" style="width:300px;margin-left: 15%;"></el-input>
  </el-form-item>
    <el-form-item label="审核时间" style="margin-left: 5%;margin-top: 2%;">
      <el-date-picker style="width:300px;margin-left: 10%;"
                      v-border
                      :disabled="isable"
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <div class="footer"  style="margin-left: 85%;" >
      <el-button type="primary" v-show="back"  @click="backClick">返回</el-button>
      <el-button type="primary" v-show="!back"  @click="backClick">取消</el-button>
      <el-button type="primary" v-show="!back"  @click="editOne">确 定</el-button>
    </div>
  </el-form>
</template>-->
<template>
  <el-form :inline="true" ref="form" :model="form" label-width="100px" style="margin-left: 5%" v-show="show" class="khxx w">
    <div class="form-xq">
      <el-form-item label="客户姓名">
        <el-input v-border v-model.trim="form.name"  :disabled="isable" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input  v-border  v-model.trim="form.phone" :disabled="isable" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-border :disabled="isable" v-model="form.gender" style="width: 250px">
          <el-option
            v-for="item in gender"
            :key="item.value3"
            :label="item.label"
            :value="item.value3">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生年月" >
        <el-input v-border v-model.trim="form.birth"  :disabled="isable" style="width: 250px"></el-input>
    </el-form-item>
      <el-form-item label="客户等级">
        <el-select  v-border v-model="form.grade" :disabled="isable" style="cursor:pointer;width: 250px;">
          <el-option
            v-for="item in gradelist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input  v-border  v-model.trim="form.chatId" :disabled="isable" style="width: 250px"></el-input>
    </el-form-item>
      <el-form-item label="微信名">
        <el-input  v-border  v-model.trim="form.chatName" :disabled="isable" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-border :disabled="isable" v-model="form.status" style="width: 250px">
          <el-option
            v-for="item in statuslist"
            :key="item.values"
            :label="item.label"
            :value="item.values">
          </el-option>
        </el-select>
    </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker style="width: 250px"
                        v-border
                        :disabled="isable"
                        v-model="value1"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
    </div>
    <div class="form-xq">
    <el-form-item label="身份证号码" >
      <el-input  v-border  v-model.trim="form.Idcard" :disabled="isable" style="width: 250px"></el-input>
    </el-form-item>
    <el-form-item label="身份证住处" >
      <el-input  v-border  v-model.trim="form.Idaddress" :disabled="isable" style="width: 250px"></el-input>
    </el-form-item>
    <el-form-item label="现在住处" >
      <el-input  v-border  v-model.trim="address" :disabled="isable" style="width:250px"></el-input>
    </el-form-item></div>
    <el-form-item label="身份证照片">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <div class="form-xq">
    <el-form-item label="审核人">
      <el-input v-border v-model.trim="form.desc" :readOnly="isable" style="width: 250px"></el-input>
    </el-form-item>
    <el-form-item label="审核时间">
      <el-date-picker style="width:250px"
                      v-border
                      :disabled="isable"
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    </div>
    <div class="footer"  style="margin-left: 85%;" >
      <el-button type="primary" v-show="back"  @click="backClick">返回</el-button>
      <el-button type="primary" v-show="!back"  @click="backClick">取消</el-button>
      <el-button type="primary" v-show="!back"  @click="editOne">确 定</el-button>
    </div>
    </el-form>
</template>


<script>
  import {mapGetters} from 'vuex';
  import {searchFormat} from 'common/js';
  import {ERR_OK} from 'api/config';
  import {editOneCustomer,getList} from "api/customer";
  import {setHistoryPage} from 'common/js/auth'
 /* let validatePhone=(rule, value, callback) => {
    let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    if (!reg.test(value)) {
      callback(new Error('手机号格式不正确'));
    } else {
      callback();
    }
  };*/
  export default {
    data() {
      return {
        /*rules:{
          phone:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { max: 11, message: '长度不超过11位', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入客户姓名', trigger: 'blur' },
          ],
        },*/
        show:false,
        form:{},
        isable:false,
        value1:'',
        textarea:'',
        back:false,
        gradelist:[{
          value: 1,
          label: 'A'
        }, {
          value: 2,
          label: 'B'
        }, {
          value:3,
          label: 'C'
        }],
        value:' ',
        statuslist:[{
          values: 1,
          label: '正常'
        }, {
          values: 0,
          label: '黑名单'
        }],
        values:' ',
        hasDepositlist:[{
          valueh:1,
          label: '有'
        }, {
          valueh: 0,
          label: '没有'
        }],
        valueh:' ',
        gender:[{
          value3:1,
          label: '男'
        }, {
          value3: 0,
          label: '女'
        }],
        value3:' ',
      }

    },
    created(){
      setHistoryPage(this.$route.params.page);
      if(this.$route.query.type==='check'){
        this.back=true;this.isable=true;
      }
      let id=this.$route.query.id;
      this.getlist(id)
    },
    directives:{
     border:{
       inserted(el,binding,vnode){
        list.type==='check'?el.className='none-border':el.className='border';
       }
     }
    },
    methods: {
      callback(text){
        this.$message.success(text);
      },
      getlist(id){
        getList(id).then((ops)=>{
          this.form=ops;
          this.show=true;
        })
      },
      editOne(){
       editOneCustomer(this.form).then(()=>{
          this.callback("操作成功");
          this.$router.back();
        })
      },
      backClick(){
        this.$router.back();
      }
    }
  }
</script>

<style lang="scss"  rel="stylesheet/scss" >

  .w {
    width: 90%;
    margin: 2% auto;
  }
  .form-xq {
    display: flex;
    flex-wrap: wrap;
  }
  .form-xq .el-form-item {
    width: 23%;
    margin-right: 1%;
  }
  .demo-form-inline{
    width:90%;
    margin: 0 auto;
    margin-top: 2%;
    .footer{
      margin-left: 5%;
    }
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
      color: #9d9ea6;
      cursor:default;
    }
    .none-border{
     input,textarea,datetime{
       border:1px solid #dcdfe6;
       color: #9d9ea6
     }
    }
    .border{
      input,textarea{
        border:1px solid #dcdfe6;
      }
    }
    .td{
  border:1px solid #dcdfe6;
  width:500px;
  height: 250px;
}
  }

</style>








