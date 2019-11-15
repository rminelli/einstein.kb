<template>
  <div class="articles-by-category">
    <PageTitle
      icon="fa fa-folder-o"
      :main="category.name"
      :subtitle="articles.length"
      label="Articles: "
    />
    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleItem :article="article" />
      </li>
    </ul>
    <div class="load-more">
      <button v-if="loadMore" class="btn btn-lg btn-primary" @click="getArticles">Load More Articles</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import ArticleItem from "./ArticleItem";

export default {
  name: "ArticlesByCategory",
  components: { PageTitle, ArticleItem },
  data: function() {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    async getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`;
      try {
        let res = await axios(url);
        this.category = res.data;
      } catch (err) {
        showError(err);
      }
    },
    async getArticles() {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`;
      try {
        let res = await axios(url);
        this.articles = this.articles.concat(res.data);
        this.page++;
        if (res.data.length === 0) this.loadMore = false;
      } catch (err) {
        showError(err);
      }
    }
  },
  watch: {
    $route(to) {
      this.category.id = to.params.id;
      this.articles = [];
      this.page = 1;
      this.loadMore = true;

      this.getCategory();
      this.getArticles();
    }
  },
  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getArticles();
  }
};
</script>

<style>
.articles-by-category ul {
  list-style-type: none;
  padding: 0px;
}

.articles-by-category .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
</style>
