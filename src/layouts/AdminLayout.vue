<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                  </q-avatar>

        <q-toolbar-title>CRM Admin</q-toolbar-title>
        <q-btn
          style="position: absolute; left: 250px;"
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-btn
          @click="signout"
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right" />
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-toolbar-title>Admin Panel</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/v1Qx0KjofMgKSil77BRls2ofs5s1"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>

                <q-item-section>
                  Home
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/v1Qx0KjofMgKSil77BRls2ofs5s1/customer_management"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>

                <q-item-section>
                  Customer Management
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/v1Qx0KjofMgKSil77BRls2ofs5s1/department"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="business" />
                </q-item-section>

                <q-item-section>
                  Department
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/v1Qx0KjofMgKSil77BRls2ofs5s1/my_profile"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="drafts" />
                </q-item-section>

                <q-item-section>
                  My Profile
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    import firebase from "firebase";
    export default {
        data() {
            return {
                left: false
            };
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
                    message: "Admin Logged out",
                    color:'red'
                });
            }
        }
    };
</script>

<style>
  .q-drawer {
    background-image: url(https://i.pinimg.com/originals/27/e6/82/27e682f5b1efbf3d527a462b5060a2d4.jpg  ) !important;
    background-size: cover !important;
  }

  .drawer_normal {
    background-color: rgba(1, 1, 1, 0.75);
  }

  .drawer_dark {
    background-color: #010101f2;
  }

  .navigation-item {
    border-radius: 5px;
  }

  .tab-active {
    background-color: green;
  }

  body {
    background: #f1f1f1 !important;
  }

  .header_normal {
    background: linear-gradient(
      145deg,
      rgb(32, 106, 80) 15%,
      rgb(21, 57, 102) 70%
    );
  }

  .header_dark {
    background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
  }
</style>
