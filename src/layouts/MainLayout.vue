<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header reveal  :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
      <q-toolbar>


        <q-btn
          to="/login"
          push
          icon-right="account_circle"
          label="Login"
          class="absolute-right "

          />
        <q-btn
          color="white"
          class="absolute-left"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-toolbar-title style="text-align: center;">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
    export default {
        name: 'MyLayout',
        data () {
            return {
                leftDrawerOpen: true
            }
        }
    }
</script>
<style>

  .header_dark {
    background: linear-gradient(145deg, rgb(173, 15, 18) 15%, rgb(0, 10, 10) 70%);
  }
  .header_normal {
    background: linear-gradient(
      145deg,
      rgb(208, 35, 13) 15%,
      rgb(255, 162, 150) 70%
    );
  }
.normal{

}
</style>
