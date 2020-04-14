<template>
    <div class="ProductionMethod">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜品制作方法</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">菜品制作方式新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="methodid"
                            label="序列号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="classfyname"
                            label="菜品分类名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="制作方式名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="attachmoney"
                            label="附加收费金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="attachratio"
                            label="附加收费比例"
                            width="">
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
                            <p>菜品分类名称：</p>
                            <el-select v-model="principal" @change="onprincipal" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in principalArr"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>制作方式名称：</p>
                            <el-input v-model="Jobtitle" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>附加收费金额：</p>
                            <el-input v-model="Amount" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>附加收费比例：</p>
                            <el-input v-model="proportion" placeholder="请输入内容" clearable></el-input>
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
        name: "ProductionMethod",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                principal:'',        //下拉分类
                principalArr:[],     //下拉分类列表
                principalId:'',   //下拉分类id
                Jobtitle:'',       //名称
                Amount:'',     //金额
                proportion:'',   //比例
                methodid:'',   //id
            }
        },
        methods:{
            // 初始化列表
            initList(){
                this.Jobtitle='';
                this.Amount='';
                this.proportion='';
                this.principalId='';
                this.methodid='';
                this.principal='';
                // 制作方式列表
                this.$post(this.$api.methodslist,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('制作方式列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){
                // 分类下拉
                this.$post(this.$api.selectdishesclassfy,{}).then(data=>{
                    this.principalArr=data.data;
                    console.log('分类下拉',data);
                })
            },
            // 分类选择
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
                this.Jobtitle=row.name;
                this.Amount=row.attachmoney;
                this.proportion=row.attachratio;
                this.principalId=row.dishesid;
                this.methodid=row.methodid;
                this.principal=row.classfyname;
                this.type='edit'
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.methodsadd,{
                        name:this.Jobtitle,
                        attachmoney:this.Amount,
                        attachratio:this.proportion,
                        dishesid:this.principalId
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
                    this.$post(this.$api.methodsedit,{attachmoney:this.Amount,attachratio:this.proportion,methodid:this.methodid,dishesid:this.principalId,name:this.Jobtitle}).then(data=>{
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
                    this.$post(this.$api.departmentsDel,{departmentid:row.departmentid}).then(data=>{
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
                this.Jobtitle='';
                this.Amount='';
                this.proportion='';
                this.principalId='';
                this.methodid='';
                this.principal='';
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
    .ProductionMethod .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .ProductionMethod{
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