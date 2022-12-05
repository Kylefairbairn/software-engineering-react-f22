import axios from "axios";

//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com"

//const BASE_URL = "http://localhost:4000";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const findTuitsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuitByUser = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);


export const findAllTuits = () =>
  axios.get(TUITS_API)
    .then(response => response.data);

export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);

// export const findTuitByUser = (uid) =>
//   axios.get(`${USERS_API}/${uid}/tuits`)
//     .then(response => response.data);

// export const createTuitByUser = (uid, tuit) =>
//   axios.post(`${USERS_API}/${uid}/tuits`, tuit)
//     .then(response => response.data);

export const updateTuit = (tid, tuit) =>
  axios.post(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = (tid) =>
{
    return axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);
}

const service = {
    findAllTuits,
    deleteTuit
}

export default service;