<template>
  <div class="HomeIndex">
    <div class="HomeIndex_top">
      <div class="HomeIndex_top_l">
        <!--                <p>就餐信息</p>-->
        <div>
          <div class="zt_l" id="chart"></div>
          <div class="zt_r">
            <p><i></i>昨天</p>
            <div><i></i>今天</div>
          </div>
        </div>
      </div>
      <div class="HomeIndex_top_r">
        <p>热销菜品 <span>TOP5</span></p>
        <div>
          <el-table
            :data="LIst.topright"
            :header-cell-style=" function() {return 'background:#F8F8F8'}"
            style="width: 100%"
          >
            <el-table-column prop="code" label="编号" width="">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="">
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="">
              <!--                            <template slot-scope="scope">-->
              <!--                                <el-switch v-model="scope.row.flag" active-value="1" inactive-value="0"  active-color="#409EFF" inactive-color="#999999"></el-switch>-->
              <!--                            </template>-->
            </el-table-column>
            <el-table-column prop="amount" label="销售数量" width="">
              <!--                            <template slot-scope="scope">-->
              <!--                                <el-switch v-model="scope.row.status" active-value="1" inactive-value="0"  active-color="#409EFF" inactive-color="#999999"></el-switch>-->
              <!--                            </template>-->
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="HomeIndex_boot">
      <p>报警库存</p>
      <div>
        <el-table
          :data="LIst.below"
          :header-cell-style="function() { return 'background:#F8F8F8'}"
          style="width: 100%"
        >
          <el-table-column prop="code" label="商品编号" width="">
          </el-table-column>
          <el-table-column prop="name" label="名称" width=""> </el-table-column>
          <el-table-column prop="hname" label="库房" width="">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="">
            <!--                            <template slot-scope="scope">-->
            <!--                                <el-switch v-model="scope.row.flag" active-value="1" inactive-value="0"  active-color="#409EFF" inactive-color="#999999"></el-switch>-->
            <!--                            </template>-->
          </el-table-column>
          <el-table-column prop="stock" label="库存" width="">
            <!--                            <template slot-scope="scope">-->
            <!--                                <el-switch v-model="scope.row.status" active-value="1" inactive-value="0"  active-color="#409EFF" inactive-color="#999999"></el-switch>-->
            <!--                            </template>-->
          </el-table-column>
          <el-table-column prop="minstock" label="库存下限" width="">
          </el-table-column>
          <el-table-column prop="price" label="销售价格" width="">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeIndex",
  data() {
    return {
      LIst: "", //统计信息
      option: {
        title: {
          text: "就餐信息"
        },
        tooltip: {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          }
        },
        legend: {
          data: ["昨天", "今天"]
        },
        xAxis: {
          type: "category",
          data: ["就餐人数", "桌数", "消费金额"],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: [
          {
            // name: '销量',
            type: "bar",
            data: [],
            label: {
              show: true,
              position: "top"
            },
            color: ["#1168B8"]
          },
          {
            type: "bar",
            data: [],
            label: {
              show: true,
              position: "top"
            },
            // label:{
            //     show: true,
            //     position:'top',
            //     distance: 5,
            //     align:'center',
            //     verticalAlign: 'bottom',
            //     rotate:0,
            //     formatter: '{c}',
            //     fontSize: 16,
            //     rich: {
            //         name: {
            //             textBorderColor: '#fff'
            //         }
            //     }
            // },
            color: ["#11B883"]
          }
        ]
      }
    };
  },
  methods: {
    init() {
      //获取统计数据
      this.$post(this.$api.employeesHome).then(data => {
        this.LIst = data.data;
        this.option.series[0].data = data.data.yesterdaylist;
        console.log(data.data.yesterdaylist);
        console.log(this.option.series[0].data);
        this.option.series[1].data = data.data.todaylist;
        console.log(data);
        this.chart1 = this.$echarts.init(document.getElementById("chart"));
        this.chart1.setOption(this.option);
      });

    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
.HomeIndex {
  background: #f1f4f1;
  height: 100%;
  padding: 0 30px;
  .HomeIndex_top {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    .HomeIndex_top_l {
      width: 58%;
      height: 450px;
      background: #fff;
      box-sizing: border-box;
      padding: 20px;
      > p {
        font-size: 22px;
        color: #333;
        font-weight: bold;
      }
      > div {
        display: flex;
        .zt_l {
          width: 90%;
          height: 410px;
        }
        .zt_r {
          > p {
            display: flex;
            align-items: center;
            font-size: 16px;
            color: #1168b8;
            > i {
              display: block;
              width: 35px;
              height: 16px;
              background: #1168b8;
              margin-right: 20px;
            }
          }
          > div {
            display: flex;
            align-items: center;
            font-size: 16px;
            color: #11b883;
            margin-top: 10px;
            > i {
              display: block;
              width: 35px;
              height: 16px;
              background: #11b883;
              margin-right: 20px;
            }
          }
        }
      }
    }
    .HomeIndex_top_r {
      width: 40%;
      height: 450px;
      background: #fff;
      box-sizing: border-box;
      padding: 20px;
      > p {
        font-size: 17px;
        font-weight: bold;
        color: #333;
        > span {
          color: #c82229;
        }
      }
      > div {
        margin-top: 50px;
      }
    }
  }
  .HomeIndex_boot {
    background: #fff;
    padding: 30px 20px;
    margin-top: 20px;
    > p {
      font-size: 17px;
      font-weight: bold;
      color: #333;
    }
    > div {
      margin-top: 40px;
    }
  }
}
</style>
