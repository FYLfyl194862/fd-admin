<template>
  <div>
    <el-container>
      <el-header>
        <FHead />
      </el-header>
      <el-container>
        <el-aside :width="$store.state.asideWidth">
          <f-menu />
        </el-aside>
        <el-main>
          <FTagList />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import FHead from "./components/FHead.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>
<style>
.el-aside {
  transition: all 0.2s;
}
</style>
