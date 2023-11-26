<template>
  <el-upload
    drag
    :action="uploadImage"
    multiple
    name="img"
    :headers="{ token }"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :data="data"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { reactive, ref } from "vue";
import { uploadImage } from "~/api/image.js";
import { getToken } from "~/composables/auth.js";
import { toast } from "~/composables/util.js";
const token = getToken();
defineProps({
  data: Object,
});
//上传成功
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  // console.log(response);
  toast("上传成功");
  emit("success", { response, uploadFile, uploadFiles });
};
//上传失败
const uploadError = (error, uploadFile, uploadFiles) => {
  let msg = JSON.parse(error.message).msg;
  toast(msg, "error");
};
const emit = defineEmits(["success"]);
</script>
<style scoped></style>
