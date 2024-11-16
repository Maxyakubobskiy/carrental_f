<template>
  <div class="container">
    <div class="header-wrap">
      <div class="header-logo">
        <router-link :to="homeLink">
          <img :src="logo" alt="Logo" id="image-logo" />
          <span>Car Rental</span>
        </router-link>
      </div>
      <div class="header-connection">
        <div class="header-phone">
          <a :href="phoneLink">
            <img :src="phoneIcon" alt="Phone" id="image-phone" />
            <span class="phone-number">{{ phoneNumber }}</span>
          </a>
        </div>
      </div>
      <div class="header-menu">
        <button id="menuButton" @click="toggleMenu">
          <img :src="menuIcon" alt="Menu" id="image-menu" />
        </button>
        <ul v-show="menuVisible" id="menuList">
          <li><router-link :to="accountLink" @click="closeMenu">Особистий кабінет</router-link></li>
          <li><a :href="phoneLink">Контакти</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import logo from '@/assets/images/logo.png';
import phoneIcon from '@/assets/images/phone.svg';
import menuIcon from '@/assets/images/list.svg';

export default {
  setup() {
    const homeLink = ref('/');
    const accountLink = ref('/account');
    const phoneLink = ref('tel:+380951233020');
    const phoneNumber = ref('+380 951 233 020');
    const menuVisible = ref(false);

    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };

    const closeMenu = () => {
      menuVisible.value = false;
    };

    return {
      homeLink,
      accountLink,
      phoneLink,
      phoneNumber,
      logo,
      phoneIcon,
      menuIcon,
      menuVisible,
      toggleMenu,
      closeMenu
    };
  }
};
</script>

<style scoped>
.header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.header-logo {
  display: flex;
  align-items: center;
  margin-left: 50px;
  height: 100%;
}

.header-connection {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 170px;
}

.header-menu {
  position: relative;
  margin-right: 50px;
}

.header-menu ul {
  position: absolute;
  top: 100%;
  left: -150px;
  min-width: 200px;
  background-color: aliceblue;
  padding: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10%;
}

.header-menu ul li {
  list-style: none;
}

.header-menu ul li a {
  text-decoration: none;
  color: #282d3e;
  display: block;
  padding: 15px 15px;
  width: 100%;
  box-sizing: border-box;
}

.header-menu ul li a:hover {
  background-color: lightgray;
}

.header-logo a {
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 35px;
  color: #282d3e;
}

.header-connection a {
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  color: #282d3e;
}

#image-logo {
  width: 110px;
  height: 100px;
  padding-right: 20px;
}

#image-phone {
  width: 30px;
  height: 30px;
  padding-right: 5px;
}

#image-menu {
  width: 35px;
  height: 35px;
}

#menuButton {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
