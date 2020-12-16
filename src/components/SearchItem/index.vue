<template>
  <div class="searchItem">
    <span class="title" >{{ title }}:</span>
    <div>
      <el-input v-if="type == 'input'" v-model="searchParam" :placeholder="placeholder ? placeholder : `请输入${title}`" clearable>
        <el-button slot="append" icon="el-icon-search" @click="handleGetValue" />
      </el-input>

      <el-select
        v-if="type == 'select'"
        v-model="searchParam"
        :placeholder="placeholder ? placeholder : `请输入${title}`"
        clearable
        @change="handleGetValue"
      >
        <el-option
          v-for="(item,index) in selectOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <div v-if="type == 'time'">
        <el-date-picker
          v-model="searchParam"
          clearable
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
        <el-radio-group v-model="seletDate" @change="handleChangePicker">
          <el-radio-button label="今天" />
          <el-radio-button label="昨天" />
          <el-radio-button label="最近7天" />
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    param: {
      type: [String, Array],
      required: false,
      default: ''
    },
    selectOptions: {
      type: Array,
      required: false,
      default: () => []
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      seletDate: '',
      time: '',
      searchParam: ''
    }
  },
  watch: {
    searchParam: function(date) {
      if (this.type == 'time') {
        this.handleGetValue()
      }
    }
  },
  mounted() {},
  methods: {
    handleGetValue(e) {
      this.$emit('change', {
        param: this.param,
        value: this.searchParam,
        type: this.type
      })
    },
    handleChangePicker(options) {
      let end = moment().format('YYYY-MM-DD')
      let start = moment().format('YYYY-MM-DD')

      switch (options) {
        case '今天':
          end = moment(end)
            .add(0, 'days')
            .format('YYYY-MM-DD')
          break
        case '昨天':
          start = moment(start)
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
          end = moment(end)
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
          break
        case '最近7天':
          start = moment().subtract(7, 'days').format('YYYY-MM-DD')
          break

        default:
          break
      }
      this.searchParam = [start, end]
    }
  }
}
</script>

<style lang="scss" scoped>
.searchItem {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-right: 10px;
  // margin-right: 42px;
  
  span {
    
    padding-right: 8px;
    font-size: 14px;
    color: #596174;
  }
 
}
</style>
