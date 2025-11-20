
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="120px">
          <el-form-item label="卡商名称/公司名">
            <el-input v-model="queryParams.name" placeholder="请输入卡商名称/公司名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsMerchants:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsMerchants:edit']"
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
              v-permisaction="['admin:hsMerchants:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsMerchantsList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="外部/内部唯一编码"
            align="center"
            prop="merchantCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="卡商名称/公司名"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="联系人姓名"
            align="center"
            prop="contactName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="联系人电话"
            align="center"
            prop="contactPhone"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="联系人邮箱"
            align="center"
            prop="contactEmail"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="国家/地区"
            align="center"
            prop="country"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 0" type="danger">禁用</el-tag>
              <el-tag v-else-if="scope.row.status == 1" type="success">启用</el-tag>
              <el-tag v-else type="info">冻结</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="日限额 (可选)"
            align="center"
            prop="dailyLimit"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="备注/其他说明"
            align="center"
            prop="note"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="扩展信息"
            align="center"
            prop="extra"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-link :href="scope.row.extra.path" target="_blank" type="primary">{{ scope.row.extra.name }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsMerchants:edit']"
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
                  v-permisaction="['admin:hsMerchants:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="700px">
          <el-form ref="form" :model="form" :rules="rules" label-width="130px">

            <el-form-item label="外部/内部唯一编码" prop="merchantCode">
              <el-input
                v-model="form.merchantCode"
                placeholder="外部/内部唯一编码 (可用于对接第三方)"
              />
            </el-form-item>
            <el-form-item label="卡商名称/公司名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="卡商名称/公司名"
              />
            </el-form-item>
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input
                v-model="form.contactName"
                placeholder="联系人姓名"
              />
            </el-form-item>
            <el-form-item label="联系人电话" prop="contactPhone">
              <el-input
                v-model="form.contactPhone"
                placeholder="联系人电话"
              />
            </el-form-item>
            <el-form-item label="联系人邮箱" prop="contactEmail">
              <el-input
                v-model="form.contactEmail"
                placeholder="联系人邮箱"
              />
            </el-form-item>
            <el-form-item label="国家/地区" prop="country">
              <el-input
                v-model="form.country"
                placeholder="国家/地区 ISO2 (如 CN, US)"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="0">禁用</el-radio>
                <el-radio label="1">启用</el-radio>
                <el-radio label="2">冻结</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="日限额 (可选)" prop="dailyLimit">
              <el-input
                v-model="form.dailyLimit"
                placeholder="日限额 (可选)"
              />
            </el-form-item>
            <el-form-item label="备注/其他说明" prop="note">
              <el-input
                v-model="form.note"
                placeholder="备注/其他说明"
              />
            </el-form-item>
            <el-form-item label="扩展信息" prop="extra">
              <!-- <el-input
                v-model="form.extra"
                placeholder="扩展信息: 如资质文件url、合同信息等"
              /> -->
              <el-upload
                class="upload-demo"
                :headers="headers"
                :limit="1"
                action="https://adminapi.cardpartner.io/api/v1/public/uploadFile"
                :on-success="handleUploadChange"
                :file-list="fileList"
                :on-remove="handleRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
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
import { addHsMerchants, delHsMerchants, getHsMerchants, listHsMerchants, updateHsMerchants } from '@/api/admin/hs-merchants'
import { getToken } from '@/utils/auth'
export default {
  name: 'HsMerchants',
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
      hsMerchantsList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {},
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
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
      listHsMerchants(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        response.data.list.forEach(item => {
          item.extra = JSON.parse(item.extra)
        })
        this.hsMerchantsList = response.data.list
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
        merchantCode: undefined,
        name: undefined,
        contactName: undefined,
        contactPhone: undefined,
        contactEmail: undefined,
        country: undefined,
        status: '1',
        dailyLimit: undefined,
        note: undefined,
        extra: {}
      }
      this.fileList = []
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
      this.title = '添加卡商管理表'
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
      getHsMerchants(id).then(response => {
        this.form = response.data
        this.fileList = []
        this.open = true
        this.title = '修改卡商管理表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.extra = JSON.stringify(this.form.extra)
          if (this.form.id !== undefined) {
            updateHsMerchants(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsMerchants(this.form).then(response => {
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
        return delHsMerchants({ 'ids': Ids })
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
    handleUploadChange(res) {
      this.form.extra = res
    },
    handleRemove() {
      this.form.extra = ''
      this.fileList = []
    }
  }
}
</script>
