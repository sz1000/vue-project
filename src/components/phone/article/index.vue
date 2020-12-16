<template>
  <div class="container">
    <div class="container-detail">
      <div class="title">
        <P
        >{{ valueData.title }}</P
        >
      </div>
      <div class="subtitle">
        <p>{{ valueData.head_text }}</p>
      </div>
      <div class="imgBox">
        <div class="imgItem">
          <img
            :src="valueData.head_img"
            alt=""
            srcset=""
          >
        </div>
        <div class="imgItem">
          <img
            :src="img2"
            alt=""
            srcset=""
          >
        </div>
      </div>
      <div class="person">
        <div class="person-header">
          <img
            :src="valueData.avatar"
            alt=""
            srcset=""
          >
        </div>
        <div class="person-name">
          {{ valueData.author_name }}
        </div>
      </div>

      <!-- <div class="product">
        <div class="product-icon">
          购
        </div>
        <div class="product-title">
          后台是呆逼asdasd adasd ad as d
        </div>
        <div class="product-order">
          预约数:999
        </div>
        <div class="product-price">
          ￥99999
        </div>
      </div>
      <div class="person">
        <div class="person-header">
          <img
            src="https://img.kodin.cn/S7XfrjixhPJkLnyWN5O0BicNwduLUqul.png"
            alt=""
            srcset=""
          >
        </div>
        <div class="person-name">
          主任医生：开具接口
        </div>
      </div> -->
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
          author_name: '',
          avatar: '',
          content: [],
          head_img: '',
          head_text: '',
          product_id: '',
          doctor_id: '',
          title: ''
        }
      }
    }
  },
  computed: {
    valueData() {
      return this.value
    },
    img2() {
      let img = null
      this.value.content.forEach(element => {
        if (!img && element.type === 'img') {
          img = element.content.imgUrl
        }
      })
      return img
    }
  }
}
</script>

<style lang="scss" scoped>
$ratio: 0.333;

p {
  margin-block-start: 0.2em;
  margin-block-end: 0.2em;
}
.container {
  width: 100%;
  &-detail {
    width: 96%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
}
.title {
  p {
    font-size: 12px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #000;
  }
}
.subtitle {
  p {
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #717171;
  }
}
.imgBox {
  display: flex;
  justify-content: space-between;
  .imgItem {
    margin-top: 4px;
    width: $ratio * 354px;
    height: $ratio * 354px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
}
.person {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  font-size: 8px;
  color: #717171;
  &-header {
    margin: 6px 6px 6px 0;
    width: $ratio * 70px;
    height: $ratio * 70px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  &-name {
    font-size: 10px;
    color: #717171;
  }
}

.product {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  font-size: 8px;
  color: #717171;
  &-icon {
    // width: $ratio * 50px;
    // height: $ratio * 50px;
    padding: 3px;
    margin: 8px 8px 8px 0;
    border-radius: 4px;
    background: linear-gradient(#ff699d, #ff9194);
    font-size: 8px;
    color: #ffffff;
  }
  &-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 40%;
    margin-right: 2px;
  }
  &-price {
    font-weight: 600;
    color: #ff699d;
    margin-left: 8px;
  }
}
</style>
