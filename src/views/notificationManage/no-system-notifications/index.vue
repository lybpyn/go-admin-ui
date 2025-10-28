
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="目标用户ID（仅 target_type=user 时有效）" prop="targetUserId"><el-input
            v-model="queryParams.targetUserId"
            placeholder="请输入目标用户ID（仅 target_type=user 时有效）"
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
              v-permisaction="['admin:noSystemNotifications:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:noSystemNotifications:edit']"
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
              v-permisaction="['admin:noSystemNotifications:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="noSystemNotificationsList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="消息标题"
            align="center"
            prop="title"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="消息内容"
            align="center"
            prop="content"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="消息类型"
            align="center"
            prop="type"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="目标类型：all=全体用户, user=单用户"
            align="center"
            prop="targetType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="目标用户ID（仅 target_type=user 时有效）"
            align="center"
            prop="targetUserId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="是否已读：0=未读,1=已读"
            align="center"
            prop="isRead"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="读取时间"
            align="center"
            prop="readAt"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.readAt) }}</span>
            </template>
          </el-table-column><el-table-column
            label="状态：1=正常，0=禁用/撤回"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:noSystemNotifications:edit']"
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
                  v-permisaction="['admin:noSystemNotifications:remove']"
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

            <el-form-item label="消息标题" prop="title">
              <el-input
                v-model="form.title"
                placeholder="消息标题"
              />
            </el-form-item>
            <el-form-item label="消息内容" prop="content">
              <el-input
                v-model="form.content"
                placeholder="消息内容"
              />
            </el-form-item>
            <el-form-item label="消息类型" prop="type">
              <el-input
                v-model="form.type"
                placeholder="消息类型"
              />
            </el-form-item>
            <el-form-item label="目标类型：all=全体用户, user=单用户" prop="targetType">
              <el-input
                v-model="form.targetType"
                placeholder="目标类型：all=全体用户, user=单用户"
              />
            </el-form-item>
            <el-form-item label="目标用户ID（仅 target_type=user 时有效）" prop="targetUserId">
              <el-input
                v-model="form.targetUserId"
                placeholder="目标用户ID（仅 target_type=user 时有效）"
              />
            </el-form-item>
            <el-form-item label="是否已读：0=未读,1=已读" prop="isRead">
              <el-input
                v-model="form.isRead"
                placeholder="是否已读：0=未读,1=已读"
              />
            </el-form-item>
            <el-form-item label="读取时间" prop="readAt">
              <el-date-picker
                v-model="form.readAt"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="状态：1=正常，0=禁用/撤回" prop="status">
              <el-input
                v-model="form.status"
                placeholder="状态：1=正常，0=禁用/撤回"
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
import { addNoSystemNotifications, delNoSystemNotifications, getNoSystemNotifications, listNoSystemNotifications, updateNoSystemNotifications } from '@/api/admin/no-system-notifications'

export default {
  name: 'NoSystemNotifications',
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
      noSystemNotificationsList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        targetUserId: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { targetUserId: [{ required: true, message: '目标用户ID（仅 target_type=user 时有效）不能为空', trigger: 'blur' }]
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
      listNoSystemNotifications(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.noSystemNotificationsList = response.data.list
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
        title: undefined,
        content: undefined,
        type: undefined,
        targetType: undefined,
        targetUserId: undefined,
        isRead: undefined,
        readAt: undefined,
        status: undefined
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
      this.title = '添加系统消息提醒表'
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
      getNoSystemNotifications(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改系统消息提醒表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateNoSystemNotifications(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addNoSystemNotifications(this.form).then(response => {
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
        return delNoSystemNotifications({ 'ids': Ids })
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
