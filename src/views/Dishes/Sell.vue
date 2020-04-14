<template>
    <div class="Sell">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜品沽清</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
           <div class="search">
                    <el-cascader v-model="cxcpfl"  :options="cpflArr" clearable   placeholder="请选择菜品分类"></el-cascader>
                    <el-input placeholder="请输入菜品名称" v-model="cxname" clearable></el-input>
                    <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="classfyname"
                            label="菜品分类"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="isgoods"
                            label="菜品/原料"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="菜品编号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="菜品名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="printclassfyname"
                            label="菜品图片"
                            width="125">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 100px; height: 60px"
                                    :src="scope.row.pic"
                                    lazy
                                    :preview-src-list="[scope.row.pic]"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="words"
                            label="文字介绍"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="specs"
                            label="规格"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="unit"
                            label="单位"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="printclassfyname"
                            label="限量标识"
                            width="">
                        <template slot-scope="scope">
                            {{scope.row.flag_amoun==0?'不限量':'限量'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="总量"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="memo"
                            label="备注"
                            width="">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="沽清（否/是）"
                            width="">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.flag_guqing=='1'?true:false"
                                    active-text="关"
                                    inactive-text="开" @change="onswitchType(scope.row)" :class="[scope.row.flag_guqing=='1'?'el-switch-right-block':'el-switch-left-block']">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="125">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="handleClick(scope.row)"  size="small">设置限量沽清</el-button>
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
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe">
                <div>
                    <ul>

                        <li>
                            <p>是否限量：</p>
                            <el-select v-model="xianl"  clearable placeholder="请选择">
                                <el-option
                                        v-for="item in xianlArr"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li v-if="xianl==1">
                            <p>总量：</p>
                            <el-input v-model="amount" placeholder="请输入限量总量" clearable></el-input>
                        </li>
                        <li>
                            <p>备注信息：</p>
                            <el-input v-model="memo" placeholder="请输入备注" clearable></el-input>
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
        name: "Sell",
        data(){
            return {
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                name:'',       //查询菜品名称
                classifyid:'',   //菜品分类id
                xianl:0,        //限量
                xianlArr:[
                    {
                    id:0,
                    label:'不限量'
                    },{
                        id:1,
                        label:'限量'
                    }
                ],  //限量下拉列表
                amount:'',    //总量
                memo:'',     //备注信息
                disheid:'',    //id
                cxcpfl:[],   //菜品分类
                cpflArr:[],   //菜品分类列表
                cxname:'',     //查询菜品名称
            }
        },
        methods:{
            // 初始化列表
            initList(){
                let cxcpfl='';
                if(this.cxcpfl.length==2){
                    cxcpfl=this.cxcpfl[1]
                }else if(this.cxcpfl.length==1){
                    cxcpfl=this.cxcpfl[0]
                }
                // 菜品沽清列表
                this.$post(this.$api.dishesguqinglist,{
                    name:this.cxname,
                    classifyid:cxcpfl,
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('菜品沽清列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                });
            },
            init(){
                // 菜品分类下拉
                this.$post(this.$api.selectdishesclassfy).then(data=>{
                    console.log('菜品分类下拉',data);
                    this.cpflArr=data.data
                });
            },
            //状态切换 沽清
            onswitchType(arr){
                console.log(arr);
                let flag_guqing='';
                if(arr.flag_guqing==0){
                    flag_guqing=1;
                }else{
                    flag_guqing=0;
                }
                this.$post(this.$api.dishesguqing,{disheid:arr.disheid,flag_guqing:flag_guqing}).then(data=>{
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
            // 点击设置限量
            handleClick(row){
              this.Modifythe=true;
              this.disheid=row.disheid;
            },
            // 弹出框确定
            ondetermine(){
                this.$post(this.$api.dishesamountguqing,{
                    disheid:this.disheid,
                    flag_amoun:this.xianl,
                    amount:this.amount,
                    memo:this.memo
                }).then(data=>{
                    if(data.code==0){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.Modifythe=false;
                        this.initList();
                    }
                })
            },
            // 点击查询
            onInquire(){
                this.initList();
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
    .Sell .el-dialog{
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
    .Sell{
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
                width: 250px;
                margin-left: 20px;
            }
            .el-button{
                margin-left: 20px;
            }
            .el-cascader,.el-select{
                width: 150px;

            }
        }

    }
</style>