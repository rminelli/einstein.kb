<template>
  <div class="stat">
    <div class="stat-icon">
      <router-link to="/admin">
        <i :class="icon" :style="style"></i>
      </router-link>
    </div>
    <div class="stat-info">
      <router-link to="/admin">
        <span class="stat-title">{{ title }}</span>
      </router-link>
      <span class="stat-value1">{{ value1 }}</span>
      <span class="stat-value2">{{ value2 }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stats",
  props: ["title", "value1", "value2", "icon", "color"],
  computed: {
    style() {
      return "color: " + (this.color || "#000");
    }
  }
};
</script>

<style>
.stat {
  flex: 1;
  display: flex;
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.8);
}
.stat-icon {
  display: flex;
  align-items: center;
}
.stat-icon i {
  font-size: 4rem;
}
.stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.stat-title {
  font-size: 1.2rem;
}
.stat-value1 {
  font-size: 3rem;
}

.stat-value2 {
  font-size: 1.5rem;
  color: sandybrown;
}
</style>