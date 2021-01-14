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
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog
        :title="mode == 'add' ? '新增信息' : '编辑信息'"
        :visible.sync="dialogFormVisible"
      >
        <div style="color: red; margin-bottom: 20px">
          假冒网站域名,假冒网站Url,假冒网站IP,被仿冒网站域名与假冒APP下载地址和被仿冒APP不能同时添加
        </div>
        <el-form
          :model="addForm"
          status-icon
          :rules="rules"
          ref="addForm"
          label-width="140px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop="fakeDomainName" label="假冒网站域名">
                <el-input
                  ref="input"
                  @blur="blur"
                  :disabled="topParams"
                  v-model="addForm.fakeDomainName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="fakeUrl" label="假冒网站Url">
                <el-input
                  ref="input"
                  @blur="blur"
                  :disabled="topParams"
                  v-model="addForm.fakeUrl"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="fakeIp" label="假冒网站IP">
                <el-input
                  ref="input"
                  @blur="blur"
                  :disabled="topParams"
                  v-model="addForm.fakeIp"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="befakedDomainName" label="被仿冒网站域名">
                <el-input
                  ref="input"
                  @blur="blur"
                  :disabled="topParams"
                  v-model="addForm.befakedDomainName"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="fakeAppDownload" label="假冒APP下载地址">
                <el-input
                  ref="input2"
                  @blur="blur"
                  :disabled="buttomParams"
                  v-model="addForm.fakeAppDownload"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="befakedApp" label="被仿冒APP">
                <el-input
                  ref="input2"
                  @blur="blur"
                  :disabled="buttomParams"
                  v-model="addForm.befakedApp"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
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
          label="机构名称"
        /> -->
        <el-table-column
          align="center"
          prop="fakeDomainName"
          label="假冒网站域名"
        />
        <el-table-column align="center" prop="fakeUrl" label="假冒网站URL" />

        <el-table-column align="center" prop="fakeIp" label="假冒网站IP" />
        <el-table-column
          align="center"
          prop="befakedDomainName"
          label="被仿冒网站域名"
        />

        <el-table-column
          align="center"
          prop="fakeAppDownload"
          label="假冒APP下载地址"
        />
        <el-table-column align="center" prop="befakedApp" label="被仿冒APP" />

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
        <el-table-column align="center" prop="id" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)"> 编辑 </el-button>
            <el-button type="text" @click="details(scope.row)">
              详情
            </el-button>
            <!-- <el-button type="text" @click="del(scope.row.id)"> 删除 </el-button> -->
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
        ref="detailForm"
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
            <el-form-item prop="fakeIp" label="假冒网站IP">
              <el-input v-model="detailForm.fakeIp" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="fakeDomainName" label="假冒网站域名">
              <el-input v-model="detailForm.fakeDomainName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="fakeUrl" label="假冒网站Url">
              <el-input v-model="detailForm.fakeUrl" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="fakeAppDownload" label="假冒APP下载地址">
              <el-input
                v-model="detailForm.fakeAppDownload"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="befakedApp" label="被仿冒APP">
              <el-input v-model="detailForm.befakedApp" readonly></el-input>
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
  list,
  phishingQuery,
  phishingAdd,
  phishingDel,
  phishingEdit,
  phishingSend,
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
      topParams: false,
      buttomParams: false,
      form: {},
      id: "",
      list: [],
      checkedData: [],
      tableData: [],
      pageNumber: 0, //第一页
      pageSize: 20, //默认显示20条
      // sendStatus: 1,
      total: 0,
      params: {},
      dialogFormVisible: false,
      dialogDetailVisible: false,
      detailForm: {},
      addForm: {
        fakeDomainName: "",
        befakedDomainName: "",
        fakeUrl: "",
        fakeIp: "",
        befakedApp: "",
        fakeAppDownload: "",
      },
      rules: {
        // fakeDomainName: [
        //   { required: true, message: "设备感染IP不能为空", trigger: "blur" },
        //   { validator: validcodeip, trigger: "blur" },
        // ],
        // institutionShort: [
        //   { required: true, message: "机构简称不能为空", trigger: "blur" },
        // ],
        // institutionCode: [
        //   { required: true, message: "防病毒产品不能为空", trigger: "blur" },
        // ],
        // befakedApp: [
        //   { required: true, message: "机构所属地区不能为空", trigger: "blur" },
        // ],
        time: [{ required: true, message: "时间不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.initData();
  },
  watch: {},
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
    device_type(type) {
      let _type = "";
      if (type == 1) {
        _type = "终端";
      } else if (type == 2) {
        _type = "服务器";
      } else {
        _type = "其他";
      }
      return _type;
    },
    // $moment
    operatingTime(date) {
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    details(row) {
      this.detailForm = {
        createTime: row.createTime,
        fakeUrl: row.fakeUrl,
        institutionBranch: row.institutionBranch,
        id: row.id,
        sendStatus: this.send_status(row.sendStatus),
        time: row.time,
        version: row.version,
        fakeAppDownload: row.fakeAppDownload,
        befakedApp: row.befakedApp,
        fakeDomainName: row.fakeDomainName,
        fakeIp: row.fakeIp,
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
      const { data: data } = await phishingSend(form);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
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
          phishingDel(this.checkedData).then((res) => {
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
      this.topParams = false;
      this.buttomParams = false;
    },
    edit(row) {
      this.mode = "edit";
      this.dialogFormVisible = true;
      this.buttomParams = false;
      this.topParams = false;
      if (row.fakeAppDownload != "" || row.befakedApp != "") {
        this.buttomParams = false;
        this.topParams = true;
      } else {
        this.buttomParams = true;
        this.topParams = false;
      }
      if (
        row.fakeDomainName != null ||
        row.befakedDomainName != null ||
        row.fakeUrl != null ||
        row.fakeIp != null
      ) {
        this.buttomParams = true;
        this.topParams = false;
      } else {
        this.buttomParams = false;
        this.topParams = true;
      }
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
        this.addForm = {
          fakeAppDownload:
            row.fakeAppDownload == null ? "" : row.fakeAppDownload,
          createTime: row.createTime,
          fakeUrl: row.fakeUrl == null ? "" : row.fakeUrl,
          fakeIp: row.fakeIp == null ? "" : row.fakeIp,
          fakeDomainName: row.fakeDomainName == null ? "" : row.fakeDomainName,
          befakedDomainName:
            row.befakedDomainName == null ? "" : row.befakedDomainName,
          befakedApp: row.befakedApp == null ? "" : row.befakedApp,
          id: row.id,
          time: row.time,
          sendStatus: row.sendStatus,
        };
      });
    },
    blur() {
      if (
        this.addForm.fakeDomainName ||
        this.addForm.fakeUrl ||
        this.addForm.befakedDomainName ||
        this.addForm.fakeIp
      ) {
        this.buttomParams = true;
        this.topParams = false;
        return;
      } else {
        this.topParams = false;
        this.buttomParams = false;
      }
      if (this.addForm.fakeAppDownload || this.addForm.befakedApp) {
        this.topParams = true;
        this.buttomParams = false;
        return;
      } else {
        this.topParams = false;
        this.buttomParams = false;
      }
    },
    submitForm(formName) {
      if (JSON.stringify(this.addForm) == "{}") {
        this.$message.error("信息不能为空！");
        return;
      }
      if (Object.keys(this.addForm).length < 2) {
        this.$message.error("请填写相关信息！");
        return;
      }
      if (this.mode == "add") {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            phishingAdd(this.addForm).then((res) => {
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
        if (
          this.addForm.befakedDomainName == "" &&
          this.addForm.fakeDomainName == "" &&
          this.addForm.fakeUrl == "" &&
          this.addForm.fakeIp == "" &&
          this.addForm.befakedApp == "" &&
          this.addForm.fakeAppDownload == ""
        ) {
          this.$message.error("请完善信息！");
          return;
        }

        this.$refs.addForm.validate((valid) => {
          if (valid) {
            phishingEdit(this.addForm)
              .then((res) => {
                console.log(res);
                this.initData();
                this.dialogFormVisible = false;
                this.$message({
                  message: "修改成功！",
                  type: "success",
                });
              })
              .catch((err) => {
                console.log(err);
                this.$message.error("修改失败");
                this.dialogFormVisible = false;
                return false;
              });
          } else {
            this.$message.error("请完善信息！");
            return false;
          }
        });
      }
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
      const { data: data } = await phishingQuery(params);
      this.tableData = data.content;
      if (data.content.length < 1) {
        this.pageNumber = parseInt(data.totalPages - 1);
      }
      if (data.totalElements) {
        this.total = data.totalElements;
      } else {
        this.total = 0;
      }
    },
    currentChange(e) {
      this.pageNumber = parseInt(e - 1);
      this.initData();
    },
    searchAction() {
      if (this.form.createTime != "" && this.form.createTime != null) {
        this.params.createTime = this.form.createTime;
      } else {
        this.$delete(this.form, "createTime");
      }
      if (this.form.sendStatus) {
        this.params.sendStatus = this.form.sendStatus;
      } else {
        this.$delete(this.form, "sendStatus");
      }
      if (this.form.time != "" && this.form.time != null) {
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