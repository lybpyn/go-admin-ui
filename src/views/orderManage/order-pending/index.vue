
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="用户ID:">
            <el-input v-model="queryParams.userId" placeholder="请输入用户ID" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordUserOrders:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordUserOrders:edit']"
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
              v-permisaction="['admin:ordUserOrders:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="ordUserOrdersList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="用户ID"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="地区ID"
            align="center"
            prop="regionId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="分类ID"
            align="center"
            prop="categoryId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="订单号"
            align="center"
            prop="orderNo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="礼品卡"
            align="center"
            prop="giftcardId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="卡片类型"
            align="center"
            prop="cardType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="礼品卡卡号验证码"
            align="center"
            prop="giftCardCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="卡余额"
            align="center"
            prop="balance"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="币种"
            align="center"
            prop="currency"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="折扣"
            align="center"
            prop="discountRate"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="汇率"
            align="center"
            prop="rate"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="订单状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 5">待处理</el-tag>
              <el-tag v-if="scope.row.status == 1">已经接单</el-tag>
              <el-tag v-if="scope.row.status == 2">已完成</el-tag>
              <el-tag v-if="scope.row.status == 3">已取消</el-tag>
              <el-tag v-if="scope.row.status == 4">已经驳回</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label=""
            align="center"
            prop="cardExtra"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="完成时间"
            align="center"
            prop="completedAt"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.completedAt) }}</span>
            </template>
          </el-table-column><el-table-column
            label="取消时间"
            align="center"
            prop="canceledAt"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.canceledAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 5"
                slot="reference"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleProcess(scope.row)"
              >
                处理
              </el-button>
              <!-- <el-button
                slot="reference"
                v-permisaction="['admin:ordUserOrders:edit']"
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
                  v-permisaction="['admin:ordUserOrders:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="用户ID" prop="userId">
              <el-input
                v-model="form.userId"
                placeholder="用户ID"
              />
            </el-form-item>
            <el-form-item label="地区ID" prop="regionId">
              <el-input
                v-model="form.regionId"
                placeholder="地区ID"
              />
            </el-form-item>
            <el-form-item label="分类ID" prop="categoryId">
              <el-input
                v-model="form.categoryId"
                placeholder="分类ID"
              />
            </el-form-item>
            <el-form-item label="订单号" prop="orderNo">
              <el-input
                v-model="form.orderNo"
                placeholder="订单号"
              />
            </el-form-item>
            <el-form-item label="礼品卡id" prop="giftcardId">
              <el-input
                v-model="form.giftcardId"
                placeholder="礼品卡id"
              />
            </el-form-item>
            <el-form-item label="卡片类型(Physical,Code,Receipy,Cash Receipt)" prop="cardType">
              <el-input
                v-model="form.cardType"
                placeholder="卡片类型(Physical,Code,Receipy,Cash Receipt)"
              />
            </el-form-item>
            <el-form-item label="礼品卡卡号验证码" prop="giftCardCode">
              <el-input
                v-model="form.giftCardCode"
                placeholder="礼品卡卡号验证码"
              />
            </el-form-item>
            <el-form-item label="卡余额" prop="balance">
              <el-input
                v-model="form.balance"
                placeholder="卡余额"
              />
            </el-form-item>
            <el-form-item label="币种，例如 USD, CNY" prop="currency">
              <el-input
                v-model="form.currency"
                placeholder="币种，例如 USD, CNY"
              />
            </el-form-item>
            <el-form-item label="折扣" prop="discountRate">
              <el-input
                v-model="form.discountRate"
                placeholder="折扣"
              />
            </el-form-item>
            <el-form-item label="汇率" prop="rate">
              <el-input
                v-model="form.rate"
                placeholder="汇率"
              />
            </el-form-item>
            <el-form-item label="订单状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择订单状态">
                <el-option value="0">待处理</el-option>
                <el-option value="1">已经接单</el-option>
                <el-option value="2">已完成</el-option>
                <el-option value="3">已取消</el-option>
                <el-option value="4">已经驳回</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="cardExtra">
              <el-input
                v-model="form.cardExtra"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="完成时间" prop="completedAt">
              <el-date-picker
                v-model="form.completedAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="取消时间" prop="canceledAt">
              <el-date-picker
                v-model="form.canceledAt"
                type="datetime"
                placeholder="选择日期"
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
import { addOrdUserOrders, delOrdUserOrders, getOrdUserOrders, listOrdUserOrders, updateOrdUserOrders, acceptOrdUserOrders, listMyAssignedOrdUserOrders } from '@/api/admin/ord-user-orders'

export default {
  name: 'OrdUserOrders',
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
      ordUserOrdersList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        status: 5
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
      listOrdUserOrders(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.ordUserOrdersList = response.data.list
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
        regionId: undefined,
        categoryId: undefined,
        orderNo: undefined,
        giftcardId: undefined,
        cardType: undefined,
        giftCardCode: undefined,
        balance: undefined,
        currency: undefined,
        discountRate: undefined,
        rate: undefined,
        status: 5,
        cardExtra: undefined,
        completedAt: undefined,
        canceledAt: undefined
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
      this.title = '添加礼品卡订单表'
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
      getOrdUserOrders(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改礼品卡订单表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateOrdUserOrders(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addOrdUserOrders(this.form).then(response => {
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
        return delOrdUserOrders({ 'ids': Ids })
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
    },
    /** 处理订单处理按钮操作 */
    async handleProcess(row) {
      const res = await acceptOrdUserOrders(row.id)
      const result = await listMyAssignedOrdUserOrders({ pageIndex: 1, pageSize: 1000 })
      let giftCardCode = ''
      let OrderNo = ''
      result.data.list.forEach(item => {
        if (item.id === row.id) {
          giftCardCode = item.giftCardCode
          OrderNo = item.OrderNo
        }
      })
      if (res.code === 200) {
        this.$router.push({
          path: '/orderManage/order-process',
          query: {
            id: row.id,
            giftCardCode: giftCardCode,
            OrderNo: OrderNo
          }
        })
      } else {
        this.msgError(res.msg)
      }
    }
  }
}
</script>
