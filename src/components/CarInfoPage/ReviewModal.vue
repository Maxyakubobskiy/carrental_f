<template>
    <div v-if="isVisible" class="modal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Додати відгук</h2>
            <form @submit.prevent="submitReview">
                <label for="rating">Рейтинг: </label>
                <select v-model="rating" name="rating" id="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br><br>
                <label for="comment">Коментар:</label><br>
                <textarea v-model="comment" name="comment" id="comment" rows="6" cols="60"></textarea><br><br>
                <button type="submit" id="button-submit-review">Надіслати</button>
            </form>
        </div>
    </div>
</template>

<script>
import api from '@/api/api';

export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        carId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            rating: 1,
            comment: ''
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async submitReview() {
            const reviewData = {
                rating: this.rating,
                comment: this.comment,
            };
            try {
                console.log(reviewData)
                await api.post('/submitReview/'+ this.carId, reviewData);
                this.rating = 1;
                this.comment = '';
                this.$emit('reviewAdded');
                this.closeModal();
            } catch (error) {
                alert('Сталася помилка при створенні відгуку!');
                console.error('Error submitting review:', error);
            }
        }
    }
}
</script>

<style >
textarea {
    resize: none;
}
</style>
