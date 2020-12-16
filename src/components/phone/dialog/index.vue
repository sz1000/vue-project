<template>
  <div v-if="show" class="phone-dialog" @click="changShow">
    <slot/>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  methods: {
    changShow() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style>
 .phone-dialog{
   position: absolute;
   top:0;
   left: 0;
   z-index:9999;
   width: 100%;
   height: 100%;
   background: #59617490;
 }
</style>
