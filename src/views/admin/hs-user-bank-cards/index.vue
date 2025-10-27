
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
          <el-form-item label="银行ID（关联hs_banks表）" prop="bankId"><el-input
            v-model="queryParams.bankId"
            placeholder="请输入银行ID（关联hs_banks表）"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="银行卡号（加密存储）" prop="cardNumber"><el-input
            v-model="queryParams.cardNumber"
            placeholder="请输入银行卡号（加密存储）"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="持卡人姓名" prop="cardHolderName"><el-input
            v-model="queryParams.cardHolderName"
            placeholder="请输入持卡人姓名"
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
              v-permisaction="['admin:hsUserBankCards:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsUserBankCards:edit']"
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
              v-permisaction="['admin:hsUserBankCards:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsUserBankCardsList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="用户ID"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="银行ID（关联hs_banks表）"
            align="center"
            prop="bankId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="银行名称"
            align="center"
            prop="bankName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="银行卡号（加密存储）"
            align="center"
            prop="cardNumber"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="持卡人姓名"
            align="center"
            prop="cardHolderName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="卡片类型：1=储蓄卡，2=信用卡"
            align="center"
            prop="cardType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="开户行/支行名称"
            align="center"
            prop="branchName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="预留手机号"
            align="center"
            prop="phone"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="身份证号（加密存储）"
            align="center"
            prop="idCard"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="是否默认银行卡：0=否，1=是"
            align="center"
            prop="isDefault"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="状态：0=禁用，1=启用，2=审核中"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="备注"
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsUserBankCards:edit']"
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
                  v-permisaction="['admin:hsUserBankCards:remove']"
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
import { addHsUserBankCards, delHsUserBankCards, getHsUserBankCards, listHsUserBankCards, updateHsUserBankCards } from '@/api/admin/hs-user-bank-cards'

export default {
  name: 'HsUserBankCards',
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
      hsUserBankCardsList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userId: undefined,
        bankId: undefined,
        cardNumber: undefined,
        cardHolderName: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { userId: [{ required: true, message: '用户ID不能为空', trigger: 'blur' }],
        bankId: [{ required: true, message: '银行ID（关联hs_banks表）不能为空', trigger: 'blur' }],
        cardNumber: [{ required: true, message: '银行卡号（加密存储）不能为空', trigger: 'blur' }],
        cardHolderName: [{ required: true, message: '持卡人姓名不能为空', trigger: 'blur' }]
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
      listHsUserBankCards(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsUserBankCardsList = response.data.list
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
      this.title = '添加用户银行卡信息表'
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
      getHsUserBankCards(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户银行卡信息表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsUserBankCards(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsUserBankCards(this.form).then(response => {
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
        return delHsUserBankCards({ 'ids': Ids })
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
