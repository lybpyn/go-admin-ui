
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="用户ID" prop="userId"><el-input
            v-model="queryParams.userId"
            placeholder="请输入用户ID"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="方向" prop="direction">
            <el-select v-model="queryParams.direction" placeholder="请选择" clearable>
              <el-option label="入账(credit)" value="1" />
              <el-option label="出账(debit)" value="-1" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择" clearable>
              <el-option label="已入账" value="1" />
              <el-option label="待入账" value="0" />
              <el-option label="冲正" value="-1" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsUserLedger:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsUserLedger:edit']"
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
              v-permisaction="['admin:hsUserLedger:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsUserLedgerList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="用户ID"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="币种"
            align="center"
            prop="currencyCode"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="方向"
            align="center"
            prop="direction"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.direction === 1">入账(credit)</el-tag>
              <el-tag v-else>出账(debit)</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="本次发生额，>0"
            align="center"
            prop="amount"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="记账前余额"
            align="center"
            prop="balanceBefore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="记账后余额"
            align="center"
            prop="balanceAfter"
            :show-overflow-tooltip="true"
          />
          <!-- ：order_settlement/withdraw/withdraw_fee/withdraw_reversal/manual_adjust_*/freeze, unfreeze等 -->
          <el-table-column
            label="业务类型"
            align="center"
            prop="bizType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="业务单号"
            align="center"
            prop="bizId"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column
            label="用于幂等控制"
            align="center"
            prop="idempotencyKey"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="可选：引用表名"
            align="center"
            prop="refTable"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="可选：引用ID"
            align="center"
            prop="refId"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column
            label="备注"
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1">已入账</el-tag>
              <el-tag v-else-if="scope.row.status == 0">待入账</el-tag>
              <el-tag v-else>冲正</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsUserLedger:edit']"
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
                  v-permisaction="['admin:hsUserLedger:remove']"
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
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" />
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
import { addHsUserLedger, delHsUserLedger, getHsUserLedger, listHsUserLedger, updateHsUserLedger } from '@/api/admin/hs-user-ledger'

export default {
  name: 'HsUserLedger',
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
      hsUserLedgerList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userId: undefined,
        currencyCode: undefined,
        direction: undefined,
        amount: undefined,
        balanceBefore: undefined,
        balanceAfter: undefined,
        bizType: undefined,
        bizId: undefined,
        idempotencyKey: undefined,
        refTable: undefined,
        refId: undefined,
        remark: undefined,
        status: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        currencyCode: [{ required: true, message: 'ISO 4217，例如 USD/CNY不能为空', trigger: 'blur' }],
        direction: [{ required: true, message: '1=入账(credit), -1=出账(debit)不能为空', trigger: 'blur' }],
        amount: [{ required: true, message: '本次发生额，>0不能为空', trigger: 'blur' }],
        balanceBefore: [{ required: true, message: '记账前余额不能为空', trigger: 'blur' }],
        balanceAfter: [{ required: true, message: '记账后余额不能为空', trigger: 'blur' }],
        bizType: [{ required: true, message: '业务类型：order_settlement/withdraw/withdraw_fee/withdraw_reversal/manual_adjust_*/freeze, unfreeze等不能为空', trigger: 'blur' }],
        bizId: [{ required: true, message: '业务单号：例如订单号/提现单号不能为空', trigger: 'blur' }],
        idempotencyKey: [{ required: true, message: '用于幂等控制：如 ORDER_SETTLED:{order_no}不能为空', trigger: 'blur' }],
        refTable: [{ required: true, message: '可选：引用表名不能为空', trigger: 'blur' }],
        refId: [{ required: true, message: '可选：引用ID不能为空', trigger: 'blur' }],
        remark: [{ required: true, message: '不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '1=已入账，0=待入账，-1=冲正不能为空', trigger: 'blur' }]
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
      listHsUserLedger(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsUserLedgerList = response.data.list
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

        id: undefined
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
      this.title = '添加用户余额流水'
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
      getHsUserLedger(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户余额流水'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsUserLedger(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsUserLedger(this.form).then(response => {
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
        return delHsUserLedger({ 'ids': Ids })
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
