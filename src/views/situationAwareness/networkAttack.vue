<template>
  <div>
    <el-card class="box-card">
      <el-form :model="form" ref="form" label-width="140px" class="form">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="sendStatus" label="发送状态：">
              <el-select v-model="form.sendStatus" placeholder="发送状态">
                <el-option label="未发送" value="1" />
                <el-option label="发送成功" value="2" />
                <el-option label="发送失败" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间：" prop="createTime">
              <el-date-picker
                v-model="form.createTime"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="text-align: right">
            <el-button type="primary" @click="searchAction(form)"
              >查询</el-button
            >
            <el-button type="info" @click="reset('form')">重置</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="选择日期：" prop="time">
              <!-- value-format="timestamp" value-format="yyyy-MM-dd"-->
              <el-date-picker
                v-model="form.time"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
        <el-form
          :model="addForm"
          status-icon
          :rules="rules"
          ref="addForm"
          label-width="200px"
        >
          <el-form-item label="假冒网站域名" prop="domains">
            <el-col :span="16">
              <el-input v-model="addForm.domains"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="假冒网站URL" prop="url">
            <el-col :span="16">
              <el-input v-model="addForm.url"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="假冒网站IP" prop="IP">
            <el-col :span="16">
              <el-input v-model="addForm.IP"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="被仿冒网站域名" prop="phishing">
            <el-col :span="16">
              <el-input v-model="addForm.phishing"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="假冒APP下载地址" prop="downloadAddress">
            <el-col :span="16">
              <el-input v-model="addForm.downloadAddress"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="被仿冒APP" prop="APP">
            <el-col :span="16">
              <el-input v-model="addForm.APP"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('addForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('addForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-table
        :data="tableData"
        :highlight-current-row="true"
        :header-cell-style="{
          background: 'rgba(241,243,244,1)',
          color: '#909399',
          font: '14px',
          padding: '8px 0',
        }"
        header-row-class-name="headerStyle"
        header-cell-class-name="headerCell"
        cell-class-name="rowStyle"
        style="width: 100%"
      >
        <el-table-column
          sortable
          align="center"
          prop="createTime"
          label="创建时间"
        >
          <template slot-scope="scope">
            <!-- moment(scope.row.createTime).format("YYYY-MM-DD") -->
            {{
              scope.row.createTime ? operatingTime(scope.row.createTime) : ""
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="sendStatus" label="发送状态">
          <template slot-scope="scope">
            {{ scope.row.sendStatus == "1" ? "未发送" : "发送成功" }}
          </template>
        </el-table-column> -->
        <el-table-column sortable align="center" prop="time" label="时间">
          <template slot-scope="scope">
            {{ scope.row.time ? operatingTime(scope.row.time) : "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sourceIp" label="攻击源地址" />
        <el-table-column align="center" prop="sourcePort" label="攻击源端口" />
        <el-table-column align="center" prop="protocol" label="协议" />
        <el-table-column
          align="center"
          prop="destinationIp"
          label="攻击目的地址"
        />
        <el-table-column
          align="center"
          prop="destinationPort"
          label="攻击目的地址端口号"
        />
        <el-table-column align="center" prop="targetSystem" label="目标系统" />
        <el-table-column align="center" prop="attackType" label="攻击类型" />

        <el-table-column
          align="center"
          prop="attackTypeSub"
          label="攻击类型细分子类"
        >
          <template slot-scope="scope">
            {{ scope.row.attackTypeSub ? scope.row.attackTypeSub : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isBanned " label="是否已封禁">
          <template slot-scope="scope">
            {{ scope.row.isBanned == false ? "否" : "是" }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isBlocked" label="是否已阻断">
          <template slot-scope="scope">
            {{ scope.row.isBlocked == false ? "否" : "是" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sendStatus"
          width="120"
          label="发送状态"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.sendStatus == '2'"
              :type="sendStatusType(scope.row.sendStatus)"
              @click="sendData(scope.row.id)"
              >{{ send_status(scope.row.sendStatus) }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="details(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页-->
      <div class="pagingStyle">
        <el-pagination
          :pageSize="pageSize"
          :total="total"
          :pageNumber="pageNumber"
          background
          layout="prev, pager, next"
          @current-change="currentChange"
        />
      </div>
    </el-card>
    <el-dialog
      class="dialog"
      title="详细信息"
      :visible.sync="dialogDetailVisible"
    >
      <el-form
        :model="detailForm"
        status-icon
        ref="addForm"
        label-width="140px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="createTime" label="创建时间">
              <el-input v-model="detailForm.createTime" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sendStatus" label="发送状态">
              <el-input v-model="detailForm.sendStatus" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="time" label="时间">
              <el-input v-model="detailForm.time" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sourceIp" label="攻击源地址">
              <el-input v-model="detailForm.sourceIp" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="sourcePort" label="攻击源端口">
              <el-input v-model="detailForm.sourcePort" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="protocol" label="协议">
              <el-input v-model="detailForm.protocol" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="targetSystem" label="目标系统">
              <el-input v-model="detailForm.targetSystem" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="attackType" label="攻击类型">
              <el-input v-model="detailForm.attackType" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="destinationIp" label="攻击目的地址">
              <el-input v-model="detailForm.destinationIp" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="destinationPort" label="攻击目的地址端口号">
              <el-input
                v-model="detailForm.destinationPort"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="attackTypeSub" label="攻击类型细分子类">
              <el-input v-model="detailForm.attackTypeSub" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="version" label="版本">
              <el-input v-model="detailForm.version" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="isBanned " label="是否已封禁">
              <el-input v-model="detailForm.isBanned" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="isBlocked" label="是否已阻断">
              <el-input v-model="detailForm.isBlocked" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="id " label="id">
              <el-input v-model="detailForm.id" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getOrderList } from "@/api/orderForm";
import { productList, list, virusTable, sendPeopleBank } from "@/api/product";
import moment from "moment";
export default {
  data() {
    //IP校验
    var validcodeip = (rule, value, callback) => {
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("输入格式不合法！"));
      }
    };
    return {
      rules: {},
      form: {},
      id: "",
      list: [],
      tableData: [],
      pageNumber: 1, //第一页
      pageSize: 10, //默认显示10条
      total: 0,
      params: {},
      dialogFormVisible: false,
      dialogDetailVisible: false,
      detailForm: {},
      addForm: {
        domains: "",
        url: "",
        IP: "",
        phishing: "",
        downloadAddress: "",
        APP: "",
        sourceIp: "",
      },
      rules: {},
    };
  },
  mounted() {
    this.initData();
  },
  computed: {},
  methods: {
    sendStatusType(value) {
      let status;
      switch (value) {
        case 1:
          status = "goon";
          break;
        case 2:
          status = "success";
          break;
        case 3:
          status = "danger";
          break;
        default:
      }
      return status;
    },
    send_status(status) {
      let _status = "";
      if (status == 1) {
        _status = "发送";
      } else if (status == 2) {
        _status = "发送成功";
      } else {
        _status = "发送失败";
      }
      return _status;
    },
    // $moment
    operatingTime(date) {
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    details(row) {
      this.detailForm = {
        sourceIp: row.sourceIp,
        attackType: row.attackType,
        attackTypeSub: row.attackTypeSub,
        createTime: row.createTime ? this.operatingTime(row.createTime) : "-",
        destinationIp: row.destinationIp,
        fileName: row.fileName,
        id: row.id,
        isBanned: row.isBanned ? "是" : "否",
        isBlocked: row.isBlocked ? "是" : "否",
        protocol: row.protocol,
        sendStatus: row.sendStatus == "1" ? "未发送" : "发生成功",
        destinationPort: row.destinationPort,
        sourcePort: row.sourcePort,
        targetSystem: row.targetSystem,
        time: row.time ? this.operatingTime(row.time) : "-",
        version: row.version,
      };
      this.dialogDetailVisible = true;
    },
    sendData(id) {
      this.$confirm("发送该行信息数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.bank(id);
          var that = this;
          that.initData();
          // setTimeout(function () {
          //   that.initData();
          // }, 500);
          this.$message({
            type: "success",
            message: "发送成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送",
          });
        });
    },
    async bank(id) {
      // const params = Object.assign({}, { id: 3656 });
      let form = new FormData();
      form.append("id", id);
      const { data: data } = await sendPeopleBank(form);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, value, callBack) => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      // this.$nextTick(() => {
      //   this.$refs[formName].resetFields();
      // });
    },
    async initData() {
      const params = Object.assign(
        {},
        { page: this.pageNumber, size: this.pageSize },
        this.form
      );
      const { data: data } = await list(params);
      this.tableData = data.content;
      if (data.totalPages) {
        this.total = data.totalPages;
      } else {
        this.total = 0;
      }
    },
    currentChange(e) {
      this.pageNumber = e;
      this.initData();
    },
    searchAction() {
      // const params = Object.assign({}, { page: this.pageNumber }, this.params);
      if (this.form.createTime) {
        this.params.createTime = this.form.createTime;
      } else {
        this.$delete(this.form, "createTime");
      }
      if (this.form.sendStatus) {
        this.params.sendStatus = this.form.sendStatus;
      } else {
        this.$delete(this.form, "sendStatus");
      }
      if (this.form.time) {
        this.params.time = this.form.time;
      } else {
        this.$delete(this.form, "time");
      }
      this.pageNumber = 1;
      this.initData();
    },
    Info(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "warning",
      });
    },
    add() {
      this.dialogFormVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-button--goon.is-active,
.el-button--goon:active {
  //#66b1ff
  background: #20b2aa;
  border-color: #20b2aa;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #48d1cc;
  border-color: #48d1cc;
  color: #fff;
}

.el-button--goon {
  color: #fff;
  background-color: #20b2aa;
  border-color: #20b2aa;
}
/deep/.dialog .el-input__inner {
  border: 0;
  border-radius: 0px;
  box-shadow: none;
}
</style>