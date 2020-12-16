<template>
  <div>
    <div class="phone">
      <div class="phone-Container">
        <vuescroll :ops="ops">
          <div class="scroll-coantainer">
            <slot/>
          </div>
        </vuescroll>
      </div>
    </div>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'
export default {
  components: {
    vuescroll
  },
  data() {
    return {
      ops: {
        // vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.phone {
  width: 278px;
  height: 570px;
  position: relative;
  background-image: url("../../assets/phone.png");
  background-size: cover;
}
.phone-Container {
  width: 250px;
  height: 441px;
  background: wheat;
  position: absolute;
  top:60px;
  left:14px;
  overflow: hidden;
}
.scroll-coantainer{
  width: 250px;
  min-height: 570px;
  background: #fff;
}
</style>

