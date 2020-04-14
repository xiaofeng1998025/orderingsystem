<template>
  <div class="home">
    <div class="top">
        <div class="top_logo">
          <img src="@img/logo.png" alt="">
        </div>
        <div class="top_h3">
          古渝雄关欢迎您！
        </div>
        <div class="top_right">
            <ul>
              <li @click="Modifythe=true">修改密码</li>
<!--              <li>修改个人信息</li>-->
              <li @click="dropout">退出</li>
            </ul>
        </div>
    </div>
    <div class="cont_body">
        <div class="TheSide">
<!--        <div class="TheSide_top">-->
<!--          <div>-->
<!--            <p><img src="@img/toux.png" alt=""></p>-->
<!--            <div>-->
<!--              <div class="TheSide_top_time">2019-12-09</div>-->
<!--              <div class="TheSide_top_name">李刚 店长</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <el-col >
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" unique-opened @close="handleClose" background-color="#545c64" text-color="#ffffff" active-text-color="#FF9499" router>


              <el-submenu :index="index.toString()" v-for="(item,index) in dhURL" :key="index">
                  <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{item.name}}</span>
                  </template>
                  <el-menu-item-group>
                      <el-menu-item v-for="(item2,index2) in item.c_list" :key="index2" :index="item2.url">{{item2.name}}</el-menu-item>
                  </el-menu-item-group>
              </el-submenu>


              <el-submenu index="">
                  <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>统计报表</span>
                  </template>
                  <el-menu-item-group>
                      <el-menu-item index="/home/returndetails">退菜明细</el-menu-item>
                      <el-menu-item index="/home/giftdetails">赠菜明细</el-menu-item>
                      <el-menu-item index="/home/salesStatistics">菜品销售统计</el-menu-item>
                      <el-menu-item index="/home/wineList">酒水单</el-menu-item>
                      <el-menu-item index="/home/signingSummary">签单月份汇总</el-menu-item>
                      <el-menu-item index="/home/BillPayment">账单支付明细</el-menu-item>
                      <el-menu-item index="/home/SettlementMethod">结算方式汇总</el-menu-item>
                      <el-menu-item index="/home/BusinessSummary">营业汇总</el-menu-item>
                      <el-menu-item index="/home/DiscountCard">优惠卡往来</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>



<!--            <el-submenu index="20">-->
<!--              <template slot="title">-->
<!--                <i class="el-icon-s-platform"></i>-->
<!--                <span>权限管理</span>-->
<!--              </template>-->
<!--              <el-menu-item-group>-->
<!--                <el-menu-item index="/home/roleInformation">角色信息</el-menu-item>-->
<!--              </el-menu-item-group>-->

<!--            </el-submenu>-->



<!--            <el-submenu index="3">-->
<!--              <template slot="title">-->
<!--                <i class="el-icon-s-tools"></i>-->
<!--                <span>客户管理</span>-->
<!--              </template>-->
<!--              <el-menu-item-group>-->
<!--                  <el-menu-item index="/home/customerInformation">客户信息</el-menu-item>-->
<!--                  <el-menu-item index="/home/vIPCustomers">VIP客户</el-menu-item>-->
<!--                  <el-menu-item index="/home/sign">签单客户</el-menu-item>-->
<!--                  <el-menu-item index="/home/accountNumber">账号管理</el-menu-item>-->
<!--                  <el-menu-item index="/home/deposit">订金管理</el-menu-item>-->
<!--                  <el-menu-item index="/home/Signing">签单信息</el-menu-item>-->
<!--              </el-menu-item-group>-->
<!--            </el-submenu>-->

<!--              <el-submenu index="4">-->
<!--                  <template slot="title">-->
<!--                      <i class="el-icon-s-unfold"></i>-->
<!--                      <span>仓库管理</span>-->
<!--                  </template>-->
<!--                  <el-menu-item-group>-->
<!--                      <el-menu-item index="/home/ckunit">仓库单位</el-menu-item>-->
<!--                      <el-menu-item index="/home/ckmanagement">仓库管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/Supplier">供应商管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/rawMaterialFl">原料分类管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/ylgl">原料管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/directDial">采购直拨管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/warehouse">原料入库管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/outboundManagement">原料出库管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/inventory">库房盘点管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/damaged">库房报损管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/InventoryManagement">库存管理</el-menu-item>-->
<!--                  </el-menu-item-group>-->
<!--              </el-submenu>-->

<!--              <el-submenu index="5">-->
<!--                  <template slot="title">-->
<!--                      <i class="el-icon-menu"></i>-->
<!--                      <span>菜品管理</span>-->
<!--                  </template>-->
<!--                  <el-menu-item-group>-->
<!--                      <el-menu-item index="/home/dishunit">菜品单位</el-menu-item>-->
<!--                      <el-menu-item index="/home/classification">菜品分类</el-menu-item>-->
<!--&lt;!&ndash;                      <el-menu-item index="/home/productionMethod">菜品制作方法</el-menu-item>&ndash;&gt;-->
<!--                      <el-menu-item index="/home/dishManagement">菜品管理</el-menu-item>-->
<!--                      <el-menu-item index="/home/menu">标准菜谱</el-menu-item>-->
<!--                      <el-menu-item index="/home/sell">菜品沽清</el-menu-item>-->
<!--                  </el-menu-item-group>-->
<!--              </el-submenu>-->

<!--&lt;!&ndash;              <el-submenu index="6">&ndash;&gt;-->
<!--&lt;!&ndash;                  <template slot="title">&ndash;&gt;-->
<!--&lt;!&ndash;                      <i class="el-icon-s-grid"></i>&ndash;&gt;-->
<!--&lt;!&ndash;                      <span>预定管理</span>&ndash;&gt;-->
<!--&lt;!&ndash;                  </template>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-menu-item-group>&ndash;&gt;-->
<!--&lt;!&ndash;                      <el-menu-item index="/home/bookinformation">预定信息</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;                  </el-menu-item-group>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-submenu>&ndash;&gt;-->

<!--              <el-submenu index="6">-->
<!--                  <template slot="title">-->
<!--                      <i class="el-icon-s-shop"></i>-->
<!--                      <span>前台管理</span>-->
<!--                  </template>-->
<!--                  <el-menu-item-group>-->
<!--                      <el-menu-item index="/home/diningTablet">餐台图</el-menu-item>-->
<!--                      <el-menu-item index="/home/consumerDetails">消费信息</el-menu-item>-->
<!--                  </el-menu-item-group>-->
<!--              </el-submenu>-->

          </el-menu>
        </el-col>
      </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
      <!--        新增  修改-->
      <div class="Thepopup">
          <el-dialog close-on-click-modal :visible.sync="Modifythe"  @close="shutDown">
              <el-input
                      placeholder="请输入原密码"
                      prefix-icon="el-icon-lock"
                      show-password
                      minlength="6"
                      v-model="oldpassword">
              </el-input>
              <el-input
                      placeholder="请输入新密码"
                      prefix-icon="el-icon-lock"
                      show-password
                      minlength="6"
                      v-model="newpassword">
              </el-input>
              <el-input
                      placeholder="请再次输入新密码"
                      prefix-icon="el-icon-lock"
                      show-password
                      minlength="6"
                      v-model="againpassword">
              </el-input>
              <el-button type="danger" @click="onmodify">确定修改</el-button>
          </el-dialog>
      </div>
  </div>

</template>

<script>


export default {
    ame: 'home',
    data(){
        return{
            Modifythe:false,   //修改密码弹框
            oldpassword:'',     //原密码
            newpassword:'',    //新密码
            againpassword:'',  //再次确定密码
            dhURL:[],             //导航URl
        }
    },
    methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        // 点击退出
        dropout(){
              this.$confirm(' 是否确定退出登录?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$post(this.$api.employeeslogout,).then(data=>{
                      console.log(data);
                      if(data.code==0){
                          this.$message({
                              type: 'success',
                              message: '退出成功!'
                          });
                         this.$router.push({name:'login'})
                      }
                  })

              }).catch(() => {
                  // this.$message({
                  //     type: 'info',
                  //     message: '已取消删除'
                  // });
              });
          },
        // 弹窗关闭
        shutDown(){
        },
         // 确定修改
        onmodify(){
            if(this.newpassword==this.againpassword){
                this.$post(this.$api.updatepassword,{oldpassword:this.oldpassword,newpassword:this.newpassword}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$router.push({name:'login'})
                    }
                })
            }else{
                this.$message.error('你输入的两次密码不一致，请重新输入');
            }
        },
        // 导航获取
        dhhq(){
            this.$post(this.$api.employeesMenu,).then(data=>{
                this.dhURL=data.data;
                console.log(data);
            })
        }
  },
    mounted() {
        this.dhhq()
    },
    components: {

    }
}
</script>
<style lang="scss">
    .page{
        margin-top: 20px;
    }
    .Thepopup{
        .el-dialog{
            width: 20%;
        }
    }
  .TheSide{

    .el-menu{
      border-right: none;
    }
    .el-menu-item:hover{
        background-color:#C82229 !important;
        color: #FF9499!important;
    }
  }
</style>
<style scoped lang="scss">
  .home{
    position: relative;

    .top{
        /*position:absolute;*/
        /*width: 100%;*/
        /*top:0;*/
      height: calc(8vh);
      align-items: center;
      background: #C82229;
      display: flex;
      .top_logo{
        width: 240px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 110px;
          height: 50px;
        }
      }
      .top_h3{
        color: #fff;
        margin-left: 30px;
        font-size: 18px;
        font-weight: bold;
      }
      .top_right{
        margin-left: auto;
        margin-right: 60px;
        >ul{
          display: flex;
          li{
            color: #fff;
            margin-left: 20px;
              cursor: pointer;
          }
        }
      }
    }
    .cont_body:after{
      content: " ";
      display: block;
      clear: both;
    }
    .TheSide:after{
      content: " ";
      display: block;
      clear: both;
    }
    .cont_body{
      display: flex;
        min-height: calc(92vh);
    }
    .TheSide{
        width: 240px;
        /*height:calc(92vh);*/
        /*overflow-x: auto;*/
      background:#545c64 ;
      .TheSide_top{
        display: flex;
        justify-content: center;
        color: #fff;
        border-bottom: 2px solid #2A2324;
        >div{
          >p{
            width: 90px;
            height: 90px;
            border-radius: 100%;
            margin-top: 36px;
            img{
              width: 100%;
              height: 100%
            }
          }
          .TheSide_top_time{
            margin-top: 24px;
            text-align: center;
          }
          .TheSide_top_name{
            margin-top: 10px;
            text-align: center;
            margin-bottom:38px ;
          }
        }
      }
    }
    .content{
      width: 60%;
      flex-grow: 1;
    }
      .Thepopup{
          .el-input{
              margin-bottom: 20px;
          }
          .el-button{
              width: 100%;
              margin-top: 10px;
          }
      }
  }
</style>
