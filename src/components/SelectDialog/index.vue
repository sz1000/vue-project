<template>
  <div>
    <el-dialog :visible.sync="dialogShow" :title="title" width="40%">
      <div>
        <el-input
          v-model="search"
          clearable
          placeholder="请输入标题或者名字搜索"
          prefix-icon="el-icon-search"
          @change="searchChang"
        />
        <div class="listBox">
          <el-table :data="dataList" style="width: 100%">
            <el-table-column label="标题" >
              <template slot-scope="scope">
                <el-radio v-model="selectTarget" :label="scope.row">{{
                  scope.row.name || scope.row.title
                }}</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间" sortable />
          </el-table>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :total="total"
              :page-size="10"
              small
              layout="total,prev, pager, next"
              @current-change="changPage"
            />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addLocation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDoctorList } from '@/api/doctor'
import { getArticlesList } from '@/api/articles'
import { getProductList } from '@/api/product'
import { getClientList } from '@/api/client'
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String,
      required: true,
      default: '',
      validator: function(value) {
        if (['product', 'article', 'doctor', 'user'].indexOf(value) !== -1) {
          return true
        } else {
          console.error("type必须是： ['product', 'article', 'doctor','user'] 中的一个")
          return false
        }
      }
    },
    value: {
      type: [String, Object],
      required: false,
      default: function(params) {
        return {}
      }
    },
    title: {
      type: String,
      required: false,
      default: '选择列表'
    },
    params: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      dataList: [],
      selectOptions: '',
      selectTarget: '',
      total: 0,
      page: 1,
      dialogVisible: false,
      search: ''
    }
  },
  computed: {
    dialogShow: {
      get() {
        return this.show
      },
      set(data) {
        this.$emit('update:show', data)
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData(search) {
      search = Object.assign({}, { page: this.page }, search, this.params)
      let serveData
      switch (this.type) {
        case 'product':
          serveData = await getProductList(search)
          break
        case 'article':
          serveData = await getArticlesList(search)
          break
        case 'doctor':
          serveData = await getDoctorList(search)
          break
        case 'user':
          serveData = await getClientList(search)
          break
        default:
          break
      }
      this.dataList = serveData.data
      this.total = serveData.page.total
    },
    searchChang(search) {
      let searchParams
      if (this.type === 'article') {
        searchParams = search ? { title: search } : {}
      } else {
        searchParams = search ? { name: search } : {}
      }
      this.initData(searchParams)
    },
    changPage(e) {
      this.page = e
      this.initData()
    },
    addLocation() {
      this.$emit('update:value', this.selectTarget)
      this.$emit('change', this.selectTarget)
      this.$emit('update:show', false)
    },
    cancel() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-radio__label{
     white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow:hidden;
    width: 16vw;
    display:inline-block;
}
</style>
