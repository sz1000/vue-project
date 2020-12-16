<template>
  <div class="title-container">
    <span/>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'TitleTabs',
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title-container {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 13px;
  // background: rgba(241, 243, 244, 1);
  border-radius: 2px;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(89, 97, 116, 1);
  line-height: 16px;
  color: #596174;
  span {
    margin: 0 10px 0 20px;
    display: block;
    width: 4px;
    height: 14px;
    background: rgba(68, 190, 201, 1);
  }
}
</style>
