import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'   //首页
import Login from '../views/Login.vue'  //登录
import HelloWorld from "../components/HelloWorld";
import HomeIndex from "../views/HomeIndex";   //首页子组件
// 基本信息
import Position from "../views/BasicInformation/Position";  //职位信息
import Department from "../views/BasicInformation/Department";  //部门信息
import Employee from "../views/BasicInformation/Employee";    //员工信息
import Print from "../views/BasicInformation/Print";    //打印分类
import Region from "../views/BasicInformation/Region";   //区域信息
import DiningTable from "../views/BasicInformation/DiningTable";  //餐台信息
import Printer from "../views/BasicInformation/Printer";   //打印机
import TheReason from "../views/BasicInformation/TheReason";  //原因信息
import Parameter from "../views/BasicInformation/Parameter";  //参数设置
import PaymentSettings from "../views/BasicInformation/PaymentSettings";      //支付设置

//客户管理
import CustomerInformation from "../views/Client/CustomerInformation";  //客户信息
import VIPCustomers from "../views/Client/VIPCustomers";   //VIP客户
import Sign from "../views/Client/Sign";    //签单客户
import AccountNumber from "../views/Client/AccountNumber";  //账号管理
import Deposit from "../views/Client/Deposit";         //订金管理
import Signing from "../views/Client/Signing";         //签单信息

//仓库管理
import Ckunit from "../views/Warehouse/Ckunit";    //仓库单位
import Ckmanagement from "../views/Warehouse/Ckmanagement";  //仓库管理
import rawMaterialFl from "../views/Warehouse/rawMaterialFl";  //原料分类管理
import Ylgl from "../views/Warehouse/Ylgl";                  //原料管理
import OutboundManagement from "../views/Warehouse/OutboundManagement";  //原理出库管理
import Warehouse from "../views/Warehouse/Warehouse";            //原料入库管理
import DirectDial from "../views/Warehouse/DirectDial";          //原料直拨管理
import Inventory from "../views/Warehouse/Inventory";           //库房盘点管理
import Damaged from "../views/Warehouse/Damaged";            //库房报损管理
import Supplier from "../views/Warehouse/Supplier";          //供应商管理
import InventoryManagement from "../views/Warehouse/InventoryManagement";     //库存管理

//菜品管理
import Dishunit from "../views/Dishes/Dishunit";    //菜品单位
import Classification from "../views/Dishes/Classification";  //菜品分类
import ProductionMethod from "../views/Dishes/ProductionMethod";  //菜品制作方法
import DishManagement from "../views/Dishes/DishManagement";    //菜品管理
import Sell from "../views/Dishes/Sell";                      //菜品沽清
import Menu from "../views/Dishes/Menu";                     //菜谱管理

import Bookinformation from "../views/Bookmg/Bookinformation";   //预定信息

// 前台管理
import DiningTablet from "../views/FrontDesk/DiningTablet";    //餐台图
import ConsumerDetails from "../views/FrontDesk/ConsumerDetails";   //消费明细


import RoleInformation from "../views/Jurisdiction/RoleInformation";   //角色信息

//报表管理
import ReturnDetails from "../views/ReportStatistics/ReturnDetails";    //退菜明细
import Giftdetails from "../views/ReportStatistics/Giftdetails";          //赠菜明细
import SalesStatistics from "../views/ReportStatistics/SalesStatistics";    //菜品销售统计表
import WineList from "../views/ReportStatistics/WineList";                    //酒水单
import SigningSummary from "../views/ReportStatistics/SigningSummary";          //签单月份汇总
import BillPayment from "../views/ReportStatistics/BillPayment";                //账单支付明细
import SettlementMethod from "../views/ReportStatistics/SettlementMethod";       //结算方式汇总
import BusinessSummary from "../views/ReportStatistics/BusinessSummary";           //营业汇总
import DiscountCard from "../views/ReportStatistics/DiscountCard";                  //优惠卡往来

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
        {
          path: '/',
          name: 'home',
          component: HomeIndex,
      },
      {
        path: '/home/position',
        name: 'Position',
        component: Position,
      },
      {
        path: '/home/department',
        name: 'Department',
        component: Department,
      },
      {
        path: '/home/employee',
        name: 'Employee',
        component: Employee,
      },
      {
        path: '/home/roleInformation',
        name: 'RoleInformation',
        component: RoleInformation,
      },
      {
        path: '/home/print',
        name: 'Print',
        component: Print,
      },
      {
        path: '/home/region',
        name: 'Region',
        component: Region,
      },
      {
        path: '/home/diningTable',
        name: 'DiningTable',
        component: DiningTable,
      },
      {
        path: '/home/printer',
        name: 'Printer',
        component: Printer,
      },
      {
        path: '/home/theReason',
        name: 'TheReason',
        component: TheReason,
      },
      {
        path: '/home/parameter',
        name: 'Parameter',
        component: Parameter,
      },
      {
        path: '/home/dishunit',
        name: 'Dishunit',
        component: Dishunit,
      },
      {
        path: '/home/classification',
        name: 'Classification',
        component: Classification,
      },
      {
        path: '/home/productionMethod',
        name: 'ProductionMethod',
        component: ProductionMethod,
      },
      {
        path: '/home/customerInformation',
        name: 'CustomerInformation',
        component: CustomerInformation,
      },
      {
        path: '/home/vIPCustomers',
        name: 'VIPCustomers',
        component: VIPCustomers,
      },
      {
        path: '/home/sign',
        name: 'Sign',
        component: Sign,
      },
      {
        path: '/home/accountNumber',
        name: 'AccountNumber',
        component: AccountNumber,
      },
      {
        path: '/home/dishManagement',
        name: 'DishManagement',
        component: DishManagement,
      },
      {
        path: '/home/ckunit',
        name: 'Ckunit',
        component: Ckunit,
      },
      {
        path: '/home/ckmanagement',
        name: 'Ckmanagement',
        component: Ckmanagement,
      },
      {
        path: '/home/rawMaterialFl',
        name: 'rawMaterialFl',
        component: rawMaterialFl,
      },
      {
        path: '/home/ylgl',
        name: 'Ylgl',
        component: Ylgl,
      },
      {
        path: '/home/sell',
        name: 'Sell',
        component: Sell,
      },
      {
        path: '/home/menu',
        name: 'Menu',
        component: Menu,
      },
      {
        path: '/home/outboundManagement',
        name: 'OutboundManagement',
        component: OutboundManagement,
      },
      {
        path: '/home/warehouse',
        name: 'Warehouse',
        component: Warehouse,
      },
      {
          path: '/home/directDial',
          name: 'DirectDial',
          component: DirectDial,
      },
      {
          path: '/home/inventory',
          name: 'Inventory',
          component: Inventory,
      },
      {
          path: '/home/damaged',
          name: 'Damaged',
          component: Damaged,
      },
      {
          path: '/home/bookinformation',
          name: 'Bookinformation',
          component: Bookinformation,
      },
      {
        path: '/home/diningTablet',
        name: 'DiningTablet',
        component: DiningTablet,
      },
      {
        path: '/home/deposit',
        name: 'Deposit',
        component: Deposit,
      },
      {
        path: '/home/consumerDetails',
        name: 'ConsumerDetails',
        component: ConsumerDetails,
      },
      {
        path: '/home/Signing',
        name: 'Signing',
        component: Signing,
      },
      {
        path: '/home/Supplier',
        name: 'Supplier',
        component: Supplier,
      },
      {
        path: '/home/InventoryManagement',
        name: 'InventoryManagement',
        component: InventoryManagement,
      },
      {
        path: '/home/paymentSettings',
        name: 'PaymentSettings',
        component: PaymentSettings,
      },
      {
        path: '/home/returndetails',
        name: 'ReturnDetails',
        component: ReturnDetails,
      },
      {
        path: '/home/giftdetails',
        name: 'Giftdetails',
        component: Giftdetails,
      },
      {
        path: '/home/salesStatistics',
        name: 'SalesStatistics',
        component: SalesStatistics,
      },
      {
        path: '/home/wineList',
        name: 'WineList',
        component: WineList,
      },
      {
        path: '/home/signingSummary',
        name: 'SigningSummary',
        component: SigningSummary,
      },
      {
        path: '/home/BillPayment',
        name: 'BillPayment',
        component: BillPayment,
      },
      {
        path: '/home/SettlementMethod',
        name: 'SettlementMethod',
        component: SettlementMethod,
      },
      {
        path: '/home/BusinessSummary',
        name: 'BusinessSummary',
        component: BusinessSummary,
      },
      {
        path: '/home/DiscountCard',
        name: 'DiscountCard',
        component: DiscountCard,
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')

  }
]

const router = new VueRouter({
  routes
})

export default router
