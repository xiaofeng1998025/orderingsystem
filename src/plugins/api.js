let http='http://192.168.0.101:8080'; //开发测试
//let http='http://api.cqgyxg.com'; //生产线上
export default {
    add:http+'/api/positions/add', //新增职位
    login:http+'/api/employees/login',  //登录
    employeeslogout:http+'/api/employees/logout',  //退出登录
    updatepassword:http+'/api/employees/updatepassword', //修改密码

    list:http+'/api/positions/list',    //职位列表
    del:http+'/api/positions/del',     //删除职位
    edit:http+'/api/positions/edit',   //修改职位
    departmentsAdd:http+'/api/departments/add',  //部门新增
    departmentsList:http+'/api/departments/list',  //部门列表
    departmentsEdit:http+'/api/departments/edit',   //部门修改
    departmentsDel:http+'/api/departments/del',    //部门删除
    selectposition:http+'/api/common/selectposition',  //职位下拉列表
    selectdept:http+'/api/common/selectdept',   //部门下拉列表
    selectroles:http+'/api/common/selectroles',   //角色下拉
    employeesAdd:http+'/api/employees/add',      //员工新增
    employeeslist:http+'/api/employees/list',    //员工列表
    employeesEdit:http+'/api/employees/edit',   //员工修改
    employeesDel:http+'/api/employees/del',     //员工 删除

    dishesPrintadd:http+'/api/print/printadd',    //打印分类新增
    dishesPrintlist:http+'/api/print/printlist',  //打印分类列表
    dishesPrintedit:http+'/api/print/printedit',    //打印分类修改
    printPrintdel:http+'/api/print/printdel',          //打印分类删除


    selectemp:http+'/api/common/selectemp',     //负责人下拉
    areasAdd:http+'/api/areas/add',         //区域新增
    areasList:http+'/api/areas/list',        //区域列表
    areasChange:http+'/api/areas/change',    //区域开关
    areasEdit:http+'/api/areas/edit',      //区域修改
    areasDel:http+'/api/areas/del',      //区域删除
    selectareas:http+'/api/common/selectareas',   //区域信息下拉

    tablesadd:http+'/api/tables/tablesadd',        //餐台新增
    tableslist:http+'/api/tables/tableslist',      //餐台列表
    tablesChange:http+'/api/tables/change',        //餐桌开启关闭
    tablesedit:http+'/api/tables/tablesedit',   //餐台修改
    tablesTablesdel:http+'/api/tables/tablesdel', //餐台删除

    selectprintclassfy:http+'/api/common/selectprintclassfy',   //打印分类下拉
    printeradd:http+'/api/print/printeradd',          //打印新增
    printerlist:http+'/api/print/printerlist',    //打印机列表
    printerchange:http+'/api/print/printerchange',  //打印机开启关闭
    printeredit:http+'/api/print/printeredit',       //打印机修改
    printerdel:http+'/api/print/printerdel',        //打印机删除

    attachsAdd:http+'/api/attachs/add',   //原因新增
    attachsList:http+'/api/attachs/list',   //原因列表
    attachsEdit:http+'/api/attachs/edit',   //原因修改
    attachsDel:http+'/api/attachs/del',  //原因删除

    attachsAdd1:http+'/api/attachs/add1',   //菜品单位新增
    attachsList1:http+'/api/attachs/list1',   //菜品单位列表
    attachsEdit1:http+'/api/attachs/edit1',   //菜品单位修改
    attachsDel1:http+'/api/attachs/del1',  //菜品单位删除

    attachsAdd0:http+'/api/attachs/add0',   //仓库单位新增
    attachsList0:http+'/api/attachs/list0',   //仓库单位列表
    attachsEdit0:http+'/api/attachs/edit0',   //仓库单位修改
    attachsDel0:http+'/api/attachs/del0',  //仓库单位删除

    dishesclassfyadd:http+'/api/dishes/dishesclassfyadd',    //菜品分类新增
    dishesclassfylist:http+'/api/dishes/dishesclassfylist',   //菜品分类列表
    dishesclassfyedit:http+'/api/dishes/dishesclassfyedit',  //菜品分类修改
    dishesclassfydel:http+'/api/dishes/dishesclassfydel',   //菜品分类删除
    dishesclassfychangeisshow:http+'/api/dishes/dishesclassfychangeisshow',  //菜品分类显示
    dishesclassfychangestatus:http+'/api/dishes/dishesclassfychangestatus',   //菜品分类上下架设置

    methodsadd:http+'/api/dishes/methodsadd',     //制作方式新增
    selectdishesclassfy:http+'/api/common/selectdishesclassfy',   //分类下拉列表
    methodslist:http+'/api/dishes/methodslist',    //制作方式列表
    methodsedit:http+'/api/dishes/methodsedit',    //制作方式修改

    storesSet:http+'/api/stores/set',      //参数设置
    storesGet:http+'/api/stores/get',     //参数设置获取

    warehouseadd:http+'/api/goods/warehouseadd',   //仓库新增
    warehouselist:http+'/api/goods/warehouselist',  //仓库列表
    warehouseedit:http+'/api/goods/warehouseedit',  //仓库修改
    warehousedel:http+'/api/goods/warehousedel',    //仓库删除

    suppliersAdd:http+'/api/suppliers/add',       //供应商新增
    suppliersList:http+'/api/suppliers/list',       //供应商列表
    suppliersEdit:http+'/api/suppliers/edit',       //供应商修改
    suppliersdel:http+'/api/suppliers/del',        //供应商删除

    selecmaterialclassifys:http+'/api/common/selecmaterialclassifys',   //原料分类下拉
    materialclassifysadd:http+'/api/goods/materialclassifysadd',       //原料分类新增
    materialclassifyslist:http+'/api/goods/materialclassifyslist',    //原料分类列表
    materialclassifysedit:http+'/api/goods/materialclassifysedit',    //原料分类修改
    materialclassifysdel:http+'/api/goods/materialclassifysdel',      //原料分类删除

    selectattachs:http+'/api/common/selectattachs',      //原因 单位下拉
    selecmaterialclassifys2:http+'/api/common/selecmaterialclassifys2',   //原料分类下拉二级
    goodsadd:http+'/api/goods/goodsadd',            //原料新增
    goodslist:http+'/api/goods/goodslist',             //原料列表
    goodsedit:http+'/api/goods/goodsedit',            //原料修改
    goodsdel:http+'/api/goods/goodsdel',          //原料删除
    goodschukuadd:http+'/api/goods/goodschukuadd',    //原料出库新增
    selectbygoodsid:http+'/api/goods/selectbygoodsid',  //通过原料id获取原料单位价格
    goodschukulist:http+'/api/goods/goodschukulist',     //原料明细列表
    selectgoods2:http+'/api/common/selectgoods2',      //原料下拉专属接口
    goodschukuedit:http+'/api/goods/goodschukuedit',     //原料出库明细修改
    goodschukudel:http+'/api/goods/goodschukudel',      //原料出库删除

    selectsupplier:http+'/api/common/selectsupplier',      //供应商下拉
    goodsRukuadd:http+'/api/goods/rukuadd',            //原料入库新增
    goodsRukulist:http+'/api/goods/rukulist',          //原料入库列表
    goodsRukuedit:http+'/api/goods/rukuedit',        //原料入库修改

    goodsZhiboadd:http+'/api/goods/zhiboadd',        //原料直拨新增
    goodsZhibolist:http+'/api/goods/zhibolist',      //原料直拨列表
    goodsZhiboedit:http+'/api/goods/zhiboedit',      //原料直拨修改

    goodsRukucancel:http+'/api/goods/rukucancel',     //入库取消（直拨和入库公用）
    goodsRukuauth:http+'/api/goods/rukuauth',         //入库审核（直拨和入库公用）
    goodsGrukulist:http+'/api/goods/goodsrukulist',   //原料入库明细（直拨和入库公用）
    goodsGoodsrukuadd:http+'/api/goods/goodsrukuadd',  //原料入库明细新增（直拨和入库公用）
    goodsGoodsrukuedit:http+'/api/goods/goodsrukuedit', //原料入库明细修改（直拨和入库公用）
    goodsGoodsrukudel:http+'/api/goods/goodsrukudel',     //原料入库明细删除（直拨和入库公用）

    checkCheckmasteradd:http+'/api/check/checkmasteradd',    //盘点信息新增
    checkCheckmasterlist:http+'/api/check/checkmasterlist',  //盘点信息列表
    checkCheckmasteredit:http+'/api/check/checkmasteredit', //盘点信息修改
    checkCheckmasterauth:http+'/api/check/checkmasterauth',  //盘点信息审核
    checkCheckmastercancel:http+'/api/check/checkmastercancel',  //盘点信息取消
    checkCheckslaverlist:http+'/api/check/checkslaverlist',      //盘点明细列表
    checkCheckslaveradd:http+'/api/check/checkslaveradd',        //盘点明细新增
    checkCheckslaveredit:http+'/api/check/checkslaveredit',       //盘点明细修改
    checkCheckslaverdel:http+'/api/check/checkslaverdel',         //盘点明细删除

    lossLossadd:http+'/api/loss/lossadd',             //报损新增
    lossLosslist:http+'/api/loss/losslist',         //报损列表
    lossLossedit:http+'/api/loss/lossedit',        //报损修改
    lossLossauth:http+'/api/loss/lossauth',        //报损审核
    lossLosscancel:http+'/api/loss/losscancel',      //报损取消
    lossLossgoodslist:http+'/api/loss/lossgoodslist',    //报损明细列表
    lossLossgoodsadd:http+'/api/loss/lossgoodsadd',       //报损明细新增
    lossLossgoodsedit:http+'/api/loss/lossgoodsedit',     //报损明细修改
    lossLossgoodsdel:http+'/api/loss/lossgoodsdel',      //报损明细删除

    selectwarehouse:http+'/api/common/selectwarehouse',   //仓库下拉
    chukuad:http+'/api/goods/chukuadd',       //出库单新增
    chukulist:http+'/api/goods/chukulist',      //出库单列表
    chukuauth:http+'/api/goods/chukuauth',       //出库单审核
    chukuedit:http+'/api/goods/chukuedit',       //出库单修改
    goodstocklist:http+'/api/goods/goodstocklist',  //库存管理


    selectdishesmethods:http+'/api/common/selectdishesmethods',  //制作方式下拉
    dishesDishesadd:http+'/api/dishes/dishesadd',           //菜品新增
    disheslist:http+'/api/dishes/disheslist',            //菜品列表
    imgupload:http+'/api/common/imgupload',           //图片上传
    selectgoods:http+'/api/common/selectgoods',         //原料下拉选择三级
    dishesedit:http+'/api/dishes/dishesedit',          //菜品修改
    disheschangestatus:http+'/api/dishes/disheschangestatus',  //菜品上下架
    dishesdel:http+'/api/dishes/dishesdel',         //菜品删除
    setisauto:http+'/api/dishes/setisauto',         //菜品——设置自动销售
    setstate:http+'/api/dishes/setstate',            //菜品——设置是否可打折
    dishesguqinglist:http+'/api/dishes/dishesguqinglist',   //菜品沽清列表
    dishesguqing:http+'/api/dishes/dishesguqing',       //菜品沽清
    dishesamountguqing:http+'/api/dishes/dishesamountguqing',   //设置限量沽清

    dishesaddmethods:http+'/api/dishes/dishesaddmethods',      //添加规格
    disheslistmethods:http+'/api/dishes/disheslistmethods',      //规格列表
    dishesdelmethods:http+'/api/dishes/dishesdelmethods',        //规格删除

    dishespageadd:http+'/api/dishes/dishespageadd',        //菜品新增
    dishespagelist:http+'/api/dishes/dishespagelist',       //菜谱列表
    dishespagedel:http+'/api/dishes/dishespagedel',                 //菜谱删除
    dishespagechangestatus:http+'/api/dishes/dishespagechangestatus',   //菜谱状态切换

    customerslist:http+'/api/customers/customerslist',              //客户信息列表
    customersadd:http+'/api/customers/customersadd',              //客户新增
    customersdel:http+'/api/customers/customersdel',            //客户删除
    customersedit:http+'/api/customers/customersedit',           //客户修改
    setcuspasswd:http+'/api/customers/setcuspasswd',            //设置支付码


    customersAddvip:http+'/api/customers/addvip',            //vip客户新增
    customersAuthvip:http+'/api/customers/authvip',        //vip客户审核
    customersDelvip:http+'/api/customers/delvip',            //vip客户删除
    customersViplist:http+'/api/customers/viplist',         //vip 列表
    customersEditvip:http+'/api/customers/editvip',          //vip 修改

    customersAddsign:http+'/api/customers/addsign',       //签单客户新增
    customersListsign:http+'/api/customers/listsign',      //签单客户列表
    customersAuthsign:http+'/api/customers/authsign',    //签单客户审核
    customersDelsign:http+'/api/customers/delsign',      //签单客户删除
    customersEditsign:http+'/api/customers/editsign',     //签单客户修改
    customersDeposit:http+'/api/customers/deposit',        //充值
    customersAcountlist:http+'/api/customers/acountlist',   //账户管理
    depositinfo:http+'/api/customers/depositinfo',         //订金管理
    deposittoaccount:http+'/api/customers/deposittoaccount',     //订金转余额
    depositrefund:http+'/api/customers/depositrefund',           //订金退款

    consumptionlistbycusid:http+'/api/customers/consumptionlistbycusid',      //消费记录明细
    orderpayinfodetail:http+'/api/order/orderpayinfodetail',               //支付明细

    investslistbycid:http+'/api/customers/investslistbycid',       //账户充值记录
    signlistinfo:http+'/api/customers/signlistinfo',              //签单信息查询
    orderSignpay:http+'/api/order/signpay',                      //签单结账
    chongzhirefund:http+'/api/customers/chongzhirefund',          //充值退款



    arealist:http+'/api/order/arealist',    //点餐台头顶区域
    tablelist:http+'/api/order/tablelist',   //点餐台
    addorderinfo:http+'/api/order/addorderinfo',  //开台
    orderinfo:http+'/api/order/orderinfo',       //已开台详情
    orderHetai:http+'/api/order/hetai',           //合台 联台
    orderChange:http+'/api/order/change',          //转台
    orderEditnums:http+'/api/order/editnums',         //就餐人数修改
    dishesclassfy2:http+'/api/order/dishesclassfy2',   //点菜类型
    orderdisheslist:http+'/api/order/disheslist',          //菜品查询
    adddishes:http+'/api/order/adddishes',               //确认点菜
    orderCancel:http+'/api/order/cancel',            //取消开台
    orderOrderdisheslist:http+'/api/order/orderdisheslist',   //预结算点菜详情
    searchvip:http+'/api/customers/searchvip',                //会员查询
    customersSearchsign:http+'/api/customers/searchsign',       //签单资格查询
    disheschangeorder:http+'/api/order/disheschangeorder',       //点击转菜
    orderDishesdel:http+'/api/order/dishesdel',                 //点菜删除
    Tcselectattachs:http+'/api/common/selectattachs',               //退菜原因


    ordermasterlistinfo:http+'/api/order/ordermasterlistinfo',       //订单消费信息查询
    orderinfodetail:http+'/api/order/orderinfodetail',               //订单消费明细


    settleaccounts:http+'/api/order/settleaccounts',            //结账
    settleaccountsovertype:http+'/api/order/settleaccountsovertype',     //结账-非一般的结账
    settleaccounts2:http+'/api/order/settleaccounts2',            //结账2反结
    settleaccountsovertype2:http+'/api/order/settleaccountsovertype2',     //结账2-非一般的结账2

    fanjiefirst:http+'/api/order/fanjiefirst',                  //反结第一步
    fanjie:http+'/api/order/fanjie',                           //反结状态改变
    fanjiethird:http+'/api/order/fanjiethird',                    //反结退款
    changedishesamount:http+'/api/order/changedishesamount',       //已点菜数量调整



    selectbypinyin:http+'/api/goods/selectbypinyin',             //原料模糊查询
    selectdishesbypinyin:http+'/api/order/selectdishesbypinyin',    //菜品快捷模糊查询

    printdishes:http+'/api/order/printdishes',                 //补打印
    customersKouchu:http+'/api/customers/kouchu',              //订金违约扣除



    rolesAdd:http+'/api/roles/add',                            //角色新增
    rolesList:http+'/api/roles/list',                          //员工列表
    rolesEdit:http+'/api/roles/edit',                          //角色修改
    rolesDel:http+'/api/roles/del',                             //角色删除
    roleseditpasswd:http+'/api/employees/editpasswd',         //修改员工密码
    roleseditdiscountamount:http+'/api/employees/editdiscountamount',     //员工优惠金额

    employeesMenu:http+'/api/employees/menu',                   //导航列表
    showrolemenu:http+'/api/roles/showrolemenu',                //权限
    updaterolemenu:http+'/api/roles/updaterolemenu',            //权限修改

    employeesHome:http+'/api/employees/home',                   //首页统计

    printalldishes:http+'/api/order/printalldishes',            //菜单打印

    
    paytypeAdd:http+'/api/paytype/add',                          //优惠券新增
    paytypeList:http+'/api/paytype/list',                      //优惠券列表\
    paytchangestatus:http+'/api/paytype/changestatus',           //上架支付方式
    paytypeEdit:http+'/api/paytype/edit',                         //修改
    paytypeDel:http+'/api/paytype/del',                          //删除
    paytypeSelectpay:http+'/api/paytype/selectpay',             //获取支付方式
    selectallquan:http+'/api/paytype/selectallquan',           //获取优惠券
    
    selectdiscount:http+'/api/common/selectdiscount',           //折扣列表
    fanjiesecond:http+'/api/order/fanjiesecond',                  //反结菜单列表

    checkJiezhuan:http+'/api/check/jiezhuan',                   //月末转结

    reportTuicaimingxi:http+'/api/report/tuicaimingxi',           //退菜明细
    zengcaimingxi:http+'/api/report/zengcaimingxi',               //赠菜明细
    caipinxiaoshoutongji:http+'/api/report/caipinxiaoshoutongji',     //菜品销售统计表
    jiushuidan:http+"/api/report/jiushuidan",                            //酒水单
    reportQiandan:http+'/api/report/qiandan',                             //签单月份汇总
    zhangdanfukuanmingxi:http+'/api/report/zhangdanfukuanmingxi',          //账单付款明细表
    jiesuanfangshihuizongchaxun:http+'/api/report/jiesuanfangshihuizongchaxun',     //结算方式汇总
    yingyehuizong:http+'/api/report/yingyehuizong',                                 //营业汇总
    kaorderdetail:http+'/api/report/kaorderdetail',                                    //优惠卡往来
}