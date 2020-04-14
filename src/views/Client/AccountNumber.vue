<template>
    <div class="AccountNumber">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <!--            <div>-->
            <!--                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">客户新增</el-button>-->
            <!--            </div>-->
            <div class="search">
                <el-input placeholder="请输入客户名称" v-model="cxname" clearable></el-input>
                <el-input placeholder="请输入手机号" v-model="cxphone" clearable></el-input>
                <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="name"
                            label="客户姓名"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机"
                            width="">
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            prop="totalmoney"-->
<!--                            label="消费金额"-->
<!--                            width="">-->
<!--                    </el-table-column>-->
                    <el-table-column
                            prop="grouptotalmoney"
                            label="总金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="groupbalance"
                            label="余额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="singletotalpoint"
                            label="总积分"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="singlepointbalance"
                            label="积分余额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="lasttime"
                            label="最近消费时间"
                            width="">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="handleClick(scope.row)"  size="small">充值记录</el-button>
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
        <!--        充值记录-->
        <div class="Thepopup">
            <el-dialog :close-on-click-modal="false" :visible.sync="czjslshow" title="充值记录" @close="shutDown">
                <div>
                    <el-table
                            :data="cztableData"
                            border
                            style="">
                        <el-table-column
                                prop="emp1name"
                                label="业务员"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="empname"
                                label="操作员"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="investtype"
                                label="充值类型"
                                width="">
                            <template slot-scope="scope">
                                <div v-if="scope.row.investtype==0">充值办卡</div>
                                <div v-if="scope.row.investtype==1">充值返利</div>
                                <div v-if="scope.row.investtype==2">一般充值</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="investmoney"
                                label="充值金额"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="rebatemoney"
                                label="返利金额"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="investtime"
                                label="充值时间"
                                width="160">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                                width="">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status==0">未支付</div>
                                <div v-if="scope.row.status==1">已支付</div>
                                <div v-if="scope.row.status==2">支付失败</div>
                                <div v-if="scope.row.status==3">已退款</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="onRefund(scope.row)"  size="mini">退款</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--            分页-->
                    <div class="page">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="cztotal"
                                :page-size="czsize"
                                @current-change="onpagecz"
                                hide-on-single-page
                        >
                        </el-pagination>
                    </div>

                </div>
                <div slot="footer" class="dialog-footer">
                    <!--                    <el-button @click="xiaofmx = false">取 消</el-button>-->
                    <el-button type="primary" @click="czjslshow = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AccountNumber",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数

                cxname:'',      //查询name
                cxphone:'',     //查询手机号
                // 充值记录
                cztableData:[],     //查询的充值列表
                czjslshow:false,     //弹出层开关
                czcxid:'',           //员工id
                czpage:1,           ////分页
                czsize:10,           //条数
                cztotal:0,          //分页总条数
            }
        },
        methods:{
            // 初始化列表
            initList(){
                // 账号列表
                this.$post(this.$api.customersAcountlist,{
                    name:this.cxname,
                    phone:this.cxphone,
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log(' 账号列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){

            },
            //点击查询
            onInquire(){
              this.initList();
            },
            //点击充值记录查询
            handleClick(row){
                this.czcxid=row.customerid;
                this.czpage=1;
                this.czinitList();
                this.czjslshow=true;
            },
            //充值查询
            czinitList(){
                this.$post(this.$api.investslistbycid,{customerid:this.czcxid,page:this.czpage,size:this.czsize}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.cztableData=data.data;
                        this.cztotal=data.count;
                    }
                })
            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList();
            },
            // 充值分页
            onpagecz(value){
                this.czpage=value;
                this.czinitList();
            },
            // 退款
            onRefund(row){
                this.$prompt('请输入退款原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$post(this.$api.chongzhirefund,{memo:value,orderid:row.orderid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$alert(data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.czinitList();
                                    this.initList();
                                }
                            });
                        }
                    })
                })
            },
            // 修改新增关闭弹框
            shutDown(){
                //清空表单值
               this.cztableData=[];
            },
        },
        mounted() {
            this.initList();
            this.init();
        }
    }
</script>

<style lang="scss">
    .AccountNumber .el-dialog{
        width: 45%;
    }

</style>
<style scoped lang="scss">
    .AccountNumber{
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
        }
    }
</style>