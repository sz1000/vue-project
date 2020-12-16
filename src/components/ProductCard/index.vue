<template>
  <div class="product-card">
    <div class="img-container">
      <i v-if="!value.cover_img" class="el-icon-plus" style="margin-left:10px;"/>
      <img :src="value.cover_img" class="img" alt srcset>
    </div>
    <div class="content">
      <div class="content-title">{{ value.name || "请选择商品" }}</div>
      <div v-if="value.type !== 2 && JSON.stringify(value) !=='{}'" class="content-price-container">
        <span class="price">¥{{ value.type === 1 ? value.price : value.pay_price | priveToYuan }}</span>
        <span class="subPrice">¥{{ value.ori_price | priveToYuan }}</span>
        <span class="limit">限时特惠</span>
      </div>
      <div v-if="value.type !== 0 && JSON.stringify(value) !=='{}'" class="order-price">
        预约金：¥{{ value.pay_price | priveToYuan }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  width: 400px;
  height: 110px;
  display: flex;
  align-items: center;
  background: #fff;

  border: 1px solid #dcdfe6;
  border-radius: 6px;
  padding: 0 8px;

  cursor: pointer;
}

.img-container {
  width: 90px;
  height: 90px;
  background: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  overflow: hidden;

  font-size: 28px;
  color: #8c939d;
  text-align: center;
  line-height: 90px;
  img {
    width: 100%;
    height: 100%;
  }
}

.content {
  width: 290px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: normal;
  color: #333333;

  padding: 4px 0;
  padding-left: 10px;
  &-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.price {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 59, 48, 1);
}

.subPrice {
  font-size: 11px;
  color: #00000050;
  font-weight: 400;
  text-decoration: line-through;
  padding: 0 7px;
}

.limit {
  height: 13px;
  padding: 1px 8px;
  background: #ff3b30;
  border-radius: 11px;

  font-size: 9px;
  font-weight: 400;
  color: #fff;
}

.order-price {
  width: 80px;
  height: 18px;
  background: rgba(233, 90, 39, 0.1);
  border-radius: 2px;

  font-size: 11px;
  color: #f55419;
  text-align: center;
  align-items: center;
}
</style>
