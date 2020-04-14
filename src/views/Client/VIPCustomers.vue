<template>
    <div class="VIPCustomers">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>VIP客户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
<!--            <div>-->
<!--                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">客户新增</el-button>-->
<!--            </div>-->
            <div class="search">
                <el-input placeholder="请输入店铺名称" v-model="cxstorename" clearable></el-input>
                <el-input placeholder="请输入客户名称" v-model="cxname" clearable></el-input>
                <el-input placeholder="请输入手机号" v-model="cxphone" clearable></el-input>
                <el-input placeholder="请输入卡号" v-model="cxcardcode" clearable></el-input>
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

                            prop="storename"
                            label="店铺名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="cardcode"
                            label="卡号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="totalmoney"
                            label="金额"
                            width="">
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            prop="validmoney"-->
<!--                            label="余额"-->
<!--                            width="">-->
<!--                    </el-table-column>-->
                    <el-table-column
                            prop="begindate"
                            label="启用日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="enddate"
                            label="到期日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="discountrate"
                            label="折扣率"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="intime"
                            label="办卡时间"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="empname"
                            label="业务员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp1name"
                            label="操作员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp2name"
                            label="审核员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            width="">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status=='0'">正常</div>
                            <div v-else-if="scope.row.status=='2'">删除</div>
                            <div v-else>未审核</div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="220">
                        <template slot-scope="scope">
                            <el-button  :disabled="scope.row.status!='1'" type="primary" @click="onmodify(scope.row)"  size="small">修改</el-button>
                            <el-button  :disabled="scope.row.status!='1'"  type="primary" @click="onReview(scope.row)"  size="small">审核</el-button>
                            <el-button  :disabled="scope.row.status!='1'"  type="primary" @click="ondelete(scope.row)" size="small">删除</el-button>
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
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe" @close="shutDown">
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
<!--                        <li>-->
<!--                            <p>初始金额：</p>-->
<!--                            <el-input v-model="totalmoney" placeholder="请输入内容" maxlength="11" clearable></el-input>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <p>余额：</p>-->
<!--                            <el-input v-model="validmoney" placeholder="请输入内容" maxlength="11" clearable></el-input>-->
<!--                        </li>-->
                        <li>
                            <p>业务员：</p>
                            <el-select v-model="employeeid"  clearable placeholder="请选择">
                                <el-option
                                        v-for="item in employeeidArr"
                                        :key="item.employeeid"
                                        :label="item.name"
                                        :value="item.employeeid">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>折扣率：</p>
                            <el-input v-model="discountrate" placeholder="请输入内容"  clearable></el-input>
                        </li>
                    </ul>
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
        name: "VIPCustomers",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                cxstorename:'',  //查询店铺名称
                cxname:'',  //查询客户名称
                cxphone:'',  //查询手机号
                cxcardcode:'',  //查询卡号

                cardcode:'',      //卡号
                totalmoney:'',     //初始金额
                validmoney:'',     //余额
                enddate:'',       //到期日期
                employeeid:'',    //业务员
                employeeidArr:[],   //业务员列表
                discountrate:'',  //折扣率
                vipid:'',         //id
            }
        },
        methods:{
            // 初始化列表
            initList(){
                this.cardcode='';
                this.totalmoney='';
                this.validmoney='';
                this.enddate='';
                this.employeeid='';
                this.discountrate='';
                // vip列表
                this.$post(this.$api.customersViplist,{
                    storename:this.cxstorename,
                    name:this.cxname,
                    phone:this.cxphone,
                    cardcode:this.cxcardcode,
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('vip列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })

            },
            // 初始化
            init(){
                // 业务员
                this.$post(this.$api.selectemp).then(data=>{
                    this.employeeidArr=data.data;
                    console.log('业务员',data);
                })
            },
            // 修改
            onmodify(row) {
                this.Modifythe=true;
                this.type='edit';
                this.cardcode=row.cardcode;
                this.totalmoney=row.totalmoney;
                // this.validmoney=row.validmoney;
                this.enddate=row.enddate;
                this.employeeid=row.employeeid;
                this.discountrate=row.discountrate;
                this.vipid=row.vipid;
            },
            // 修改添加确定
            ondetermine(){
                 if(this.type=='edit'){
                     let enddate='';
                     if(this.enddate instanceof Date){
                         enddate=this.DateTime(this.enddate)
                     }else{
                         enddate=this.enddate
                     }
                     let data={
                         vipid:this.vipid,
                         cardcode:this.cardcode,
                         totalmoney:this.totalmoney,
                         validmoney:this.validmoney,
                         enddate:enddate,
                         employeeid:this.employeeid,
                         discountrate:this.discountrate
                     };
                    // 修改
                    this.$post(this.$api.customersEditvip,data).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.initList()
                        }

                    });
                }


            },
            // 删除
            ondelete(row){
                this.$confirm(' 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.customersDelvip,{vipid:row.vipid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
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
            //审核Vip
            onReview(row){
                this.$confirm('是否确定让该用户成为VIP?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.customersAuthvip,{vipid:row.vipid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '设置成功!'
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
            // 点击查询
            onInquire(){
              this.initList();
            },
            // 修改新增关闭弹框
            shutDown(){
                //清空表单值
                this.cardcode='';
                this.totalmoney='';
                this.validmoney='';
                this.enddate='';
                this.employeeid='';
                this.discountrate='';
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
    .VIPCustomers .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .VIPCustomers{
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
        .Thepopup{
            .el-date-editor{
                width: 100%;
            }
        }
    }
</style>