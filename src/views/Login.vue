<template>
  <div class="login">
    <div class="top">
          <p><img src="@img/logo.png" alt=""></p>
    </div>
    <div class="cont">
        <div class="cont_title">
          <h3>欢迎登录</h3>
          <span>古渝雄关餐饮管理系统</span>
        </div>
        <div class="cont_cont">
            <div>
              <el-input placeholder="请输入手机号" v-model="phone" clearable maxlength="11">
                <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
              </el-input>
            </div>
            <div>
              <el-input placeholder="请输入员工号" v-model="solid" clearable>
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </div>
          <div>
            <el-input placeholder="请输入密码" v-model="password" clearable show-password>
              <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
            </el-input>
          </div>
          <div class="cont_yanzm">
              <el-input placeholder="请输入验证码" v-model="code" clearable maxlength="4">
              </el-input>
              <!--验证码组件-->
              <div class="login-code" @click="refreshCode">
                  <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
          </div>
          <div class="Login" @click="onlogin">
            登录
          </div>
        </div>
    </div>
    <div class="bottom">
        <p>版权所有：重庆古渝雄关餐饮文化有限责任公司 </p>
      <div>
        渝ICP备15012731号-4 渝B2-20180059 Copyright©2015-2019wwwjcsc.comAll Rights Reserved.
      </div>
    </div>
  </div>
</template>
<script>
  import SIdentify  from '@/components/sidentify'
  import router from "../router";
  export default {
    name: 'Login',
    components: { SIdentify },
    data(){
      return{
        phone:'',   //手机号
        solid:'',   //员工号
        password:'',  //密码
        identifyCodes: "123456789",
        identifyCode: "",   //输入的验证码
        code:"",//text框输入的验证码
      }
    },
    methods:{
      //验证码
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);},
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        },
      makeCode(o, l) {
         for (let i = 0; i < l; i++) {
               this.identifyCode += this.identifyCodes[
                         this.randomNum(0, this.identifyCodes.length)
               ];
           }
         //console.log(this.identifyCode);
        },
        // 点击登录
        onlogin(){
          let that=this;
          if(this.phone&&this.solid&&this.password){
              if(this.code==this.identifyCode){
                  this.$post(this.$api.login,{
                      phone:this.phone,
                      employeeno:this.solid,
                      pwd:this.password
                  }).then(data=>{
                      console.log(data);
                      this.refreshCode();
                      if(data.code==0){
                          that.$message.success('登录成功');
                          localStorage.setItem("token", data.data.token);
                          localStorage.setItem("name", data.data.name);
                          router.push({name:'home'})
                      }
                  })
              }else{
                  this.$message.error('验证码错误');
              }
          }else{
              this.$message.error('手机号,员工号,密码不能为空');
          }

        }

    },
    created(){
      // 初始化验证吗
      this.refreshCode()
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },

  }
</script>


<style scoped lang="scss">
  .login{
    .top{
      height:540px ;
      background: url("../assets/images/bajk.png");
      >p{
        padding-top: 90px;
        text-align: center;
      }
    }
    .cont{
      width: 730px;
      height: 530px;
      background: #fff;
      margin:-230px auto 0 auto;
      .cont_title{
        width: 400px;
        margin: auto;
        display: flex;
        padding-top: 74px;
        align-items: flex-end;
        h3{
          font-size: 36px;
          color:#DF0024;
          margin-right: 14px;
          font-weight: 500;
        }
        span{
          font-size: 20px;
          color: #505050;
        }
      }
      .cont_cont{
        width: 400px;
        margin:40px  auto 0 auto;
        >div{
          margin-top: 20px;
        }
        .cont_yanzm{
          display: flex;
          .login-code{
            margin-left: 10px;
          }
        }
        .Login{
          line-height: 50px;
          color: #fff;
          font-size: 20px;
          text-align: center;
          background: #DF0024;
          border-radius: 5px;
          cursor: pointer;

        }
      }
    }
    .bottom{
      width: 824px;
      height: 90px;
      margin: auto;
      background: url("../assets/images/yingy.png");
      color:#999999 ;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      p{
        text-align: center;
        font-size: 14px;
      }
      div{
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
