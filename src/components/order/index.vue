<template>
  <div class="vehicle-container">
    <div class="top w">
      <el-input class="top-input" placeholder="请输入关键字"></el-input>
      <el-button type="primary">查询</el-button>
    </div>
    <div class="content w">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="下单时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="车型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="付款方式">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="goLook()" type="text" size="small">查看</el-button>
            <el-button @click="dialogVisible = true" type="text" size="small">分配</el-button>
            <el-button @click="goProcess()" type="text" size="small">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="分配订单"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <span>请选择经手人</span>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="工号" style="width: 50%"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="bottom w">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import excel from '@/base/Excel/index'

  export default {
    components: {
      excel
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        dialogVisible: false,
        value: '',
      }
    },
    methods: {
      goLook() {
        this.$router.push('look');
      },
      goProcess() {
        this.$router.push('process');
      },
      getData(data) {
        console.log(data);
      }
    }
  }
</script>

<style scoped>
  .w {
    width: 90%;
    margin: 0 auto;
  }

  .top {
    margin-top: 2%;
    margin-bottom: 2%;
    padding-left: 2%;
    background: rgba(242, 242, 242, 0.8);
    height: 100px;
    line-height: 100px;
  }

  .top-input {
    margin-right: 2%;
    width: 30%;
  }

  .content {
    margin-bottom: 2%;
  }

  .bottom {
    text-align: center;
  }
</style>
