<template>
    <main>
        <div class="container-info">
            <div class="container-text">
                <span>Список користувачів</span>
            </div>
            <div class="search-container">
                <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Пошук за лоіном, ім'ям, фамілією або ID"
            />
            </div>
            <div class="user-list">
                <div v-for="user in filteredUsers" :key="user.userId" class="user-card">
                    <div>
                        <h3>{{ user.username }}</h3>
                        <p><strong>ID:</strong> {{ user.userId || 'Не вказано'}}</p>
                        <p><strong>Ім'я:</strong> {{ user.firstName || 'Не вказано'}}</p>
                        <p><strong>Фамілія:</strong> {{ user.lastName || 'Не вказано'}}</p>
                    </div>
                    <div>
                        <p><strong>Пошта:</strong> {{ user.email || 'Не вказано'}}</p>
                        <p><strong>Рік народження:</strong> {{ formatDate(user.dateOfBirth) || 'Не вказано'}}</p>
                        <p><strong>Номер телефону:</strong> {{ user.phoneNumber || 'Не вказано'}}</p>
                        <p><strong>Статус:</strong> {{ user.locked ? "Заблокований" : "Розблокований" }} </p>
                    </div>
                    <div class="admin-button">
                        <h3>Виконати дії</h3>
                        <button v-if="!user.locked" @click="lockUser(user.userId)">Заблокувати користувача</button> 
                        <button v-if="user.locked" @click="unblockUser(user.userId)">Розблокувати користувача</button> 
                        <button @click="deleteUser(user.userId)">Видалити аккаунт користувача</button>  
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>
import api from '@/api/api';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            users: [],
            searchQuery: '',
        };
    },
    mounted() {
        this.getUsers(); 
    },
    computed: {
        filteredUsers() {
            const queryWords = this.searchQuery.toLowerCase().split(' ').filter(word => word.trim() !== '');
            return this.users.filter(user =>
            queryWords.every(word =>
            user.username.toLowerCase().includes(word) ||
                user.firstName.toLowerCase().includes(word) ||
                user.lastName.toLowerCase().includes(word) ||
                user.userId.toString().includes(word)
            ));
        },
    },
    methods: {
        async getUsers() {
            try {
                const response = await api.get('/getAllUsers');
                if (response.data) {
                    this.users = response.data;
                } else {
                    alert('Не вдалося отримати список користувачів!');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                alert('Сталася помилка при отриманні списку авто!');
            }
        },
        formatDate(dateTime) {
            return dayjs(dateTime).format('DD MMMM YYYY, HH:mm');
        },
        async lockUser (userId){
            try {
                const response = await api.post('/admin/lockUser/' + userId);
                if (response.data) {
                    alert('Операція успішно виконана!');
                    this.getUsers(); 
                }
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async unblockUser (userId){
            try {
                const response = await api.post('/admin/unblockUser/' + userId);
                if (response.data) {
                    alert('Операція успішно виконана!');
                    this.getUsers(); 
                }
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async deleteUser (userId){
            try {
                const response = await api.delete('/admin/deleteUser/' + userId);
                if (response.data) {
                    alert('Операція успішно виконана!');
                    this.getUsers(); 
                }
            } catch (error) {
                console.error('Error :', error);
            }
        }
    },
};

</script>
<style  scoped>
.container-info {
    margin: 30px 10%;
    padding: 20px;
}

.container-text {
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 20px;
}

.user-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.user-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.user-card h3 {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.user-card p {
    margin: 5px 0;
    font-size: 16px;
    color: #555;
}
.admin-button{
    display: flex;
    flex-direction: column;
}
.admin-button button{
    display: block;
    width: 100%;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #282d3e;
    color: aliceblue;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}
.search-container {
    margin-bottom: 20px;
}

.search-container input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
