<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserDropdown from "./UserDropDown";
export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa fa-2x fa-toggle-on"
        : "fa fa-2x fa-toggle-off";
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #000, #fff);

  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}
.title a {
  color: #fff;
  text-decoration: none;
}
.title a:hover {
  color: #fff;
  text-decoration: none;
}
.header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
.header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>