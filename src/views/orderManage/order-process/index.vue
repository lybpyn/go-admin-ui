
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form label-width="120px">
          <el-row :gutter="10">
            <!-- <el-col :span="6">
              <el-form-item label="品牌">{{ form.cardType }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品牌">{{ form.cardType }}</el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="订单号">{{ form.id }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="国家">{{ form.regionId }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="余额类型">{{ form.balanceType == 1 ? '进入余额' : '虚拟币' }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作人">{{ form.assignName }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收卡总金额">{{ form.balance }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="礼品卡额外信息">{{ form.cardExtra }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="礼品卡类型">{{ form.cardType }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分类">{{ form.categoryId }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="货币代码">{{ form.currencyCode }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间">{{ parseTime(form.createdAt) }}</el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="订单状态">
                <el-tag v-if="form.status == 0" type="info">待支付</el-tag>
                <el-tag v-if="form.status == 1" type="success">已支付</el-tag>
                <el-tag v-if="form.status == 2" type="success">已发卡</el-tag>
                <el-tag v-if="form.status == 3" type="success">已完成</el-tag>
                <el-tag v-if="form.status == 4" type="danger">已取消</el-tag>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="处理状态">
                <el-tag v-if="form.status == 0" type="info">待支付</el-tag>
                <el-tag v-if="form.status == 1" type="success">已支付</el-tag>
                <el-tag v-if="form.status == 2" type="success">已发卡</el-tag>
                <el-tag v-if="form.status == 3" type="success">已完成</el-tag>
                <el-tag v-if="form.status == 4" type="danger">已取消</el-tag>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="售卡金额（元）">{{ form.balance }}</el-form-item>
            </el-col> -->
            <el-col :span="24">
              <el-form-item label="订单描述">
                <el-input
                  v-model="form.remark"
                  type="textarea"
                  clearable
                  size="small"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户备注">{{ form.brand }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单统计">{{ form.brand }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="平均金额">{{ form.brand }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input
                  v-model="form.adminRemark"
                  type="textarea"
                  clearable
                  size="small"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table v-loading="loading" :data="ordUserOrdersList">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="图片"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="操作"
            align="center"
            prop="regionId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="卡密"
            align="center"
            prop="categoryId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="售卡状态"
            align="center"
            prop="orderNo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="收卡商/失败原因"
            align="center"
            prop="giftcardId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="售卡汇率/失败图片"
            align="center"
            prop="cardType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="卡面值图片展示"
            align="center"
            prop="giftCardCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="卡类型"
            align="center"
            prop="balance"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="售卡金额"
            align="center"
            prop="currency"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="收卡汇率"
            align="center"
            prop="discountRate"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="收卡金额"
            align="center"
            prop="rate"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="添加|复制" align="center" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:ordUserOrders:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >
                +
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
        <div class="oprate-box" style="margin-top: 20px; display: flex; justify-content: center;">
          <el-button
            type="primary"
            @click="handleAdd"
          >
            保存
          </el-button>
          <el-button
            type="primary"
            @click="handleAdd"
          >
            完成
          </el-button>
        </div>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { getOrdUserOrdersDetail, batchWriteOffOrdUserOrders, getOrdOrderGiftcardImages } from '@/api/admin/ord-user-orders'

export default {
  name: 'OrdUserOrdersProcess',
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
        status: 0
      },
      // 表单参数
      form: {
        description: ''
      },
      // 表单校验
      rules: {},
      orderId: ''
    }
  },
  created() {
    this.orderId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    // 获取订单详情
    getDetail() {
      if (!this.orderId) {
        this.$message.error('请选择订单')
      }
      getOrdUserOrdersDetail(this.orderId).then(response => {
        this.form = response.data
        this.loading = false
        // "adminRecognizedCode": "管理员识别的兑换码",
        // "failureImageUrl": "失败上传图片",
        // "platformSaleRate": "品牌商销售汇率",
        // "platformSettlementAmount": "品牌商汇款金额",
        // "platformSettlementCurrency": "品牌商汇款货币代码",
        // "recognizedCardValue": "识别的兑换码面值",
        // "remark": "备注",
        // "status": "核销状态：0=待核销，1=已核销，2=失败"`",
        // "supplierId": "品牌商id
        if (this.form.cardType === 'physical') {
          getOrdOrderGiftcardImages({ orderId: this.orderId }).then(response => {
          })
        }
        this.ordUserOrdersList = [{
          physicalImageUrl: '',
          adminRecognizedCode: this.form.giftCardCode || '',
          failureImageUrl: '',
          platformSaleRate: '',
          platformSettlementAmount: '',
          platformSettlementCurrency: '',
          recognizedCardValue: '',
          status: 0,
          supplierId: ''
        }]
      })
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          batchWriteOffOrdUserOrders(this.form).then(response => {
            this.$message.success('核销成功')
            this.$router.push({ path: '/orderManage/orderList' })
          })
        } else {
          this.$message.error('请填写完整信息')
        }
      })
    }
  }
}
</script>
