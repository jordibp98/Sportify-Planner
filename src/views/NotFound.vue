<template>
    <div class="text-center p-8">
      <h1 class="text-4xl font-bold text-red-500">404</h1>
      <p class="text-lg mt-4">Pàgina no trobada</p>
      <router-link to="/" class="text-blue-500 underline mt-4 block">
        Torna a la pàgina principal
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>
  