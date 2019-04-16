<template>
  <div class="vehicle-container">
    <div class="top w">
      <el-input class="top-input" placeholder="请输入关键字"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="danger">批量删除</el-button>
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
          prop="brand"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="carModel"
          label="型号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="address"
          label="标签">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="门店">
        </el-table-column>
        <el-table-column
          prop="address"
          label="销售数量">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="goxx()" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">上线</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom w">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import excel from '@/base/Excel/index'
  import {getCarList, exlCar} from "@/api/vehicle";

  export default {
    components: {
      excel
    },
    data() {
      return {
        tableData: [],
        listData: [],
        page: 0,
        size: 10,
        total: 10,
      }
    },
    methods: {
      goxx() {
        this.$router.push('information');
      },
      getData(data) {
        data.results.forEach((value) => {
          let arr = [];
          for (let key in value) {
            arr.push({key: key, value: value[key]}); //属性
          }
          let b = JSON.stringify(arr);
          let c = JSON.parse(b);
          this.listData.push(c);
        });
        if (this.listData) {
          exlCar(this.listData).then((res) => {
            this.getList();
          })
        }
      },
      getList() {
        this.tableData=[];
        let a = {
          page: this.page,
          size: this.size,
        };
        getCarList(a).then((res) => {
          this.total = res.totalElements;
          res.content.forEach((value) => {
            let b = {
              carModel: value.items[0].value,
              brand: value.items[3].value,
              price: value.items[1].value,
            };
            this.tableData.push(b);
          })
        })
      },
      handleCurrentChange(val) {
        this.page = val-1;
        this.getList();
      },
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  .vehicle-container {

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
      margin-bottom: 3%;
    }

  }


</style>
