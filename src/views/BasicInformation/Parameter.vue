<template>
    <div class="Parameter">
        <div class="Position_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                <el-breadcrumb-item>参数设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="cont">
            <div class="cont_top">
               <p>接收通知手机号：</p>
                <el-input placeholder="请输入手机号多个用逗号分开" v-model="Phone" clearable>
            </el-input>
            </div>
            <div class="cont_zdyc">
                <p>账单异常提醒</p>
                    <div>
                        <el-checkbox :checked="ycjz=='1'?true:false" v-model="ycjz" true-label="1" false-label="0" >异常结账（点过菜，退菜后0元结账）</el-checkbox>
                        <el-checkbox :checked="yczs=='1'?true:false" v-model="yczs"  true-label="1" false-label="0">返结赠送（该账单返结后赠送过菜品）</el-checkbox>
                        <el-checkbox :checked="fjtc=='1'?true:false" v-model="fjtc"  true-label="1" false-label="0">返结退菜（该账单返结后有退菜）</el-checkbox>
                        <el-checkbox :checked="fyjzs=='1'?true:false" v-model="fyjzs"  true-label="1" false-label="0">返预结赠送（取消预结后赠送菜品）</el-checkbox>
                        <el-checkbox :checked="fyjtc=='1'?true:false" v-model="fyjtc"  true-label="1" false-label="0">返预结退菜（取消预结后退菜）</el-checkbox>
                        <el-checkbox :checked="fjhyh=='1'?true:false" v-model="fjhyh"  true-label="1" false-label="0">返结后优惠（该账单返结后有优惠金额）</el-checkbox>
                    </div>
            </div>
            <div class="cont_yctz">
                <p>会员交易异常通知</p>
                <div>消费频次：每日单卡消费大于<el-input-number v-model="dkxf" :min="0" size="small"  label="描述文字"></el-input-number>次时提醒（为0不提醒）</div>
                <div>单次充值提醒：单次充值金额大于<el-input-number v-model="dccz"  :min="0" size="small"  label="描述文字"></el-input-number>元时提醒（为0不提醒）</div>
                <div>单次消费提醒：单次消费金额大于<el-input-number v-model="dcxf"  :min="0" size="small"  label="描述文字"></el-input-number>元时提醒（为0不提醒）</div>
            </div>
            <div class="cont_qisz">
                <p>其他设置</p>
                <div>
                    <div>茶位费：<el-input-number v-model="cwwf"  :min="0" size="small"  label="描述文字"></el-input-number> 为0不收取</div>
                    <div><el-checkbox :checked="bjfwf=='1'?true:false" v-model="bjfwf" true-label="1" false-label="0" >是否收取包间服务费</el-checkbox></div>
                    <div>支付参数设置vendor_sn<el-input placeholder="" size="small" v-model="sn" clearable /></div>
                    <div>支付参数设置vendor_key<el-input placeholder=""  size="small" v-model="key" clearable /></div>
                    <div>支付参数设置appid<el-input placeholder=""  size="small" v-model="appid" clearable /></div>
                </div>
            </div>
            <div class="save">
                <el-button type="primary" @click="onsave">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Parameter",
        data(){
          return{
              Phone:'',   //通知手机号
              ycjz:'0',     //异常结账
              yczs:'0',     //反结赠送
              fjtc:'0',     //反结退菜
              fyjzs:'0',    //反预结赠送
              fyjtc:'0',    //反预结退菜
              fjhyh:'0',     //反结后优惠
              dkxf:'',     //单卡消费
              dccz:'',     //单次充值
              dcxf:'',     //单次消费
              cwwf:'',     //茶位费
              bjfwf:'0',    //包间服务费
              sn:'',     //支付sn
              key:'',   //支付key
              appid:'',   //支付appid
          }
        },
        methods:{
            // 初始化
            init(){
                this.$post(this.$api.storesGet,{}).then(data=>{
                    if(data.code==0){
                        let datas=data.data;
                        console.log('参数获取',datas);
                        this.Phone=datas.phones;
                        this.ycjz=datas.ycjz;
                        this.yczs=datas.yczs;
                        this.fjtc=datas.fjtc;
                        this.fyjzs=datas.fyjzs;
                        this.fyjtc=datas.fyjtc;
                        this.fjhyh=datas.fjhyh;
                        this.dkxf=datas.kxgcs;
                        this.dccz=datas.diczje;
                        this.dcxf=datas.dcxfje;
                        this.cwwf=datas.seatmoney;
                        this.bjfwf=datas.servicer_flag;
                        this.sn=datas.vendor_sn;
                        this.key=datas.vendor_key;
                        this.appid=datas.appid;
                    }

                })
            },
            // 点击保存
            onsave(){
                this.$post(this.$api.storesSet,{
                    ycjz:this.ycjz,
                    yczs:this.yczs,
                    fjtc:this.fjtc,
                    fyjzs:this.fyjzs,
                    fyjtc:this.fyjtc,
                    fjhyh:this.fjhyh,
                    kxgcs:this.dkxf,
                    diczje:this.dccz,
                    dcxfje:this.dcxf,
                    phones:this.Phone,
                    vendor_sn:this.sn,
                    vendor_key:this.key,
                    appid:this.appid,
                    seatmoney:this.cwwf,
                    servicer_flag:this.bjfwf
                }).then(data=>{
                    if (data.code==0){
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        this.init();
                    }
                })
            }
        },
        mounted() {
            this.init();
        }

    }
</script>

<style scoped lang="scss">
    .Parameter{
        padding: 20px 40px;
        .cont{
            >div>p{
                color: #0a7df3;
                font-size: 18px;
            }
            .cont_top{
                margin-top: 20px;
                /*display: flex;*/
                /*align-items: center;*/
                .el-input{
                    width: 0;
                    min-width: 500px;
                    margin-top: 10px;
                }
            }
            .cont_zdyc{
                margin-top: 20px;
                >div{
                    margin-top: 10px;
                    display: flex;
                    flex-direction: column;
                    width: 600px;
                    >label{
                        margin-top: 10px;
                    }
                }
            }
            .cont_yctz{
                margin-top: 20px;
                >div{
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    >div{
                        margin: 0 5px;
                    }
                }
            }
            .cont_qisz{
                margin-top: 20px;
                >div{
                    >div{
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        .el-input-number{
                            margin: 0 10px;
                        }
                        .el-input{
                            width: 350px;
                            margin-left: 15px;
                        }
                    }
                }
            }
            .save{
                margin-top: 20px;
            }
        }
    }
</style>