<template>
    <div class="Printer">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                <el-breadcrumb-item>打印机</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">打印机新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column fixed prop="printercode" label="打印机编号"></el-table-column>
                    <el-table-column prop="classfyname" label="打印机类别"></el-table-column>
                    <el-table-column prop="name" label="打印机名称"></el-table-column>
                    <el-table-column prop="areaname" label="打印机区域"></el-table-column>
                    <el-table-column prop="printerip" label="打印机IP"></el-table-column>
                    <el-table-column prop="num" label="打印机份数"></el-table-column>
                    <el-table-column prop="memo" label="备注"></el-table-column>
                    <el-table-column
                            fixed="right"
                            label="状态"
                            width="150">
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
                            width="300">
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
                            <p>打印机编号：</p>
                            <el-input v-model="printercode" placeholder="请输入编号" clearable></el-input>
                        </li>
                        <li>
                            <p>打印机类别：</p>
                            <el-select v-model="principal" placeholder="请选择">
                                <el-option
                                        v-for="item in principalArr"
                                        :key="item.classifyid"
                                        :label="item.name"
                                        :value="item.classifyid">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>打印机名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入名称" clearable></el-input>
                        </li>
                        <li>
                            <p>打印机区域：</p>
                            <el-select v-model="region" placeholder="请选择">
                                <el-option
                                        v-for="item in regionArr"
                                        :key="item.areaid"
                                        :label="item.name"
                                        :value="item.areaid">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>打印机IP：</p>
                            <el-input v-model="printerip" placeholder="请输入IP" clearable></el-input>
                        </li>
                        <li>
                            <p>打印份数：</p>
                            <el-input v-model="num" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>备注：</p>
                            <el-input v-model="memo" placeholder="请输入备注" clearable></el-input>
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
        name: "Printer",
        data(){
            return {
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                printercode:"",    //编号
                Jobtitle:'',       //名称
                printerip:'',      //IP
                num:'',    //打印份数
                memo:'',        //备注
                region:'',      //区域name
                regionArr:'',        //区域列表

                principal:'',        //打印分类
                principalArr:[],     //打印分类列表

                printerid:'',   //id
                switchType:true,   //状态开关
            }
        },
        methods:{
            // 列表初始化
            initList(){
                //清空表单值
                this.printercode='';
                this.Jobtitle='';
                this.printerip='';
                this.num='';
                this.memo='';
                this.region='';
                this.principal='';
                this.printerid='';
                // 打印机列表
                this.$post(this.$api.printerlist,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('打印机列表',data);
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
                // 打印分类下拉
                this.$post(this.$api.selectprintclassfy,).then(data=>{
                    console.log('打印分类下拉',data);
                    if(data.code==0){
                        this.principalArr=data.data;
                    }
                });

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
                this.$post(this.$api.printerchange,{printerid:arr.printerid,status:status}).then(data=>{
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
                this.printerid=row.printerid;
                this.Jobtitle=row.name;
                this.printercode=row.printercode;
                this.printerip=row.printerip;
                this.principal=row.classifyid;
                this.region=row.areaid;
                this.num=row.num;
                this.memo=row.memo;
                this.type='edit'
            },
            // 弹框确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.printeradd,{
                        printercode:this.printercode,
                        name:this.Jobtitle,
                        printerip:this.printerip,
                        classifyid:this.principal,
                        areaid:this.region,
                        num:this.num,
                        memo:this.memo
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
                    let data={
                        printerid:this.printerid,
                        printercode:this.printercode,
                        name:this.Jobtitle,
                        printerip:this.printerip,
                        classifyid:this.principal,
                        areaid:this.region,
                        num:this.num,
                        memo:this.memo
                    }
                    console.log(data);
                    this.$post(this.$api.printeredit,data).then(data=>{
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
                    this.$post(this.$api.printerdel,{printerid:row.printerid}).then(data=>{
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
                this.printercode='';
                this.Jobtitle='';
                this.printerip='';
                this.num='';
                this.memo='';
                this.region='';
                this.principal='';
                this.printerid='';
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
    .Printer .el-dialog{
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
    .Printer{
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