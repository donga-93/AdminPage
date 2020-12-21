<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header reveal :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn
          @click="signout"
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"/>

        <q-toolbar-title style="text-align: center;">
          Digital TV
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-btn
      color="white"
      class="absolute-left"
      flat
      round
      @click="$q.dark.toggle()"
      :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
    />
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >

      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple to="/customer">
            <q-item-section avatar>
              <q-icon name="home"/>
            </q-item-section>

            <q-item-section>
              HOME PAGE
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/CustomerPage1">
            <q-item-section avatar>
              <q-icon name="star"/>
            </q-item-section>

            <q-item-section>
              P1
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/CustomerPage2">
            <q-item-section avatar>
              <q-icon name="star"/>
            </q-item-section>

            <q-item-section>
              P2
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/CustomerPage3">
            <q-item-section avatar>
              <q-icon name="star"/>
            </q-item-section>

            <q-item-section>
              P3
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/CustomerPage4">
            <q-item-section avatar>
              <q-icon name="star"/>
            </q-item-section>

            <q-item-section>
              P4
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://miro.medium.com/max/2400/1*S8UogculWFLr3lVdLn05MA.jpeg" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div v-if="user" class="text-weight-bold">{{user.email}}</div>
        </div>
      </q-img>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import firebase from "firebase";
    import { mapGetters } from 'vuex'

    export default {
        name: 'MyLayout',
        data() {
            return {
                users: [],
                user: null,
                leftDrawerOpen: false
            }
        },   created() {
            let self = this;
            firebase.auth().onAuthStateChanged(function(user) {
                self.user = user;
            });

            this.users = [];
            firebase
                .firestore()
                .collection("roles")
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        let user = doc.data();
                        console.log('admin.vue user:', user);
                        user.id = doc.id;
                        console.log(doc.data());
                        if (!user.role.admin) {
                            this.users.push(user);
                        }
                    });
                });
        },
        methods: {
            signout() {
                firebase
                    .auth()
                    .signOut()
                    .then(user => {
                        this.$router.push("/login");
                    });
                this.$q.notify({
                    message: 'Customer Logged out',
                    color: 'red'
                })
            },
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

</style>
