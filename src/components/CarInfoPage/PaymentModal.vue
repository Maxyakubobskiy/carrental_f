<template>
    <div v-if="isVisible" class="modal" id="paymentModal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Виберіть спосіб оплати</h2>
            <div class="payment-options">
                <button @click="selectPaymentMethod('card')" id="payByCard">Оплата карткою</button>
                <button @click="selectPaymentMethod('cash')" id="payByCash">Оплата готівкою</button>
            </div>

            <div v-if="paymentMethod === 'card'" id="cardInfo" class="payment-form">
                <h3>Введіть дані картки</h3>
                <label for="cardNumber">Номер картки:</label>
                <input type="text" id="cardNumber" v-model="cardNumber" @input="formatCardNumber" placeholder="1234 5678 9012 3456" maxlength="19" />
                <p v-if="errors.cardNumber" class="error-text">{{ errors.cardNumber }}</p>

                <label for="expiryDate">Дата закінчення терміну дії:</label>
                <input type="month" id="expiryDate" v-model="expiryDate" />
                <p v-if="errors.expiryDate" class="error-text">{{ errors.expiryDate }}</p>

                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" v-model="cvv" @input="formatCVV" placeholder="123" maxlength="3"/>
                <p v-if="errors.cvv" class="error-text">{{ errors.cvv }}</p>

                <button class="confirm-btn" @click="confirmPayment">Підтвердити оплату</button>
            </div>

            <div v-if="paymentMethod === 'cash'" id="cashInfo" class="payment-form">
                <h3>Оплата готівкою</h3>
                <p>Оплата буде здійснена при отриманні авто.</p>
                <button class="confirm-btn" @click="confirmPayment">Підтвердити оплату</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            paymentMethod: null,
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            errors: {             
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            }
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        selectPaymentMethod(method) {
            this.paymentMethod = method;

            this.errors = {
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            };
        },
        formatCardNumber() {
            let formattedCardNumber = this.cardNumber.replace(/\D/g, '');
            formattedCardNumber = formattedCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
            this.cardNumber = formattedCardNumber;
        },
        formatCVV() {
            this.cvv = this.cvv.replace(/\D/g, '');
        },
        validateCardDetails() {
            let isValid = true;
            const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
            const cvvPattern = /^\d{3}$/;

            if (!this.cardNumber || !cardNumberPattern.test(this.cardNumber)) {
                this.errors.cardNumber = 'Будь ласка, введіть правильний номер картки (формат: 1234 5678 9012 3456).';
                isValid = false;
            } 

            const currentDate = new Date();
            const expiryDate = new Date(this.expiryDate);
            if (!this.expiryDate || expiryDate < currentDate) {
                this.errors.expiryDate = 'Будь ласка, введіть правильну дату закінчення терміну дії картки (не минулу).';
                isValid = false;
            }

            if (!this.cvv || !cvvPattern.test(this.cvv)) {
                this.errors.cvv = 'Будь ласка, введіть правильний CVV код (3 цифри).';
                isValid = false;
            } 

            return isValid;
        },
        confirmPayment() {
            if (this.paymentMethod === 'card') {
                if (this.validateCardDetails()) {
                    const paymentData = {
                        method: this.paymentMethod,
                        cardNumber: this.cardNumber,
                        expiryDate: this.expiryDate,
                        cvv: this.cvv
                    };

                    try {
                        this.$emit('confirmPayment', paymentData);
                        this.closeModal();
                    } catch (error) {
                        alert('Сталася помилка !');
                        console.error('Payment confirmation failed:', error);
                    }
                }
            } else if (this.paymentMethod === 'cash') {
                const paymentData = {
                    method: this.paymentMethod
                };
                try {
                    this.$emit('confirmPayment', paymentData);
                    this.closeModal();
                } catch (error) {
                    alert('Сталася помилка !');
                    console.error('Payment confirmation failed:', error);
                }
            }
        }
    }
}
</script>

<style scoped>
.payment-options button {
    width: 45%;
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s ease;
}

.payment-form {
    margin-top: 20px;
    text-align: left;
}

.payment-form label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
}

.payment-form input {
    width: calc(100% - 16px);
    padding: 8px;
    margin-bottom: 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
}

.confirm-btn {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.confirm-btn:hover {
    background-color: #218838;
}

/* Error message style */
.error-text {
    color: red;
    font-size: 12px;
    margin-top: -8px;
    margin-bottom: 12px;
}

/* Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
