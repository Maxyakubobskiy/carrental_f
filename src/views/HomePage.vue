<template>
  <div id="app">
    <header><MainHeader /></header>
    <router-view></router-view>
    <footer><MainFooter /></footer>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

export default {
  components: {
    MainHeader,
    MainFooter,
  }
};
</script>

<style>
body {
    background-color: aliceblue;
    font-family: Montserrat, Arial, "Helvetica Neue", Helvetica, sans-serif;
    color: #282d3e;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

header {
    z-index: 2;
    background-color: aliceblue;
    position: sticky;
    top: 0;
    box-shadow: 1px 4px 15px rgba(0, 0, 0, .1);
    height: 100px;
}

footer {
    background-color: aliceblue;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, .1);

}

ul {
    list-style: none;
}

.container {
    padding: 0 7%;
    height: 100%;
}

.search-container {
    position: relative;
    z-index: 1;
}

.search {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 450px;
}

.search-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}

.search-top {
    font-weight: 500;
    width: 100%;
    color: aliceblue;
    display: flex;
    justify-content: center;
}

.search-bottom {
    background: aliceblue;
    box-shadow: 0 4px 15px rgba(0, 0, 0, .05);
    border-radius: 15px;
    padding: 20px 15px;

}

.search-top-filter {
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
}

.search-nav-image {
    background-color: #282d3e;
    color: aliceblue;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    margin-right: 30px;
    border-radius: 30px;
}

.search-nav-image img {
    margin-right: 5px;
}

.search-nav-text {
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    color: #282d3e;
}

.search-middle-filter {
    display: flex;
    align-items: center;
    padding-bottom: 20px;

}

.drop {
    position: relative;
    display: inline-block;
    background-color: #282d3e;
    margin: 5px;
    text-align: center;
    border-radius: 30px;
    padding: 10px 20px;
}

.filter-type {
    color: aliceblue;
    font-size: 16px;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
}

.filter-type img {
    margin-left: 5px;
}

.dropdown-block {
    position: absolute;
    top: 100%;
    left: -30px;
    display: none;
    background-color: aliceblue;
    color: #282d3e;
    min-width: 200px;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid #ccc;
    border-radius: 10px;
    z-index: 1;
    padding: 10px;
    margin-top: 5px;
}

.dropdown-block label {
    display: flex;
    width: 100%;
    cursor: pointer;
    min-height: 50px;
    align-items: center;
    padding: 0 5px 0 10px;
}

.dropdown-block-year {
    position: absolute;
    top: 100%;
    left: -220px;
    display: none;
    background-color: transparent;
    color: #282d3e;
    min-width: 400px;
    z-index: 1;
    padding: 10px;
    margin-top: 5px;

}

.year-from {
    position: absolute;
    left: 0;
    top: 0;
}

.year-to {
    position: absolute;
    right: 0;
    top: 0;
}

.year-from,
.year-to {
    background-color: aliceblue;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 200px;
    max-height: 200px;
    border: 1px solid #ccc;
    border-radius: 10px;

}

.dropdown-block::-webkit-scrollbar,
.year-from::-webkit-scrollbar,
.year-to::-webkit-scrollbar {
    width: 10px; /* ширина полоси прокрутки */
}

.dropdown-block::-webkit-scrollbar-track,
.year-from::-webkit-scrollbar-track,
.year-to::-webkit-scrollbar-track {
    background: aliceblue; /* колір фону прокрутки */
    margin: 7px 0;
}

.dropdown-block::-webkit-scrollbar-thumb,
.year-from::-webkit-scrollbar-thumb,
.year-to::-webkit-scrollbar-thumb {
    background: #282d3e; /* колір полоси прокрутки */
    border-radius: 5px; /* радіус кутів полоси прокрутки */
}

.dropdown-block::-webkit-scrollbar-thumb:hover,
.year-from::-webkit-scrollbar-thumb:hover,
.year-to::-webkit-scrollbar-thumb:hover {
    background: #1b1f2a; /* колір полоси прокрутки при наведенні */
}

.year-to label,
.year-from label {
    display: flex;
    width: 100%;
    cursor: pointer;
    min-height: 50px;
    align-items: center;
    padding: 0 5px 0 10px;
}

.year-to > span:first-child,
.year-from > span:first-child {
    display: inline-block; /* або block, в залежності від вашого потреби */
    margin-top: 10px; /* ваші бажані значення margin */
    background-color: #282d3e;
    color: aliceblue;
    padding: 5px 50px;
    border-radius: 10px;
}

.show {
    display: block;
}

.image-car-class {
    width: 60px;
    margin-left: auto;
    margin-right: 5px;
}

.image-mark {
    margin-left: auto;
    margin-right: 5px;
}

.image-fuel-type {
    width: 45px;
    margin-left: auto;
    margin-right: 5px;
}

.custom-checkbox,
.custom-radio {
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.checkmark {
    width: 100%;
    height: auto;
    display: none;
}

.custom-checkbox.checked .checkmark,
.custom-radio.checked .checkmark {
    display: block;
}

.custom-checkbox:hover,
.custom-radio:hover {
    background-color: lightgray;
}

.custom-checkbox.checked,
.custom-radio.checked {
    background-color: #282d3e;
}

.checkbox-input,
.radio-input {
    display: none;
}

.search-bottom-filter button {
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

#clear-all-checkboxes {
    display: none;
}

#clear-all-checkboxes.show {
    display: flex;
}

#clear-all-checkboxes img {
    margin-left: 5px;
}

#button-submit-filter img {
    margin-right: 5px;
}

#button-submit-filter {
    margin-left: auto;
}

#clear-all-checkboxes {
    float: left;
    background-color: crimson;
}

#image-search-background {
    width: 100%;
    height: 450px;
    object-fit: cover;
    filter: brightness(0.7);
}

.section-head {
    padding: 10px 0;
}

.section-available {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
}

.car-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-items: center; /* Центрує елементи по горизонталі */
    width: 100%; /* Забезпечує ширину контейнера */
}

.car-item {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 15px 10px;
}

@media (max-width: 1400px) {
    .car-item:nth-child(n + 4) {
        display: none;
    }
}

@media (min-width: 1401px) and (max-width: 1749px) {
    .car-item:nth-child(n + 5) {
        display: none;
    }
}

@media (min-width: 1750px) {
    .car-item:nth-child(n + 6) {
        display: none;
    }
}

.car-item.unavailable {
    background-color: darkgrey;
}

.car-item.show {
    display: block;
}

.car-item-info a {
    text-decoration: none;
    color: inherit;
}

.car-name {
    padding-left: 10px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
}

.car-image {
    padding: 10px;
}

#image-photo-car {
    width: 250px;
    height: 125px;
}

.car-info {
    padding: 8px 0;
}

.car-info table {
    border-collapse: collapse;
    width: 100%;
}

.car-info table td {
    padding: 10px 5px;
    border-bottom: 1px solid #cccccc;
}

.section-more {
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
}

#more-button img {
    margin-left: 5px;
}

#more-button {
    background-color: #282d3e;
    border-radius: 30px;
    padding: 10px 25px;
    cursor: pointer;
    color: aliceblue;
    display: flex;
    align-items: center;
    font-size: 20px;
    border: none;
}
</style>