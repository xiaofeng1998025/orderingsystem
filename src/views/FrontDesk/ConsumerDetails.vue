<template>
    <div class="ConsumerDetails">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>前台管理</el-breadcrumb-item>
                <el-breadcrumb-item>消费查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="Position_cont">
            <!--            <div>-->
            <!--                <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">客户新增</el-button>-->
            <!--            </div>-->
            <div class="search">
                <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-select v-model="wjsd" clearable   placeholder="请选择消费类型">
                    <el-option
                            v-for="item in  wjsdArr"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入餐台编号" v-model="cxcode" clearable></el-input>
                <el-button type="primary" size="mini" @click="onInquire">查询</el-button>
            </div>
            <div class="Position_cont_table">
                <el-table
                        :data="tableData"
                        border
                        style="">
                    <el-table-column
                            fixed
                            prop="name"
                            label="餐台"
                            width="">
                    </el-table-column>

                    <el-table-column
                            prop="paytypedesc"
                            label="餐台形式"
                            width="">
                        <template slot-scope="scope">
                            <div v-if="scope.row.flag==0">单独</div>
                            <div v-if="scope.row.flag==1">合台</div>
                            <div v-if="scope.row.flag==2">连台</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="tables"
                            label="其他餐台"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="nums"
                            label="就餐人数"
                            width="">
                    </el-table-column>
                    <!-- <el-table-column
                            prop="seatsfee"
                            label="茶位费"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="tablefee"
                            label="服务费"
                            width="">
                    </el-table-column> -->
                    <el-table-column
                            prop="amountmoney"
                            label="点餐金额"
                            width="" align="right">
                    </el-table-column>
                    <el-table-column
                            prop="totalmoney"
                            label="消费总金额"
                            width="100" align="right">
                    </el-table-column>
                    <el-table-column
                            prop="discountamount"
                            label="优惠金额"
                            width="" align="right">
                    </el-table-column>
                    <el-table-column
                            prop="payamount"
                            label="支付金额"
                            width="" align="right">
                    </el-table-column>
                    <el-table-column
                            prop="overtype"
                            label="结账类型"
                            width="">
                        <template slot-scope="scope">
                            <div v-if="scope.row.overtype==0">正常结算</div>
                            <div v-if="scope.row.overtype==1">签单</div>
                            <div v-if="scope.row.overtype==2">三倍充值免单</div>
                            <div v-if="scope.row.overtype==3">霸王餐</div>
                            <div v-if="scope.row.overtype==4">免单</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status==0">开始</div>
                            <div v-if="scope.row.status==1">预结</div>
                            <div v-if="scope.row.status==2">返结</div>
                            <div v-if="scope.row.status==3">结账</div>
                            <div v-if="scope.row.status==4">签单未支付</div>
                            <div v-if="scope.row.status==5">签单已支付</div>
                            <div v-if="scope.row.status==6">反结已退款</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="ordertime"
                            label="开台时间"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="overtime"
                            label="结账时间"
                            width="160">
                    </el-table-column>

                    <el-table-column
                            prop="empname"
                            label="服务员"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="emp1name"
                            label="收银员"
                            width="">
                    </el-table-column>

                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="285">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="onxiaofx(scope.row)"  size="small">消费明细</el-button>
                            <el-button type="primary" @click="ondeletezf(scope.row)" size="small">支付明细</el-button>
                            <el-button v-if="scope.row.status==3||scope.row.status==5"  type="primary" @click="kaixxqfanj(scope.row)" size="small">消费反结</el-button>

                            <el-button v-if="scope.row.status==2||scope.row.status==6" type="primary" @click="kaixxq(scope.row)" size="small">结账</el-button>
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
<!--                消费明细-->
        <div class="Thepopup">
            <el-dialog :close-on-click-modal="false" :visible.sync="xiaofmx" title="消费明细">
                    <div>
                        <el-table
                                :data="xiaofeixArr"
                                border
                                style="">
                            <el-table-column
                                    prop="name"
                                    label="菜名"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="amountall"
                                    label="数量"
                                    width="">
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="单价"
                                    width="">
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
                                    label="单位"
                                    width="">
                            </el-table-column>
                            <el-table-column
                                    prop="empname"
                                    label="打折"
                                    width="">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.state==0">不打折</div>
                                    <div v-if="scope.row.state==1">打折</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="memo"
                                    label="备注"
                                    width="">
                            </el-table-column>
                            <el-table-column
                                    prop="totalmoney"
                                    label="小计"
                                    width="">
                            </el-table-column>
                        </el-table>
                    </div>
                <div slot="footer" class="dialog-footer">
<!--                    <el-button @click="xiaofmx = false">取 消</el-button>-->
                    <el-button type="primary" @click="xiaofmx = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
<!--                支付明细-->
        <div class="Thepopup">
            <el-dialog :close-on-click-modal="false" :visible.sync="zfmxshow" title="支付明细">
                <div>
                    <el-table
                            :data="zfmxArr"
                            border
                            style="">
                        <el-table-column
                                prop="name"
                                label="支付人"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="支付人电话"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="paytime"
                                label="支付时间"
                                width="160">
                        </el-table-column>
                        <el-table-column
                                prop="payamount"
                                label="支付金额"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="flag"
                                label="方式"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="paytype"
                                label="支付方式"
                                width="">
                            <template slot-scope="scope">
                                <div v-if="scope.row.paytype==0">现金</div>
                                <div v-if="scope.row.paytype==1">pos机</div>
                                <div v-if="scope.row.paytype==2">收钱吧</div>
                                <div v-if="scope.row.paytype==3">余额</div>
                                <div v-if="scope.row.paytype==4">优惠券</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="paytypedesc"
                                label="支付详细方式"
                                width="">
                            <template slot-scope="scope">
                                <div v-if="scope.row.paytypedesc==0">现金</div>
                                <div v-if="scope.row.paytypedesc==1">支付宝</div>
                                <div v-if="scope.row.paytypedesc==2">微信</div>
                                <div v-if="scope.row.paytypedesc==3">百度钱包</div>
                                <div v-if="scope.row.paytypedesc==4">京东钱包</div>
                                <div v-if="scope.row.paytypedesc==5">qq钱包</div>
                                <div v-if="scope.row.paytypedesc==6">余额</div>
                                <div v-if="scope.row.paytypedesc==7">银行卡</div>
                                <div v-if="scope.row.paytypedesc==8">优惠券</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div slot="footer" class="dialog-footer">
                    <!--                    <el-button @click="xiaofmx = false">取 消</el-button>-->
                    <el-button type="primary" @click="zfmxshow = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!--        消费反结-->
        <el-dialog title="消费反结" :close-on-click-modal="false"  :visible.sync="Opening" class="Opening" v-if="Opening" @close="shutDown" >
            <div class="Opening_Cont">
                <h3>已点菜品</h3>
                <div class="Opening_top_date">
                    <div>就餐人数： <span><el-input v-model="Ctxqnums" size="mini" @blur="onjcrs"></el-input></span></div>
                </div>
                <div class="Opening_Cont_btn">
                    <el-button type="danger" icon="el-icon-plus" @click="jiacai">加菜</el-button>
                    <el-button type="danger" @click="onplease">结账</el-button>
                    <el-button type="danger" @click="ontuikuan">退款</el-button>
                </div>
            </div>
            <div class="Opening_Cont_table">
                <el-table
                        ref="multipleTable"
                        :data="CtxqArr"
                        tooltip-effect="dark"
                        height="584"
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
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="数量">
<!--                        <template slot-scope="scope">-->
<!--                            <el-input-number v-model="scope.row.amount"  @change="handleChange(scope.row)" :min="1"  size="mini" label="描述文字"></el-input-number>-->
<!--                        </template>-->
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
<!--            <span slot="footer" class="dialog-footer">-->
<!--                -->
<!--           </span>-->
            <!--        退菜-->
            <el-dialog  title="退菜" :close-on-click-modal="false" :visible.sync="Retreatca" class="Retreatca" :modal-append-to-body="false" :modal="false" @close="shutDown8"  style="background:rgba(000,000,000,0.4);" >
                <p>退菜原因：</p>
                <el-select v-model="Tcyua" clearable placeholder="请选择">
                    <el-option
                            v-for="(item) in TcyuaArr"
                            :key="item.index"
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
            <!--        加菜弹窗-->
            <el-dialog  title="加菜" :close-on-click-modal="false" :visible.sync="vegetables" class="Opening" :modal-append-to-body="false" :modal="false"  style="background:rgba(000,000,000,0.4);" >
                <div class="jiacai">
                    <div class="jiacai_l">
                        <el-table
                                :data="tableDatajc"
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
                                    prop="price"
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
                                    <el-switch v-model="scope.row.flag" active-value="1" inactive-value="0" @change="chceaik(scope)" active-color="#409EFF" inactive-color="#999999"></el-switch>
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
                                        {{item.name}}<span>￥{{item.price}}</span>/份
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
            <el-dialog  title="结账" :close-on-click-modal="false" :visible.sync="jiezshow" class="BillPlease" :modal-append-to-body="false" :modal="false" v-if="jiezshow"  style="background:rgba(000,000,000,0.4);" >
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
                                                width="80">
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
                                                width="80">
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
                                                width="100">
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
                                <!-- 折扣率： <el-input placeholder="请输入折扣率" v-model="czzkl" clearable  @input="onzhekoul"></el-input> -->
                            </div>
                            <div class="molsd">
                                抹零金额：<el-input placeholder="请输入抹零金额" v-model="czmlje" clearable @input="onmoling"></el-input>
                            </div>
                            <div class="hycx">
                                <el-button type="danger" size="medium" @click="vipcx=true">会员查询</el-button>
                            </div>
                        </div>
                        <div class="dingj" v-if="czdingj>0">订金：<span>￥{{czdingj}}</span> <el-checkbox v-model="czdingjgx" @change="ondingsd">是否订金抵扣</el-checkbox></div>
                        <div class="ysje">
                            <div>应收金额：<span>￥{{czysje}}</span></div>
                            <div v-if="czdzfje">待支付金额：<span>￥{{czdzfje}}</span></div>
                            <div v-if="czhyye">会员余额：<span>￥{{czhyye}}</span></div>
                        </div>

                        <div class="zffs">
                            <p>支付方式</p>
                            <ul>
                                <li @click="xianjz=true">
                                    <p><img src="@img/xianjin@2x.png" style="width:40px" alt=""></p>
                                    <div>现金</div>
                                </li>
                                <li @click="onzfbwx('zfb')">
                                    <p><img src="@img/zhifubao(1)@2x.png" alt=""></p>
                                    <div>支付宝</div>
                                </li>
                                <li  @click="onzfbwx('wx')">
                                    <p><img src="@img/weixinzhifu@2x.png" style="width:57px" alt=""></p>
                                    <div>微信</div>
                                </li>
                                <li @click="onyingk">
                                    <p><img src="@img/yinhang@2x.png" style="width:60px" alt=""></p>
                                    <div>银行卡</div>
                                </li>
                                <li @click="onyuezf">
                                    <p><img src="@img/zhekou.png" alt=""></p>
                                    <div>余额</div>
                                </li>
                                <li @click="Signjz=true">
                                    <p><img src="@img/qiandan@2x.png" alt=""></p>
                                    <div>签单</div>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
                <!--                会员查询-->
                <el-dialog  title="会员查询"  :close-on-click-modal="false" :visible.sync="vipcx" class="vipcx" :modal-append-to-body="false" :modal="false" @close="shutDown4"  style="background:rgba(000,000,000,0.4);" >
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
                <el-dialog  title="现金结账" :close-on-click-modal="false" :visible.sync="xianjz" class="xianjz" :modal-append-to-body="false" :modal="false"  @close="shutDown5" style="background:rgba(000,000,000,0.4);" >
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
                        <el-button type="danger" @click="onxinjn"  :disabled="sqjine < Number(czysje)">确定结账</el-button>
                  </span>
                </el-dialog>
                <!--                支付宝 微信 银行卡结账-->
                <el-dialog  :title="zfbwxTitle" :close-on-click-modal="false" :visible.sync="zfbwx" class="zfbwx" :modal-append-to-body="false" :modal="false" @close="shutDown6" style="background:rgba(000,000,000,0.4);" >
                    <div class="zfbwx_cont" >
                        支付码：<el-input :autofocus="true"  v-model="zfbwxddh" @keyup.enter.native="onzhifum" clearable ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="zfbwx=false">取 消</el-button>
                        <el-button type="danger" @click="onwxzfbqdsa">确定结账</el-button>
                  </span>
                </el-dialog>
                <!--                签单结账-->
                <el-dialog  title="签单结账" :close-on-click-modal="false" :visible.sync="Signjz" class="Signjz" :modal-append-to-body="false" :modal="false" @close="shutDown7" style="background:rgba(000,000,000,0.4);" >
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
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ConsumerDetails",
        data(){
            return{
                tableData: [],
                Jopage:1,    //分页
                Josize:10,   //条数
                total:0,    //分页总条数
                //查询
                wjsd:'',           //结算未结算下拉
                wjsdArr:[
                    {
                        id:0,
                        label:"正常结算"
                    },{
                        id:1,
                        label:"签单"
                    },{
                        id:2,
                        label:"三倍充值免单"
                    },{
                        id:3,
                        label:"霸王餐"
                    },{
                        id:4,
                        label:"免单"
                    }
                ],         //结算未结算下拉列表
                date:'',       //查询日期
                cxcode:'',     //查询手机号
                //消费明细
                xiaofmx:false,     //消费明细弹框
                xiaofeixArr:[],   //消费明细列表
                // 支付明细
                zfmxshow:false,   //支付明细弹框
                zfmxArr:[],       //支付明细列表

                // 消费反结
                orderid:'',             //id
                //退菜
                Retreatca:false,   //退菜弹窗
                tcnume:'',         //退菜数量
                TcyuaArr:[],        //退菜原因列表
                Tcyua:'',           //退菜原因
                Tcid:'',             //退菜id
                //已开台
                Opening:false,    //以开台弹窗
                CtxqArr:[],      //餐台详情
                Ctxqnums:'',       //用餐人数
                handleSelectionCge:[],   //勾选的参数
                //加菜
                vegetables:false,    //加菜连台弹窗开关
                cpfllb:'',          //菜品分类
                cpfllbArr:[],      //菜品分类列表
                cplb:'',          //菜品列表id
                cplbArr:[],        //菜品列表
                tableDatajc:[],       //选择的菜品列表
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
                czzkl:'',         //折扣率
                czzklzd:'0',       //是否整单打折  0不是 1是
                czmlje:'',        //抹零金额
                czysje:'',         //结账应收金额
                czhyye:'',         //结账会员余额
                czdzfje:'',         //待支付金额
                czdingj:0,        //订金
                czzobngje:'',        //总金额
                czdingjgx:false,    //是否订金抵扣
                tag:'',            //1单节   2多台

                //会员查询
                vipcx:false,   ///会员查询开关
                hyphone:'',       //会员查询app
                viplist:'',        //会员详情信息
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
            // 初始化列表
            initList(){
                let startdate='';
                let enddate='';
                if(this.date){
                    startdate=this.timedate(this.date[0]);
                    enddate=this.timedate(this.date[1]);
                }
               // console.log(this.date);
                let data={
                    startdate:startdate,
                    enddate:enddate,
                    code:this.cxcode,
                    overtype:this.wjsd,
                    page:this.Jopage,
                    size:this.Josize
                };
              //  console.log(data);
                // 消费信息列表
                this.$post(this.$api.ordermasterlistinfo,data).then(data=>{
                    console.log('消费信息列表',data);
                    if(data.code==0){
                        this.tableData=data.data;
                        this.total=data.count;
                    }
                })
            },
            // 初始化
            init(){
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
                //折扣列表
                this.$post(this.$api.selectdiscount).then(data=>{
                    console.log('折扣列表',data);
                    if(data.code==0){
                       this.czzklArr=data.data;
                    }
                })
            },
            // 时间转换
            timedate(data){
                if( data instanceof Date){
                    let myDate=data;
                    let years=myDate.getFullYear();
                    let month=myDate.getMonth()+1;
                    let day=myDate.getDate();
                    if(month<10){
                        month='0'+month
                    }
                    if(day<10){
                        day='0'+day
                    }
                    return years+'-'+month+'-'+day
                }else{
                    return  data
                }
            },
            //点击查询
            onInquire(){
                this.initList();
            },
            // 支付明细
            ondeletezf(row){
                this.zfmxshow=true;
                this.$post(this.$api.orderpayinfodetail,{orderid:row.orderid}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.zfmxArr=data.data;
                    }
                })
            },
            // 消费明细
            onxiaofx(row){
                  this.xiaofmx=true;
                  this.$post(this.$api.orderinfodetail,{orderid:row.orderid}).then(data=>{
                      console.log(data);
                      if(data.code==0){
                          this.xiaofeixArr=data.data;
                      }
                  })
            },

            //点击反结状态
            kaixxqfanj(row){
                this.orderid=row.orderid;
                this.$confirm('是否确定授权反结?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.fanjie,{orderid:row.orderid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                message: '反结成功',
                                type: 'success'
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
            //点击结账
            kaixxq(row){
                this.orderid=row.orderid;
                this.xpxq();
            },
            //菜品详情
            xpxq(){
                this.$post(this.$api.fanjiefirst,{orderid:this.orderid}).then(data=>{
                    if(data.code==0){
                        this.Opening=true;
                        this.CtxqArr=data.data.list;
                        this.Ctxqnums=data.data.nums;
                    }
                    console.log(data);
                })
            },
            //就餐人数修改
            onjcrs(){
                this.$post(this.$api.orderEditnums,{orderid:this.orderid,nums:this.Ctxqnums}).then(data=>{
                    if (data.code == 0) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });

                    }
                })
            },
            //退款
            ontuikuan(){
                this.$confirm('是否确定退款?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.fanjiethird,{orderid:this.orderid}).then(data=>{
                        console.log(data);
                        if(data.code==0){
                            this.$message({
                                message: '退款成功',
                                type: 'success'
                            });
                        }
                    })
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            //菜品勾选
            handleSelectionChange(val){
                console.log(val);
                this.handleSelectionCge=val;
            },
            // 菜品数量修改
            handleChange(val){
                console.log(val);
                this.$post(this.$api.changedishesamount,{id:val.id,amount:val.amount}).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.$message({
                            message: '调整成功',
                            type: 'success'
                        });
                    }
                    this.xpxq();
                })
            },
            // 菜品删除
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
                        this.xpxq();
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
                //console.log(this.cpcxkj)
                if(!this.tableDatajc.some(item=>{return item.disheid==this.cpcxkj})){
                    this.tableDatajc.push(this.cpcxkj);
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
                if(!this.tableDatajc.some(item=>{return item.disheid==val.disheid})){
                    this.tableDatajc.push(val)
                }
            },
            //删除
            ondelete(val){
                //console.log(val);
                this.tableDatajc.splice(val.$index,1)
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
                this.tableDatajc.forEach(item=>{dishes.push({disheid:item.disheid,status:item.status,amount:item.amount1,flag:item.flag,memo:item.memo})});
                let data={
                    dishes:JSON.stringify(dishes),
                    orderid:this.orderid,
                    tag:0
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
                        this.xpxq();
                        this.tableDatajc=[]
                    }
                })
            },




            //点击结账
            onplease(){
                this.jiezshow=true;
                // this.tag=1;
                this.$post(this.$api.fanjiesecond,{orderid:this.orderid,}).then(data=>{
                    this.jiezhSArr=data.data;
                    this.czzobngje=data.data.bottom.setfeetotal+data.data.bottom.tablefee+data.data.bottom.top1total+data.data.bottom.top0total;
                    this.czysje=data.data.bottom.setfeetotal+data.data.bottom.tablefee+data.data.bottom.top1total+data.data.bottom.top0total;
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
             // 菜单打印
            onCdy(){
                this.$post(this.$api.printalldishes,{orderid:this.orderid}).then(data=>{
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
                if(this.viplist) {
                    this.czzkl = this.viplist.discountrate;
                    this.czhyye = this.viplist.groupbalance;
                    this.czdingj = this.viplist.dingjin;
                    this.czzklzd='0'
                    this.czzklArr.push({discountname:this.viplist.discountrate+'折会员',discountratio:this.viplist.discountrate,isall:'0'}) //折扣率追加一条
                    this.yingjine();      //金额计算
                    //this.czysje = (Number((this.jiezhSArr.bottom.top1total * this.viplist.discountrate).toFixed(2)) + (this.czzobngje - this.jiezhSArr.bottom.top1total) - this.czmlje).toFixed(2)
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
                let czzkl=this.czzkl;  //折扣率
                if(czzkl==''||czzkl==null||czzkl==undefined){
                    czzkl=1
                }
                // let youhuij=0;            //优惠券
                // if(this.qdshycs.quanid){
                //     youhuij=this.qdshycs.quannum*this.qdshycs.quanmoney;
                // }
                if(Number(this.czzklzd)==0){  //0正常折扣计算 1整单折扣计算
                    this.czysje=(Number((this.jiezhSArr.bottom.top1total*czzkl).toFixed(2))+(this.czzobngje-this.jiezhSArr.bottom.top1total)-Number(czmlje)-czdingj).toFixed(2);
                }else{
                    this.czysje=(Number((this.czzobngje*czzkl).toFixed(2))-Number(czmlje)-czdingj).toFixed(2);
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
                    // tag:this.tag,
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
                    isall:this.czzklzd
                };
                console.log(data);
                if(this.zfjgdd){
                    this.zfjgdd=false;
                    this.$post(this.$api.settleaccounts2,data).then(data=>{
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
                    // tag:this.tag,
                    overtype:arr,
                    customerid:customerid,
                    payamount:this.czysje,
                    discountamount:discountamount,
                    discountamount:this.czmlje,
                    discountratio:zklv,
                    isall:this.czzklzd
                };
                console.log(data);
                if(this.zfjgdd) {
                    this.zfjgdd = false;
                    this.$post(this.$api.settleaccountsovertype2, data).then(data => {
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
                this.onwxzfbqdsa()
            },
            // 微信支付宝确定结账
            onwxzfbqdsa(){
                if(this.zfbwxbs=='zfb'){
                    this.jiehzang(1)
                }else if(this.zfbwxbs=='wx'){
                    this.jiehzang(2);
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
                this.jiehzang2(1);
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
                this.initList();
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
    .ConsumerDetails .el-dialog{
        width: 40%;
    }
    .Opening{
        .el-dialog{
            width: 70%;
            margin-top: 10vh !important;
            .el-dialog__body{
                padding-top: 10px;
            }
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
        .zhelkmolsd{
            .el-input{
                .el-input__inner{
                    padding-left: 10px;
                    padding-right:10px;
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
</style>
<style scoped lang="scss">
    .ConsumerDetails{
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
            .el-date-editor{
                width: 300px;
                margin-right: 20px;
            }
            .el-select{
                width: 200px;
                margin-right: 20px;
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
                /*.Opening_top_ktbz{*/
                /*    //display: flex;*/
                /*    margin-top: 10px;*/
                /*    >p{*/
                /*        color: #999;*/

                /*        >span{*/
                /*            color: #333;*/
                /*        }*/
                /*    }*/
                /*    >div{*/
                /*        display: flex;*/
                /*        justify-content: flex-end;*/
                /*        >p{*/
                /*            margin-right: 20px;*/
                /*            >span{*/
                /*                color: #C82229;*/
                /*                font-size: 16px;*/
                /*                font-weight: bold;*/
                /*            }*/
                /*        }*/
                /*        >div{*/
                /*            >span{*/
                /*                color: #C82229;*/
                /*                font-size: 16px;*/
                /*                font-weight: bold;*/
                /*            }*/
                /*        }*/
                /*    }*/
                /*}*/
                border-bottom: 1px solid #FF9499;
                padding-bottom: 20px;
            }
            .Opening_Cont{
                /*margin-top: 20px;*/
                >h3{
                    font-weight: bold;
                    color: #333;
                    font-size: 18px;
                }
                .Opening_Cont_btn{
                    margin-top: 20px;
                }
                .Opening_top_date{
                    display: flex;
                    margin-top: 10px;
                    >div{

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
                                    color: #C82229;
                                }
                            }
                        }
                    }

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
                                margin-right: 20px;
                                .el-input{
                                    width: 125px;
                                }
                            }
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

            }
        }
    }
</style>