<template>
  <el-card>
    <div slot="header"></div>
    <el-table
      :data="users"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="用户ID"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="头像"
        width="80"
      >
        <template slot-scope="scope">
          <img
            width="30px"
            :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleSelectRole(scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { getUserPages, forbidUser } from "@/services/user";
import { Form } from "element-ui";
export default Vue.extend({
  name: "UserList",
  data() {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: "",
        startCreateTime: "",
        endCreateTime: "",
        rangeData: [],
      },
      loading: true,
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      currentUser: null,
    };
  },

  created() {
    this.loadUsers();
  },

  methods: {
    async loadUsers() {
      this.loading = true;
      const { data } = await getUserPages(this.filterParams);
      console.log("data === >>>", data);
      this.users = data.data.records;
      console.log("this.users ==>>>", this.users);
      this.loading = false;
    },
  },
});
</script>

<style lang="sass" scoped>
</style>
