<template>
  <div class="CustomerInformation">
    <div class="Position_top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="Position_cont">
      <div>
        <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">客户新增</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入手机号或姓名" v-model="nameorphone" clearable></el-input>
        <el-button type="primary" size="mini" @click="onchaxss">查询</el-button>
      </div>
      <div class="Position_cont_table">
        <el-table :data="tableData" border style>
          <el-table-column prop="name" label="姓名" width></el-table-column>
          <el-table-column prop="phone" label="手机" width></el-table-column>
          <el-table-column prop="sexname" label="性别" width></el-table-column>
          <el-table-column prop="birthday" label="生日" width></el-table-column>
          <!-- <el-table-column prop="nation" label="民族" width></el-table-column> -->
          <el-table-column prop="isvip" label="VIP客户" width></el-table-column>
          <el-table-column prop="issign" label="签单客户" width></el-table-column>
          <el-table-column prop="registertime" label="注册日期" width="160"></el-table-column>
          <el-table-column fixed="right" label="操作" width="472">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="ModQiand=true;customerid=scope.row.customerid"
                size="mini"
              >签单</el-button>
              <el-button type="primary" @click="onAddVIP(scope.row)" size="mini">
                <div>VIP卡</div>
              </el-button>
              <el-button type="primary" @click="onRecharge(scope.row,'cz')" size="mini">充值</el-button>
              <el-button type="primary" @click="onRecharge(scope.row)" size="mini">订金</el-button>
              <el-button type="primary" @click="onxiaofjl(scope.row)" size="mini">消费记录</el-button>
              <el-button type="primary" @click="zhifmshow=true;customerid=scope.row.customerid" size="mini">支付码</el-button>
              <el-button type="primary" @click="handleClick(scope.row)" size="mini">修改</el-button>
              <el-button type="primary" @click="ondelete(scope.row)" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--            分页-->
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="Josize"
          @current-change="onpage"
          hide-on-single-page
        ></el-pagination>
      </div>
    </div>
    <!--        新增  修改-->
    <div class="Thepopup">
      <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe" @close="shutDown">
        <div>
          <ul>
            <li>
              <p>姓名：</p>
              <el-input v-model="name" placeholder="请输入内容" clearable></el-input>
            </li>
            <li>
              <p>性别：</p>
              <el-select v-model="sex" clearable placeholder="请选择">
                <el-option
                  v-for="item in sexArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              <p>电话：</p>
              <el-input v-model="phone" placeholder="请输入内容" maxlength="11" clearable></el-input>
            </li>
            <li>
              <p>生日：</p>
              <el-date-picker v-model="birthday" type="date" placeholder="选择日期"></el-date-picker>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Modifythe = false">取 消</el-button>
          <el-button type="primary" @click="ondetermine">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--        新增 vip-->
    <div class="Thepopup">
      <el-dialog :close-on-click-modal="false" :visible.sync="ModVIP" @close="shutDown2">
        <div>
          <ul>
            <li>
              <p>卡号：</p>
              <el-input v-model="cardcode" placeholder="请输入内容" clearable></el-input>
            </li>
            <li>
              <p>到期日期：</p>
              <el-date-picker v-model="enddate" type="date" placeholder="选择日期"></el-date-picker>
            </li>
              <!--            <li>-->
              <!--              <p>初始金额：</p>-->
              <!--              <el-input v-model="totalmoney" placeholder="请输入内容" maxlength="11" clearable></el-input>-->
              <!--            </li>-->
            <li>
              <p>业务员：</p>
              <el-select v-model="employeeid" clearable placeholder="请选择">
                <el-option
                  v-for="item in employeeidArr"
                  :key="item.employeeid"
                  :label="item.name"
                  :value="item.employeeid"
                ></el-option>
              </el-select>
            </li>
            <li>
              <p>折扣率：</p>
              <el-input v-model="discountrate" placeholder="请输入内容" clearable></el-input>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ModVIP = false">取 消</el-button>
          <el-button type="primary" @click="onModVIP">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--        新增 签单-->
    <div class="Thepopup">
      <el-dialog :close-on-click-modal="false" :visible.sync="ModQiand" @close="shutDown3">
        <div>
          <ul>
            <li>
              <p>担保人：</p>
              <el-input v-model="dbsponsor" placeholder="请输入内容" clearable></el-input>
            </li>
            <li>
              <p>担保人电话：</p>
              <el-input v-model="dbphone" placeholder="请输入内容" maxlength="11" clearable></el-input>
            </li>
            <li>
              <p>日签单限额：</p>
              <el-input v-model="daymoney" placeholder="请输入内容" clearable></el-input>
            </li>
            <li>
              <p>月签单限额：</p>
              <el-input v-model="monthmoney" placeholder="请输入内容" clearable></el-input>
            </li>
            <li>
              <p>业务员：</p>
              <el-select v-model="dbemployeeid" clearable placeholder="请选择">
                <el-option
                  v-for="item in employeeidArr"
                  :key="item.employeeid"
                  :label="item.name"
                  :value="item.employeeid"
                ></el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ModQiand = false">取 消</el-button>
          <el-button type="primary" @click="onModQiand">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--        充值弹框-->
    <div class="onRecharge">
      <el-dialog
        :title="cztitle"
        :close-on-click-modal="false"
        :visible.sync="Recharge"
        @close="shutDown4"
      >
        <div class="onRecharge_cont">
          <div class="onRecharge_cont_top">
            <div>
              {{cztitle}}金额：
              <el-input placeholder="请输入充值金额" v-model="czje" clearable></el-input>
            </div>
            <div v-if="czdjtype=='cz'">
              赠送金额：
              <el-input placeholder="请输入赠送金额" v-model="zsje" clearable></el-input>
            </div>
            <div v-if="czdjtype=='cz'">
              赠送积分：
              <el-input placeholder="请输入赠送积分" v-model="zsjf" clearable></el-input>
            </div>
            <div>
              备注：
              <el-input placeholder="请输入备注" v-model="mome" clearable></el-input>
            </div>
          </div>
          <div :class="[czdjtype=='dj'?'dingj':'']" class="zffs" >
            <p>支付方式：</p>
            <ul>
              <li @click="onxinanj" v-if="zhifs.some(item=>{return item==3})">
                <p>
                  <img src="@img/xianjin@2x.png" style="width:40px" alt />
                </p>
                <div>现金</div>
              </li>
              <li @click="onzfbwx('zfb')" v-if="zhifs.some(item=>{return item==2})">
                <p>
                  <img src="@img/zhifubao(1)@2x.png" alt />
                </p>
                <div>支付宝</div>
              </li>
              <li @click="onzfbwx('wx')" v-if="zhifs.some(item=>{return item==1})">
                <p>
                  <img src="@img/weixinzhifu@2x.png" style="width:57px" alt />
                </p>
                <div>微信</div>
              </li>
              <li @click="onyinghk" v-if="zhifs.some(item=>{return item==4})">
                <p>
                  <img src="@img/yinhang@2x.png" style="width:60px" alt />
                </p>
                <div>银行卡</div>
              </li>
              <li v-if="czdjtype=='dj'&&zhifs.some(item=>{return item==5})" @click="onyuezf" >
                <p>
                  <img src="@img/zhekou.png" alt />
                </p>
                <div>余额</div>
              </li>
            </ul>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Recharge = false">确 定</el-button>
        </div>
        <!--                支付宝 微信 银行卡结账-->
        <el-dialog :title="zfbwxTitle" :visible.sync="zfbwx" class="zfbwx" :modal-append-to-body="false" :modal="false" style="background:rgba(000,000,000,0.4);" @close="shutDown5" >
            <div class="zfbwx_cont">
              支付码：
              <el-input :autofocus="true" v-model="zfbwxddh" @keyup.enter.native="onzhifum" clearable></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="zfbwx=false">取 消</el-button>
              <el-button type="danger" @click="onqdsa">确定结账</el-button>
            </span>
        </el-dialog>
      </el-dialog>
    </div>
    <!--        消费记录-->
    <div class="xfjls">
      <el-dialog :close-on-click-modal="false" :visible.sync="xfjlshow" title="消费记录">
        <div>
          <el-table :data="xfjltableData" border style>
            <el-table-column prop="payamount" label="金额" width></el-table-column>
            <el-table-column prop="paytypename" label="收款方式" width></el-table-column>
            <el-table-column prop="flagname" label="类型" width></el-table-column>
            <el-table-column prop="paytime" label="支付时间" width="160"></el-table-column>
            <el-table-column prop="memo" label="备注" width></el-table-column>
            <el-table-column prop="paytypedescname" label="付款具体方式" width></el-table-column>
            <el-table-column prop="statusname" label="状态" width></el-table-column>
          </el-table>
          <!--            分页-->
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="xftotal"
              :page-size="xfsize"
              @current-change="onpagecf"
              hide-on-single-page
            ></el-pagination>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <!--                    <el-button @click="xiaofmx = false">取 消</el-button>-->
          <el-button type="primary" @click="xfjlshow = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 设置支付码 -->
    <div class="zhifuma">
      <el-dialog :close-on-click-modal="false" :visible.sync="zhifmshow" title="支付码">
        <div>
            <el-input placeholder="请输入支付码" v-model="zfpasword1" maxlength="6" type='password'></el-input>
            <el-input placeholder="再次输入支付码" v-model="zfpasword2" maxlength="6" type='password'></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="zhifmshow = false">取 消</el-button>
          <el-button type="primary" @click="onzhifuma">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerInformation",
  data() {
    return {
      tableData: [],
      Modifythe: false, //弹出层新增客户开关
      type: "new", //new新增  edit修改

      Jopage: 1, //分页
      Josize: 10, //条数
      total: 0, //分页总条数

      nameorphone: "", //查询手机号
      name: "", //姓名
      sex: "", //性别  男女
      sexArr: [
        {
          value: "0",
          label: "女"
        },
        {
          value: "1",
          label: "男"
        }
      ],
      phone: "", //电话
      birthday: "", //生日
      //新增vip
      ModVIP: false, //弹出层新增vip
      cardcode: "", //卡号
      enddate: "", //到期日期
      totalmoney: "", //初始金额
      employeeid: "", //业务员
      employeeidArr: [], //业务员列表
      discountrate: "", //折扣率
      //签单
      ModQiand: false, //弹出层签单
      dbsponsor: "", //担保人
      dbphone: "", //担保人电话
      daymoney: "", //日签单限额
      monthmoney: "", //月签单限额
      dbemployeeid: "", //签单业务员
      //充值
      Recharge: false, //充值弹框
      czje: "", //充值金额 /订金金额
      zsje: 0, //赠送金额
      zsjf: 0, //赠送积分
      mome: "", //备注
      cztitle: "", // 标题
      czdjtype: "", // cz 充值 dj //订金
      zhifs:[],          //可使用支付方式
      //支付宝 微信 银行卡结账
      zfbwx: false, //微信 支付宝 银行卡
      zfbwxTitle: "", //弹窗标题
      zfbwxbs: "", //当前 wx微信   zfb 支付宝
      zfbwxddh: "", //扫码回调订单号
      //消费记录
      xfjltableData: [], //消费记录列表
      xfjlshow: false, ///弹出层消费记录
      xfpage: 1, //分页
      xfsize: 10, //条数
      xftotal: 0, //分页总条数
      customerid: "", //用户id
      //支付码
        zhifmshow:false,
        zfpasword1:'',  //支付码1
        zfpasword2:'',   //支付码2
      // 支付结果等待
      zfjgdd: true //限制执行次数
    };
  },
  methods: {
    // 初始化列表
    initList() {
      this.name = "";
      this.sex = "";
      this.phone = "";
      this.birthday = "";
      // 客户列表
      this.$post(this.$api.customerslist, {
        nameorphone: this.nameorphone,
        page: this.Jopage,
        size: this.Josize
      }).then(data => {
        console.log("客户列表", data);
        if (data.code == 0) {
          this.tableData = data.data;
          this.total = data.count;
        }
      });
    },
    // 初始化
    init() {
      // 业务员
      this.$post(this.$api.selectemp).then(data => {
        this.employeeidArr = data.data;
        console.log("业务员", data);
      });
      //支付方式
      this.$post(this.$api.paytypeSelectpay).then(data=>{
        console.log('支付方式',data);
        if(data.code==0){
          this.zhifs=data.data
        }
      })
    },
    //点击搜索
    onchaxss(){
     // 客户列表
      this.$post(this.$api.customerslist, {
        nameorphone: this.nameorphone,
        page: this.Jopage,
        size: this.Josize
      }).then(data => {
        console.log("客户列表", data);
        if (data.code == 0) {
          this.tableData = data.data;
          this.total = data.count;
        }
      });
    },
    // 时间转换
    DateTime(date) {
      if(date){
        let year = date.getUTCFullYear();
        let month = date.getUTCMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return year + "-" + month + "-" + day;
      }else{
        return '';
      }

    },
    // 新增
    onnew() {
      this.Modifythe = true;
      this.type = "new";
    },
    // 修改
    handleClick(row) {
      this.Modifythe = true;
      this.type = "edit";
      this.name = row.name;
      this.sex = row.sex;
      this.phone = row.phone;
      this.birthday = row.birthday;
      this.customerid = row.customerid;
    },
    // 添加确定
    ondetermine() {
      let birthday = "";
      if (this.birthday instanceof Date) {
        birthday = this.DateTime(this.birthday);
      } else {
        birthday = this.birthday;
      }
      if (this.type == "new") {
        let data = {
          name: this.name,
          sex: this.sex,
          phone: this.phone,
          birthday: birthday
        };
        console.log(data);
        //新增
        this.$post(this.$api.customersadd, data).then(data => {
          if (data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.Modifythe = false;
            this.initList();
          }
        });
      } else if (this.type == "edit") {
        let data = {
          name: this.name,
          sex: this.sex,
          phone: this.phone,
          birthday: birthday,
          customerid: this.customerid
        };
        // 修改
        this.$post(this.$api.customersedit, data).then(data => {
          if (data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.Modifythe = false;
            this.initList();
          }
        });
      }
    },
    // 删除
    ondelete(row) {
      this.$confirm(" 是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post(this.$api.customersdel, {
            customerid: row.customerid
          }).then(data => {
            console.log(data);
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initList();
            }
          });
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    // 支付码设置
    onzhifuma(){
        if(this.zfpasword1==this.zfpasword2){
            this.$post(this.$api.setcuspasswd,{customerid:this.customerid,passwd:this.zfpasword2}).then(data=>{
                console.log(data);
                if(data.code==0){
                     this.$message({
                    message: "设置成功",
                    type: "success"
                });
                }
            })
        }else{
             this.$message({
                message: "两次支付码不一致请重新输入",
                type: "error"
            });
        }
    },
    //新增vip
    onAddVIP(row) {
      this.ModVIP = true;
      this.customerid = row.customerid;
    },
    //新增vip 确定
    onModVIP() {
      //新增
      let data = {
        customerid: this.customerid,
        cardcode: this.cardcode,
        enddate: this.DateTime(this.enddate),
        totalmoney: this.totalmoney,
        employeeid: this.employeeid,
        discountrate: this.discountrate
      };
      this.$post(this.$api.customersAddvip, data).then(data => {
        if (data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.customerid = "";
          this.cardcode = "";
          this.enddate = "";
          this.totalmoney = "";
          this.employeeid = "";
          this.discountrate = "";
          this.ModVIP = false;
          this.initList();
        }
      });
    },
    //签单 新增
    onModQiand() {
      let data = {
        customerid: this.customerid,
        sponsor: this.dbsponsor,
        phone: this.dbphone,
        daymoney: this.daymoney,
        monthmoney: this.monthmoney,
        employeeid: this.dbemployeeid
      };
      this.$post(this.$api.customersAddsign, data).then(data => {
        if (data.code == 0) {
          this.$message({
            message: "签单成功",
            type: "success"
          });
          this.customerid = "";
          this.dbsponsor = "";
          this.dbphone = "";
          this.daymoney = "";
          this.employeeid = "";
          this.monthmoney = "";
          this.dbemployeeid = "";
          this.ModQiand = false;
          this.initList();
        }
      });
    },
    // 点击充值
    onRecharge(row, data) {
      console.log(row);
      this.Recharge = true;
      this.customerid = row.customerid;
      if (data == "cz") {
        this.cztitle = "充值";
        this.czdjtype = "cz";
      } else {
        this.cztitle = "订金";
        this.czdjtype = "dj";
      }
    },
    // 现金支付
    onxinanj() {
      let flag = "";
      let title = "";
      let mag = "";
      // 充值
      if (this.czdjtype == "cz") {
        flag = 1;
        title = "是否确定现金充值";
        mag = "充值成功!";
      } else if (this.czdjtype == "dj") {
        //订金
        flag = 2;
        title = "是否确定现金缴纳订金";
        mag = "缴纳成功!";
      }
      let data = {
        customerid: this.customerid,
        payamount: this.czje,
        code: this.zfbwxddh,
        paytype: 0,
        rebatemoney: this.zsje,
        flag: flag,
        rebatepoint: this.zsjf,
        memo: this.mome
      };
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.zfjgdd) {
            this.zfjgdd = false;
            this.$post(this.$api.customersDeposit, data).then(data => {
              console.log(data);
              this.zfjgdd = true;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: mag
                });
                this.zfbwx = false;
                this.Recharge = false;
                this.initList();
                this.czje = "";
                this.zfbwxddh = "";
                this.mome = "";
                this.zsje = 0;
                this.zsjf = 0;
              }
            });
          }
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    //银行卡支付
    onyinghk() {
      let flag = "";
      let title = "";
      let mag = "";
      // 充值
      if (this.czdjtype == "cz") {
        flag = 1;
        title = "是否确定银行卡充值";
        mag = "充值成功!";
      } else if (this.czdjtype == "dj") {
        //订金
        flag = 2;
        title = "是否确定银行卡缴纳订金";
        mag = "缴纳成功!";
      }
      let data = {
        customerid: this.customerid,
        payamount: this.czje,
        code: this.zfbwxddh,
        paytype: 7,
        rebatemoney: this.zsje,
        flag: flag,
        rebatepoint: this.zsjf,
        memo: this.mome
      };
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.zfjgdd) {
            this.zfjgdd = false;
            this.$post(this.$api.customersDeposit, data).then(data => {
              console.log(data);
              this.zfjgdd = true;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: mag
                });
                this.zfbwx = false;
                this.Recharge = false;
                this.initList();
                this.czje = "";
                this.zfbwxddh = "";
                this.mome = "";
                this.zsje = 0;
                this.zsjf = 0;
              }
            });
          }
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    //余额支付
    onyuezf() {
      let data = {
        customerid: this.customerid,
        payamount: this.czje,
        code: this.zfbwxddh,
        paytype: 6,
        rebatemoney: this.zsje,
        flag: 2,
        rebatepoint: this.zsjf,
        memo: this.mome
      };
      this.$confirm("是否确定余额缴纳订金", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.zfjgdd) {
            this.zfjgdd = false;
            this.$post(this.$api.customersDeposit, data).then(data => {
              console.log(data);
              this.zfjgdd = true;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "缴纳成功"
                });
                this.zfbwx = false;
                this.Recharge = false;
                this.initList();
                this.czje = "";
                this.zfbwxddh = "";
                this.zsje = 0;
                this.zsjf = 0;
                this.mome = "";
              }
            });
          }
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    // 支付宝 微信
    onzfbwx(val) {
      this.zfbwx = true;
      this.zfbwxbs = val;
      switch (val) {
        case "zfb":
          this.zfbwxTitle = "支付宝结账";
          break;
        case "wx":
          this.zfbwxTitle = "微信结账";
          break;
      }
      console.log(val);
      setImmediate(function() {
        document.querySelector(".zfbwx_cont input").focus();
      }, 500);
    },
    // 支付宝微信回车调用
    onzhifum() {
      this.onqdsa();
    },
    // 确定结账
    onqdsa() {
      let flag = "";
      let paytype = "";
      let msg = "";
      if (this.czdjtype == "cz") {
        flag = 1;
        msg = "充值成功！";
        if (this.zfbwxbs == "zfb") {
          paytype = 1;
        } else if (this.zfbwxbs == "wx") {
          paytype = 2;
        }
      } else if (this.czdjtype == "dj") {
        flag = 2;
        msg = "缴纳成功";
        if (this.zfbwxbs == "zfb") {
          paytype = 1;
        } else if (this.zfbwxbs == "wx") {
          paytype = 2;
        }
      }
      let data = {
        customerid: this.customerid,
        payamount: this.czje,
        code: this.zfbwxddh,
        paytype: paytype,
        rebatemoney: this.zsje,
        flag: flag,
        rebatepoint: this.zsjf,
        memo: this.mome
      };
      if (this.zfjgdd) {
        this.zfjgdd = false;
        this.$post(this.$api.customersDeposit, data).then(data => {
          console.log(data);
          this.zfjgdd = true;
          if (data.code == 0) {
            this.$message({
              type: "success",
              message: msg
            });
            this.zfbwx = false;
            this.Recharge = false;
            this.initList();
            this.czje = "";
            this.zfbwxddh = "";
            this.zsje = 0;
            this.zsjf = 0;
            this.mome = "";
          }
        });
      }
    },
    // 消费明细
    onxiaofjl(row) {
      this.customerid = row.customerid;
      this.xfjlshow = true;
      this.xfpage = 1;
      this.xfchaxinit();
    },
    xfchaxinit() {
      this.$post(this.$api.consumptionlistbycusid, {
        customerid: this.customerid,
        page: this.xfpage,
        size: this.xfsize
      }).then(data => {
        console.log(data);
        if (data.code == 0) {
          this.xfjltableData = data.data;
          this.xftotal = data.count;
        }
      });
    },
    // 点击分页
    onpage(value) {
      this.Jopage = value;
      this.initList();
    },
    // 消费分页
    onpagecf(value) {
      this.xfpage = value;
      this.xfchaxinit();
    },
    // 修改新增关闭弹框
    shutDown() {
      //清空表单值
      this.name = "";
      this.sex = "";
      this.phone = "";
      this.birthday = "";
    },
    // 新增 vip弹框关闭弹框
    shutDown2() {
      //清空表单值
      this.customerid = "";
      this.cardcode = "";
      this.enddate = "";
      this.totalmoney = "";
      this.employeeid = "";
      this.discountrate = "";
    },
    // 新增 签单关闭弹框
    shutDown3() {
      //清空表单值
      this.customerid = "";
      this.dbsponsor = "";
      this.dbphone = "";
      this.daymoney = "";
      this.employeeid = "";
      this.monthmoney = "";
      this.dbemployeeid = "";
    },
    // 充值弹框关闭弹框
    shutDown4() {
      //清空表单值
      this.czje = "";
      this.zfbwxddh = "";
      this.zsje = 0;
      this.zsjf = 0;
      this.mome = "";
    },
    //支付弹框关闭弹框
    shutDown5() {
      this.zfbwxddh = "";
    }
  },
  mounted() {
    this.initList();
    this.init();
  }
};
</script>

<style lang="scss">
.CustomerInformation {
  .el-dialog {
    width: 20%;
  }
  .el-button--mini {
    padding: 5px 8px;
  }
}
.onRecharge {
  .el-dialog__body {
    padding: 10px 20px 30px 20px;
  }
  .el-dialog {
    width: 35%;
  }
  .zfbwx {
    .el-dialog {
      width: 25%;
      margin-top: 25vh !important;
    }
  }
}
.xfjls {
  .el-dialog {
    width: 45%;
    margin-top: 25vh !important;
  }
}
.zhifuma{
    >div{
        .el-input{
            margin-bottom: 20px;
        }
    }
}
</style>
<style scoped lang="scss">
.CustomerInformation {
  padding: 20px 40px;
  .Position_cont {
    margin-top: 30px;
  }
  .Position_cont_table {
    margin-top: 30px;
  }
  .Thepopup {
    > div {
      li {
        > p {
          margin-bottom: 10px;
        }
        margin-top: 20px;
      }
      li:nth-child(1) {
        margin-top: 0;
      }
    }
    .el-date-editor {
      width: 100%;
    }
  }
  .page {
    width: 725px;
    display: flex;
    /*justify-content: center;*/
    margin-top: 20px;
    /*padding-left: 40px;*/
  }
  .el-select {
    width: 100%;
  }
  .search {
    display: flex;
    margin-top: 30px;
    .el-input {
      width: 300px;
    }
    .el-button {
      margin-left: 20px;
    }
  }
  .onRecharge {
    .onRecharge_cont {
      .onRecharge_cont_top {
        display: flex;
        div {
          margin-left: 20px;
        }
        .el-input {
          margin-top: 5px;
        }
        div:nth-child(1) {
          margin-left: 0;
        }
      }
      .zffs {
        margin-top: 20px;
        > ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 22%;
            height: 108px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border: 1px solid #cccccc;
            margin-top: 20px;
            margin-left: 4%;
            box-sizing: border-box;
            cursor: pointer;
            > p {
              text-align: center;
              img {
                width: 50px;
                height: 50px;
              }
            }
            > div {
              margin-top: 7px;
              text-align: center;
              color: #333;
              font-size: 16px;
            }
          }
          li:nth-child(1) {
            margin-left: 0;
          }
        }
      }
      .dingj {
        ul {
          li {
            width: 18%;
            margin-left: 2.5%;
          }
        }
      }
    }
    .zfbwx_cont {
      .el-input {
        margin-top: 10px;
      }
    }
  }
}
</style>