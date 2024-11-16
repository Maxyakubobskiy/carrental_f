<template>
    <main>
        <div class="info-container">
            <div class="header-text">
                <span>Прокат {{car.brand }} {{ car.model }}</span>
            </div>
            <div class="section-car-info">
                <div class="main-info">
                    <div class="car-gallery">
                        <Swiper 
                            ref="swiperRef"
                            :navigation="false" 
                            :pagination="{ clickable: true }" 
                            class="swiper-container"
                            @swiper="onSwiper"
                        >
                            <SwiperSlide v-for="photo in car.photos" :key="photo.id">
                                <img :src="getCarImageUrl(photo.url)" alt="Photo car" />
                            </SwiperSlide>
                        </Swiper>
                        <button id="prevButton" type="button" @click="slidePrev">
                            <img :src="arrowLeftIcon" alt="" style="filter: invert(100%)" />
                        </button>
                        <button id="nextButton" type="button" @click="slideNext">
                            <img :src="arrowRightIcon" alt="" style="filter: invert(100%)" />
                        </button>
                    </div>

                    <div class="car-full-info">
                    <div class="full-info-text">
                        <span>Повна інформація про авто</span>
                    </div>
                    <div class="full-info-table">
                        <div class="full-info-table-left">
                        <table>
                            <tbody>
                            <tr>
                                <td>Клас авто :</td>
                                <td>{{ car.carClass }}</td>
                            </tr>
                            <tr>
                                <td>Марка:</td>
                                <td>{{ car.brand }}</td>
                            </tr>
                            <tr>
                                <td>Модель:</td>
                                <td>{{ car.model }}</td>
                            </tr>
                            <tr>
                                <td>Рік випуску:</td>
                                <td>{{ car.year }}</td>
                            </tr>
                            <tr>
                                <td>Колір:</td>
                                <td>{{ car.color }}</td>
                            </tr>
                            <tr>
                                <td>Тип кузова:</td>
                                <td>{{ car.bodyType }}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div class="full-info-table-right">
                        <table>
                            <tbody>
                            <tr>
                                <td>Тип трансмісії:</td>
                                <td>{{ car.transmissionType }}</td>
                            </tr>
                            <tr>
                                <td>Тип палива:</td>
                                <td>{{ car.fuelType }}</td>
                            </tr>
                            <tr>
                                <td>Об'єм двигуна:</td>
                                <td>{{ car.engineCapacity }}</td>
                            </tr>
                            <tr>
                                <td>Потужність (к.с.):</td>
                                <td>{{ car.horsePower }}</td>
                            </tr>
                            <tr>
                                <td>Наявність:</td>
                                <td>{{ car.available ? 'Наявний' : 'Не наявний' }}</td>
                            </tr>
                            <tr>
                                <td>Ціна:</td>
                                <td id="carPrice">{{ car.price }}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                    
                    <div class="car-reviews-container">
                    <div class="car-reviews-container-text">
                        <span>Відгуки клієнтів</span>
                    </div>
                    <button type="button" @click="openReviewModal" id="reviews-add-button">
                        <img :src="messageIcon" alt="" style="filter: invert(100%)" />
                        <span>Додати відгук</span>
                    </button>
                    <div class="car-review" v-for="review in reviews" :key="review.reviewId">
                        <div class="review-user">
                            <img :src="getRatingIcon(review.rating)" :alt="getRatingAlt(review.rating)" />
                        <span>{{ review.username }}</span>
                        <div v-if="review.userId == currentUserId" class="button-delete-review" >
                            <button @click="deleteReview(review.reviewId)" id="delete-button-review">Видалити</button>
                        </div>
                        </div>
                        <div class="review-rating">
                        <span>{{ review.rating }} / 5</span>
                        <img :src="starIcon" alt="" />
                        </div>
                        <div class="review-comment">
                        <p>{{ review.comment }}</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div v-if="car.available" class="aside-info">
                    <div class="aside-info-block">
                    <div class="aside-info-text">
                        <span>Орендувати</span>
                    </div>
                    <div class="date-selection">
                        <form id="rentForm" @submit.prevent="openPaymentModal">
                            <label for="dateRentFrom">Дата початку оренди:</label>
                            <input type="date" id="dateRentFrom" v-model="rent.dateFrom" @change="updateRentInfo" />

                            <label for="dateRentTo" id="dateRentToLabel" v-if="rent.dateFrom">Дата завершення оренди:</label>
                            <input type="date" id="dateRentTo" v-model="rent.dateTo" v-if="rent.dateFrom" @change="updateRentInfo" />
                            
                            <div id="rentInfo"></div>
                            <button type="submit" v-if="IsValidDate" id="button-submit-rent">Орендувати</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>

                <ReviewModal :isVisible="showReviewModal"
                :carId = "car.carId"
                @close="closeReviewModal" 
                @reviewAdded="fetchReviews"/>

                <PaymentModal :isVisible="showPaymentModal" 
                @close="closePaymentModal" 
                @confirmPayment="submitRentForm"
            />
        </div>
    </main>
</template>

<script>
import arrowLeftIcon from '@/assets/images/arrow-left.svg';
import arrowRightIcon from '@/assets/images/arrow-right.svg';
import messageIcon from '@/assets/images/message-circle.svg';
import moodSadIcon from '@/assets/images/mood-sad.svg';
import moodNeutralIcon from '@/assets/images/mood-neutral.svg';
import mooodHappyIcon from '@/assets/images/mood-happy.svg';
import starIcon from '@/assets/images/star.svg';

import api from '@/api/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import ReviewModal from '@/components/CarInfoPage/ReviewModal.vue';
import PaymentModal from '@/components/CarInfoPage/PaymentModal.vue';

export default {
    components: {
        Swiper,
        SwiperSlide,
        ReviewModal,
        PaymentModal
    },
    setup() {
        const car = ref({});
        const route = useRoute();
        const reviews = ref([]);
        const swiperRef = ref(null);
        const rent = ref({ dateFrom: '', dateTo: '' });
        const showReviewModal = ref(false);
        const showPaymentModal = ref(false);
        const IsValidDate = ref(false);
        const currentUserId = ref(null);

        onMounted(async () => {
            const carId = route.params.carId;
            try {
                const responseCar = await api.get('/car/' + carId);
                car.value = responseCar.data;
                reviews.value = car.value.reviews;

                const responseUserId = await api.get('/user-id')
                currentUserId.value = responseUserId.data;
            } catch (error) {
                alert('Сталася помилка під час спроби отримати дані авто')
                console.error('Error fetching car info:', error);
            }
        });

        const deleteReview = async (reviewId) => {
            try {
                const response = await api.delete(`/deleteReview/${reviewId}`);
                if (response.status === 200) {
                    reviews.value = reviews.value.filter(review => review.reviewId !== reviewId);
                } else {
                    alert('Сталася помилка під час видалення відгуку');
                }
            } catch (error) {
                console.error('Error deleting review:', error);
                alert('Не вдалося видалити відгук. Спробуйте ще раз');
            }
        };

        const fetchReviews = async () => {
            const carId = route.params.carId;
            try {
                const response = await api.get(`/new-reviews/` + carId);
                reviews.value = response.data;
            } catch (error) {
                alert('Сталася помилка під час оновлення відгуків');
                console.error('Error fetching reviews:', error);
            }
        };

        const onSwiper = (swiper) => {
            swiperRef.value = swiper;
        };

        const slidePrev = () => {
            if (swiperRef.value) {
                swiperRef.value.slidePrev();
            }
        };

        const slideNext = () => {
            if (swiperRef.value) {
                swiperRef.value.slideNext();
            }
        };

        const openReviewModal = () => {
            showReviewModal.value = true;
        };
        const closeReviewModal = () => {
            showReviewModal.value = false;
        };

        const openPaymentModal = () => {
            showPaymentModal.value = true;
        };
        const closePaymentModal = () => {
            showPaymentModal.value = false;
        };
        const getRatingIcon = (rating) => {
            if (rating >= 1 && rating <= 2) return moodSadIcon;
            if (rating >= 3 && rating <= 4) return moodNeutralIcon;
            if (rating === 5) return mooodHappyIcon;
        };
        const getRatingAlt = (rating) => {
            if (rating >= 1 && rating <= 2) return 'Low Rating';
            if (rating >= 3 && rating <= 4) return 'Medium Rating';
            if (rating === 5) return 'High Rating';
        };
        const getCarImageUrl = (photoUrl) =>{
            return require('@/assets/images/car/' + photoUrl);
        };
        const updateRentInfo = () => {
            const fromDate = new Date(rent.value.dateFrom);
            const toDate = new Date(rent.value.dateTo);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const carPriceElement = document.getElementById('carPrice');
            const carPrice = parseFloat(carPriceElement.textContent); 
            const rentInfo = document.getElementById('rentInfo');

            if (rent.value.dateTo !== '') {
                if (fromDate <= toDate && fromDate >= currentDate) {
                    const diffTime = Math.abs(toDate - fromDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    const totalPrice = diffDays * carPrice;

                    let daysText;
                    if (diffDays % 10 === 1 && diffDays !== 11) {
                        daysText = 'день';
                    } else if (diffDays % 10 >= 2 && diffDays % 10 <= 4 && (diffDays < 10 || diffDays > 20)) {
                        daysText = 'дні';
                    } else {
                        daysText = 'днів';
                    }

                    rentInfo.textContent = `Оренда на ${diffDays} ${daysText} коштує ${totalPrice} грн`;
                    IsValidDate.value = true;
                } else {
                    rentInfo.textContent = 'Виберіть коректні дати!';
                    IsValidDate.value = false;
                }
            } else {
                rentInfo.textContent = '';
                IsValidDate.value = false;
            }
        };

        
        const submitRentForm = async (paymentData) => {
            if (!IsValidDate.value) return;

            const rentData = {
                carId: car.value.carId,
                rentFrom: rent.value.dateFrom,
                rentTo: rent.value.dateTo,
                rentAmount: calculateTotalPrice(),
                paymentData: paymentData
            };

            try {
                const response = await api.post('/rent', rentData); 
                if (response.status === 200) {
                    alert('Оренда успішно оформлена!');

                    await fetchUpdatedCarInfo();
                    closePaymentModal();
                } else {
                    alert('Сталася помилка під час оформлення оренди!');
                }
            } catch (error) {
                console.error('Error submitting rent form:', error);
                alert('Не вдалося оформити оренду. Спробуйте ще раз.');
            }
        };

        
        const fetchUpdatedCarInfo = async () => {
            const carId = route.params.carId;
            try {
                const response = await api.get('/car/' + carId);
                car.value = response.data;
                reviews.value = car.value.reviews;
            } catch (error) {
                alert('Сталася помилка !');
                console.error('Error fetching updated car info:', error);
            }
        };


        const calculateTotalPrice = () => {
            const fromDate = new Date(rent.value.dateFrom);
            const toDate = new Date(rent.value.dateTo);
            const diffTime = Math.abs(toDate - fromDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            const carPriceElement = document.getElementById('carPrice');
            const carPrice = parseFloat(carPriceElement.textContent);
            return diffDays * carPrice;
        };

        return {
            car,
            slidePrev,
            slideNext,
            onSwiper,
            rent,
            reviews,
            showReviewModal,
            openReviewModal,
            closeReviewModal,
            showPaymentModal,
            openPaymentModal,
            closePaymentModal,
            fetchReviews,
            updateRentInfo,
            IsValidDate,
            submitRentForm,
            currentUserId,
            deleteReview,
            arrowRightIcon,
            arrowLeftIcon,
            mooodHappyIcon,
            moodNeutralIcon,
            moodSadIcon,
            starIcon,
            getRatingAlt,
            getRatingIcon,
            messageIcon,
            getCarImageUrl
        };
    }
};
</script>

<style>
.info-container {
    margin: 30px 15%;
    height: 100%;
}

.header-text {
    padding: 5px;
    font-weight: bold;
    font-size: 25px;
}

.section-car-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.main-info {
    width: 70%;
    display: flex;
    flex-direction: column;
}


.car-gallery {
    max-width: 449px;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
}

.swiper-container {
    margin: 10px 0;
}

#nextButton,
#prevButton {
    background-color: #282d3e;
    border-radius: 30px;
    padding: 5px 30px;
    cursor: pointer;
    border: none;
}

.car-full-info {
    margin: 20px 0;
    border-radius: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.full-info-text {
    margin: 15px 0 10px 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
}

.full-info-table {
    margin: 0 10px 10px 15px;
    display: flex;
    justify-content: space-between; /* Розташування блоків зліва і справа */
}

.full-info-table-left {
    width: 48%;
}

.full-info-table-right {
    width: 48%;
}

.full-info-table table {
    width: 100%; /* Таблиці займають всю ширину своїх блоків */
}

.full-info-table table td {
    padding: 10px 5px;
    border-bottom: 1px solid #cccccc;
}

.car-reviews-container-text {
    font-weight: bold;
    font-size: 22px;
    padding-bottom: 15px;
}

#reviews-add-button {
    background-color: #282d3e;
    color: aliceblue;
    font-size: 18px;
    padding: 15px 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    border: none;
    margin-bottom: 10px;
}

#reviews-add-button img {
    margin-right: 10px;
}

.car-review {
    border-radius: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 10px;
}

.review-user {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
}

.review-user img {
    margin-right: 10px;
    width: 40px;
}

.review-rating {
    margin-bottom: 10px;
    font-size: 18px;
    display: flex;
    align-items: center;
}

.review-rating span {
    margin: 4px 5px 0 0;
}

.review-comment p {
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    overflow: hidden;
    margin: 0;
}

.aside-info {
    width: 28%;
}

.aside-info-block {
    border-radius: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
}

.aside-info-text span {
    display: block;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
}

.date-selection label {
    display: block;
    margin: 10px 0 5px;
    font-weight: 600;
}

.date-selection input {
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
}

.date-selection button {
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
}

#rentInfo {
    margin-bottom: 10px;

}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity 0.3s ease;
}

.modal-content {
    background-color: aliceblue;
    color: #282d3e;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    position: relative;
}

.close {
    color: #aaa;
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
}

.close:hover,
.close:focus {
    color: black;
}


#delete-button-review,
#button-submit-review,
#payByCard,
#payByCash {
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    background-color: #282d3e;
    color: aliceblue;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}
#payByCard {
    margin-right: 10px;
}
.button-delete-review {
    margin-left: auto;
}

#delete-button-review {
    background-color: crimson;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#delete-button-review img {
    width: 20px;
    margin: 0;
}


</style>