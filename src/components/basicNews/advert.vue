<template>
<div class="adiv">
  <el-form :label-position="labelPosition" label-width="80px" >
    <el-form-item label="广告模板">
      <el-radio v-model="elRadioType"  label="1"   >1</el-radio>
      <el-radio v-model="elRadioType"  label="2" style="margin-left: 50px;"   >2</el-radio>
      <el-radio v-model="elRadioType"  label="3" style="margin-left: 60px;"   >3</el-radio>
    </el-form-item>
    <el-form-item label="编号">
      <el-input style="width:150px;" ></el-input>
    </el-form-item>
    <el-form-item label="文本">
      <el-input style="width:450px;" ></el-input>
    </el-form-item>
    <el-form-item label="图片">
      <!--<el-input style="width:450px;" ></el-input>-->
      <textarea style="width:450px;height:200px;resize: none;border:1px solid #DDE0E7"></textarea>
    </el-form-item>
    <el-form-item label="广告网址:">
      <el-input style="width:450px;" ></el-input>
    </el-form-item>
  </el-form>
  <div class="btn">
    <el-button type="primary" style="background-color: #00C6FF">上传图片</el-button>
    <el-button type="primary">发布广告</el-button>
    <el-button type="info">删除广告</el-button>
  </div>
</div>
</template>

<script>
    export default {
        data(){
          return{
            labelPosition:'left',
            elRadioType:'1'
          }
        }
    }
</script>

<style scoped>
 .adiv
 {
   width:90%;
   margin:20px  auto;
   height:700px;
 }
.btn
{
  width:33%;
margin-left: 72.5%;
  margin-top: 20%;
}
</style>
