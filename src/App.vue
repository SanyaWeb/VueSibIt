<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>

  import MainLayout from "./layouts/MainLayout/MainLayout"

  export default {
    computed: {
      layout() {
        return "MainLayout";
      }
    },
    components: {
      MainLayout
    }
  }

</script>

<style> </style>