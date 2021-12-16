<template>
  <div class="login">
    <header>
      <h1>Fanison后台管理系统</h1>
    </header>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      label-position="top"
      class="login-form"
    >
      <el-form-item
        label="手机号"
        prop="phone"
      >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="isLoginLoading"
          @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Form } from "element-ui";
import { login } from "@/services/user";

export default Vue.extend({
  name: "LoginIndex",
  data() {
    return {
      form: {
        phone: "18201288771",
        password: "111111",
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
      isLoginLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        // 表单验证
        await (this.$refs.form as Form).validate();

        // loading 登录按钮
        this.isLoginLoading = true;

        // 提交表单
        const { data } = await login(this.form);

        // 失败提示
        if (data.state !== 1) {
          return this.$message.error(data.message);
        } else {
          this.$store.commit("setUser", data.content);
          // 成功跳转
          this.$router.push((this.$route.query.redirect as string) || "/");
          this.$message.success("登录成功");
        }
      } catch (err) {
        console.log("登录失败", err);
      }

      this.isLoginLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e9eef3;

  header h1 {
    margin-bottom: 30px;
    width: 290px;

    color: rgba(0, 0, 0, 0.5);
    font-size: 3rem;
    font-weight: 300;
    text-align: center;
    text-decoration: none;
    transition: text-shadow 0.3s;
    letter-spacing: 3px;
  }

  .login-form {
    padding: 20px;
    width: 300px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
