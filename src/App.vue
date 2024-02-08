<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <nav>
    <router-link to="/"> Home</router-link>
    <router-link to="/upload">Add Sensor</router-link>
  </nav>
  <Suspense>
    <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  </Suspense>
</template>

<style scoped>

nav {
      background-color: #a1e3d6; /* Light blueish-green color */
      padding: 20px; /* Increase vertical padding for height */
      text-align: center;
    }

    nav a {
      text-decoration: none;
      color: #333; /* Light gray text color for readability */
      margin: 0 20px; /* Increase horizontal margin for button spacing */
      font-size: 24px; /* Increase font size for bigger buttons */
      transition: box-shadow 0.3s ease; /* Add smooth transition for the box shadow */
    }

    nav a:hover {
      text-decoration: underline;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Add box shadow on hover */
    }

    .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

 

</style>
