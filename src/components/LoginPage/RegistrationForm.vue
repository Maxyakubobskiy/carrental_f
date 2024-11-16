<template>
    <main>
        <div class="container-form">
        <form @submit.prevent="submitForm" >
            <span>Зареєструйте новий обліковий запис</span><br><br>

            <label for="username">Логін:</label>
            <input type="text" id="username" v-model="user.username" required minlength="3"/>
            <small class="text-danger" v-if="errors.username">{{ errors.username }}</small>
            <br><br>

            <label for="email">Електронна пошта:</label>
            <input type="email" id="email" v-model="user.email" required />
            <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
            <br><br>

            <label for="password">Пароль:</label>
            <input type="password" id="password" v-model="user.password" required minlength="6">
            <!-- <small class="text-danger" v-if="errors.password">{{ errors.password }}</small> -->
            <br><br>

            <label for="phoneNumber">Номер телефону:</label>
            <input type="text" id="phoneNumber" v-model="user.phoneNumber" required minlength="13" />
            <small class="text-danger" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</small>
            <br><br>

            <label for="dateOfBirth">Дата народження:</label>
            <input type="date" id="dateOfBirth" v-model="user.dateOfBirth" required />
            <small class="text-danger" v-if="errors.dateOfBirth">{{ errors.dateOfBirth }}</small>
            <br><br>

            <label for="firstName">Ім'я:</label>
            <input type="text" id="firstName" v-model="user.firstName" required minlength="2"/>
            <br><br>

            <label for="lastName">Прізвище:</label>
            <input type="text" id="lastName" v-model="user.lastName" required minlength="2"/>
            <br><br>

            <button type="submit">
                Зареєструвати
                <img :src="userAddIcon" alt="" style="filter: invert(100%)">
            </button>
        </form>
    </div>
    </main>
</template>

<script>
import userAddIcon from '@/assets/images/user-add.svg';
import api from '@/api/api';

export default {
    data() {
        return {
            userAddIcon,
            user: {
                username: '',
                email: '',
                password: '',
                phoneNumber: '+380',
                dateOfBirth: '',
                firstName: '',
                lastName: ''
            },
            errors: {}
        };
    },
    methods: {
        clearErrors() {
            this.errors = {};
        },
        validateDateOfBirth() {
            const birthDate = new Date(this.user.dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                this.errors.dateOfBirth = '  Вам повинно бути принаймні 18 років';
                return false;
            }

            delete this.errors.dateOfBirth;
            return true;
        },
        validateForm() {
            this.clearErrors();
            let valid = true;

            const phoneRegex = /^\+?[0-9]{10,12}$/;
            if (!phoneRegex.test(this.user.phoneNumber)) {
                this.errors.phoneNumber = 'Невірний формат номера телефону';
                valid = false;
            }

            if (!this.validateDateOfBirth()) {
                valid = false;
            }

            return valid;
        },
        async submitForm() {
            if (!this.validateForm()) {
                return;
            }

            try {
                await api.post('/auth/registration', this.user);
                this.$router.push('/login');
            } catch (error) {
                if (error.response && error.response.data) {                
                    if (error.response.data.email){ 
                        this.errors.email = error.response.data.email;
                    }
                    if(error.response.data.username){
                        this.errors.username = error.response.data.username;
                    }
                } else {
                    alert('Сталася помилка при реєстрації!');
                    console.error('Error during registration:', error);
                }
            }
        }
    }
};
</script>

<style scoped>
.container-form {
    margin: 5% auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container-form form {
    width: 500px;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    padding: 20px;
}

.container-form label {
    font-size: 18px;
    font-weight: bold;
    padding-left: 5px;
}

.container-form span {
    font-weight: bold;
    font-size: 22px;
    padding-left: 5px;

}

.container-form input {
    border: 2px solid #ccc;
    width: 90%;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 16px;
}

button {
    background-color: #282d3e;
    border-radius: 30px;
    padding: 10px 25px;
    cursor: pointer;
    color: aliceblue;
    font-size: 20px;
    display: flex;
    align-items: center;
    border: none;
}

.container-form button img {
    margin-left: 10px;
}

.text-danger {
    color: crimson;
}
</style>