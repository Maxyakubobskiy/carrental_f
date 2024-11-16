import { createRouter, createWebHistory } from 'vue-router';
import CarSearchAndList from '../components/HomePage/CarSearchAndList.vue';
import CarInfo from '../components/CarInfoPage/CarInfo.vue';
import RegistrationForm from '../components/LoginPage/RegistrationForm.vue';
import LoginForm from '../components/LoginPage/LoginForm.vue';
import UserAccount from '../components/UserPage/UserAccount.vue';
import api from '@/api/api';

const routes = [
    {
        path: '/',
        component: CarSearchAndList,
    },
    {
        path: '/car-info/:carId',
        component: CarInfo,
        beforeEnter: async (to,from,next) => {
            const token = localStorage.getItem('token');
            if (!token) {
                next('/login');
                return;
            } 
            try {
                const response = await api.post('/valid-token',{token})
                if (response.data.isValid) {
                    console.log(response.data.isValid);
                    console.log(token);
                    
                    next();
                } else {
                    localStorage.removeItem('token');
                    next('/login');
                }
            } catch (error) {
                localStorage.removeItem('token');
                next('/login');
            }
        }
    },
    {
        path: '/login',
        component: LoginForm
    },
    {
        path: '/registration',
        component: RegistrationForm
    },
    {
        path: '/account',
        component: UserAccount,
        beforeEnter: async (to, from, next) => {
            const token = localStorage.getItem('token');
            if (!token) {
                next('/login');
                return;
            } try {
                const response = await api.post('/valid-token',{token})
                if (response.data.isValid) {
                    next();
                } else {
                    localStorage.removeItem('token');
                    next('/login');
                }
            } catch (error) {
                localStorage.removeItem('token');
                next('/login');
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;