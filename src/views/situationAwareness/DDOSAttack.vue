<template>
  <div class="tabelContainerStyle">
    <div style="margin-top:40px;" class="contant-container list-container">
      <div class="headContainer">
        <div class="conditionContainer">
          <div class="searchContainer">
           <!-- 下拉框查询开始 -->
              <div style="margin-right: 30px;" >
                <el-input placeholder="请输入内容" :param="name"  v-model="searchName" :select-options="options"
            class="input-with-select">
                <el-select style="width: 150px;" 
                v-model="name"
                placeholder="请选择"
                slot="prepend">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.name" >
                  </el-option>
                  <!-- <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option> -->
                </el-select>
                
                <el-button slot="append" icon="el-icon-search" @click="searchAction('searchName', name)" ></el-button>
              </el-input>
            </div>
            <!-- 下拉框查询结束 -->
          </div>

          <div class="searchContainer">
            <p style="width: 5em; margin: 12px 5px;">核销订单：</p>
            <el-input
              v-model="searchCode"
              placeholder="请输入核销码"
              style="width:220px;"
              class="input-with-select"
            >
              <el-button slot="append" class="appendStyle" @click="verification">确认</el-button>
            </el-input>
          </div>
        </div>

        <!-- 日期UI组件开始-->
        <div class="conditionContainer">
          <div class="search-left-row">
            <SearchItem
              style="margin-top:10px;"
              :param="['begin','end']"
              type="time"
              title="录入时间"
              @change="handlenSearchChange"
            />
          </div>
          <!-- 订单数据导出 -->
          <div class="search-right-row">
            <!-- 这里暂时不要加，加上表格导出没有问题-->
            <el-button
              style="margin-top:-30px; margin-left:30px;"
              icon="el-icon-upload2"
              type="primary"
              @click="exportExcel"
            >订单数据导出</el-button>
          </div>
        </div>
        <!-- 日期UI组件结束-->
        <el-tabs v-model="activeName" class="selfTabs" @tab-click="handleClick">
          <el-tab-pane label="全 部" name="all" />
          <el-tab-pane label="已付款" name="1" />
          <el-tab-pane label="未付款" name="0" />
          <!-- <el-tab-pane label="已取消" name="2" /> -->
          <el-tab-pane label="已核销" name="3" />
          <el-tab-pane label="已退款" name="4" />
        </el-tabs>
      </div>

      <!-- <div class="conditionContainer"> -->
      <!-- <div class="searchContainer"> -->
      <!-- <p>姓名：</p>
          <el-input
            v-model="searchName"
            placeholder="请输入姓名"
            class="input-with-select"
      >-->
      <!-- <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchAction('searchName','customerName')"
            />
      </el-input>-->
      <!-- </div> -->
      <!-- <div class="searchContainer"> -->
      <!-- <p style="width:6em">订单号：</p>
          <el-input
            v-model="searchPhone"
            placeholder="请输入订单号"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchAction('searchPhone','orderNum')"
            />
      </el-input>-->
      <!-- </div>
      </div>-->
      <div class="tableContainer" >
        <el-table  
          :data="tableData"
          :highlight-current-row="true"
          :header-cell-style="{
            background: 'rgba(241,243,244,1)',
            color:'#909399',
            font:'14px',
            padding: '8px 0'
          }"
          header-row-class-name="headerStyle"
          header-cell-class-name="headerCell"
          cell-class-name="rowStyle"
          style="width: 100%"
        >
          <el-table-column align="center" prop="order_num" label="订单ID" />
          <el-table-column align="center" prop="product_name" label="商品名称" width="180" />
          <el-table-column align="center" prop="customer_name" label="客户姓名" />
          <el-table-column align="center" prop="tel" label="客户手机" />
          <el-table-column align="center" label="价格">
            <template slot-scope="scope">
              <div class="price">￥{{ scope.row.total_price / 100 }}</div>
              <!-- <div class="price">￥{{ scope.row.total_price }}</div> -->
            </template>
          </el-table-column>
          <el-table-column align="center" label="实收款">
            <template slot-scope="scope">
              <div class="price">￥{{ scope.row.pay_price / 100 }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="待线下支付价格">
            <template slot-scope="scope">
              <div class="price">￥{{ scope.row.odd_price / 100 }}</div>
            </template>
            
          </el-table-column>-->
          <el-table-column align="center" label="订单状态">
            <template slot-scope="scope">
              <div>
                <el-tag :type="scope.row.status | orderStatusType">
                  {{
                  scope.row.status | orderStatus
                  }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="下单时间" />
          <!-- 操作详情开始 -->
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="TableHandleStyle">
                <el-button
                  size="small"
                  type="primary"
                  @click="$router.push({path: toOrderPage(scope.row.status), query: {id: scope.row.id}})"
                >详情</el-button>

                <!-- <el-button :disabled="scope.row.status !== 1" size="small" type="primary" @click="open(scope.row)">核销</el-button> -->
              </div>
            </template>
          </el-table-column>
          <!-- 操作详情结束 -->
        </el-table>
     
        <!--  分页-->
        <div class="pagingStyle">
          <el-pagination
            :current-page="currentPage"
            :total="total"
            :page-count="pageCount"
            background
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </div>
      </div>
    </div>
    <!-- 弹框核销订单信息 -->
    <!-- <el-dialog v-if="veriData" :visible.sync="verificationDialog" title="核销订单" width="30%">
      <div class="veriContainer">
        <div class="odrTitle">
          <div class="colLine" />
          <div>用户信息：</div>
        </div>
        <el-row class="userCantainer" justify="start">
          <el-col :span="8">姓名：{{ veriData.userInfo.name }}</el-col>
          <el-col :span="4">性别: {{ veriData.userInfo.gender == 1 ? '男': '女' }}</el-col>
          <el-col :span="10">电话：{{ veriData.userInfo.tel }}</el-col>
        </el-row>
        <div style="margin-bottom:18px;" class="line" />
        <div class="odrTitle">
          <div class="colLine" />
          <div>订单信息</div>
        </div>
        <el-row justify="start" class="rowContainer">
          <el-col :span="6" class="titleText">产品名称：</el-col>
          <el-col :span="18" class="contentText">{{ veriData.product_name }}</el-col>
        </el-row>
        <el-row justify="start" class="rowContainer">
          <el-col :span="6" class="titleText">订单号：</el-col>
          <el-col :span="18" class="contentText">{{ veriData.order_num }}</el-col>
        </el-row>
        <el-row justify="start" class="rowContainer">
          <el-col :span="6" class="titleText">购买时间：</el-col>
          <el-col :span="18" class="contentText">{{ veriData.created_at }}</el-col>
        </el-row>
        <el-row justify="start" class="rowContainer">
          <el-col :span="6" class="titleText">付款时间：</el-col>
          <el-col :span="18" class="contentText">{{ veriData.pay_time }}</el-col>
        </el-row>
        <el-row justify="start" class="rowContainer">
          <el-col :span="6" class="titleText">总金额：</el-col>
          <el-col
            :span="18"
            style="color: #ff6f2199;"
            class="contentText"
          >￥{{ veriData.total_price | priveToYuan }}</el-col>
        </el-row>
        <el-row justify="start" class="rowContainer">
          <el-col :span="6" class="titleText">线上支付金额：</el-col>
          <el-col
            :span="18"
            style="color: #ff6f2199;"
            class="contentText"
          >￥{{ veriData.pay_price | priveToYuan }}</el-col>
        </el-row>
        <div class="line" />
        <el-row justify="start" class="rowContainer">
          <el-col :span="6" class="titleText">线下支付金额：</el-col>
          <el-col
            :span="18"
            style="color: #ff6f2199;"
            class="contentText"
          >￥{{ veriData.odd_price ==0 ? "0" : veriData.odd_price | priveToYuan }}</el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="verificationDialog = false">取 消</el-button>
        <el-button type="primary" @click="open">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
import {
  getOrderList,
  getVerifivationOrder,
  putConfirmOrder
} from "@/api/orderForm";
import moment from "moment";

import SearchItem from "@/components/SearchItem";

// import { priceToYuan } from '@/utils'
export default {
  filters: {
    orderStatus: function(value) {
      let status;
      switch (value) {
        case -1:
          status = "订单支付异常";
          break;
        case 0:
          status = "未付款";
          break;
        case 1:
          status = "已付款";
          break;
        case 2:
          status = "已取消";
          break;
        case 3:
          status = "已销核";
          break;
        case 4:
          status = "已退款";
          break;
        // case 4:
        //   status = "申请退款中";
        //   break;
        case 5:
          status = "申请退款成功";
          break;
        case 6:
          status = "申请退款失败";
          break;
        default:
      }
      return status;
    },
    orderStatusType: function(value) {
      let status;
      switch (value) {
        case -1:
          status = "danger";
          break;
        case 0:
          status = "warning";
          break;
        case 1:
          status = "success";
          break;
        case 2:
          status = "danger";
          break;
        case 3:
          status = "danger";
          break;
        case 4:
          status = "danger";
          break;
        case 5:
          status = "danger";
          break;
        case 6:
          status = "danger";
          break;
        default:
      }
      return status;
    }
  },
  components: {
    SearchItem
    // AddSale
  },
  data() {
    return {
      options: [
        {
          value: "01",
          label: "订单号",
          name: "orderNum"
        },
        {
          value: "02",
          label: "客户姓名",
          name: "customerName"
        },
        {
          value: "03",
          label: "客户手机号",
          name: "tel"
        },

        {
          value: "04",
          label: "商品名称",
          name: "product_name"
        }
        
      ],
      type: 0,
      veriData: null,
      // verificationDialog: false,
      status: "all",
      searchName: "",
      searchPhone: "",
      searchCode: "",
      activeName: "all",
      name: "",
      tableData: [],
      currentPage: 1,
      isOnSale: 1, // 是否上架
      pageCount: 10, // 分页总页数
      total: 10, // 分页总页数，
      params: {}
    };
  },
  // async mounted() {
  //   this.initData();
  // },
  //keep-alive激活的时候
  activated () {
   this.initData()
},
  methods: {
    async initData(page, status, seartch) {
      const params = Object.assign(
        {},
        { page: this.currentPage },
        this.params,
        { type: this.type }
      );
      console.log(params);
      const data = await getOrderList(params);
      this.tableData = data.data;
      if (data.page) {
        this.total = data.page.total;
      } else {
        this.total = 0;
      }
    },
    // refresh(){
    //   //自动刷新
    //   this.$router.go(0);
    // },
    toOrderPage: function(value) {
      let path;
      switch (value) {
        case 0:
          path = "/unpaid"; //未付款页面
          break;
        case 1:
          path = "/paid"; //已付款页面
          break;
        case 2:
          path = "/cancel"; //已取消页面
          break;
        case 3:
          path = "/consumed"; //已核销页面
          break;
        case 4:
          path = "/reimburse"; //已退款页面
          break;
        default:
      }
      return path;
    },
    // 导出表格
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");

        const tHeader = [
          "订单ID",
          "商品名称",
          "客户姓名",
          "客户手机",
          "价格",
          "实收款",
          "订单状态",
          "下单时间"
        ]; // 上面设置Excel的表格第一行的标题

        const filterVal = [
          "order_num",
          "product_name",
          "customer_name",
          "tel",
          "total_price",
          "pay_price",
          "status",
          "pay_time"
        ]; // 上面的index、nickName、name是tableData里对象的属性

        const list = this.tableData; //把data里的tableData存到list

        const data = this.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "列表excel"); //标题，数据，文件名
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleClick(tab, event) {
      const status = tab.name;
      this.status = status;
      this.params = status === "all" ? {} : { status };
       this.currentPage = 1;
      this.searchName = "";
      this.searchPhone = "";
      this.initData();
    },
    currentChange(e) {
      this.currentPage = e;
      this.initData();
    },
    immediateDeliveryInfo(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "warning"
      });
    },
    //下拉查询内容
    searchAction(data, condition) {
      if (this.name == "") {
        this.immediateDeliveryInfo("请选择查询内容");
        return;
      }
      if (this.searchName == "") {
        this.immediateDeliveryInfo("查询内容不能为空");
        return;
      }
     
      this.params = data ? { [condition]: this[data] } : {};

      // this.paramsObj[this.name]=this.searchName;

      this.currentPage = 1;
      this.initData();
    },
    //点击确认，跳转到已支付页面
    async verification() {
      if (this.searchCode == "") {
        this.immediateDeliveryInfo("请输入核销码");
        return;
      }
      getVerifivationOrder(this.searchCode)
        .then(res => {
          this.veriData = res.data;
          
          // this.verificationDialog = true;

          this.$router.push({
            path: "/paid",
            query: { id: this.veriData.id }
          });
        })
        .catch(err => {
         
          this.$message.error("销码失败，请输入正确的核销码。");
          return;
        });
    },
   
    //日期组件
    handlenSearchChange(e) {
    
      if (e.type == "time") {
        if (e.value) {
          this.params[e.param[0]] = e.value[0];
          this.params[e.param[1]] = e.value[1];
        } else {
          delete this.params[e.param[0]];
          delete this.params[e.param[1]];
        }
        this.currentPage = 1;
        this.initData();
        return;
      }

      if (e.value !== "") {
        this.params[e.param] = e.value;
      } else {
        delete this.params[e.param];
      }
      this.currentPage = 1;
      this.initData();
    },
    search(params) {
      const searchData = this[params] ? `?${params}=${this[params]}` : "";
      this.initData(searchData);
    },
    timeSerch(params) {
      const searchData = `?begin=${moment(params[0]).format(
        "YYYY-MM-DD"
      )}&end=${moment(params[1]).format("YYYY-MM-DD")}`;
      this.initData(searchData);
    }
  }
};
</script>

<style lang="scss" scoped>
.price {
  color: #ff6f21;
  font-weight: 600;
}
.selfTabs {
  position: relative;
  width: 100%;
}
.searchContainer {
  margin-right: 130px;
  display: flex;
  p {
    width: 5em;
  }
}

.conditionContainer {
  height: 60px;
}

.appendStyle {
  background-color: #409eff !important;
  color: #fff !important;
  border: 1px solid #409eff;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.titleText {
  color: #606266;
  // font-weight: 600;
  font-size: 14px;
}
.contentText {
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rowContainer {
  width: 100%;
  margin: 8px 0 8px 8px;
}
.colLine {
  width: 2px;
  height: 12px;
  border-radius: 2px;
  margin-right: 6px;
  background: #409eff;
}
.odrTitle {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #596174;
  margin-bottom: 18px;
}
.line {
  width: 100%;
  height: 1px;
  background: #ebeef5;
}
.titleText1 {
  font-size: 14px;
  font-weight: 600;
  color: #596174;
}
.contentText1 {
  font-size: 16px;
  font-weight: 600;
  color: #ff6f21;
}
.money {
  font-size: 10px;
}
.userCantainer {
  margin-left: 8px;
  color: #606266;
  font-size: 14px;
  margin-bottom: 10px;
}
.confirmContainer {
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 10;
  top: 15px;
  right: 10px;
}
.headContainer {
  width: 100%;
  position: relative;
}
</style>

