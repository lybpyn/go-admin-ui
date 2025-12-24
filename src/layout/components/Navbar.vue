<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb v-if="!topNav" id="breadcrumb-container" class="breadcrumb-container" />
    <top-nav v-if="topNav" id="topmenu-container" class="breadcrumb-container" />
    <div class="right-menu" style="display: flex;align-items:center ;">
      <audio
        id="audio"
        ref="audio"
        src="../../assets/yx.mp3"
        controls="controls"
        style="z-index: 999999; display: none;"
      />
      <span>声音：</span>
      <el-switch
        v-model="isPlay"
        active-color="#13ce66"
        inactive-color="#000"
      />
      <el-badge style="cursor: pointer;margin-left: 20px;" :value="total" class="item-badge">
        <i class="el-icon-message-solid" style="font-size: 18px;" @click="handleClick" />
      </el-badge>
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'
import { listOrdUserOrders } from '@/api/admin/ord-user-orders'
export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    Search
  },
  data() {
    return {
      total: 0,
      ordUserOrdersList: [],
      timer: null,
      lastOrderIds: new Set(),
      isPlay: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }

  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  created() {
    this.getList()
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setInterval(() => {
      this.getList()
    }, 5000)
  },
  methods: {
    getList() {
      this.loading = true
      listOrdUserOrders({ status: 5, pageIndex: 1, pageSize: 1000 })
        .then(response => {
          const newList = response.data.list || []
          // 提取新数据的 id（假设用 id）
          const newIds = new Set(newList.map(item => item.id))
          // 判断是否有新数据
          let hasNew = false
          for (const id of newIds) {
            if (!this.lastOrderIds.has(id)) {
              hasNew = true
              break
            }
          }
          // ⭐ 有新数据 → 播放声音
          if (hasNew && this.lastOrderIds.size > 0) {
            this.playSound()
          }
          // 更新数据
          this.ordUserOrdersList = newList
          this.total = response.data.count
          // 更新缓存的 id
          this.lastOrderIds = newIds
        })
        .finally(() => {
          this.loading = false
        })
    },
    playSound() {
      if (!this.isPlay) return
      const audio = this.$refs.audio
      if (!audio) return
      audio.currentTime = 0
      audio.play().catch(err => {
        console.warn('音频播放被浏览器拦截:', err)
      })
    },
    handleClick() {
      console.log('handleClick')
      this.$router.push({ path: '/orderManage/order-pending/index' })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/LogOut').then(() => {
          location.reload()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style>
  .item-badge{
    margin-right: 20px;
  }
  .item-badge .el-badge__content{
    top: 15px;
  }
</style>
