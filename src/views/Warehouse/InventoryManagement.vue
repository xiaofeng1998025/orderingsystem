<template>
    <div class="InventoryManagement">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>库存管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
<!--            <div>-->
<!--                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">新增采购入库</el-button>-->
<!--            </div>-->
            <div class="search">
                <el-select v-model="ckxl"  clearable placeholder="库房选择">
                    <el-option
                            v-for="item in ckxlArr"
                            :key="item.warehouseid"
                            :label="item.name"
                            :value="item.warehouseid">
                    </el-option>
                </el-select>
                <el-cascader v-model="yuanlxl" :options="yuanlxlArr"  placeholder="类别选择"></el-cascader>
                <el-input placeholder="请输入原料名称或编号" v-model="cxdjbh" clearable></el-input>
                <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            prop="warehousename"
                            label="库房"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="classfyname"
                            label="原料分类"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="原料编号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="原料名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="specs"
                            label="原料规格"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="unit"
                            label="基本单位"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="maxstock"
                            label="库存上限"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="minstock"
                            label="库存下限"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="ycstock"
                            label="月初库存"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="现有库存"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="销售价格"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="lasttime"
                            label="最近编辑时间"
                            width="160">
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
    </div>
</template>

<script>
    export default {
        name: "InventoryManagement",
        data(){
            return{
                //入库单
                tableData: [],   //入库单列表
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                //查询
                cxdjbh:'',    //查询名称或编号
                ckxl:'',         //仓库下拉
                ckxlArr:[],      //仓库下拉
                yuanlxl:'',    //原料
                yuanlxlArr:[],    //原料下拉

            }
        },
        methods:{
            // 初始化列表
            initList(){
                let data={
                    page:this.Jopage,
                    size:this.Josize,
                    classifyid:this.yuanlxl[1],
                    nameorcode:this.cxdjbh,
                    warehouseid:this.ckxl
                };
                console.log(data);
                this.$post(this.$api.goodstocklist,data).then(data=>{
                    console.log('库存列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){
                //仓库下拉
                this.$post(this.$api.selectwarehouse).then(data=>{
                    this.ckxlArr=data.data;
                    console.log('仓库下拉',data)
                });
                // 原料下拉
                this.$post(this.$api.selecmaterialclassifys2).then(data=>{
                    this.yuanlxlArr=data.data;
                    console.log('原料下拉',data)
                });

            },
            // 点击查询
            onInquire(){
                //console.log(this.cxtime);
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
    .InventoryManagement{

    }
</style>
<style scoped lang="scss">
    .InventoryManagement{
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
        .Thepopupmx{
            >div{
                li{
                    width: 100%;
                }
                li:nth-child(2){
                    margin-top:20px;
                }
            }
            .Thepopupmx_top{
                display: flex;
                align-items: center;
                >div{
                    margin-left: auto;
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
        .el-cascader{
            width: 100%;
        }
        .el-date-editor{
            width: 100%;
        }
        .search{
            display: flex;
            margin-top: 30px;
            .el-input{
                width: 200px;
                margin-left: 20px;
            }
            .el-button{
                margin-left: 20px;
            }
            .el-cascader{
                width: 200px;
                margin-left: 20px;
            }
            .el-date-editor{
                width: 300px;
            }
            .el-select{
                width: 200px;
                margin-left: 20px;
                /*margin-right: 20px;*/
            }
        }
    }
</style>