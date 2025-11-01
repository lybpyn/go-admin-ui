
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="事件ID（唯一标识）" prop="eventId"><el-input
            v-model="queryParams.eventId"
            placeholder="请输入事件ID（唯一标识）"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="事件代码，如：xx_Installation, xx_register_success" prop="eventCode"><el-input
            v-model="queryParams.eventCode"
            placeholder="请输入事件代码，如：xx_Installation, xx_register_success"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="事件名称，如：安装、注册成功" prop="eventName"><el-input
            v-model="queryParams.eventName"
            placeholder="请输入事件名称，如：安装、注册成功"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="模块名称" prop="moduleName"><el-input
            v-model="queryParams.moduleName"
            placeholder="请输入模块名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="用户ID（未登录为0）" prop="userId"><el-input
            v-model="queryParams.userId"
            placeholder="请输入用户ID（未登录为0）"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="设备唯一标识（IDFA/GAID等）" prop="deviceId"><el-input
            v-model="queryParams.deviceId"
            placeholder="请输入设备唯一标识（IDFA/GAID等）"
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
              v-permisaction="['admin:mdEventLogTab:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:mdEventLogTab:edit']"
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
              v-permisaction="['admin:mdEventLogTab:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="mdEventLogTabList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="事件ID（唯一标识）"
            align="center"
            prop="eventId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="事件代码，如：xx_Installation, xx_register_success"
            align="center"
            prop="eventCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="事件名称，如：安装、注册成功"
            align="center"
            prop="eventName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="模块名称"
            align="center"
            prop="moduleName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="用户ID（未登录为0）"
            align="center"
            prop="userId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="设备唯一标识（IDFA/GAID等）"
            align="center"
            prop="deviceId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="平台类型：1-TikTok, 2-Google, 3-Apple"
            align="center"
            prop="platform"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="页面名称（Activity/Fragment/Ctr）"
            align="center"
            prop="pageName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="APP版本号"
            align="center"
            prop="appVersion"
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
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:mdEventLogTab:edit']"
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
                  v-permisaction="['admin:mdEventLogTab:remove']"
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
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="网络类型（WiFi/4G/5G）" prop="networkType">
              <el-input
                v-model="form.networkType"
                placeholder="网络类型（WiFi/4G/5G）"
              />
            </el-form-item>
            <el-form-item label="国家代码" prop="countryCode">
              <el-input
                v-model="form.countryCode"
                placeholder="国家代码"
              />
            </el-form-item>
            <el-form-item label="语言" prop="language">
              <el-input
                v-model="form.language"
                placeholder="语言"
              />
            </el-form-item>
            <el-form-item label="IP地址" prop="ipAddress">
              <el-input
                v-model="form.ipAddress"
                placeholder="IP地址"
              />
            </el-form-item>
            <el-form-item label="事件参数（JSON格式，存储自定义参数）" prop="eventParams">
              <el-input
                v-model="form.eventParams"
                placeholder="事件参数（JSON格式，存储自定义参数）"
              />
            </el-form-item>
            <el-form-item label="会话ID" prop="sessionId">
              <el-input
                v-model="form.sessionId"
                placeholder="会话ID"
              />
            </el-form-item>
            <el-form-item label="来源页面" prop="referrer">
              <el-input
                v-model="form.referrer"
                placeholder="来源页面"
              />
            </el-form-item>
            <el-form-item label="事件发生时间戳（毫秒）" prop="eventTime">
              <el-input
                v-model="form.eventTime"
                placeholder="事件发生时间戳（毫秒）"
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
import { addMdEventLogTab, delMdEventLogTab, getMdEventLogTab, listMdEventLogTab, updateMdEventLogTab } from '@/api/admin/md-event-log-tab'

export default {
  name: 'MdEventLogTab',
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
      mdEventLogTabList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        eventId: undefined,
        eventCode: undefined,
        eventName: undefined,
        moduleName: undefined,
        userId: undefined,
        deviceId: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { eventId: [{ required: true, message: '事件ID（唯一标识）不能为空', trigger: 'blur' }],
        eventCode: [{ required: true, message: '事件代码，如：xx_Installation, xx_register_success不能为空', trigger: 'blur' }],
        eventName: [{ required: true, message: '事件名称，如：安装、注册成功不能为空', trigger: 'blur' }],
        moduleName: [{ required: true, message: '模块名称不能为空', trigger: 'blur' }],
        userId: [{ required: true, message: '用户ID（未登录为0）不能为空', trigger: 'blur' }],
        deviceId: [{ required: true, message: '设备唯一标识（IDFA/GAID等）不能为空', trigger: 'blur' }]
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
      listMdEventLogTab(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.mdEventLogTabList = response.data.list
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
        networkType: undefined,
        countryCode: undefined,
        language: undefined,
        ipAddress: undefined,
        eventParams: undefined,
        sessionId: undefined,
        referrer: undefined,
        eventTime: undefined
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
      this.title = '添加埋点事件日志表'
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
      getMdEventLogTab(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改埋点事件日志表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateMdEventLogTab(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addMdEventLogTab(this.form).then(response => {
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
        return delMdEventLogTab({ 'ids': Ids })
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
