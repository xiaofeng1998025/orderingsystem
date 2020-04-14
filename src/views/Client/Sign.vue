<template>
    <div class="Sign">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>签单客户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <!--            <div>-->
            <!--                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">客户新增</el-button>-->
            <!--            </div>-->
            <div class="search">
                <el-input placeholder="请输入店铺名称" v-model="cxstorename" clearable></el-input>
                <el-input placeholder="请输入客户名称" v-model="cxname" clearable></el-input>
                <el-input placeholder="请输入手机号" v-model="cxphone" clearable></el-input>
                <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="storename"
                            label="店铺名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="客户姓名"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="cusphone"
                            label="手机"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="担保人及电话"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="daymoney"
                            label="日签单限额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="monthmoney"
                            label="月签单限额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="oktime"
                            label="生效时间"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="empname"
                            label="业务员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp1name"
                            label="操作员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp2name"
                            label="审核员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="attachratio"
                            label="状态"
                            width="">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status=='0'">正常</div>
                            <div v-else-if="scope.row.status=='2'">删除</div>
                            <div v-else>未审核</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="210">
                        <template slot-scope="scope">
                            <el-button  :disabled="scope.row.status!='1'" type="primary" @click="handleClick(scope.row)"  size="small">修改</el-button>
                            <el-button  :disabled="scope.row.status!='1'" type="primary" @click="onReview(scope.row)"  size="small">审核</el-button>
                            <el-button  :disabled="scope.row.status!='1'" type="primary" @click="ondelete(scope.row)" size="small">删除</el-button>
<!--                            <el-button   type="primary" @click="ondelete(scope.row)" size="small">签单记录</el-button>-->
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
                            <p>担保人：</p>
                            <el-input v-model="sponsor" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>担保人电话：</p>
                            <el-input v-model="phone" placeholder="请输入内容" maxlength="11" clearable></el-input>
                        </li>
                        <li>
                            <p>日签单限额：</p>
                            <el-input v-model="daymoney" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>月签单限额：</p>
                            <el-input v-model="monthmoney" placeholder="请输入内容"  clearable></el-input>
                        </li>
                        <li>
                            <p>业务员：</p>
                            <el-select v-model="employeeid"  clearable placeholder="请选择">
                                <el-option
                                        v-for="item in employeeidArr"
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
        name: "Sign",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改

                cxstorename:'',  //查询店铺名称
                cxname:'',  //查询客户名称
                cxphone:'',  //查询手机号

                //修改
                employeeid:'',  //业务员
                employeeidArr:[],  //业务员列表
                sponsor:'',      //担保人
                phone:'',        //担保人电话
                daymoney:'',       //日签单限额
                monthmoney:'',       //月签单限额


                signid:'',          //id
            }
        },
        methods:{
            // 初始化列表
            initList(){
                this.sponsor='';
                this.phone='';
                this.daymoney='';
                this.monthmoney='';
                this.employeeid='';
                this.signid='';
                // 签单列表
                this.$post(this.$api.customersListsign,{
                    storename:this.cxstorename,
                    name:this.cxname,
                    phone:this.cxphone,
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('签单列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){
                // 业务员
                this.$post(this.$api.selectemp).then(data=>{
                    this.employeeidArr=data.data;
                    console.log('业务员',data);
                })
            },
            // 修改
            handleClick(row) {
                this.Modifythe=true;
                this.type='edit';
                this.sponsor=row.sponsor;
                this.phone=row.phone;
                this.daymoney=row.daymoney;
                this.monthmoney=row.monthmoney;
                this.employeeid=row.employeeid;
                this.signid=row.signid;
            },
            // 确定
            ondetermine(){
                    if(this.type=='edit') {
                        let data={
                            signid:this.signid,
                            sponsor:this.sponsor,
                            phone:this.phone,
                            daymoney:this.daymoney,
                            monthmoney:this.monthmoney,
                            employeeid:this.employeeid
                        }
                        // 修改
                        this.$post(this.$api.customersEditsign,data).then(data => {
                            if (data.code == 0) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });

                                this.Modifythe = false;
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
                    this.$post(this.$api.customersDelsign,{signid:row.signid}).then(data=>{
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
            //审核
            onReview(row){
                this.$confirm('是否确定成为签单用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.customersAuthsign,{signid:row.signid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '审核成功!'
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
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList();
            },
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.sponsor='';
                this.phone='';
                this.daymoney='';
                this.monthmoney='';
                this.employeeid='';
                this.signid='';
            },
            //点击查询
            onInquire(){
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
    .Sign .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .Sign{
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
        .search{
            display: flex;
            margin-top: 30px;
            .el-input{
                width: 200px;
                margin-right: 20px;
            }
            .el-button{
                margin-left: 20px;
            }
        }
    }
</style>