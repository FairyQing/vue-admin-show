<template>
  <div class="bg">
    <el-card class="radios w">
      <div>
        <el-radio-group v-model="radio1" class="radio1">
          <el-radio :label="1">全款购车单</el-radio>
          <el-radio :label="2">厂家金融购车单</el-radio>
          <el-radio :label="3">按揭购车单</el-radio>
          <el-radio :label="4">二次贷购车单</el-radio>
        </el-radio-group>
      </div>
    </el-card>
    <el-card class="khxx w">
      <div slot="header">
        <span>客户信息</span>
      </div>
<!--
     n
      <field-identity
       set='multiple,disabled'
       fieldtype="idcard"
       type="multi"
       :prop="{abc.creattime}"
        name="购买时间"
        required="true"></field-string>
      <field-textarea :prop="{abc.creattime}" name="购买时间" required="true"></field-textarea>

      tarea :prop="{abc.creattime}" :map="" name="购买时间" required="true"></field-textarea>
   -->
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">


      <field-tex
        <div class="form-xq">
          <el-form-item label="客户姓名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="微信号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="微信名">
            <el-input></el-input>
          </el-form-item>
        </div>
        <el-form-item label="身份证住处">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="现在住处">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="clxx w">
      <div slot="header">
        <span>车辆信息</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">
        <div class="form-xq">
          <el-form-item label="汽车品牌">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="车身颜色">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="型号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="车辆来源">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="详情数据">
            <el-input></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="clxx w">
      <div slot="header">
        <span>全款方案</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">
        <div class="form-xq">
          <el-form-item label="进价">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="原价">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="售价">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="发票价">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="快递费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="销售提成">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="购置税(包)">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="购置税(客户)">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="上牌费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="服务费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="发票高开补税">
            <el-input></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="blbx w">
      <div slot="header">
        <span>办理保险</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">
        <div class="form-xq">
          <el-form-item label="保险公司">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="保险金额">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="保险时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="客户姓名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="返点">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="返点时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="销售员">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="合作单位">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="提出人">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="销售员提成">
            <el-input></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="zh w">
      <div slot="header">
        <span>装潢</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">
        <div class="form-xq">
          <el-form-item label="客户姓名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="销售员">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="装潢员">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="门店">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="成本">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="加装物品">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="加装费用">
            <el-input></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="md w">
      <div slot="header">
        <span>门店</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">
        <div class="form-xq">
          <el-form-item label="门店">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="经手人">
            <el-input></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="xbjl w">
      <div slot="header">
        <span>续保记录</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">
        <div class="form-xq">
          <el-form-item label="保险公司">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="保险金额">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="保险时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="客户姓名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="返点">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="返点时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="销售员">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="合作单位">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="实缴保费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="利润">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="销售员提成">
            <el-input></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="xbjl w">
      <div slot="header">
        <span>纸质表格</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" style="margin-left: 5%">
        <el-form-item label="图片">
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
      </el-form>
    </el-card>


  </div>
</template>

<script>
  export default {

    data() {
      return {
        radio1: '',
        form: {},
        dialogImageUrl: '',
        dialogVisible: false,
      }
    }
  }
</script>

<style scoped>
  .bg {
    background: rgb(243, 243, 243);
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .radios {

  }

  .radio1 {
    display: flex;
    justify-content: space-around;
  }

  .radio1 label, span {
    font-weight: 600;
  }

  .w {
    width: 90%;
    margin: 2% auto;
  }

  .form-xq {
    display: flex;
    flex-wrap: wrap;
  }

  .form-xq .el-form-item {
    width: 30%;
    margin-right: 1%;
  }

</style>
