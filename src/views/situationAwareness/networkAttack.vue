<template>
  <div>
    <div class="query-condition">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="form"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item prop="orderNum" label="商品名称：">
              <el-input
                v-model="ruleForm.orderNum"
                placeholder="商品名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="status" label="状态：">
              <el-select v-model="ruleForm.status" placeholder="类型">
                <el-option label="状态一" value="1" />
                <el-option label="状态二" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item> </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="searchAction(ruleForm)"
                >查询</el-button
              >
              <!--  @click="submitForm('ruleForm')"-->
              <el-button type="info" @click="resetForm('ruleForm')"
                >重置</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
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
        <el-table-column align="center" prop="order_num" label="订单ID" />
        <el-table-column
          align="center"
          prop="orderNum"
          label="商品名称"
          width="180"
        />
        <el-table-column align="center" prop="status" label="状态" />
        <el-table-column align="center" prop="customer_name" label="客户姓名" />
        <el-table-column align="center" prop="tel" label="客户手机" />
        <el-table-column align="center" prop="created_at" label="下单时间" />
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
</template>

<script>
import { getOrderList } from "@/api/orderForm";
import moment from "moment";

export default {
  data() {
    return {
      rules: {},
      ruleForm: {
        // orderNum: "",
        // status: "",
      },
      tableData: [],
      currentPage: 1,
      pageCount: 2, // 分页总页数
      total: 10, // 分页总页数，
      params: {},
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const params = Object.assign(
        {},
        { page: this.currentPage },
        this.ruleForm
      );
      // console.log(JSON.stringify(params));
      const data = await getOrderList(params);
      this.tableData = data.data;
      if (data.page) {
        this.total = data.page.total;
      } else {
        this.total = 0;
      }
    },
    currentChange(e) {
      this.currentPage = e;
      this.initData();
    },
    searchAction(condition) {
      // console.log(condition);
      // const params = Object.assign({}, { page: this.currentPage }, this.params);
      console.log(this.ruleForm);
      if (this.ruleForm.orderNum) {
        this.params.orderNum = this.ruleForm.orderNum;
      } else {
        this.$delete(this.ruleForm, "orderNum");
      }
      if (this.ruleForm.status) {
        this.params.status = this.ruleForm.status;
      } else {
        this.$delete(this.ruleForm, "status");
      }
      console.log(this.ruleForm);
      this.currentPage = 1;
      this.initData();
    },
    Info(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "warning",
      });
    },
    // submitForm(ruleForm) {
    //   this.$nextTick(() => {
    //     this.$refs[ruleForm].validate((valid) => {
    //       if (valid) {
    //         console.log(valid);
    //       } else {
    //         console.log("error submit!!");
    //         return false;
    //       }
    //     });
    //   });
    // },
    resetForm(formName) {
      this.$nextTick(function () {
        this.$refs[formName].resetFields();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 50px auto;
}
</style>

