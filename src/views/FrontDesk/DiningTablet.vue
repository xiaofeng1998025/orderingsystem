<template>
    <div class="DiningTablet">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>前台管理</el-breadcrumb-item>
                <el-breadcrumb-item>餐台图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <div class="Position_cont_top">
                <ul>
                    <li v-for="(item,index) in quyuList" :key="index" :class="[item.areaid==quyuListVal?'Position_cont_top_hover':'']" @click="onquyu(item.areaid)">{{item.name}}</li>
                </ul>
            </div>
            <div class="Position_cont_con">
                <ul>
                    <li v-for='(item,index) in diancList' :key="index" :class="[item.state=='1'?'Position_cont_con_hov':'']" @click="onKickoff(item)">
                        <p>
                            <span>{{item.code}}</span>
                            <span v-if="item.state=='1'">{{item.nums}}人</span>
                            <span v-else>{{item.seats}}座</span>
                        </p>
                        <div>
                            <p>{{item.name}}</p>
                            <div v-if="item.state=='1'">（￥{{item.amountmoney}}元）</div>
                        </div>
                        <span v-if="item.state=='1'">{{item.ordertime}}</span>
                    </li>
                </ul>
            </div>
        </div>
<!--        开台弹窗-->
        <el-dialog title="开台模式"  :close-on-click-modal="false" :visible.sync="Kickoff" class="Kickoff">
            <div>
                <div class="ctbh">
                    <div>餐台编号<span>{{ctbh.code}}</span></div>
                    <div>餐台名称<span>{{ctbh.name}}</span></div>
                    <div>最低消费<span>{{ctbh.minmoney}}</span></div>
                </div>
                <div class="khrs">
                    <div>
                        <span>客户人数</span><el-input placeholder="请输入人数" v-model="nums" clearable></el-input>
                    </div>
                    <div>
                        <span>服务员</span>
                        <el-select v-model="fzrxl"  clearable placeholder="请选择">
                            <el-option
                                    v-for="item in fzrxlArr"
                                    :key="item.employeeid"
                                    :label="item.name"
                                    :value="item.employeeid">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div style="margin-top: 20px"> <el-checkbox v-model="checked">整台等叫</el-checkbox></div>
                <div class="ktbz">
                    <p>开台备注：</p>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 5}"
                            placeholder="请输入内容"
                            v-model="memo">
                    </el-input>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Kickoff = false">取消</el-button>
                <el-button type="danger" @click="onKickOffqd">开台</el-button>
            </div>
        </el-dialog>
<!--        已开台弹窗-->
        <el-dialog :title="'已开台-'+CtxqArr.top.code" :close-on-click-modal="false" :visible.sync="Opening" class="Opening" v-if="Opening" @close="shutDown">
            <div class="Opening_top">
                <div class="Opening_top_date">
                    <div>开台时间： <span>{{CtxqArr.top.ordertime}}</span></div>
                    <div>餐台编号： <span>{{CtxqArr.top.code}}</span></div>
                    <div>餐台名称： <span>{{CtxqArr.top.name}}</span></div>
                    <div>就餐人数： <span><el-input v-model="jcnums" size="mini" @blur="onjcrs(jcnums)"></el-input></span></div>
                    <div>服务员： <span>{{CtxqArr.top.employeeno}}</span></div>
                </div>
                <div class="Opening_top_ktfs">
                    <p>开台方式： <span>{{CtxqArr.top.flagname}}</span></p>
                    <div>关联餐台：
                    <ul>
                        <li v-for="(item,index) in CtxqArr.top.tablelist" :key='index' @click="onglct(item)">{{item.code}}</li>
                    </ul>
                    </div>
                    <span><i class="el-icon-info"></i>点击餐台，切换到该餐台的详情</span>
                </div>
                <div class="Opening_top_ztdj">
                    整台等叫：<span>{{CtxqArr.top.sendtype=='0'?'否':'是'}}</span>
                </div>
                <div class="Opening_top_ktbz">
                    <p>开台备注：<span>{{CtxqArr.top.memo}}</span></p>
                    <div>
                        <p>当前点菜 <span>{{CtxqArr.top.dishecount}}</span>份</p>
                        <div>当前点菜金额 <span>￥{{CtxqArr.top.amountmoney}}</span></div>
                    </div>
                </div>
            </div>
            <div class="Opening_Cont">
                <h3>已点菜品</h3>
                <div class="Opening_Cont_btn">
                    <el-button type="danger" icon="el-icon-plus" @click="jiacai">加菜</el-button>
                    <el-button type="danger" v-if="flag=='2'||flag=='0'" @click="onCloseLt">连台</el-button>
                    <el-button type="danger" v-if="flag=='1'||flag=='0'" @click="onClose">合台</el-button>
                    <el-button type="danger" @click="onCloseZt">转台</el-button>
            <!--                    <el-button type="danger">通知厨房</el-button>-->

            <!--                    <el-button type="danger">预结</el-button>-->
                    <el-button type="danger" @click="onplease">结账</el-button>
                    <el-button v-if="flag=='2'" type="danger" @click="onplease2">连台结账</el-button>
                    <el-button type="danger" @click="onqxkt">取消开台</el-button>
                </div>
            </div>
            <div class="Opening_Cont_table">
                <el-table
                        ref="multipleTable"
                        :data="CtxqArr.list"
                        tooltip-effect="dark"
                        height="384"
                        style="width: 100%"
                        :header-cell-style="function() {return 'background:#F8F8F8'}"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="50"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="编号"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="数量">
                    </el-table-column>
                    <el-table-column
                            prop="unit"
                            label="单位">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格">
                    </el-table-column>
                    <el-table-column
                            prop="memo"
                            label="备注">
                    </el-table-column>
                    <el-table-column
                            label="赠菜">
                        <template slot-scope="scope">
                            <div v-if="scope.row.flag==='0'" style="color:#409EFF">点菜</div>
                            <div v-if="scope.row.flag==='1'"  style="color:#FFAE02">赠菜</div>
                            <div v-if="scope.row.flag==='2'"  style="color:#F5272D">退菜</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status=='0'" style="color:#409EFF">正常</div>
                            <div v-else  style="color:#FFAE02">等叫</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="onshanchucp(scope.row)" plain size="mini">退菜</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">

                <el-button type="danger" @click="ondqzc" plain>转菜</el-button>
                <el-button type="danger" @click="onbudayin" plain>补打印</el-button>
           </span>
            <!--        退菜-->
            <el-dialog  title="退菜" :close-on-click-modal="false" :visible.sync="Retreatca" class="Retreatca" :modal-append-to-body="false" :modal="false" @close="shutDown8"  style="background:rgba(000,000,000,0.4);" >
                    <p>退菜原因：</p>
                    <el-select v-model="Tcyua" clearable placeholder="请选择">
                        <el-option
                                v-for="(item,index) in TcyuaArr"
                                :key="index"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                    <el-input
                        placeholder="请输入原因"
                        v-model="Tcyua"
                        clearable>
                    </el-input>
                    <p>
                        退菜数量：
                    </p>
                    <el-input
                            placeholder="请输入数量"
                            v-model="tcnume"
                            clearable>
                    </el-input>

                    <span slot="footer" class="dialog-footer">
                        <el-button type="danger" @click="onqdtc">确 定</el-button>
                    </span>
            </el-dialog>
            <!--        连台合台弹窗-->
            <el-dialog :title="Closetitle" :close-on-click-modal="false" :visible.sync="Close" class="Close" :modal-append-to-body="false" :modal="false"  @close="shutDown11LT"  v-if="Close" style="background:rgba(000,000,000,0.4);">
                    <div class="Position_cont_top">
                        <ul>
                            <li v-for="(item,index) in quyuList" :key="index" :class="[item.areaid==quyuListVal?'Position_cont_top_hover':'']" @click="onquyu(item.areaid)">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="Position_cont_con">
                        <ul>
                            <li v-for='(item,index) in diancList' :key="index" :class="[item.state=='1'?'Position_cont_con_hov':'']" @click="onhtdq(item)">
                                <p>
                                    <span>{{item.code}}</span>
                                    <span v-if="item.state=='1'">{{item.nums}}人</span>
                                    <span v-else>{{item.seats}}座</span>
                                </p>
                                <div>
                                    <p>{{item.name}}</p>
                                </div>

                            </li>
                        </ul>
                    </div>
                    <div class="yxzct">
                        <p>已选择餐台：</p>
                        <ul>
                            <li v-for="(item,index) in hetailArr" :key="index"><el-tag closable type="danger" @close="ongbbq(index)">{{item.name}}</el-tag></li>
                        </ul>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="danger" plain @click="onhtltqd">确定</el-button>
                    </span>
                </el-dialog>
            <!--        加菜弹窗-->
            <el-dialog  title="加菜" :close-on-click-modal="false" :visible.sync="vegetables" class="Opening" :modal-append-to-body="false" :modal="false"  style="background:rgba(000,000,000,0.4);" >
                <div class="jiacai">
                    <div class="jiacai_l">
                        <el-table
                                :data="tableData"
                                max-height="707px"
                                :header-cell-style="function() {return 'background:#F8F8F8'}"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="">
                            </el-table-column>
                            <el-table-column
                                    prop="amount1"
                                    label="数量"
                                    width="60">
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="价格"
                                    width="80">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="备注"
                                    width="">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.memo" placeholder="" size="mini" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="赠菜"
                                    width="60">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.flag" active-value="1" inactive-value="0"  @change="chceaik(scope)" active-color="#409EFF" inactive-color="#999999"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="等叫"
                                    width="70">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.status" active-value="1" inactive-value="0"  active-color="#409EFF" inactive-color="#999999"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="180">
                                <template slot-scope="scope">
                                    <div  class="gwczc">
                                        <el-input-number v-model="scope.row.amount1"   :min="1" size="mini" label="描述文字"></el-input-number>
                                        <el-button  type="primary" @click="ondelete(scope)" size="mini">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="jiacai_l_tij">
                            <el-button type="danger" @click="onqrdc">确认点菜</el-button>
                        </div>
                    </div>
                    <div class="jiacai_r">
                       <div class="jiacai_r_top">
                           <el-select
                                   v-model="cpcxkj"
                                   filterable
                                   remote
                                   placeholder="请输入关键词"
                                   :remote-method="remoteMethod"
                                   @change="chgjcs"
                                  >
                               <el-option
                                       v-for="(item,index) in cplbArr"
                                       :key="index"
                                       :label="item.name"
                                       :value="item"
                                       :disabled="item.flag_guqing=='1'"
                               >
                               </el-option>
                           </el-select>
                           <ul>
                               <li v-for="(item,index) in cpfllbArr" :key="index" :class="[cpfllb==item.classifyid?'jiacai_r_top_hov':'']" @click="oncplx(item)">{{item.name}}</li>
                           </ul>
                       </div>
                        <div class="jiacai_r_cont">
                            <ul>
                                <li v-for="(item,index) in cplbArr" :key="index">
                                    <p><img :src="item.pic" alt=""></p>
                                    <div>
                                        <p>{{item.name}}</p><span>￥{{item.price}}</span>/份
                                    </div>
                                    <div>
                                        <el-button type="danger" @click="tianjiac(item)" :disabled="item.flag_guqing=='1'"><i class="el-icon-plus"></i>添加</el-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 赠菜原因 -->
                <el-dialog  title="赠菜原因" :close-on-click-modal="false" :visible.sync="zeicaiyuny" class="zecayi" :modal-append-to-body="false" :modal="false"  style="background:rgba(000,000,000,0.4);" >
                    <div class="jiacai">
                        <el-select v-model="zecai" placeholder="请选择">
                            <el-option v-for="item in zecaiArr" :key="item.attachid" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button  @click="zeicaiyuny=false">取消</el-button>
                        <el-button type="primary"  @click="onzcqud">确定</el-button>
                    </span>
                </el-dialog>
            </el-dialog>
            <!--         结账弹窗-->
            <el-dialog  title="结账" :close-on-click-modal="false" :visible.sync="jiezshow" class="BillPlease" :modal-append-to-body="false" :modal="false"  @close="shutDown10" v-if="jiezshow"  style="background:rgba(000,000,000,0.4);" >
                <div class="BillPlease_cont">
                    <div class="BillPlease_cont_l">
                        <div class="BillPlease_cont_l_top">
                            <div>请核对<span>结账</span>菜单</div>
                            <el-button type="danger" size="mini" @click="onCdy()">菜单打印</el-button>
                        </div>
                        <div class="BillPlease_cont_l_tabl">
                            <ul>
                                <li v-for="(item,index) in jiezhSArr.top1" :key="index">
                                    <p>{{item.tablename}}</p>
                                    <el-table
                                            ref="multipleTable"
                                            :data="item.dishes"
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            
                                            :header-cell-style="function() {return 'background:#F8F8F8'}"
                                    >
                                        <el-table-column
                                                prop="code"
                                                label="编号"
                                                width="100">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="名称"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="amount"
                                                label="数量"
                                                width="80">
                                        </el-table-column>
                                        <el-table-column
                                                prop="price"
                                                label="价格"
                                                width="60">
                                        </el-table-column>
                                        <el-table-column
                                                prop="price"
                                                label="可打折"
                                                width="80">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.state=='0'" style="color:#409EFF">不可打折</div>
                                                <div v-else  style="color:#FFAE02">可打折</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="price0"
                                                label="小计"
                                                width="60">
                                        </el-table-column>
                                    </el-table>
                                </li>
                            </ul>

                            <div v-if="jiezhSArr.bottom" class="BillPlease_cont_l_tabl_botom">
                                <!-- <div>餐位费:<span>{{jiezhSArr.bottom.setfeetotal}}</span></div> -->
                                <div>服务费:<span>{{jiezhSArr.bottom.tablefee}}</span></div>
                                <div>可折扣金额:<span>{{jiezhSArr.bottom.top1total}}</span></div>
                                <div>总计:<span>{{czzobngje}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="BillPlease_cont_r">
                            <div class="zhelkmolsd">
                                <div class="zhelk">
                                    折扣率： <el-select v-model="czzkl" size="small" @change="onzhekoul" placeholder="请选择折扣">  <el-option v-for="item in czzklArr" :key="item.id" :label="item.discountname"  :value="item.discountratio"> </el-option> </el-select>
                                    <!-- <el-input placeholder="请输入折扣率" size="small" v-model="czzkl" clearable  @input="onzhekoul"></el-input>  -->
                                </div>
                                <div class="molsd">
                                    抹零金额：<el-input placeholder="请输入抹零金额" size="small" v-model="czmlje" clearable @input="onmoling"></el-input>
                                </div>
                                <div class="hycx">
                                    <el-button type="danger" size="small" @click="vipcx=true">会员查询</el-button>
                                </div>
                                <div class="yhjus">
                                    <el-button type="danger" size="small" @click="youhj=true">优惠券</el-button>
                                </div>
                            </div>
                            <div class="dingj" v-if="czdingj>0">订金：<span>￥{{czdingj}}</span> <el-checkbox v-model="czdingjgx" @change="ondingsd">是否订金抵扣</el-checkbox></div>
                            <div class="dingj" v-if="qdshycs.quannum">优惠券抵扣：<span>￥{{qdshycs.quannum*qdshycs.quanmoney}}</span></div>
                            <div class="ysje">
                                <div>应收金额：<span>￥{{czysje}}</span></div>
                                <div v-if="czdzfje">待支付金额：<span>￥{{czdzfje}}</span></div>
                                <div v-if="czhyye">会员余额：<span>￥{{czhyye}}</span></div>
                            </div>

                            <div class="zffs">
                                <p>支付方式：</p>
                                <ul>
                                    <li @click="xianjz=true" v-if="zhifufan.some(item=>{return item==3})">
                                        <p><img src="@img/xianjin@2x.png" style="width:40px" alt=""></p>
                                        <div>现金</div>
                                    </li>
                                    <li @click="onzfbwx('zfb')" v-if="zhifufan.some(item=>{return item==2})">
                                        <p><img src="@img/zhifubao(1)@2x.png" alt=""></p>
                                        <div>支付宝</div>
                                    </li>
                                    <li  @click="onzfbwx('wx')" v-if="zhifufan.some(item=>{return item==1})">
                                        <p><img src="@img/weixinzhifu@2x.png" style="width:57px" alt=""></p>
                                        <div>微信</div>
                                    </li>
                                    <li @click='onyingk' v-if="zhifufan.some(item=>{return item==4})">
                                        <p><img src="@img/yinhang@2x.png" style="width:60px" alt=""></p>
                                        <div>银行卡</div>
                                    </li>
                                    <li @click="onyuezf" v-if="zhifufan.some(item=>{return item==5})">
                                        <p><img src="@img/zhekou.png" alt=""></p>
                                        <div>余额</div>
                                    </li>
                                    <li @click="Signjz=true" v-if="zhifufan.some(item=>{return item==6})">
                                        <p><img src="@img/qiandan@2x.png" alt=""></p>
                                        <div>签单</div>
                                    </li>
                                    <li @click="onmiandan" v-if="zhifufan.some(item=>{return item==9})">
                                        <p><img src="@img/miandanyixuan@2x.png" alt=""></p>
                                        <div>免单</div>
                                    </li>
                                    <li @click="onchongzmd" v-if="zhifufan.some(item=>{return item==7})">
                                        <p><img src="@img/huodong@2x.png" alt=""></p>
                                        <div>三倍充值免单</div>
                                    </li>
                                    <li @click="ponbasfw" v-if="zhifufan.some(item=>{return item==8})">
                                        <p><img src="@img/huodong@2x.png" alt=""></p>
                                        <div>霸王餐</div>
                                    </li>

                                </ul>

                            </div>
                    </div>
                </div>
<!--                会员查询-->
                <el-dialog  title="会员查询" :close-on-click-modal="false" :visible.sync="vipcx" class="vipcx" :modal-append-to-body="false" :modal="false" @close="shutDown4"  style="background:rgba(000,000,000,0.4);" >
                    <div class="huiycx">
                        <div class="huiycx_top" >
                            <el-input placeholder="请输入手机号" v-model="hyphone" clearable></el-input>
                            <el-button type="danger" size="medium" @click="onvipcx">查询</el-button>
                        </div>
                        <div  class="huiycx_cont" >
                            <div class="huiycx_cont_toux">
                                姓名：<span>{{viplist.name}}</span>
                            </div>
                            <div class="huiycx_cont_toux">
                                手机：<span>{{viplist.phone}}</span>
                            </div>
                            <div class="huiycx_cont_yue">
                                账户余额：<span v-if="viplist.groupbalance">￥{{viplist.groupbalance}}</span>
                            </div>
                            <div class="huiycx_cont_hyzk">
                                <div >会员折扣：<span v-if="viplist.discountrate">{{viplist.discountrate}}折</span></div>
                            </div>
                            <div class="huiycx_cont_toux">
                                订金：<span>{{viplist.dingjin}}</span>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="danger" @click="onvipqued">确 定</el-button>
                    </span>
                </el-dialog>
<!--                现金结账-->
                <el-dialog  title="现金结账"  :close-on-click-modal="false" :visible.sync="xianjz" class="xianjz" :modal-append-to-body="false" :modal="false"  @close="shutDown5"  style="background:rgba(000,000,000,0.4);" >
                    <div class="xianjz_con">
                        <div class="xianjz_con_top">收取金额：<el-input v-model="sqjine"  ></el-input></div>
                        <div>应付金额：<span v-if="czysje">￥{{czysje}}</span>
                                        <span v-else>￥{{czdzfje}}</span>
                        </div>
                        <div v-if="czdzfje">找零金额：<span v-if="sqjine-czdzfje>0">￥{{(sqjine-czdzfje).toFixed(2)}}</span></div>
                        <div v-else>找零金额：<span v-if="sqjine-czysje>0">￥{{(sqjine-czysje).toFixed(2)}}</span></div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="xianjz=false">取 消</el-button>
                        <el-button type="danger" @click="onxinjn" :disabled="sqjine < Number(czysje)">确定结账</el-button>
                  </span>
                </el-dialog>
<!--                支付宝 微信 银行卡结账-->
                <el-dialog  :title="zfbwxTitle" :close-on-click-modal="false" :visible.sync="zfbwx" class="zfbwx" :modal-append-to-body="false" :modal="false"  @close="shutDown6" style="background:rgba(000,000,000,0.4);" >
                    <div class="zfbwx_cont" >
                        支付码：<el-input :autofocus="true"  v-model="zfbwxddh" @keyup.enter.native="onzhifum" clearable ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="zfbwx=false">取 消</el-button>
                        <el-button type="danger" @click="onwxzfbqdsa">确定结账</el-button>
                  </span>
                </el-dialog>
<!--                签单结账-->
                <el-dialog  title="签单结账" :close-on-click-modal="false" :visible.sync="Signjz" class="Signjz" :modal-append-to-body="false" :modal="false"  @close="shutDown7" style="background:rgba(000,000,000,0.4);" >
                    <div class="Signjz_cont">
                        <p>签单资格查询</p>
                        <div class="Signjz_cont_cx">
                            手机号：<el-input :autofocus="true"  placeholder="请输入手机号" v-model="qdphone"  clearable ></el-input>
                            <el-button type="danger" @click="onqdcx">查询</el-button>
                        </div>
                        <div class="Signjz_cont_kh">
                            客户：<span>{{qdzgl.name}} </span><span>{{qdzgl.phone}}</span>
                        </div>
                        <div class="Signjz_cont_kqd">可签单：<span v-if="qdzgl.flag"><i :class="[qdzgl.flag=='1'?'el-icon-check':'el-icon-close']"></i></span></div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="Signjz=false">取 消</el-button>
                        <el-button type="danger" @click="onqdqds" :disabled="qdzgl.flag=='0'">确定签单</el-button>
                  </span>
                </el-dialog>
<!--                优惠券-->
                <el-dialog  title="优惠券" :close-on-click-modal="false" :visible.sync="youhj" class="youhj" :modal-append-to-body="false" :modal="false" @closed="shutDown9"  style="background:rgba(000,000,000,0.4);" >
                   <p>选择可使用优惠券：</p>
                   <el-select v-model="youhjxz" placeholder="请选择" @change="onyhjsd">
                    <el-option v-for="item in youhjArr" :key="item.id" :label="item.payname" @change="onyhjsd"  :disabled="czzobngje<item.minmoney" :value="item.id" > </el-option>
                    </el-select>
                   <p>数量：</p>
                   <el-input placeholder="请输入使用数量"  v-model="yhjslsl" clearable :max='yhjslxie' ></el-input>
                   <div class="el-form-item__error_zdy" v-if="yhjslxie&&yhjslsl>yhjslxie">超出可使用张数,最多可使用（{{yhjslxie}}）张</div>
                   <div class="el-form-item__error_zdy" v-if="yhjslsl.toString().indexOf('.')!=-1">输入的数量必须为整数</div>
                   <div class="el-form-item__error_zdy" v-if="yhjslsl.toString().indexOf('-')!=-1">输入的数量不能为负数</div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="danger" @click="onquedshiyyhj" :disabled="yhjslsl>yhjslxie||yhjslsl.toString().indexOf('.')!=-1||yhjslsl.toString().indexOf('-')!=-1">确 定</el-button>
                    </span>
                </el-dialog>
            </el-dialog>
        </el-dialog>

    </div>

</template>

<script>
    export default {
        name: "DiningTablet",
        data(){
            return{
                quyuList:[],    //q区域列表
                quyuListVal:0,   //areaid
                diancList:[],    //点餐台列表
                diancSeats:'',   //状态 0未使用1使用中
                areaid:'',          //id
                tableid:'',      //餐桌id
                // 开台
                Kickoff:false,     //开台弹出层
                nums:'',        //客户人数
                memo:'',       //备注
                fzrxl:'',         //服务员下拉
                fzrxlArr:[],     //服务员下拉列表
                ctbh:{           //餐台信息
                    code:'',     //餐台编号
                    name:'',    //餐台名字
                    minmoney:'',  //最低消费
                },
                checked:false,  //整台等叫
                //退菜
                Retreatca:false,   //退菜弹窗
                tcnume:'',         //退菜数量
                TcyuaArr:[],        //退菜原因列表
                Tcyua:'',           //退菜原因
                Tcid:'',             //退菜id
                //已开台
                Opening:false,    //以开台弹窗
                CtxqArr:{},      //餐台详情
                flag:'',        //
                jcnums:'',      //就餐人数
                handleSelectionCge:[],   //勾选的参数

                //合台  连台
                Close:false,      //合台连台弹窗开关
                Closetitle:'',     //合台 获取连台
                Closetitleid:'',    //1 合台  2连台  0转台 3转菜
                hetailArr:[],     //合台连台选择
                orderid:'',        //合台连台id
                //加菜
                vegetables:false,    //加菜连台弹窗开关
                cpfllb:'',          //菜品分类
                cpfllbArr:[],      //菜品分类列表
                cplb:'',          //菜品列表id
                cplbArr:[],        //菜品列表
                tableData:[],       //选择的菜品列表
                cpcxkj:'',             //快捷查询
                    // 赠菜原因
                zeicaiyuny:false,        //弹框开关
                zecaiArr:[],            //赠菜列表
                zecai:'',              //赠菜
                zcindex:'',            //操作的下标
                //结账
                jiezshow:false,    //结账弹窗开关
                jiezhSArr:[],      //菜单列表

                czzklArr:[],       //折扣率列表
                czzkl:1,         //折扣率
                czzklzd:'0',       //是否整单打折  0不是 1是
                czmlje:'',        //抹零金额

                czysje:'',         //结账应收金额

                czhyye:'',         //结账会员余额
                czdzfje:'',         //待支付金额
                czdingj:0,        //订金
                czzobngje:'',        //总金额
                czdingjgx:false,    //是否订金抵扣
                tag:'',            //1单节   2多台
                zhifufan:[],        //可使用的支付方式
                //会员查询
                vipcx:false,   ///会员查询开关
                hyphone:'',       //会员查询app
                viplist:'',        //会员详情信息
                //优惠券
                youhj:false,        //优惠券开关
                youhjArr:[],         //优惠券列表
                youhjxz:'',           //选中优惠券id
                yhjslxie:'',            //优惠券限制数量
                yhjslsl:1,            //优惠券数量
                quanmon:'',           //优惠券面额
                qdshycs:{
                    quanid:'',              //使用卷id
                    quannum:'',              //使用的数量
                    quanmoney:'',            //卷面额
                },
                //现金结账
                xianjz:false,   //现金结账开关、
                sqjine:'',        //收取金额
                //支付宝 微信 银行卡结账
                zfbwx:false,     //微信 支付宝 银行卡
                zfbwxTitle:'',     //弹窗标题
                zfbwxbs:'',      //当前微信 支付宝 银行卡
                zfbwxddh:'',       //扫码回调订单号
                //签单结账
                Signjz:false,       //签单弹窗
                qdphone:'',          //签单手机号查询
                qdzgl:'',            //签单资格
                // 支付结果等待
                zfjgdd:true,     //限制执行次数

             }
        },
        methods:{
            initList(){
                //点餐台
                this.$post(this.$api.tablelist,{
                    areaid:this.areaid
                }).then(data=>{
                    this.diancList=data.data;
                    console.log('点餐台',data);
                })
            },
            // 初始化
            init(){
                // 区域列表
                this.$post(this.$api.arealist).then(data=>{
                    if(data.code==0){
                        this.quyuList=data.data;
                    }
                    console.log('区域列表',data);
                });
                //负责人
                this.$post(this.$api.selectemp).then(data=>{
                    if(data.code==0){
                        this.fzrxlArr=data.data;
                    }

                    console.log('负责人',data);
                });
                //加菜菜品列表
                this.$post(this.$api.dishesclassfy2).then(data=>{
                    if(data.code==0){
                        if(data.data.length>0){
                            this.cpfllb=data.data[0].classifyid;
                        }
                        this.cpfllbArr=data.data;
                        
                    }

                    console.log('菜品分类列表',data);
                });
                //退菜原因
                this.$post(this.$api.Tcselectattachs,{type:3}).then(data=>{
                    if(data.code==0){
                        this.TcyuaArr=data.data;
                    }
                    console.log('退菜原因',data);
                });
                 //赠菜原因
                this.$post(this.$api.Tcselectattachs,{type:4}).then(data=>{
                    if(data.code==0){
                        this.zecaiArr=data.data;
                    }
                    console.log('赠菜原因',data);
                });
                //可使用优惠券
                this.$post(this.$api.selectallquan).then(data=>{
                    console.log('优惠券列表',data);
                    if(data.code==0){
                        this.youhjArr=data.data;
                    }
                });
                //折扣列表
                this.$post(this.$api.selectdiscount).then(data=>{
                    console.log('折扣列表',data);
                    if(data.code==0){
                       this.czzklArr=data.data;
                    }
                });
            },
            // 区域点击
            onquyu(val){
                this.quyuListVal=val;
                this.areaid=val;
                this.initList();
            },
            //开台详情信息
            kaixxq(){
                this.$post(this.$api.orderinfo,{tableid:this.tableid,flag:this.flag}).then(data=>{
                    if(data.code==0){
                        this.CtxqArr=data.data;
                        this.jcnums=data.data.top.nums;
                        this.Opening=true;
                        this.orderid=data.data.top.orderid;
                        this.flag=data.data.top.flag;
                    }
                    console.log(data);
                })
            },
            // 点击开台
            onKickoff(val){
                console.log(val);
                this.tableid=val.tableid;
                this.flag=val.flag;
                if(val.state=='0'){
                    this.Kickoff=true;
                    this.ctbh.code=val.code;
                    this.ctbh.name=val.name;
                    this.ctbh.minmoney=val.minmoney;
                }
                if(val.state=='1'){
                    this.kaixxq();
                }
            },
            //开台确定
            onKickOffqd(){
                let sendtype='';
                if(this.checked){
                    sendtype=1
                }else{
                    sendtype=0
                }

                let data={
                    nums:this.nums,
                    employeeid:this.fzrxl,
                    memo:this.memo,
                    tableid:this.tableid,
                    sendtype:sendtype
                };
                console.log(data)
                this.$post(this.$api.addorderinfo,data).then(data=>{
                    console.log(data);
                    if (data.code == 0) {
                        this.$message({
                            message: '开台成功',
                            type: 'success'
                        });
                        this.Kickoff=false;
                        this.initList();
                        this.nums='';
                        this.fzrxl='';
                        this.memo='';
                    }
                })
            },
            // 关联餐台点击
            onglct(row){
                this.$post(this.$api.orderinfo,{tableid:row.tableid,flag:this.flag}).then(data=>{
                    if(data.code==0){
                        this.CtxqArr=data.data;
                        this.jcnums=data.data.top.nums;
                        this.orderid=data.data.top.orderid;
                        this.tableid=data.data.top.tableid;
                        this.Opening=true;
                    }
                    console.log(data);
                })
            },
            //合台点击
            onClose(){
                this.Close=true;
                this.Closetitle='合台';
                this.Closetitleid='1';
            },
            //连台点击
            onCloseLt(){
                this.Close=true;
                this.Closetitle='连台';
                this.Closetitleid='2';
            },
            //点击转台
            onCloseZt(){
                this.Close=true;
                this.Closetitle='转台';
                this.Closetitleid='0';
            },
            //选择合台 连台 转台  转菜
            onhtdq(data){
                console.log(data);
                if(this.Closetitleid=='3'){
                    if(data.state=='1'){
                        let name=data.name;
                        let qchon=this.hetailArr.some(item=>{return item.name==name});
                        if(!qchon){
                                this.hetailArr.push({name:name,id:data.orderid});
                        }
                    }
                }else{
                    if(data.state=='0'){
                        let name=data.name;
                        let qchon=this.hetailArr.some(item=>{return item.name==name});
                        if(!qchon){
                            if(this.Closetitleid=='0'){
                                this.hetailArr=[{name:name,id:data.tableid}]
                            }else{
                                this.hetailArr.push({name:name,id:data.tableid})
                            }
                        }
                    }
                }

            },
            //菜品勾选
            handleSelectionChange(val){
                console.log(val);
                this.handleSelectionCge=val;
            },
            // 点击转菜
            ondqzc(){
                this.Close=true;
                this.Closetitle='转菜';
                this.Closetitleid='3';
            },
            //点击补打印
            onbudayin(){
                this.$confirm('是否确定补打印菜单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids=[];
                    this.handleSelectionCge.forEach(item=>{
                        ids.push(item.id)
                    });
                    this.$post(this.$api.printdishes,{ids:ids.join(',')}).then(data=>{
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '补打印成功!'
                            });
                            this.kaixxq()
                        }
                        console.log(data);
                    })

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            //选择合台删除标签
            ongbbq(val){
                this.hetailArr.splice(val,1)
            },
            //合台连台确定
            onhtltqd(){
                let ids=[];
                this.hetailArr.forEach(item=>{ids.push(item.id)});
                if(this.Closetitleid=='0'){
                   // 转台
                    this.$post(this.$api.orderChange,{orderid:this.orderid,oldtableid:this.tableid,newtableid:ids.join(',')}).then(data=>{
                        console.log(data);
                        if (data.code == 0) {
                            this.$message({
                                message: '转台成功',
                                type: 'success'
                            });
                            this.Close=false;
                            this.hetailArr=[];
                            this.Opening=false;
                            this.initList();
                        }
                    })
                }else if(this.Closetitleid=='1'){
                    //合台
                    this.$post(this.$api.orderHetai,{orderid:this.orderid,ids:ids.join(','),flag:'1'}).then(data=>{
                        console.log(data);
                        if (data.code == 0) {
                            this.$message({
                                message: '合台成功',
                                type: 'success'
                            });
                            this.Close=false;
                            this.hetailArr=[];
                            this.kaixxq(); //调用连台信息刷新
                        }
                    })
                }else if(this.Closetitleid=='2'){
                    //连台
                    this.$post(this.$api.orderHetai,{orderid:this.orderid,ids:ids.join(','),flag:'2'}).then(data=>{
                        console.log(data);
                        if (data.code == 0) {
                            this.$message({
                                message: '连台成功',
                                type: 'success'
                            });
                            this.Close=false;
                            this.hetailArr=[];
                            this.kaixxq(); //调用连台信息刷新
                        }
                    })
                }else if(this.Closetitleid=='3'){
                    //转菜
                    let idstr=[];
                    this.handleSelectionCge.forEach(item=>{
                        idstr.push(item.id)
                    });
                    this.$post(this.$api.disheschangeorder,{idstr:idstr.join(','),oldorderid:this.orderid,neworderid:ids.join(',')}).then(data=>{
                        console.log(data);
                        if (data.code == 0) {
                            this.$message({
                                message: '转菜成功',
                                type: 'success'
                            });
                            this.Close=false;
                            this.hetailArr=[];
                            this.kaixxq(); //调用连台信息刷新
                        }
                    })
                }
                console.log(ids)
            },
            //就餐人数修改
            onjcrs(val){
                console.log(val);
                this.$post(this.$api.orderEditnums,{orderid:this.orderid,nums:val}).then(data=>{
                    if (data.code == 0) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                })
            },
            // 菜品删除退菜
            onshanchucp(row){
                this.Retreatca=true;
                this.tcnume=row.amount;
                this.Tcid=row.id;
            },
            // 菜品删除退菜确定
            onqdtc(){
                this.$post(this.$api.orderDishesdel,{ids:this.Tcid,count:this.tcnume,memo:this.Tcyua}).then(data=>{
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '退菜成功!'
                        });
                        this.kaixxq();
                        this.Retreatca=false;
                    }
                    console.log(data);
                })
            },
            // 加菜点击
            jiacai(){
                this.vegetables=true;
                this.flcx();
            },
            //菜品分类查询
            flcx(){
                  this.cpcxkj='';
                  this.$post(this.$api.orderdisheslist,{classifyid:this.cpfllb}).then(data=>{
                      if(data.code==0){
                          console.log(data);
                          this.cplbArr=data.data;
                      }
                  })
            },
            // 菜品快捷查询
            remoteMethod(val){
                if(val){
                    this.$post(this.$api.selectdishesbypinyin,{pinyin:val}).then(data=>{
                        this.cplbArr=data.data;
                        console.log(data);
                    })
                }
            },
            //选中
            chgjcs(){
                // console.log(this.cpcxkj)
                if(!this.tableData.some(item=>{return item.disheid==this.cpcxkj})){
                    this.tableData.push(this.cpcxkj);
                    this.cpcxkj='';
                    // this.$refs.tree.focus();
                    // document.querySelector(".jiacai_r_top .el-select .el-input__inner").focus();
                    // console.log(document.querySelector(".jiacai_r_top .el-select .el-input__inner"))
                }
            },
            //菜品分类点击
            oncplx(val){
                this.cpfllb=val.classifyid;
                this.flcx();
            },
            //添加菜
            tianjiac(val){
                console.log(val);
                if(!this.tableData.some(item=>{return item.disheid==val.disheid})){
                    this.tableData.push(val)
                }
            },
            //删除
            ondelete(val){
                //console.log(val);
                this.tableData.splice(val.$index,1)
            },
            //点击赠菜
            chceaik(row){
                console.log(row);
                if(row.row.flag=='1'){
                    this.zeicaiyuny=true;
                    this.zcindex=row.$index;
                }
            },
            // 赠菜弹框确定
            onzcqud(){
                this.zeicaiyuny=false;
                if(this.zecai){
                   this.tableData[this.zcindex].memo=this.zecai;
                   this.zecai='';
                }
            },
            // 确认点菜
            onqrdc(){
                let dishes=[];
                this.tableData.forEach(item=>{dishes.push({disheid:item.disheid,status:item.status,amount:item.amount1,flag:item.flag,memo:item.memo})});
                let data={
                    dishes:JSON.stringify(dishes),
                    orderid:this.orderid
                };
                console.log(data);
                this.$post(this.$api.adddishes,data).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            message: '点菜成功',
                            type: 'success'
                        });
                        this.vegetables=false;
                        this.kaixxq();
                        this.tableData=[]





                    }
                })
            },
            //取消开台点击
            onqxkt(){
                    this.$confirm(' 是否确定取消开台?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$post(this.$api.orderCancel,{orderid:this.orderid}).then(data=>{
                            console.log(data);
                            if(data.code==0){
                                this.$message({
                                    type: 'success',
                                    message: '取消成功!'
                                });
                                this.Opening=false;
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

            //点击结账单节
            onplease(){
                this.jiezshow=true;
                this.tag=1;
                this.$post(this.$api.orderOrderdisheslist,{orderid:this.orderid,}).then(data=>{
                    this.jiezhSArr=data.data;
                    this.czzobngje=data.data.bottom.setfeetotal+data.data.bottom.tablefee+data.data.bottom.top1total+data.data.bottom.top0total;
                    this.czysje=data.data.bottom.setfeetotal+data.data.bottom.tablefee+data.data.bottom.top1total+data.data.bottom.top0total;
                    this.zhifufan=data.data.payinfo;
                    console.log(data);
                });
                this.czzkl='';
                this.czmlje='';
                this.czysje='';
                this.czhyye='';
                this.czdzfje='';
                this.czdingj='';
                this.czdingjgx=false;
                this.hyphone='';
                this.viplist='';
                this.sqjine='';
                this.zfbwxddh='';
                this.qdphone=''
            },
            //点击结账多节
            onplease2(){
                this.jiezshow=true;
                this.tag=2;
                this.$post(this.$api.orderOrderdisheslist,{orderid:this.orderid,tag:this.tag}).then(data=>{
                    this.jiezhSArr=data.data;
                    this.czzobngje=data.data.bottom.setfeetotal+data.data.bottom.tablefee+data.data.bottom.top1total+data.data.bottom.top0total;
                    this.czysje=data.data.bottom.setfeetotal+data.data.bottom.tablefee+data.data.bottom.top1total+data.data.bottom.top0total;
                    this.zhifufan=data.data.payinfo;
                    console.log(data);
                });
                this.czzkl='';
                this.czmlje='';
                this.czysje='';
                this.czhyye='';
                this.czdzfje='';
                this.czdingj='';
                this.czdingjgx=false;
                this.hyphone='';
                this.viplist='';
                this.sqjine='';
                this.zfbwxddh='';
                this.qdphone='';
            },
            // 菜单打印
            onCdy(){
                this.$post(this.$api.printalldishes,{orderid:this.orderid,tag:this.tag}).then(data=>{
                    console.log(data);
                   if(data.code==0){
                       this.$message({
                           type:'success',
                           message:'打印成功'
                       })
                   } 
                })
            },
            //会员查询点击
            onvipcx(){
                this.$post(this.$api.searchvip,{phone:this.hyphone}).then(data=>{
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message: '查询成功!'
                        });
                        this.viplist=data.data;
                    }
                    console.log(data);
                })
            },
            // 会员弹查询确定
            onvipqued(){
                this.vipcx=false;
                if(this.viplist){
                    this.czzkl=this.viplist.discountrate;
                    this.czhyye=this.viplist.groupbalance;
                    this.czdingj=this.viplist.dingjin;
                    this.czzklzd='0'
                    this.czzklArr.push({discountname:this.viplist.discountrate+'折会员',discountratio:this.viplist.discountrate,isall:'0'}) //折扣率追加一条
                    this.yingjine();      //金额计算
                    
                }

            },
            // 优惠券选中
            onyhjsd(val){
                console.log(val);
                this.youhjArr.forEach(item=>{
                    if(item.id==val){
                        this.yhjslxie=item.quannum;
                        this.quanmon=item.quanmoney;
                    }
                })
            },
            //确定使用优惠券
            onquedshiyyhj(){
                console.log(this.czysje - this.quanmon* this.yhjslsl);
                if(this.czysje - this.quanmon* this.yhjslsl>0){
                    this.qdshycs.quanid=this.youhjxz;
                    this.qdshycs.quannum=this.yhjslsl;
                    this.qdshycs.quanmoney=this.quanmon;
                    // this.czysje=(this.czysje-this.qdshycs.quannum*this.qdshycs.quanmoney).toFixed(2);
                     this.yingjine();      //金额计算
                    this.youhj=false;
                }else{
                    this.$alert('当前优惠卷可直接抵扣全部金额可直接结账', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.qdshycs.quanid=this.youhjxz;
                            this.qdshycs.quannum=this.yhjslsl;
                            this.qdshycs.quanmoney = this.quanmon;
                            this.czysje=0;
                            this.jiehzang()
                        }
                    });
                }
              //  console.log(this.czysje-this.qdshycs.quannum*this.qdshycs.quanmoney);
                
            },

            // 应付金额方法计算 
            yingjine(){
                let czmlje=this.czmlje;   //抹零金额
                if(czmlje==''||czmlje==null||czmlje==undefined){
                    czmlje=0
                }
                let czdingj=this.czdingj;     //订金
                if(!this.czdingjgx){
                    czdingj=0;
                }
                let youhuij=0;            //优惠券
                if(this.qdshycs.quanid){
                    youhuij=this.qdshycs.quannum*this.qdshycs.quanmoney;
                }
                let czzkl=this.czzkl;  //折扣率
                if(czzkl==''||czzkl==null||czzkl==undefined){
                    czzkl=1
                }
                if(Number(this.czzklzd)==0){  //0正常折扣计算 1整单折扣计算

                    console.log(this.jiezhSArr.bottom.top1total*czzkl)
                    console.log(this.czzobngje - this.jiezhSArr.bottom.top1total);
                    console.log('折扣率',czzkl);
                    console.log('抹零金额',czmlje);
                    console.log('订金',czdingj);
                    console.log('优惠券',youhuij);
                    this.czysje=(Number((this.jiezhSArr.bottom.top1total*czzkl).toFixed(2))+(this.czzobngje-this.jiezhSArr.bottom.top1total)-Number(czmlje)-czdingj-youhuij).toFixed(2);
                }else{

                    this.czysje=(Number((this.czzobngje*czzkl).toFixed(2))-Number(czmlje)-czdingj-youhuij).toFixed(2);
                }
                if(this.czysje<=0){
                    this.$alert('当前金额为0元可直接结账', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.czysje=0;
                            this.jiehzang()
                        }
                    });
                }
            },

            //折扣率改动
            onzhekoul(val){
                console.log(val);
                this.czzklArr.forEach(item=>{
                    if(item.discountratio==val){
                        this.czzklzd=item.isall;
                        this.yingjine();      //金额计算
                        console.log(item)
                    }
                })
            },
            //抹零改动
            onmoling(val){
                console.log(val);
                this.yingjine();      //金额计算
               
            },
            // 订金勾选
            ondingsd(){
                 this.yingjine();      //金额计算
            },
            // 结账通用
            jiehzang(arr,psd){

                let djflag='';
                if(this.czdingjgx){
                    djflag=1;
                }else{
                    djflag=0;
                }
                let paytwo='';
                if(this.czdzfje>0){
                    paytwo=2;
                }else{
                    paytwo=1;
                }
                let payamount1='';
                if(this.czdzfje){
                    payamount1=this.czdzfje;
                }else{
                    payamount1=this.czysje;
                };
                let zklv=this.czzkl;
                if(zklv==''||zklv==null||zklv==undefined){
                    zklv=1;
                };
                let discountamount='';
                if(Number(this.czzklzd)==0){
                    discountamount=(Number(this.jiezhSArr.bottom.top1total)*(1-Number(zklv))+Number(this.czmlje)).toFixed(2)
                }else{
                    discountamount=(Number(this.czzobngje)*(1-Number(zklv))+Number(this.czmlje)).toFixed(2)
                }
                let data={
                    orderid:this.orderid,
                    tag:this.tag,
                    djflag:djflag,
                    customerid:this.viplist.customerid,
                    payamount:payamount1,
                    discountamount:discountamount,
                    discountamount1:this.czmlje,
                    discountratio:zklv,
                    paytype:arr,
                    paytwo:paytwo,
                    code:this.zfbwxddh,
                    passwd:psd,
                    quanid:this.qdshycs.quanid,
                    quannum:this.qdshycs.quannum,
                    isall:this.czzklzd
                };
                console.log(data);
                if(this.zfjgdd){
                    this.zfjgdd=false;
                    this.$post(this.$api.settleaccounts,data).then(data=>{
                        console.log(data);
                        this.zfjgdd=true;
                        if(data.code==0){
                            this.$message({
                                type: 'success',
                                message: '结账成功!'
                            });
                            this.xianjz=false;
                            this.jiezshow=false;
                            this.Opening=false;
                            this.zfbwx=false;
                            this.youhj=false;
                            this.youhjxz='';           //选中优惠券id
                            this.yhjslxie='';            //优惠券限制数量
                            this.yhjslsl=1;            //优惠券数量
                            this.quanmon='';           //优惠券面额
                            this.qdshycs={
                                quanid:'',              //使用卷id
                                quannum:'',              //使用的数量
                                quanmoney:'',            //卷面额
                            }

                            this.initList();
                        }else if(data.code==1000){
                            this.czdzfje=data.data;
                            this.czhyye=0;
                            this.czdingjgx=false;
                            this.$alert(data.msg, '结账提醒', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    // this.$message({
                                    //     type: 'info',
                                    //     message: `action: ${ action }`
                                    // });
                                }
                            });
                        }
                    })
                }

            },
            //结账2通用
            jiehzang2(arr){
                let customerid='';
                if(this.viplist.customerid){
                    customerid=this.viplist.customerid;
                }else if(this.qdzgl.customerid){
                    customerid=this.qdzgl.customerid
                }
                let zklv=this.czzkl;
                if(zklv==''||zklv==null||zklv==undefined){
                    zklv=1;
                }
                let discountamount='';
                if(Number(this.czzklzd)==0){
                    discountamount=(Number(this.jiezhSArr.bottom.top1total)*(1-Number(zklv))+Number(this.czmlje)).toFixed(2)
                }else{
                    discountamount=(Number(this.czzobngje)*(1-Number(zklv))+Number(this.czmlje)).toFixed(2)
                }
                console.log(typeof this.jiezhSArr.bottom.top1total);
                console.log(typeof this.czzkl);
                let data={
                    orderid:this.orderid,
                    tag:this.tag,
                    overtype:arr,
                    customerid:customerid,
                    payamount:this.czysje,
                    discountamount:discountamount,
                    discountamount1:this.czmlje,
                    discountratio:zklv,
                    quanid:this.qdshycs.quanid,
                    quannum:this.qdshycs.quannum,
                    isall:this.czzklzd
                };
                console.log(data);
                if(this.zfjgdd) {
                    this.zfjgdd = false;
                    this.$post(this.$api.settleaccountsovertype, data).then(data => {
                        console.log(data);
                        this.zfjgdd = true;
                        if (data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '结账成功!'
                            });
                            this.xianjz = false;
                            this.jiezshow = false;
                            this.Opening = false;
                            this.zfbwx = false;
                            this.qdshycs={
                                quanid:'',              //使用卷id
                                quannum:'',              //使用的数量
                                quanmoney:'',            //卷面额
                            }
                            this.initList();
                        }

                    })
                }
            },
            //现金结账
            onxinjn(){
                this.jiehzang(0)
            },
            // 支付宝 微信 
            onzfbwx(val){
                this.zfbwx=true;
                this.zfbwxbs=val;
                switch(val){
                    case 'zfb':
                        this.zfbwxTitle='支付宝结账';
                        break;
                    case 'wx':
                        this.zfbwxTitle='微信结账';
                        break;
                }
                console.log(val);
                setImmediate(function () {
                    document.querySelector(".zfbwx_cont input").focus();
                },500)
            },
            //银行卡结账
            onyingk(){
                this.$confirm('是否确定银行卡结账?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.jiehzang(7)

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            // 支付宝微信回车调用
            onzhifum(){
                this.onwxzfbqdsa();
            },
            // 微信支付宝确定结账
            onwxzfbqdsa(){
                if(this.zfbwxbs=='zfb'){
                    this.jiehzang(1)
                }else if(this.zfbwxbs=='wx'){
                    this.jiehzang(2)
                }
            },
            //签单资格查询
            onqdcx(){
                this.$post(this.$api.customersSearchsign,{phone:this.qdphone,orderid:this.orderid}).then(data=>{
                    if(data.code==0){
                        this.$message({
                            type: 'success',
                            message:'查询成功'
                        });
                        this.qdzgl=data.data;
                    }else if(data.code==10000){
                        this.qdzgl={
                            flag:'0'
                        };
                       // this.$message.error(data.msg);
                    }
                    console.log(data);
                })
            },
            // 签单确定结账
            onqdqds(){
                this.jiehzang2(1)
            },
            //免单结账
            onmiandan(){
                this.$confirm('是否确定免单结账?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.jiehzang2(4)

                })
            },
            //三倍充值免单结账
            onchongzmd(){
                if(this.viplist){
                    this.$confirm('是否确定三倍充值免单结账?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.jiehzang2(2)

                    }).catch(() => {
                        // this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        // });
                    });
                }else{
                    this.$message.error('请查询会员后再结账');
                }


            },
            // 霸王餐
            ponbasfw(){
                this.$confirm('是否确定霸王餐结账?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.jiehzang2(3)

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });

            },
        
            //余额支付
            onyuezf(){
                if(this.viplist){
                    this.$prompt('请输入支付码', '提示', {
                        inputType:'password',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        }).then(({ value }) => {
                         this.jiehzang(6,value)
                        })
                }else{
                    this.$message.error('请查询会员后再结账');
                }

            },
            shutDown(){
              this.initList()
            },
            shutDown4(){
                this.hyphone='';
            },
            shutDown5(){
                this.sqjine='';
            },
            shutDown6(){
                this.zfbwxddh='';
            },
            shutDown7(){
                this.qdphone='';
            },
            shutDown8(){
                this.Tcyua='';
            },
            shutDown9(){
                this.youhjxz='';
                this.yhjslxie='';
                this.yhjslsl=1;
                console.log('guanbi');
                
            },
            shutDown10(){
                 this.qdshycs={
                    quanid:'',              //使用卷id
                    quannum:'',              //使用的数量
                    quanmoney:'',            //卷面额
                }
            },
            //连台
            shutDown11LT(){
                this.hetailArr=[];
            }

        },
        mounted() {
            this.init();
            this.initList();
        }
    }
</script>

<style lang="scss">
    .DiningTablet {
        .el-dialog{
            width: 30%;
        }
        .Opening{
            .el-dialog{
                width: 70%;
                margin-top: 5vh !important;
            }
            .el-dialog__body{
                padding-top: 10px;
            }
            .el-dialog__title{
                font-size: 18px;
                font-weight: bold;
            }
            .zecayi{
                .el-dialog{
                    width: 20%;
                    margin-top:45vh !important;
                    .el-select{
                        width: 100%;
                    }
                }
            
            }
        }
        .Opening_top{
            .Opening_top_date{
                .el-input{
                    width: 50px;
                    input{
                        font-weight: bold;
                        font-size: 16px;
                        color: #333;
                        text-align: center;
                    }
                }
            }
        }
        /*合台*/
        .Close{
            .el-dialog{
                width: 60% !important;
            }
        }
        /*结账*/
        .BillPlease {
            .el-dialog {
                width: 60% !important;
                margin-top: 15vh !important;
            }
            .vipcx{
                .el-dialog {
                    width: 30% !important;
                    margin-top: 20vh !important;
                }
            }
            .xianjz{
                .el-dialog {
                    width: 30% !important;
                    margin-top: 20vh !important;
                }
            }
            .zfbwx{
                .el-dialog {
                    width: 30% !important;
                    margin-top: 20vh !important;
                }
            }
            .Signjz{
                .el-dialog {
                    width: 30% !important;
                    margin-top: 20vh !important;
                }
            }
            .youhj{
                 .el-dialog {
                    width: 20% !important;
                    margin-top: 20vh !important;
                }
            }
            .zhelkmolsd{
                .el-input{
                    .el-input__inner{
                        padding-left: 5px;
                        padding-right:5px;
                    }
                }

            }
        }
        /*退菜*/
        .Retreatca{
            .el-dialog {
                width: 20% !important;
                margin-top: 30vh !important;
                .el-dialog__body{
                    p{
                        margin: 10px 0;
                    }
                    .el-select{
                        width: 100%;
                        margin-bottom: 10px;
                    }
                }
            }

        }
    }

</style>
<style scoped lang="scss">
    .DiningTablet{
        background: #F2F2F2;
        padding:0 40px;
        min-height: 100%;
        .Position_top{
            padding-top: 30px;
        }
        .Position_cont_top{
            margin-top: 20px;
            >ul{
                display: flex;
                align-items: center;
                >li{
                    cursor: pointer;
                    font-size: 16px;
                    padding: 5px 20px;
                    font-weight: bold;
                }
                li:nth-child(1){
                    margin-left: 0;
                    padding-left: 0;
                }
                .Position_cont_top_hover{
                    font-size: 24px;
                    font-weight: bold;
                    color: #C82229;
                }
            }
        }
        .Position_cont_con{
            background: #fff;
           // padding-right: 20px;
            padding-bottom: 6px;
            margin-top: 20px;
            ul{
                display: flex;
                flex-wrap: wrap;
                >li{
                    width: 115.8px;
                    height: 90px;
                    background: #F2F2F2;
                    border-radius: 5px;
                    margin-top: 6px;
                    margin-left: 6px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                    cursor: pointer;
                    >p{
                        display: flex;
                        justify-content: space-between;
                        position: absolute;
                        width: 100%;
                        top:0;
                        font-size: 12px;
                        >span{
                            margin:  5px;
                        }
                    }
                    >div{
                        /*margin-top: 9.5px;*/
                        text-align: center;
                        font-size: 17px;
                        font-weight: bold;
                        >div{
                            font-size: 14px;
                            font-weight: 400;
                            margin-top: 5px;
                        }
                    }
                    >span{
                        position: absolute;
                        bottom: 5px;
                        right: 5px;
                        font-size: 12px;
                    }
                }
                >li:hover{
                    box-shadow: 5px 5px 8px #b1b1b1;
                }
                .Position_cont_con_hov{
                    background: #C82229;
                    color: #fff;
                }
            }
        }
        .Kickoff{
            .ctbh{
                display: flex;
                span{
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    margin-left: 5px;
                }
                div{
                    margin-right: 20px;
                }
            }
            .khrs{
               display: flex;
                margin-top: 30px;
                >div{
                   display: flex;
                   align-items: center;
                    .el-input{
                        width: 40%;
                        flex-grow: 1;
                        margin-left: 5px;
                    }
                    .el-select{
                        width: 40%;
                        flex-grow: 1;
                        margin-left: 5px;
                    }
                }
                >div:nth-child(2){
                    margin-left: 20px;
                }
            }
            .ktbz{
                margin-top: 30px;
                .el-textarea{
                    margin-top: 20px;
                }
            }
        }

        .Opening{
            .Opening_top{
                .Opening_top_date{
                    display: flex;
                    >div{
                        color: #999;
                        margin-right: 20px;
                        display: flex;
                        align-items: flex-end;
                        >span{
                            color: #333;
                            font-size: 16px;
                            font-weight: bold;
                            display: flex;
                            align-items: flex-end;
                            .el-input{
                                width: 50px;
                                input{
                                    font-weight: bold;
                                    color: #333;
                                }
                            }
                        }
                    }

                }
                .Opening_top_ktfs{
                    margin-top: 30px;
                    display: flex;
                    align-items: center;
                    color: #999;
                    >p{
                        >span{
                            color: #333;
                            font-size: 16px;
                            font-weight: bold;
                        }
                    }
                    >div{
                        margin: 0 30px;
                        display: flex;
                        align-items: center;
                        ul{
                            display: flex;
                            li{
                                padding: 5px 20px;
                                background: #FF9499;
                                color: #fff;
                                border-radius: 100px;
                                margin-right: 5px;
                                cursor: pointer;
                            }
                        }
                    }
                    >span{
                        i{
                            color:#FF9499 ;
                        }
                    }
                }
                .Opening_top_ztdj{
                    margin-top: 20px;
                    color: #999;
                    >span{
                        color: #333;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
                .Opening_top_ktbz{
                    //display: flex;
                    margin-top: 30px;
                    >p{
                        color: #999;

                        >span{
                            color: #333;
                        }
                    }
                    >div{
                        display: flex;
                        justify-content: flex-end;
                        >p{
                            margin-right: 20px;
                            >span{
                                color: #C82229;
                                font-size: 16px;
                                font-weight: bold;
                            }
                        }
                        >div{
                            >span{
                                color: #C82229;
                                font-size: 16px;
                                font-weight: bold;
                            }
                        }
                    }
                }
                border-bottom: 1px solid #FF9499;
                padding-bottom: 20px;
            }
            .Opening_Cont{
                margin-top: 20px;
                >h3{
                    font-weight: bold;
                    color: #333;
                    font-size: 18px;
                }
                .Opening_Cont_btn{
                    margin-top: 20px;
                }
            }
            .Opening_Cont_table{
                margin-top: 20px;
                /*height: 448px;*/
                /*overflow-x: auto;*/
            }
            /*连台 合台*/
            .Close{
               .Position_cont_top{
                   margin-top: 0;
               }
                .Position_cont_con{
                    margin-top: 10px;
                    height: 530px;
                    overflow-x: auto;

                    // ul{
                    //     /*height: 530px;*/
                    //     /*overflow-x: auto;*/
                    // }
                    li{
                        width: 128px;
                        height: 86px;
                    }

                }
                .Position_cont_con::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
                    height: 1px;
                }
                .Position_cont_con::-webkit-scrollbar-thumb {
                    /*滚动条里面小方块*/
                    border-radius: 10px;
                    -webkit-box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
                    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
                    background   :#b7b7b7;
                }
                .Position_cont_con::-webkit-scrollbar-track {
                    /*滚动条里面轨道*/
                    -webkit-box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
                    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    background   : #ededed;
                }
                .yxzct{
                    >p{
                        font-size: 18px;
                        font-weight: bold;
                        color: #333;
                    }
                    >ul{
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 20px;
                        li{
                            margin-right: 20px;
                            margin-bottom: 20px;
                        }
                    }
                }
            }
            /*点菜*/
            .jiacai{
                display: flex;
                .jiacai_l{
                    width: 54%;
                    margin-right: 2%;
                    .gwczc{
                        display: flex;
                        .el-button{
                            margin-left: 10px;
                        }
                    }
                    .jiacai_l_tij{
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 50px;
                    }
                }
                .jiacai_r{
                    width: 44%;
                    .jiacai_r_top{
                        padding-bottom: 20px;
                        border-bottom: 1px solid #E5E5E5;
                        ul{
                            display: flex;
                            flex-wrap: wrap;
                            align-items: flex-end;
                            li{
                                font-size: 14px;
                                color: #333;
                                cursor: pointer;
                                padding: 5px 10px;
                            }
                            .jiacai_r_top_hov{
                                font-size: 20px;
                                font-weight: bold;
                            }
                        }
                        .el-select{
                            width: 100%;
                        }

                    }
                    .jiacai_r_cont{
                        ul{
                            height: 670px;
                            overflow-x: auto;
                            li{
                                width: 31%;
                                margin-top: 20px;
                                margin-right: 3.3%;
                                float: left;
                                >p{
                                    img{
                                        width: 100%;
                                        height: 125px;
                                        border-radius: 15px;
                                    }
                                }
                                >div{
                                    display: flex;
                                    justify-content: center;
                                    color: #333;
                                    margin-top: 10px;
                                    >p{
                                        max-width: 100px;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                    >span{
                                        color: #C9161E;
                                        margin-left: 16px;
                                    }
                                    >.el-button{
                                        width: 60%;
                                        background-color:#C82229 ;
                                        padding: 8px 0;
                                        color: #fff;
                                        text-align: center;
                                        border-radius: 4px;
                                      //  cursor: pointer;
                                    }
                                }
                            }
                            li:nth-child(3n){
                                margin-right: 0;
                            }
                        }
                        /*ul::-webkit-scrollbar {*/
                        /*    !*滚动条整体样式*!*/
                        /*    width : 10px;  !*高宽分别对应横竖滚动条的尺寸*!*/
                        /*    height: 1px;*/
                        /*}*/
                        /*ul::-webkit-scrollbar-thumb {*/
                        /*    !*滚动条里面小方块*!*/
                        /*    border-radius: 10px;*/
                        /*    -webkit-box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);*/
                        /*    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);*/
                        /*    background   :#b7b7b7;*/
                        /*}*/
                        /*ul::-webkit-scrollbar-track {*/
                        /*    !*滚动条里面轨道*!*/
                        /*    -webkit-box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);*/
                        /*    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);*/
                        /*    border-radius: 10px;*/
                        /*    background   : #ededed;*/
                        /*}*/
                    }
                }
            }
            /*结账*/
            .BillPlease{
                .BillPlease_cont{
                    display: flex;
                    .BillPlease_cont_l{
                        width: 50%;
                        .BillPlease_cont_l_top{
                            display: flex;
                            font-size: 16px;
                            font-weight: bold;
                            align-items: center;
                            color: #333;
                            span{
                                color: #C82229;
                            }
                            .el-button{
                                margin-left: 30px;
                            }
                        }
                        .BillPlease_cont_l_tabl{
                            ul{
                                max-height: 500px;
                                overflow: hidden;
                                overflow-y:auto ;
                            }
                            li>p{
                                margin-top: 20px;
                                font-size: 16px;
                                font-weight: bold;
                                color: #333;
                            }
                            .el-table{
                                margin-top: 10px;

                            }
                            .BillPlease_cont_l_tabl_botom{
                                display: flex;
                                justify-content: flex-end;
                                margin-top: 20px;
                                >div{
                                    margin-left: 20px;
                                    >span{
                                        font-size: 16px;
                                        font-weight: bold;
                                        color:#C82229 ;
                                    }
                                }
                            }
                        }
                    }
                    .BillPlease_cont_r{
                        width: 47%;
                        margin-left: 3%;
                        .zhelkmolsd{
                            display: flex;
                            .zhelk,.molsd{
                                display: flex;
                                align-items: center;
                                margin-bottom: 15px;
                                margin-right: 15px;
                                .el-input{
                                    width: 100px;
                                    ::placeholder{
                                        font-size: 12px;
                                    }
                                    input{
                                        padding: 0 5px;
                                    }
                                }
                                .el-select{
                                    width: 100px;
                                    ::placeholder{
                                        font-size: 12px;
                                    }
                                    input{
                                        padding: 0 5px;
                                    }
                                }
                            }
                            .hycx{
                                margin-right: 15px;
                            }
                        }
                        .ysje{
                            display: flex;
                            align-items: flex-end;
                            span{
                                font-size: 16px;
                                font-weight: bold;
                                margin-right: 20px;
                                color:#C82229 ;
                            }
                        }
                        .dingj{
                            margin-bottom: 15px;
                            display: flex;
                            align-items: flex-end;
                            span{
                                font-size: 16px;
                                font-weight: bold;
                                color:#C82229 ;
                                margin-right: 20px;
                            }
                        }
                        .zffs{
                            margin-top: 15px;
                            >ul{
                                display: flex;
                                flex-wrap: wrap;
                                li{
                                    width: 30%;
                                    height: 108px;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    border:1px solid #CCCCCC;
                                    margin-top: 20px;
                                    margin-right: 5%;
                                    box-sizing: border-box;
                                    cursor: pointer;
                                    >p{
                                        text-align: center;
                                        img{
                                            width: 50px;
                                            height: 50px;
                                        }
                                    }
                                    >div{
                                        margin-top: 7px;
                                        text-align: center;
                                        color: #333;
                                        font-size: 16px;
                                    }
                                }
                                li:nth-child(3n){
                                    margin-right: 0;
                                }
                            }
                        }
                    }
                }
                /*vip查询*/
                .vipcx{
                    .huiycx{
                        .huiycx_top{
                            .el-input{
                                width: 300px;
                                margin-right: 15px;
                            }
                        }
                        .huiycx_cont{
                            margin-top: 20px;
                            .huiycx_cont_toux{
                                margin-top: 15px;
                                span{
                                    color:#C82229 ;
                                    font-size: 16px;
                                    font-weight: bold;
                                }
                            }
                            .huiycx_cont_yue{
                                margin-top: 15px;
                                >span{
                                    color:#C82229 ;
                                    font-size: 16px;
                                    font-weight: bold;
                                }
                            }
                            .huiycx_cont_hyzk{
                                display: flex;
                                margin-top: 15px;
                                span{
                                    color:#C82229 ;
                                    font-size: 16px;
                                    font-weight: bold;
                                }

                            }
                        }
                    }
                }
                /*现金结账*/
                .xianjz{
                    .xianjz_con{
                        >div{
                            margin-top: 20px;
                        }

                        span{
                            font-size: 16px;
                            font-weight: bold;
                            color: #333;
                        }
                        .xianjz_con_top{
                            display: flex;
                            align-items: center;
                            .el-input{
                                flex-grow:1 ;
                                width: 50%;
                            }
                        }
                    }
                }
                /*支付宝微信 银行卡*/
                .zfbwx{
                    .zfbwx_cont{
                        display: flex;
                        align-items: center;
                        .el-input{
                            flex-grow:1 ;
                            width: 50%;
                        }
                    }
                }
                /*签单支付*/
                .Signjz{
                    .Signjz_cont_cx{
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        .el-input{
                            margin-right: 20px;
                            width: 40%;
                            flex-grow: 1;
                        }
                    }
                    .Signjz_cont_kh{
                        margin-top: 10px;
                        span{
                            margin-right: 20px;
                            font-size: 16px;
                        }
                    }
                    .Signjz_cont_kqd{
                        margin-top: 15px;
                        span{
                            i{
                                font-size: 18px;
                                font-weight: bold;
                            }
                        }
                    }
                }
                // 优惠券
                .youhj{
                    .el-select{
                        width: 100%;
                    }
                    p{
                        margin: 10px 0;
                    }
                    .el-form-item__error_zdy{
                        color: #f56c6c;
                        font-size: 12px;
                        line-height: 1;
                        padding-top: 4px;
                        top: 100%;
                        left: 0;
                    }
                }
            }
        }
    }
</style>