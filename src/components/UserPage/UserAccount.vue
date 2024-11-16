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
                            <td>{{ user.firstName }}</td>
                        </tr>
                        <tr>
                            <td>Прізвище:</td>
                            <td>{{ user.lastName }}</td>
                        </tr>
                        <tr>
                            <td>Логін:</td>
                            <td>{{ user.username }}</td>
                        </tr>
                        <tr>
                            <td>Електронна пошта:</td>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <td>Номер телефону:</td>
                            <td>{{ user.phoneNumber }}</td>
                        </tr>
                        <tr>
                            <td>Дата народження:</td>
                            <td>{{ user.dateOfBirth }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="button-block">
                    <button type="button" id="update-button" @click="showUpdateModal = true">
                        <span>Редагувати</span>
                        <img :src="editIcon" alt="" style="filter: invert(100%)">
                    </button>
                    <button type="button" id="logout-button" @click="logout">
                        <span>Вийти</span>
                        <img :src="singOutIcon" alt="" style="filter: invert(100%)">
                    </button>
                    <button type="button" id="delete-button" @click="deleteUser">
                        <span>Видалити</span>
                        <img :src="binIcon" alt="" style="filter: invert(100%)">
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showUpdateModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showUpdateModal = false">&times;</span>
                <div class="container-form">
                    <div v-if="validationError">
                        <p style="color: red;">Виникли помилки під час введення даних. Будь ласка, перевірте поля та спробуйте знову.</p>
                    </div>

                    <form @submit.prevent="updateUser" >
                        <span>Введіть нові дані для облікового запису</span><br><br>

                        <label for="username">Логін:</label>
                        <input type="text" id="username" v-model="updatedUser.username" required minlength="3"/>
                        <br><br>

                        <label for="email">Електронна пошта:</label>
                        <input type="email" id="email" v-model="updatedUser.email" required/>
                        <br><br>

                        <label for="phoneNumber">Номер телефону:</label>
                        <input type="text" id="phoneNumber" v-model="updatedUser.phoneNumber" required minlength="13"/>
                        <br><br>

                        <label for="dateOfBirth">Дата народження:</label>
                        <input type="date" id="dateOfBirth" v-model="updatedUser.dateOfBirth" required/>
                        <br><br>

                        <label for="firstName">Ім'я:</label>
                        <input type="text" id="firstName" v-model="updatedUser.firstName" required minlength="2"/>
                        <br><br>

                        <label for="lastName">Прізвище:</label>
                        <input type="text" id="lastName" v-model="updatedUser.lastName" required minlength="2" />
                        <br><br>

                        <button type="submit" id="update-button-submit">
                            <span>Редагувати дані</span>
                            <img :src="editIcon" alt="" style="filter: invert(100%)">
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import userIcon from '@/assets/images/user-circle.svg';
import binIcon from '@/assets/images/bin-simple.svg';
import singOutIcon from '@/assets/images/sign-out.svg';
import editIcon from '@/assets/images/edit.svg';
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
        const updatedUser = ref({});
        const showUpdateModal = ref(false);
        const validationError = ref(false);
        const router = useRouter();

        const logout = () => {
            router.push('/login');
            localStorage.removeItem('token');
        };

        const deleteUser = () => {
            api.delete('/deleteUser')
                .then(() => {
                    router.push('/');
                    localStorage.removeItem('token');
                })
                .catch(error => console.error(error));
        };

        const updateUser = () => {
            validationError.value = false;
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(updatedUser.value.email)) {
                validationError.value = true;
            }

            const phonePattern = /^\+?\d{10,15}$/;
            if (!phonePattern.test(updatedUser.value.phoneNumber)) {
                validationError.value = true;
            }

            if (validationError.value) {
                return;
            }

            api.put('/updateUser', updatedUser.value)
                .then(() => {
                    showUpdateModal.value = false;
                    user.value = { ...updatedUser.value };
                })
                .catch(error => {
                    validationError.value = true;
                    console.error(error);
                });
        };

        onMounted(async() =>{
            try {
                const response = await api.get('/getUserInfo');
                user.value = response.data;
                updatedUser.value = {...user.value};
            } catch (error) {
                router.push('/login');
            }
        })

        return {
            userIcon,
            user,
            updatedUser,
            showUpdateModal,
            validationError,
            logout,
            deleteUser,
            updateUser,
            editIcon,
            singOutIcon,
            binIcon
        };
    }
};
</script>


<style scoped>
.container-info {
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-block-info {
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

#delete-button {
    background-color: crimson;
}

#update-button span,
#update-button-submit span,
#logout-button span,
#delete-button span {
    margin-right: 10px;
    font-weight: normal;
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    padding-top: 60px;
}

.modal-content {
    background-color: aliceblue;
    color: #282d3e;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 500px;
    border-radius: 20px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

#update-button-submit {
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

.container-form span {
    font-weight: bold;
    font-size: 22px;
    padding-left: 5px;

}

.container-form input {
    border: 2px solid #ccc;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 16px;
}
</style>
