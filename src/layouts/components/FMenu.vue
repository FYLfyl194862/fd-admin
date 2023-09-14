<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      :default-active="defaultActive"
      default-active="2"
      class="border-0"
      :collapse="iscollapse"
      @select="handleSelect"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon"></component></el-icon>
            {{ item2.name }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
//数据

const router = useRouter();
const route = useRoute();
const store = useStore();
//默认选中
const defaultActive = ref(route.path);
//方法
const handleSelect = (e) => {
  router.push(e);
};
//是否折叠
const iscollapse = computed(() => {
  !(store.state.asideWidth == "250px");
});
const asideMenus = computed(() => store.state.menus);
</script>
<style>
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}
.f-menu::-webkit-scrollbar {
  width: 0;
}
</style>
