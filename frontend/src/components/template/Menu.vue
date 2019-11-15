<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-sm"></i>
      <input type="text" placeholder="Search..." v-model="treeFilter" class="filter-field" />
    </div>
    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree" />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
  data: function() {
    return {
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { text: "name" },
        filter: {
          emptyText: "Category not find"
        }
      },
      treeFilter: ""
    };
  },
  methods: {
    async getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      try {
        let res = await axios.get(url);
        return res.data;
      } catch (err) {
        showError(err);
      }
    },
    onNodeSelect(node) {
      this.$router.push({
        name: "articlesByCategory",
        params: { id: node.id }
      });

      if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
      }
    }
  },
  mounted() {
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #000, #282828);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-child {
  filter: brightness(2);
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1.2rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}
.tree-anchor {
  color: #fff !important;
}

.tree-filter-empty {
  color: #ccc;
  font-size: 1.2rem;
  margin-left: 20px;
}
.tree-arrow.has-child:after {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBBQOCQ0YTpzfAAAAjklEQVQoz2NmYGBgYGAIdAw/LPHu6kUGDMAEoXjt+WXM5kck4VTAwMDAwMhoOgdTCRMyB5sSJlQuphImdCPRlTBhOgtVCRYFECWBjngUMDAwMDAy4VVwJnvdXjwKTmcvn47HDadzlk/D44szecun4gmHM/nLJuMJyTMFyyahm8gCoT4f+fz8ZtuyKZguAgDLtyS94NiAKwAAAABJRU5ErkJggg==") !important;
  border: 0 !important;
  width: 16px !important;
  height: 16px !important;
  background-repeat: no-repeat !important;
  transform: rotate(0deg) translateY(-50%) translateX(-2px) !important;
}

.tree-arrow.expanded.has-child:after {
  transform: rotate(90deg) translateY(0%) translateX(-8px) !important;
}

.tree-node.selected > .tree-content {
  background: #398df0;
}
</style>