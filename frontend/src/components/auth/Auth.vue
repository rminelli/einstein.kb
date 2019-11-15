<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img v-if="showSignup" src="@/assets/signup.png" width="50" alt="Signup" />
      <img v-else src="@/assets/logo.svg" width="150" alt="Logo" />

      <hr />
      <div class="auth-title">{{ showSignup ? 'Register' : 'Login' }}</div>

      <input v-if="showSignup" v-model="user.name" type="text" placeholder="Name" />
      <input v-model="user.email" name="email" type="text" placeholder="E-mail" />
      <input v-model="user.password" name="password" type="password" placeholder="Password" />
      <input
        v-if="showSignup"
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />

      <button v-if="showSignup" @click="signup">Sign up</button>
      <button v-else @click="signin">Sign in</button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Sign in</span>
        <span v-else>Create your Account</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignup: false,
      user: {}
    };
  },
  methods: {
    async signin() {
      const url = `${baseApiUrl}/signin`;
      try {
        let res = await axios.post(url, this.user);
        this.$store.commit("setUser", res.data);
        localStorage.setItem(userKey, JSON.stringify(res.data));
        this.$router.push({ path: "/" });
      } catch (err) {
        showError(err);
      }
    },
    async signup() {
      const url = `${baseApiUrl}/signup`;
      try {
        await axios.post(url, this.user);
        this.$toasted.global.defaultSuccess();
        this.user = {};
        this.showSignup = false;
      } catch (err) {
        showError(err);
      }
    }
  }
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  border-radius: 10px;
  align-self: flex-end;
  background-color: #333c47;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(12, 12, 12, 0.8),
    rgba(120, 120, 120, 0)
  );
}
</style>
