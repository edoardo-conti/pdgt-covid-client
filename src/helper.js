import axios from 'axios';

const BASE_URL = 'https://pdgt-covid.herokuapp.com';

export function getRegularTips() {
	return axios.get(`${BASE_URL}/andamento/nazionale`)
		.then(response => response.data);
}

export function getUsers() {
	return axios.get(`${BASE_URL}/utenti`, {
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('x-access-token')
		},
		responseType: 'json'
	})
	.then(response => response.data.data)
	.catch(err => {
		console.log(err);
		Promise.reject('getUsers() error');
	});
}

export function getSpecialTips() {
	return axios.get(`${BASE_URL}/utenti`, {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('x-access-token')
			}
		})
		.then(response => response.data)
		.catch(err => Promise.reject('Request Not Authenticated!'));
}

export function login(data) {
	return axios.post(`${BASE_URL}/utenti/login`, {
			'username': data.username,
			'password': data.password
		})
		.then(response => {
            // imposto il token nel localStorage assieme alla durata di 15 minuti (verifica fatta anche lato server)
			localStorage.setItem('x-access-token', response.data.token);
			localStorage.setItem('x-access-token-expiration', Date.now() + 15 * 60 * 1000);
			return response.data
		})
		.catch(err => Promise.reject('Credenziali errate, per favore riprovare'));
}

export function isAuthenticated() {
	return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}