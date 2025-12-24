
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="110px">
          <el-form-item label="提现单号" prop="withdrawNo"><el-input
            v-model="queryParams.withdrawNo"
            placeholder="请输入提现单号，唯一"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="用户ID" prop="userId"><el-input
            v-model="queryParams.userId"
            placeholder="请输入用户ID"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="币种代码" prop="currencyCode"><el-input
            v-model="queryParams.currencyCode"
            placeholder="请输入ISO 4217币种代码，如 USD/CNY"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="提现方式" prop="method">
            <el-select
              v-model="queryParams.method"
              placeholder="请选择提现方式"
              clearable
              size="small"
              @change="handleQuery"
            >
              <el-option label="crypto" value="crypto" />
              <el-option label="bank" value="bank" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small" @change="handleQuery">
              <el-option label="待处理" value="pending" />
              <el-option label="审核中" value="review" />
              <el-option label="处理中" value="processing" />
              <el-option label="成功" value="success" />
              <el-option label="失败" value="failed" />
              <el-option label="已取消" value="canceled" />
            </el-select>
          </el-form-item> -->
          <el-form-item label="通道回执流水号" prop="channelTxnId"><el-input
            v-model="queryParams.channelTxnId"
            placeholder="请输入通道回执流水号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="发起时间" prop="requestedAt">
            <el-date-picker
              v-model="queryParams.requestedAt"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="处理完成时间" prop="processedAt">
            <el-date-picker
              v-model="queryParams.processedAt"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsUserWithdrawal:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsUserWithdrawal:edit']"
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
              v-permisaction="['admin:hsUserWithdrawal:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="hsUserWithdrawalList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="提现单号"
            align="center"
            prop="withdrawNo"
            :show-overflow-tooltip="true"
            width="150px"
          /><el-table-column
            label="用户ID"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
            width="150px"
          /><el-table-column
            label="币种代码"
            align="center"
            prop="currencyCode"
            :show-overflow-tooltip="true"
            width="80px"
          /><el-table-column
            label="提现金额"
            align="center"
            prop="amount"
            :show-overflow-tooltip="true"
            width="120px"
          /><el-table-column
            label="提现手续费"
            align="center"
            prop="fee"
            :show-overflow-tooltip="true"
            width="120px"
          /><el-table-column
            label="实际出账金额"
            align="center"
            prop="netAmount"
            :show-overflow-tooltip="true"
            width="120px"
          /><el-table-column
            label="提现方式"
            align="center"
            prop="method"
            :show-overflow-tooltip="true"
            width="120px"
          /><el-table-column
            label="提现账户信息"
            align="center"
            prop="accountInfo"
            :show-overflow-tooltip="true"
            width="200px"
          />
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
            width="120px"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.status == 'review' ? 'info' : (scope.row.status == 'pending' ? 'info' : (scope.row.status == 'processing' ? 'info' : (scope.row.status == 'success' ? 'success' : (scope.row.status == 'failed' ? 'danger' : 'danger'))))">{{ scope.row.status == 'review' ? '审核中' : (scope.row.status == 'pending' ? '待处理' : (scope.row.status == 'processing' ? '处理中' : (scope.row.status == 'success' ? '成功' : (scope.row.status == 'failed' ? '失败' : '已取消')))) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="接单管理员ID"
            align="center"
            prop="handlerId"
            :show-overflow-tooltip="true"
            width="150px"
          /><el-table-column
            label="接单管理员名称"
            align="center"
            prop="handlerName"
            :show-overflow-tooltip="true"
            width="150px"
          /><el-table-column
            label="接单时间"
            align="center"
            prop="claimedAt"
            :show-overflow-tooltip="true"
            width="150px"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.claimedAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否已接单"
            align="center"
            prop="isClaimed"
            :show-overflow-tooltip="true"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.isClaimed == 0 ? '未接单(可接单)' : '已接单(已锁定)' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="失败/取消原因"
            align="center"
            prop="reason"
            :show-overflow-tooltip="true"
            width="200px"
          /><el-table-column
            label="通道回执流水号"
            align="center"
            prop="channelTxnId"
            :show-overflow-tooltip="true"
            width="200px"
          /><el-table-column
            label="发起时间"
            align="center"
            prop="requestedAt"
            :show-overflow-tooltip="true"
            width="150px"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.requestedAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="处理完成时间"
            align="center"
            prop="processedAt"
            :show-overflow-tooltip="true"
            width="150px"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.processedAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 'review' || scope.row.status == 'pending'"
                slot="reference"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleApprove(scope.row)"
              >审核
              </el-button>
              <!-- <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:hsUserWithdrawal:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm> -->
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
        <!-- <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="状态：pending/review/processing/success/failed/canceled" prop="status">
              <el-input
                v-model="form.status"
                placeholder="状态：pending/review/processing/success/failed/canceled"
              />
            </el-form-item>
            <el-form-item label="接单管理员ID（关联sys_user.user_id）" prop="handlerId">
              <el-input
                v-model="form.handlerId"
                placeholder="接单管理员ID（关联sys_user.user_id）"
              />
            </el-form-item>
            <el-form-item label="接单管理员名称（冗余字段）" prop="handlerName">
              <el-input
                v-model="form.handlerName"
                placeholder="接单管理员名称（冗余字段）"
              />
            </el-form-item>
            <el-form-item label="接单时间" prop="claimedAt">
              <el-date-picker
                v-model="form.claimedAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="是否已接单：0=未接单(可接单), 1=已接单(已锁定)" prop="isClaimed">
              <el-input
                v-model="form.isClaimed"
                placeholder="是否已接单：0=未接单(可接单), 1=已接单(已锁定)"
              />
            </el-form-item>
            <el-form-item label="失败/取消原因" prop="reason">
              <el-input
                v-model="form.reason"
                placeholder="失败/取消原因"
              />
            </el-form-item>
            <el-form-item label="通道回执流水号" prop="channelTxnId">
              <el-input
                v-model="form.channelTxnId"
                placeholder="通道回执流水号"
              />
            </el-form-item>
            <el-form-item label="发起时间" prop="requestedAt">
              <el-date-picker
                v-model="form.requestedAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="处理完成时间" prop="processedAt">
              <el-date-picker
                v-model="form.processedAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog> -->
        <el-dialog title="审核提现" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="操作类型" prop="success">
              <el-radio-group v-model="form.type">
                <el-radio label="1">自动转账</el-radio>
                <el-radio label="2">手动转账</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.type === '2'" label="转账结果" prop="success">
              <el-radio-group v-model="form.success">
                <el-radio :label="true">成功</el-radio>
                <el-radio :label="false">失败</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.type === '2'" label="转账图片" prop="transferImage">
              <!-- <el-input
                v-model="form.imageUrl"
                placeholder="图片地址"
              /> -->
              <el-upload
                class="upload-demo"
                :headers="headers"
                :limit="1"
                action="https://adminapi.cardpartner.io/api/v1/public/uploadFile"
                :on-success="handleUploadChange"
                :file-list="fileList"
                list-type="picture"
                :on-remove="handleRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                placeholder=""
                type="textarea"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormApprove">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { addHsUserWithdrawal, delHsUserWithdrawal, getHsUserWithdrawal, listHsUserWithdrawal, updateHsUserWithdrawal, manualTransferHsUserWithdrawal, approveHsUserWithdrawal } from '@/api/admin/hs-user-withdrawal'
import { getToken } from '@/utils/auth'
export default {
  name: 'HsUserWithdrawal',
  components: {
  },
  data() {
    return {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
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
      hsUserWithdrawalList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        withdrawNo: undefined,
        userId: undefined,
        currencyCode: undefined,
        amount: undefined,
        fee: undefined,
        netAmount: undefined,
        method: undefined,
        accountInfo: undefined,
        status: 'review',
        handlerId: undefined,
        handlerName: undefined,
        claimedAt: undefined,
        isClaimed: undefined,
        reason: undefined,
        channelTxnId: undefined,
        requestedAt: undefined,
        processedAt: undefined

      },
      // 表单参数
      form: {
        type: '1',
        success: true,
        id: undefined,
        transferImage: undefined,
        remark: ''
      },
      // 表单校验
      // rules: { withdrawNo: [{ required: true, message: '提现单号，唯一不能为空', trigger: 'blur' }],
      //   userId: [{ required: true, message: '用户ID不能为空', trigger: 'blur' }],
      //   currencyCode: [{ required: true, message: 'ISO 4217币种代码，如 USD/CNY不能为空', trigger: 'blur' }],
      //   amount: [{ required: true, message: '提现金额不能为空', trigger: 'blur' }],
      //   fee: [{ required: true, message: '提现手续费不能为空', trigger: 'blur' }],
      //   netAmount: [{ required: true, message: '实际出账金额（amount - fee）不能为空', trigger: 'blur' }],
      //   method: [{ required: true, message: '提现方式：bank/crypto不能为空', trigger: 'blur' }],
      //   accountInfo: [{ required: true, message: '提现账户信息（脱敏）不能为空', trigger: 'blur' }],
      //   status: [{ required: true, message: '状态：pending/review/processing/success/failed/canceled不能为空', trigger: 'blur' }],
      //   handlerId: [{ required: true, message: '接单管理员ID（关联sys_user.user_id）不能为空', trigger: 'blur' }],
      //   handlerName: [{ required: true, message: '接单管理员名称（冗余字段）不能为空', trigger: 'blur' }],
      //   claimedAt: [{ required: true, message: '接单时间不能为空', trigger: 'blur' }],
      //   isClaimed: [{ required: true, message: '是否已接单：0=未接单(可接单), 1=已接单(已锁定)不能为空', trigger: 'blur' }],
      //   reason: [{ required: true, message: '失败/取消原因不能为空', trigger: 'blur' }],
      //   channelTxnId: [{ required: true, message: '通道回执流水号不能为空', trigger: 'blur' }],
      //   requestedAt: [{ required: true, message: '发起时间不能为空', trigger: 'blur' }],
      //   processedAt: [{ required: true, message: '处理完成时间不能为空', trigger: 'blur' }]
      // },
      fileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listHsUserWithdrawal(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsUserWithdrawalList = response.data.list
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
        status: 'review',
        handlerId: undefined,
        handlerName: undefined,
        claimedAt: undefined,
        isClaimed: undefined,
        reason: undefined,
        channelTxnId: undefined,
        requestedAt: undefined,
        processedAt: undefined,
        remark: '',
        transferImage: '',
        type: '1'
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
      this.title = '添加用户余额提现申请表'
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
      getHsUserWithdrawal(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户余额提现申请表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsUserWithdrawal(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsUserWithdrawal(this.form).then(response => {
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
    /** 审核按钮操作 */
    handleApprove(row) {
      this.form.id = row.id
      this.form.success = true
      this.form.remark = ''
      this.form.transferImage = ''
      this.form.type = '1'
      this.open = true
    },
    handleUploadChange(res) {
      this.form.transferImage = res.data ? res.data.full_path : ''
    },
    handleRemove() {
      this.form.transferImage = ''
      this.fileList = []
    },
    /** 提交审核按钮 */
    submitFormApprove: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.type === '2') {
            manualTransferHsUserWithdrawal(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            approveHsUserWithdrawal(this.form).then(response => {
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
        return delHsUserWithdrawal({ 'ids': Ids })
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
