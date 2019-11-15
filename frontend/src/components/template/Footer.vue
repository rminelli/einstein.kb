<template>
  <footer class="footer">
    <a href="https://github.com/rminelli">
      Developed by
      <strong>Roberto Minelli - 2019</strong>
    </a>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #dddddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}

.footer a {
  color: #333;
  text-decoration: none;
}
.footer a:hover {
  color: #000;
  text-decoration: none;
}
</style>