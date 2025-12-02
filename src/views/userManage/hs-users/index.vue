
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="用户名" prop="username"><el-input
            v-model="queryParams.username"
            placeholder="请输入用户名"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable @change="handleQuery">
              <el-option label="正常" value="1" />
              <el-option label="封禁" value="0" />
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
          <el-table-column type="selection" width="55" align="center" />
          <!-- <el-table-column
            label="用户名"
            align="center"
            prop="username"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column
            label="密码"
            align="center"
            prop="passwordHash"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="姓"
            align="center"
            prop="firstname"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="名"
            align="center"
            prop="lastname"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="头像URL"
            align="center"
            prop="avatar"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-image :src="scope.row.avatar" fit="fill" :preview-src-list="[scope.row.avatar]" />
            </template>
          </el-table-column>
          <el-table-column
            label="法币可用余额"
            align="center"
            prop="balance"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="虚拟币可用余额"
            align="center"
            prop="cryptoBalance"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="法币冻结余额"
            align="center"
            prop="frozenBalance"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="冻结虚拟币余额(USDT计价)"
            align="center"
            prop="cryptoFrozenBalance"
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
            label="区域"
            align="center"
            prop="regionName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="累计经验"
            align="center"
            prop="totalExperience"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="邀请码"
            align="center"
            prop="inviteCode"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1" size="small" type="success">正常</el-tag>
              <el-tag v-else size="small" type="danger">封禁</el-tag>
            </template>
          </el-table-column>
          <el-table-column
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

            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status" @change="handleStatusChange">
                <el-radio label="1">正常</el-radio>
                <el-radio label="0">封禁</el-radio>
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
        cryptoBalance: undefined,
        frozenBalance: undefined,
        cryptoFrozenBalance: undefined,
        levelId: undefined,
        experience: undefined,
        regionId: undefined,
        totalExperience: undefined,
        inviteCode: undefined,
        status: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { username: [{ required: true, message: '用户名（可选展示用）不能为空', trigger: 'blur' }],
        firstname: [{ required: true, message: '姓不能为空', trigger: 'blur' }],
        lastname: [{ required: true, message: '名不能为空', trigger: 'blur' }],
        avatar: [{ required: true, message: '头像URL不能为空', trigger: 'blur' }],
        balance: [{ required: true, message: '法币可用余额不能为空', trigger: 'blur' }],
        cryptoBalance: [{ required: true, message: '虚拟币可用余额不能为空', trigger: 'blur' }],
        frozenBalance: [{ required: true, message: '法币冻结余额不能为空', trigger: 'blur' }],
        cryptoFrozenBalance: [{ required: true, message: '冻结虚拟币余额(USDT计价)不能为空', trigger: 'blur' }],
        levelId: [{ required: true, message: '用户等级ID不能为空', trigger: 'blur' }],
        experience: [{ required: true, message: '当前经验不能为空', trigger: 'blur' }],
        regionId: [{ required: true, message: '区域id不能为空', trigger: 'blur' }],
        totalExperience: [{ required: true, message: '累计经验不能为空', trigger: 'blur' }],
        inviteCode: [{ required: true, message: '邀请码不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '状态：1正常，0封禁不能为空', trigger: 'blur' }]
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
