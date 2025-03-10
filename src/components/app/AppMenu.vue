<script setup lang="ts">
import { ColorMode } from '@medics/medics-vue-components';
</script>

<template>
  <BNavbar class="app-navbar">
    <BNavbarNav>
      <BNavItem :to="{ name: 'HelloWorld' }">HelloWorld</BNavItem>

      <BNavItem :to="{ name: 'Error403' }">403</BNavItem>

      <BNavItem :to="{ name: 'Error404' }">404</BNavItem>

      <ColorMode size="sm" class="ms-auto" />
    </BNavbarNav>
  </BNavbar>
</template>

<style>
.app-navbar {
  padding: 0.25rem 0.75rem;
  background-color: var(--bs-body-bg);
  --bs-navbar-color: var(--bs-body-color);
  --bs-nav-link-font-size: var(--bs-body-font-size);

  .container-fluid {
    .navbar-nav {
      width: 100%;
      gap: 2rem;

      .router-link-active {
        transition: 0.3s font-weight ease;
        font-weight: bold;
      }
    }
  }
}
</style>
