<template>
  <div class="login">
    <div class="login_img">
      <LoginForm></LoginForm>
    </div>
  </div>
</template>
<script>
import LoginForm from "./LoginForm/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>
<style lang="less" scoped>
.login {
  .login_img {
    position: absolute;
    top: 0rem;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/login-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
  }
}
</style>
