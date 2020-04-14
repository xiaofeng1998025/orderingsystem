<template>
    <div class="DishManagement">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="cont">
            <div class="cont_btn">
                <div>
                    <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">菜品新增</el-button>
                </div>
                <div class="search">
                    <el-cascader v-model="cxcpfl"  :options="cpflArr" clearable   placeholder="请选择菜品分类"></el-cascader>
                    <el-select v-model="cxcpyl" clearable  placeholder="请选择原料查询">
                        <el-option
                                v-for="item in cpylArr"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input placeholder="请输入菜品名称" v-model="cxname" clearable></el-input>
                    <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
                </div>
                <div class="Position_cont_table">
                    <el-table
                            :data="tableData"
                            border
                            style="">
                        <el-table-column
                                fixed="left"
                                label="菜品图片"
                                width="122">
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
                                prop="words"
                                label="文字介绍"
                                width="">
                        </el-table-column>
<!--                        <el-table-column-->
<!--                                prop="methodname"-->
<!--                                label="制作方法"-->
<!--                                width="" >-->
<!--                        </el-table-column>-->
                        <el-table-column
                                prop="mstr"
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
                                prop="memo"
                                label="备注"
                                width="">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="是否打折"
                                width="80">
                            <template slot-scope="scope">
                                <el-switch
                                           v-model="scope.row.state"
                                           active-value="1" inactive-value="0"
                                           active-text="关"
                                           inactive-text="开" @change="onsfdaz(scope.row)"  :class="[scope.row.state==1?'el-switch-right-block':'el-switch-left-block']">

                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="自动销售"
                                width="80">
                            <template slot-scope="scope">
                                <el-switch v-if="scope.row.isgoods=='是'"
                                        v-model="scope.row.isauto"
                                           active-value="1" inactive-value="0"
                                        active-text="关"
                                        inactive-text="开" @change="ondisplay(scope.row)"  :class="[scope.row.isauto==1?'el-switch-right-block':'el-switch-left-block']">

                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="是否上下架"
                                width="100">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.status"
                                        active-text="关"
                                        active-value="0" inactive-value="1"
                                        inactive-text="开" @change="onswitchType(scope.row)" :class="[scope.row.status==0?'el-switch-right-block':'el-switch-left-block']">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="214"
                                >
                            <template slot-scope="scope">
                                <!--                            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>-->
                                <el-button type="primary" @click="handleClick(scope.row)"  size="small">修改</el-button>
                                <el-button type="primary" @click="guigClick(scope.row)"  size="small">规格</el-button>
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
        </div>
<!--        弹出层-->
        <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe"  @close="shutDown">
            <div class="tanc_cont">
                <ul>
                    <li>
                        <p>菜品分类</p>
                        <el-cascader v-model="cpfl" :options="cpflArr" ></el-cascader>
                    </li>
                    <li>
                        <p>原料</p>
                        <el-select v-model="cpyl" clearable  placeholder="请选择">
                            <el-option
                                    v-for="item in  cpylArr"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li v-if="cpyl==0">
                        <p>菜品编号</p>
                        <el-input v-model="code" placeholder="请输入编号" clearable></el-input>
                    </li>
                    <li v-if="cpyl==0">
                        <p>菜品名称</p>
                        <el-input v-model="name" placeholder="请输入名称" clearable></el-input>
                    </li>
                    <li v-if="cpyl==0">
                        <p>文字介绍</p>
                        <el-input v-model="words" placeholder="请输入文字介绍" clearable></el-input>
                    </li>
<!--                    <li v-if="cpyl==0">-->
<!--                        <p>制作方法</p>-->
<!--                        <el-select v-model="zzffxl" clearable   placeholder="请选择">-->
<!--                            <el-option-->
<!--                                    v-for="item in  zzffxlArr"-->
<!--                                    :key="item.methodid"-->
<!--                                    :label="item.name"-->
<!--                                    :value="item.methodid">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </li>-->
<!--                    <li v-if="cpyl==0">-->
<!--                        <p>规格</p>-->
<!--                        <el-input v-model="specs" placeholder="请输入规格" clearable></el-input>-->
<!--                    </li>-->
                    <li v-if="cpyl==0">
                        <p>单位</p>
                        <el-select v-model="cpdwxl" clearable   placeholder="请选择">
                            <el-option
                                    v-for="item in  cpdwxlArr"
                                    :key="item.attachid"
                                    :label="item.name"
                                    :value="item.attachid">
                            </el-option>
                        </el-select>
                    </li>
                    <li v-if="cpyl==1">
                        <p>原料选择</p>
                        <el-cascader v-model="cpylsjxl" :options="cpylsjxlArr" ></el-cascader>
                    </li>
                    <li>
                        <p>价格</p>
                        <el-input v-model="price" placeholder="请输入价格" clearable></el-input>
                    </li>
                    <li>
                        <p>备注</p>
                        <el-input v-model="memo" placeholder="请输入备注" clearable></el-input>
                    </li>
                    <li v-if="cpyl==1" class="zdxsd">
                        <el-checkbox v-model="zdxs" true-label="1" false-label="0">自动销售</el-checkbox>
                    </li>
                    <li class="sfkdz">
                        <el-checkbox v-model="sfkdz" true-label="1" false-label="0">是否可打折</el-checkbox>
                    </li>
                    <li class="cptp" >
                        <p>菜品图片</p>
                        <el-upload
                                class="upload-demo"
                                :action="actionurl"
                                :on-success="handlePreview"
                                list-type="picture"
                                :auto-upload="autoUpload"
                                :limit="limit"
                                :on-change="onUpload"
                                :data="data"
                                :headers="headers"
                                :file-list="fileURlList"
                                :on-remove="handleRemove"
                                >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，图片尺寸大小为700x700，且不超过5M</div>
<!--                            <div slot="tip" class="el-upload__tip tpjsd">-->
<!--                                <el-button size="small" type="primary" @click="ontpjyu">图片建议</el-button>-->
<!--                            </div>-->
                        </el-upload>
                    </li>

                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Modifythe = false">取 消</el-button>
                <el-button type="primary" @click="ondetermine">确 定</el-button>
            </div>
        </el-dialog>
<!--        规格添加弹出层-->
        <el-dialog :close-on-click-modal="false" :visible.sync="ggtcShow"  @close="shutDown">
            <div class="tanc_cont">
               <div class="tanc_cguig">
                   <el-input placeholder="请输入要添加的规格" v-model="guig" clearable> </el-input>
                   <el-button type="primary" @click="tighClick">确定</el-button>
               </div>
                <div class="tanc_cguig_list">
                    <el-table
                            :data="guigArr"
                            :header-cell-style="function() {return 'background:#F8F8F8'}"
                            style="width: 100%"  border>
                        <el-table-column
                                prop="name"
                                label="规格">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="100"
                        >
                            <template slot-scope="scope">
                                <el-button type="primary" @click="onggsc(scope.row)" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ggtcShow = false">取 消</el-button>
                <el-button type="primary" @click="ggtcShow = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DishManagement",
        data(){
            return{
                tableData: [],    //列表数据
                Modifythe:false,   //弹出层开关
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                type:'new',   //new新增  edit修改

                zdxs:'1',    //自动销售开关
                zttype:'0',  //状态开关
                sfkdz:'1',    //是否可打折

                cpylsjxl:'',   //菜品原料三级下拉
                cpylsjxlArr:[], //菜品原料三级下拉列表
                cpfl:'',   //菜品分类
                cpflArr:[],   //菜品分类列表
                cpyl:0,     //菜品原料
                cpylArr:[
                    {
                        id:0,
                        label:'否'
                    },
                    {
                        id:1,
                        label:'是'
                    }
                ],//菜品原料下拉
                zzffxl:'',    //制作方法下拉
                zzffxlArr:'',   //制作方法下拉列表
                cpdwxl:'',     //菜品单位下拉
                cpdwxlArr:'',    //菜品单位下拉列表
                code:'',      //菜品编号
                name:'',     //菜品名称
                specs:'',   //规格
                price:'',    //价格
                words:'',     //文字介绍
                memo:'',        //备注
                fileURl:'',    //图片
                fileURlList:[],   //选择的图标列表
                actionurl:'',   //图片上传地址
                autoUpload:true,   //图片选择就上传
                limit:1,           //图片上传个数限制
                data:{},          //上传参数
                headers:{},       //上传头部
                disheid:'',        //id
                cxcpfl:'',        //查询分类id
                cxname:'',       //查询菜品名称
                cxcpyl:'',       //查询是否原料
                //规格弹出层
                ggtcShow:false,     //规格弹出
                guig:'',             //规格
                guigArr:[],          //规格列表
                cpdisheid:'',       //菜品id
            }
        },
        methods:{
            // 初始化列表
            initList(){
                    this.cpfl='';
                    this.cpyl=0;
                    this.code="";
                    this.name="";
                    this.specs="";
                    this.zzffxl="";
                    this.cpdwxl="";
                    this.price="";
                    this.words="";
                    this.memo="";
                    this.fileURl='';
                    this.fileURlList=[];
                let cxcpfl='';
                if(this.cxcpfl.length==2){
                    cxcpfl=this.cxcpfl[1]
                }else if(this.cxcpfl.length==1){
                    cxcpfl=this.cxcpfl[0]
                }
                this.$post(this.$api.disheslist,{
                    classifyid:cxcpfl,
                    name:this.cxname,
                    isgoods:this.cxcpyl,
                    page:this.Jopage,
                    size:this.Josize
                }).then(data=>{
                    console.log('菜品列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                });
            },
            // 初始化内容
            init(){
                // 菜品分类下拉
                this.$post(this.$api.selectdishesclassfy).then(data=>{
                    console.log('菜品分类下拉',data);
                    this.cpflArr=data.data
                });
                //制作方法下拉
                this.$post(this.$api.selectdishesmethods).then(data=>{
                    console.log('制作方法下拉',data);
                    this.zzffxlArr=data.data
                });
                // 菜品单位下拉
                this.$post(this.$api.selectattachs,{type:1}).then(data=>{
                    console.log('菜品单位下拉',data);
                    this.cpdwxlArr=data.data
                });
                // 菜品原料下拉
                this.$post(this.$api.selectgoods).then(data=>{
                    console.log('菜品原料下拉',data);
                    this.cpylsjxlArr=data.data
                });
            },
            // 点击菜品新增
            onnew(){
                this.type='new';
                this.Modifythe=true;
             },
            // 修改
            handleClick(row) {
                this.Modifythe=true;
                this.type='edit';
                let cpfls=()=>{
                    const that=this;
                    const classifyid=row.classifyid;
                    const cpflArr=this.cpflArr;
                    for(let i=0;i<cpflArr.length;i++){
                        if(cpflArr[i].value==classifyid){
                            that.cpfl=[cpflArr[i].value];
                            return false
                        }else{
                            for(let k=0;k<cpflArr[i].children.length;k++){
                                if(cpflArr[i].children[k].value==classifyid){
                                    that.cpfl=[cpflArr[i].value,cpflArr[i].children[k].value];
                                    return false
                                }
                            }
                        }
                    }
                };
                if(row.is_goods=='0'){
                    console.log("否")
                        this.cpyl=Number(row.is_goods);
                        this.code=row.code;
                        this.name=row.name;
                        this.specs=row.specs;
                        this.zzffxl=row.methodid;
                        this.cpdwxl=row.unit;
                        this.price=row.price;
                        this.words=row.words;
                        this.memo=row.memo;
                        this.fileURl=row.pic;
                        this.disheid=row.disheid;
                        cpfls();
                }else if(row.is_goods=='1'){
                    console.log('是')
                    this.cpyl=Number(row.is_goods);
                    this.memo=row.memo;
                    this.fileURl=row.pic;
                    this.disheid=row.disheid;
                    this.zdxs=row.isauto;
                    this.sfkdz=row.state;
                    this.price=row.price;
                    const that=this;
                    const cpylsjxlArr=this.cpylsjxlArr;
                    const code=row.code;

                    cpfls();
                    for(let i=0;i<cpylsjxlArr.length;i++){
                        for(let k=0;k<cpylsjxlArr[i].children.length;k++){
                            for(let j=0;j<cpylsjxlArr[i].children[k].children.length;j++){
                                if(cpylsjxlArr[i].children[k].children[j].value==code){
                                    that.cpylsjxl=[cpylsjxlArr[i].value,cpylsjxlArr[i].children[k].value,cpylsjxlArr[i].children[k].children[j].value];
                                    return false
                                }
                            }
                        }
                    }
                }
            },
            // 点击弹出层确定
            ondetermine(){
                let cpfl='';
                if(this.cpfl.length==2){
                    cpfl=this.cpfl[1]
                }else if(this.cpfl.length==1){
                    cpfl=this.cpfl[0]
                }
               let cpylsjxl='';
                if(this.cpylsjxl.length==3){
                    cpylsjxl=this.cpylsjxl[2]
                }else if(this.cpylsjxl.length==2){
                    cpylsjxl=this.cpylsjxl[1]
                }else{
                    cpylsjxl=this.cpylsjxl[0]
                }
                let cpdwxl='';
                if(typeof(this.cpdwxl)=="number"){
                    this.cpdwxlArr.forEach(item=>{
                        if(item.attachid==this.cpdwxl){
                            cpdwxl=item.name;
                        }
                    });
                }else{
                    cpdwxl=this.cpdwxl
                }
               if(this.cpyl=='0'){
                    this.zdxs=''
                }
                let data={
                    disheid:this.disheid,
                    classifyid:cpfl,
                    is_goods:this.cpyl,
                    code:this.code,
                    name:this.name,
                    specs:this.specs,
                    methodid:this.zzffxl,
                    unit:cpdwxl,
                    price:this.price,
                    words:this.words,
                    memo:this.memo,
                    pic:this.fileURl,
                    goodscode:cpylsjxl,
                    isauto:this.zdxs,
                    state:this.sfkdz
                };
                console.log(data);
                // 新增
                if(this.type=='new'){
                    this.$post(this.$api.dishesDishesadd,data).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.initList()
                        }
                    })  //修改
                }else if(this.type=='edit'){
                    this.$post(this.$api.dishesedit,data).then(data=>{
                        if(data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.Modifythe=false;
                            this.initList()
                        }
                    })
                }
               // this.Modifythe=false;
            },
            // 选择的文件
            onUpload(file, fileList){
                console.log('file',file,'fileList',fileList);
                this.data={
                    file:file.url
                }

            },
            // 上传成功回调
            handlePreview(response,file, fileList) {
                console.log(response,file, fileList);
                this.fileURlList=[{name:file.name,url:file.url}];
                this.fileURl=response.data;
            },
            //删除图片
            handleRemove(file, fileList) {
                this.fileURl='';
            },
            //状态切换 区域开关
            onswitchType(arr){
                console.log(arr);
                this.$post(this.$api.disheschangestatus,{disheid:arr.disheid,status:arr.status}).then(data=>{
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
            // 自动销售
            ondisplay(arr){
                this.$post(this.$api.setisauto,{disheid:arr.disheid,isauto:arr.isauto}).then(data=>{
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
            //可打折 切换
            onsfdaz(arr){
                this.$post(this.$api.setstate,{disheid:arr.disheid,state:arr.state}).then(data=>{
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
            // 点击删除
            ondelete(row){
                this.$confirm(' 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.dishesdel,{disheid:row.disheid}).then(data=>{
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
            // 点击查询
            onInquire(){
              this.initList()
            },
            //规格弹出
            guigClick(arr){
                this.ggtcShow=true;
                this.cpdisheid=arr.disheid;
                this.guigecx()
            },
            // 规格查询
            guigecx(){
                this.$post(this.$api.disheslistmethods,{disheid:this.cpdisheid}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.guigArr=data.data
                    }
                })
            },
            //规格添加确定
            tighClick(){
                let data={
                    disheid:this.cpdisheid,
                    name:this.guig
                };
                this.$post(this.$api.dishesaddmethods,data).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.guigecx();
                        }
                })
            },
            // 规格删除
            onggsc(arr){
                this.$post(this.$api.dishesdelmethods,{methodid:arr.methodid}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.guigecx();
                    }
                })
            },
            // 关闭弹框
            shutDown(){
                //清空表单值
                this.cpfl='';
                this.cpyl=0;
                this.code="";
                this.name="";
                this.specs="";
                this.zzffxl="";
                this.cpdwxl="";
                this.price="";
                this.words="";
                this.memo="";
                this.fileURl='';
                this.fileURlList=[];
                this.guigArr=[];
                this.guig='';
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
            this.actionurl=this.$api.imgupload;
            this.headers={
                token:localStorage.getItem("token")
            };
            console.log(this.actionurl)
        }
    }
</script>
<style lang="scss">
    .DishManagement .el-dialog{
        width: 30%;
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
    .DishManagement{
        padding: 20px 40px;
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
                .sfkdz,.zdxsd{
                    width: 100%;
                    margin-top: 15px;
                }
                .zdxx,.zhuzt,.cptp{
                    width: 100%;
                }
                .el-cascader{
                    width: 100%;
                }
                .cptp{
                    .upload-demo{
                        position: relative;
                      .tpjsd{
                          position: absolute;
                          top:-7px;
                          left: 100px;
                      }
                    }
                }
                li:nth-child(1),li:nth-child(2){
                    margin-top: 0;
                }
            }
        }
        .tanc_cguig{
            display: flex;
            .el-button{
                margin-left: 20px;
            }

        }
        .tanc_cguig_list{
            margin-top: 20px;
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
                margin-right: 20px;
            }
        }
    }
</style>