<template>
    <main>
        <div class="container-info">
            <div class="container-choose">
                <span>Кількість продаж</span><br>
                <span>Виберіть період та авто</span>
                <div class="criteria-container">
                    <form id="chartForm" >
                        <label for="dateChartFrom">Період:</label>
                        <input type="date" id="dateChartFrom" v-model="chartDate.dateFrom" @change="updateInfo"/>

                        <label for="dateChartTo" id="dateChartToLabel" ></label>
                        <input type="date" id="dateChartTo" v-model="chartDate.dateTo" v-if="chartDate.dateFrom" @change="updateInfo" /><br>

                        <div id="chartInfo"></div>
                        <button type="submit" v-if="IsValidDate" id="button-submit-chart"  @click.prevent="submitForm">Вибрати</button>
                    </form>
                    <span>Доступний період від: </span><span>{{ availPeriod }}</span>
                </div>
            </div>
            <div class="chart-container" >
                <BarChart :data="chartData" :options="options" type="bar" v-if="chartData"/>
            </div>
            <div class="container-income" v-if="totalAmountPeriod != 0">
                    <span>Дохід за вибраний період:</span> <br>
                    <span>{{ totalAmountPeriod }} грн</span>
                </div>
        </div>
    </main>
</template>

<script>
import { defineComponent } from 'vue';
import api from '@/api/api';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
    components: { BarChart: Bar },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Оренди',
                        backgroundColor: '#42A5F5',
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            chartDate: {
                dateFrom:'',
                dateTo:''
            },
            IsValidDate: false,
            availPeriod: '',
            totalAmountPeriod:0
        };
    },
    mounted(){
        this.availablePeriod();
    },
    methods:{
        updateInfo(){
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const toDate = new Date(this.chartDate.dateTo);
            const fromDate = new Date(this.chartDate.dateFrom);
            const chartInfo = document.getElementById('chartInfo');
            const availableDate = new Date(this.availPeriod)


            if(this.chartDate.dateTo !== ''){
                if (toDate >= fromDate && toDate <= currentDate && fromDate >= availableDate) {
                    chartInfo.textContent = '';
                    this.IsValidDate = true;
                } else {
                    chartInfo.textContent = 'Виберіть коректні дати!';
                    this.IsValidDate = false;
                }
            }else{
                chartInfo.textContent = '';
                this.IsValidDate = false;
            }
        },
        async availablePeriod(){
            try {
                const response = await api.get('/admin/availablePeriod');
                if (response.data && response.data.length) {
                    this.availPeriod = response.data;
                } else {
                    console.error('Error response');
                }
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async submitForm(){
            if (this.chartDate.dateFrom === ''||this.chartDate.dateTo === '') {
                return
            }
            try {
                const response = await api.post('/admin/statistics',{
                    dateFrom: this.chartDate.dateFrom,
                    dateTo: this.chartDate.dateTo
                });

                this.chartData = {
                labels: response.data.map(item => item.day),
                datasets: [
                {
                    label: 'Оренди',
                    backgroundColor: '#42A5F5',
                    data: response.data.map(item => item.rental_count)
                }]};
            } catch (error) {
                console.error('Error :', error);
            }
            try {
                const responseAmount = await api.post('/admin/totalAmountPeriod',{
                    dateFrom: this.chartDate.dateFrom,
                    dateTo: this.chartDate.dateTo
                });
                this.totalAmountPeriod = responseAmount.data;
                this.chartDate.dateFrom = '';
                this.chartDate.dateTo = '';
                this.IsValidDate = false;
            } catch (error) {
                console.error('Error :', error);
            }
        }
    }
});
</script>

<style >
.container-info {
    margin: 30px 15%;
    height: 100%;
}
.container-income,
.container-choose {
    padding: 5px;
    font-weight: bold;
    font-size: 25px;
}
.container-income{
    margin-top: 15px;
}
.chart-container {
    height: 400px;
    
}
.criteria-container input{
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    margin-left: 15px;
    font-size: 16px;
    box-sizing: border-box;
}
#button-submit-chart{
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
</style>
