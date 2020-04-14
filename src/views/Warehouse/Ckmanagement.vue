<template>
    <div class="Ckmanagement">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">仓库新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 1305px">
                    <el-table-column
                            prop="warehousecode"
                            label="仓库编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="仓库名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="empname"
                            label="管理员"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="memo"
                            label="备注"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="statusname"
                            label="状态"
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
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe"  @close="shutDown">
                <div>
                    <ul>
                        <li>
                            <p>仓库编号：</p>
                            <el-input v-model="Numbering" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>仓库名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>仓库管理员：</p>
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
                            <el-input v-model="Remark" placeholder="请输入内容" clearable></el-input>
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
        name: "Ckmanagement",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改

                warehouseid:'',   //id
                Numbering:'',   //编号
                Remark:'',     //备注
                Jobtitle:'',       //名称
                principal:'',     //责任人
                principalArr:[],   //责任人下拉
                principalID:'',    //责任人id
            }
        },
        methods:{
            // 初始化
            initList(){
                this.Numbering='';
                this.Jobtitle='';
                this.Remark='';
                this.principalID='';
                this.principal='';
                // 仓库单位列表
                this.$post(this.$api.warehouselist,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('仓库单位列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            init(){
                // 负责人下拉
                this.$post(this.$api.selectemp).then(data=>{
                    this.principalArr=data.data;
                    console.log('负责人下拉',data);
                })
            },
            // 原因选择
            onprincipal(value){
                this.principalID=value;
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
                this.warehouseid=row.warehouseid;
                this.Numbering=row.warehousecode;
                this.Jobtitle=row.name;
                this.Remark=row.memo;
                this.principalID=row.employeeid;
                this.principal=row.empname;
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.warehouseadd,{
                        warehousecode:this.Numbering,
                        name:this.Jobtitle,
                        memo:this.Remark,
                        employeeid:this.principalID
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
                    this.$post(this.$api.warehouseedit,{
                        warehouseid:this.warehouseid,
                        warehousecode:this.Numbering,
                        name:this.Jobtitle,
                        memo:this.Remark,
                        employeeid:this.principalID
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
                    this.$post(this.$api.warehousedel,{warehouseid:row.warehouseid}).then(data=>{
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
                this.Numbering='';
                this.Jobtitle='';
                this.Remark='';
                this.principalID='';
                this.principal='';
            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList()
            }
        },
        mounted() {
            this.initList();
            this.init()
        }
    }
</script>


<style lang="scss">
    .Ckmanagement .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .Ckmanagement{
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