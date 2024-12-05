<template>
    <main>
        <div class="container-info">
            <div class="container-text">
                <span>Список орендованих машин</span>
            </div>
            <div class="car-list">
                <div v-for="car in cars" :key="car.carId" class="car-card">
                    <div>
                        <h3>{{ car.brand }} {{ car.model }}</h3>
                        <p><strong>ID:</strong> {{ car.carId }}</p>
                        <p><strong>Тип кузова:</strong> {{ car.bodyType }}</p>
                        <p><strong>Об'єм двигуна:</strong> {{ car.engineCapacity }}</p>
                        <p><strong>Тип пального:</strong> {{ car.fuelType }}</p>
                        <p><strong>Рік:</strong> {{ car.year }}</p>
                    </div>
                    <div>
                        <h3>Оренда</h3>
                        <p><strong>ID:</strong> {{ car.order.orderId }}</p>
                        <p><strong>Початок оренди:</strong> {{ car.order.startDate }}</p>
                        <p><strong>Кінець оренди:</strong> {{ car.order.endDate }}</p>
                        <p><strong>Хто орендував:</strong> Id:{{ car.order.userId }}</p>
                        <p><strong>Логін: </strong> {{ car.order.userName }}</p>
                        <p><strong>Ім'я: </strong> {{ car.order.firstName }}</p>
                        <p><strong>Фамілія: </strong> {{ car.order.lastName }}</p>
                    </div>
                    <div>
                        <h3>Оплата</h3>
                        <p><strong>ID:</strong> {{ car.order.payment.paymentId }}</p>
                        <p><strong>Тип платежу:</strong> {{ car.order.payment.type }}</p>
                        <p><strong>Сума:</strong> {{ car.order.payment.amount }}</p>
                        <p><strong>Час оплати:</strong> {{ formatDate(car.order.payment.dateTime) }}</p>
                        <p><strong>Статус: </strong> {{ car.order.payment.status }}</p>
                    </div>
                    <div class="admin-button">
                        <h3>Виконати дії</h3>
                        <button @click="changeAvailability(car.carId)">Змінити наявність</button>
                        <button @click="cancelRent(car.order.orderId)">Скасувати оренду</button> 
                        <button @click="deleterent(car.order.orderId)">Видалити оренду</button>  
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
            cars: [],
        };
    },
    mounted() {
        this.getCars(); 
    },
    methods: {
        async getCars() {
            try {
                const response = await api.get('/list-noavail-cars');
                if (response.data) {
                    this.cars = response.data;
                    console.log(this.cars);
                     
                } else {
                    alert('Не вдалося отримати список авто!');
                }
            } catch (error) {
                console.error('Error fetching cars:', error);
                alert('Сталася помилка при отриманні списку авто!');
            }
        },
        formatDate(dateTime) {
            return dayjs(dateTime).format('DD MMMM YYYY, HH:mm');
        },
        async changeAvailability (carId){
            try {
                const response = await api.put('/admin/car/changeAvailability/' + carId);
                if (response.data) {
                    alert('Операція успішно виконана!');
                    this.getCars(); 
                }
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async cancelRent (orderId){
            try {
                const response = await api.post('/admin/cancelRent/' + orderId);
                if (response.data) {
                    alert('Операція успішно виконана!');
                    this.getCars(); 
                }
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async deleterent (orderId){
            try {
                const response = await api.delete('/admin/deleteRent/' + orderId);
                if (response.data) {
                    alert('Операція успішно виконана!');
                    this.getCars(); 
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

.car-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.car-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.car-card h3 {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.car-card p {
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
</style>
