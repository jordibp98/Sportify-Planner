<template>
  <div class="p-4">
    <!-- Títol de la pàgina -->
    <h1 class="text-2xl font-bold mb-4">Manage Competitions</h1>

    <!-- Formulari per afegir/editar curses -->
    <form @submit.prevent="editingIndex === null ? addCompetition() : saveCompetition()" class="mb-6">
      <!-- Input per a la distància -->
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

      <!-- Input per a l'augment de desnivell -->
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

      <!-- Select per al tipus de competició -->
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

      <!-- Input per l'URL de la competició (opcional) -->
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

      <!-- Input per a les notes addicionals -->
      <div class="mb-4">
        <label for="notes" class="block font-medium mb-2">Notes:</label>
        <textarea
          id="notes"
          v-model="competition.notes"
          class="border p-2 w-full"
          placeholder="Additional notes about the competition"
        ></textarea>
      </div>

      <!-- Botó per afegir o desar la competició -->
      <button type="submit" class="btn">
        {{ editingIndex === null ? "Add Competition" : "Save Changes" }}
      </button>
    </form>

    <!-- Llista de competicions -->
    <h2 class="text-xl font-semibold mb-4">Competitions</h2>
    <ul>
      <li v-for="(comp, index) in competitions" :key="comp.id" class="mb-4">
        <div class="border p-4">
          <p><strong>Distance:</strong> {{ comp.distance }} km</p>
          <p><strong>Elevation:</strong> {{ comp.elevation }} m</p>
          <p><strong>Type:</strong> {{ comp.terrain }}</p>
          <p><strong>Notes:</strong> {{ comp.notes }}</p>
          <p v-if="comp.url"><strong>URL:</strong> <a :href="comp.url" target="_blank">{{ comp.url }}</a></p>
          <!-- Botons per editar o eliminar -->
          <div class="flex gap-2 mt-2">
            <button @click="editCompetition(index)" class="btn">Edit</button>
            <button @click="deleteCompetition(comp.id)" class="btn bg-red-500 hover:bg-red-600">Delete</button>
          </div>
        </div>
      </li>
    </ul>

        <!-- Botó per anar amunt v-show="window.scrollY > 100"  -->
        <button 
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-16 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 scroll-button">
      ↑
    </button>
  </div>
</template>


<script>
import { handleError } from "vue";
import { getCompetitions, addCompetition, updateCompetition, deleteCompetition } from "../firebase";

export default {
  data() {
    return {
      // Object que emmagatzema la competició actual
      competition: {
        distance: null,  // Distància en km
        elevation: null, // Desnivell acumulat en metres
        terrain: "road", // Tipus de cursa (per defecte "road")
        notes: "",       // Notes addicionals
        url: "",         // URL de la competició (opcional)
      },
      competitions: [], // Array per emmagatzemar totes les competicions recuperades
      editingIndex: null, // Índex per saber quina competició estem editant
      showButton: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    // Funció per recuperar totes les competicions des de Firebase
    async fetchCompetitions() {
      const competitionsData = await getCompetitions(); // Obtenim les competicions de Firebase
      this.competitions = Object.keys(competitionsData).map(key => ({
        id: key,               // Afegim l'ID de la competició
        ...competitionsData[key], // Afegim la resta de les dades de la competició
      }));
    },
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
     

    // Funció per afegir una nova competició a Firebase
    async addCompetition() {
      await addCompetition(this.competition);  // Afegim la competició a Firebase
      this.fetchCompetitions();                // Actualitzem la llista de competicions
      this.resetForm();                        // Restablim el formulari
    },

    // Funció per desar els canvis quan editem una competició existent
    async saveCompetition() {
      const competitionId = this.competitions[this.editingIndex].id; // Obtenim l'ID de la competició a editar
      await updateCompetition(competitionId, this.competition); // Actualitzem la competició a Firebase
      this.fetchCompetitions(); // Actualitzem la llista de competicions
      this.resetForm();         // Restablim el formulari
    },

    // Funció per editar una competició existent
    editCompetition(index) {
      this.competition = { ...this.competitions[index] }; // Copiamos la competició per poder editar-la
      this.editingIndex = index; // Guardem l'índex de la competició que estem editant
    },

    // Funció per eliminar una competició
    async deleteCompetition(id) {
      await deleteCompetition(id); // Eliminem la competició de Firebase
      this.fetchCompetitions();     // Actualitzem la llista de competicions
    },

    // Funció per restablir el formulari a l'estat inicial
    resetForm() {
      this.competition = { distance: null, elevation: null, terrain: "road", notes: "", url: "" }; // Restableix el formulari
      this.editingIndex = null; // Restableix l'índex d'edició
    },
  },
  beforeDestroy() {
      // Limpiar el evento scroll cuando el componente se destruya
      window.removeEventListener("scroll", this.handleScroll);
      },
  created() {
    // Quan el component es carrega, recuperem les competicions de Firebase
    this.fetchCompetitions();
  },
};
</script>


<style scoped>
 
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
.bg-red-500 {
  background-color: #ef4444;
}
.bg-red-500:hover {
  background-color: #dc2626;
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