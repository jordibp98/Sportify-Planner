// **firebase.js**

// Importa les funcions necessàries del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove } from "firebase/database";

// Configuració de l'aplicació Firebase (proporcionada a la consola de Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCnQCTxoK0YweiHwsl180ukR_uznj7qDKE",
  authDomain: "sportify-planner.firebaseapp.com",
  databaseURL: "https://sportify-planner-default-rtdb.firebaseio.com",
  projectId: "sportify-planner",
  storageBucket: "sportify-planner.firebasestorage.app",
  messagingSenderId: "1004262145074",
  appId: "1:1004262145074:web:0f0b946f710e002cf6502b",
};

// Inicialitza l'aplicació de Firebase
const app = initializeApp(firebaseConfig);

// Inicialitza la base de dades en temps real
const db = getDatabase(app);

// Funció per obtenir totes les competicions
export async function getCompetitions() {
  const dbRef = ref(db, "competitions");
  try {
    const snapshot = await get(dbRef); // Obtenim totes les competicions
    if (snapshot.exists()) {
      return snapshot.val(); // Retorna les competicions com objecte
    } else {
      return {}; // Si no existeixen competicions, retorna un objecte buit
    }
  } catch (error) {
    console.error("Error al obtenir les competicions:", error);
    return {};
  }
}

// Funció per afegir una competició
export async function addCompetition(competition) {
  const newCompetitionKey = Date.now().toString(); // Generem un ID únic
  const updates = {};
  updates[`competitions/${newCompetitionKey}`] = competition;
  try {
    await update(ref(db), updates); // Afegeix la competició a la base de dades
  } catch (error) {
    console.error("Error afegint la competició:", error);
  }
}

// Funció per editar una competició
export async function updateCompetition(id, competition) {
  const updates = {};
  updates[`competitions/${id}`] = competition;
  try {
    await update(ref(db), updates); // Actualitza la competició
  } catch (error) {
    console.error("Error actualitzant la competició:", error);
  }
}

// Funció per eliminar una competició
export async function deleteCompetition(id) {
  const dbRef = ref(db, `competitions/${id}`);
  try {
    await remove(dbRef); // Elimina la competició
  } catch (error) {
    console.error("Error eliminant la competició:", error);
  }
}
