<template>
  <!--    //员工信息-->
  <div class="Employee">
    <div class="Position_top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        <el-breadcrumb-item>员工信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="Position_cont">
      <div>
        <el-button type="danger" icon="el-icon-plus" size="small" @click="onnew">员工新增</el-button>
      </div>
      <div class="Position_cont_table">
        <el-table :data="tableData" border style>
          <el-table-column fixed prop="employeeno" label="员工编号"></el-table-column>
          <el-table-column prop="name" label="员工姓名"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="discountamount" label="优惠金额上限"></el-table-column>
          <el-table-column prop="departmentname" label="部门"></el-table-column>
          <el-table-column prop="positionname" label="职位"></el-table-column>
          <el-table-column prop="rolename" label="权限组"></el-table-column>
          <el-table-column prop="opentime" label="最近编辑时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="324">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleClick(scope.row)" size="small">修改</el-button>
              <el-button type="primary" @click="ondelete(scope.row)" size="small">删除</el-button>
              <el-button type="primary"  @click="ModifytheXgMI=true;employeeid=scope.row.employeeid" size="small" >修改密码</el-button>
              <el-button type="primary" @click="onyouhuij(scope.row)" size="small">优惠金额</el-button>
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
        ></el-pagination>
      </div>
    </div>
    <!--        新增  修改-->
    <div class="Thepopup">
      <el-dialog :close-on-click-modal="false" :visible.sync="Modifythe" @close="shutDown">
        <div>
          <ul>
            <li>
              <p>员工编号：</p>
              <el-input v-model="Serial" placeholder="请输入编号" clearable></el-input>
            </li>
            <li>
              <p>员工姓名：</p>
              <el-input v-model="Jobtitle" placeholder="请输入姓名" clearable></el-input>
            </li>
            <li>
              <p>手机号：</p>
              <el-input v-model="Phone" placeholder="请输入手机号" clearable></el-input>
            </li>
            <li>
              <p>部门：</p>
              <el-select
                v-model="departmentname"
                clearable
                @change="ondepartment"
                placeholder="请选择部门"
              >
                <el-option
                  v-for="item in  departmentArr"
                  :key="item.departmentid"
                  :label="item.name"
                  :value="item.departmentid"
                ></el-option>
              </el-select>
            </li>
            <li>
              <p>职位：</p>
              <el-select
                v-model="positionname"
                clearable
                @change="onpositionname"
                placeholder="请选择职位"
              >
                <el-option
                  v-for="item in positionArr"
                  :key="item.positionid"
                  :label="item.name"
                  :value="item.positionid"
                ></el-option>
              </el-select>
            </li>
            <li>
              <p>权限组：</p>
              <el-select
                v-model="Authorityname"
                clearable
                @change="onAuthorityname"
                placeholder="请选择权限组"
              >
                <el-option
                  v-for="item in AuthorityArr"
                  :key="item.roleid"
                  :label="item.name"
                  :value="item.roleid"
                ></el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Modifythe = false">取 消</el-button>
          <el-button type="primary" @click="ondetermine">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 修改密码 -->
    <div class="xiugma">
      <el-dialog :close-on-click-modal="false" :visible.sync="ModifytheXgMI" @close="shutDown2" title="修改密码">
        <div>
          <el-input v-model="pswrd1" placeholder="请输入新密码" show-password></el-input>
          <el-input v-model="pswrd2" placeholder="再次输入新密码" show-password></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ModifytheXgMI = false">取 消</el-button>
          <el-button type="primary" @click="onxiugamm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Employee",
  data() {
    return {
      tableData: [],
      Modifythe: false, //弹出层开关
      Serial: "", //编号
      Jobtitle: "", //名称
      Phone: "", //手机
      Jopage: 1, //分页
      Josize: 10, //条数
      total: 0, //分页总条数
      positionid: "", //id
      type: "new", //new新增  edit修改
      departmentArr: [], //部门下拉列表
      departmentname: "",
      departmentval: "",
      positionArr: [], //职位下拉列表
      positionname: "",
      positionval: "",
      AuthorityArr: [], //权限组下拉列表
      Authorityname: "",
      Authorityval: "",
      employeeid: "", //员工id
      //修改密码
      ModifytheXgMI: false,
      pswrd1: "", //输入的新密码1
      pswrd2: "" //输入的新密码2
    };
  },
  methods: {
    // 初始化
    init() {
      this.Modifythe = false;
      this.Serial = "";
      this.Jobtitle = "";
      this.Phone = "";
      this.departmentval = "";
      this.Authorityval = "";
      this.positionval = "";
      this.departmentname = "";
      this.Authorityname = "";
      this.positionname = "";
      // 员工列表
      this.$post(this.$api.employeeslist, {
        page: this.Jopage,
        size: this.Josize
      }).then(data => {
        console.log("员工列表", data);
        if (data.code == 0) {
          this.tableData = data.data;
          this.total = data.count;
        }
      });
      this.$post(this.$api.selectposition, {}).then(data => {
        this.positionArr = data.data;
        console.log("职位下拉", data);
      });
      this.$post(this.$api.selectdept, {}).then(data => {
        this.departmentArr = data.data;
        console.log("部门下拉", data);
      });
      this.$post(this.$api.selectroles, {}).then(data => {
        this.AuthorityArr = data.data;
        console.log("权限下拉", data);
      });
    },
    // 部门选择
    ondepartment(val) {
      this.departmentval = val;
      // console.log(val);
    },
    // 职位选择
    onpositionname(val) {
      this.positionval = val;
    },
    // 权限选择
    onAuthorityname(val) {
      this.Authorityval = val;
    },
    // 新增
    onnew() {
      this.Modifythe = true;
      this.type = "new";
    },
    // 修改
    handleClick(row) {
      console.log(row);
      this.Modifythe = true;
      this.Jobtitle = row.name;
      this.Phone = row.phone;
      this.Serial = row.employeeno;
      this.Authorityname = row.rolename;
      this.departmentname = row.departmentname;
      this.positionname = row.positionname;
      this.employeeid = row.employeeid;
      this.departmentArr.forEach(item => {
        if (item.name == row.departmentname) {
          this.departmentval = item.departmentid;
          return;
        }
      });
      this.positionArr.forEach(item => {
        if (item.name == row.positionname) {
          this.positionval = item.positionid;
          return;
        }
      });
      this.AuthorityArr.forEach(item => {
        if (item.name == row.rolename) {
          this.Authorityval = item.roleid;
          return;
        }
      });
      this.type = "edit";
    },
    // 添加确定
    ondetermine() {
      if (this.type == "new") {
        //新增
        this.$post(this.$api.employeesAdd, {
          departmentid: this.departmentval,
          employeeno: this.Serial,
          name: this.Jobtitle,
          phone: this.Phone,
          roleid: this.Authorityval,
          positionid: this.positionval
        }).then(data => {
          if (data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.init();
          }
        });
      } else if (this.type == "edit") {
        // 修改
        this.$post(this.$api.employeesEdit, {
          employeeid: this.employeeid,
          departmentid: this.departmentval,
          employeeno: this.Serial,
          name: this.Jobtitle,
          phone: this.Phone,
          roleid: this.Authorityval,
          positionid: this.positionval
        }).then(data => {
          if (data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });

            this.init();
          }
        });
      }
    },
    // 删除
    ondelete(row) {
      this.$confirm(" 是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post(this.$api.employeesDel, {
            employeeid: row.employeeid
          }).then(data => {
            console.log(data);
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            }
          });
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    //修改密码
    onxiugamm() {
      if (this.pswrd1 == this.pswrd2) {
        this.$post(this.$api.roleseditpasswd, {
          employeeid: this.employeeid,
          passwd: this.pswrd2
        }).then(data => {
          console.log(data);
          if (data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.ModifytheXgMI=false;
          }
        });
      } else {
        this.$message({
          message: "两次密码不一致请重新输入",
          type: "error"
        });
      }
    },
    //优惠金额设置
    onyouhuij(row){
      this.$prompt('请输入要优惠的金额上限', '优惠金额', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$post(this.$api.roleseditdiscountamount,{employeeid:row.employeeid,discountamount:value}).then(data=>{
              if(data.code==0){
                  this.$message({
                  type: 'success',
                  message: '设置成功'
                });
                this.init();
              }
          })
        })
      
    },
    // 关闭弹框
    shutDown() {
      //清空表单值
      this.Modifythe = false;
      this.Serial = "";
      this.Jobtitle = "";
      this.Phone = "";
      this.departmentval = "";
      this.Authorityval = "";
      this.positionval = "";
      this.departmentname = "";
      this.Authorityname = "";
      this.positionname = "";
    },
    shutDown2(){
        this.pswrd2='';
        this.pswrd1='';
    },
    // 点击分页
    onpage(value) {
      this.Jopage = value;
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss">
.Employee .el-dialog {
  width: 20%;
}
</style>
<style scoped lang="scss">
.Employee {
  padding: 20px 40px;

  .Position_cont {
    margin-top: 30px;
  }
  .Position_cont_table {
    margin-top: 30px;
  }
  .Thepopup {
    > div {
      li {
        > p {
          margin-bottom: 10px;
        }
        margin-top: 15px;
        .el-select {
          width: 100%;
        }
      }
      li:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  .xiugma {
    > div {
      .el-input {
        margin-bottom: 20px;
      }
    }
  }
  .page {
    width: 725px;
    display: flex;
    /*justify-content: center;*/
    margin-top: 20px;
    /*padding-left: 40px;*/
  }
}
</style>