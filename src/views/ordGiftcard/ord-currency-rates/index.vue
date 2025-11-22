
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
          <el-form-item label="基准货币代码" prop="baseCurrencyCode"><el-input
            v-model="queryParams.baseCurrencyCode"
            placeholder="请输入基准货币代码 (ISO 4217)"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <!-- <el-form-item label="报价货币代码" prop="quoteCurrencyCode"><el-input
            v-model="queryParams.quoteCurrencyCode"
            placeholder="请输入报价货币代码 (ISO 4217)"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item> -->
          <el-form-item label="地区代码" prop="regionCode"><el-input
            v-model="queryParams.regionCode"
            placeholder="请输入地区代码,为空表示全局汇率"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="汇率类型" prop="rateType">
            <el-select v-model="queryParams.rateType" placeholder="请选择汇率类型" clearable size="small">
              <el-option label="标准" value="standard" />
              <el-option label="买入" value="buying" />
              <el-option label="卖出" value="selling" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
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
              v-permisaction="['admin:ordConfigCurrencyRates:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordConfigCurrencyRates:edit']"
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
              v-permisaction="['admin:ordConfigCurrencyRates:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="ordConfigCurrencyRatesList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="基准货币代码"
            align="center"
            prop="baseCurrencyCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="报价货币代码"
            align="center"
            prop="quoteCurrencyCode"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="汇率"
            align="center"
            prop="rate"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.rate" placeholder="请输入汇率" @blur="updateRate(scope.row)" />
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="地区代码"
            align="center"
            prop="regionCode"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column
            label="汇率类型"
            align="center"
            prop="rateType"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.rateType === 'standard'">标准</el-tag>
              <el-tag v-if="scope.row.rateType === 'buying'">买入</el-tag>
              <el-tag v-if="scope.row.rateType === 'selling'">卖出</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="汇率来源"
            align="center"
            prop="source"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
              <el-tag v-if="scope.row.status == 0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="生效开始时间"
            align="center"
            prop="validFrom"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.validFrom) }}</span>
            </template>
          </el-table-column><el-table-column
            label="生效结束时间"
            align="center"
            prop="validTo"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.validTo) }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:ordConfigCurrencyRates:edit']"
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
                  v-permisaction="['admin:ordConfigCurrencyRates:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="600px">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">

            <el-form-item label="基准货币代码" prop="baseCurrencyCode">
              <el-input
                v-model="form.baseCurrencyCode"
                placeholder="基准货币代码 (ISO 4217)"
              />
            </el-form-item>
            <el-form-item label="报价货币代码" prop="quoteCurrencyCode">
              <el-input
                v-model="form.quoteCurrencyCode"
                placeholder="报价货币代码 (ISO 4217)"
              />
            </el-form-item>
            <el-form-item label="汇率" prop="rate">
              <el-input
                v-model="form.rate"
                placeholder="汇率: 1 base_currency = rate quote_currency"
              />
            </el-form-item>
            <!-- <el-form-item label="地区代码" prop="regionCode">
              <el-input
                v-model="form.regionCode"
                placeholder="地区代码,为空表示全局汇率"
              />
            </el-form-item> -->
            <el-form-item label="汇率类型" prop="rateType">
              <el-select v-model="form.rateType">
                <el-option label="标准" value="standard" />
                <el-option label="买入" value="buying" />
                <el-option label="卖出" value="selling" />
              </el-select>
            </el-form-item>
            <el-form-item label="汇率来源" prop="source">
              <el-input
                v-model="form.source"
                placeholder="汇率来源,如 manual, api, coingecko"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-switch v-model="form.status" active-value="1" inactive-value="0" />
            </el-form-item>
            <!-- <el-form-item label="生效开始时间" prop="validFrom">
              <el-date-picker
                v-model="form.validFrom"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="生效结束时间" prop="validTo">
              <el-date-picker
                v-model="form.validTo"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item> -->
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
import { addOrdConfigCurrencyRates, delOrdConfigCurrencyRates, getOrdConfigCurrencyRates, listOrdConfigCurrencyRates, updateOrdConfigCurrencyRates } from '@/api/admin/ord-config-currency-rates'

export default {
  name: 'OrdConfigCurrencyRates',
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
      ordConfigCurrencyRatesList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        baseCurrencyCode: undefined,
        quoteCurrencyCode: undefined,
        rate: undefined,
        regionCode: undefined,
        rateType: undefined,
        source: undefined,
        status: undefined,
        validFrom: undefined,
        validTo: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { baseCurrencyCode: [{ required: true, message: '基准货币代码 (ISO 4217)不能为空', trigger: 'blur' }],
        quoteCurrencyCode: [{ required: true, message: '报价货币代码 (ISO 4217)不能为空', trigger: 'blur' }],
        rate: [{ required: true, message: '汇率: 1 base_currency = rate quote_currency不能为空', trigger: 'blur' }],
        regionCode: [{ required: true, message: '地区代码,为空表示全局汇率不能为空', trigger: 'blur' }],
        rateType: [{ required: true, message: '汇率类型: standard=标准, buying=买入, selling=卖出不能为空', trigger: 'blur' }],
        source: [{ required: true, message: '汇率来源,如 manual, api, coingecko不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '状态: 1=启用, 0=禁用不能为空', trigger: 'blur' }],
        validFrom: [{ required: true, message: '生效开始时间不能为空', trigger: 'blur' }],
        validTo: [{ required: true, message: '生效结束时间不能为空', trigger: 'blur' }]
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
      listOrdConfigCurrencyRates(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.ordConfigCurrencyRatesList = response.data.list
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
        baseCurrencyCode: undefined,
        quoteCurrencyCode: undefined,
        rate: undefined,
        regionCode: undefined,
        rateType: undefined,
        source: undefined,
        status: undefined,
        validFrom: undefined,
        validTo: undefined
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
      this.title = '添加货币汇率表-支持多币种对和地区化配置'
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
      getOrdConfigCurrencyRates(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改货币汇率表-支持多币种对和地区化配置'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateOrdConfigCurrencyRates(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addOrdConfigCurrencyRates(this.form).then(response => {
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
    updateRate(row) {
      updateOrdConfigCurrencyRates(row).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.getList()
        } else {
          this.msgError(response.msg)
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
        return delOrdConfigCurrencyRates({ 'ids': Ids })
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
