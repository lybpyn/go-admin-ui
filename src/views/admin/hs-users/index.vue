
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="用户名（可选展示用）" prop="username"><el-input
            v-model="queryParams.username"
            placeholder="请输入用户名（可选展示用）"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="" prop="passwordHash"><el-input
            v-model="queryParams.passwordHash"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="" prop="firstname"><el-input
            v-model="queryParams.firstname"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="" prop="lastname"><el-input
            v-model="queryParams.lastname"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="头像URL" prop="avatar"><el-input
            v-model="queryParams.avatar"
            placeholder="请输入头像URL"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="可用余额" prop="balance"><el-input
            v-model="queryParams.balance"
            placeholder="请输入可用余额"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="冻结余额" prop="frozenBalance"><el-input
            v-model="queryParams.frozenBalance"
            placeholder="请输入冻结余额"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="用户等级ID" prop="levelId"><el-input
            v-model="queryParams.levelId"
            placeholder="请输入用户等级ID"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="当前经验" prop="experience"><el-input
            v-model="queryParams.experience"
            placeholder="请输入当前经验"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="区域id" prop="regionId"><el-input
            v-model="queryParams.regionId"
            placeholder="请输入区域id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="累计经验" prop="totalExperience"><el-input
            v-model="queryParams.totalExperience"
            placeholder="请输入累计经验"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="" prop="inviteCode"><el-input
            v-model="queryParams.inviteCode"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="状态：1正常，0封禁" prop="status"><el-input
            v-model="queryParams.status"
            placeholder="请输入状态：1正常，0封禁"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="" prop="version"><el-input
            v-model="queryParams.version"
            placeholder="请输入"
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
              v-permisaction="['admin:hsUsers:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsUsers:edit']"
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
              v-permisaction="['admin:hsUsers:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsUsersList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="用户名（可选展示用）"
            align="center"
            prop="username"
            :show-overflow-tooltip="true"
          /><el-table-column
            label=""
            align="center"
            prop="passwordHash"
            :show-overflow-tooltip="true"
          /><el-table-column
            label=""
            align="center"
            prop="firstname"
            :show-overflow-tooltip="true"
          /><el-table-column
            label=""
            align="center"
            prop="lastname"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="头像URL"
            align="center"
            prop="avatar"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="可用余额"
            align="center"
            prop="balance"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="冻结余额"
            align="center"
            prop="frozenBalance"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="用户等级ID"
            align="center"
            prop="levelId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="当前经验"
            align="center"
            prop="experience"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="区域id"
            align="center"
            prop="regionId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="累计经验"
            align="center"
            prop="totalExperience"
            :show-overflow-tooltip="true"
          /><el-table-column
            label=""
            align="center"
            prop="inviteCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="状态：1正常，0封禁"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          /><el-table-column
            label=""
            align="center"
            prop="version"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsUsers:edit']"
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
                  v-permisaction="['admin:hsUsers:remove']"
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

            <el-form-item label="" prop="lastname">
              <el-input
                v-model="form.lastname"
                placeholder=""
              />
            </el-form-item>
            <el-form-item label="头像URL" prop="avatar">
              <el-input
                v-model="form.avatar"
                placeholder="头像URL"
              />
            </el-form-item>
            <el-form-item label="状态：1正常，0封禁" prop="status">
              <el-input
                v-model="form.status"
                placeholder="状态：1正常，0封禁"
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
import { addHsUsers, delHsUsers, getHsUsers, listHsUsers, updateHsUsers } from '@/api/admin/hs-users'

export default {
  name: 'HsUsers',
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
      hsUsersList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        username: undefined,
        passwordHash: undefined,
        firstname: undefined,
        lastname: undefined,
        avatar: undefined,
        balance: undefined,
        frozenBalance: undefined,
        levelId: undefined,
        experience: undefined,
        regionId: undefined,
        totalExperience: undefined,
        inviteCode: undefined,
        status: undefined,
        version: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { username: [{ required: true, message: '用户名（可选展示用）不能为空', trigger: 'blur' }],
        passwordHash: [{ required: true, message: '不能为空', trigger: 'blur' }],
        firstname: [{ required: true, message: '不能为空', trigger: 'blur' }],
        lastname: [{ required: true, message: '不能为空', trigger: 'blur' }],
        avatar: [{ required: true, message: '头像URL不能为空', trigger: 'blur' }],
        balance: [{ required: true, message: '可用余额不能为空', trigger: 'blur' }],
        frozenBalance: [{ required: true, message: '冻结余额不能为空', trigger: 'blur' }],
        levelId: [{ required: true, message: '用户等级ID不能为空', trigger: 'blur' }],
        experience: [{ required: true, message: '当前经验不能为空', trigger: 'blur' }],
        regionId: [{ required: true, message: '区域id不能为空', trigger: 'blur' }],
        totalExperience: [{ required: true, message: '累计经验不能为空', trigger: 'blur' }],
        inviteCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '状态：1正常，0封禁不能为空', trigger: 'blur' }],
        version: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
      listHsUsers(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsUsersList = response.data.list
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
        lastname: undefined,
        avatar: undefined,
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
      this.title = '添加用户主表'
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
      getHsUsers(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户主表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsUsers(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsUsers(this.form).then(response => {
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
        return delHsUsers({ 'ids': Ids })
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
