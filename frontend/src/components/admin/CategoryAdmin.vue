<template>
  <div class="category-admin">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-form-group label="Name:" label-for="category-name">
        <b-form-input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Enter category name..."
        />
      </b-form-group>
      <b-form-group label="Main category:" label-for="category-parentId">
        <b-form-select
          v-if="mode === 'save'"
          id="category-parentId"
          :options="categories"
          v-model="category.parentId"
        />
        <b-form-input v-else id="category-parentId" type="text" v-model="category.path" readonly />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Delete</b-button>
      <b-button class="ml-2" @click="reset">Cancel</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="categories" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "CategoryAdmin",
  data: function() {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "path", label: "Path", sortable: true },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    async loadCategories() {
      const url = `${baseApiUrl}/categories`;
      try {
        let res = await axios.get(url);
        this.categories = res.data.map(category => {
          return { ...category, value: category.id, text: category.path };
        });
      } catch (err) {
        showError(err);
      }
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    async save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      try {
        await axios[method](`${baseApiUrl}/categories${id}`, this.category);
        this.$toasted.global.defaultSuccess();
        this.reset();
      } catch (err) {
        showError(err);
      }
    },
    async remove() {
      const id = this.category.id;
      try {
        axios.delete(`${baseApiUrl}/categories/${id}`);
        this.$toasted.global.defaultSuccess();
        this.reset();
      } catch (err) {
        showError(err);
      }
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    }
  },
  mounted() {
    this.loadCategories();
  }
};
</script>

<style>
</style>