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
          <el-col>
            <div style="margin-bottom: 20px">
              <el-button type="primary" @click="add('add')">新增</el-button>
              <el-button type="danger" @click="del"> 删除 </el-button>

              <!-- <el-button type="danger" @click="sendData(1)"> 发送 </el-button> -->
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog
        :title="mode == 'add' ? '新增信息' : '编辑信息'"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          :model="addForm"
          status-icon
          :rules="rules"
          ref="addForm"
          label-width="140px"
        >
          <el-row>
            <el-col :span="18">
              <el-form-item prop="time" label="时间">
                <el-date-picker
                  v-model="addForm.time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="deviceTotal" label="防病毒设备总数">
                <el-input v-model="addForm.deviceTotal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item prop="institutionShort" label="机构简称">
                <el-input v-model="addForm.institutionShort"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="institutionCode" label="机构代码">
                <el-input v-model="addForm.institutionCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('addForm')">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>

      <el-table
        ref="multipleTable"
        :data="tableData"
        :highlight-current-row="true"
        :header-cell-style="{
          background: 'rgba(241,243,244,1)',
          color: '#909399',
          font: '14px',
          padding: '8px 0',
        }"
        @selection-change="handleSelectionChange"
        header-row-class-name="headerStyle"
        header-cell-class-name="headerCell"
        cell-class-name="rowStyle"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
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

        <!-- <el-table-column
          align="center"
          prop="institutionCode"
          label="机构代码"
        />
        <el-table-column
          align="center"
          prop="institutionShort"
          label="机构简称"
        /> -->
        <el-table-column
          align="center"
          prop="deviceTotal"
          label="防病毒的设备总数"
        />
        <el-table-column align="center" prop="sendStatus" label="发送状态">
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
        <el-table-column align="center" prop="id" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)"> 编辑 </el-button>
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

        <!-- <el-row>
          <el-col :span="12">
            <el-form-item prop="institutionShort" label="机构简称">
              <el-input
                v-model="detailForm.institutionShort"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="institutionCode" label="机构代码">
              <el-input
                v-model="detailForm.institutionCode"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item prop="time" label="时间">
              <el-input v-model="detailForm.time" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deviceTotal" label="防病毒的设备总数">
              <el-input v-model="detailForm.deviceTotal" readonly></el-input>
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
import {
  virusDeviceQuery,
  virusDeviceDel,
  virusDeviceAdd,
  virusDeviceEdit,
  virusDeviceSend,
} from "@/api/product";
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
      mode: "",
      checkedData: [],
      rules: {
        time: [{ required: true, message: "时间不能为空", trigger: "blur" }],
        deviceTotal: [
          { required: true, message: "设备总数不能为空", trigger: "blur" },
        ],
      },
      form: {},
      id: "",
      list: [],
      tableData: [],
      pageNumber: 0, //第一页
      pageSize: 20, //默认显示10条
      total: 0,
      params: {},
      dialogFormVisible: false,
      dialogDetailVisible: false,
      detailForm: {},
      addForm: {},
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
        createTime: row.createTime ? this.operatingTime(row.createTime) : "-",
        deviceTotal: row.deviceTotal,
        id: row.id,
        sendStatus: this.send_status(row.sendStatus),
        time: row.time ? this.operatingTime(row.time) : "-",
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
          this.initData();
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
      const { data: data } = await virusDeviceSend(form);
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
      const { data: data } = await virusDeviceQuery(params);
      this.tableData = data.content;
      if (data.totalPages) {
        this.total = data.totalPages;
      } else {
        this.total = 0;
      }
    },
    currentChange(e) {
      this.pageNumber = parseInt(e - 1);
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
      this.pageNumber = 0;
      this.initData();
    },
    Info(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "warning",
      });
    },
    handleSelectionChange(val) {
      this.checkedData = [];
      val.forEach((item) => {
        this.checkedData.push(item.id);
      });
      // this.multipleSelection = val;
    },
    del(id) {
      if (this.checkedData.length <= 0) {
        this.$message.error("至少选择一条数据");
        return;
      }
      this.$confirm("删除该行信息数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          virusDeviceDel(this.checkedData).then((res) => {
            this.initData();
            this.$message({
              message: "删除成功！",
              type: "success",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    add(mode) {
      this.addForm = {};
      this.mode = mode;
      this.dialogFormVisible = true;
    },
    edit(row) {
      this.mode = "edit";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
        this.addForm = {
          time: row.time,
          deviceTotal: row.deviceTotal,
          id: row.id,
        };
      });
    },
    submitForm(formName) {
      if (this.mode == "add") {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            virusDeviceAdd(this.addForm).then((res) => {
              this.initData();
              this.$nextTick(() => {
                this.$refs.addForm.resetFields();
              });
              this.dialogFormVisible = false;

              this.$message({
                message: "添加成功！",
                type: "success",
              });
            });
          } else {
            this.$message.error("请完善信息！");
            return false;
          }
        });
      } else {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            virusDeviceEdit(this.addForm).then((res) => {
              this.initData();
              this.dialogFormVisible = false;
              this.$message({
                message: "修改成功！",
                type: "success",
              });
            });
          } else {
            this.$message.error("请完善信息！");
            return false;
          }
        });
      }
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