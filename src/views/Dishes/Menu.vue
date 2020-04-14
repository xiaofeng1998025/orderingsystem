<template>
    <div class="Menu">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
                <el-breadcrumb-item>标准菜谱</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div class="Position_top_title">
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">菜谱新增</el-button>
            </div>
            <div class="search">
                <el-cascader v-model="cxcpfl2"  :options="cpflArr" clearable   placeholder="请选择菜品分类"></el-cascader>
<!--                <el-input placeholder="请输入菜品名称" v-model="cxname" clearable></el-input>-->
                <el-button type="primary" size="mini" @click="onInquirecx">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="pageid"
                            label="序列号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="sequence"
                            label="显示顺序"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="classfyname"
                            label="菜品类别"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="pagemouldname"
                            label="页面模板"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="页面菜品"
                            width="500">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="状态"
                            width="150">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status=='0'?true:false"
                                    active-text="关"
                                    inactive-text="开" @change="onswitchType(scope.row)" :class="[scope.row.status=='0'?'el-switch-right-block':'el-switch-left-block']">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
<!--                            <el-button type="primary" @click="handleClick(scope.row)"  size="small">修改</el-button>-->
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
                        <div  class="search Thepopup_top">
                            <el-select v-model="xzmob" clearable  placeholder="请选择模板">
                                <el-option
                                        v-for="item in xzmobArr"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input placeholder="请输入顺序" v-model="sequence" clearable></el-input>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="ondetermine">确 定</el-button>
                            </div>
                        </div>
                        <div class="search">
                            <el-cascader v-model="cxcpfl"  :options="cpflArr" clearable   placeholder="请选择菜品分类"></el-cascader>
<!--                            <el-input placeholder="请输入菜品名称" v-model="cxname" clearable></el-input>-->
                            <el-button type="primary" size="mini" @click="onInquire">查询</el-button>

<!--                            <el-input placeholder="请输入菜品名称" v-model="cxname" clearable></el-input>-->

                        </div>
                        <div class="Thepopup_table">
                            <el-table
                                    ref="multipleTable"
                                    :data="tableDataArr"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="0">
                                </el-table-column>
                                <el-table-column
                                        prop="classfyname"
                                        label="菜品分类"
                                        width="">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="菜品名称"
                                        width="">
                                </el-table-column>
                                <el-table-column
                                        prop="specs"
                                        label="规格"
                                        width="">
                                </el-table-column>
                                <el-table-column
                                        prop="price"
                                        label="价格"
                                        width="">
                                </el-table-column>
                            </el-table>
                        </div>

                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data(){
            return{
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                tableDataArr:[],   //菜品列表
                multipleSelection:[],   //勾选表格
                cpflArr:[],        //菜品分类下拉
                cxcpfl:'',         //菜品分类id
                cxcpfl2:'',         //搜索菜品分类id
                cxname:'',         //菜品名称
                xzmob:'',          //选择模板添加
                xzmobArr:[
                    {
                        value:1,
                        label:'一个菜'
                    },
                    {
                        value:2,
                        label:'两个菜'
                    },
                    {
                        value:3,
                        label:'三个菜'
                    },
                    {
                        value:4,
                        label:'四个菜'
                    },
                    {
                        value:6,
                        label:'六个菜'
                    },
                    {
                        value:14,
                        label:'列表模板'
                    }
                ],  //选择模板添加列表
                sequence:'',        //输入顺序
                disheidstr:[],    //勾选的菜品


            }
        },
        methods:{
            //初始化列表
            initList(){
                let cxcpfl2='';
                if(this.cxcpfl2.length==2){
                    cxcpfl2=this.cxcpfl2[1]
                }else if(this.cxcpfl2.length==1){
                    cxcpfl2=this.cxcpfl2[0]
                }
                const  data={
                    page:this.Jopage,
                    size:this.Josize,
                    dishesid:cxcpfl2
                };
                this.$post(this.$api.dishespagelist,data).then(data=>{
                    console.log('菜谱列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){
                // 菜品分类下拉
                this.$post(this.$api.selectdishesclassfy).then(data=>{
                    console.log('菜品分类下拉',data);
                    this.cpflArr=data.data
                });
            },
            // 弹出框勾选
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
                let disheidstr=[];
                val.forEach(item=>{
                    disheidstr.push(item.disheid)
                });
                this.disheidstr=disheidstr;
                console.log(this.disheidstr)
            },
            // 点击弹框菜品分类查询
            onInquire(){
                let cxcpfl='';
                if(this.cxcpfl.length==2){
                    cxcpfl=this.cxcpfl[1]
                }else if(this.cxcpfl.length==1){
                    cxcpfl=this.cxcpfl[0]
                }
               this.$post(this.$api.disheslist,{
                    classifyid:cxcpfl,
                   // name:this.cxname,
                    page:1,
                    size:1000
                }).then(data=>{
                    console.log('菜品列表',data);
                    if(data.code==0){
                        this.tableDataArr=data.data;
                        return false
                    }
                });
            },
            // 点击菜品新增
            onnew(){
                this.type='new';
                this.Modifythe=true;
            },
            // 点击修改
            async  handleClick(row){
                this.type='edit';
                this.Modifythe=true;
                this.xzmob=Number(row.pagemould);
                this.sequence=row.sequence;
                this.cpflArr.forEach(item=>{
                    if(item.value==row.dishesid){
                        this.cxcpfl=[row.dishesid];
                        return false
                    }else{
                        if(item.children){
                            item.children.forEach(item2=>{
                               if(item2.value==row.dishesid){
                                   this.cxcpfl=[item.value,row.dishesid];
                               }
                                return false
                            })
                        }
                    }
                });
                let cxcpfl='';
                if(this.cxcpfl.length==2){
                    cxcpfl=this.cxcpfl[1]
                }else if(this.cxcpfl.length==1){
                    cxcpfl=this.cxcpfl[0]
                }
                await this.$post(this.$api.disheslist,{
                    classifyid:cxcpfl,
                    page:1,
                    size:1000
                }).then(data=>{
                    console.log('菜品列表',data);
                    if(data.code==0){
                        this.tableDataArr=data.data;
                        return false
                    }
                });
                let that=this;
                this.disheidstr=row.disheid.split(',').map(Number);
                await this.disheidstr.forEach(item=>{
                    that.tableDataArr.forEach(item2=>{
                        if(item==item2.disheid){
                             console.log(item2)
                            that.$refs.multipleTable.toggleRowSelection(item2);
                            return false
                        }
                    })
                })


            },
            // 弹出层点击确定
            ondetermine(){
                let cxcpfl='';
                if(this.cxcpfl.length==2){
                    cxcpfl=this.cxcpfl[1]
                }else if(this.cxcpfl.length==1){
                    cxcpfl=this.cxcpfl[0]
                }
                const that=this;
                //新增
                if(this.type=='new'){
                    let dishespageadd=()=>{
                        this.$post(this.$api.dishespageadd,{
                            dishesid:cxcpfl,
                            sequence:this.sequence,
                            pagemould:this.xzmob,
                            disheidstr:this.disheidstr.join(',')
                        }).then(data=>{
                            if (data.code==0){
                                that.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                that.Modifythe=false;
                                this.initList();
                            }
                        });
                    };
                    if(this.xzmob==this.disheidstr.length){
                        dishespageadd();
                    }else if(this.xzmob==14){
                        dishespageadd();
                    }else{
                        this.$message.error('选择的菜品不相等');
                    }
                }
                // 修改
                if(this.type=='edit'){
                    let data={

                    }
                }
            },
            // 点击删除
            ondelete(row){
                this.$confirm(' 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.dishespagedel,{pageid:row.pageid}).then(data=>{
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
            //状态切换 区域开关
            onswitchType(arr){
                console.log(arr);
                let status='';
                if(arr.status==0){
                    status=1;
                }else{
                    status=0;
                }
                this.$post(this.$api.dishespagechangestatus,{pageid:arr.pageid,status:status}).then(data=>{
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
            // 条件查询
            onInquirecx(){
              this.initList();
            },
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.cxcpfl='';
                this.sequence='';
                this.xzmob='';
                this.disheidstr=[];
                this.multipleSelection=[];
                this.tableDataArr=[];
            },
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList();
            }
        },
        mounted() {
            this.init();
            this.initList();
        }

    }
</script>

<style lang="scss">
    .Menu .el-dialog{
        width: 40%;
    }
    .el-image-viewer__wrapper{
        z-index: 10!important;
    }
    .Position_cont_table{
        .el-table__fixed-right{
            /*position: relative;*/
            z-index: 1;
        }
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
    .Menu{
        padding: 20px 40px;
        .Position_top_title{
            margin-top: 30px;
        }
        .cont{
            .cont_btn{
                margin-top: 30px;
            }
        }
        .Position_cont_table{
            margin-top: 30px;
        }
        .tanc_cont{
            ul{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                >li{
                    width: 48%;
                    margin-top: 10px;
                    >p{
                        margin-bottom: 5px;
                    }
                    .el-select{
                        width: 100%;
                    }

                }

                .zdxx,.zhuzt,.cptp{
                    width: 100%;
                }
                .el-cascader{
                    width: 100%;
                }
                li:nth-child(1),li:nth-child(2){
                    margin-top: 0;
                }
            }
        }
        .search{
            display: flex;
            margin-top: 20px;
            .el-input{
                width: 250px;
                margin-left: 20px;
            }
            .el-button{
                margin-left: 20px;
            }
            .el-cascader,.el-select{
                width: 200px;
                margin-right: 20px;
            }
        }
        .Thepopup_top{
            margin-top: 0;
            position: -webkit-sticky; /* Safari */
            position: sticky;
            top: 0;
        }
        .dialog-footer{
            margin-left: auto;
        }
        .Thepopup_table{
            margin-top: 20px;
        }
    }
</style>