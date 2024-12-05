import { createRouter, createWebHistory } from 'vue-router';
import CarSearchAndList from '../components/HomePage/CarSearchAndList.vue';
import CarInfo from '../components/CarInfoPage/CarInfo.vue';
import RegistrationForm from '../components/LoginPage/RegistrationForm.vue';
import LoginForm from '../components/LoginPage/LoginForm.vue';
import UserAccount from '../components/UserPage/UserAccount.vue';
import AdminPage from '../components/AdminPage/AdminPage.vue';
import AdminLoginPage from '../components/AdminPage/AdminLoginPage.vue';
import AdminStatisticsPage from '../components/AdminPage/AdminStatisticsPage.vue';
import AdminCarsPage from '../components/AdminPage/AdminCarsPage.vue';
import AdminUsersPage from '../components/AdminPage/AdminUsersPage.vue';
import { jwtDecode } from "jwt-decode";
import api from '@/api/api';

async function validateToken(next, redirectPath = '/login') {
    const token = localStorage.getItem('token');
    if (!token) {
        next(redirectPath);
        return false;
    }

    try {
        const response = await api.post('/valid-token', { token });
        if (!response.data.isValid) {
            localStorage.removeItem('token');
            next(redirectPath);
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        next(redirectPath);
        return false;
    }
}

async function validateAdmin(next) {
    const token = localStorage.getItem('token');
    if (!token) {
        next('/loginAdmin');
        return false;
    }

    try {
        const response = await api.post('/valid-token', { token });
        if (response.data.isValid) {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.roles;
            if (userRole && userRole.includes('ROLE_ADMIN')) {
                return true;
            }
        }
        next('/loginAdmin');
        return false;
    } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        next('/loginAdmin');
        return false;
    }
}

const routes = [
    { path: '/', component: CarSearchAndList },
    { 
        path: '/car-info/:carId', 
        component: CarInfo, 
        beforeEnter: async (to, from, next) => { if (await validateToken(next)) next(); } 
    },
    { path: '/login', component: LoginForm },
    { path: '/registration', component: RegistrationForm },
    { 
        path: '/account', 
        component: UserAccount, 
        beforeEnter: async (to, from, next) => { if (await validateToken(next)) next(); } 
    },
    { path: '/loginAdmin', component: AdminLoginPage },
    { 
        path: '/admin', 
        component: AdminPage, 
        beforeEnter: async (to, from, next) => { if (await validateAdmin(next)) next(); } 
    },
    { 
        path: '/adminStatistics', 
        component: AdminStatisticsPage, 
        beforeEnter: async (to, from, next) => { if (await validateAdmin(next)) next(); } 
    },
    { 
        path: '/adminCars', 
        component: AdminCarsPage, 
        beforeEnter: async (to, from, next) => { if (await validateAdmin(next)) next(); } 
    },
    { 
        path: '/adminUsers', 
        component: AdminUsersPage, 
        beforeEnter: async (to, from, next) => { if (await validateAdmin(next)) next(); } 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
