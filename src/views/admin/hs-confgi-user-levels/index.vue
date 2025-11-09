
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="排序顺序" prop="sortOrder"><el-input
            v-model="queryParams.sortOrder"
            placeholder="请输入排序顺序"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="是否启用" prop="isActive"><el-input
            v-model="queryParams.isActive"
            placeholder="请输入是否启用"
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
              v-permisaction="['admin:hsConfgiUserLevels:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:hsConfgiUserLevels:edit']"
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
              v-permisaction="['admin:hsConfgiUserLevels:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="hsConfgiUserLevelsList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="等级名称"
            align="center"
            prop="levelName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="升级所需经验值"
            align="center"
            prop="upExperience"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="等级图标URL"
            align="center"
            prop="levelIcon"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="等级特权配置(JSON格式)"
            align="center"
            prop="levelPrivileges"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="排序顺序"
            align="center"
            prop="sortOrder"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="是否启用"
            align="center"
            prop="isActive"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:hsConfgiUserLevels:edit']"
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
                  v-permisaction="['admin:hsConfgiUserLevels:remove']"
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

            <el-form-item label="等级名称" prop="levelName">
              <el-input
                v-model="form.levelName"
                placeholder="等级名称"
              />
            </el-form-item>
            <el-form-item label="升级所需经验值" prop="upExperience">
              <el-input
                v-model="form.upExperience"
                placeholder="升级所需经验值"
              />
            </el-form-item>
            <el-form-item label="等级图标URL" prop="levelIcon">
              <el-input
                v-model="form.levelIcon"
                placeholder="等级图标URL"
              />
            </el-form-item>
            <el-form-item label="等级特权配置(JSON格式)" prop="levelPrivileges">
              <el-input
                v-model="form.levelPrivileges"
                placeholder="等级特权配置(JSON格式)"
              />
            </el-form-item>
            <el-form-item label="排序顺序" prop="sortOrder">
              <el-input
                v-model="form.sortOrder"
                placeholder="排序顺序"
              />
            </el-form-item>
            <el-form-item label="是否启用" prop="isActive">
              <el-input
                v-model="form.isActive"
                placeholder="是否启用"
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
import { addHsConfgiUserLevels, delHsConfgiUserLevels, getHsConfgiUserLevels, listHsConfgiUserLevels, updateHsConfgiUserLevels } from '@/api/admin/hs-confgi-user-levels'

export default {
  name: 'HsConfgiUserLevels',
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
      hsConfgiUserLevelsList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        sortOrder: undefined,
        isActive: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { sortOrder: [{ required: true, message: '排序顺序不能为空', trigger: 'blur' }],
        isActive: [{ required: true, message: '是否启用不能为空', trigger: 'blur' }]
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
      listHsConfgiUserLevels(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.hsConfgiUserLevelsList = response.data.list
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
        levelName: undefined,
        upExperience: undefined,
        levelIcon: undefined,
        levelPrivileges: undefined,
        sortOrder: undefined,
        isActive: undefined
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
      this.title = '添加用户等级配置表'
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
      getHsConfgiUserLevels(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户等级配置表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateHsConfgiUserLevels(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addHsConfgiUserLevels(this.form).then(response => {
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
        return delHsConfgiUserLevels({ 'ids': Ids })
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
