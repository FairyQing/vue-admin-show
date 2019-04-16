<template>
  <div class="dashboard-container">
   <div class="img">
     <img class="car" src="./img/car.png">
     <div class="img2">
      <ul>
        <li style="margin-left: 8%;"><img src="./img/ding.png" alt="">
          <span><h1>20</h1><h4>总订单数</h4></span>
        </li>
        <li style="margin-left: 10%;"><img src="./img/guanZhu.png" alt="">
          <span style="margin-left: 28px;"><h1>20</h1><h4>总客户</h4></span>
        </li>
        <li style="margin-left: 10%;"><img src="./img/littleCar.png" alt="">
          <span style="margin-left: 28px;"><h1>20</h1><h4>总车辆</h4></span>
        </li>
        <li style="margin-left: 10%;"><img src="./img/yuanG.png" alt="">
          <span style="margin-left: 15px;"><h1>20</h1><h4>总销售人员</h4></span>
        </li>
        <li style="margin-left: 10%;"><img src="./img/storeT.png" alt="">
          <span style="margin-left: 28px;"><h1>20</h1><h4>总门店</h4></span>
        </li>
      </ul>
     </div>
   </div>
    <div class="content">
      <div class="one adiv">
        <img src="./img/littleDing.png" alt="" style="height:40px;margin-top: 10px;">
        <h3 style="margin-top: -34px;margin-left: 60px;">订单统计</h3>
        <div class="ding">
          <span style="border-bottom:none;"><h4>新增订单</h4><h3>20</h3></span>
          <span style="border-left:none;border-right:none;border-bottom:none;"><h4>完成订单</h4><h3>40</h3></span>
          <span style="border-bottom:none;"><h4>待退款订单</h4><h3>2</h3></span>
          <span><h4>进行中订单</h4><h3>10</h3></span>
          <span style="border-left: none;border-right: none"><h4>待分配订单</h4><h3>4</h3></span>
          <span><h4>销售额</h4><h3>2000</h3></span>
        </div>
      </div>
      <div class="two adiv">
        <img src="./img/littleCar2.png" alt="" style="height:40px;margin-top: 10px;">
        <h3 style="margin-top: -34px;margin-left: 60px;">车辆统计</h3>
        <div class="carTwo">
        <span style="border-bottom:none;"><h4>上架车辆</h4><h3>20</h3></span>
        <span style="border-left:none;border-right:none;margin-left:33%;"><h4>下架车辆</h4><h3>40</h3></span>
        <span style="margin-left:66.1%;"><h4>待完善车辆</h4><h3>2</h3></span>
        <span style="margin-top: 0px;"><h4>销售车辆</h4><h3>10</h3></span>
      </div>
      </div>
      <div class="three">
        <img src="./img/jieDai.png" alt="" style="height:40px;margin-top: 10px;">
        <h3 style="margin-top: -34px;margin-left: 60px;">接待统计</h3>
        <div class="nine">
          <span style="border-bottom:none;"><h4>销售人员</h4><h3>20</h3></span>
          <span style="border-left:none;border-right:none;border-bottom:none;"><h4>回访总客户</h4><h3>40</h3></span>
          <span style="border-bottom:none;"><h4>来访总客户</h4><h3>2</h3></span>
          <span><h4>待分配回访</h4><h3>10</h3></span>
          <span style="border-left: none;border-right: none"><h4>待回访客户</h4><h3>4</h3></span>
          <span><h4>回访客户</h4><h3>2000</h3></span>
          <span style="border-top:none;"><h4>订单客户</h4><h3>10</h3></span>
          <span style="border-left: none;border-right: none;border-top:none "><h4>成交客户</h4><h3>4</h3></span>
          <span style="border-top:none"><h4>保险客户</h4><h3>2000</h3></span>
        </div>
      </div>
    </div>
    <div class="form" style="margin-top: 48%;">
      <div id="main"></div>
      <div id="mainTwo"></div>
      <div id="mainThree"></div>
      <div id="mainFour"></div>
    </div>

  </div>
</template>

<script>
import echarts from  'echarts';

export default {
  created(){
    this.$nextTick(()=>{
      let myChart = echarts.init(document.getElementById('main'));
      let myChartTwo = echarts.init(document.getElementById('mainTwo'));
      let myChartThree = echarts.init(document.getElementById('mainThree'));
      let myChartFour = echarts.init(document.getElementById('mainFour'));
      let option = {
        title:{
          left:'3.4%',
          // left:'32px',
          text: '车辆销售统计图(近30天)'
        },
        xAxis: {
          type: 'category',
          data: [2, 4, 6, 8, 10, 12, 14,16,18],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel : {
            formatter: '{value}',
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        series: [{
          data: [0, 20, 35, 40, 60, 50, 71,75,80],
          type: 'line'
        }],
      };
      let optionTwo = {
        title:{
          left:'3%',
          text: '订单数统计图(近30天)'
        },
        xAxis: {
          type: 'category',
          data: [2, 4, 6, 8, 10, 12, 14,16,18],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel : {
            formatter: '{value}',
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        series: [{
          data: [10, 20, 30, 40, 50, 60, 71,75,80],
          type: 'line'
        }]
      };
      let optionThree = {
        title:{
          left:'3%',
          text: '订单销售额统计图(近30天)'
        },
        xAxis: {
          type: 'category',
          data: [2, 4, 6, 8, 10, 12, 14,16,18],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel : {
            formatter: '{value}',
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        series: [{
          data: [0, 5, 15, 20, 27, 30, 48,65,80],
          type: 'line'
        }]
      };
      let optionFour = {
        title:{
          left:'3%',
          text: '客户数统计图(近30天)',
        },
        xAxis: {
          type: 'category',
          data: [2, 4, 6, 8, 10, 12, 14,16,18],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel : {
            formatter: '{value}',
            textStyle: {
              color: '#6775fe'
            }
          }
        },
        series: [{
          data: [0, 25, 15, 20, 27, 30, 48,80,98],
          type: 'line'
        }]
      };
      myChart.setOption(option);
      myChartTwo.setOption(optionTwo);
      myChartThree.setOption(optionThree);
      myChartFour.setOption(optionFour);
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  li{
    list-style: none;
  }
 .img{
    width:90%;
   margin: 2%;
   position: relative;
 }
  .car
  {
    width:106%;
    position: absolute;
  }
  .img2{
    height:195px;
    width:106%;
    position: absolute;
  }
  ul{
    height:195px;
    width:100%;
    margin-top: 3%;
  }
  ul img{
    height:130px;
  }
  li{
    float: left;
  }
  .img span{
    color:#FFFFFF;
    display: inline-block;
    height:90px;
    text-align: center;
    margin-top: -25px;
    margin-left: 20px;
    position: absolute;
  }
  .img span h1{
    margin-top: 17px;
    font-weight: normal;
  }
  .img span h4{
    margin-top: -10px;
    font-weight: normal;
  }
  .dashboard-container
  {
    position: relative;
  }
  .content{
    height:590px;
    width:95.5%;
    margin-left:2%;
    margin-top: 193px;
    position: absolute;
    margin-right: 1.8%;
  }
  .adiv{
    height:34%;
    width:48%;
  }

  .one{
    margin: 6% 1.4% 1.4% 1.4%;
  }
  .two{
    margin-top: -217px;
    margin-left: 50.5%;
  }
  .three{
    margin-top: 40px;
    margin-left: 1.4%;
    height:300px;
    width:48%;
  }
  .ding{
    height:136px;
    width:98%;
    margin-left: 1.5%;
    margin-top: 2%;
  }
  .ding span{
    float: left;
    height:67px;
    width:33%;
    border: 1px solid #d3dce6;
    display: inline-block;
  }
  .ding span h4{
    margin-left: 20px;
    margin-top: 12px;
    font-weight: normal;
  }
  .ding span h3{
    margin-left: 20px;
    margin-top: -10px;
    font-weight: normal;
  }
  .carTwo{
    height:136px;
    width:98%;
    margin-left: 1.5%;
    margin-top: -2%;
  }
  .carTwo span{
    float: left;
    height:67px;
    width:33%;
    border: 1px solid #d3dce6;
    display: inline-block;
    margin-top: -67px;
  }
  .carTwo span h4{
    margin-top: 12px;
    margin-left: 20px;
    font-weight: normal;
  }
  .carTwo span h3{
    margin-left: 20px;
    margin-top: -10px;
    font-weight: normal;
  }
  .nine{
    height:230px;
    width:98%;
    margin-left: 1.5%;
    margin-top: 2%;
  }
  .nine span{
    float: left;
    height:76px;
    width:33.3%;
    border: 1px solid #d3dce6;

  }
  .nine span h4{
    margin-top: 12px;
    font-weight: normal;
    margin-left: 20px;
  }
  .nine span h3{
    margin-left: 20px;
    font-weight: normal;
    margin-top: -10px;
  }
  .form{
    height:800px;
    width:95.5%;
    margin: 2%;
    position: absolute;
  }
  #main{
    width:50%;
    height:400px;
  }
  #mainTwo
  {
    width:50%;
    height:400px;
    margin-top: -400px;
    margin-left:50% ;
  }
  #mainThree{
    width:50%;
    height:400px;
  }
  #mainFour{
    width:50%;
    height:400px;
    margin-top: -400px;
    margin-left: 50%;
  }
</style>
