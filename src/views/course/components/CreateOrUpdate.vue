<template>
  <div class="course-create">
    <el-card>
      <div slot="header">
        <el-steps
          :active="activeStep"
          simple
        >
          <el-step
            :title="item.title"
            :icon="item.icon"
            v-for="(item,index) in steps"
            :key="index"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </div>
      <el-form label-width="80px">
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              style="margin-bottom: 10px"
              v-model="course.previewFirstField"
              type="textarea"
              placeholder="概述1"
            ></el-input>
            <el-input
              v-model="course.previewSecondField"
              type="textarea"
              placeholder="概述2"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              v-model="course.sortNum"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          课程封面
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input
              v-model.number="course.discounts"
              type="number"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input
              v-model.number="course.price"
              type="number"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input
              v-model.number="course.sales"
              type="number"
            >
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag"></el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <template v-if="coruse.activityCourse">
            <!-- <el-form-item label="开始时间">
              <el-date-picker v-model="course.activityCourseDto.beginTime"></el-date-picker>
            </el-form-item> -->
          </template>
        </div>
        <div v-show="activeStep === 4">
          课程详情
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CourseCreate",
  data() {
    return {
      activeStep: 0,
      steps: [
        { title: "基本信息", icon: "el-icon-edit" },
        { title: "课程封面", icon: "el-icon-edit" },
        { title: "销售信息", icon: "el-icon-edit" },
        { title: "秒杀活动", icon: "el-icon-edit" },
        { title: "课程详情", icon: "el-icon-edit" },
      ],
      course: {
        courseName: "",
        brief: "",
        teacherDTO: {
          teacherName: "",
          teacherHeadPicUrl: "",
          position: "",
          description: "",
        },
        discounts: 0,
        price: 0,
        sales: 0,
        discountsTag: "",
        activityCourse: false,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
