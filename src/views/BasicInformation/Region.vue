<template>
    <div class="Region">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                <el-breadcrumb-item>区域信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">区域新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 1121px">
                    <el-table-column
                            fixed
                            prop="areaid"
                            label="序列号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="区域名称"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="empname"
                            label="负责人"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="状态"
                            width="250">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status=='0'? true:false "
                                    active-text="关"
                                    inactive-text="开" @change="onswitchType(scope.row)" :class="[scope.row.status=='0'?'el-switch-right-block':'el-switch-left-block']">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="250">
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
                            <p>区域名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入区域" clearable></el-input>
                        </li>
                        <li>
                            <p>负责人：</p>
                            <el-select v-model="principal" @change="onprincipal" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in principalArr"
                                        :key="item.employeeid"
                                        :label="item.name"
                                        :value="item.employeeid">
                                </el-option>
                            </el-select>
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
        name: "Region",
        data(){
            return {
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                Jobtitle:'',       //名称
                principal:'',        //负责人
                principalArr:[],     //负责人列表
                principalId:'',   //负责人id
                areaid:'',   //id
                switchType:true,   //状态开关
            }
        },
        methods:{
            // 初始化
            init(){
                this.principal='';
                this.Jobtitle='';
                this.areaid='';
                this.principalId='';
                // 区域列表
                this.$post(this.$api.areasList,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('区域列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                });
            },
            // 负责人下拉
            rincipal(){
                this.$post(this.$api.selectemp,).then(data=>{
                    console.log('负责人下拉',data);
                    if(data.code==0){
                        this.principalArr=data.data;
                    }
                });
            },
            // 负责人选择
            onprincipal(value){
                this.principalId=value;
                console.log(value);
            },
            //状态切换 区域开关
            onswitchType(arr){
                console.log(arr);
                let status='';
                if(arr.status==0){
                    status=1;
                }else{
                    status=0;
                }
                this.$post(this.$api.areasChange,{areaid:arr.areaid,status:status}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }
                    this.init()
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
                this.Jobtitle=row.name;
                this.areaid=row.areaid;
                this.principal=row.empname;
                this.principalId=row.employeeid;
                this.type='edit'
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.areasAdd,{
                        name:this.Jobtitle,
                        employeeid:this.principalId,
                    }).then(data=>{
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
                    // 修改
                    this.$post(this.$api.areasEdit,{areaid:this.areaid,employeeid:this.principalId,name:this.Jobtitle}).then(data=>{
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
            // 删除
            ondelete(row){
                this.$confirm(' 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.areasDel,{areaid:row.areaid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.init()
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
                this.principal='';
                this.Jobtitle='';
                this.areaid='';
                this.principalId='';
            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.init();
            }
        },
        mounted() {
            this.init();
            this.rincipal();
        }
    }
</script>

<style lang="scss">
    .Region .el-dialog{
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
    .Region{
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

    }
</style>