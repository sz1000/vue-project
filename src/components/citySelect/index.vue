<template>
  <div>
    <el-cascader
      :options="cityData"
      :props="props"
      v-model="target"
      style="width:100%"
      placeholder="请选择地区"
      @change="handleChange"/>
  </div>
</template>

<script>
import cityData from './cityData.json'
export default {
  props: {
    arr: {
      type: Array,
      required: false,
      default: () => []
    }

  },
  data() {
    return {
      target: [],
      props: {
        label: 'name',
        value: 'name'
      },
      cityData
    }
  },
  mounted() {
    if (this.arr.length > 0) {
      this.target = this.arr
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', { province: e[0], city: e[1], area: e[2] })
    }
  }
}
</script>

