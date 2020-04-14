<template>
    <div class="Damaged">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>库房报损管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div>
                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">新增报损单</el-button>
            </div>
            <div class="search">
                <el-date-picker v-model="cxtime" type="daterange" range-separator="至" start-placeholder="开始日期"  clearable end-placeholder="结束日期"></el-date-picker>
                <el-select v-model="cxshxx"  clearable placeholder="审核筛选">
                    <el-option
                            v-for="item in cxshxxArr"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            prop="code"
                            label="单据编号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="checkdate"
                            label="单据日期"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="originalcode"
                            label="原始凭证"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="totalmoney"
                            label="单据金额"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="warehousename"
                            label="库房"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp1name"
                            label="经办人"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp2name"
                            label="操作员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp3name"
                            label="审核人"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="memo"
                            label="备注"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="minstock"
                            label="状态"
                            width="">
                        <template slot-scope="scope" >
                            <div v-if="scope.row.status=='0'">录入</div>
                            <div v-else-if="scope.row.status=='1'">已审核</div>
                            <div v-else>取消</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="onckmx(scope.row)"  size="small">报损明细</el-button>
                            <el-button type="primary" @click="handleClick(scope.row)"  size="small">修改</el-button>
                            <el-button type="primary" @click="onshenh(scope.row)"  size="small">审核</el-button>
                            <el-button type="primary" @click="ondelete(scope.row)" size="small">取消</el-button>
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
        <!--    第一层弹窗    新增出库单  修改-->
        <div class="Thepopup">
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe" @close="shutDown">
                <div>
                    <ul>
                        <li>
                            <p>库房：</p>
                            <el-select v-model="kfxl"  clearable placeholder="请选择">
                                <el-option
                                        v-for="item in kfxlArr"
                                        :key="item.warehouseid"
                                        :label="item.name"
                                        :value="item.warehouseid">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>单据编号：</p>
                            <el-input v-model="code" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>原始凭证：</p>
                            <el-input v-model="originalcode" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>单据日期：</p>
                            <el-date-picker v-model="checkdate" type="date" placeholder="选择日期"></el-date-picker>
                        </li>
                        <li  v-if="type=='edit'">
                            <p>单据金额：</p>
                            <el-input v-model="totalmoney" placeholder="请输入内容" clearable></el-input>
                        </li>
                        <li>
                            <p>经办人：</p>
                            <el-select v-model="fzrxl"  clearable placeholder="请选择">
                                <el-option
                                        v-for="item in fzrxlArr"
                                        :key="item.employeeid"
                                        :label="item.name"
                                        :value="item.employeeid">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <p>备注：</p>
                            <el-input v-model="memo" placeholder="请输入内容" clearable></el-input>
                        </li>

                    </ul>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="Modifythe = false">取 消</el-button>
                    <el-button type="primary" @click="ondetermine">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!--    第二层弹窗 明细弹出   新增 修改-->
        <div class="Thepopup Thepopupmx">
            <el-dialog :close-on-click-modal="false" :visible.sync="Modifmxtc" >
                <div class="Thepopupmx_top">
                    <el-button type="danger" icon="el-icon-plus" size="small" @click="onnewckyl">新增报损原料</el-button>
                    <div>
                        <el-button  type="primary" @click="Modifmxtc = false" size="small">确定</el-button>
                    </div>
                </div>
                <div class="Position_cont_table">
                    <el-table
                            :data="mxtableData"
                            border
                            style="">
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
                                label="单位"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="单价"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="lossnums"
                                label="数量"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="lossmoney"
                                label="金额"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="memo"
                                label="备注"
                                width="">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="onminxg(scope.row)"  size="small">修改</el-button>
                                <el-button type="primary" @click="onmingxdelete(scope.row)" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--            分页-->
                <div class="page">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="mxtotal"
                            :page-size="mxJosize"
                            @current-change="mxonpage"
                            hide-on-single-page
                    >
                    </el-pagination>
                </div>
                <el-dialog
                        width="30%"
                        :visible.sync="innerVisible"
                        append-to-body @close="shutDown2">
                    <div class="Position_cont_table_body">
                        <ul style="display: flex;justify-content: space-between;flex-wrap: wrap">
                            <li style="width: 48%">
                                <p>原料：</p>
                                <el-cascader v-model="yuanlxl" :filter-method="filter"  filterable clearable   :options="yuanlxlArr"  style="width: 100%" @change="onylkxz"></el-cascader>
                            </li>
                            <li style="width: 48%;">
                                <p>规格：</p>
                                <el-input v-model="yuanlxlGg.specs" disabled placeholder="请输入内容" clearable></el-input>
                            </li>
                            <li style="width: 48%;margin-top: 20px">
                                <p>单位：</p>
                                <el-input v-model="yuanlxlGg.unit" disabled placeholder="请输入内容" clearable></el-input>
                            </li>
                            <li style="width: 48%;margin-top: 20px">
                                <p>价格：</p>
                                <el-input v-model="yuanlxlGg.price" disabled placeholder="请输入内容" clearable></el-input>
                            </li>
                            <li style="width: 48%;margin-top: 20px">
                                <p>报损数量：</p>
                                <el-input v-model="lossnums" placeholder="请输入内容" clearable></el-input>
                            </li>
                            <li style="width: 48%;margin-top: 20px">
                                <p>总价：</p>
                                <el-input v-model="(lossnums*yuanlxlGg.price).toFixed(2)"  disabled placeholder="请输入内容" clearable></el-input>
                            </li>
                            <li style="width: 48%;margin-top: 20px">
                                <p>备注：</p>
                                <el-input v-model="mxmemo" placeholder="请输入内容" clearable></el-input>
                            </li>

                        </ul>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="innerVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onylxdetermine">确 定</el-button>
                    </div>
                </el-dialog>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Damaged",
        data(){
            return {
                //入库单
                tableData: [],   //入库单列表
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改

                code:'',      //单据编号
                checkdate:'',    //单据日期
                totalmoney:'',      //单据金额
                originalcode:'',    //单据凭证
                kfxl:'',           //库房下拉
                kfxlArr:'',           //库房下拉列表
                fzrxl:'',          //负责人下拉经办人
                fzrxlArr:'',       //负责人下拉列表经办人
                memo:'',         //备注
                lossid:'',       //id

                // 明细弹出
                mxtableData: [],   //原料明细列表
                Modifmxtc:false,    //明细弹出层开关
                innerVisible:false, //明细新增
                mxtype:'new',        ////new新增  edit修改
                mxJopage:1,    //分页
                mxJosize:10,   //条数
                mxtotal:0,    //分页总条数

                yuanlxlGg:'',    //原料信息
                lossnums:'',    //盘点数量
                mxmemo:'',        //备注
                yuanlxl:'',       //原料下拉
                yuanlxlArr:'',    //原料下拉列表

                //checkid:'',     //明细id
                //查询
                cxtime:'',     //筛选日期
                cxshxx:'',    //审核
                cxshxxArr:[
                    {
                        id:0,
                        label:'录入'
                    },{
                        id:1,
                        label:'已审核'
                    },{
                        id:2,
                        label:'已取消'
                    }
                ],

            }
        },
        methods:{
            // 初始化列表
            initList(){
                this.code='';
                this.originalcode='';
                this.checkdate='';
                this.totalmoney='';
                this.fzrxl='';
                this.memo='';
                this.kfxl='';
                this.lossid='';
                // 报损列表
                let startdate='';
                let enddate='';
                if(this.cxtime){
                    startdate=this.DateTime(this.cxtime[0]);
                    enddate=this.DateTime(this.cxtime[1]);
                }

                this.$post(this.$api.lossLosslist,{
                    startdate:startdate,
                    enddate:enddate,
                    status:this.cxshxx,
                    page:this.Jopage,
                    size:this.Josize,
                }).then(data=>{
                    console.log('报损列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化报损列表
            yllbList(){
                this.mxmemo="";
                this.yuanlxlGg='';
                this.lossnums='';
                this.slaveid='';
                this.yuanlxl='';
                // 报损明细列表
                this.$post(this.$api.lossLossgoodslist,{
                    lossid:this.lossid,
                    page:this.mxJopage,
                    size:this.mxJosize,
                }).then(data=>{
                    console.log('报损明细列表',data);
                    if(data.code==0){
                        this.mxtableData=data.data;
                        this.mxtotal=data.count;
                    }
                })
            },
            // 初始化
            init(){
                //库房下拉
                this.$post(this.$api.selectwarehouse).then(data=>{
                    this.kfxlArr=data.data;
                    console.log('库房下拉',data)
                });
                //负责人下拉
                this.$post(this.$api.selectemp).then(data=>{
                    this.fzrxlArr=data.data;
                    console.log('负责人下拉',data)
                });
                // 原料下拉
                this.$post(this.$api.selectgoods2).then(data=>{
                    this.yuanlxlArr=data.data;
                    console.log('原料下拉',data)
                });

            },
            // 报损新增
            onnew(){
                this.Modifythe=true;
                this.type='new'
            },
            // 报损修改
            handleClick(row) {
                this.Modifythe=true;
                this.type='edit';

                this.code=row.code;
                this.originalcode=row.originalcode;
                this.checkdate=row.checkdate;
                this.totalmoney=row.totalmoney;
                this.fzrxl=row.employee1id;
                this.memo=row.memo;
                this.kfxl=row.warehouseid;
                this.lossid=row.lossid;
            },
            // 时间转换
            DateTime(date){
                let year=date.getUTCFullYear();
                let month=date.getUTCMonth()+1;
                let day=date.getDate();
                if(month<10){
                    month='0'+month
                }
                if(day<10){
                    day='0'+day
                }
                return year+'-'+month+'-'+day
            },
            // 添加确定
            ondetermine(){
                if(this.type=='new'){
                    let data={
                        warehouseid:this.kfxl,
                        code:this.code,
                        originalcode:this.originalcode,
                        checkdate:this.DateTime(this.checkdate),
                        totalmoney:this.totalmoney,
                        employee1id:this.fzrxl,
                        memo:this.memo
                    };
                    console.log(data);
                    //新增
                    this.$post(this.$api.lossLossadd,data).then(data=>{
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
                    let checkdate='';
                    if(this.checkdate instanceof Date){
                        checkdate=this.DateTime(this.checkdate)
                    }else{
                        checkdate=this.checkdate
                    }
                    let data={
                        warehouseid:this.kfxl,
                        code:this.code,
                        checkdate:checkdate,
                        originalcode:this.originalcode,
                        totalmoney:this.totalmoney,
                        employee1id:this.fzrxl,
                        memo:this.memo,
                        lossid:this.lossid
                    };
                    console.log(data);
                    this.$post(this.$api.lossLossedit,data).then(data=>{
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
            // 取消
            ondelete(row){
                this.$confirm(' 是否确定要取消?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.lossLosscancel,{lossid:row.lossid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '取消成功!'
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
            onshenh(row){
                this.$confirm(' 是否确定审核?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.lossLossauth,{lossid:row.lossid}).then(data=>{
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


            // 点击出库明细
            onckmx(row){
                this.Modifmxtc=true;
                this.lossid=row.lossid;
                this.yllbList()
            },
            //点击新增原料
            onnewckyl(){
                this.innerVisible=true;
                this.mxtype='new'
            },
            //明细模糊搜索匹配
            filter(val,vasle){
                if(val){
                    if(val.data.pinyin){
                        if(val.data.pinyin.toLowerCase().indexOf(vasle.toLowerCase())!=-1){
                            return true
                        }
                    }
                    return false
                }
            },
            // 原料选择
            onylkxz(){
                let goodsid=this.yuanlxl[2];
                console.log(goodsid);
                this.$post(this.$api.selectbygoodsid,{goodsid:goodsid}).then(data=>{
                    this.yuanlxlGg=data.data;
                    console.log(this.yuanlxlGg);
                })
            },
            //报损明细修改
            onminxg(row){
                this.innerVisible=true;
                this.mxtype='edit';
                this.slaveid=row.slaveid;
                let that=this;
                this.yuanlxlArr.forEach(item=>{
                    if(item.children){
                        item.children.forEach(item2=>{
                            if(item2.children){
                                item2.children.forEach(item3=>{
                                    //console.log(item3.value,'-------',row.goodsid)
                                    if(item3.value==row.goodsid){
                                        that.yuanlxl=[item.value,item2.value,item3.value];
                                        return false
                                    }
                                })
                            }
                        })
                    }

                });
                this.mxmemo=row.memo;
                this.lossnums=row.lossnums;
                this.onylkxz();
            },
            // 报损新增弹出确定
            onylxdetermine(){
                // 原料新增
                if(this.mxtype=='new'){
                    let goodsid=this.yuanlxl[2];
                    let data={
                        lossnums:this.lossnums,
                        lossid:this.lossid,
                        goodsid:goodsid,
                        memo:this.mxmemo
                    };
                    console.log(data);
                    this.$post(this.$api.lossLossgoodsadd,data).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.innerVisible=false;
                            this.yllbList();
                           // this.initList();
                        }
                    })
                }else if(this.mxtype=='edit'){
                    //修改
                    let goodsid=this.yuanlxl[2];
                    let data={
                        slaveid:this.slaveid,
                        lossnums:this.lossnums,
                        memo:this.mxmemo,
                        goodsid:goodsid
                    };
                    this.$post(this.$api.lossLossgoodsedit,data).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.innerVisible=false;
                            this.yllbList();
                            this.initList();
                        }
                    })
                }
            },
            //报损明细删除
            onmingxdelete(row){
                this.$confirm(' 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.lossLossgoodsdel,{slaveid:row.slaveid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.yllbList();
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
            // 报损明细点击分页
            mxonpage(value){
                this.mxJopage=value;
                this.yllbList();
            },
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.code='';
                this.originalcode='';
                this.checkdate='';
                this.totalmoney='';
                this.fzrxl='';
                this.memo='';
                this.kfxl='';
                this.lossid='';
                // 报损列表

            },
            // 关闭弹框
            shutDown2(){
                //清空表单值
                this.mxmemo="";
                this.yuanlxlGg='';
                this.lossnums='';
                this.slaveid='';
                this.yuanlxl='';

            },
            // 点击查询
            onInquire(){
                //console.log(this.cxtime);
                this.initList();
            },
        },
        mounted() {
            this.initList();
            this.init();
        },
    }
</script>

<style lang="scss">
    .Damaged{
        .el-dialog{
            width: 30%;
        }
        .Thepopupmx  .el-dialog{
            width: 60%;

        }

    }
</style>
<style scoped lang="scss">
    .Damaged{
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
                margin-right: 20px;
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