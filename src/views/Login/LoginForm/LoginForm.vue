<template>
  <div class="loginForm_box">
    <div class="loginForm">
      <div class="login_box">
        <div class="login_head">
          <h2>欢迎登录</h2>
        </div>
        <div class="login_body">
          <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="100">
            <FormItem prop="userName">
              <Input type="text" v-model="formInline.userName" placeholder="请输入用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <div class="login_model">
      <!-- <Button @click="showModal = true">Vertical center</Button> -->
      <div class="login_mask" v-if="showModal==true">
        <section class="login_model">
          <div class="model_close" @click="showModal=false">
            <span class="model_close_span">X</span>
          </div>
          <div class="model_title">
            <Icon type="md-alert"/>
            <span class="login_model_text">{{modelContent}}</span>
          </div>
          <button class="model_btn" @click="showModal=false">确定</button>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import Http from "../../../network/network.js";
export default {
  name: "LoginForm",
  data() {
    return {
      showModal: false,
      modelContent: "343354",
      formInline: {
        userName: "",
        password: ""
      },
      ruleInline: {
        userName: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          //   {
          //     type: "string",
          //     min: 6,
          //     message: "密码长度不能小于6位",
          //     trigger: "blur"
          //   }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Http.Request({
            url: "http://192.168.1.6:3000/user/userlogin",
            method: "post",
            data: {
              user_name: this.formInline.userName,
              password: this.formInline.password
            }
          })
            .then(res => {
              if (res.code == 1) {
                this.$store.commit("RECEIVE_USER_USERINFO", res.data);
                this.showModal = false;
                this.$router.push({path:'/home'});
              } else if (res.code == 0) {
                this.modelContent = res.data;
                this.showModal = true;
              }
            })
            .catch(err => {
            });
          // 登录成功
          //   this.$Message.success("Success!");
        } else {
          // 登录失败
            this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login_body /deep/ form .ivu-form-item {
  width: 100% !important;
}
.login_body /deep/ form .ivu-form-item-content {
  margin-left: 0rem !important;
  text-align: center;
}
.login_body /deep/ form .ivu-btn-primary {
  width: 100% !important;
}
.login_body /deep/ form .ivu-btn-primary span {
  color: #fff !important;
}
.loginForm_box {
  .loginForm {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login_box {
      width: 300px;
      height: 300px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 2px;
      .login_head {
        h2 {
          font-size: 1rem;
          font-weight: bold;
          font-family: auto;
        }
        padding: 0.875rem 1rem;
        border-bottom: 1px solid #999;
      }
      .login_body {
        padding: 1rem;
      }
    }
  }
  .login_mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 100;
    .login_model {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16.25rem;
      height: 12.5rem;
      border: 1px solid #fff;
      border-radius: 2px;
      background-color: #fff;
      text-align: center;
      padding: 1.875rem 0.625rem;
      .model_close {
        position: absolute;
        right: 1.25rem;
        top: 0.625rem;
        cursor: pointer;
        .model_close_span {
          font-size: 0.9375rem;
          font-weight: bold;
        }
      }
      .model_title {
        .ivu-icon-md-alert {
          font-size: 2.5rem;
          color: #f90;
          vertical-align: middle;
        }
        .login_model_text {
          font-size: 0.9375rem;
          font-weight: normal;
        }
      }
      .model_btn {
        padding: 0.375rem 0.9375rem;
        color: #fff;
        border: 1px solid #2d8cf0;
        border-radius: 2px;
        margin-top: 2.5rem;
        background-color: #2d8cf0;
      }
    }
  }
}
</style>
