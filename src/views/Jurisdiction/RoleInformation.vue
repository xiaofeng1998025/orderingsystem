<template>
    <div class="RoleInformation">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">角色新增</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 803px;box-sizing: border-box"

                >
                    <el-table-column
                            prop="name"
                            label="名称"
                            width="200"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="描述"
                            width="300"
                    >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="handleClick(scope.row)"  size="small">修改</el-button>
                            <el-button type="primary" @click="ondelete(scope.row)" size="small">删除</el-button>
                            <el-button type="primary" @click="Onquanx(scope.row)" size="small">权限</el-button>
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
                            <p>名称：</p>
                            <el-input v-model="name" placeholder="请输入名称" clearable></el-input>
                        </li>
                        <li>
                            <p>描述：</p>
                            <el-input v-model="describe" placeholder="请输入描述" clearable></el-input>
                        </li>
                    </ul>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="Modifythe = false">取 消</el-button>
                    <el-button type="primary" @click="ondetermine">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!--        权限-->
        <div class="Thepopup_qx">
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe_qx"  @close="shutDown1">
                <div>
                    <el-tree
                            :data="listArr"
                            show-checkbox
                            node-key="id"
                            :default-checked-keys="kewy"
                            :default-expanded-keys="[1]"
                            :props="defaultProps"
                            accordion
                            ref="tree"
                            >
                    </el-tree>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="Modifythe_qx = false">取 消</el-button>
                    <el-button type="primary" @click="ondete">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RoleInformation",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                name:'',        //名称
                describe:'',       //描述
                roleid:'',      //id
                // 权限
                Modifythe_qx:false,    //t弹出层开关
                listArr:[],             //权限列表
                defaultProps:{
                    children: 'children',
                    label: 'label'
                },
                kewy:[],                 //默认选中
            }
        },
        methods:{
            // 初始化
            init(){
                this.Modifythe=false;
                this.name='';
                this.describe='';
                // 角色列表
                this.$post(this.$api.rolesList,{
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('角色列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                });

            },
            // 新增
            onnew(){
                this.Modifythe=true;
                this.type='new'
            },
            // 修改
            handleClick(row) {
                this.Modifythe=true;
                this.name=row.name;
                this.describe=row.description;
                this.roleid=row.roleid;
                this.type='edit'
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.rolesAdd,{
                        name:this.name,
                        description:this.describe,
                    }).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.init()
                        }
                    })
                }else if(this.type=='edit'){
                    // 修改
                    this.$post(this.$api.rolesEdit,{
                        name:this.name,
                        description:this.describe,
                        roleid:this.roleid
                    }).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
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
                    this.$post(this.$api.rolesDel,{roleid:row.roleid}).then(data=>{
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
            // 权限
            Onquanx(row){
                this.Modifythe_qx=true;
                this.roleid=row.roleid;
                this.$post(this.$api.showrolemenu,{roleid:row.roleid}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.listArr=data.data.menu;
                        this.kewy=data.data.list;
                    }
                })
            },

            // 权限确定
            ondete(){
                let menuidstr=[...this.$refs.tree.getHalfCheckedKeys(),...this.$refs.tree.getCheckedKeys()];
                console.log(menuidstr.join(','));
                this.$post(this.$api.updaterolemenu,{menuidstr:menuidstr.join(','),roleid:this.roleid}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '设置成功!'
                        });
                        this.Modifythe_qx=false;
                    }
                })

            },
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.Modifythe=false;
                this.name='';
                this.describe='';
            },
            shutDown1(){
                //清空表单值
                this.Modifythe_qx=false;
                this.listArr=[];
                this.kewy=[];
                // this.name='';
                // this.describe='';
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
    .RoleInformation .el-dialog{
        width: 20%;
    }
</style>
<style scoped lang="scss">
    .RoleInformation{
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
                    margin-top: 15px;
                    .el-select{
                        width: 100%;
                    }
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