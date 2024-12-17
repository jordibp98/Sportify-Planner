<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <p class="text-gray-600">{{ post.content }}</p>
    </div>
    <button 
      @click="scrollToTop"
      class="fixed bottom-16 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700">
      ↑
    </button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [
          {
            id: 1,
            title: "How to Prepare for Your First Marathon",
            content: "Full content about marathon preparation, training, and tips."
          },
          {
            id: 2,
            title: "Top 5 Trail Running Locations in Europe",
            content: "Detailed guide of the top trail running locations."
          },
          {
            id: 3,
            title: "The Importance of Rest Days",
            content: "Explains why taking rest days is crucial for performance."
          }
        ]
      };
    },
    computed: {
      post() {
        const postId = parseInt(this.$route.params.id);  // Obtenim l'ID de la ruta
        return this.posts.find(p => p.id === postId);
      }
    },
    methods: {
    // Funció per fer scroll cap amunt 
    scrollToTop() {
      window.scrollTo({
        top: 0,          // posició superior de la pàgina
        behavior: "smooth" // Activa el desplaçament suau
      });
    },
    handleScroll(){ // Verificar si estamos al final de la página
              const scrollPosition = window.scrollY + window.innerHeight;
              const documentHeight = document.documentElement.scrollHeight;
          if (scrollPosition >= documentHeight-300) {
          this.showButton = true;
         // Mostrar el botón si estamos en el fondo
          } else {
            this.showButton = false; // Ocultar el botón si no estamos en el fondo
            };
      },
  },
  beforeDestroy() {
      // Limpiar el evento scroll cuando el componente se destruya
      window.removeEventListener("scroll", this.handleScroll);
      },
  };
  </script>
  