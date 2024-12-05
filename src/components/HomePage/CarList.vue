<template>
<main>
    <div class="container">
      <div class="section-head">
        <div class="section-head-text">
          <h2>Каталог доступних автомобілів</h2>
        </div>
      </div>
      <div class="section-available">
        <div class="car-list">
          <p v-if="message">{{ message }}</p>
          <div
            class="car-item"
            v-for="car in filteredCars"
            :key="car.carId"
            :class="{ unavailable: !car.available, show: isExpanded }"
          >
            <div class="car-item-info">
              <router-link :to="'/car-info/' + car.carId">
                <div class="car-name">
                  <span>{{ car.brand }} {{ car.model }}</span>
                </div>
                <div class="car-image">
                  <img :src="getCarImageUrl(car.logoPhotoUrl)" alt="Photo Car" loading="lazy" id="image-photo-car" />
                </div>
              </router-link>
              <div class="car-info">
                <table>
                  <tbody>
                    <tr>
                      <td>Рік випуску:</td>
                      <td>{{ car.year }}</td>
                    </tr>
                    <tr>
                      <td>Тип кузова:</td>
                      <td>{{ car.bodyType }}</td>
                    </tr>
                    <tr>
                      <td>Тип трансмісії:</td>
                      <td>{{ car.transmissionType }}</td>
                    </tr>
                    <tr>
                      <td>Тип палива:</td>
                      <td>{{ car.fuelType }}</td>
                    </tr>
                    <tr>
                      <td>Наявність:</td>
                      <td>{{ car.available ? 'Наявний' : 'Не наявний' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-more" v-if="filteredCars.length > 0">
        <button type="button" id="more-button" @click="toggleShowMore">
          <span>{{ isExpanded ? 'Приховати авто' : 'Переглянути всі авто' }}</span>
          <img
            :src="caretIcon"
            alt=""
            style="filter: invert(100%); transform: rotate(180deg);"
            :style="{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }"
          />
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import api from '@/api/api';
import caretIcon from '@/assets/images/caret-down.svg';

export default {
  data() {
    return {
        caretIcon,
        cars: [],
        filteredCars: [],
        message: '',
        isExpanded: false
    };
  },
  mounted() {
    this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        const response = await api.get('/list-all-cars');
        if (response.data && response.data.length) {
            this.cars = response.data;
            this.filteredCars = this.cars;
          } else {
          this.message = 'Немає доступних автомобілів.';
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        this.message = 'Виникла помилка при отриманні автомобілів.';
      }
    },
    updateCarList(filteredCars){
        this.filteredCars =  filteredCars;
      if (!filteredCars.length) {
        this.message = 'Немає доступних автомобілів.';
      } else {
        this.message = '';
      }
    },
    getCarImageUrl(logoPhotoUrl) {
      return require(`@/assets/images/car/${logoPhotoUrl}`);
    },
    toggleShowMore() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>