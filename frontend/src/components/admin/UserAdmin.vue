<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Name:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Enter user name..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Enter user e-mail..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode==='save'">
        <b-col md="6" sm="12">
          <b-form-group label="Password:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Enter user password..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirm password:" label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirm user password..."
            />
          </b-form-group>
        </b-col>
         <b-col md="6" sm="12">
          <b-form-group label="Deleted At:" label-for="user-deletedAt">
            <b-form-input
              id="user-deletedAt"
              type="datetime"
              v-model="user.deletedAt"
              readonly
              required              
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Delete</b-button>
          <b-button class="ml-2" @click="reset">Cancel</b-button>
        </b-col>
      </b-row>
      <b-form-checkbox
        v-show="mode==='save'"
        id="user-admin"
        v-model="user.admin"
        class="mt-3 mb-3"
      >Administrator</b-form-checkbox>     
      <hr />
    </b-form>
    <b-table hover striped :items="users" :fields="fields" >
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "UserAdmin",
  data: function() {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Admin",
          sortable: true,
          formatter: value => (value ? "Yes" : "No")
        },
        {
          key: "deletedAt",
          label: "Status",
          sortable: true,
          formatter: value => (!value ? "Activated" : "Disabled")
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    async loadUsers() {
      const url = `${baseApiUrl}/users`;
      try {
        let res = await axios.get(url);
        this.users = res.data;
      } catch (err) {
        showError(err);
      }
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    async save() {
      const method = this.user.id ? "put" : "post"; // checar o metodo pelo id do usuario setado
      const id = this.user.id ? `/${this.user.id}` : "";
      try {
        await axios[method](`${baseApiUrl}/users${id}`, this.user);
        this.$toasted.global.defaultSuccess();
        this.reset();
      } catch (err) {
        showError(err);
      }
    },
    async remove() {
      const id = this.user.id;
      try {
        await axios.delete(`${baseApiUrl}/users/${id}`);
        this.$toasted.global.defaultSuccess();
        this.reset();
      } catch (err) {
        showError(err);
      }
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    }
},
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>