
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="开始展示时间" prop="startTime"><el-input
            v-model="queryParams.startTime"
            placeholder="请输入开始展示时间"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="结束展示时间" prop="endTime"><el-input
            v-model="queryParams.endTime"
            placeholder="请输入结束展示时间"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsCarouselBanner:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsCarouselBanner:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsCarouselBanner:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsCarouselBannerList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="标题"
            align="center"
            prop="title"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="图片地址"
            align="center"
            prop="imageUrl"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="跳转地址"
            align="center"
            prop="linkUrl"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="排序，小的优先"
            align="center"
            prop="sortOrder"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="开始展示时间"
            align="center"
            prop="startTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.startTime) }}</span>
            </template>
          </el-table-column><el-table-column
            label="结束展示时间"
            align="center"
            prop="endTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.endTime) }}</span>
            </template>
          </el-table-column><el-table-column
            label="0=下线,1=上线"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsCarouselBanner:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:hsCarouselBanner:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="标题" prop="title">
              <el-input
                v-model="form.title"
                placeholder="标题"
              />
            </el-form-item>
            <el-form-item label="图片地址" prop="imageUrl">
              <el-input
                v-model="form.imageUrl"
                placeholder="图片地址"
              />
            </el-form-item>
            <el-form-item label="跳转地址" prop="linkUrl">
              <el-input
                v-model="form.linkUrl"
                placeholder="跳转地址"
              />
            </el-form-item>
            <el-form-item label="排序，小的优先" prop="sortOrder">
              <el-input
                v-model="form.sortOrder"
                placeholder="排序，小的优先"
              />
            </el-form-item>
            <el-form-item label="开始展示时间" prop="startTime">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="结束展示时间" prop="endTime">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="0=下线,1=上线" prop="status">
              <el-input
                v-model="form.status"
                placeholder="0=下线,1=上线"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { addHsCarouselBanner, delHsCarouselBanner, getHsCarouselBanner, listHsCarouselBanner, updateHsCarouselBanner } from '@/api/admin/hs-carousel-banner'

export default {
  name: 'HsCarouselBanner',
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      hsCarouselBannerList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        startTime: undefined,
        endTime: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { startTime: [{ required: true, message: '开始展示时间不能为空', trigger: 'blur' }],
        endTime: [{ required: true, message: '结束展示时间不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listHsCarouselBanner(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsCarouselBannerList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {

        id: undefined,
        title: undefined,
        imageUrl: undefined,
        linkUrl: undefined,
        sortOrder: undefined,
        startTime: undefined,
        endTime: undefined,
        status: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    // 关系
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加首页轮播广告'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id =
                row.id || this.ids
      getHsCarouselBanner(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改首页轮播广告'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsCarouselBanner(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsCarouselBanner(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delHsCarouselBanner({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    }
  }
}
</script>
