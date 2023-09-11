<template>
  <el-row class="login-container">
    <!-- 左边 -->
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>后台管理系统开发</div>
      </div>
    </el-col>
    <!-- 右边 -->
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { toast } from "~/composables/util";
//跳转
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
});
const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
};
//拿到el-form节点
const formRef = ref(null);
//进度条为true时就是加载状态，false就是正常状态
const loading = ref(false);
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;
    //调用actions,
    store
      .dispatch("login", form)
      .then((res) => {
        toast("登录成功");
        //跳转首页
        router.push("/");
      })
      .finally(() => {
        //正常状态
        loading.value = false;
      });
    //不用封装登录功能
    // login(form.username, form.password)
    //   .then((res) => {
    //     console.log(res);
    //     // 提示成功
    //     toast("登录成功");

    //     // 存储token
    //     setToken(res.token);

    //     // 跳转到后台首页
    //     router.push("/");
    //   })
    //   .finally(() => {
    //     //正常状态
    //     loading.value = false;
    //   });
  });
};
// 监听回车事件
function onKeyUp(e) {
  // console.log(e);
  if (e.key == "Enter") {
    onSubmit();
  }
}
// 添加键盘监听 keyup键盘按下事件  页面加载完毕
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
// 移除键盘监听  页面卸载之前
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply bg-light-50 flex-col;
}
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}
.right .title {
  @apply font-bold text-3xl text-gray-800;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
