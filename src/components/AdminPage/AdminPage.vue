<template>
    <main>
        <div class="container-info">
            <div class="main-block-info">
                <div class="block-info">
                    <div class="text-head">
                        <img :src="userIcon" alt="" id="icon-user">
                        <span>Ваші облікові дані</span>
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <td>Ім'я:</td>
                            <td>{{ user.firstName || 'Не вказано'}}</td>
                        </tr>
                        <tr>
                            <td>Прізвище:</td>
                            <td>{{ user.lastName || 'Не вказано'}}</td>
                        </tr>
                        <tr>
                            <td>Логін:</td>
                            <td>{{ user.username || 'Не вказано'}}</td>
                        </tr>
                        <tr>
                            <td>Електронна пошта:</td>
                            <td>{{ user.email || 'Не вказано'}}</td>
                        </tr>
                        <tr>
                            <td>Номер телефону:</td>
                            <td>{{ user.phoneNumber || 'Не вказано'}}</td>
                        </tr>
                        <tr>
                            <td>Дата народження:</td>
                            <td>{{ user.dateOfBirth || 'Не вказано'}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="button-block">
                    <button type="button" id="logout-button" @click="logout">
                        <span>Вийти</span>
                        <img :src="singOutIcon" alt="" style="filter: invert(100%)">
                    </button>
                </div>
            </div>
        </div>
        <div class="container-actions">
            <div class="main-block-actions">
                <h2>Дії адміністратора</h2>
                <div class="actions-buttons">
                    <button @click="navigateTo('/adminStatistics')">
                        <span>Переглянути статистику</span>
                    </button>
                    <button @click="navigateTo('/adminCars')">
                        <span>Переглянути орендовані авто</span>
                    </button>
                    <button @click="navigateTo('/adminUsers')">
                        <span>Переглянути список користувачів</span>
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import userIcon from '@/assets/images/user-circle.svg';
import singOutIcon from '@/assets/images/sign-out.svg';
import { ref, onMounted} from 'vue';
import api from '@/api/api';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const user = ref({
            username: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            firstName: '',
            lastName: ''
        });
        const router = useRouter();

        const logout = () => {
            localStorage.removeItem('token');
            router.push('/');
        };
        const navigateTo = (path) =>{
            router.push(path);
        }
        onMounted(async() =>{
            try {
                const response = await api.get('/admin/getAdminInfo');
                user.value = response.data;
            } catch (error) {
                router.push('/');
            }
        })

        return {
            userIcon,
            user,
            logout,
            singOutIcon,
            navigateTo,
        };
    }
};
</script>


<style scoped>
main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
}
.container-info,
.container-actions {
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-block-info,
.main-block-actions {
    width: 500px;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    padding: 20px;
}

.text-head {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.text-head img {
    width: 50px;
    margin-right: 10px;
}

.block-info table {
    border-collapse: collapse;
    width: 100%;
}

.block-info table td {
    padding: 10px 5px;
    border-bottom: 1px solid #cccccc;
}

.block-info {
    margin-bottom: 10px;
}

.button-block {
    display: flex;
    justify-content: space-between;
}
.actions-buttons button{
    margin-top: 10px;
}
.actions-buttons button,
.button-block button {
    background-color: #282d3e;
    border-radius: 30px;
    padding: 10px 20px;
    cursor: pointer;
    color: aliceblue;
    font-size: 16px;
    display: flex;
    align-items: center;
    border: none;
}

#logout-button span{
    margin-right: 10px;
    font-weight: normal;
}
</style>
