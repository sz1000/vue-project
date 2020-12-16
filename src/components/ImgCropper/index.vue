<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :append-to-body="true" title="图片裁剪" width="40%" >
      <div class="cropperBox" >
        <VueCropper
          ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :auto-crop="option.autoCrop"
          :fixed="option.fixed"
          :fixed-number="fixedNumber"
          :can-move="option.canMove"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cropperImg()">裁 剪</el-button>
      </span>
    </el-dialog>

    <div :style="{width:width+'px',height:height+'px'}" class="uploadBox">
      <div v-if="value != '' && value && deleteShow" class="delete" @click="deleteImg">
        <el-button :style="{padding:deleteSizeData}" type="danger" icon="el-icon-delete" circle/>
      </div>
      <el-upload
        :http-request="qiniuUp"
        :show-file-list="false"
        :multiple="false"
        :on-change="handleChange"
        :auto-upload="false"
        :file-list="fileList"
        class="avatar-uploader"
        action
      >
        <img v-if="value" :src="value" :height="height+'px'" class="avatar">
        <i v-else :style="{width:width+'px',height:height+'px','line-height':height+'px'}" class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
// 引入裁剪组件 地址为：https://github.com/xyxiao001/vue-cropper

import * as qiniu from 'qiniu-js'
import { getQiniuToken } from '@/api/common.js'
import rondToken from 'rand-token'
import { Promise } from 'q'

export default {
  components: {
    VueCropper
  },
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
      dialogVisible: false,
      imgFile: '',
      file: '默认图片',
      fileList: [],
      option: {
        img: '',
        size: 1,
        outputType: 'jpeg',
        autoCrop: true, // 默认生成截图框
        autoCropWidth: 250, // 默认生成截图框宽度
        autoCropHeight: 90, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [750, 450], // 截图框的宽高比例
        canMove: false, // 上传图片是否可以移动
        centerBox: true // 截图框是否被限制在图片里面
      }
    }
  },
  computed: {
    deleteSizeData() {
      return `${this.deleteSize}px`
    },
    imgUrl(e) {
      return this.image
    }
  },
  methods: {
    async qiniuUp(upload) {
      const serveToken = await getQiniuToken()
      const token = serveToken.data.token
      const observable = qiniu.upload(
        upload.file,
        `${rondToken.generate(32)}.${upload.file.name.split('.').pop()}`,
        token,
        {},
        {}
      )
      return new Promise((resolve, reject) => {
        observable.subscribe({
          next(res) {
            // 上传中
          },
          error(err) {
            // 上传错误
            console.log(err)
            reject(err)
          },
          complete(res) {
            const imgUrl = `${process.env.QINIU_URL}/${res.key}`
            resolve(imgUrl)
          }
        })
      })
    },
    handleChange(file, fileList) {
      if (file.status === 'ready') {
        const strArr = file.name.split('.')
        this.option.outputType = strArr[strArr.length - 1]
        this.option.img = window.URL.createObjectURL(file.raw)
        this.dialogVisible = true
      }
    },
    async cropperImg(file) {
      const that = this
      this.$refs.cropper.getCropBlob(async data => {
        const upload = {
          file: data
        }
        upload.file.name = `cropperImg.${data.type.split('/').pop()}`
        const imageUrl = await this.qiniuUp(upload)
        that.dialogVisible = false
        that.$emit('update:value', imageUrl)
        that.$emit('change', imageUrl)
      })
    },
    deleteImg() {
      this.$emit('update:value', '')
      // this.$emit('send', { [`${this.itemKey}`]: '' })
    }
  }
}
</script>

<style lang="scss" scoped>
.selectFile {
  width: 100px;
  height: 100px;
  background: red;
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    :hover {
      display: none;
    }
  }
}
.cropperBox {
  width: 100%;
  height: 40vh;
}
.uoloadImg {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 100%;
    height: 100%;
  }
}
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
</style>

