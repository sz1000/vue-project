<template>
  <div>
    <div
      v-for="(item, index) in arrList"
      :key="index"
      class="add">

      {{ item.title ? item.title : item.name }}

      <i
        class="el-icon-circle-close add-close"
        @click="deletItem(index)"/>

    </div>
    <div class="addItem" @click="addItem">
      +
    </div>
    <SelectDialog :show.sync="dialogShow" :type="type" @change="selectTarget"/>
  </div>
</template>
<script>
import SelectDialog from '@/components/SelectDialog'
export default {
  components: {
    SelectDialog
  },
  props: {
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    max: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      type: 'article',
      dialogShow: false
    }
  },
  computed: {
    arrList: {
      get() {
        return this.value
      },
      set(arrList) {
        this.$emit('update:value', arrList)
      }
    }
  },
  methods: {
    deletItem(index) {
      console.log('TCL: deletItem -> index', index)
      this.arrList.splice(index, 1)
    },
    selectTarget(item) {
      console.log('TCL: selectTarget -> item', item)
      this.arrList.push(item)
      this.dialogShow = false
    },
    addItem() {
      if (this.value.length <= this.max - 1) {
        this.dialogShow = true
      } else {
        this.$message.error(`最多只能添加${this.max}条!`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addItem{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: #ffffff;
  line-height: 20px;
  padding: 6px;
  overflow: hidden;
  white-space: nowrap;
  margin: 6px 0;
  text-overflow: ellipsis;
  text-align: center;
  cursor:pointer;
}
.add{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: #ffffff;
  line-height: 20px;
  padding: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 6px 0;
  &-close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    color: #596174;
  }
  &-add {
    text-align: center;
    font-size: 18px;
    color: #596174;
    cursor: pointer;
  }
}
</style>
