import { defineStore } from "pinia";

export const useWorkoutStore = defineStore("workout", {
  state: () => ({
    selectedGoal: "back", // Part inicial del cos
    exercises: [], // Exercicis obtinguts
    loading: false, // Estat de càrrega
    apiKey: "58bde106c6msh6b61b4a292692b9p1e8b8cjsnde07741b8861", // Clau d'API
  }),

  actions: {
    async fetchExercises() {
      this.loading = true; // Comença la càrrega
      this.exercises = [];
      try {
        const response = await fetch(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${this.selectedGoal}`,
          {
            headers: {
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
              "X-RapidAPI-Key": this.apiKey,
            },
          }
        );

        if (!response.ok) throw new Error("Error en carregar els exercicis");

        const data = await response.json();
        this.exercises = data; // Assignar els exercicis obtinguts
      } catch (error) {
        console.error("Error en carregar exercicis:", error);
      } finally {
        this.loading = false; // Finalitza la càrrega
      }
    },
  },
});



// import { defineStore } from 'pinia'

// // You can name the return value of `defineStore()` anything you want,
// // but it's best to use the name of the store and surround it with `use`
// // and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// // the first argument is a unique id of the store across your application

// const useCounterStore = defineStore('counter', {
//     state: () => ({ 
//         count: 0, 
//         name: 'Eduardo',
//         title: "avui es 10" }),
//     getters: {
//       doubleCount: (state) => state.count * 2,
//       multiplyFour: (state) => {return state.count *4},
//     },
//     actions: {
//       increment() {
//         this.count++
//       },
//     },
//   })
//   export default useCounterStore