<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="toggleDrawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="toolbar-title">{{ appinfo.name }}</v-toolbar-title>

      <!-- Main Menu Links -->
      <!--
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(menu, index) in mainMenuLinks"
          :key="index"
          :to="menu.to"
          text
          class="main-menu-link"
          :class="{ active: menu.title === activeTopMenu }"
          @click="selectTopMenu(menu)"
        >
          {{ menu.title }}
        </v-btn>
      </template>
      -->

      <v-spacer></v-spacer>

      <template v-if="$vuetify.display.mdAndUp">
        <span>[{{ appinfo.updated }}]</span>
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <!--
        <v-avatar>
          <v-img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          ></v-img>
        </v-avatar>
        -->
      </template>

      <!--
      <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      -->
    </v-app-bar>
    <VerticalNav v-model="drawer" :items="sideMenu" />
    <v-main class="ma-5">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth.store";
import VerticalNav from "@/layouts/components/vertical-nav.vue";
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";

const appinfo = useAppStore();
const store = useAuthStore();
const router = useRouter();
const route = useRoute();

const drawer = ref(true);
const sideMenu = ref([]);
const activeTopMenu = ref("");

const selectTopMenu = (menu) => {
  if (menu.children) {
    sideMenu.value = menu.children;
    activeTopMenu.value = menu.title;
  } else {
    sideMenu.value = [];
    activeTopMenu.value = menu.title;
    if (menu.to) {
      router.push(`/${menu.to}`);
    }
  }
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const mainMenuLinks = computed(() =>
  store.menu.filter((item) => item.children)
);

onMounted(
  () => {
    // const topMenu = store.menu.find((menu) =>
    //   menu.children?.some((child) => `/${child.to}` === newPath)
    // );
    // if (topMenu) {
    //   selectTopMenu(topMenu);
    // }
    // console.log(topMenu)
    selectTopMenu(store.menu[0]);
  }
);

watch(
  () => route.path,
  (newPath) => {
    const topMenu = store.menu.find((menu) =>
      menu.children?.some((child) => `/${child.to}` === newPath)
    );
    if (topMenu) {
      selectTopMenu(topMenu);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.toolbar-title {
  flex: 0 1 auto; /* Adjust flex property to make title left-aligned */
  font-size: 1.25rem;
  min-width: 0;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.75rem;
  text-transform: none;
}

.main-menu-link {
  margin-right: 16px;
}

.active {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
