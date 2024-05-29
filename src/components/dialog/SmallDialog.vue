<template>
  <v-dialog v-model="isActive" max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="Open Dialog(400*380)"></v-btn>
    </template>

    <template v-slot:default>
      <v-card title="600*540 다이얼로그" max-height="380">
        <template v-slot:text>
          Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit.
          Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris
          cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo,
          augue in, duis erat proin condimentum in a eget, sed fermentum sed
          vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor.
          Ultrices nascetur nulla gravida ante arcu.
        </template>

        <div class="pa-4 text-end border-t">
          <v-spacer></v-spacer>

          <v-btn text="취소" @click="closeDialog" variant="outlined"></v-btn>

          <v-btn
            text="확인"
            class="ml-3"
            depressed
            large
            color="primary"
            @click="closeDialog"
          ></v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const isActive = ref(false);

function openDialog() {
  isActive.value = true;
}

function closeDialog() {
  isActive.value = false;
}
</script>
