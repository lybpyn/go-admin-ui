
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
              v-permisaction="['admin:hsReceivingAccounts:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsReceivingAccounts:edit']"
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
              v-permisaction="['admin:hsReceivingAccounts:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsReceivingAccountsList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsReceivingAccounts:edit']"
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
                  v-permisaction="['admin:hsReceivingAccounts:remove']"
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

            <el-form-item label="关联 merchants.id" prop="merchantId">
              <el-input
                v-model="form.merchantId"
                placeholder="关联 merchants.id"
              />
            </el-form-item>
            <el-form-item label="关联 banks.id (如果是银行账户)" prop="bankId">
              <el-input
                v-model="form.bankId"
                placeholder="关联 banks.id (如果是银行账户)"
              />
            </el-form-item>
            <el-form-item label="账户名/收款人名称" prop="accountName">
              <el-input
                v-model="form.accountName"
                placeholder="账户名/收款人名称"
              />
            </el-form-item>
            <el-form-item label="账号（可能为卡号/IBAN/虚拟账号）" prop="accountNumber">
              <el-input
                v-model="form.accountNumber"
                placeholder="账号（可能为卡号/IBAN/虚拟账号）"
              />
            </el-form-item>
            <el-form-item label="货币代码 (USD/CNY/...)" prop="currency">
              <el-input
                v-model="form.currency"
                placeholder="货币代码 (USD/CNY/...)"
              />
            </el-form-item>
            <el-form-item label="单次最小收款金额" prop="minAmount">
              <el-input
                v-model="form.minAmount"
                placeholder="单次最小收款金额"
              />
            </el-form-item>
            <el-form-item label="单次最大收款金额 (NULL 表示无限制)" prop="maxAmount">
              <el-input
                v-model="form.maxAmount"
                placeholder="单次最大收款金额 (NULL 表示无限制)"
              />
            </el-form-item>
            <el-form-item label="每日上限 (平台/风控)" prop="dailyLimit">
              <el-input
                v-model="form.dailyLimit"
                placeholder="每日上限 (平台/风控)"
              />
            </el-form-item>
            <el-form-item label="是否默认收款账号: 0否,1是" prop="isDefault">
              <el-input
                v-model="form.isDefault"
                placeholder="是否默认收款账号: 0否,1是"
              />
            </el-form-item>
            <el-form-item label="是否启用自动转出/自动结算" prop="autoTransferEnabled">
              <el-input
                v-model="form.autoTransferEnabled"
                placeholder="是否启用自动转出/自动结算"
              />
            </el-form-item>
            <el-form-item label="自动转出阈值 (达到该金额触发)" prop="autoTransferThreshold">
              <el-input
                v-model="form.autoTransferThreshold"
                placeholder="自动转出阈值 (达到该金额触发)"
              />
            </el-form-item>
            <el-form-item label="风控阈值(超过则人工审核) —— 可与汇率表联动计算" prop="riskThresholdAmount">
              <el-input
                v-model="form.riskThresholdAmount"
                placeholder="风控阈值(超过则人工审核) —— 可与汇率表联动计算"
              />
            </el-form-item>
            <el-form-item label="状态:0=禁用,1=启用,2=待审核" prop="status">
              <el-input
                v-model="form.status"
                placeholder="状态:0=禁用,1=启用,2=待审核"
              />
            </el-form-item>
            <el-form-item label="接口/通道类型，如 bank_transfer, third_party_api 等" prop="interfaceType">
              <el-input
                v-model="form.interfaceType"
                placeholder="接口/通道类型，如 bank_transfer, third_party_api 等"
              />
            </el-form-item>
            <el-form-item label="接口配置信息（JSON）: 如 api_key, secret, callback_url, 接口码等" prop="interfaceConfig">
              <el-input
                v-model="form.interfaceConfig"
                placeholder="接口配置信息（JSON）: 如 api_key, secret, callback_url, 接口码等"
              />
            </el-form-item>
            <el-form-item label="允许接收国家数组" prop="allowedCountries">
              <el-input
                v-model="form.allowedCountries"
                placeholder="允许接收国家数组，例如 ['CN','US']"
              />
            </el-form-item>
            <el-form-item label="" prop="note">
              <el-input
                v-model="form.note"
                placeholder=""
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
import { addHsReceivingAccounts, delHsReceivingAccounts, getHsReceivingAccounts, listHsReceivingAccounts, updateHsReceivingAccounts } from '@/api/admin/hs-receiving-accounts'

export default {
  name: 'HsReceivingAccounts',
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
      hsReceivingAccountsList: [],

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
      listHsReceivingAccounts(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsReceivingAccountsList = response.data.list
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
        merchantId: undefined,
        bankId: undefined,
        accountName: undefined,
        accountNumber: undefined,
        currency: undefined,
        minAmount: undefined,
        maxAmount: undefined,
        dailyLimit: undefined,
        isDefault: undefined,
        autoTransferEnabled: undefined,
        autoTransferThreshold: undefined,
        riskThresholdAmount: undefined,
        status: undefined,
        interfaceType: undefined,
        interfaceConfig: undefined,
        allowedCountries: undefined,
        note: undefined
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
      this.title = '添加收款账号/设置表 (关联卡商与银行或通道)'
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
      getHsReceivingAccounts(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改收款账号/设置表 (关联卡商与银行或通道)'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsReceivingAccounts(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsReceivingAccounts(this.form).then(response => {
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
        return delHsReceivingAccounts({ 'ids': Ids })
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
