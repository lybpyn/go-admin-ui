
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="80px">
          <el-form-item label="地区" prop="regionId">
            <el-select v-model="queryParams.regionId" placeholder="请选择地区" clearable size="small">
              <el-option
                v-for="item in regionList"
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
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:ordGiftcard:edit']"
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
              v-permisaction="['admin:ordGiftcard:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="ordGiftcardList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="地区ID"
            align="center"
            prop="regionId"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ filterRegionName(scope.row.regionId) }}
            </template>
          </el-table-column>
          <el-table-column
            label="卡名称"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column
            label="面额配置，支持区间和固定值"
            align="center"
            prop="valuesConfig"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column
            label="卡类型"
            align="center"
            prop="type"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ scope.row.valuesConfig1.type == 'range' ? '区间' : (scope.row.valuesConfig1.type == 'fixed' ? '固定值' : '固定+区间（多条）') }}
            </template>
          </el-table-column>
          <el-table-column
            label="面额配置"
            align="center"
            prop="valuesConfig"
            :show-overflow-tooltip="true"
            width="200"
          >
            <template slot-scope="scope">
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
            </template>
          </el-table-column>
          <el-table-column
            label="折扣汇率"
            align="center"
            prop="discountRate"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.discountRate" placeholder="汇率折扣" @blur="updateRate(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1" size="small">启用</el-tag>
              <el-tag v-else size="small">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="扩展信息"
            align="center"
            prop="extra"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:ordGiftcard:edit']"
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
        <el-dialog :title="title" :visible.sync="open" width="650px">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="礼品卡分类" prop="categoryId">
              <el-select v-model="form.categoryId" placeholder="请选择礼品卡分类" @change="filterGiftcardCategory(form.categoryId)">
                <el-option v-for="item in cardCategory" :key="item.id" :label="item.name" :value="String(item.id)" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.categoryId" label="地区" prop="regionId">
              <el-select v-model="form.regionId" placeholder="请选择地区">
                <el-option v-for="item in regionList" :key="item.id" :label="item.regionCode" :value="String(item.id)" />
              </el-select>
            </el-form-item>
            <el-form-item label="卡名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="卡名称，例如 Steam 50 USD"
              />
            </el-form-item>
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
            <!-- <el-form-item label="面额配置" prop="valuesConfig">
              <el-input
                v-model="form.valuesConfig"
                placeholder="面额配置，支持区间和固定值"
              />
            </el-form-item> -->
            <el-form-item label="折扣汇率" prop="discountRate">
              <el-input
                v-model="form.discountRate"
                placeholder="折扣汇率，例如0.95 表示95折"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="扩展信息" prop="extra">
              <el-input
                v-model="form.extra"
                type="textarea"
                placeholder="扩展信息，如购买说明、限制条件"
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
import { addOrdGiftcard, delOrdGiftcard, getOrdGiftcard, listOrdGiftcard, updateOrdGiftcard } from '@/api/admin/ord-giftcard'
import { listOrdGiftcardRegion } from '@/api/admin/ord-giftcard-region'
import { listOrdGiftcardCategory } from '@/api/admin/ord-giftcard-category'
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
      multipleValue: []
    }
  },
  created() {
    this.getList()
    this.getOrdGiftcardCategoryList()
    this.getRegionList1()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listOrdGiftcard(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        response.data.list.forEach(item => {
          item.valuesConfig1 = JSON.parse(item.valuesConfig)
        })
        this.ordGiftcardList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    getRegionList1() {
      listOrdGiftcardRegion({ pageIndex: 1, pageSize: 1000, categoryId: '' }).then(response => {
        this.regionList = response.data.list
      })
    },
    getOrdGiftcardCategoryList() {
      listOrdGiftcardCategory({ pageIndex: 1, pageSize: 1000 }).then(response => {
        this.cardCategory = response.data.list
      })
    },
    filterGiftcardCategory(categoryId) {
      this.getRegionList(categoryId)
    },
    getRegionList(categoryId) {
      listOrdGiftcardRegion({ pageIndex: 1, pageSize: 1000, categoryId: Number(categoryId) || '' }).then(response => {
        this.regionList = response.data.list
      })
    },
    filterRegionName(regionId) {
      const region = this.regionList.find(item => item.id === Number(regionId))
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
        status: undefined,
        extra: '{}',
        categoryId: ''
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
      this.title = '添加礼品卡明细'
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
      getOrdGiftcard(id).then(response => {
        const valuesConfig = JSON.parse(response.data.valuesConfig)
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
        this.form = response.data
        this.open = true
        this.title = '修改礼品卡明细'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          delete this.form.categoryId
          if (this.cardType === 'fixed') {
            const obj = {
              type: 'fixed',
              value: this.fixedValue
            }
            this.form.valuesConfig = JSON.stringify(obj)
          } else if (this.cardType === 'range') {
            const obj = {
              type: 'range',
              value: {
                min: this.rangeValue.min,
                max: this.rangeValue.max
              }
            }
            this.form.valuesConfig = JSON.stringify(obj)
          } else if (this.cardType === 'multiple') {
            const obj = {
              type: 'multiple',
              value: this.multipleValue
            }
            this.form.valuesConfig = JSON.stringify(obj)
          }
          if (this.form.id !== undefined) {
            updateOrdGiftcard(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addOrdGiftcard(this.form).then(response => {
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
    handleDelete(row) {
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
    }
  }
}
</script>
