<template>
	<div class="ReturnDetails">
		<div class="Position_top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>统计信息</el-breadcrumb-item>
				<el-breadcrumb-item>退菜明细</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="cont_top">
			<el-date-picker v-model="cxtime" type="daterange" range-separator="至" start-placeholder="开始日期"  clearable end-placeholder="结束日期"></el-date-picker>
			<el-cascader v-model="classifyid"  :options="classifyidArr" clearable   placeholder="请选择菜品分类"></el-cascader>
			<el-input placeholder="请输入菜品名称" v-model="dishname" clearable></el-input>
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
						prop="code"
						label="菜品编号"
						width="80" >
				</el-table-column>
				<el-table-column
						prop="dishename"
						label="菜品名称"
						width=""
				>
				</el-table-column>
				<el-table-column
						prop="unit"
						label="菜品单位"
						width="80">
				</el-table-column>
				<el-table-column
						prop="amount"
						label="退菜数量" align="right" width="80">
				</el-table-column>
				<el-table-column
						prop="price"
						label="退菜单价"
						width="80"
						align="right"
				>
				</el-table-column>
				<el-table-column
						prop="totalmoney"
						label="退菜金额" align="right"  width="80">
				</el-table-column>
				<el-table-column
						prop="memo"
						label="退菜原因"
						width="">
				</el-table-column>
				<el-table-column
						prop="intime"
						label="退菜时间"
						width=""
				>
				</el-table-column>
				<el-table-column
						prop="employeename"
						label="服务员"
						width="100">
				</el-table-column>
				<el-table-column
						prop="ordercode"
						label="开台单号">
				</el-table-column>
				<el-table-column
						prop="tablename"
						label="桌号" width="100">
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
        name: "ReturnDetails",
	    data(){
            return{
                cxtime:'',                //选着时间
                classifyidArr:[],        //菜品列表
                classifyid:'',        //菜品分类id
                dishname:'',          //菜品名字
	            lisrArr:[],          //列表
            }
	    },
	    methods:{
            //初始化
            init(){
                // 菜品分类下拉
                this.$post(this.$api.selectdishesclassfy).then(data=>{
                    console.log('菜品分类下拉',data);
                    this.classifyidArr=data.data
                });
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
                        classifyid:this.classifyid[1],
                        dishname:this.dishname
                    };
                    this.$post(this.$api.reportTuicaimingxi,data).then(data=>{
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
                            "退菜明细.xlsx"
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
	.ReturnDetails{
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
	.ReturnDetails{
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

