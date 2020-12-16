<template>
  <div class="container">
    <div class="container-img">
      <img :src="value.cover_img" alt="" srcset="">
    </div>
    <div class="container-content">
      <div class="container-content-title">
        {{ value.name }}
      </div>
      <!-- <div class="container-content-hospital">医院</div> -->
      <div class="container-content-price">
        <span>￥ {{ value.price }}</span>
        <span>{{ value.ori_price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      requires: false,
      default: () => {
        return {

        }
      }
    }
  },
  mounted() {
    console.log(this.value)
  }
}
</script>

<style lang="scss" scoped>
$ratio:0.333;
.container{
  width: 96%;
  display: flex;
  margin: 8px auto;
  min-height: $ratio * 202px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EEEEEE;
  background: #fff;
  &-img{
    width: $ratio * 202px;
    height: $ratio * 202px;
    border-radius:  4px;
    overflow: hidden;
    margin-right: 4px;
    img{
      width: auto;
      height: 100%;
    }
  }
  &-content{
    width:70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    height:$ratio * 202px;
    justify-content: space-between;
    &-title{
      font-size: 12px;
      font-weight: 600;
    }
    &-hospital{
      line-height: 18px;
      font-size: 8px;
      color: #999999;
    }
    &-price span:first-child{
      font-size: 14px;
      font-weight: 600;
      color: #F55F52;
    }
    &-price span:last-child{
      font-size: 8px;
      color: #999999;
      text-decoration:line-through
    }
  }
}

</style>

