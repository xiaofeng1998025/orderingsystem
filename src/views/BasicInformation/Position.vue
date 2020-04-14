<template>
    <div class="Position">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                <el-breadcrumb-item>职位信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">职位新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 725px">
                    <el-table-column
                            fixed
                            prop="positionno"
                            label="职位编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="职位名称"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="300">
                        <template slot-scope="scope">

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
                            <p>职位编号：</p>
                            <el-input v-model="Serial" placeholder="请输入编号" clearable></el-input>
                        </li>
                        <li>
                            <p>职位名称：</p>
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
        name: "Position",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Serial:'',        //职位编号
                Jobtitle:'',       //职位名称
                Jopage:1,    //职位分页
                Josize:10,   //职位条数
                total:0,    //分页总条数
                positionid:'',   //职位id
                type:'new'   //new新增  edit修改
            }
        },
        methods:{
            // 初始化
            init(){
                // 职位列表
               this.$post(this.$api.list,{
                   page:this.Jopage,
                   size:this.Josize
               }).then(data=>{
                   console.log('职位列表',data);
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
                this.Serial=row.positionno;
                this.Jobtitle=row.name;
                this.positionid=row.positionid;
                this.type='edit'
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //添加
                    this.$post(this.$api.add,{
                        positionno:this.Serial,
                        name:this.Jobtitle,
                    }).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.Serial='';
                            this.Jobtitle='';
                            this.init()
                        }
                    })
                }else if(this.type=='edit'){
                    //修改
                    this.$post(this.$api.edit,{positionid:this.positionid,positionno:this.Serial,name:this.Jobtitle}).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.Serial='';
                            this.Jobtitle='';
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
                       this.$post(this.$api.del,{positionid:row.positionid}).then(data=>{
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
    .Position .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .Position{
        padding: 20px 40px;
    }
    .Position_top{

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
                >p{
                    margin-bottom: 10px;
                }
            }
            li:nth-child(2){
                margin-top: 20px;
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