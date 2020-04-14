<template>
    <div class="Classification">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">菜品分类新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="classifyid"
                            label="序列号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="分类名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="分类等级"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="parentname"
                            label="上级分类"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="printclassfyname"
                            label="打印分类"
                            width="">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="点餐显示（显示/不显示）"
                            width="">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.isshow=='0'?true:false"
                                    active-text="关"
                                    inactive-text="开" @change="ondisplay(scope.row)" :class="[scope.row.isshow=='0'?'el-switch-right-block':'el-switch-left-block']">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="状态（上架/下架）"
                            width="">
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
                            <p>分类名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入区域" clearable></el-input>
                        </li>
                        <li>
                            <p>上级分类（不选为一级选择为二级添加）：</p>
                            <el-select v-model="cpflxl" @change="oncpflxl" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in cpflxlArr"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>打印分类：</p>
                            <el-select v-model="principal" @change="onprincipal" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in principalArr"
                                        :key="item.classifyid"
                                        :label="item.name"
                                        :value="item.classifyid">
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
        name: "Classification",
        data(){
            return {
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                Jobtitle:'',       //名称
                principal:'',        //打印分类
                principalArr:[],     //打印分类列表
                principalId:'',   //打印分类id
                cpflxl:'',      //菜品分类下拉
                cpflxlArr:[],   //菜品分类下拉列表
                cpflxlId:'',    //菜品分类下拉id
                classifyid:'',   //id
                switchType:true,   //状态开关
            }
        },
        methods:{
            // 初始化列表
            initList(){
                this.principal='';
                this.Jobtitle='';
                this.classifyid='';
                this.principalId='';
                this.cpflxlId='';
                this.cpflxl='';
                // 菜品分类列表
                this.$post(this.$api.dishesclassfylist,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('菜品分类列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                });
            },
            // 初始化
            init(){
                // 打印分类下拉
                    this.$post(this.$api.selectprintclassfy,).then(data=>{
                        console.log('打印分类下拉',data);
                        if(data.code==0){
                            this.principalArr=data.data;
                        }
                    });
                    // 菜品分类下拉
                this.$post(this.$api.selectdishesclassfy,).then(data=>{
                    console.log('菜品分类下拉',data);
                    if(data.code==0){
                        this.cpflxlArr=data.data;
                    }
                });
            },

            // 分类选择
            onprincipal(value){
                this.principalId=value;
                console.log(value);
            },
            // 菜品分类下拉选择
            oncpflxl(value){
                this.cpflxlId=value;
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
                this.$post(this.$api.dishesclassfychangestatus,{classifyid:arr.classifyid,status:status}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.initList();
                    }

                })
            },
            // 点餐显示不显示
            ondisplay(arr){
                let isshow='';
                if(arr.isshow==0){
                    isshow=1;
                }else{
                    isshow=0;
                }
                this.$post(this.$api.dishesclassfychangeisshow,{classifyid:arr.classifyid,isshow:isshow}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.initList();
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
                this.Jobtitle=row.name;
                this.classifyid=row.classifyid;
                this.principal=row.printclassfyname;
                this.principalId=row.printid;
                this.cpflxl=row.parentname;
                this.cpflxlId=row.parentid;
                this.type='edit'
            },
            // 添加确定
            ondetermine(){
                console.log(this.cpflxlId);
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.dishesclassfyadd,{
                        name:this.Jobtitle,
                        printid:this.principalId,
                        parentid:this.cpflxlId
                    }).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.initList();
                            this.init();
                        }
                    })
                }else if(this.type=='edit'){
                    // 修改
                    this.$post(this.$api.dishesclassfyedit,{printid:this.principalId,classifyid:this.classifyid,name:this.Jobtitle,parentid:this.cpflxlId}).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.initList();
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
                    this.$post(this.$api.dishesclassfydel,{classifyid:row.classifyid}).then(data=>{
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
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.principal='';
                this.Jobtitle='';
                this.classifyid='';
                this.principalId='';
                this.cpflxlId='';
                this.cpflxl='';
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
    .Classification .el-dialog{
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
    .Classification{
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