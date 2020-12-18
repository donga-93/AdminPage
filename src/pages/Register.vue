<template>
  <q-page class="flex flex-center">
    <div
      id="particles-js"
      :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
    ></div>
    <q-btn
      color="white"
      class="absolute-top-right"
      flat
      round
      @click="$q.dark.toggle()"
      :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
    />
    <q-card
      class="login-form"
      v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
    >
      <q-card-section>
        <q-avatar
          size="64px"
          class="absolute"
          style="top: 0;right: 25px;transform: translateY(-50%);"
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bEl-sOq6JHgen4ZB0SgdblZGuMoUSnMXfw&usqp=CAU" />
        </q-avatar>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Register
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <div class="gutter-sm">
          </div>
          <div>
            <q-input v-model="user.email" type="email" label="E-Mail"/>
          </div>
          <div>
            <q-input v-model="user.password1" type="password" label="Password"/>
          </div>
          <div>
            <q-input v-model="user.password2" type="password" label="Confirm Password"/>
          </div>
          <div class="row justify-center">
            <q-btn outline rounded class="full-width q-btn bg-green" label="Register" @click="submit"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import firebase from "firebase";
  export default {
    name: 'Register',
    data() {
      return {
        user: {
          email: '',
          password1: '',
          password2: ''
        }
      }
    },
    methods: {
      async submit() {
        if (this.comparePasswords === true) {
          try {
            const { user } = await firebase
              .auth()
              .createUserWithEmailAndPassword(this.user.email, this.user.password1);
            // signout
            firebase
              .auth()
              .signOut()
              .then(user => {
                  this.$q.notify({
                      message: 'Register finished successfully',
                      color: 'green'
                  })
                this.$router.push('/login');
              });
          } catch (error) {
            alert(error.message);
          }
        } else {
          alert('el password no es igual');
        }
      }
    },
    computed: {
      comparePasswords() {
        return this.user.password1 === this.user.password2 ? true : 'Passwords don\'t match'
      }
    }
  }
</script>

<style>
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
  .normal_gradient {
    background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
  }
  .dark_gradient {
    background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #4c1014 70%);
  }
  .login-form {
    position: absolute;
  }
</style>
