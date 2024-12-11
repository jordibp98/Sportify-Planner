import { defineStore } from "pinia";

export const useWorkoutStore = defineStore("workout", {
  state: () => ({
    selectedGoal: "arms", // Objectiu inicial
    exercises: [], // Llista d'exercicis
    loading: false, // Estat de càrrega
    wgerApiKey: "4945a38e7729fac4284a62392dff196dba7db002", // Clau API de WGER
  }),
  actions: {
    async fetchExercises() {
      this.loading = true;
      this.exercises = [];
      try {
        // Petició API de WGER per trobar exercicis
        const response = await fetch(
          `https://wger.de/api/v2/exercise/?language=2&category=${this.getCategoryId(
            this.selectedGoal
          )}`,
          {
            headers: {
              "Authorization": `Bearer ${this.wgerApiKey}`,
            }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch exercises");

        const data = await response.json();

        // Afegir imatges per cada exercici
        const exercisesWithImages = await Promise.all(
          data.results.map(async (exercise) => {
            const image = await this.fetchExerciseImage(exercise.id);
            return {
              id: exercise.id,
              name: exercise.name,
              image, // Afegir imatge trobada
            };
          })
        );

        this.exercises = exercisesWithImages;
      } catch (error) {
        console.error("Error carregant exercicis:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchExerciseImage(exerciseId) {
      try {
        const response = await fetch(
          `https://wger.de/api/v2/exerciseimage/?exercise=${exerciseId}`,
          {
            headers: {
              "Authorization": `Bearer ${this.wgerApiKey}`, // Utilitzar la clau API de WGER
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch image from WGER");

        const data = await response.json();
        return data.results[0]?.image || null; // Retornar la imatge o null si no hi ha
      } catch (error) {
        console.error("Error carregant imatge des de WGER:", error);
        return null;
      }
    },

    // IDs de categories de l'API de WGER {"count":8,"next":null,"previous":null,"results":[{"id":10,"name":"Abs"},{"id":8,"name":"Arms"},{"id":12,"name":"Back"},{"id":14,"name":"Calves"},{"id":15,"name":"Cardio"},{"id":11,"name":"Chest"},{"id":9,"name":"Legs"},{"id":13,"name":"Shoulders"}]}
    getCategoryId(goal) {
      const categories = {
        arms: 8,       // Braços
        legs: 9,       // Cames
        core: 10,      // Core
        cardio: 15,    // Cardio
        abs: 10,       // Abdominals
        back: 12,      // Esquena
        chest: 11,     // Pit
        shoulders: 13, // Espatlles
      };
      return categories[goal] || 15; // Per defecte, cardio
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