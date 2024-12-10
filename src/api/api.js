import axios from 'axios';

const api = axios.create({
  baseURL: 'https://carrentalb-production.up.railway.app/api' // Ваш базовий URL бекенду
});

api.interceptors.request.use((confirg)=>{
  const token = localStorage.getItem('token');
  if(token){
      confirg.headers['Authorization'] = `Bearer ${token}`;
  }
  return confirg;
},(error) => {
  return Promise.reject(error);
});

export default api;
