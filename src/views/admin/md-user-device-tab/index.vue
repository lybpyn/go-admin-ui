
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="设备唯一标识" prop="deviceId"><el-input
            v-model="queryParams.deviceId"
            placeholder="请输入设备唯一标识"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="用户ID（未绑定为0）" prop="userId"><el-input
            v-model="queryParams.userId"
            placeholder="请输入用户ID（未绑定为0）"
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
              v-permisaction="['admin:mdUserDeviceTab:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:mdUserDeviceTab:edit']"
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
              v-permisaction="['admin:mdUserDeviceTab:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="mdUserDeviceTabList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="设备唯一标识"
            align="center"
            prop="deviceId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="用户ID（未绑定为0）"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="平台类型：1-TikTok, 2-Google, 3-Apple"
            align="center"
            prop="platform"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="操作系统类型（iOS/Android）"
            align="center"
            prop="osType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="操作系统版本"
            align="center"
            prop="osVersion"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="设备型号"
            align="center"
            prop="deviceModel"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="设备品牌"
            align="center"
            prop="deviceBrand"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="APP版本号"
            align="center"
            prop="appVersion"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="国家代码"
            align="center"
            prop="countryCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="语言"
            align="center"
            prop="language"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="首次安装时间"
            align="center"
            prop="installTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.installTime) }}</span>
            </template>
          </el-table-column><el-table-column
            label="首次打开时间"
            align="center"
            prop="firstOpenTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.firstOpenTime) }}</span>
            </template>
          </el-table-column><el-table-column
            label="最后活跃时间"
            align="center"
            prop="lastActiveTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.lastActiveTime) }}</span>
            </template>
          </el-table-column><el-table-column
            label="是否已注册：0-否, 1-是"
            align="center"
            prop="isRegistered"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="注册时间"
            align="center"
            prop="registerTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.registerTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:mdUserDeviceTab:edit']"
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
                  v-permisaction="['admin:mdUserDeviceTab:remove']"
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
import { addMdUserDeviceTab, delMdUserDeviceTab, getMdUserDeviceTab, listMdUserDeviceTab, updateMdUserDeviceTab } from '@/api/admin/md-user-device-tab'

export default {
  name: 'MdUserDeviceTab',
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
      mdUserDeviceTabList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        deviceId: undefined,
        userId: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { deviceId: [{ required: true, message: '设备唯一标识不能为空', trigger: 'blur' }],
        userId: [{ required: true, message: '用户ID（未绑定为0）不能为空', trigger: 'blur' }]
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
      listMdUserDeviceTab(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.mdUserDeviceTabList = response.data.list
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
      this.title = '添加用户设备信息表'
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
      getMdUserDeviceTab(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户设备信息表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateMdUserDeviceTab(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addMdUserDeviceTab(this.form).then(response => {
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
        return delMdUserDeviceTab({ 'ids': Ids })
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
