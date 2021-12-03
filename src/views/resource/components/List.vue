<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item
            label="资源名称"
            prop="name"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item
            label="资源路径"
            prop="url"
          >
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item
            label="资源分类"
            prop="categoryId"
          >
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                :key="item.id"
                v-for="item in resourceCategories"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>

      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom:20px"
      >
        <el-table-column
          label="编号"
          min-width="150"
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getAllResources } from "@/services/resource";
import { getResourceCategories } from "@/services/resource-category";

export default Vue.extend({
  name: "ResourceList",
  data() {
    return {
      resources: [],
      form: {
        name: "",
        url: "",
        categoryId: null,
      },
      resourceCategories: [],
    };
  },

  created() {
    this.loadResources();
    this.loadResourceCategories();
  },

  methods: {
    async loadResources() {
      const { data } = await getAllResources();
      this.resources = data.data;
      console.log("resoucres ===>>>", data);
    },

    async loadResourceCategories() {
      const { data } = await getResourceCategories();
      this.resourceCategories = data.data;
    },

    handleEdit(item: any) {
      console.log("edit");
    },

    handleDelete(item: any) {
      console.log("delete");
    },

    onSubmit() {
      console.log("submit");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
