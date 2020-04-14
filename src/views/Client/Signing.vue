<template>
    <div class="Signing">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>签单信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <!--            <div>-->
            <!--                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">客户新增</el-button>-->
            <!--            </div>-->
            <div class="search">
                <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-select v-model="wjsd" clearable   placeholder="请选择">
                    <el-option
                            v-for="item in  wjsdArr"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入姓名或手机号" v-model="cxnamephone" clearable></el-input>
                <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
                <el-button type="primary" size="mini" @click="onRecharge" :disabled="multipleSelection.length<=0">签单结账</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style=""
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="客户名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="客户电话"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="ordertime"
                            label="开台时间"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="tablename"
                            label="餐台"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="totalmoney"
                            label="消费金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="discountamount"
                            label="优惠金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="payamount"
                            label="应付金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="discountratio"
                            label="折扣率"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="overtime"
                            label="签单时间"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="empname"
                            label="收银员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="memo"
                            label="备注"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status==4">未支付</div>
                            <div v-if="scope.row.status==5">已支付</div>
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
                >
                </el-pagination>
            </div>

        </div>
        <!--        签单结账-->
        <div class="onRecharge">
            <el-dialog title="签单结账" :close-on-click-modal="false" :visible.sync="Recharge">
                <div class="onRecharge_cont">
                    <div  class="onRecharge_cont_top">
                        <div>应付金额：<el-input placeholder="请输入充值金额" v-model="yinfje" clearable disabled></el-input></div>
                        <div>备注：<el-input placeholder="请输入备注" v-model="mome" clearable></el-input></div>
                    </div>
                    <div  class="zffs dingj">
                        <p>支付方式：</p>
                        <ul>
                            <li @click="onxinanj">
                                <p><img src="@img/xianjin@2x.png" style="width:40px" alt=""></p>
                                <div>现金</div>
                            </li>
                            <li @click="onzfbwx('zfb')">
                                <p><img src="@img/zhifubao(1)@2x.png" alt=""></p>
                                <div>支付宝</div>
                            </li>
                            <li  @click="onzfbwx('wx')">
                                <p><img src="@img/weixinzhifu@2x.png" style="width:57px" alt=""></p>
                                <div>微信</div>
                            </li>
                            <li @click="onyingkjz">
                                <p><img src="@img/yinhang@2x.png" style="width:60px" alt=""></p>
                                <div>银行卡</div>
                            </li>
                            <li @click="onyuezf">
                                <p><img src="@img/zhekou.png" alt=""></p>
                                <div>余额</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="Recharge = false">确 定</el-button>
                    <!--                    <el-button type="primary" @click="onModQiand">确 定</el-button>-->
                </div>
                <!--                支付宝 微信 银行卡结账-->
                <el-dialog  :title="zfbwxTitle" :visible.sync="zfbwx" class="zfbwx" :modal-append-to-body="false" :modal="false"  style="background:rgba(000,000,000,0.4);" >
                    <div class="zfbwx_cont" >
                        支付码：<el-input :autofocus="true"  v-model="zfbwxddh" @change="onzhifum" clearable ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="zfbwx=false">取 消</el-button>
                        <el-button type="danger" @click="onqdsa">确定结账</el-button>
                  </span>
                </el-dialog>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Signing",
        data(){
            return{
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                wjsd:'',           //结算未结算下拉
                wjsdArr:[
                    {
                        id:4,
                        label:"未支付"
                    },{
                        id:5,
                        label:'已支付'
                    }
                ],         //结算未结算下拉列表
                date:'',       //查询日期
                cxnamephone:'',     //查询手机号
                multipleSelection:[],   //勾选的
                orderidstr:[],      //勾选的id
                //签单结账
                Recharge:false,      //充值弹框
                czje:'',           //充值金额 /订金金额
                mome:'',           //备注
                yinfje:'',         //应付金额
                //支付宝 微信 银行卡结账
                zfbwx:false,     //微信 支付宝 银行卡
                zfbwxTitle:'',     //弹窗标题
                zfbwxbs:'',      //当前 wx微信   zfb 支付宝
                zfbwxddh:'',       //扫码回调订单号
            }
        },
        methods:{
            // 初始化列表
            initList(){
                let startdate='';
                let enddate='';
                if(this.date){
                    startdate=this.timedate(this.date[0]);
                    enddate=this.timedate(this.date[1]);
                }
                let data={
                    startdate:startdate,
                    enddate:enddate,
                    status:this.wjsd,
                    nameorphone:this.cxnamephone,
                    page:this.Jopage,
                    size:this.Josize
                };
                console.log(data);
                // 签单列表
                this.$post(this.$api.signlistinfo,data).then(data=>{
                    console.log('签单列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){

            },
            // 时间转换
            timedate(data){
                if( data instanceof Date){
                    let myDate=data;
                    let years=myDate.getFullYear();
                    let month=myDate.getMonth()+1;
                    let day=myDate.getDate();
                    if(month<10){
                        month='0'+month
                    }
                    if(day<10){
                        day='0'+day
                    }
                    return years+'-'+month+'-'+day
                }else{
                    return  data
                }
            },
            //点击查询
            onInquire(){
                this.initList();
            },
            // 转余额
            ondelete(row){
                this.$confirm('是否确定转入余额?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.deposittoaccount,{payid:row.payid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '转入成功!'
                            });
                            this.initList();
                        }
                    })

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            //点击退款
            ontuikuan(row){
                this.$confirm('是否确定退款请求?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.depositrefund,{payid:row.payid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '退款成功!'
                            });
                            this.initList();
                        }
                    })

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            // 点击勾选
            handleSelectionChange(val) {
                let zong=0;
                val.forEach(item=>{
                    zong+=Number(item.payamount);
                    this.orderidstr.push(item.orderid)
                });
                this.yinfje=zong;
                this.multipleSelection = val;
            },
            // 点击签单结账
            onRecharge(){
                this.Recharge=true;
            },
            // 共用支付接口
            gongzhif(arr){
                let data={
                    orderidstr:this.orderidstr.join(','),
                    payamount:this.yinfje,
                    code:this.zfbwxddh,
                    memo:this.mome,
                    paytype:arr
                };
                this.$post(this.$api.orderSignpay,data).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                        this.zfbwx=false;
                        this.Recharge=false;
                        this.initList();
                        this.czje="";
                        this.zfbwxddh='';

                    }
                })
            },
            // 现金支付
            onxinanj(){
                this.$confirm('是否确定使用现金支付', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.gongzhif(0)
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });

            },
            //余额支付
            onyuezf(){
                this.$confirm('是否确定使用余额支付', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.gongzhif(6)
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            // 支付宝 微信 银行卡结账
            onzfbwx(val){
                this.zfbwx=true;
                this.zfbwxbs=val;
                switch(val){
                    case 'zfb':
                        this.zfbwxTitle='支付宝结账';
                        break;
                    case 'wx':
                        this.zfbwxTitle='微信结账';
                        break;
                }
                console.log(val);
                setImmediate(function () {
                    document.querySelector(".zfbwx_cont input").focus();
                },500)
            },
            //银行卡结账
            onyingkjz(){
                 this.$confirm('是否确定使用银行卡支付', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.gongzhif(7)
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            // 支付宝微信回车调用
            onzhifum(){
                this.onqdsa()
            },
            // 确定结账
            onqdsa(){
                if(this.zfbwxbs=='zfb'){
                   this.gongzhif(1)
                }else if(this.zfbwxbs=='wx'){
                    this.gongzhif(2)
                }
            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList();

            }
        },
        mounted() {
            this.initList();
            this.init();
        }
    }
</script>

<style lang="scss">
    .Signing .el-dialog{
        width: 20%;

    }
    .onRecharge{
        .el-dialog__body{
            padding: 10px 20px 30px 20px;
        }
        .el-dialog{
            width: 35%;
        }
        .zfbwx{
            .el-dialog{
                width: 25%;
                margin-top: 25vh !important;
            }
        }
    }
</style>
<style scoped lang="scss">
    .Signing{
        padding: 20px 40px;

        .Position_cont{
            margin-top: 30px;
        }
        .Position_cont_table{
            margin-top: 30px;
        }
        .Thepopup{
            >div{
                li{
                    >p{
                        margin-bottom: 10px;
                    }
                    margin-top: 20px;
                }
                li:nth-child(1){
                    margin-top:0;
                }
            }
        }
        .page{
            width: 725px;
            display: flex;
            /*justify-content: center;*/
            margin-top: 20px;
            /*padding-left: 40px;*/
        }
        .el-select{
            width: 100%;
        }
        .search{
            display: flex;
            margin-top: 30px;
            .el-input{
                width: 200px;
                margin-right: 20px;
            }
            .el-button{
                margin-left: 20px;
            }
            .el-date-editor{
                width: 300px;
                margin-right: 20px;
            }
            .el-select{
                width: 200px;
                margin-right: 20px;
            }
        }
        .onRecharge{
            .onRecharge_cont{
                .onRecharge_cont_top{
                    display: flex;
                    div{
                        margin-left: 20px;
                    }
                    .el-input{
                        margin-top: 5px;
                    }
                    div:nth-child(1){
                        margin-left: 0;
                    }
                }
                .zffs{
                    margin-top: 20px;
                    >ul{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            width: 22%;
                            height: 108px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            border:1px solid #CCCCCC;
                            margin-top: 20px;
                            margin-left: 4%;
                            box-sizing: border-box;
                            cursor: pointer;
                            >p{
                                text-align: center;
                                img{
                                    width: 50px;
                                    height: 50px;
                                }
                            }
                            >div{
                                margin-top: 7px;
                                text-align: center;
                                color: #333;
                                font-size: 16px;
                            }
                        }
                        li:nth-child(1){
                            margin-left: 0;
                        }
                    }
                }
                .dingj{
                    ul{
                        li{
                            width: 18%;
                            margin-left: 2.5%;
                        }
                    }

                }
            }
            .zfbwx_cont{
                .el-input{
                    margin-top: 10px;
                }
            }
        }
    }
</style>