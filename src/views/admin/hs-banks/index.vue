
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsBanks:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsBanks:edit']"
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
              v-permisaction="['admin:hsBanks:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsBanksList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="银行编码/银行行号，如 SWIFT/BIC 或自定义编码"
            align="center"
            prop="bankCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="银行名称"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="国家 ISO2"
            align="center"
            prop="country"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="SWIFT/BIC (如适用)"
            align="center"
            prop="swiftCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="路由/清算号(如 ABA)"
            align="center"
            prop="routingNumber"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="是否支持国际汇款: 0否,1是"
            align="center"
            prop="supportsInternational"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="状态: 0=禁用,1=启用"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          /><el-table-column
            label=""
            align="center"
            prop="note"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="扩展字段，例如银行支付说明、证件要求等"
            align="center"
            prop="extra"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsBanks:edit']"
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
                  v-permisaction="['admin:hsBanks:remove']"
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

            <el-form-item label="银行编码/银行行号，如 SWIFT/BIC 或自定义编码" prop="bankCode">
              <el-input
                v-model="form.bankCode"
                placeholder="银行编码/银行行号，如 SWIFT/BIC 或自定义编码"
              />
            </el-form-item>
            <el-form-item label="银行名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="银行名称"
              />
            </el-form-item>
            <el-form-item label="国家 ISO2" prop="country">
              <el-input
                v-model="form.country"
                placeholder="国家 ISO2"
              />
            </el-form-item>
            <el-form-item label="SWIFT/BIC (如适用)" prop="swiftCode">
              <el-input
                v-model="form.swiftCode"
                placeholder="SWIFT/BIC (如适用)"
              />
            </el-form-item>
            <el-form-item label="路由/清算号(如 ABA)" prop="routingNumber">
              <el-input
                v-model="form.routingNumber"
                placeholder="路由/清算号(如 ABA)"
              />
            </el-form-item>
            <el-form-item label="是否支持国际汇款: 0否,1是" prop="supportsInternational">
              <el-input
                v-model="form.supportsInternational"
                placeholder="是否支持国际汇款: 0否,1是"
              />
            </el-form-item>
            <el-form-item label="状态: 0=禁用,1=启用" prop="status">
              <el-input
                v-model="form.status"
                placeholder="状态: 0=禁用,1=启用"
              />
            </el-form-item>
            <el-form-item label="" prop="note">
              <el-input
                v-model="form.note"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="扩展字段，例如银行支付说明、证件要求等" prop="extra">
              <el-input
                v-model="form.extra"
                placeholder="扩展字段，例如银行支付说明、证件要求等"
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
import { addHsBanks, delHsBanks, getHsBanks, listHsBanks, updateHsBanks } from '@/api/admin/hs-banks'

export default {
  name: 'HsBanks',
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
      hsBanksList: [],

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
      listHsBanks(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsBanksList = response.data.list
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
        bankCode: undefined,
        name: undefined,
        country: undefined,
        swiftCode: undefined,
        routingNumber: undefined,
        supportsInternational: undefined,
        status: undefined,
        note: undefined,
        extra: undefined
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
      this.title = '添加银行列表'
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
      getHsBanks(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改银行列表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsBanks(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsBanks(this.form).then(response => {
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
        return delHsBanks({ 'ids': Ids })
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
