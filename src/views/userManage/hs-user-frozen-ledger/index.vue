
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="" prop="userId"><el-input
            v-model="queryParams.userId"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="币种代码，如 USD/CNY/USDT" prop="currencyCode"><el-input
            v-model="queryParams.currencyCode"
            placeholder="请输入币种代码，如 USD/CNY/USDT"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="1=冻结增加，-1=冻结减少(解冻)" prop="direction"><el-input
            v-model="queryParams.direction"
            placeholder="请输入1=冻结增加，-1=冻结减少(解冻)"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="冻结或解冻金额" prop="amount"><el-input
            v-model="queryParams.amount"
            placeholder="请输入冻结或解冻金额"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="变动前冻结余额" prop="frozenBefore"><el-input
            v-model="queryParams.frozenBefore"
            placeholder="请输入变动前冻结余额"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="变动后冻结余额" prop="frozenAfter"><el-input
            v-model="queryParams.frozenAfter"
            placeholder="请输入变动后冻结余额"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="业务类型：invite_commissions/order_rebate等" prop="bizType"><el-input
            v-model="queryParams.bizType"
            placeholder="请输入业务类型：invite_commissions/order_rebate等"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="业务单号" prop="bizId"><el-input
            v-model="queryParams.bizId"
            placeholder="请输入业务单号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="幂等键" prop="idempotencyKey"><el-input
            v-model="queryParams.idempotencyKey"
            placeholder="请输入幂等键"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="" prop="remark"><el-input
            v-model="queryParams.remark"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="1=已冻结或解冻，0=待处理，-1=冲正" prop="status"><el-input
            v-model="queryParams.status"
            placeholder="请输入1=已冻结或解冻，0=待处理，-1=冲正"
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
              v-permisaction="['admin:hsUserFrozenLedger:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsUserFrozenLedger:edit']"
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
              v-permisaction="['admin:hsUserFrozenLedger:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsUserFrozenLedgerList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label=""
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="币种代码，如 USD/CNY/USDT"
            align="center"
            prop="currencyCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="1=冻结增加，-1=冻结减少(解冻)"
            align="center"
            prop="direction"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="冻结或解冻金额"
            align="center"
            prop="amount"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="变动前冻结余额"
            align="center"
            prop="frozenBefore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="变动后冻结余额"
            align="center"
            prop="frozenAfter"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="业务类型：invite_commissions/order_rebate等"
            align="center"
            prop="bizType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="业务单号"
            align="center"
            prop="bizId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="幂等键"
            align="center"
            prop="idempotencyKey"
            :show-overflow-tooltip="true"
          /><el-table-column
            label=""
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="1=已冻结或解冻，0=待处理，-1=冲正"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsUserFrozenLedger:edit']"
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
                  v-permisaction="['admin:hsUserFrozenLedger:remove']"
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
import { addHsUserFrozenLedger, delHsUserFrozenLedger, getHsUserFrozenLedger, listHsUserFrozenLedger, updateHsUserFrozenLedger } from '@/api/admin/hs-user-frozen-ledger'

export default {
  name: 'HsUserFrozenLedger',
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
      hsUserFrozenLedgerList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userId: undefined,
        currencyCode: undefined,
        direction: undefined,
        amount: undefined,
        frozenBefore: undefined,
        frozenAfter: undefined,
        bizType: undefined,
        bizId: undefined,
        idempotencyKey: undefined,
        remark: undefined,
        status: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        currencyCode: [{ required: true, message: '币种代码，如 USD/CNY/USDT不能为空', trigger: 'blur' }],
        direction: [{ required: true, message: '1=冻结增加，-1=冻结减少(解冻)不能为空', trigger: 'blur' }],
        amount: [{ required: true, message: '冻结或解冻金额不能为空', trigger: 'blur' }],
        frozenBefore: [{ required: true, message: '变动前冻结余额不能为空', trigger: 'blur' }],
        frozenAfter: [{ required: true, message: '变动后冻结余额不能为空', trigger: 'blur' }],
        bizType: [{ required: true, message: '业务类型：invite_commissions/order_rebate等不能为空', trigger: 'blur' }],
        bizId: [{ required: true, message: '业务单号不能为空', trigger: 'blur' }],
        idempotencyKey: [{ required: true, message: '幂等键不能为空', trigger: 'blur' }],
        remark: [{ required: true, message: '不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '1=已冻结或解冻，0=待处理，-1=冲正不能为空', trigger: 'blur' }]
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
      listHsUserFrozenLedger(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsUserFrozenLedgerList = response.data.list
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
      this.title = '添加用户冻结余额流水'
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
      getHsUserFrozenLedger(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户冻结余额流水'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsUserFrozenLedger(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsUserFrozenLedger(this.form).then(response => {
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
        return delHsUserFrozenLedger({ 'ids': Ids })
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
