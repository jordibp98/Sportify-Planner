<template>
    <footer class="bg-gray-800 text-white p-4 mt-0  w-full bottom-0 left-0">
      <div class="flex justify-between items-center">
        <!-- Text esquerra -->
        <p class="text-sm">&copy; 2024 Sportify Planner. All rights reserved.</p>
  
        <!-- Xarxes socials -->
        <div class="flex gap-4">
            
          <a href="https://facebook.com" target="_blank">
            <img src="../assets/images/facebook.png" alt="Facebook" class="h-6 w-6">
          </a>
          <a href="https://instagram.com" target="_blank">
            <img src="../assets/images/insta.png" alt="Instagram" class="h-6 w-6">
          </a>
          <a href="https://twitter.com" target="_blank">
            <img src="../assets/images/X.png" alt="Twitter" class="h-6 w-6">
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
 
  footer {
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* ombra  destacar footer */
  }
  </style>
  