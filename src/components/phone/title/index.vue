<template>
  <div >
    <el-row>
      <el-col class="labelContainer">
        <div class="titlLabel"/>
        <span>{{ titleName }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="content">
          <slot>默认值</slot>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.labelContainer{
  margin-top:10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  span{
      margin-left:6px;
  }
}
.titlLabel {
  width: 3px;
  height: 14px;
  background: rgba(125, 194, 171, 1);
  margin-left:6px;
}
.content{
  width: 95%;
  padding: 12px 0;
  margin: 0 6px;
  font-size:14px;
  border-bottom:1px solid #EEEEEE;
}
</style>

