<template>
    <div class="Ylgl">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>原料管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">原料新增</el-button>
            </div>
            <div class="search">
                <el-cascader v-model="cxprincipal"  :options="cxprincipalArr" clearable  @change="oncxprincipal"  placeholder="请选择原料分类"></el-cascader>
                <el-input placeholder="请输入原料名称" v-model="proportion" clearable></el-input>
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
                            prop="price"
                            label="销售价格"
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
                            <p>原料分类：</p>
                            <el-cascader v-model="principal"  :options="principalArr"  @change="onprincipal"></el-cascader>
                        </li>
                        <li>
                            <p>原料编号：</p>
                            <el-input v-model="code" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>原料名称：</p>
                            <el-input v-model="name" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>原料规格：</p>
                            <el-input v-model="specs" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>基本单位：</p>
                            <el-select v-model="CKunit" @change="onCKunit" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in CKunitArr"
                                        :key="item.attachid"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>销售价格：</p>
                            <el-input v-model="price" placeholder="请输入内容" clearable></el-input>
                        </li>
    <!--                        <li>-->
    <!--                            <p>辅助单位：</p>-->
    <!--                            <el-select v-model="CKunit2" @change="onCKunit2" clearable placeholder="请选择">-->
    <!--                                <el-option-->
    <!--                                        v-for="item in CKunitArr2"-->
    <!--                                        :key="item.attachid"-->
    <!--                                        :label="item.name"-->
    <!--                                        :value="item.attachid">-->
    <!--                                </el-option>-->
    <!--                            </el-select>-->
    <!--                        </li>-->
    <!--                        <li>-->
    <!--                            <p>单位比例：</p>-->
    <!--                            <el-input v-model="ratio" placeholder="请输入内容" clearable></el-input>-->
    <!--                        </li>-->
                        <li>
                            <p>库存上限：</p>
                            <el-input v-model="maxstock" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>库存下限：</p>
                            <el-input v-model="minstock" placeholder="请输入内容" clearable></el-input>
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
        name: "Ylgl",
        data(){
            return {
                tableData: [],
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改
                proportion:'',        //查询原料名称
                cxprincipal:'',        //下拉分类  (查询)
                cxprincipalArr:[],     //下拉分类列表 (查询)
                cxprincipalId:'',   //下拉分类id (查询)

                principal:'',        //下拉分类
                principalArr:[],     //下拉分类列表
                principalId:'',   //下拉分类id

                CKunit:'',        //下拉仓库单位
                CKunitArr:'',        //下拉仓库单位 列表
                CKunitId:'',        //下拉仓库单位id

                CKunit2:'',        //辅助单位下拉仓库单位
                CKunitArr2:'',        //辅助单位下拉仓库单位 列表
                CKunitId2:'',        //辅助单位下拉仓库单位id
                code:'',       //编号
                name:'',       //名称
                specs:'',       //规格
                price:'',      //价格
                ratio:'',       //单位比例
                maxstock:'',   //库存上限
                minstock:'',    //库存下限

                goodsid:'',   //id
            }
        },
        methods:{
            // 初始化列表
            initList(){
                this.code='';
                this.name='';
                this.specs='';
                this.CKunit='';
                this.price='';
                this.CKunit2='';
                this.ratio='';
                this.maxstock='';
                this.minstock='';
                this.goodsid='';
                this.principal='';
                this.principalId='';
                this.CKunitId='';
                this.CKunitId2='';
                // 原料列表
                this.$post(this.$api.goodslist,{
                    page:this.Jopage,
                    size:this.Josize,
                    classifyid:this.cxprincipalId,
                    name:this.proportion
                }).then(data=>{
                    console.log('原料列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){
                // 分类下拉
                this.$post(this.$api.selecmaterialclassifys2).then(data=>{
                    this.principalArr=data.data;
                    this.cxprincipalArr=data.data;
                    console.log('分类下拉',data);
                });
                //仓库单位下拉
                this.$post(this.$api.selectattachs,{type:0}).then(data=>{
                    this.CKunitArr=data.data;
                    this.CKunitArr2=data.data;
                    console.log('仓库单位下拉',data);
                })
            },
            // 分类选择
            onprincipal(value){
                if(value.length==2){
                    this.principalId=value[1];
                }else{
                    this.principalId=value[0];
                }
                console.log(value);
            },
            // 分类选择 (查询)
            oncxprincipal(value){
                if(value.length==2){
                    this.cxprincipalId=value[1];
                }else{
                    this.cxprincipalId=value[0];
                }
                console.log(value);
            },
            // 单位下拉
            onCKunit(value){
                this.CKunitId=value;
                console.log(value);
            },
            // 辅助单位下拉
            onCKunit2(value){
                this.CKunitId2=value;
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
                this.type='edit';
                this.code=row.code;
                this.name=row.name;
                this.specs=row.specs;
                this.CKunit=row.unit;
                this.price=row.price;
                this.CKunit2=row.assistunit;
                this.ratio=row.ratio;
                this.maxstock=row.maxstock;
                this.minstock=row.minstock;
                this.goodsid=row.goodsid;
                let principalArr=this.principalArr;
                let that=this;
                console.log(row.unit)
                console.log(principalArr[0].value)
                for(let i=0;i<principalArr.length;i++){
                    if(principalArr[i].value==row.classifyid){
                        that.principal=[row.classifyid];
                        that.principalId=row.classifyid;
                        console.log(this.principal);
                        return false
                    }else{
                        for(let k=0;k<principalArr[i].children.length;k++){
                           console.log(principalArr[i].children[k].value,'-----------',row.classifyid)
                            if(principalArr[i].children[k].value==row.classifyid){
                                that.principal=[principalArr[i].value,row.classifyid];
                                that.principalId=row.classifyid;
                                console.log(this.principal);
                                return false
                            }
                        }
                    }
                }
            },
            // 添加确定
            ondetermine(){
                let that=this;
              
                let CKunit2='';
                this.CKunitArr2.forEach(item=>{
                    if(item.attachid==that.CKunitId2){
                        CKunit2=item.name
                    }
                });
                console.log(this.CKunitArr)
                console.log(this.CKunitId)
                if(this.type=='new'){
                    //新增
                    this.$post(this.$api.goodsadd,{
                        code:this.code,
                        name:this.name,
                        specs:this.specs,
                        unit:this.CKunit,
                        price:this.price,
                        assistunit:CKunit2,
                        ratio:this.ratio,
                        maxstock:this.maxstock,
                        minstock:this.minstock,
                        classifyid:this.principalId

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
                    this.$post(this.$api.goodsedit,{
                        code:this.code,
                        name:this.name,
                        specs:this.specs,
                        unit:this.CKunit,
                        price:this.price,
                        assistunit:CKunit2,
                        ratio:this.ratio,
                        maxstock:this.maxstock,
                        minstock:this.minstock,
                        classifyid:this.principalId,
                        goodsid:this.goodsid
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
                    this.$post(this.$api.goodsdel,{goodsid:row.goodsid}).then(data=>{
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
            // 点击分页
            onpage(value){
                this.Jopage=value;
                this.initList();
            },
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.code='';
                this.name='';
                this.specs='';
                this.CKunit='';
                this.price='';
                this.CKunit2='';
                this.ratio='';
                this.maxstock='';
                this.minstock='';
                this.goodsid='';
                this.principal='';
                this.principalId='';
                this.CKunitId='';
                this.CKunitId2='';
            },
            // 点击查询
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
    .Ylgl .el-dialog{
        width: 30%;
    }
</style>
<style scoped lang="scss">
    .Ylgl{
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
        .el-cascader{
            width: 100%;
        }
        .search{
            display: flex;
            margin-top: 30px;
            .el-input{
                width: 300px;
            }
            .el-button{
                margin-left: 20px;
            }
            .el-cascader{
                width: 200px;
                margin-right: 20px;
            }
        }
    }
</style>