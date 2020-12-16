<template>
  <div class="row">
    <el-row :gutter="20">
      <el-col :span="2"><h3>{{ title }} </h3></el-col>
      <el-col :span="10">
        <slot><el-input :value="value" :placeholder="placeholder" @change="nameChang"/></slot>
      </el-col>
      <el-col :span="12">
        <h4 style="font">{{ tipMain }}</h4>
        <p>{{ tipSub }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      placeholder: '请输入一个标题'
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入内容'
    },
    tipText: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: [String, Number],
      required: false,
      default: ''
    },
    itemKey: {
      type: String || Number,
      required: false,
      default: null
    }
  },
  computed: {
    tipMain: function(type) {
      if (this.tipText && this.tipText.length > 0) {
        const MainText = this.tipText.split(':')
        return `${MainText[0]}:`
      }
    },
    tipSub: function() {
      if (this.tipText && this.tipText.length > 0) {
        const MainText = this.tipText.split(':')
        return MainText[1]
      }
    }
  },
  methods: {
    nameChang(e) {
      this.$emit('update:value', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.row{
  margin-bottom: 30px;
}
</style>
