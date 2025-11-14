
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="所属分类ID" prop="categoryId">
            <el-input v-model="queryParams.categoryId" placeholder="请输入所属分类ID" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordGiftcardRegion:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordGiftcardRegion:edit']"
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
              v-permisaction="['admin:ordGiftcardRegion:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="ordGiftcardRegionList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="所属分类ID"
            align="center"
            prop="categoryId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="地区代码"
            align="center"
            prop="regionCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="货币代码"
            align="center"
            prop="quoteCurrency"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="货币简称"
            align="center"
            prop="quoteCurrencySymbol"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="汇率"
            align="center"
            prop="rate"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="是否默认区域"
            align="center"
            prop="isMain"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.isMain == 1 ? 'success' : 'danger'"
                size="mini"
              >
                {{ scope.row.isMain == 1 ? '是' : '否' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status == 1 ? 'success' : 'danger'"
                size="mini"
              >
                {{ scope.row.status == 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:ordGiftcardRegion:edit']"
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
                  v-permisaction="['admin:ordGiftcardRegion:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="550px">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">

            <el-form-item label="所属分类ID" prop="categoryId">
              <el-input
                v-model="form.categoryId"
                placeholder="所属分类ID，外键 -> hs_giftcard_category.id"
              />
            </el-form-item>
            <el-form-item label="地区代码" prop="regionCode">
              <el-input
                v-model="form.regionCode"
                placeholder="地区代码，如 US、UK、CN"
              />
            </el-form-item>
            <el-form-item label="货币代码" prop="quoteCurrency">
              <el-input
                v-model="form.quoteCurrency"
                placeholder="货币代码，如 USD, GBP, CNY"
              />
            </el-form-item>
            <el-form-item label="货币简称" prop="quoteCurrencySymbol">
              <el-input
                v-model="form.quoteCurrencySymbol"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="汇率" prop="rate">
              <el-input
                v-model="form.rate"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="是否默认区域" prop="isMain">
              <el-switch
                v-model="form.isMain"
                active-value="1"
                inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">禁用</el-radio>
              </el-radio-group>
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
import { addOrdGiftcardRegion, delOrdGiftcardRegion, getOrdGiftcardRegion, listOrdGiftcardRegion, updateOrdGiftcardRegion } from '@/api/admin/ord-giftcard-region'

export default {
  name: 'OrdGiftcardRegion',
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
      ordGiftcardRegionList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listOrdGiftcardRegion(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.ordGiftcardRegionList = response.data.list
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
        categoryId: undefined,
        regionCode: undefined,
        quoteCurrency: undefined,
        quoteCurrencySymbol: undefined,
        rate: undefined,
        isMain: undefined,
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
      this.title = '添加礼品卡地区'
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
      getOrdGiftcardRegion(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改礼品卡地区'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateOrdGiftcardRegion(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addOrdGiftcardRegion(this.form).then(response => {
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
        return delOrdGiftcardRegion({ 'ids': Ids })
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
