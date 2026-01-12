
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="所属分类" prop="categoryId">
            <el-select v-model="queryParams.categoryId" placeholder="请选择所属分类ID" clearable size="small">
              <el-option v-for="item in cardCategory" :key="item.id" :label="item.name" :value="String(item.id)" />
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
              v-permisaction="['admin:ordGiftcardRegion:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordGiftcardRegion:edit']"
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
              v-permisaction="['admin:ordGiftcardRegion:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-select v-model="regionId" placeholder="请选择国家" size="small">
              <el-option
                v-for="item in regionList"
                :key="item.id"
                :label="item.name"
                :value="item.currencyCode"
              />
            </el-select>
          </el-col>
        </el-row>

        <el-table v-loading="loading" height="74vh" :data="ordGiftcardRegionList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <!-- <el-table-column
            label="排序"
            align="center"
            prop="sort"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column
            label="所属分类ID"
            align="center"
            prop="categoryId"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ filterGiftcardCategory(scope.row.categoryId) }}
            </template>
          </el-table-column>
          <el-table-column
            label="地区代码"
            align="center"
            prop="regionCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="货币代码"
            align="center"
            prop="currencyCode"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="货币符号"
            align="center"
            prop="currencySymbol"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="货币符号展示"
            align="center"
            prop="currencyCodeShow"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="折扣汇率"
            align="center"
            prop="discountRate"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="是否默认区域"
            align="center"
            prop="isMain"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.isMain == 1 ? 'success' : 'danger'"
                size="mini"
              >
                {{ scope.row.isMain == 1 ? '是' : '否' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status == 1 ? 'success' : 'danger'"
                size="mini"
              >
                {{ scope.row.status == 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:ordGiftcardRegion:edit']"
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
                  v-permisaction="['admin:ordGiftcardRegion:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        /> -->

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="550px">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <!-- <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                placeholder="排序"
                type="number"
              />
            </el-form-item> -->
            <el-form-item label="所属分类" prop="categoryId">
              <el-select v-model="form.categoryId" placeholder="请选择所属分类ID" clearable size="small">
                <el-option v-for="item in cardCategory" :key="item.id" :label="item.name" :value="String(item.id)" />
              </el-select>
            </el-form-item>
            <el-form-item label="区域编码" prop="regionCode">
              <el-select v-model="form.regionCode" placeholder="请选择区域编码" clearable size="small">
                <el-option v-for="item in ordConfigGiftcardRegionList" :key="item.regionName" :label="item.regionName" :value="item.regionName" />
              </el-select>
            </el-form-item>
            <el-form-item label="货币代码" prop="currencyCode">
              <el-select v-model="form.currencyCode" placeholder="请选择货币代码" clearable size="small">
                <el-option v-for="item in currencyRatesList" :key="item.id" :label="item.baseCurrencyCode" :value="item.baseCurrencyCode" />
              </el-select>
            </el-form-item>
            <el-form-item label="货币符号" prop="currencySymbol">
              <el-input
                v-model="form.currencySymbol"
                placeholder="$"
              />
            </el-form-item>
            <el-form-item label="货币符号展示" prop="currencyCodeShow">
              <el-input
                v-model="form.currencyCodeShow"
                placeholder="$"
              />
            </el-form-item>
            <el-form-item label="汇率" prop="discountRate">
              <el-input
                v-model="form.discountRate"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="是否默认区域" prop="isMain">
              <el-switch
                v-model="form.isMain"
                active-value="1"
                inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
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
import { addOrdGiftcardRegion, delOrdGiftcardRegion, getOrdGiftcardRegion, listOrdGiftcardRegion, updateOrdGiftcardRegion } from '@/api/admin/ord-giftcard-region'
import { listOrdGiftcardCategory } from '@/api/admin/ord-giftcard-category'
import { listHsConfigRegions } from '@/api/admin/hs-config-regions'
import { listOrdConfigCurrencyRates } from '@/api/admin/ord-config-currency-rates'
import { listOrdConfigGiftcardRegion } from '@/api/admin/ord-config-giftcard-region'
export default {
  name: 'OrdGiftcardRegion',
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
      ordGiftcardRegionList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10000

      },
      // 表单参数
      form: {
        currencyCode: ''
      },
      // 表单校验
      rules: {},
      cardCategory: [],
      currencyRatesList: [],
      regionList: [],
      ordConfigGiftcardRegionList: [],
      regionId: ''
    }
  },
  created() {
    this.getList()
    this.getOrdGiftcardCategoryList()
    this.getHsConfigRegionList()
    this.getOrdConfigGiftcardRegionList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listOrdGiftcardRegion(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.ordGiftcardRegionList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    getOrdGiftcardCategoryList() {
      listOrdGiftcardCategory({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.cardCategory = response.data.list
      })
    },
    getHsConfigRegionList() {
      listHsConfigRegions({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.regionList = response.data.list
        this.regionId = response.data.list[0].currencyCode
      })
    },
    getOrdConfigGiftcardRegionList() {
      listOrdConfigGiftcardRegion({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.ordConfigGiftcardRegionList = response.data.list
      })
    },
    getOrdConfigCurrencyRatesList() {
      listOrdConfigCurrencyRates({ pageIndex: 1, pageSize: 1000, quoteCurrencyCode: this.regionId }).then(response => {
        this.currencyRatesList = response.data.list
      })
    },

    filterGiftcardCategory(categoryId) {
      const category = this.cardCategory.find(item => item.id === Number(categoryId))
      return category ? category.name : ''
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.getOrdConfigCurrencyRatesList()
      this.form = {
        id: undefined,
        categoryId: undefined,
        regionCode: undefined,
        quoteCurrency: undefined,
        quoteCurrencySymbol: undefined,
        rate: undefined,
        isMain: undefined,
        status: '1',
        currencyCode: undefined
      }
      this.resetForm('form')
      this.getOrdConfigGiftcardRegionList()
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
      this.title = '添加礼品卡地区'
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
      getOrdGiftcardRegion(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改礼品卡地区'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateOrdGiftcardRegion(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addOrdGiftcardRegion(this.form).then(response => {
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
        return delOrdGiftcardRegion({ 'ids': Ids })
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
