<script setup></script>

<template>
  <router-view></router-view>
</template>

<style>
#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px;
}
body {
  background-color: #f4f4f4;
}
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner {
  display: block;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
