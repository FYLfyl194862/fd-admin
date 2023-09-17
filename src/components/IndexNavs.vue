<template>
  <el-row :gutter="20" class="mt-5">
    <el-col
      :span="3"
      :offset="0"
      v-for="(item, index) in iconNavs"
      :key="index"
      :icon="item.icon"
    >
      <el-card shadow="hover" @click="$router.push(item.path)">
        <div class="flex flex-col justify-center items-center cursor-pointer">
          <el-icon size="16" :class="item.color">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="text-sm mt-2">{{ item.title }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref } from "vue";
const iconNavs = [
  {
    icon: "User",
    color: "text-light-blue-500",
    title: "用户",
    path: "/user/list",
  },
  {
    icon: "ShoppingCart",
    color: "text-violet-500",
    title: "商品",
    path: "/goods/list",
  },
  {
    icon: "Tickets",
    color: "text-fuchsia-500",
    title: "订单",
    path: "/order/list",
  },
  {
    icon: "ChatDotSquare",
    color: "text-teal-500",
    title: "评价",
    path: "/comment/list",
  },
  {
    icon: "Picture",
    color: "text-rose-500",
    title: "图库",
    path: "/image/list",
  },
  {
    icon: "Bell",
    color: "text-green-500",
    title: "公告",
    path: "/notice/list",
  },
  {
    icon: "SetUp",
    color: "text-grey-500",
    title: "配置",
    path: "/setting/base",
  },
  {
    icon: "Files",
    color: "text-yellow-500",
    title: "优惠券",
    path: "/coupon/list",
  },
];
</script>
<style></style>
