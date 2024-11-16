<template>
  <div>
    <div class="footer-container">
      <div class="footer-logo">
        <div class="footer-logo-icon">
          <img :src="logoSrc" alt="Logo" id="image-logo-footer">
          <span>Car Rental</span>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer-menu">
        <div class="footer-menu-nav">
          <nav class="footer-nav" v-for="category in footerNavItems" :key="category.title">
            <span>{{ category.title }}</span>
            <ul>
              <li v-for="item in category.items" :key="item.label">
                <form @submit.prevent="filterCars(item)">
                  <button type="submit">{{ item.label }}</button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer-inf">
        <span>
          Copyright © 2024 CAR RENTAL | All Rights Reserved | Created by Maksym Yakubovsky
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import logo from '@/assets/images/logo.png';
import { EventBus } from '@/event/bus';

export default {
  setup() {
    const logoSrc = ref(logo);

    const footerNavItems = ref([
      {
        title: 'Класи авто',
        items: [
          { label: 'Економ', value: 'Economy' },
          { label: 'Середній', value: 'Medium' },
          { label: 'Бізнес', value: 'Business' },
          { label: 'Позашляховик', value: 'Offroad' },
          { label: 'Мінівен', value: 'Minivan' },
          { label: 'Преміум', value: 'Premium' },
          { label: 'Комерційний', value: 'Commercial' },
          { label: 'Кабріолет', value: 'Cabriolet' },
          { label: 'Пікап', value: 'Pickup' },
        ],
      },
      {
        title: 'Марки авто',
        items: [
          { label: 'Hyundai', value: 'Hyundai' },
          { label: 'Mazda', value: 'Mazda' },
          { label: 'Toyota', value: 'Toyota' },
          { label: 'Volkswagen', value: 'Volkswagen' },
        ],
      },
      {
        title: 'Контакти',
        items: [{ label: 'Контакти', value: 'tel:+380951233020', isLink: true }],
      },
      {
        title: 'Аккаунт',
        items: [
          { label: 'Особистий кабінет', value: '/account', isLink: true },
          { label: 'Зареєструватися', value: '/registration', isLink: true },
        ],
      },
    ]);

    const filterCars = (item) => {
      if (item.isLink) {
        window.location.href = item.value;
      } else {
        EventBus.emit('filterCars', item);
      }
    };

    return {
      logoSrc,
      footerNavItems,
      filterCars,
    };
  },
};
</script>


<style scoped>
.footer-container {
  padding: 0 7%;
  border-bottom: 1px solid lightgray;
}

.footer-logo {
  padding: 15px;
}

.footer-logo-icon {
  display: flex;
  align-items: center;
}

.footer-logo-icon span {
  font-size: 18px;
  color: #282d3e;
  font-weight: bold;
}

#image-logo-footer {
  width: 60px;
  height: 55px;
  padding-right: 10px;
}

.footer-menu {
  padding: 40px 15px;
}

.footer-menu-nav {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.footer-menu-nav ul {
  padding: 0;
}

.footer-menu-nav ul li {
  padding: 5px 0;
}

.footer-menu-nav a {
  text-decoration: none;
  color: #282d3e;
}

.footer-menu-nav button {
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #282d3e;
  font-size: 17px;
  padding: 0;
}

.footer-menu-nav span {
  font-size: 19px;
  color: #282d3e;
  font-weight: bold;
}

.footer-inf {
  font-size: 15px;
  color: #282d3e;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
