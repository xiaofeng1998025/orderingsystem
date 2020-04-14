<template>
    <div class="Deposit">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>订金管理</el-breadcrumb-item>
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
                <el-select v-model="wjsd" clearable   placeholder="请选择结算">
                    <el-option
                            v-for="item in  wjsdArr"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入姓名或手机号" v-model="cxnamephone" clearable></el-input>
                <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
<!--                    <el-table-column-->
<!--                            fixed-->
<!--                            prop="payid"-->
<!--                            label="订金序列号"-->
<!--                            width="">-->
<!--                    </el-table-column>-->
                    <el-table-column
                            prop="name"
                            label="订金人"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="订金电话"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="paytypedesc"
                            label="支付方式"
                            width="">
                        <template slot-scope="scope">
                            <div v-if="scope.row.paytypedesc==0">现金</div>
                            <div v-if="scope.row.paytypedesc==1">支付宝</div>
                            <div v-if="scope.row.paytypedesc==2">微信</div>
                            <div v-if="scope.row.paytypedesc==6">余额</div>
                            <div v-if="scope.row.paytypedesc==7">银行卡</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="payno"
                            label="支付单号"
                            width="300px">
                    </el-table-column>
                    <el-table-column
                            prop="payamount"
                            label="订金金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="paytime"
                            label="支付时间"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="empname"
                            label="操作员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="memo"
                            label="备注"
                            width="">
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            prop="lasttime"-->
<!--                            label="结算时间"-->
<!--                            width="">-->
<!--                    </el-table-column>-->
                    <el-table-column
                            prop="overflag"
                            label="状态"
                            width="">
                        <template slot-scope="scope">
                            <div v-if="scope.row.overflag==0">已结算</div>
                            <div v-if="scope.row.overflag==1">未结算</div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="250">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="ontuikuan(scope.row)"  size="small">退款</el-button>
                            <el-button type="primary" @click="ondelete(scope.row)" size="small">转余额</el-button>
                            <el-button type="primary" @click="onwykc(scope.row)" size="small">违约扣除</el-button>
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
        <!--        新增  修改-->
        <div class="Thepopup">
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe">
                <div>
                    <el-input placeholder="请输入备注" v-model="memo" clearable></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="Modifythe = false">取 消</el-button>
                    <el-button type="primary" @click="ondetermine">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Deposit",
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
                        id:0,
                        label:"已结算"
                    },{
                        id:1,
                        label:"未结算"
                    }
                ],         //结算未结算下拉列表
                date:'',       //查询日期
                cxnamephone:'',     //查询手机号

                memo:'',        //扣除
                payid:'',       //
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
                console.log(this.date);
                    let data={
                        startdate:startdate,
                        enddate:enddate,
                        overflag:this.wjsd,
                        nameorphone:this.cxnamephone,
                        page:this.Jopage,
                        size:this.Josize
                    };
                console.log(data);
                // 订金列表
                this.$post(this.$api.depositinfo,data).then(data=>{
                    console.log('订金列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 违约扣除
            onwykc(row){
                this.Modifythe=true;
                this.payid=row.payid;
            },
            // 确定
            ondetermine(){
               this.$post(this.$api.customersKouchu,{payid:this.payid,memo:this.memo}).then(data=>{
                   if(data.code==0){
                       this.$message({
                           type: 'success',
                           message: '扣除成功!'
                       });
                       this.initList();
                   }
                   console.log(data);
               })
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
                this.$prompt('请输入退款原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$post(this.$api.depositrefund,{memo:value,payid:row.payid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$alert(data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.initList();
                                }
                            });
                        }
                    })
                })

            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList();

            }
        },
        mounted() {
            this.initList();
        }
    }
</script>


<style lang="scss">
    .Deposit .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .Deposit{
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
    }
</style>