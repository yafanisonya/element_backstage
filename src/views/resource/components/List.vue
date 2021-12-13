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
              :disabled="isLoading"
            >提交</el-button>
            <el-button
              @click="onReset"
              :disabled="isLoading"
            >重置</el-button>
          </el-form-item>
        </el-form>

      </div>
      <el-table
        :data="resources"
        v-loading="isLoading"
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
        <!-- <el-table-column
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
        </el-table-column> -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :disabled="isLoading"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getResourcePages } from "@/services/resource";
import { getResourceCategories } from "@/services/resource-category";
import { Form } from "element-ui";

export default Vue.extend({
  name: "ResourceList",
  data() {
    return {
      resources: [],
      form: {
        name: "",
        url: "",
        categoryId: null,
        size: 5,
        current: 1,
      },
      resourceCategories: [],
      totalCount: 0,
      isLoading: true,
    };
  },

  created() {
    this.loadResources();
    this.loadResourceCategories();
  },

  methods: {
    async loadResources() {
      this.isLoading = true;
      const { data } = await getResourcePages(this.form);
      this.resources = data.data.records;
      this.totalCount = data.data.total;
      this.isLoading = false;
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
      this.form.current = 1;
      this.loadResources();
    },

    handleSizeChange(val: number) {
      this.form.size = val;
      this.form.current = 1;
      this.loadResources();
    },

    handleCurrentChange(val: number) {
      this.form.current = val;
      this.loadResources();
    },

    onReset() {
      (this.$refs.form as Form).resetFields();
      this.form.current = 1;
      this.loadResources();
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
