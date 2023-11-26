<!-- <template>
   <div>
    <el-form ref="form" :rules="rules" label-width="auto">
      <el-form-item label="角色">
        <el-select v-model="rpState.newForm.roleId" placeholder="请选择角色" @change="getRolePermissions">
          <el-option
            :key="item.id"
            :label="item.id"
            :value="item.name"
            v-for="item in rpState.roles"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限">
        <el-checkbox
          v-model="rpState.Permissions"
          :label="item.id"
          :value="item.id"
          :key="item.id"
          >{{ item.description }}</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">权限全选</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { Search, Refresh, Delete } from "@element-plus/icons-vue";
const form = reactive({
  form: { roleName: " " },
  newForm:{}
});
//获取角色
const getRoles=()=>{
  getRoleList().then((res)=>{
    rpState.roles=res.data.data
  })
}
//获取权限
const getPermissions=()=>{
  getpermissionList().then((res)=>{
    rpState.Permissions=res.data.data
  })
}
//新增角色权限
const handleRolePermissionCreate = () => {
  const permissionInfo = {roleId:rpstate.newForm.roleId,permissionId:rpstate.newForm.permissionIds};
  addRolePermissions(permissionInfo).then((res) => {
    console.log(res);
  });
};
//获取角色权限
const getRolePermissions = () =>{
  getRolePermissionApi(roleId).then(res=>{
    rpState.newForm.permissionIds = res.data.map(v=>v.id)
  })
}
 -->
