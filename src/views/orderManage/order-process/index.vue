
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
              <el-form-item label="订单号:">{{ OrderNo }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地区:">{{ filterRegionName(form.regionId) }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="余额类型:">{{ form.balanceType == 1 ? '进入余额' : '虚拟币' }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作人:">{{ form.assignName }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收卡总金额:">{{ form.balance }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="礼品卡额外信息:">{{ form.cardExtra }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="礼品卡类型:">{{ form.cardType }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分类:">{{ filterGiftcardCategory(form.categoryId) }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="货币代码:">{{ form.currencyCode }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间:">{{ parseTime(form.createdAt) }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单状态:">
                <el-tag v-if="form.status == 5">待处理</el-tag>
                <el-tag v-if="form.status == 1">已经接单</el-tag>
                <el-tag v-if="form.status == 2">已完成</el-tag>
                <el-tag v-if="form.status == 3">已取消</el-tag>
                <el-tag v-if="form.status == 4">已经驳回</el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="处理状态:">
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
              <el-form-item label="订单描述:">
                <el-input
                  v-model="form.remark"
                  type="textarea"
                  clearable
                  size="small"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="用户备注">{{ form.brand }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单统计">{{ form.brand }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="平均金额">{{ form.brand }}</el-form-item>
            </el-col> -->
            <el-col :span="24">
              <el-form-item label="备注:">
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
        <el-table v-loading="loading" :data="ordUserOrdersList" size="small">
          <el-table-column
            v-if="form.cardType === 'physical'"
            label="图片"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
            width="50"
            fixed="left"
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
            fixed="left"
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
            width="150"
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
          <!-- <el-table-column
            label="售卡状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
            width="150"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" size="small">
                <el-option label="待核销" :value="0" />
                <el-option label="已核销" :value="1" />
                <el-option label="售卡失败" :value="2" />
              </el-select>
            </template>
          </el-table-column> -->
          <el-table-column
            v-if="processType == 2"
            label="失败原因"
            align="center"
            prop="remark"
          >
            <template slot-scope="scope">
              <el-dropdown>
                <el-input
                  v-model="scope.row.remark"
                  type="text"
                  clearable
                  size="small"
                  placeholder="请输入失败原因"
                />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in reasonList" :key="item" @click.native="onSelectReson(item, scope.row)">{{ item }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column
            v-if="processType == 2"
            label="失败图片"
            align="center"
            prop="failureImageUrl"
          >
            <template slot-scope="scope">
              <div style="display: flex;align-items: center;justify-content: center;">
                <el-input v-model="scope.row.failureImageUrl" size="small" placeholder="粘贴复制图片" style="width: 200px;" readonly @click.native="(event)=>setActiveRow(scope.row, event)" @input="(event)=>handleFailureImageUrl(event, scope.row)" />
                <div style="display: flex;align-items: center;justify-content: center;">
                  <!-- <el-input v-model="scope.row.failureImageUrl" size="small" placeholder="粘贴复制图片" @click="setActiveRow(scope.row)" /> -->
                  <el-upload
                    :ref="'uploader_' + scope.row.id"
                    class="upload-demo"
                    :headers="headers"
                    action="https://adminapi.cardpartner.io/api/v1/public/uploadFile"
                    :on-success="(response, file, fileList) => handleUploadChange(response, file, fileList, scope.row)"
                    :file-list="scope.row.fileList"
                    :limit="1"
                    :on-remove="(file, fileList) => handleRemove(file, fileList, scope.row)"
                    :show-file-list="true"
                  >
                    <el-button size="small" type="primary" @click="setActiveRow(scope.row)">上传</el-button>
                  </el-upload>
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="用户提交面值"
            align="center"
            prop="balance"
            width="100"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.balance"
                type="text"
                clearable
                size="small"
              />
            </template>
          </el-table-column> -->
          <el-table-column
            v-if="processType == 1"
            label="卡片真实面值"
            align="center"
            prop="recognizedCardValue"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.recognizedCardValue"
                type="number"
                clearable
                size="small"
                @input="(event)=>handleValueInput(event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="processType == 1"
            label="礼品卡"
            align="center"
            prop="giftCardId"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.giftCardId" filterable size="small" @change="handleGiftCardChange(scope.row)">
                <el-option v-for="item in ordGiftcardList" :key="item.id" :label="item.name" :value="item.id" />
                <el-option label="其他" :value="0" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-if="processType == 1"
            label="折扣类型"
            align="center"
            prop="cardType"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.cardType" size="small">
                <el-option v-for="item in scope.row.cardTypeArr" :key="item" :label="item" :value="item" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-if="processType == 1"
            label="折扣"
            align="center"
            prop="discountRate"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.discountRate"
                type="text"
                clearable
                size="small"
                @input="(event)=>handleValueInput(event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="processType == 1"
            label="品牌商"
            align="center"
            prop="status"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.supplierId" filterable size="small" @change="handleSupplierChange(scope.row)">
                <el-option v-for="item in supplierOptions" :key="item.id" :label="item.name+'('+item.settlementCurrencyCode+')'" :value="item.id" filterable />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-if="processType == 1"
            label="卡商成交金额"
            align="center"
            prop="platformSettlementAmount"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.platformSettlementAmount"
                type="text"
                clearable
                size="small"
                @input="(event)=>handleValueInput(event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="processType == 1"
            label="用户付款金额"
            align="center"
            prop="userLocalCurrencyAmount"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.userLocalCurrencyAmount"
                type="text"
                clearable
                size="small"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column
            v-if="form.balanceType == 1"
            label="回款金额(法币)"
            align="center"
            prop="balance"
            :show-overflow-tooltip="true"
            width="120"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.userLocalCurrencyAmount"
                type="text"
                clearable
                size="small"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-else
            label="回款金额(U)"
            align="center"
            prop="balance"
            :show-overflow-tooltip="true"
            width="120"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.userLocalCurrencyAmount"
                type="text"
                clearable
                size="small"
              />
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            label="礼品卡类型"
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
                type="number"
                @input="(event)=>handleValueInput(event, scope.row)"
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
          </el-table-column> -->
          <el-table-column label="添加|删除" align="center" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="handleAdd(scope.row)"
              >
                添加
              </el-button>
              <el-button
                v-if="scope.$index !== 0"
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
import { listOrdGiftcardCategory } from '@/api/admin/ord-giftcard-category'
import { listOrdGiftcard } from '@/api/admin/ord-giftcard'
import { listOrdGiftcardRegion } from '@/api/admin/ord-giftcard-region'
import { listOrdGiftcardDiscounts } from '@/api/admin/ord-giftcard-discounts'
import { calculateOrdGiftcardWriteoffs } from '@/api/admin/ord-giftcard-writeoffs'
// import { listOrdConfigCurrencyRates } from '@/api/admin/ord-config-currency-rates'
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
      OrderNo: '',
      cardCategory: [],
      ordGiftcardList: [],
      regionList: [],
      discountList: [],
      giftCardId: '',
      activeRow: null,
      currencyRatesList: [],
      processType: 1,
      valueTimer: null,
      reasonList: [
        'Dearthis card has used by others',
        'Dearthis code is invalid',
        'Dearwe need more info to redeem this code',
        'Dearthis code is not clear',
        'Dearthis code are not complete',
        'Dearwe have no way to use this kind ofcard',
        'Dear,this card is bad'
      ]
    }
  },
  created() {
    this.orderId = this.$route.query.id
    this.giftCardCode = this.$route.query.giftCardCode
    this.OrderNo = this.$route.query.OrderNo
    this.getDetail()
    this.getOrdGiftcardCategoryList()
    this.getGiftcardList()
    this.getRegionList()
    // this.getListOrdGiftcardDiscounts()
  },
  mounted() {
    window.addEventListener('paste', this.handlePaste)
  },
  beforeDestroy() {
    window.removeEventListener('paste', this.handlePaste)
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
              id: new Date().getTime(),
              physicalImageUrl: item.imageUrl,
              adminRecognizedCode: '',
              failureImageUrl: '',
              platformSettlementAmount: '',
              recognizedCardValue: '',
              userLocalCurrencyAmount: '',
              settlementRate: '',
              status: 1,
              supplierId: '',
              balance: this.form.balance,
              cardType: this.form.cardType,
              giftCardId: '',
              fileList: [],
              discountRate: '',
              remark: '',
              discounts: [],
              cardTypeArr: []
            })
          })
        })
      } else {
        this.ordUserOrdersList = [{
          id: new Date().getTime(),
          physicalImageUrl: '',
          adminRecognizedCode: this.giftCardCode || '',
          failureImageUrl: '',
          platformSettlementAmount: '',
          recognizedCardValue: '',
          userLocalCurrencyAmount: '',
          settlementRate: '',
          status: 1,
          supplierId: '',
          balance: this.form.balance,
          cardType: this.form.cardType,
          giftCardId: '',
          fileList: [],
          discountRate: '',
          remark: '',
          cardTypeArr: []
        }]
      }
    },

    async getListOrdGiftcardDiscounts(id) {
      const res = await listOrdGiftcardDiscounts({ giftcard_id: id })
      if (res.data) {
        return res.data.list
      }
    },
    getOrdGiftcardCategoryList() {
      listOrdGiftcardCategory({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.cardCategory = response.data.list
      })
    },
    filterGiftcardCategory(categoryId) {
      const category = this.cardCategory.find(item => item.id === Number(categoryId))
      return category ? category.name : ''
    },
    getGiftcardList() {
      listOrdGiftcard({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.ordGiftcardList = response.data.list
      })
    },
    filterGiftcardId(giftCardId) {
      const giftCard = this.ordGiftcardList.find(item => item.id === giftCardId)
      return giftCard ? giftCard.name : giftCardId
    },
    getRegionList() {
      listOrdGiftcardRegion({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.regionList = response.data.list
      })
    },
    filterRegionName(regionId) {
      const region = this.regionList.find(item => item.id === Number(regionId))
      return region ? region.regionCode : ''
    },
    // 根据分类筛选礼品卡
    async handleGiftCardChange(row) {
      const data = this.ordGiftcardList.find(item => item.id === row.giftCardId)
      row.cardTypeArr = data.cardType.split(',') || []
      row.cardType = this.form.cardType
      row.discountRate = data.discountRate
      this.handleValueInput('', row)
    },
    handleGiftCardDiscountChange(row) {
      const discount = row.discounts.find(item => item.id === row.giftCardDiscountId)
      row.discountRate = discount.discountRate
      this.handleValueInput('', row)
    },
    submit(list) {
      list.forEach(item => {
        item.supplierId = Number(item.supplierId) || ''
      })
      const params = {
        giftCardId: this.form.giftcardId,
        orderId: Number(this.orderId),
        userId: this.form.userId,
        writeoffList: list
      }
      batchWriteOffOrdUserOrders(params).then(response => {
        this.$message.success('核销成功')
        this.getDetail()
        this.$router.back()
      })
    },
    handleProcess(row, type) {
      // if (!row.recognizedCardValue) {
      //   this.$message.error('请输入卡面值')
      //   return
      // }
      this.processType = type
      if (type === 1) {
        row.status = 1
        // this.submit([row])
      } else if (type === 2) {
        row.status = 2
        // this.submit([row])
      }
    },
    handleComplete() {
      if (!this.ordUserOrdersList.length) {
        this.$message.error('请添加核销信息')
        return
      }
      if (this.processType === 1) {
        const hasEmpty = this.ordUserOrdersList.some(item => !item.userLocalCurrencyAmount)
        if (hasEmpty) {
          this.$message.error('必填项不能为空')
          return
        }
      } else {
        const hasEmpty = this.ordUserOrdersList.some(item => !item.remark)
        if (hasEmpty) {
          this.$message.error('失败原因不能为空')
          return
        }
      }
      this.submit(this.ordUserOrdersList)
    },
    handleAdd(row) {
      this.ordUserOrdersList.push({
        ...row,
        id: new Date().getTime()
      })
    },
    handleDel(row, index) {
      this.ordUserOrdersList.splice(index, 1)
    },
    handleSupplierChange(row) {
      const item = this.supplierOptions.find(item => item.id === row.supplierId)
      row.settlementRate = item.settlementRate || ''
      this.handleValueInput('', row)
    },
    handleValueInput(event, row) {
      this.valueTimer = setTimeout(async() => {
        if (
          row.recognizedCardValue &&
          row.recognizedCardValue !== '0' &&
          row.discountRate &&
          row.discountRate !== '0' &&
          row.giftCardId
        ) {
          const params = {
            orderId: this.form.id,
            recognizedCardValue: row.recognizedCardValue,
            giftCardId: row.giftCardId,
            discountRate: row.discountRate
          }
          const res = await calculateOrdGiftcardWriteoffs(params)
          if (res.data) {
            row.userLocalCurrencyAmount = res.data.userLocalCurrencyAmount || ''
          }
        }
      }, 300)
    },
    // handleRemove(file, fileList, row) {
    //   row.physicalImageUrl = ''
    //   row.fileList = []
    // },
    setActiveRow(row) {
      console.log(row)
      this.activeRow = row
    },
    handleUploadChange(response, file, fileList, row) {
      const newList = fileList.map(f => ({
        name: f.name,
        url: response.data ? response.data.full_path : f.url
      }))

      this.$set(row, 'fileList', newList)
      this.activeRow.fileList = newList
      // 保存图片地址
      this.$set(row, 'failureImageUrl', response.data?.full_path || '')
      row.failureImageUrl = response.data?.full_path || ''
      console.log(row)
    },

    handleRemove(file, fileList, row) {
      this.$set(row, 'fileList', [])
      row.fileList = []
      this.activeRow.fileList = []
      console.log(row)
      if (fileList.length === 0) {
        row.failureImageUrl = ''
      }
    },
    handleFailureImageUrl(event, row) {
      if (!event) {
        row.failureImageUrl = ''
        row.fileList = []
      }
    },
    handlePaste(e) {
      console.log(this.activeRow)
      if (this.activeRow.fileList.length > 0) {
        this.$message.error('请先删除已上传的图片')
        return
      }
      if (!this.activeRow) return // 必须先点按钮，才能知道是哪一行
      const items = e.clipboardData?.items || []
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file) {
            this.uploadByPaste(file, this.activeRow)
          }
        }
      }
    },

    uploadByPaste(file, row) {
      const ref = 'uploader_' + row.id
      const uploader = this.$refs[ref]
      if (!uploader) return
      // 手动上传
      uploader.handleStart(file)
      uploader.submit()
    },
    onSelectReson(item, row) {
      console.log(item)
      this.$set(row, 'remark', item)
    }
  }
}
</script>
