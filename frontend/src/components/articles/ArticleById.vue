<template>
  <div class="article-by-id">
    <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />    
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import "highlightjs/styles/vs2015.css";
import hljs from "highlightjs/highlight.pack.js";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "ArticleById",
  components: { PageTitle },
  data: function() {
    return {
      article: {}
    };
  },
  async mounted() {
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`;
    try {
      let res = await axios.get(url);
      this.article = res.data;
    } catch (err) {
      showError(err);
    }
  },
  updated() {
    document.querySelectorAll(".article-content pre.ql-syntax").forEach(e => {      
      hljs.highlightBlock(e);
    });
  }
};
</script>

<style>
.article-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.article-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.article-content img {
  max-width: 100%;
}

.article-content :last-child {
  margin-bottom: 0px;
}
</style>
