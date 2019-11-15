<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" subtitle="Knowledge Base" />
    <div class="stats">
      <Stats title="Categories" :value1="stat.categories" icon="fa fa-folder-open" color="#7b1fa2"></Stats>
      <Stats title="Articles" :value1="stat.articles" icon="fa fa-file" color="#e64a19"></Stats>
      <Stats title="Active Users" :value1="stat.activeUsers" icon="fa fa-users" color="#0277bd"></Stats>            
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stats from "./Stats";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stats },
  data: function() {
    return {
      stat: {}
    };
  },
  methods: {    
    async getStats() {      
      let res = await axios.get(`${baseApiUrl}/stats`);
      this.stat = res.data      
    }
  },
  mounted() {
    this.getStats();
  }
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>