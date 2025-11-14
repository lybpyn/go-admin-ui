
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="链代码:">
            <el-input v-model="queryParams.chainCode" placeholder="请输入链代码" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsConfigSupportedChainsCoin:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsConfigSupportedChainsCoin:edit']"
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
              v-permisaction="['admin:hsConfigSupportedChainsCoin:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsConfigSupportedChainsCoinList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="链代码"
            align="center"
            prop="chainCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="链名称"
            align="center"
            prop="chainName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="主币"
            align="center"
            prop="nativeSymbol"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="当前链支持提现的币种"
            align="center"
            prop="withdrawCoin"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="网络类型"
            align="center"
            prop="network"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="区块浏览器URL前缀"
            align="center"
            prop="explorerUrl"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="RPC节点或API Endpoint"
            align="center"
            prop="rpcEndpoint"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="链ID（EVM链使用）"
            align="center"
            prop="chainId"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="提现是否启用"
            align="center"
            prop="withdrawEnabled"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.withdrawEnabled == 1 ? 'success' : 'danger'" size="mini">{{ scope.row.withdrawEnabled == 1 ? '启用' : '关闭' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="充值是否启用"
            align="center"
            prop="depositEnabled"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.depositEnabled == 1 ? 'success' : 'danger'" size="mini">{{ scope.row.depositEnabled == 1 ? '启用' : '关闭' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="最小提现金额"
            align="center"
            prop="minWithdrawAmount"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="固定提现手续费（USDT）"
            align="center"
            prop="withdrawFee"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" size="mini">{{ scope.row.status == 1 ? '启用' : '停用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="排序权重"
            align="center"
            prop="sortOrder"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="备注说明"
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsConfigSupportedChainsCoin:edit']"
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
                  v-permisaction="['admin:hsConfigSupportedChainsCoin:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="800px">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">

            <el-form-item label="链代码" prop="chainCode">
              <el-input
                v-model="form.chainCode"
                placeholder="链代码，如 TRC20 / ERC20 / BEP20"
              />
            </el-form-item>
            <el-form-item label="链名称" prop="chainName">
              <el-input
                v-model="form.chainName"
                placeholder="链名称，如 Tron / Ethereum / BSC"
              />
            </el-form-item>
            <el-form-item label="主币" prop="nativeSymbol">
              <el-input
                v-model="form.nativeSymbol"
                placeholder="主币，如 TRX / ETH / BNB"
              />
            </el-form-item>
            <el-form-item label="当前链支持提现的币种" prop="withdrawCoin">
              <el-input
                v-model="form.withdrawCoin"
                placeholder="当前链支持提现的币种"
              />
            </el-form-item>
            <el-form-item label="网络类型" prop="network">
              <el-input
                v-model="form.network"
                placeholder="网络类型：mainnet/testnet"
              />
            </el-form-item>
            <el-form-item label="区块浏览器URL前缀" prop="explorerUrl">
              <el-input
                v-model="form.explorerUrl"
                placeholder="区块浏览器URL前缀"
              />
            </el-form-item>
            <el-form-item label="RPC节点" prop="rpcEndpoint">
              <el-input
                v-model="form.rpcEndpoint"
                placeholder="RPC节点或API Endpoint"
              />
            </el-form-item>
            <el-form-item label="链ID（EVM链使用）" prop="chainId">
              <el-input
                v-model="form.chainId"
                placeholder="链ID（EVM链使用）"
              />
            </el-form-item>
            <el-form-item label="提现是否启用" prop="withdrawEnabled">
              <el-radio-group v-model="form.withdrawEnabled">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="充值是否启用" prop="depositEnabled">

              <el-radio-group v-model="form.depositEnabled">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="最小提现金额" prop="minWithdrawAmount">
              <el-input
                v-model="form.minWithdrawAmount"
                placeholder="最小提现金额"
              />
            </el-form-item>
            <el-form-item label="固定提现手续费（USDT）" prop="withdrawFee">
              <el-input
                v-model="form.withdrawFee"
                placeholder="固定提现手续费（USDT）"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序权重" prop="sortOrder">
              <el-input
                v-model="form.sortOrder"
                placeholder="排序权重"
              />
            </el-form-item>
            <el-form-item label="备注说明" prop="remark">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="备注说明"
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
import { addHsConfigSupportedChainsCoin, delHsConfigSupportedChainsCoin, getHsConfigSupportedChainsCoin, listHsConfigSupportedChainsCoin, updateHsConfigSupportedChainsCoin } from '@/api/admin/hs-config-supported-chains-coin'

export default {
  name: 'HsConfigSupportedChainsCoin',
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
      hsConfigSupportedChainsCoinList: [],

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
      listHsConfigSupportedChainsCoin(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsConfigSupportedChainsCoinList = response.data.list
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
        chainCode: undefined,
        chainName: undefined,
        nativeSymbol: undefined,
        withdrawCoin: undefined,
        network: undefined,
        explorerUrl: undefined,
        rpcEndpoint: undefined,
        chainId: undefined,
        withdrawEnabled: '1',
        depositEnabled: undefined,
        minWithdrawAmount: undefined,
        withdrawFee: undefined,
        status: '1',
        sortOrder: undefined,
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
      this.title = '添加系统支持的区块链网络配置表'
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
      getHsConfigSupportedChainsCoin(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改系统支持的区块链网络配置表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsConfigSupportedChainsCoin(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsConfigSupportedChainsCoin(this.form).then(response => {
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
        return delHsConfigSupportedChainsCoin({ 'ids': Ids })
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
