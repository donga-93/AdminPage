<template>
      <q-page class="flex flex-center">
        <div
          id="particles-js"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        ></div>

        <q-card
          class="login-form"
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
        >
          <q-card-section>
            <q-avatar
              size="74px"
              class="absolute"
              style="top: 0;right: 25px;transform: translateY(-50%);"
            >
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Log in to continue
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">

                <div class="row justify-center">
                </div>
                <div>
                  <q-input v-model="form.email" type="email" float-label="E-Mail" ref="email"/>
                </div>
                <div>
                  <q-input v-model="form.password" type="password" float-label="Password" />
                </div>
                <div class="row justify-center">
                  <q-btn class="full-width" label="Sign In" @click="submit"/>
                </div>
                <div class="row justify-center">
                  <q-btn outline rounded class="full-width" label="Sign Up" to="/register"/>
                </div>

            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
</template>


<script>
    import firebase from "firebase";
    import { required, minLength, email } from 'vuelidate/lib/validators';

    export default {
        name: 'Login',
        data () {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        created() {
            firebase.auth().onAuthStateChanged(userAuth => {
                if (userAuth) {
                    firebase
                        .auth()
                        .currentUser.getIdTokenResult()
                        .then(tokenResult => {
                            console.log(tokenResult.claims);
                        });
                }
            });
        },
        mounted() {
            // on next Vue tick, to ensure
            // our Vue reference exists
            this.$nextTick(() => {
                // calling "next()" method:
                this.$refs.email.focus()
            })
        },
        validations: {
            form: {
                email: { required, email },
                password: { required, minLength: minLength(6) }
            }
        },
        methods:  {
            async submit () {
                try {
                    const {
                        user
                    } = await firebase
                        .auth()
                        .signInWithEmailAndPassword(this.form.email, this.form.password);
                    if(this.form.email.endsWith('admin@admin.com') && this.form.password.endsWith('admin123'))
                    {
                        await this.$router.push({path: '/v1Qx0KjofMgKSil77BRls2ofs5s1'})
                        this.$q.notify({
                            message: 'Admin Logged In',
                            color: 'green'
                        })
                    }
                    else {
                        await this.$router.push({path: '/customer'})
                        this.$q.notify({
                            message: 'Customer Logged In',
                            color: 'green'
                        })
                    }

                } catch (error) {
                    alert(error);
                    console.log(error);
                }
                // this.$v.form.$touch();
                // if (this.$v.form.$error) {
                //   this.$q.notify({
                //     message: 'Please review fields again.',
                //     position: 'top',
                //     color: 'red',
                //     icon: 'warning'
                //   });
                //   console.log(this.$v.form.$error);
                //   return;
                // }
                //auth.login(this.credentials, 'profile');
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
