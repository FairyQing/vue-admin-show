<template>
  <div class="qj">
    <el-card class="w clxx">
      <div slot="header">
        <span class="title">详细信息</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" label-position="left" style="margin-left: 10%">
        <div class="carName">
          <el-form-item label="品牌">
            <el-input style="width: 112%;"></el-input>
          </el-form-item>
          <el-form-item label="型号">
            <el-input style="width: 112%;"></el-input>
          </el-form-item>
          <el-form-item label="门店">
            <el-select
              v-model="value1"
              collapse-tags
              style="width: 112%"
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="销售数量">
          <el-input style="width: 20%"></el-input>
        </el-form-item>
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
        <el-form-item label="标签">
          <el-select
            v-model="value1"
            multiple
            collapse-tags
            style="width: 20%"
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="售价">
          <el-input type="number" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="配置亮点">
          <el-checkbox v-for="city in options" :label="city.label" :key="city.value">{{city.label}}</el-checkbox>
        </el-form-item>
        <el-form-item label="车型亮点">
          <Editor :value="content" @editorChange="editorChange" @input="getEditor"
                  style="height: 400px;margin-bottom: 10%;width: 90%">
          </Editor>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="w clxx">
      <div slot="header">
        <span class="title">金融方案</span>
        <el-button style="float: right" type="primary">添加方案</el-button>
      </div>
      <div>
        <el-collapse v-model="activeName">
          <el-collapse-item title="方案一" name="0">
            <div class="fali">
              <ul>
                <li><span>首付</span><input/>
                  <div class="line"></div>
                </li>
                <li><span>月供</span><input/>
                  <div class="line"></div>
                </li>
                <li><span>期数</span><input/>
                  <div class="line"></div>
                </li>
                <li>
                  <div class="xzgs">
                    <el-radio v-model="radio" label="1">做个人名下</el-radio>
                    <el-radio v-model="radio" label="2">做公司名下</el-radio>
                  </div>
                </li>
              </ul>
            </div>
            <div class="fz">
              <label>定金</label>
              <el-input type="number"></el-input>
              <label>赠送</label>
              <el-input type="number"></el-input>
              <label>期数</label>
              <el-input type="number"></el-input>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <el-card class="w clxx">
      <div slot="header">
        <span class="title">方案扫描</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="100px" label-position="left" style="margin-left: 10%">
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
          <el-button style="float: right;" type="primary">保存信息</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

  import Editor from '@/base/richTextEditor'

  export default {
    data() {
      return {
        form: {},
        dialogImageUrl: '',
        dialogVisible: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value1: [],
        content: "",
        myTextEditor: "",
        editorOption: {},
        activeName: '0',
        radio: 1,
      }
    },
    components: {
      Editor
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      editorChange(html) {
        this.content = html;
        console.log(this.content);
      },
      getEditor(data) {
        console.log(data);
      }
    },


  }
</script>

<style scoped>
  .qj {
    background: rgb(243, 243, 243);
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .w {
    width: 90%;
    margin: 2% auto;
  }

  .clxx {
    background: white;
    padding-bottom: 2%;

  }

  .clxx .title {
    font-size: 20px;
    font-weight: 600;
  }

  .fali li {
    list-style-type: none;
    position: relative;
    float: left;
    height: 100px;
  }

  .fali span {
    position: absolute;
    left: 35px;
    top: -15px;

  }

  .fali input {
    text-align: center;
    outline: none;
    border: 0;
    border-bottom: 1px solid rgb(210, 210, 210);
    width: 100px;
    height: 50px;
  }

  .line {
    margin: 0 20px;
    display: inline-block;
    width: 1px;
    height: 50px;
    background: rgb(210, 210, 210);
  }

  .fz {
    display: flex;
    justify-content: center;

  }

  .fz label {
    margin: 0 20px;
    font-weight: 500;
  }

  .fz input {
    width: 120px;
  }

  .xzgs {
    line-height: 50px;
  }

  .el-collapse-item__header {
    text-align: center;
  }

  .carName {
    display: flex;
  }

  .carName .el-form-item {
    margin-right: 5%;
  }

</style>
