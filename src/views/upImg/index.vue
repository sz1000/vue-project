<template>
  <div>
    <el-upload
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :limit="3"
      :auto-upload="false"
      :file-list="fileList"
      :multiple="false"
      class="upload-demo"
      action
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <el-button size="small" type="primary" @click="handleRefresh">刷新</el-button>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { getQiniuToken, getQiniuRefresh } from '@/api/common.js'
export default {
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    console.log('adadasd')
    this.keyArr = []
  },
  methods: {
    handleRefresh() {
      getQiniuRefresh({ urls: this.keyArr }).then((res) => {
        console.log('TCL: handleRefresh -> res', res)
      }).catch((err) => {
        console.log('TCL: handleRefresh -> err', err)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 3 个文件，本次选择了 ${
    //       files.length
    //     } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    //   )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleChange(file, fileList) {
      this.qiniuUp(file.raw)
    },
    async qiniuUp(upload) {
      const _this = this
      const serveToken = await getQiniuToken(upload.name)
      const token = serveToken.data.token
      const observable = qiniu.upload(
        upload,
        upload.name,
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
            console.log('TCL: complete -> res', res)
            // 上传成功
            console.log('上传成功')
            const imgUrl = `${process.env.QINIU_URL}/${res.key}`
            _this.keyArr.push(imgUrl)
            resolve(imgUrl)
            console.log('TCL: complete -> imgUrl', imgUrl)
          }
        })
      })
    }
  }
}
</script>
