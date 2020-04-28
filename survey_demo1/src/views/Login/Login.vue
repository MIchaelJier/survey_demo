<template>
  <div>
    <div style="padding-bottom: 16px;">
      <van-nav-bar
        :title="type === '1' ? '登录' : '注册'"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div v-if="type === '1'">
      <van-form @submit="onLogin">
        <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ pattern: emailRule, message: '请填写正确的邮箱号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ pattern: passwordRule, message: '请填写正确的密码' }]"
        />
        <div style="margin: 16px;">
          <van-button
            round
            block
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            native-type="submit"
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
    <div v-else>
      <van-form @submit="onRegister">
        <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ pattern: emailRule, message: '请填写正确的邮箱号' }]"
        />
        <div style="margin: 16px;">
          <van-button
            round
            block
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            native-type="submit"
          >
            注册
          </van-button>
        </div>
      </van-form>
      <div class="tip">
        * 初始密码通过邮箱发送
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue-function-api';
import { login, register } from '@/request/api';
import { Notify } from 'vant';

export default {
  setup(props, ctx) {
    const type = ref(ctx.route.query.type);
    const password = ref('');
    const email = ref('');
    const emailRule = ref(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    const passwordRule = ref(/^[0-9A-Za-z]{4,}$/);

    function onSubmit(promise, message) {
      return promise.then(res => {
        if (res.status) {
          Notify({ type: 'success', message });
          ctx.router.push('/');
        } else {
          Notify(res.code);
        }
        return res;
      });
    }

    function onLogin(form) {
      onSubmit(login(form), '登录成功').then(res => {
        localStorage.setItem(`survey_userInfo`, JSON.stringify(res.data));
        ctx.store.commit('getUserInfo');
      });
    }
    function onRegister(form) {
      onSubmit(register(form), '注册成功');
    }
    function onClickLeft() {
      ctx.router.push('/');
    }
    return {
      type,
      password,
      email,
      emailRule,
      passwordRule,

      onLogin,
      onClickLeft,
      onRegister
    };
  }
};
</script>

<style scoped lang="scss">
@import './Login.scss';
</style>
