<template>
<div class="search">
    <div class="search-image">
        <img :src="backgroundImage" alt="search image background" id="image-search-background">
    </div>
    <div class="search-container">
        <div class="search-top">
            <h1>Прокат автомобілів в Україні від Car Rental</h1>
        </div>
        <div class="search-bottom">
            <div class="search-top-filter">
                <div class="search-nav-image">
                    <img :src="searchIcon" alt="search" style="filter: invert(100%)">
                    <span>Пошук</span>
                </div>
                <div class="search-nav-text">
                    <span>Підберіть параметри автомобіля</span>
                </div>
            </div>
            <form @submit.prevent="submitForm" id="filter-form">
                <div class="search-middle-filter">
                    <!-- Клас авто -->
                    <div class="drop">
                        <button type="button" class="filter-type" id="button-class-avto" @click="toggleDropdown('classCar')">
                            <span>Клас авто</span>
                            <img :src="caretIcon" alt="" style="filter: invert(100%)">
                        </button>
                        <div class="dropdown-block" :class="{ show: isDropClassCar }">
                            <label v-for="car in carClasses" :key="car.value">
                                <input type="checkbox" v-model="selectedClasses" :value="car.value" class="checkbox-input checkbox-class" >
                                <span class="custom-checkbox" :class="{ checked: selectedClasses.includes(car.value) }">
                                    <img :src="checkIcon" style="filter: invert(100%)" alt="" class="checkmark" >
                                </span>
                                <span>{{ car.label }}</span>
                                <img :src="car.image" alt="" class="image-car-class">
                            </label>
                        </div>
                    </div>

                    <!-- Марка -->
                    <div class="drop">
                        <button type="button" class="filter-type" id="button-mark" @click="toggleDropdown('mark')">
                            <span>Марка</span>
                            <img :src="caretIcon" alt="" style="filter: invert(100%)">
                        </button>
                        <div class="dropdown-block" :class="{ show: isDropMark }">
                            <label v-for="car in carMarks" :key="car.value">
                                <input type="checkbox" v-model="selectedMarks" :value="car.value" class="checkbox-input checkbox-mark">
                                <span class="custom-checkbox" :class="{ checked: selectedMarks.includes(car.value) }">
                                    <img :src="checkIcon" style="filter: invert(100%)" alt="" class="checkmark">
                                </span>
                                <span>{{ car.label }}</span>
                                <img :src="car.image" alt="" class="image-mark">
                            </label>
                        </div>
                    </div>

                    <!-- Тип палива -->
                    <div class="drop">
                        <button type="button" class="filter-type" id="button-fuel-type" @click="toggleDropdown('fuelType')">
                            <span>Тип палива</span>
                            <img :src="caretIcon" alt="" style="filter: invert(100%)">
                        </button>
                        <div class="dropdown-block" :class="{ show: isDropFuelType }">
                            <label v-for="fuel in fuelTypes" :key="fuel.value">
                                <input type="checkbox" v-model="selectedFuelTypes" :value="fuel.value" class="checkbox-input checkbox-fuel-type">
                                <span class="custom-checkbox" :class="{checked: selectedFuelTypes.includes(fuel.value)}">
                                    <img :src="checkIcon" style="filter: invert(100%)" alt="" class="checkmark">
                                </span>
                                <span>{{ fuel.label }}</span>
                                <img :src="fuel.image" alt="" class="image-fuel-type">
                            </label>
                        </div>
                    </div>

                    <!-- Рік випуску -->
                    <div class="drop">
                        <button type="button" class="filter-type" id="button-year" @click="toggleDropdown('year')">
                            <span>Рік випуску</span>
                            <img :src="caretIcon" alt="" style="filter: invert(100%)">
                        </button>
                        <div class="dropdown-block-year" :class="{ show: isDropYear }">
                            <div class="year-from">
                                <span>Від</span>
                                <label v-for="year in years" :key="year">
                                    <input type="radio" name="yearFrom" :value="year" class="radio-input" v-model="selectedYearFrom" @change="enableYearToOptions">
                                    <span class="custom-radio" :class="{checked: selectedYearFrom == year}">
                                        <img :src="checkIcon" style="filter: invert(100%)" alt="" class="checkmark">
                                    </span>
                                    <span>{{ year }}</span>
                                </label>
                            </div>
                            <div class="year-to">
                                <span>До</span>
                                <label v-for="year in years" :key="'to-' + year">
                                    <input type="radio" name="yearTo" :value="year" class="radio-input" v-model="selectedYearTo" :disabled="!selectedYearFrom || year < selectedYearFrom">
                                    <span class="custom-radio" :class="{checked: selectedYearTo == year}">
                                        <img :src="checkIcon" style="filter: invert(100%)" alt="" class="checkmark">
                                    </span>
                                    <span>{{ year }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="search-bottom-filter">
                    <button type="button" id="clear-all-checkboxes" @click="clearAll" :class="{show: isAnyChecked}">
                        <span>Скинути параметри</span>
                        <img :src="binIcon" alt="" style="filter: invert(100%)">
                    </button>

                    <button type="submit" id="button-submit-filter">
                        <img :src="searchIcon" alt="" style="filter: invert(100%)">
                        <span>Знайти автомобіль</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<CarList ref="carList" />

</template>

<script>
import api from '@/api/api';
import CarList from '@/components/HomePage/CarList.vue';
import { EventBus } from '@/event/bus';
import backgroundImage from '@/assets/images/search-image-background.jpg';
import searchIcon from '@/assets/images/search.svg';
import caretIcon from '@/assets/images/caret-down.svg';
import checkIcon from '@/assets/images/check.svg';
import binIcon from '@/assets/images/bin-simple.svg';

export default {
    components:{
        CarList
    },
    data() {
        return {
            backgroundImage,
            searchIcon,
            caretIcon,
            checkIcon,
            binIcon,
            selectedClasses: [],
            carClasses: [
                { value: 'Economy', label: 'Економ', image: require('@/assets/images/car-class-1.svg') },
                { value: 'Medium', label: 'Середній', image: require('@/assets/images/car-class-2.svg') },
                { value: 'Business', label: 'Бізнес', image: require('@/assets/images/car-class-3.svg') },
                { value: 'Offroad', label: 'Позашляховик', image: require('@/assets/images/car-class-4.svg') },
                { value: 'Minivan', label: 'Мінівен', image: require('@/assets/images/car-class-5.svg') },
                { value: 'Premium', label: 'Преміум', image: require('@/assets/images/car-class-6.svg') },
                { value: 'Commercial', label: 'Комерційний', image: require('@/assets/images/car-class-7.svg') },
                { value: 'Cabriolet', label: 'Кабріолет',image: require('@/assets/images/car-class-9.svg') },
                { value: 'Pickup', label: 'Пікап', image: require('@/assets/images/car-class-10.svg') }
            ],
            selectedMarks: [],
            carMarks: [
                { value: 'Kia', label: 'Кіа', image: require('@/assets/images/kia.svg') },
                { value: 'Audi', label: 'Audi', image: require('@/assets/images/audi.svg') },
                { value: 'Citroen', label: 'Citroen', image: require('@/assets/images/citroen.svg') },
                { value: 'Ford', label: 'Ford', image: require('@/assets/images/ford.svg') },
                { value: 'Honda', label: 'Honda', image: require('@/assets/images/honda.svg') },
                { value: 'Hyundai', label: 'Hyundai', image: require('@/assets/images/hyundai.svg') },
                { value: 'Land Rover', label: 'Land Rover', image: require('@/assets/images/landrover.svg') },
                { value: 'Lexus', label: 'Lexus', image: require('@/assets/images/lexus.svg') },
                { value: 'Mazda', label: 'Mazda', image: require('@/assets/images/mazda.svg') },
                { value: 'Mercedes-Benz', label: 'Mercedes', image: require('@/assets/images/mercedes.svg') },
                { value: 'Mini', label: 'Mini', image: require('@/assets/images/mini.svg') },
                { value: 'Nissan', label: 'Nissan', image: require('@/assets/images/nissan.svg') },
                { value: 'Renault', label: 'Renault', image: require('@/assets/images/renault.svg') },
                { value: 'Skoda', label: 'Skoda', image: require('@/assets/images/skoda.svg') },
                { value: 'Suzuki', label: 'Suzuki', image: require('@/assets/images/suzuki.svg') },
                { value: 'Tesla', label: 'Tesla', image: require('@/assets/images/tesla_svg.svg'), style: { width: '51px', height: '28px' } },
                { value: 'Toyota', label: 'Toyota', image: require('@/assets/images/toyota.svg') },
                { value: 'Volkswagen', label: 'Volkswagen', image: require('@/assets/images/vw.svg') }
            ],
            selectedFuelTypes: [],
            fuelTypes: [
                { value: 'Petrol', label: 'Бензин', image: require('@/assets/images/fuel-1.svg') },
                { value: 'Diesel', label: 'Дизель', image: require('@/assets/images/fuel-2.svg') },
                { value: 'Electro', label: 'Електро', image: require('@/assets/images/fuel-3.svg') }
            ],
            selectedYearFrom: null,
            selectedYearTo: null,
            years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
            
            dropdowns: {
                classCar: false,
                mark: false,
                fuelType: false,
                year: false
            },
            isAnyChecked: false,
        };
    },
    computed: {
        isDropClassCar() {
            return this.dropdowns.classCar;
        },
        isDropMark() {
            return this.dropdowns.mark;
        },
        isDropFuelType() {
            return this.dropdowns.fuelType;
        },
        isDropYear() {
            return this.dropdowns.year;
        }
    },
    mounted() {
        EventBus.on('filterCars', this.handleFilterCars);
    },
    beforeUnmount() {
        EventBus.off('filterCars', this.handleFilterCars);
    },
    methods:{
        toggleDropdown(dropdown) {
            Object.keys(this.dropdowns).forEach(key => {
                this.dropdowns[key] = (key === dropdown) ? !this.dropdowns[key] : false;
            });
        },
        clearAll() {
            this.selectedClasses = [];
            this.selectedMarks = [];
            this.selectedFuelTypes = [];
            this.selectedYearFrom = null;
            this.selectedYearTo = null;
            this.isAnyChecked = false;
            this.closeAllDropdowns();
        },
        closeAllDropdowns() {
            for (const key in this.dropdowns) {
                this.dropdowns[key] = false;
            }
        },
        async submitForm() {
            const filters = {
                carClasses: this.selectedClasses,
                marks: this.selectedMarks,
                fuelTypes: this.selectedFuelTypes,
                yearFrom: this.selectedYearFrom,
                yearTo: this.selectedYearTo
            };
            if (
                !filters.carClasses.length &&
                !filters.marks.length &&
                !filters.fuelTypes.length &&
                !filters.yearFrom &&
                !filters.yearTo
            ) {
                return;
            }
            try {
                const response = await api.post('/filterCars', filters);

                this.$refs.carList.updateCarList(response.data);
                } catch (error) {
                    alert('Сталася помилка !');
                    console.error('Error fetching cars:', error);
                }
            this.clearAll();
        },
        handleFilterCars(filters) {
            if (filters.value) {
                if (this.carClasses.some(carClass => carClass.value === filters.value)) {
                    this.selectedClasses = [filters.value];
                } else if (this.carMarks.some(carMark => carMark.value === filters.value)) {
                    this.selectedMarks = [filters.value];
                } 
            }
            this.submitForm();
        }
    },
    watch: {
        selectedClasses() {
            this.isAnyChecked = this.selectedClasses.length > 0 || this.selectedMarks.length > 0 || this.selectedFuelTypes.length > 0 || this.selectedYearFrom || this.selectedYearTo;
        },
        selectedMarks() {
            this.isAnyChecked = this.selectedClasses.length > 0 || this.selectedMarks.length > 0 || this.selectedFuelTypes.length > 0 || this.selectedYearFrom || this.selectedYearTo;
        },
        selectedFuelTypes() {
            this.isAnyChecked = this.selectedClasses.length > 0 || this.selectedMarks.length > 0 || this.selectedFuelTypes.length > 0 || this.selectedYearFrom || this.selectedYearTo;
        },
        selectedYearFrom() {
            this.isAnyChecked = this.selectedClasses.length > 0 || this.selectedMarks.length > 0 || this.selectedFuelTypes.length > 0 || this.selectedYearFrom || this.selectedYearTo;
        },
        selectedYearTo() {
            this.isAnyChecked = this.selectedClasses.length > 0 || this.selectedMarks.length > 0 || this.selectedFuelTypes.length > 0 || this.selectedYearFrom || this.selectedYearTo;
        }
    }
};
</script>