<template>
  <v-navigation-drawer
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    :rail="rail"
    permanent
    temporary
  >
    <v-treeview
      :items="items"
      item-key="title"
      color="primary-1"
      activatable
      hoverable
      dense
      open-on-click
      :open.sync="openItems"
    >
      <template v-slot:title="{ item, open, selected }">
        <span @click="handleItemClick(item)"> {{ item.title }} </span>
      </template>
    </v-treeview>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const rail = ref(false);
const openItems = ref([]); // 열린 항목을 추적

const handleItemClick = (item) => {
  if (item.type === "menu") {
    router.push(`/${item.to}`);
  }
};

// 모든 하위 항목을 열기 위한 함수
const openAllItems = (items) => {
  items.forEach((item) => {
    openItems.value.push(item.title);
    if (item.children) {
      openAllItems(item.children);
    }
  });
};

watch(
  () => props.items,
  (newItems) => {
    openItems.value = [];
    openAllItems(newItems);
  },
  { immediate: true }
);
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>

<style scoped>
.v-btn__content {
  float: right;
  right: 10px;
  left: auto;
}
</style>
