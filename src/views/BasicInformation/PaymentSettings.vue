<template>
    <div class="PaymentSettings">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                <el-breadcrumb-item>支付设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">优惠券新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="paycode"
                            label="编号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="payname"
                            label="名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="isQuan"
                            label="类型"
                            width="">
                            <template slot-scope="scope">
                                <div v-if="scope.row.isquan==1">优惠券</div>
                                <div v-else>支付方式</div>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="quannum"
                            label="可使用数量"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="quanmoney"
                            label="卷金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="discountmoney"
                            label="优惠金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="minmoney"
                            label="消费下限"
                            width="">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="状态"
                            width="">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status=='0' ? true : false"
                                    active-text="关"
                                    inactive-text="开" @change="onswitchType(scope.row)" :class="[scope.row.status=='0'?'el-switch-right-block':'el-switch-left-block']">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                            fixed="right"
                            label="操作"
                            width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" :disabled="scope.row.isquan=='0'" @click="handleClick(scope.row)"  size="small">修改</el-button>
                            <el-button type="primary" :disabled="scope.row.isquan=='0'" @click="ondelete(scope.row)" size="small">删除</el-button>
                        </template>
                    </el-table-column> -->
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
                            <p>可使用数量：</p>
                            <el-input v-model="quannum" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>优惠券名称：</p>
                            <el-input v-model="payname" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>券金额：</p>
                            <el-input v-model="quanmoney" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>优惠金额：</p>
                            <el-input v-model="discountmoney" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>消费下限：</p>
                            <el-input v-model="minmoney" placeholder="请输入内容" clearable></el-input>
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
        name: "PaymentSettings",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //职位分页
                Josize:13,   //职位条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                quannum:'',       //可使用数量：
                payname:'',          //优惠券名称
                quanmoney:'',         //券金额
                discountmoney:'',       //优惠金额
                minmoney:'',           //消费下限
                id:'',           
            }
        },
        methods:{
            // 初始化
            init(){
                //优惠券内列表
               this.$post(this.$api.paytypeList,{
                   page:this.Jopage,
                   size:this.Josize
               }).then(data=>{
                   console.log('优惠券内列表',data);
                   if(data.code==0){
                       this.tableData=data.data;
                       this.total=data.count;
                   }
               })
                this.quannum='';
                this.payname='';
                this.quanmoney='';
                this.discountmoney='';
                this.minmoney='';
            },
            // 新增
            onnew(){
                this.Modifythe=true;
                this.type='new'
            },
            // 修改
            handleClick(row) {
                this.Modifythe=true;
                this.type='edit';
                this.quannum=row.quannum;
                this.payname=row.payname;
                this.quanmoney=row.quanmoney;
                this.discountmoney=row.discountmoney;
                this.minmoney=row.minmoney;
                this.id=row.id;
            },
            // 添加确定
            ondetermine(){
                 let data={
                        quannum:this.quannum,
                        payname:this.payname,
                        quanmoney:this.quanmoney,
                        discountmoney:this.discountmoney,
                        minmoney:this.minmoney,
                        id:this.id
                    }
                if(this.type=='new'){
                    //添加
                    this.$post(this.$api.paytypeAdd,data).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.init()
                        }
                    })
                }else if(this.type=='edit'){
                    //修改
                    this.$post(this.$api.paytypeEdit,data).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.init()
                        }

                    });
                }


            },
            //使用不使用开关
            onswitchType(row){
                let status='';
                if(row.status=='1'){
                    status=0
                }else{
                    status=1
                }
                this.$post(this.$api.paytchangestatus,{id:row.id,status:status}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                         this.$message({
                            type: 'success',
                            message: '设置成功'
                        });
                        this.init();
                    }
                })
            },
            // 删除
            ondelete(row){
                    this.$confirm(' 是否确定删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                       this.$post(this.$api.paytypeDel,{id:row.id}).then(data=>{
                           console.log(data);
                           if(data.code==0){
                               this.$message({
                                   type: 'success',
                                   message: '删除成功!'
                               });
                               this.init()
                           }
                       })

                    })
                },
            // 关闭弹框
            shutDown(){
                //清空表单值
                 this.quannum='';
                this.payname='';
                this.quanmoney='';
                this.discountmoney='';
                this.minmoney='';
            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.init();
            }
        },
        mounted() {
                this.init()
        }
    }
</script>
<style lang="scss">
    .PaymentSettings .el-dialog{
        width: 20%;
    }
      /*修改开关样式*/
    .el-switch{
        position: relative;
        .el-switch__label--left{
            position: absolute;
            left: 6px;
            z-index: 1000;
            >span{
                font-size: 8px;
                color: #fff;
            }
        }
        .el-switch__label--right{
            position: absolute;
            right: 6px;
            z-index: 1000;
            >span{
                font-size: 8px;
                color: #0a7df3;
            }
        }

        .el-switch__core:after{
            z-index: 10000;
        }
    }
    .el-switch-left-block{
        .el-switch__label--left{
            display: none !important;
        }
    }
    .el-switch-right-block{
        .el-switch__label--right{
            display: none !important;
        }
    }
</style>
<style scoped lang="scss">
    .PaymentSettings{
        padding: 20px 40px;
    }

    .Position_cont{
        margin-top: 30px;
    }
    .Position_cont_table{
        margin-top: 30px;
    }
    .Thepopup{
        >div{
            li{
                margin-top: 15px;
                >p{
                    margin-bottom: 10px;
                }
            }
            li:nth-child(1){
                margin-top: 0;
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
</style>