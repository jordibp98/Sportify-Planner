<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Blog</h1>
  
      <div v-for="post in posts" :key="post.id" class="mb-6">
        <!-- Enllaç directe al post -->
        <RouterLink :to="`/Blog/${post.id}`" class="text-xl font-bold text-blue-500 hover:underline">
          {{ post.title }}
        </RouterLink>
        <p class="text-gray-600 text-sm mt-2">{{ post.excerpt }}</p>
      </div>
      <button 
        @click="scrollToTop"
        class="fixed bottom-16 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700">
        ↑
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [
          {
            id: 1,
            title: "How to Prepare for Your First Marathon",
            excerpt: "Discover essential tips for training, nutrition, and mental preparation."
          },
          {
            id: 2,
            title: "Top 5 Trail Running Locations in Europe",
            excerpt: "Explore breathtaking trails perfect for all experience levels."
          },
          {
            id: 3,
            title: "The Importance of Rest Days",
            excerpt: "Learn why recovery is key to improving your performance."
          }
        ]
      };
    }
  };
  </script>