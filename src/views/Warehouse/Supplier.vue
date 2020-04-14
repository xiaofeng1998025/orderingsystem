<template>
    <div class="Supplier">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">供应商新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            prop="name"
                            label="供应商名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="legalperson"
                            label="负责人"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="contact"
                            label="联系人"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="联系电话"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="fax"
                            label="传真"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="供应商地址"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="mainproducts"
                            label="主营产品"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="brief"
                            label="供应商简介"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="empname"
                            label="操作员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="intime"
                            label="录入时间"
                            width="160">
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            prop="statusname"-->
<!--                            label="状态"-->
<!--                            width="">-->
<!--                    </el-table-column>-->
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="160">
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
                            <p>供应商名称：</p>
                            <el-input v-model="name" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>法人/负责人：</p>
                            <el-input v-model="legalperson" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>联系人：</p>
                            <el-input v-model="contact" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>联系电话：</p>
                            <el-input v-model="phone" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>传真：</p>
                            <el-input v-model="fax" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>供应商地址：</p>
                            <el-input v-model="address" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>主营产品：</p>
                            <el-input v-model="mainproducts" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>供应商简介：</p>
                            <el-input v-model="brief" placeholder="请输入内容" clearable></el-input>
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
        name: "Supplier",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改

                name:'',    //供应商名称
                legalperson:'',   //法人/负责人
                contact:'',          //联系人
                phone:'',           //联系电话
                fax:'',              //传真
                address:'',           //供应商地址
                brief:'',             //供应商简介
                mainproducts:'',          //主营产品
                supplierid:'',           //id
            }
        },
        methods:{
            // 初始化
            initList(){
                this.name="";
                this.legalperson="";
                this.contact="";
                this.phone="";
                this.fax="";
                this.address="";
                this.brief="";
                this.mainproducts="";
                this.supplierid="";
                // 供应商列表
                this.$post(this.$api.suppliersList,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('供应商列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            init(){
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
                this.name=row.name;
                this.legalperson=row.legalperson;
                this.contact=row.contact;
                this.phone=row.phone;
                this.fax=row.fax;
                this.address=row.address;
                this.brief=row.brief;
                this.mainproducts=row.mainproducts;
                this.supplierid=row.supplierid;
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    let data={
                        name:this.name,
                        legalperson:this.legalperson,
                        contact:this.contact,
                        phone:this.phone,
                        fax:this.fax,
                        address:this.address,
                        brief:this.brief,
                        mainproducts:this.mainproducts,
                    };
                    this.$post(this.$api.suppliersAdd,data).then(data=>{
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
                            name:this.name,
                            legalperson:this.legalperson,
                            contact:this.contact,
                            phone:this.phone,
                            fax:this.fax,
                            address:this.address,
                            brief:this.brief,
                            mainproducts:this.mainproducts,
                            supplierid:this.supplierid
                        };
                    console.log(data);
                    this.$post(this.$api.suppliersEdit,data).then(data=>{
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
                    this.$post(this.$api.suppliersdel,{supplierid:row.supplierid}).then(data=>{
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
                this.name="";
                this.legalperson="";
                this.contact="";
                this.phone="";
                this.fax="";
                this.address="";
                this.brief="";
                this.mainproducts="";
                this.supplierid="";
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
    .Supplier .el-dialog{
        width: 30%;
    }

</style>
<style scoped lang="scss">
    .Supplier{
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