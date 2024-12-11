<template>
  <div class="p-4">
    <!-- Títol -->
    <h1 class="text-2xl font-bold mb-4">Manage Competitions</h1>

    <!-- Formulari per afegir/editar curses -->
    <form @submit.prevent="editingIndex === null ? addCompetition() : saveCompetition()" class="mb-6">
      <div class="mb-4">
        <label for="distance" class="block font-medium mb-2">Distance (km):</label>
        <input
          id="distance"
          type="number"
          v-model="competition.distance"
          class="border p-2 w-full"
          placeholder="Enter distance"
          required
        />
      </div>

      <div class="mb-4">
        <label for="elevation" class="block font-medium mb-2">Elevation (m):</label>
        <input
          id="elevation"
          type="number"
          v-model="competition.elevation"
          class="border p-2 w-full"
          placeholder="Enter elevation gain"
          required
        />
      </div>

      <div class="mb-4">
        <label for="terrain" class="block font-medium mb-2">Type of Competition:</label>
        <select
          id="terrain"
          v-model="competition.terrain"
          class="border p-2 w-full"
        >
          <option value="road">Road</option>
          <option value="trail">Trail</option>
          <option value="ultratrail">Ultratrail</option>
          <option value="cross">Cross</option>
          <option value="triathlon">Triathlon</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="url" class="block font-medium mb-2">Competition URL (Optional):</label>
        <input
          id="url"
          type="url"
          v-model="competition.url"
          class="border p-2 w-full"
          placeholder="Enter competition URL"
        />
      </div>

      <div class="mb-4">
        <label for="notes" class="block font-medium mb-2">Notes:</label>
        <textarea
          id="notes"
          v-model="competition.notes"
          class="border p-2 w-full"
          placeholder="Additional notes about the competition"
        ></textarea>
      </div>

      <button type="submit" class="btn">
        {{ editingIndex === null ? "Add Competition" : "Save Changes" }}
      </button>
    </form>

    <!-- Llista de curses -->
    <h2 class="text-xl font-semibold mb-4">Competitions</h2>
    <ul>
      <li v-for="(comp, index) in competitions" :key="index" class="mb-4">
        <div class="border p-4">
          <p><strong>Distance:</strong> {{ comp.distance }} km</p>
          <p><strong>Elevation:</strong> {{ comp.elevation }} m</p>
          <p><strong>Type:</strong> {{ comp.terrain }}</p>
          <p><strong>Notes:</strong> {{ comp.notes }}</p>
          <p v-if="comp.url"><strong>URL:</strong> <a :href="comp.url" target="_blank">{{ comp.url }}</a></p>
          <div class="flex gap-2 mt-2">
            <button @click="editCompetition(index)" class="btn">Edit</button>
            <button @click="deleteCompetition(index)" class="btn bg-red-500 hover:bg-red-600">Delete</button>
          </div>

          <!-- Botó per suggerir exercicis -->
          <button 
            v-if="!comp.suggestionsShown"
            @click="suggestExercises(comp, index)" 
            class="btn bg-secondary mt-2"
          >
            Suggest Exercises
          </button>

          <!-- Botó per amagar els exercicis -->
          <button 
            v-if="comp.suggestionsShown"
            @click="hideExercises(comp, index)"
            class="btn bg-secondary mt-2"
          >
            Hide Exercises
          </button>

          <!-- Exercicis suggerits -->
          <ul v-if="comp.suggestions?.length && comp.suggestionsShown">
            <li v-for="(ex, idx) in comp.suggestions" :key="idx">
              {{ ex }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <!-- Botó per anar amunt -->
    <button 
      @click="scrollToTop"
      class="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700">
      ↑
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      competition: {
        distance: null,
        elevation: null,
        terrain: "road",
        notes: "",
        url: "", // Afegit per la URL
      },
      competitions: [],
      editingIndex: null, // Índex de l'element que s'està editant
    };
  },
  methods: {
    // Afegeix una nova competició
    addCompetition() {
      const newCompetition = { ...this.competition };
      newCompetition.suggestionsShown = false; // Inicia sense mostrar suggeriments
      this.competitions.push(newCompetition);
      this.resetForm();
    },

    // Desa els canvis d'una competició editada
    saveCompetition() {
      const updatedCompetition = { ...this.competition };
      updatedCompetition.suggestionsShown = false; // Inicia sense suggeriments
      this.competitions.splice(this.editingIndex, 1, updatedCompetition);
      this.resetForm();
    },

    // Genera suggeriments personalitzats d'exercicis
    suggestExercises(competition, index) {
      const suggestions = [];

      // Generar exercicis basats en la distància
      if (competition.distance <= 10) {
        suggestions.push("Sprints", "Intervals", "Core Strength");
      } else if (competition.distance <= 42) {
        suggestions.push("Long runs", "Tempo runs", "Strength training");
      } else {
        suggestions.push("Hill repeats", "Back-to-back long runs", "Recovery workouts");
      }

      // Afegir exercicis per altitud
      if (competition.elevation > 500) {
        suggestions.push("Step-ups", "Weighted squats", "Hiking");
      }

      // Afegir exercicis per tipus de terreny
      if (competition.terrain === "trail" || competition.terrain === "ultratrail") {
        suggestions.push("Trail running drills", "Ankle stability exercises");
      }

      if (competition.terrain === "triathlon") {
        suggestions.push("Swim intervals", "Bike hill climbs", "Brick workouts");
      }

      competition.suggestions = suggestions;
      competition.suggestionsShown = true; // Marca que els suggeriments s'han mostrat
      this.$set(this.competitions, index, competition); // Actualitza la competició amb els suggeriments
    },

    // Amaga els exercicis suggerits
    hideExercises(competition, index) {
      competition.suggestionsShown = false;
      this.$set(this.competitions, index, competition); // Actualitza l'estat per amagar-los
    },

    // Edita una competició existent
    editCompetition(index) {
      this.competition = { ...this.competitions[index] };
      this.editingIndex = index;
    },

    // Elimina una competició
    deleteCompetition(index) {
      this.competitions.splice(index, 1);
    },

    // Restableix el formulari
    resetForm() {
      this.competition = { distance: null, elevation: null, terrain: "road", notes: "", url: "" };
      this.editingIndex = null;
    },
  },
};
</script>

<style scoped>
/* Estils per a Manage Competitions */
.btn {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #2563eb;
}

.btn.bg-red-500 {
  background-color: #ef4444;
}

.btn.bg-red-500:hover {
  background-color: #dc2626;
}

.bg-secondary {
  background-color: #4caf50; /* Verd */
  color: white;
}
</style>



<!-- <template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Manage Competitions</h1>
      
      Formulari per afegir competicions
      <form @submit.prevent="addCompetition" class="mb-6">
        <div class="mb-4">
          <label for="distance" class="block font-medium mb-1">Distance (km):</label>
          <input
            type="number"
            id="distance"
            v-model="newCompetition.distance"
            class="border p-2 w-full"
            placeholder="Enter distance in km"
          />
        </div>
  
        <div class="mb-4">
          <label for="elevation" class="block font-medium mb-1">Elevation Gain (m):</label>
          <input
            type="number"
            id="elevation"
            v-model="newCompetition.elevation"
            class="border p-2 w-full"
            placeholder="Enter elevation gain"
          />
        </div>
  
        <div class="mb-4">
          <label for="date" class="block font-medium mb-1">Date:</label>
          <input
            type="date"
            id="date"
            v-model="newCompetition.date"
            class="border p-2 w-full"
          />
        </div>
  
        <button type="submit" class="btn bg-primary">Add Competition</button>
      </form>
  
      Llista de competicions
      <div>
        <h2 class="text-xl font-semibold mb-2">Upcoming Competitions:</h2>
        <ul>
          <li
            v-for="(competition, index) in competitions"
            :key="index"
            class="p-4 bg-secondary mb-2 rounded"
          >
            <strong>{{ competition.date }}</strong>: 
            {{ competition.distance }} km, {{ competition.elevation }} m elevation gain
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newCompetition: {
          distance: null,
          elevation: null,
          date: null,
        },
        competitions: [],
      };
    },
    methods: {
      addCompetition() {
        // Afegeix la competició a la llista
        if (
          this.newCompetition.distance &&
          this.newCompetition.elevation &&
          this.newCompetition.date
        ) {
          this.competitions.push({ ...this.newCompetition });
          this.newCompetition = { distance: null, elevation: null, date: null }; // Reinicia el formulari
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estils locals */
  </style>
   -->