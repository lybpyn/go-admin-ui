
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="80px">
          <el-form-item label="地区" prop="regionId">
            <el-select v-model="queryParams.regionId" placeholder="请选择地区" clearable size="small">
              <el-option
                v-for="item in regionList1"
                :key="item.id"
                :label="item.regionCode"
                :value="item.id"
              />
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
              v-permisaction="['admin:ordGiftcard:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordGiftcard:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col> -->
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-download"
              size="mini"
              @click="handleSaveAll"
            >全部保存
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <!-- <el-select v-model="currencyRatesId" placeholder="请选择国家" size="small" @change="handleCurrencyRatesIdChange">
              <el-option
                v-for="item in currencyRates"
                :key="item.id"
                :label="item.quoteCurrencyCode"
                :value="item.id"
              />
            </el-select> -->
            <el-select v-model="currencyRatesId" placeholder="请选择国家" size="small" @change="handleCurrencyRatesIdChange">
              <el-option
                v-for="item in currencyRates"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-table v-loading="loading" row-key="idx" :data="ordGiftcardList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="礼品卡品牌"
            align="center"
            prop="categoryName"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.categoryId" placeholder="请选择礼品卡分类" @change="filterGiftcardCategory(scope.row.categoryId,scope.row)">
                <el-option v-for="item in cardCategory" :key="item.id" :label="item.name" :value="String(item.id)" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="礼品卡地区"
            align="center"
            prop="regionId"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.regionId" placeholder="请选择地区" @focus="getRegionList(scope.row.categoryId,scope.row)" @change="handleRegionChange(scope.row)">
                <el-option v-for="item in scope.row.regionList" :key="item.id" :label="item.regionCode" :value="String(item.id)" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="币种"
            align="center"
            prop="currencyCode"
          >
            <template slot-scope="scope">
              {{ scope.row.currencyCode? scope.row.currencyCode + '-' : '' }}{{ currentCurrencyRate.currencyCode }} {{ parseFloat(scope.row.currentCurrencyRate).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column
            label="卡名称"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="礼品卡名称" />
            </template>
          </el-table-column>
          <el-table-column
            label="折扣类型"
            align="center"
            prop="cardType"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.cardType" placeholder="请选择折扣类型" multiple>
                <el-option label="code" value="code" />
                <el-option label="physical" value="physical" />
                <el-option label="horizontal" value="horizontal" />
                <el-option label="whiteboard" value="whiteboard" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="面额配置"
            align="center"
            prop="valuesConfig"
            width="230"
          >
            <template slot-scope="scope">
              <div class="config-box" style="display: flex;color: #1890ff;cursor: pointer;" @click="handleUpdate(scope.row, scope.$index)">
                <div v-if="scope.row.valuesConfig1.type == 'range'">
                  面值：{{ scope.row.valuesConfig1.value.min + ' - ' + scope.row.valuesConfig1.value.max }}
                </div>
                <div v-else-if="scope.row.valuesConfig1.type == 'fixed'">
                  面值：{{ scope.row.valuesConfig1.value }}
                </div>
                <div v-else>
                  <div v-for="(item, index) in scope.row.valuesConfig1.value" :key="index" class="item" style="display: flex;;margin-bottom: 5px;">
                    【类型：{{ item.mode == 'fixed' ? '固定值' : '区间' }},
                    <div v-if="item.mode == 'fixed'">面值：{{ item.value }}】</div>
                    <div v-else>面值：{{ item.min + '-' + item.max }}】</div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="折扣"
            align="center"
            prop="discountRate"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.discountRate" placeholder="折扣" type="number" />
            </template>
          </el-table-column>
          <el-table-column
            :label="`折后汇率 ${ currentCurrencyRate.currencyCode }`"
            align="center"
            prop="affterDiscountRate"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ filterCurrencyRate(scope.row) }}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="折后汇率 USDT"
            align="center"
            prop="affterDiscountRateUsdt"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ filterCurrencyRateUsdt(scope.row.discountRate) }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="1"
                inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="扩展信息"
            align="center"
            prop="extra"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="100">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:ordGiftcard:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleSave(scope.row)"
              >保存
              </el-button>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row,scope.$index)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:ordGiftcard:remove']"
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
        <el-dialog title="修改面值" :visible.sync="open" width="650px">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="面额类型" prop="type">
              <el-radio-group v-model="cardType">
                <el-radio label="fixed">固定值</el-radio>
                <el-radio label="range">区间</el-radio>
                <el-radio label="multiple">固定+区间（多条）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="cardType == 'fixed'" label="固定面额" prop="value">
              <div style="display: flex; align-items: center;">
                <el-input
                  v-model="fixedValue"
                  placeholder="面额"
                />
              </div>
            </el-form-item>
            <el-form-item v-if="cardType == 'range'" label="区间面额" prop="value">
              <div style="display: flex; align-items: center;">
                <el-input
                  v-model="rangeValue.min"
                  placeholder="最小值"
                />
                <span style="margin: 0 10px;">至</span>
                <el-input
                  v-model="rangeValue.max"
                  placeholder="最大值"
                />
              </div>
            </el-form-item>
            <el-form-item v-if="cardType == 'multiple'" label="固定+区间面额" prop="value">
              <el-button-group>
                <el-button type="primary" @click="handleTypeAdd('fixed')">+添加固定面额</el-button>
                <el-button type="primary" @click="handleTypeAdd('range')">+添加区间面额</el-button>
              </el-button-group>
              <div v-for="(item,index) in multipleValue" :key="index" style="display: flex;align-items: center;padding: 10px 0;">
                <template v-if="item.mode == 'fixed'">
                  <el-input
                    v-model="item.value"
                    placeholder="面额"
                  />
                  <el-button type="danger" style="margin-left: 5px;" @click="handleDel(index)">删除</el-button>
                </template>
                <template v-if="item.mode == 'range'">
                  <el-input
                    v-model="item.min"
                    placeholder="最小值"
                  />
                  <span style="margin: 0 10px;">至</span>
                  <el-input
                    v-model="item.max"
                    placeholder="最大值"
                  />
                  <el-button type="danger" style="margin-left: 5px;" @click="handleDel(index)">删除</el-button>
                </template>
              </div>
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
import { delOrdGiftcard, listOrdGiftcard, updateOrdGiftcard, batchSetOrdGiftcard } from '@/api/admin/ord-giftcard'
import { listOrdGiftcardRegion } from '@/api/admin/ord-giftcard-region'
import { listOrdGiftcardCategory } from '@/api/admin/ord-giftcard-category'
import { listOrdGiftcardDiscounts, batchInsertOrdGiftcardDiscounts, batchUpdateOrdGiftcardDiscounts } from '@/api/admin/ord-giftcard-discounts'
import { batchQuery } from '@/api/admin/ord-config-currency-rates'
import { listHsConfigRegions } from '@/api/admin/hs-config-regions'

export default {
  name: 'OrdGiftcard',
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
      ordGiftcardList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 50

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {},
      regionList: [],
      cardCategory: [],
      cardType: 'fixed',
      fixedValue: '',
      rangeValue: {
        min: '',
        max: ''
      },
      multipleValue: [],
      openVisiable: false,
      ordGiftcardDiscountsList: [],
      regionList1: [],
      typeList: [],
      openAddVisiable: false,
      currencyRates: [],
      currencyRatesId: '',
      currentCurrencyRate: {},
      currentIndex: -1,
      quoteCurrencyCode: ''
    }
  },
  async created() {
    this.getlistOrdConfigCurrencyRates()
    this.getRegionList1()
    this.getList()
    this.getOrdGiftcardCategoryList()
  },
  methods: {
    /** 查询参数列表 */
    async getList() {
      this.loading = true
      const res = await listOrdGiftcardRegion({ pageIndex: 1, pageSize: 1000, categoryId: '' })
      listOrdGiftcard(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        response.data.list.forEach(item => {
          item.valuesConfig1 = JSON.parse(item.valuesConfig)
          item.regionList = res.data.list
          item.affterDiscountRate = 0
          item.affterDiscountRateUsdt = 0
          item.idx = Date.now() + '' + Math.floor(Math.random() * 10000)
          item.currentCurrencyRate = 0
          item.cardType = item.cardType.split(',')
        })
        this.ordGiftcardList = response.data.list
        this.setBatchCurrencyRates()
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    filterCurrencyRate(row) {
      if (!row.discountRate) {
        return '0.00'
      }
      const count = parseFloat(row.discountRate) * parseFloat(row.currentCurrencyRate)
      return count.toFixed(2)
    },
    handleRegionChange(row) {
      row.currencyCode = this.regionList1.find(item => item.id === Number(row.regionId)).currencyCode
      this.setBatchCurrencyRates()
    },
    filterCurrencyRateUsdt(rate) {
      if (!rate) {
        return '0.00'
      }
      const count = parseFloat(rate) * parseFloat(this.currentCurrencyRate.rate)
      return count.toFixed(2)
    },
    handleCurrencyRatesIdChange() {
      this.currentCurrencyRate = this.currencyRates.find(item => item.id === Number(this.currencyRatesId))
      this.quoteCurrencyCode = this.currencyRates.find(item => item.id === Number(this.currencyRatesId)).currencyCode
      console.log(this.currentCurrencyRate)
      this.setBatchCurrencyRates()
    },
    getRegionList1() {
      listOrdGiftcardRegion({ pageIndex: 1, pageSize: 1000, categoryId: '' }).then(response => {
        this.regionList1 = response.data.list
      })
    },
    getlistOrdConfigCurrencyRates() {
      listHsConfigRegions({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.currencyRates = response.data.list
        this.currencyRatesId = response.data.list[0].id
        this.quoteCurrencyCode = response.data.list[0].currencyCode
        this.handleCurrencyRatesIdChange()
      })
    },
    getOrdGiftcardCategoryList() {
      listOrdGiftcardCategory({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.cardCategory = response.data.list
      })
    },
    filterGiftcardCategory(categoryId, row) {
      this.getRegionList(categoryId, row)
    },
    getRegionList(categoryId, row) {
      this.$set(row, 'regionList', [])
      if (!categoryId) {
        return
      }
      listOrdGiftcardRegion({ pageIndex: 1, pageSize: 1000, categoryId: Number(categoryId) || '' }).then(response => {
        this.$set(row, 'regionList', response.data.list)
      })
    },
    filterRegionName(regionId) {
      const region = this.regionList1.find(item => item.id === Number(regionId))
      return region ? region.regionCode : ''
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
        regionId: undefined,
        name: undefined,
        valuesConfig: undefined,
        discountRate: undefined,
        status: '1',
        extra: '{}',
        categoryId: ''
      }
      this.multipleValue = []
      this.cardType = 'fixed'
      this.rangeValue = {
        min: '',
        max: ''
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
      this.ordGiftcardList.unshift({
        id: undefined,
        regionId: undefined,
        name: undefined,
        valuesConfig1: {
          type: 'fixed',
          value: '100'
        },
        valuesConfig: JSON.stringify({
          type: 'fixed',
          value: '100'
        }),
        discountRate: undefined,
        status: '1',
        extra: '{}',
        categoryId: '',
        cardType: 'code',
        idx: Date.now() + '' + Math.floor(Math.random() * 10000)
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row, index) {
      this.currentIndex = index
      const valuesConfig = JSON.parse(row.valuesConfig)
      if (valuesConfig.type === 'fixed') {
        this.cardType = 'fixed'
        this.fixedValue = valuesConfig.value
      } else if (valuesConfig.type === 'range') {
        this.cardType = 'range'
        this.rangeValue.min = valuesConfig.value.min
        this.rangeValue.max = valuesConfig.value.max
      } else if (valuesConfig.type === 'multiple') {
        this.cardType = 'multiple'
        this.multipleValue = valuesConfig.value
      }
      this.form = JSON.parse(JSON.stringify(row))
      this.open = true
    },
    /** 提交按钮 */
    submitForm: function() {
      if (this.cardType === 'fixed') {
        const obj = {
          type: 'fixed',
          value: this.fixedValue
        }
        this.ordGiftcardList[this.currentIndex].valuesConfig1 = obj
        this.ordGiftcardList[this.currentIndex].valuesConfig = JSON.stringify(obj)
      } else if (this.cardType === 'range') {
        const obj = {
          type: 'range',
          value: {
            min: this.rangeValue.min,
            max: this.rangeValue.max
          }
        }
        this.ordGiftcardList[this.currentIndex].valuesConfig1 = obj
        this.ordGiftcardList[this.currentIndex].valuesConfig = JSON.stringify(obj)
      } else if (this.cardType === 'multiple') {
        const obj = {
          type: 'multiple',
          value: this.multipleValue
        }
        this.ordGiftcardList[this.currentIndex].valuesConfig1 = obj
        this.ordGiftcardList[this.currentIndex].valuesConfig = JSON.stringify(obj)
      } else {
        this.form.valuesConfig = ''
      }
      this.open = false
      // this.$refs['form'].validate(valid => {
      //   if (valid) {
      //     if (this.cardType === 'fixed') {
      //       const obj = {
      //         type: 'fixed',
      //         value: this.fixedValue
      //       }
      //       this.form.valuesConfig = JSON.stringify(obj)
      //     } else if (this.cardType === 'range') {
      //       const obj = {
      //         type: 'range',
      //         value: {
      //           min: this.rangeValue.min,
      //           max: this.rangeValue.max
      //         }
      //       }
      //       this.form.valuesConfig = JSON.stringify(obj)
      //     } else if (this.cardType === 'multiple') {
      //       const obj = {
      //         type: 'multiple',
      //         value: this.multipleValue
      //       }
      //       this.form.valuesConfig = JSON.stringify(obj)
      //     }
      //     if (this.form.id !== undefined) {
      //       updateOrdGiftcard(this.form).then(response => {
      //         if (response.code === 200) {
      //           this.msgSuccess(response.msg)
      //           this.open = false
      //           this.getList()
      //         } else {
      //           this.msgError(response.msg)
      //         }
      //       })
      //     } else {
      //       addOrdGiftcard(this.form).then(response => {
      //         if (response.code === 200) {
      //           this.msgSuccess(response.msg)
      //           this.open = false
      //         } else {
      //           this.msgError(response.msg)
      //         }
      //       })
      //     }
      //   }
      // })
    },
    updateRate(row) {
      updateOrdGiftcard(row).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row, index) {
      if (!row.id) {
        this.ordGiftcardList.splice(index, 1)
        return
      }
      var Ids = (row.id && [row.id]) || this.ids
      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delOrdGiftcard({ 'ids': Ids })
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
    handleTypeAdd(type) {
      if (type === 'fixed') {
        this.multipleValue.push({ mode: 'fixed', value: '' })
      } else if (type === 'range') {
        this.multipleValue.push({ mode: 'range', min: '', max: '' })
      }
    },
    handleDel(index) {
      this.multipleValue.splice(index, 1)
    },
    openDetail(row) {
      this.openVisiable = true
      this.ordGiftcardDiscountsList = []
      listOrdGiftcardDiscounts({ pageIndex: 1, pageSize: 1000, giftcardId: row.id }).then(response => {
        this.ordGiftcardDiscountsList = response.data.list
      })
    },
    saveTypeList() {
      if (this.typeList.length === 0) {
        this.msgError('请添加礼品卡')
        return
      }
      for (let i = 0; i < this.typeList.length; i++) {
        const item = this.typeList[i]
        if (this.ordGiftcardDiscountsList.findIndex(x => x.cardType === item.cardType) !== -1) {
          this.msgError('礼品卡类型已存在')
          return
        }
      }
      batchInsertOrdGiftcardDiscounts({ items: this.typeList }).then(response => {
        if (response.code === 200) {
          this.openAddVisiable = false
          this.getList()
        }
      })
    },
    handleAddDiscount() {
      this.typeList.push({ id: new Date().getTime(), cardType: 'code', discountRate: '', giftcardId: this.form.id || '' })
    },
    handleDelDiscount(index) {
      this.typeList.splice(index, 1)
    },
    updateDiscount() {
      batchUpdateOrdGiftcardDiscounts({ items: this.ordGiftcardDiscountsList }).then(response => {
        this.openAddVisiable = false
        if (response.code === 200) {
          this.openAddVisiable = false
          this.getList()
          this.form.id = ''
        }
      }).finally(() => {
        this.form.id = ''
      })
    },
    handleAddType(row) {
      this.ordGiftcardDiscountsList = []
      listOrdGiftcardDiscounts({ pageIndex: 1, pageSize: 1000, giftcardId: row.id }).then(response => {
        this.ordGiftcardDiscountsList = response.data.list
      })
      this.openAddVisiable = true
      this.form.id = row.id
      this.typeList = []
    },
    handleSave(row) {
      if (!row.regionId) {
        this.msgError('请选择地区')
        return
      }
      if (!row.discountRate || row.discountRate === 0) {
        this.msgError('请输入折扣率')
        return
      }
      const items = JSON.parse(JSON.stringify(row))
      items.cardType = String(row.cardType)
      batchSetOrdGiftcard({ items: [items] }).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.getList()
        }
      })
    },
    handleSaveAll() {
      const ordGiftcardList = JSON.parse(JSON.stringify(this.ordGiftcardList))
      let currentIndex = -1
      let currentIndex1 = -1
      ordGiftcardList.forEach((element, index) => {
        element.cardType = String(element.cardType)
        if (!element.regionId) {
          currentIndex = index
        }
        if (!element.discountRate || element.discountRate === 0) {
          currentIndex1 = index
        }
      })
      if (currentIndex !== -1) {
        this.msgError(`第${currentIndex + 1}条数据请选择地区`)
        return
      }
      if (currentIndex1 !== -1) {
        this.msgError(`第${currentIndex1 + 1}条数据请输入折扣率`)
        return
      }
      batchSetOrdGiftcard({ items: ordGiftcardList }).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.getList()
        }
      })
    },
    setBatchCurrencyRates() {
      const currencyPairs = []
      this.ordGiftcardList.forEach(element => {
        element.currentCurrencyRate = 0
        if (element.currencyCode) {
          currencyPairs.push({
            baseCurrencyCode: element.currencyCode,
            quoteCurrencyCode: this.quoteCurrencyCode
          })
        }
      })
      if (currencyPairs.length === 0) {
        return
      }
      batchQuery({ currencyPairs: currencyPairs }).then(response => {
        if (response.code === 200) {
          if (response.data.rates.length > 0) {
            response.data.rates.forEach(element => {
              const str = element.baseCurrencyCode + '-' + element.quoteCurrencyCode
              this.ordGiftcardList.forEach(item => {
                const str1 = item.currencyCode + '-' + this.quoteCurrencyCode
                if (str1 === str) {
                  item.currentCurrencyRate = element.rate
                }
              })
            })
          }
        }
      })
    }
  }
}
</script>
