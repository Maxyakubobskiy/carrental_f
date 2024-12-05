<template>
    <main>
        <div class="container-form">
            <form @submit.prevent="submitForm">
                <span>Увійдіть в обліковий запис адміністратора</span><br><br>

                <label for="username">Логін:</label><br>
                <input type="text" id="username" v-model="username" required/><br><br>

                <label for="password">Пароль:</label><br>
                <input type="password" id="password" v-model="password" required /><br><br>

                <div v-if="errorMessage">
                    <p style="color: red; margin-top: 0;">Невірний логін або пароль. Будь ласка, спробуйте ще раз.</p>
                </div>

                <div class="container-button">
                    <button type="submit">
                        Увійти
                        <img :src="signInIcon" alt="" style="filter: invert(100%)">
                    </button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import signInIcon from '@/assets/images/sign-in.svg';
import api from '@/api/api';

export default {
    data() {
        return {
            signInIcon,
            username: '',
            password: '',
            errorMessage: false
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await api.post('/admin/login', {
                    username: this.username,
                    password: this.password
                });
                
                localStorage.setItem('token', response.data)
                this.$router.push('/admin');
            } catch (error) {
                this.errorMessage = true;
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

.container-button button {
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

.container-button img {
    margin-left: 10px;
}
</style>
