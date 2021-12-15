<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage===100? 'success': undefined"
    />
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img
        :src="value"
        v-if="value"
        class="avatar"
      />
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { uploadCourseImage } from "@/services/course";
import Vue from "vue";
export default Vue.extend({
  name: "CourseImage",
  props: {
    value: {
      type: String,
    },
    limit: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      isUploading: false,
      percentage: 0,
    };
  },
  methods: {
    async handleUpload(options: any) {
      try {
        this.isUploading = true;
        const fd = new FormData();
        fd.append("file", options.file);
        const { data } = await uploadCourseImage(fd, (e) => {
          this.percentage = Math.floor((e.loaded / e.total) * 100);
        });
        if (data.code === "000000") {
          this.isUploading = false;
          this.percentage = 0;
          this.$emit("input", data.data.name);
        } else {
          this.$message.error("上传失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
  border: 1px dashed #d9d9d9;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  color: #8c939d;
  font-size: 28px;
}

.avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>
