<template>
    <div class="rawMaterialFl">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>原料分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">原料分类新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 1021px">
                    <el-table-column
                            fixed
                            prop="code"
                            label="分类编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="分类名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="分类等级"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="parentname"
                            label="上级分类"
                            width="200">
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
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe" @close="shutDown">
                <div>
                    <ul>
                        <li>
                            <p>分类编号：</p>
                            <el-input v-model="code" placeholder="请输入编号" clearable></el-input>
                        </li>
                        <li>
                            <p>分类名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入名称" clearable></el-input>
                        </li>
                        <li>
                            <p>上级分类（不选为一级选择为二级添加）：</p>
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
        name: "rawMaterialFl",
        data(){
            return {
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改

                code:'',     //编号
                Jobtitle:'',       //名称
                principal:'',        //上级分类
                principalArr:[],     //上级分类列表
                principalId:'',   //上级分类id
                classifyid:'',   //id

            }
        },
        methods:{
            // 初始化
            init(){
                this.code='';
                this.Jobtitle='';
                this.classifyid='';
                this.principal='';
                this.principalId='';
                // 原料分类列表
                this.$post(this.$api.materialclassifyslist,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('原料分类列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                });
            },
            // 原料分类下拉
            rincipal(){
                this.$post(this.$api.selecmaterialclassifys,{level:1}).then(data=>{
                    console.log('原料分类下拉',data);
                    if(data.code==0){
                        this.principalArr=data.data;
                    }
                });
            },
            // 上级分类选择
            onprincipal(value){
                this.principalId=value;
                console.log(value);
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
                this.code=row.code;
                this.Jobtitle=row.name;
                this.classifyid=row.classifyid;
                this.principal=row.parentname;
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.materialclassifysadd,{
                        code:this.code,
                        name:this.Jobtitle,
                        parentid:this.principalId,
                    }).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.init();
                            this.rincipal();
                        }
                    })
                }else if(this.type=='edit'){
                    // 修改
                    this.$post(this.$api.materialclassifysedit,{
                        classifyid:this.classifyid,
                        code:this.code,
                        name:this.Jobtitle,
                        parentid:this.principalId
                    }).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.init()
                            this.rincipal()
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
                    this.$post(this.$api.materialclassifysdel,{classifyid:row.classifyid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.init();
                            this.rincipal();
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
                this.classifyid='';
                this.principal='';
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
    .rawMaterialFl .el-dialog{
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
    .rawMaterialFl{
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