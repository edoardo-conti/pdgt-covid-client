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

// parseJwt parsing di token JWT
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

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
export function signin(data) {
  // POST /utenti/signin {username, password}
  return axios
    .post(`${BASE_URL}/utenti/signin`, {
      username: data.username,
      password: data.password,
    })
    .then((response) => {
      // parsing del token
      var jwtparsed = parseJwt(response.data.token);

      // imposto il token nel localStorage con durata di 15 minuti (verifica fatta anche lato server)
      localStorage.setItem("login-username", jwtparsed.username);
      localStorage.setItem("login-admin", jwtparsed.admin);
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

// signup registrare un utente tramite username, password e livello autorizzazione
export function signup(data) {
  // POST /utenti/signup {username, password}
  return axios
    .post(`${BASE_URL}/utenti/signup`, {
      username: data.username,
      password: data.password,
      is_admin: (data.is_admin === false) ? false : true 
    })
    .then((response) => {
      // todo
      return response.data;
    })
    .catch((err) => Promise.reject(err.response.data.message));
}

// isAuthenticated verifica se l'utente è loggato correttamente
export function isAuthenticated() {
  return (
    localStorage.getItem("x-access-token") &&
    localStorage.getItem("x-access-token-expiration") > Date.now()
  );
}
