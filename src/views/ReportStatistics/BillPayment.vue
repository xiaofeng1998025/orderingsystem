<template>
	<div class="BillPayment">
		<div class="Position_top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>统计信息</el-breadcrumb-item>
				<el-breadcrumb-item>账单支付明细</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="cont_top">
			<el-date-picker v-model="cxtime" type="daterange" range-separator="至" start-placeholder="开始日期"  clearable end-placeholder="结束日期"></el-date-picker>
			<el-button type="primary" @click="onInquire">查 询</el-button>
			<el-button type="primary" @click="onExport">导 出</el-button>
		</div>
		<div class="cont_table">
			<el-table
					:data="lisrArr"
					border
					style="width: 100%"
					:row-class-name="tableRowClassName"
					:span-method="arraySpanMethod"
					id="out-table"
			>
				<el-table-column
						prop="orderid"
						label="订单流水号"
						width="100"  >
				</el-table-column>
				<el-table-column
						prop="tablename"
						label="台号"
						width=""
				>
				</el-table-column>
				<el-table-column
						prop="nums"
						label="就餐人数"
						width="" >
				</el-table-column>
				<el-table-column
						prop="totalmoney"
						label="消费金额" align="right" width="">
				</el-table-column>
				<el-table-column
						prop="discountamount"
						label="优惠金额"
						width=""  align="right" >
				</el-table-column>
				<el-table-column
						prop="freeamount"
						label="赠送金额"
						width="" align="right"
				>
				</el-table-column>
				<el-table-column
						prop="payamount"
						label="应付金额"
						width="" align="right">
				</el-table-column>
				<el-table-column
						prop="rmbamount"
						label="人民币" align="right" width="">
				</el-table-column>
				<el-table-column
						prop="bankamount"
						label="银行卡"
						width="" align="right" >
				</el-table-column>
				<el-table-column
						prop="zhifubaoamount"
						label="支付宝"
						width="" align="right"
				>
				</el-table-column>
				<el-table-column
						prop="weixinamount"
						label="微信"
						width="" align="right">
				</el-table-column>


				<el-table-column
						prop="youhuiquan"
						label="优惠券" align="right" width="140">
				</el-table-column>
				<el-table-column
						prop="tuangouyouhui"
						label="团购优惠"
						width=""  align="right">
				</el-table-column>
				<el-table-column
						prop="qiandanamount"
						label="签单"
						width="" align="right"
				>
				</el-table-column>
				<el-table-column
						prop="yueamount"
						label="储值卡"
						width="" align="right">
				</el-table-column>
				<el-table-column
						prop="sanbeiamount"
						label="三倍充值免单" align="right" width="">
				</el-table-column>
				<el-table-column
						prop="bawangamount"
						label="霸王餐" align="right" width="">
				</el-table-column>
				<el-table-column
						prop="miandanamount"
						label="免单"
						width="" align="right"  >
				</el-table-column>

				<el-table-column
						prop="employee1"
						label="收银员"
						width="" align="right"
				>
				</el-table-column>
				<el-table-column
						prop="ordertime"
						label="开台时间"
						width="160" >
				</el-table-column>
				<el-table-column
						prop="overtime"
						label="结账时间"  width="160">
				</el-table-column>
				<el-table-column
						prop="employee2"
						label="服务员" align="right" width="">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
    // 引入导出Excel表格依赖
    import FileSaver from "file-saver";
    import XLSX from "xlsx";
    export default {
        name: "BillPayment",
        data(){
            return{
                cxtime:'',                //选时间
                lisrArr:[],          //列表
            }
        },
        methods:{
            //初始化
            init(){

            },
            // 时间转换
            DateTime(date){
                if(date){
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
                }else{
                    return ''
                }

            },
            // 查询
            onInquire(){
                let data={
                    begin_date:this.DateTime(this.cxtime[0]),
                    end_date:this.DateTime(this.cxtime[1]),
                }
                this.$post(this.$api.zhangdanfukuanmingxi,data).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.lisrArr=data.data;
                    }
                })

            },
            //设置颜色 增加class
            tableRowClassName({row, rowIndex}) {
                // console.log(row);
                if(row.color=='1'){
                    return 'classBackground';
                }else{
                    return '';
                }
            },
            //合并表格行
            arraySpanMethod({ row, column, rowIndex, columnIndex }){
                if(row.flag=='1'){
                    // console.log(column);
                    // console.log(rowIndex);
                    return [1, 11];
                    // console.log(columnIndex);
                }
            },
            //导出表格
            onExport(){
                //定义导出Excel表格事件
                /* 从表生成工作簿对象 */
                var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
                //console.log(wb);
                /* 获取二进制字符串作为输出 */
                var wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    FileSaver.saveAs(
                        //Blob 对象表示一个不可变、原始数据的类文件对象。
                        //Blob 表示的不一定是JavaScript原生格式的数据。
                        //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                        //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                        new Blob([wbout], { type: "application/octet-stream" }),
                        //设置导出文件名称
                        "账单支付明细.xlsx"
                    );
                } catch (e) {
                    if (typeof console !== "undefined") console.log(e, wbout);
                }
                return wbout;
            }
        },
        mounted() {
            this.init();
            this.onInquire();
        }
    }
</script>

<style lang="scss">
	.BillPayment{
		.classBackground{
			background: #f7dbdb !important;
			color: red !important;
		}
		.el-table td{
			padding: 0 !important;
		}
	}

</style>
<style scoped lang="scss">
	.BillPayment{
		padding: 20px 40px;
		.cont_top{
			margin-top: 30px;
			.el-input,.el-cascader{
				width: 150px;
				margin-left: 20px;
			}
			.el-button{
				margin-left: 20px;
			}
		}
		.cont_table{
			margin-top: 30px;
		}
	}

</style>


