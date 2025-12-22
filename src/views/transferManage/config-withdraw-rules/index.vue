
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="币种代码" prop="currencyCode"><el-input
            v-model="queryParams.currencyCode"
            placeholder="请输入币种代码"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="币种类型" prop="currencyType">
            <el-select v-model="queryParams.currencyType" placeholder="请选择币种类型" @change="handleQuery">
              <el-option label="法币" value="fiat" />
              <el-option label="虚拟币" value="crypto" />
            </el-select>
          </el-form-item>
          <el-form-item label="链类型" prop="chainType"><el-input
            v-model="queryParams.chainType"
            placeholder="请输入链类型（仅虚拟币适用），如 ERC20/TRC20/BEP20"
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
              v-permisaction="['admin:hsConfigWithdrawRules:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsConfigWithdrawRules:edit']"
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
              v-permisaction="['admin:hsConfigWithdrawRules:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsConfigWithdrawRulesList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="币种代码"
            align="center"
            prop="currencyCode"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="币种类型"
            align="center"
            prop="currencyType"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.currencyType=='fiat'">法币</span>
              <span v-else>虚拟币</span>
            </template>
          </el-table-column>
          <el-table-column
            label="链类型"
            align="center"
            prop="chainType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="单笔最小提现数量/金额"
            align="center"
            prop="singleMin"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="单笔最大提现数量/金额"
            align="center"
            prop="singleMax"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="每日累计提现上限"
            align="center"
            prop="dailyLimitAmount"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="每日提现次数上限"
            align="center"
            prop="dailyLimitCount"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="手续费类型"
            align="center"
            prop="feeType"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.feeType=='fixed'">固定</span>
              <span v-else-if="scope.row.feeType=='rate'">按比例</span>
              <span v-else>固定+比例</span>
            </template>
          </el-table-column>
          <el-table-column
            label="固定手续费数量/金额"
            align="center"
            prop="feeFixed"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="手续费率 %"
            align="center"
            prop="feeRate"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="最小手续费"
            align="center"
            prop="minFee"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="最高手续费"
            align="center"
            prop="maxFee"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="是否启用"
            align="center"
            prop="isActive"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isActive==1">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsConfigWithdrawRules:edit']"
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
                  v-permisaction="['admin:hsConfigWithdrawRules:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="700px">
          <el-form ref="form" :model="form" :rules="rules" label-width="180px">

            <el-form-item label="币种代码" prop="currencyCode">
              <el-input
                v-model="form.currencyCode"
                placeholder="币种代码，如 USD、CNY、USDT、BTC"
              />
            </el-form-item>
            <el-form-item label="币种类型" prop="currencyType">
              <el-select v-model="form.currencyType" placeholder="请选择币种类型">
                <el-option label="法币" value="fiat" />
                <el-option label="虚拟币" value="crypto" />
              </el-select>
            </el-form-item>
            <el-form-item label="链类型" prop="chainType">
              <el-input
                v-model="form.chainType"
                placeholder="链类型（仅虚拟币适用），如 ERC20/TRC20/BEP20"
              />
            </el-form-item>
            <el-form-item label="单笔最小提现数量/金额" prop="singleMin">
              <el-input
                v-model="form.singleMin"
                placeholder="单笔最小提现数量/金额"
              />
            </el-form-item>
            <el-form-item label="单笔最大提现数量/金额" prop="singleMax">
              <el-input
                v-model="form.singleMax"
                placeholder="单笔最大提现数量/金额"
              />
            </el-form-item>
            <el-form-item label="每日累计提现上限" prop="dailyLimitAmount">
              <el-input
                v-model="form.dailyLimitAmount"
                placeholder="每日累计提现上限"
              />
            </el-form-item>
            <el-form-item label="每日提现次数上限" prop="dailyLimitCount">
              <el-input
                v-model="form.dailyLimitCount"
                placeholder="每日提现次数上限"
              />
            </el-form-item>
            <el-form-item label="手续费类型" prop="feeType">
              <el-select v-model="form.feeType" placeholder="请选择手续费类型">
                <el-option label="固定" value="fixed" />
                <el-option label="按比例" value="rate" />
                <el-option label="固定+比例" value="mixed" />
              </el-select>
            </el-form-item>
            <el-form-item label="固定手续费数量/金额" prop="feeFixed">
              <el-input
                v-model="form.feeFixed"
                placeholder="固定手续费数量/金额"
              />
            </el-form-item>
            <el-form-item label="手续费率%" prop="feeRate">
              <el-input
                v-model="form.feeRate"
                placeholder="手续费率（例如 0.015 表示 1.5%）"
              />
            </el-form-item>
            <el-form-item label="最小手续费" prop="minFee">
              <el-input
                v-model="form.minFee"
                placeholder="最小手续费"
              />
            </el-form-item>
            <el-form-item label="最高手续费" prop="maxFee">
              <el-input
                v-model="form.maxFee"
                placeholder="最高手续费"
              />
            </el-form-item>
            <el-form-item label="是否启用" prop="isActive">
              <el-radio-group v-model="form.isActive">
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
import { addHsConfigWithdrawRules, delHsConfigWithdrawRules, getHsConfigWithdrawRules, listHsConfigWithdrawRules, updateHsConfigWithdrawRules } from '@/api/admin/hs-config-withdraw-rules'

export default {
  name: 'HsConfigWithdrawRules',
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
      hsConfigWithdrawRulesList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        currencyCode: undefined,
        currencyType: undefined,
        chainType: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { currencyCode: [{ required: true, message: '币种代码，如 USD、CNY、USDT、BTC不能为空', trigger: 'blur' }],
        currencyType: [{ required: true, message: '币种类型：fiat=法币，crypto=虚拟币不能为空', trigger: 'blur' }],
        chainType: [{ required: true, message: '链类型（仅虚拟币适用），如 ERC20/TRC20/BEP20不能为空', trigger: 'blur' }]
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
      listHsConfigWithdrawRules(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsConfigWithdrawRulesList = response.data.list
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
        currencyCode: undefined,
        currencyType: undefined,
        chainType: undefined,
        singleMin: undefined,
        singleMax: undefined,
        dailyLimitAmount: undefined,
        dailyLimitCount: undefined,
        feeType: undefined,
        feeFixed: undefined,
        feeRate: undefined,
        minFee: undefined,
        maxFee: undefined,
        isActive: undefined
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
      this.title = '添加提现规则配置表（兼容法币与虚拟币）'
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
      getHsConfigWithdrawRules(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改提现规则配置表（兼容法币与虚拟币）'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsConfigWithdrawRules(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsConfigWithdrawRules(this.form).then(response => {
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
        return delHsConfigWithdrawRules({ 'ids': Ids })
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
