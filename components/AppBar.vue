<template>
  <v-app-bar>
    <template #title>
      <div
        class="d-inline-flex align-center text-h4 font-weight-bold my-5 text-primary"
      >
        Sales Dashboard
      </div>
    </template>
    <v-app-bar-nav-icon
      v-if="$vuetify.display.smAndDown"
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <template v-if="$vuetify.display.mdAndUp" #append>
      <div class="hidden-sm-and-down">
        <v-btn
          v-for="item in menu"
          :key="item"
          class="text-body-1 blue-grey-darken-4"
          :to="`${item.to}`"
          variant="text"
          tag="NuxtLink"
        >
          {{ item.text }}
        </v-btn>
      </div>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list v-for="item in menu" :key="item" :to="item.to">{{
      item.text
    }}</v-list>
  </v-navigation-drawer>
</template>

<script setup>
const menu = [
  { text: "Dashboard", to: "/" },
  { text: "Order", to: "/order" },
];
const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>
