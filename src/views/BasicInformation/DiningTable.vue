<template>
<!--    //餐台信息-->
    <div class="DiningTable">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                <el-breadcrumb-item>餐台信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">餐台新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column fixed prop="areaname" label="区域"></el-table-column>
                    <el-table-column prop="code" label="餐台编号"></el-table-column>
                    <el-table-column prop="name" label="餐台名称"></el-table-column>
                    <el-table-column prop="seats" label="座位数量"></el-table-column>
                    <el-table-column prop="minmoney" label="最低消费"></el-table-column>
                    <el-table-column prop="fixedfee" label="服务费（固定金额）"></el-table-column>
<!--                    <el-table-column prop="ratiofee" label="服务费（按比例）"></el-table-column>-->
<!--                    <el-table-column prop="seatfee" label="茶水费"></el-table-column>-->
                    <el-table-column prop="empname" label="负责人"></el-table-column>
                    <el-table-column prop="memo" label="备注"></el-table-column>
                    <el-table-column prop="flag" label="使用标识"></el-table-column>
                    <el-table-column
                            fixed="right"
                            label="状态"
                            width="80">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status=='0'?true:false"
                                    active-text="关"
                                    inactive-text="开" @change="onswitchType(scope.row)" :class="[scope.row.status=='0'?'el-switch-right-block':'el-switch-left-block']">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <!--                            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>-->
                            <el-button type="primary" @click="handleClick(scope.row)"  size="small">修改</el-button>
                            <el-button type="primary" @click="ondelete(scope.row)" size="small">删除</el-button>
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
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe"  @close="shutDown">
                <div>
                    <ul>
                        <li>
                            <p>区域：</p>
                            <el-select v-model="region" @change="onregion" placeholder="请选择">
                                <el-option
                                        v-for="item in regionArr"
                                        :key="item.areaid"
                                        :label="item.name"
                                        :value="item.areaid">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>餐台编号：</p>
                            <el-input v-model="code" placeholder="请输入编号" clearable></el-input>
                        </li>
                        <li>
                            <p>餐台名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入名称" clearable></el-input>
                        </li>
                        <li>
                            <p>座位数量：</p>
                            <el-input v-model="seats" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>最低消费：</p>
                            <el-input v-model="minmoney" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>服务费（固定金额）：</p>
                            <el-input v-model="fixedfee" placeholder="请输入内容" clearable></el-input>
                        </li>
<!--                        <li>-->
<!--                            <p>服务费（按比例）：</p>-->
<!--                            <el-input v-model="ratiofee" placeholder="请输入内容" clearable></el-input>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <p>茶水费：</p>-->
<!--                            <el-input v-model="seatfee" placeholder="请输入内容" clearable></el-input>-->
<!--                        </li>-->
                        <li>
                            <p>负责人：</p>
                            <el-select v-model="principal" @change="onprincipal"  placeholder="请选择">
                                <el-option
                                        v-for="item in principalArr"
                                        :key="item.employeeid"
                                        :label="item.name"
                                        :value="item.employeeid">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>备注：</p>
                            <el-input v-model="memo" placeholder="请输入内容" clearable></el-input>
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
        name: "DiningTable",
        data(){
            return {
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                code:"",    //编号
                Jobtitle:'',       //名称
                seats:'',  //座位数量
                region:'',      //区域name
                regionArr:'',        //区域列表
                regionId:'',          //区域id
                memo:'',        //备注
                minmoney:'',     //最低消费
                fixedfee:'',      //按金额收取服务费
                ratiofee:'',         //按比例收取服务费
                seatfee:'',       //茶水费
                principal:'',        //负责人
                principalArr:[],     //负责人列表
                principalId:'',   //负责人id
                tableid:'',   //id
                switchType:true,   //状态开关
            }
        },
        methods:{
            // 列表初始化
            initList(){
                //清空表单值
                this.code='';
                this.Jobtitle='';
                this.seats='';
                this.region='';
                this.regionId='';
                this.memo='';
                this.minmoney='';
                this.fixedfee='';
                this.ratiofee='';
                this.seatfee='';
                this.principal='';
                this.principalId='';
                this.areaid='';
                // 区域列表
                this.$post(this.$api.tableslist,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('餐台列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                });
            },
            // 初始化
            init(){
                // 区域下拉
                this.$post(this.$api.selectareas,).then(data=>{
                    console.log('区域下拉',data);
                    if(data.code==0){
                        this.regionArr=data.data;
                    }
                });
                // 负责人下拉
                this.$post(this.$api.selectemp,).then(data=>{
                    console.log('负责人下拉',data);
                    if(data.code==0){
                        this.principalArr=data.data;
                    }
                });

            },
            // 区域选择
            onregion(value){
                this.regionId=value;
                console.log(value)
            },
            // 负责人选择
            onprincipal(value){
                this.principalId=value;
                console.log(value);
            },
            //状态切换
            onswitchType(arr){
                console.log(arr);
                let status='';
                if(arr.status==0){
                    status=1;
                }else{
                    status=0;
                }
                this.$post(this.$api.tablesChange,{tableid:arr.tableid,status:status}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.initList()
                    }

                })
            },
            // 新增
            onnew(){
                this.Modifythe=true;
                this.type='new'
            },
            // 修改
            handleClick(row) {
                this.Modifythe=true;
                this.code=row.code;
                this.Jobtitle=row.name;
                this.seats=row.seats;
                this.region=row.areaname;
                this.regionId=row.areaid;
                this.memo=row.memo;
                this.minmoney=row.minmoney;
                this.fixedfee=row.fixedfee;
                this.ratiofee=row.ratiofee;
                this.seatfee=row.seatfee;
                this.principal=row.empname;
                this.principalId=row.employeeid;
                this.tableid=row.tableid;
                this.type='edit'
            },
            // 弹框确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.tablesadd,{
                        code:this.code,
                        name:this.Jobtitle,
                        seats:this.seats,
                        areaid:this.regionId,
                        memo:this.memo,
                        minmoney:this.minmoney,
                        fixedfee:this.fixedfee,
                        ratiofee:this.ratiofee,
                        seatfee:this.seatfee,
                        employeeid:this.principalId,
                    }).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.initList()
                        }
                    })
                }else if(this.type=='edit'){
                    // 修改
                    this.$post(this.$api.tablesedit,{
                        tableid:this.tableid,
                        code:this.code,
                        name:this.Jobtitle,
                        seats:this.seats,
                        areaid:this.regionId,
                        employeeid:this.principalId,
                        minmoney:this.minmoney,
                        fixedfee:this.fixedfee,
                        ratiofee:this.ratiofee,
                        seatfee:this.seatfee,
                        memo:this.memo
                    }).then(data=>{
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
                    this.$post(this.$api.tablesTablesdel,{tableid:row.tableid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.initList()
                        }
                    })

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.code='';
                this.Jobtitle='';
                this.seats='';
                this.region='';
                this.regionId='';
                this.memo='';
                this.minmoney='';
                this.fixedfee='';
                this.ratiofee='';
                this.seatfee='';
                this.principal='';
                this.principalId='';
                this.areaid='';
            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList()
            }
        },
        mounted() {
            this.initList();
            this.init();
        }
    }
</script>


<style lang="scss">
    .DiningTable .el-dialog{
        width: 35%;
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
    .DiningTable{
        padding: 20px 40px;

        .Position_cont{
            margin-top: 30px;
        }
        .Position_cont_table{
            margin-top: 30px;
        }
        .Thepopup{
            >div{
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                li{
                    width: 48%;
                    >p{
                        margin-bottom: 10px;
                    }
                    margin-top: 20px;
                }
                li:nth-child(1),li:nth-child(2){
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

    }
</style>