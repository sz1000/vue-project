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
        <el-form
          :model="addForm"
          status-icon
          :rules="rules"
          ref="addForm"
          label-width="140px"
        >
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
            <el-col :span="12">
              <el-form-item prop="virusName" label="病毒名称">
                <el-input v-model="addForm.virusName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item prop="institutionCode" label="机构代码">
                <el-input v-model="addForm.institutionCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="institutionShort" label="机构简称">
                <el-input v-model="addForm.institutionShort"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="12">
              <el-form-item prop="institutionBranch" label="分支机构名称">
                <el-input v-model="addForm.institutionBranch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="antiVirusProduct" label="防病毒产品">
                <el-input v-model="addForm.antiVirusProduct"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="institutionBranchArea" label="机构所属地区">
                <el-input v-model="addForm.institutionBranchArea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="deviceAddress" label="感染设备IP">
                <el-input v-model="addForm.deviceAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="deviceType" label="感染设备类型">
                <el-select
                  v-model="addForm.deviceType"
                  placeholder="感染设备类型"
                >
                  <el-option label="终端" :value="1" />
                  <el-option label="服务器" :value="2" />
                  <el-option label="其他" :value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- <el-form-item prop="virusType" label="病毒类型">
                <el-input v-model="addForm.virusType"></el-input>
              </el-form-item> -->
              <el-form-item prop="virusType" label="病毒类型">
                <el-select v-model="addForm.virusType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item prop="virusType" label="病毒类型">
                <el-select v-model="addForm.virusType" placeholder="病毒类型">
                  <el-option label="广告软件" :value="'P02-01'" />
                </el-select>
              </el-form-item> -->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="state" label="处置状态">
                <el-select v-model="addForm.state" placeholder="处置状态">
                  <el-option label="已查杀" :value="1" />
                </el-select>
                <!-- <el-input v-model="addForm.state"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="deviceName" label="感染设备主机名">
                <el-input v-model="addForm.deviceName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="hashName" label="哈希算法">
                <el-input v-model="addForm.hashName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="virusUnifyHashcode" label="病毒统一哈希值">
                <el-input v-model="addForm.virusUnifyHashcode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="virusHashcode" label="病毒哈希值">
                <el-input v-model="addForm.virusHashcode"></el-input>
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
        <el-table-column
          align="center"
          prop="institutionBranch"
          label="分支机构名称"
        />
        <el-table-column
          align="center"
          prop="institutionBranchArea"
          label="机构所属地区"
        />
        <el-table-column
          align="center"
          prop="deviceAddress"
          label="感染设备IP"
        />
        <el-table-column
          align="center"
          prop="deviceName"
          label="感染设备的主机名"
        />
        <el-table-column align="center" prop="virusHashcode" label="病毒哈希值">
          <template slot-scope="scope">
            {{ scope.row.virusHashcode ? "scope.row.virusHashcode" : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="hashName" label="哈希算法" />
        <el-table-column align="center" prop="virusType" label="病毒类型">
          <!-- <template slot-scope="scope">
            {{ virusType(scope.row.virusType) }}
          </template> -->
        </el-table-column>
        <el-table-column align="center" prop="virusTypeDesc" label="病毒描述" />
        <el-table-column align="center" prop="virusName" label="病毒名称" />
        <el-table-column
          align="center"
          prop="antiVirusProduct"
          label="防病毒产品"
        />
        <el-table-column align="center" prop="deviceType" label="感染设备类型">
          <template slot-scope="scope">
            {{ device_type(scope.row.deviceType) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="state" label="处置状态">
          <template slot-scope="scope">
            {{ scope.row.state == 1 ? "已查杀" : "--" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="virusUnifyHashcode"
          label="病毒统一哈希值"
        >
          <template slot-scope="scope">
            {{
              scope.row.virusUnifyHashcode ? scope.row.virusUnifyHashcode : "-"
            }}
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
        <el-table-column align="center" prop="id" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="scope.row.sendStatus == '2'"
              @click="edit(scope.row)"
            >
              编辑
            </el-button>
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
            <el-form-item prop="institutionBranch" label="分支机构名称">
              <el-input
                v-model="detailForm.institutionBranch"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="institutionBranchArea" label="机构所属地区">
              <el-input
                v-model="detailForm.institutionBranchArea"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deviceAddress" label="感染设备IP">
              <el-input v-model="detailForm.deviceAddress" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="deviceName" label="感染设备的主机名">
              <el-input v-model="detailForm.deviceName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="virusHashcode" label="病毒哈希值">
              <el-input v-model="detailForm.virusHashcode" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="virusType" label="病毒类型">
              <el-input v-model="detailForm.virusType" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="virusTypeDesc" label="病毒描述">
              <el-input v-model="detailForm.virusTypeDesc" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="virusName" label="病毒名称">
              <el-input v-model="detailForm.virusName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deviceType" label="感染设备类型">
              <el-input v-model="detailForm.deviceType" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="state " label="处置状态">
              <el-input v-model="detailForm.state" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="virusUnifyHashcode" label="病毒统一哈希值">
              <el-input
                v-model="detailForm.virusUnifyHashcode"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="hashName" label="哈希算法">
              <el-input v-model="detailForm.hashName" readonly></el-input>
            </el-form-item>
          </el-col>
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
  virusTable,
  virusAdd,
  virusDel,
  virusEdit,
  virusSend,
  virusTypeQuery,
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
      form: {},
      id: "",
      list: [],
      options: [],
      value: "",
      checkedData: [],
      tableData: [],
      pageNumber: 0, //第一页
      pageSize: 20, //默认显示20条
      total: 0,
      params: {},
      dialogFormVisible: false,
      dialogDetailVisible: false,
      detailForm: {},
      addForm: {
        deviceType: "",
        sendStatus: "",
        deviceName: "",
        antiVirusProduct: "",
        createTime: "",
        deviceAddress: "",
        hashName: "",
        institutionBranch: "",
        institutionBranchArea: "",
        institutionCode: "",
        institutionShort: "",
        time: "",
        version: "",
        virusHashcode: "",
        virusName: "",
      },
      rules: {
        time: [{ required: true, message: "时间不能为空", trigger: "blur" }],
        virusName: [
          { required: true, message: "病毒名称不能为空", trigger: "blur" },
        ],
        institutionBranch: [
          { required: true, message: "分支机构名称不能为空", trigger: "blur" },
        ],
        deviceAddress: [
          { required: true, message: "设备感染IP不能为空", trigger: "blur" },
          { validator: validcodeip, trigger: "blur" },
        ],
        antiVirusProduct: [
          { required: true, message: "防病毒产品不能为空", trigger: "blur" },
        ],
        institutionBranchArea: [
          { required: true, message: "机构所属地区不能为空", trigger: "blur" },
        ],
        deviceType: [
          { required: true, message: "设备类型不能为空", trigger: "blur" },
        ],
        state: [
          { required: true, message: "处置状态不能为空", trigger: "blur" },
        ],
        virusType: [
          { required: true, message: "病毒类型不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getVirusType();
    this.initData();
  },
  computed: {},
  methods: {
    async getVirusType() {
      const { data: data } = await virusTypeQuery();
      for (let key in data) {
        this.options.push({
          value: key,
          label: data[key],
        });
      }
      // console.log(this.options);
    },
    // virusType(type) {
    //   let _type;
    //   switch (type) {
    //     case "P02-01":
    //       _type = "广告软件";
    //       break;
    //     case "P02-02":
    //       _type = "后门程序";
    //       break;
    //     case "P02-03":
    //       _type = "MBR引导区病毒";
    //       break;
    //     case "P02-04":
    //       _type = "漏洞利用";
    //       break;
    //     case "P02-05":
    //       _type = "浏览器漏洞利用";
    //       break;
    //     case "P02-06":
    //       _type = "挖矿病毒";
    //     case "P02-07":
    //       _type = "分布式拒绝服务攻击病毒";
    //       break;
    //     case "P02-08":
    //       _type = "拨号软件";
    //       break;
    //     case "P02-09":
    //       _type = "黑客工具";
    //       break;
    //     case "P02-10":
    //       _type = "玩笑程序";
    //       break;
    //     case "P01-11":
    //       _type = "PUA";
    //       break;
    //     case "P02-12":
    //       _type = "勒索软件";
    //       break;
    //     case "P02-13":
    //       _type = "Rootkit";
    //       break;
    //     case "P02-14":
    //       _type = "间谍软件";
    //       break;
    //     case "P02-15":
    //       _type = "木马";
    //       break;
    //     case "P02-16":
    //       _type = "TrojanClicker";
    //       break;
    //     case "P02-17":
    //       _type = "木马代理";
    //     case "P02-18":
    //       _type = "木马间谍软件";
    //       break;
    //     case "P02-19":
    //       _type = "感染型病毒";
    //       break;
    //     case "P02-20":
    //       _type = "蠕虫";
    //       break;
    //     case "P02-21":
    //       _type = "银行类木马";
    //       break;
    //     case "P02-22":
    //       _type = "（生成）病毒相关工具";
    //       break;
    //     case "P02-23":
    //       _type = "风险程序";
    //       break;
    //     case "P02-24":
    //       _type = "木马释放器";
    //       break;
    //     case "P02-25":
    //       _type = "下载器";
    //       break;
    //     case "P02-26":
    //       _type = "启发式检测";
    //       break;
    //     case "P02-27":
    //       _type = "宏病毒";
    //       break;
    //     case "P02-28":
    //       _type = "脚本病毒";
    //       break;
    //     case "P02-29":
    //       _type = "手机病毒";
    //       break;
    //     case "P02-30":
    //       _type = "恶意软件";
    //       break;
    //     case "P02-31":
    //       _type = "PE病毒";
    //       break;
    //     case "P02-32":
    //       _type = "测试病毒";
    //       break;
    //     case "P02-33":
    //       _type = "键盘记录器";
    //       break;
    //     case "P02-99":
    //       _type = "其他";
    //       break;
    //     default:
    //   }
    //   return _type;
    // },
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
        deviceName: row.deviceName,
        antiVirusProduct: row.antiVirusProduct,
        createTime: row.createTime,
        deviceAddress: row.deviceAddress,
        deviceType: this.device_type(row.deviceType),

        hashName: row.hashName,
        institutionBranch: row.institutionBranch,
        institutionBranchArea: row.institutionBranchArea,
        id: row.id,
        institutionCode: row.institutionCode,
        institutionShort: row.institutionShort,
        sendStatus: this.send_status(row.sendStatus),
        state: row.state == "1" ? "已查杀" : "--",
        time: row.time,
        version: row.version,
        virusHashcode: row.virusHashcode,
        virusName: row.virusName,
        // virusType: this.virusType(row.virusType),
        virusType: row.virusType,
        virusTypeDesc: row.virusTypeDesc,
        virusUnifyHashcode: row.virusUnifyHashcode,
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
      const { data: data } = await virusSend(form);
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
          virusDel(this.checkedData).then((res) => {
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
          deviceName: row.deviceName,
          antiVirusProduct: row.antiVirusProduct,
          createTime: row.createTime,
          deviceAddress: row.deviceAddress,
          deviceType: row.deviceType,
          hashName: row.hashName,
          institutionBranch: row.institutionBranch,
          institutionBranchArea: row.institutionBranchArea,
          id: row.id,
          institutionCode: row.institutionCode,
          institutionShort: row.institutionShort,
          sendStatus: row.sendStatus,
          state: row.state,
          time: row.time,
          version: row.version,
          virusHashcode: row.virusHashcode,
          virusName: row.virusName,
          virusType: row.virusType,
          virusUnifyHashcode: row.virusUnifyHashcode,
        };
      });
    },
    submitForm(formName) {
      if (this.mode == "add") {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            virusAdd(this.addForm).then((res) => {
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
            virusEdit(this.addForm).then((res) => {
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
      const { data: data } = await virusTable(params);
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
/deep/ .el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  // width: 200px;
}
</style>