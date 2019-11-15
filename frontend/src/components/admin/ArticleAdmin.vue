<template>
  <div class="article-admin">
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-form-group label="Name:" label-for="article-name">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter the Article name..."
        />
      </b-form-group>
      <b-form-group label="Description:" label-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter the Article description..."
        />
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Image (URL):" label-for="article-imageUrl">
        <b-form-input
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter Image URL..."
        />
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Category:" label-for="article-categoryId">
        <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId" />
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Author:" label-for="article-userId">
        <b-form-select id="article-userId" :options="users" v-model="article.userId" />
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Content:" label-for="article-content">
        <VueEditor v-model="article.content" placeholder="Enter the article content..." />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Delete</b-button>
      <b-button class="ml-2" @click="reset">Cancel</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="articles" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "description", label: "Description", sortable: true },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    async loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      try {
        let res = await axios.get(url);
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      } catch (err) {
        showError(err);
      }
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    async save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      try {
        await axios[method](`${baseApiUrl}/articles${id}`, this.article);
        this.$toasted.global.defaultSuccess();
        this.reset();
      } catch (err) {
        showError(err);
      }
    },
    async remove() {
      const id = this.article.id;
      try {
        await axios.delete(`${baseApiUrl}/articles/${id}`);
        this.$toasted.global.defaultSuccess();
        this.reset();
      } catch (err) {
        showError(err);
      }
    },
    async loadArticle(article, mode = "save") {
      this.mode = mode;
      try {
        let res = await axios.get(`${baseApiUrl}/articles/${article.id}`);
        this.article = res.data;
      } catch (err) {
        showError(err);
      }
    },
    async loadCategories() {
      const url = `${baseApiUrl}/categories`;
      try {
        let res = await axios.get(url);
        this.categories = res.data.map(category => {
          return { value: category.id, text: category.path };
        });
      } catch (err) {
        showError(err);
      }
    },
    async loadUsers() {
      const url = `${baseApiUrl}/users`;
      try {
        let res = await axios.get(url);
        this.users = res.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      } catch (err) {
        showError(err);
      }
    }
  },
  watch: {
    page() {
      this.loadArticles();
    }
  },
  mounted() {
    this.loadUsers();
    this.loadCategories();
    this.loadArticles();
  }
};
</script>

<style>
</style>