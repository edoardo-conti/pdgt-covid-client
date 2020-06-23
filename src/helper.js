import axios from "axios";

// pdgt-covid API URL
const BASE_URL = "https://pdgt-covid.herokuapp.com/api";
export const api = axios.create({
  baseURL: `https://pdgt-covid.herokuapp.com/api`,
});

// validateDate controllo validità data (es. 2020-02-24)
export function validateDate(input) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;

  return input.match(regEx);
}

// getUsers ricavare tutti gli utenti registrati nel database
export function getUsers() {
  return axios
    .get(`${BASE_URL}/utenti`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("x-access-token"),
      },
      responseType: "json",
    })
    .then((response) => response.data.data)
    .catch((err) => {
      console.log(err);
      Promise.reject(
        "Errore nel richiedere informazioni al server, riprovare più tardi."
      );
    });
}

// login eseguire l'accesso ad un utente tramite username e password per ricevere token jwt
export function login(data) {
  // POST /utenti/login {username, password}
  return axios
    .post(`${BASE_URL}/utenti/signin`, {
      username: data.username,
      password: data.password,
    })
    .then((response) => {
      // imposto il token nel localStorage con durata di 15 minuti (verifica fatta anche lato server)
      localStorage.setItem("usr-login", data.username);
      localStorage.setItem("x-access-token", response.data.token);
      localStorage.setItem(
        "x-access-token-expiration",
        Date.now() + 15 * 60 * 1000
      );
      return response.data;
    })
    .catch((err) => Promise.reject(err.response.data.message));
  //.catch((err) => Promise.reject("Credenziali errate, per favore riprovare."));
}

// isAuthenticated verifica se l'utente è loggato correttamente
export function isAuthenticated() {
  return (
    localStorage.getItem("x-access-token") &&
    localStorage.getItem("x-access-token-expiration") > Date.now()
  );
}
