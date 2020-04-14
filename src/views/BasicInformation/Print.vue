<template>
    <div class="print">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                <el-breadcrumb-item>打印分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">打印新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 725px">
                    <el-table-column
                            fixed
                            prop="code"
                            label="打印类别编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="打印类别名称"
                            width="300">
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
                            <p>打印类别编号：</p>
                            <el-input v-model="Serial" placeholder="请输入编号" clearable></el-input>
                        </li>
                        <li>
                            <p>打印类别名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入名称" clearable></el-input>
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
        name: "Print",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Serial:'',        //编号
                Jobtitle:'',       //名称
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                positionid:'',   //id
                type:'new'   //new新增  edit修改
            }
        },
        methods:{
            // 初始化
            init(){
                this.Serial='';
                this.Jobtitle='';
                // 职位列表
                this.$post(this.$api.dishesPrintlist,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('部门列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
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
                this.Serial=row.code;
                this.Jobtitle=row.name;
                this.positionid=row.classifyid;
                this.type='edit'
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.dishesPrintadd,{
                        code:this.Serial,
                        name:this.Jobtitle,
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
                    this.$post(this.$api.dishesPrintedit,{classifyid:this.positionid,code:this.Serial,name:this.Jobtitle}).then(data=>{
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
                    this.$post(this.$api.printPrintdel,{classifyid:row.classifyid}).then(data=>{
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
                this.Serial='';
                this.Jobtitle='';
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
    .print .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .print{
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
    }
</style>