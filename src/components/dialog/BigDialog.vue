<template>
  <v-dialog v-model="isActive" max-width="960">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="Open Dialog(960*840)"></v-btn>
    </template>

    <template v-slot:default>
      <v-card title="960*840 다이얼로그" max-height="840">
        <template v-slot:text>
          Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit.
          Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris
          cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo,
          augue in, duis erat proin condimentum in a eget, sed fermentum sed
          vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor.
          Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi
          ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut
          mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus
          luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla
          aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus
          magna neque pellentesque, nulla vel erat.

          <br />

          Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus
          gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui
          integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo
          taciti odio, amet viverra scelerisque quis quis et tortor, curabitur
          morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae
          tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque
          aenean quia vitae nostra, tempus elit enim id dui, at egestas
          pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis
          fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam.
          Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis
          duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit
          pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum
          risus, quam ac egestas.

          <br />

          Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a
          dictumst cras augue, purus imperdiet non. Varius montes cursus varius
          vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis
          vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede
          mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut
          est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor,
          maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor
          vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend
          vel eu, nullam maecenas mauris nec nunc euismod, tortor porta
          ridiculus potenti, massa tristique nam magna, et wisi placerat et erat
          ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac
          tortor sociis et non animi tristique, rhoncus malesuada, ut arcu
          volutpat scelerisque sollicitudin, elit curabitur dui pede purus
          dolor, integer aenean risus taciti nulla eleifend accumsan. At
          pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac
          placerat eget justo semper, purus sociis curabitur mi ipsum consequat
          ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris,
          commodo quisque, praesent semper suscipit lobortis nam. Justo
          malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc,
          montes lectus purus fermentum.
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
