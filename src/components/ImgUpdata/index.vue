<template>
  <div class="box">
    <div v-if="value != '' && value && deleteShow" class="delete" @click="deleteImg">
      <el-button :style="{padding:deleteSize}" type="danger" icon="el-icon-delete" circle/>
    </div>
    <el-upload
      :show-file-list="false"
      :data="qiniuData"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      action="https://upload.qiniup.com"
      class="avatar-uploader"
    >
      <img v-if="value" :src="value" :height="height+'px'" class="avatar">
      <i v-else :style="{width:width+'px',height:height+'px','line-height':height+'px'}" class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
  </div>
</template>

<script>
import { getQiniuToken } from '@/api/common.js'
import rondToken from 'rand-token'
export default {
  props: {
    fixedNumber: {
      type: Array,
      required: false,
      default: () => [750, 450]
    },
    width: {
      type: Number,
      required: false,
      default: 90
    },
    height: {
      type: Number,
      required: false,
      default: 90
    },
    deleteSize: {
      type: Number,
      required: false,
      default: 5
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    deleteShow: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      qiniuData: {
        key: '',
        token: '',
        config: {},
        putExtra: {}
      },
      fileList: []
    }
  },
  methods: {
    deleteImg() {
      this.$emit('update:value', '')
    },
    handleSubmit() {
    },
    handleSuccess(response, file) {
      const imgUrl = process.env.QINIU_URL + '/' + response.key
      this.$emit('update:value', imgUrl)
    },
    handleError(err, file, fileList) {
      console.error(err)
      this.$message({
        message: '上传图片失败！请重试',
        type: 'error'
      })
    },
    async beforeUpload(file) {
      const tokenServe = await getQiniuToken()
      this.qiniuData.token = tokenServe.data.token
      this.qiniuData.key = `${rondToken.generate(32)}.${file.name.split('.').pop()}`
    }
  }
}
</script>

<style lang="scss" scoped>

.avatar-uploader {
  width: 100%;
  height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 100%;
  text-align: center;
}
.avatar {
  width: auto;
  display: block;
}

.delete {
  position: absolute;
  z-index: 100;
  right: -5px;
  top: -5px;
  button {
    padding: 5px;
    font-size: 10px;
  }
}
.uploadBox {
  height: 100%;
  width: 100%;
  position: relative;
}
.box{
  position: relative;
}
</style>

