<template>
  <div class="container">
    <!-- 导航头 -->
    <global-header :user="user"></global-header>
    <!-- 路由容器 -->
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更过</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import Home from './views/Home.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: "App",
  inheritAttrs: false,
  components: {
    GlobalHeader,
  },
  setup() {
    const store = useStore()
    // 从store中获取到当前用户的信息
    const currentUser = computed(() => store.state.user)
    return {
      user: currentUser,
    };
  },
});
</script>

<style>
</style>
