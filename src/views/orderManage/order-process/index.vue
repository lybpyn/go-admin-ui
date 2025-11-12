
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
              <el-form-item label="订单号">{{ OrderNo }}</el-form-item>
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
            <el-col :span="6">
              <el-form-item label="订单状态">
                <el-tag v-if="form.status == 0" type="info">待支付</el-tag>
                <el-tag v-if="form.status == 1" type="success">已支付</el-tag>
                <el-tag v-if="form.status == 2" type="success">已发卡</el-tag>
                <el-tag v-if="form.status == 3" type="success">已完成</el-tag>
                <el-tag v-if="form.status == 4" type="danger">已取消</el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="处理状态">
                <el-tag v-if="form.processingStatus == 0" type="info">待处理</el-tag>
                <el-tag v-if="form.processingStatus == 1" type="success">正在处理</el-tag>
                <el-tag v-if="form.processingStatus == 2" type="danger">已取消</el-tag>
                <el-tag v-if="form.processingStatus == 3" type="success">已完成</el-tag>
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
          <el-table-column
            label="图片"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
            width="50"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 30px"
                :src="scope.row.physicalImageUrl"
                :preview-src-list="[scope.row.physicalImageUrl]"
                fit="fill"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            prop="regionId"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div v-if="form.status < 3" style="padding: 2px;">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleProcess(scope.row,1)"
                >通过
                </el-button>
              </div>
              <div style="padding: 2px;">
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleProcess(scope.row,2)"
                >拒绝
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="卡密"
            align="center"
            prop="adminRecognizedCode"
            :show-overflow-tooltip="true"
            width="200"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.adminRecognizedCode"
                type="text"
                clearable
                size="small"
                placeholder="请输入卡密"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="售卡状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" size="small">
                <el-option label="待核销" :value="0" />
                <el-option label="已核销" :value="1" />
                <el-option label="售卡失败" :value="2" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="收卡商/失败原因"
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.remark"
                type="text"
                clearable
                size="small"
                placeholder="请输入失败原因"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="售卡/失败图片"
            align="center"
            prop="cardType"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-upload
                class="upload-demo"
                :headers="headers"
                action="https://adminapi.cardpartner.io/api/v1/public/uploadFile"
                :on-success="(response, file, fileList) => handleUploadChange(response, file, fileList,scope.row)"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column
            label="品牌商"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.supplierId" size="small">
                <el-option v-for="item in supplierOptions" :key="item.id" :label="item.name" :value="item.id" @change="handleSupplierChange(item,scope.row)" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="卡面值"
            align="center"
            prop="recognizedCardValue"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.recognizedCardValue"
                placeholder="卡面值"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="卡类型"
            align="center"
            prop="cardType"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="售卡金额"
            align="center"
            prop="balance"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.balance"
                type="text"
                clearable
                size="small"
                placeholder="请输入售卡金额"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="收卡汇率"
            align="center"
            prop="platformSaleRate"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.platformSaleRate"
                placeholder="请输入收卡汇率"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="收卡金额"
            align="platformSettlementAmount"
            prop="rate"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.platformSettlementAmount"
                type="text"
                clearable
                size="small"
                placeholder="请输入收卡金额"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="收卡货币"
            align="center"
            prop="platformSettlementCurrency"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.platformSettlementCurrency"
                type="text"
                clearable
                size="small"
                placeholder="请输入收卡货币"
              />
            </template>
          </el-table-column>
          <el-table-column label="添加|删除" align="center" width="200">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="handleAdd(scope.row)"
              >
                添加
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDel(scope.row,scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="oprate-box" style="margin-top: 20px; display: flex; justify-content: center;">
          <!-- <el-button
            type="primary"
            @click="handleAdd"
          >
            保存
          </el-button> -->
          <el-button
            type="primary"
            @click="handleComplete"
          >
            完成
          </el-button>
        </div>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { getOrdUserOrdersDetail, batchWriteOffOrdUserOrders, getOrdOrderGiftcardImages, listOrdGiftCardSuppliers } from '@/api/admin/ord-user-orders'
import { getToken } from '@/utils/auth'
export default {
  name: 'OrdUserOrdersProcess',
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
      orderId: '',
      giftCardCode: '',
      fileList: [],
      supplierOptions: [],
      OrderNo: ''
    }
  },
  created() {
    this.orderId = this.$route.query.id
    this.giftCardCode = this.$route.query.giftCardCode
    this.OrderNo = this.$route.query.OrderNo
    this.getDetail()
  },
  methods: {
    // 获取订单详情
    async getDetail() {
      if (!this.orderId) {
        this.$message.error('请选择订单')
      }
      const response1 = await getOrdUserOrdersDetail(this.orderId)
      this.form = response1.data
      const supplierList = await listOrdGiftCardSuppliers({ pageIndex: 1, pageSize: 1000 })
      supplierList.data.list.forEach(item => {
        item.id = String(item.id)
      })
      this.supplierOptions = supplierList.data.list || []
      this.loading = false
      if (this.form.cardType === 'physical') {
        getOrdOrderGiftcardImages({ orderId: this.orderId }).then(response => {
          const list = response.data.list || []
          list.forEach(item => {
            this.ordUserOrdersList.push({
              physicalImageUrl: item.imageUrl,
              adminRecognizedCode: '',
              failureImageUrl: '',
              platformSaleRate: this.form.discountRate,
              platformSettlementAmount: this.form.platformSaleRate,
              platformSettlementCurrency: this.supplierOptions[0].settlementCurrencyCode || '',
              recognizedCardValue: '',
              status: 0,
              supplierId: this.supplierOptions[0].id || '',
              balance: this.form.balance,
              cardType: this.form.cardType
            })
          })
        })
      } else {
        this.ordUserOrdersList = [{
          physicalImageUrl: '',
          adminRecognizedCode: this.giftCardCode || '',
          failureImageUrl: '',
          platformSaleRate: this.form.discountRate,
          platformSettlementAmount: '',
          platformSettlementCurrency: this.supplierOptions[0].settlementCurrencyCode || '',
          recognizedCardValue: '',
          status: 0,
          supplierId: this.supplierOptions[0].id || '',
          balance: this.form.balance,
          cardType: this.form.cardType,
          currencyCode: this.form.currencyCode
        }]
      }
    },
    submit(list) {
      const params = {
        giftCardId: this.form.giftcardId,
        orderId: this.orderId,
        userId: this.form.userId,
        writeoffList: list
      }
      batchWriteOffOrdUserOrders(params).then(response => {
        this.$message.success('核销成功')
        this.getDetail()
      })
    },
    handleProcess(row, type) {
      if (type === 1) {
        row.status = 1
        this.submit([row])
      } else if (type === 2) {
        row.status = 2
        this.submit([row])
      }
    },
    handleComplete() {
      this.submit(this.ordUserOrdersList)
    },
    handleAdd(row) {
      this.ordUserOrdersList.push(this.ordUserOrdersList[0])
    },
    handleDel(row, index) {
      this.ordUserOrdersList.splice(index, 1)
    },
    handleUploadChange(response, file, fileList, row) {
      if (response.code === 200) {
        row.failureImageUrl = response.data.full_path
      } else {
        this.msgError(response.msg)
      }
    },
    handleSupplierChange(item, row) {
      row.platformSettlementCurrency = item.settlementCurrencyCode || ''
    }
  }
}
</script>
