<template>
    <div class="Ckunit">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>仓库单位</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">仓库单位新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 805px">
                    <el-table-column
                            prop="flagname"
                            label="类型"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="内容"
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
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe" @close="shutDown">
                <div>
                    <ul>
                        <li>
                            <p>类型：</p>
                            <el-select v-model="flag" @change="onflag"  placeholder="请选择" disabled>
                                <el-option
                                        v-for="item in flagArr"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>内容：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入内容" clearable></el-input>
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
        name: "Ckunit",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改

                attachid:'',   //id
                Jobtitle:'',       //名称
                flag:'',     //原因
                flagArr:[
                    {
                        id:0,
                        name:'仓库单位',
                    },

                ],
                flagID:'',
            }
        },
        methods:{
            // 初始化
            init(){
                this.flagID=0;
                this.flag='仓库单位';
                this.Jobtitle='';
                // 仓库单位列表
                this.$post(this.$api.attachsList0,{
                    page:this.Jopage,
                    type:'0',
                    size:this.Josize
                }).then(data=>{
                    console.log('仓库单位列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 原因选择
            onflag(value){
                this.flagID=value;
            },
            // 新增
            onnew(){
                this.Modifythe=true;
                this.type='new'
            },
            // 修改
            handleClick(row) {
                this.Modifythe=true;
                this.flag=row.flagname;
                this.flagID=row.flag;
                this.Jobtitle=row.name;
                this.attachid=row.attachid;
                this.type='edit'
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.attachsAdd0,{
                        flag:this.flagID,
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
                    this.$post(this.$api.attachsEdit0,{attachid:this.attachid,flag:this.flagID,name:this.Jobtitle}).then(data=>{
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
                    this.$post(this.$api.attachsDel0,{attachid:row.attachid}).then(data=>{
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
                this.flagID=0;
                this.flag='仓库单位';
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
    .Ckunit .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .Ckunit{
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