
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
              v-permisaction="['admin:ordGiftcardWriteoffs:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordGiftcardWriteoffs:edit']"
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
              v-permisaction="['admin:ordGiftcardWriteoffs:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="ordGiftcardWriteoffsList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="用户ID，表示提交/使用礼品卡的用户"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="订单ID，关联 ord_user_orders.id，用于核销对应的订单"
            align="center"
            prop="orderId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="礼品卡ID，关联礼品卡主表（若有）"
            align="center"
            prop="giftCardId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="礼品卡卡号/兑换码，保证唯一性"
            align="center"
            prop="giftCardCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="核销状态：0=待核销，1=已核销，2=失败"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="备注信息，例如失败原因、核销说明"
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:ordGiftcardWriteoffs:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                slot="reference"
                v-permisaction="['admin:ordGiftcardWriteoffs:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleWriteoff(scope.row)"
              >核销
              </el-button>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:ordGiftcardWriteoffs:remove']"
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

            <el-form-item label="用户ID，表示提交/使用礼品卡的用户" prop="userId">
              <el-input
                v-model="form.userId"
                placeholder="用户ID，表示提交/使用礼品卡的用户"
              />
            </el-form-item>
            <el-form-item label="订单ID，关联 ord_user_orders.id，用于核销对应的订单" prop="orderId">
              <el-input
                v-model="form.orderId"
                placeholder="订单ID，关联 ord_user_orders.id，用于核销对应的订单"
              />
            </el-form-item>
            <el-form-item label="礼品卡ID，关联礼品卡主表（若有）" prop="giftCardId">
              <el-input
                v-model="form.giftCardId"
                placeholder="礼品卡ID，关联礼品卡主表（若有）"
              />
            </el-form-item>
            <el-form-item label="礼品卡卡号/兑换码，保证唯一性" prop="giftCardCode">
              <el-input
                v-model="form.giftCardCode"
                placeholder="礼品卡卡号/兑换码，保证唯一性"
              />
            </el-form-item>
            <el-form-item label="核销状态：0=待核销，1=已核销，2=失败" prop="status">
              <el-input
                v-model="form.status"
                placeholder="核销状态：0=待核销，1=已核销，2=失败"
              />
            </el-form-item>
            <el-form-item label="备注信息，例如失败原因、核销说明" prop="remark">
              <el-input
                v-model="form.remark"
                placeholder="备注信息，例如失败原因、核销说明"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="核销" :visible.sync="open1" width="500px">
          <el-form ref="form1" :model="form1" :rules="rules" label-width="80px">
            <el-form-item label="备注信息" prop="remark">
              <el-input
                v-model="form1.remark"
                placeholder="备注信息，例如失败原因、核销说明"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm1">确 定</el-button>
            <el-button @click="cancel1">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { addOrdGiftcardWriteoffs, delOrdGiftcardWriteoffs, getOrdGiftcardWriteoffs, listOrdGiftcardWriteoffs, updateOrdGiftcardWriteoffs, processOrdGiftcardWriteoffs } from '@/api/admin/ord-giftcard-writeoffs'

export default {
  name: 'OrdGiftcardWriteoffs',
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
      ordGiftcardWriteoffsList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10

      },
      // 表单参数
      form: {
      },
      form1: {
      },
      open1: false,
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
      listOrdGiftcardWriteoffs(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.ordGiftcardWriteoffsList = response.data.list
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
        userId: undefined,
        orderId: undefined,
        giftCardId: undefined,
        giftCardCode: undefined,
        status: undefined,
        remark: undefined
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
      this.title = '添加礼品卡核销记录表'
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
      getOrdGiftcardWriteoffs(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改礼品卡核销记录表'
        this.isEdit = true
      })
    },
    /** 核销 */
    handleWriteoff(row) {
      this.form1 = row
      this.open1 = true
      this.title = '核销礼品卡'
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateOrdGiftcardWriteoffs(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addOrdGiftcardWriteoffs(this.form).then(response => {
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
    submitForm1: function() {
      this.$refs['form1'].validate(valid => {
        if (valid) {
          processOrdGiftcardWriteoffs(this.form1).then(response => {
            if (response.code === 200) {
              this.msgSuccess(response.msg)
              this.open1 = false
              this.getList()
            } else {
              this.msgError(response.msg)
            }
          })
        }
      })
    },
    // 取消按钮
    cancel1() {
      this.open1 = false
      this.reset1()
    },
    // 表单重置
    reset1() {
      this.form1 = {
        id: undefined,
        userId: undefined,
        orderId: undefined,
        giftCardId: undefined,
        giftCardCode: undefined,
        status: undefined,
        remark: undefined
      }
      this.resetForm('form1')
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delOrdGiftcardWriteoffs({ 'ids': Ids })
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
