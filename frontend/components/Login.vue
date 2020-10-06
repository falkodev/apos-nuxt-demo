<template>
  <v-card flat width="100%">
    <v-form ref="form" @submit.prevent="login">
      <v-container :class="{ 'container--small': !modal }">
        <v-flex class="flex--centered">
          <v-card-title class="justify-center">
            <span class="headline font-weight-bold grey--text text--darken-1"> Login </span>
            <v-icon v-show="modal" class="icon-align--right outlined" small @click="close"> close </v-icon>
          </v-card-title>

          <v-card-text>
            <v-text-field
              ref="email"
              v-model="email"
              label="Email"
              type="email"
              :disabled="emailDisabled"
              :rules="[rules.required]"
              :error-messages="emailErrors"
              color="primary"
              required
            />

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[rules.required]"
              color="primary"
              required
            />
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-layout column>
              <v-btn type="submit" class="login" color="primary" dark large :loading="loading"> Login </v-btn>
              <div class="separator" />
              <RegisterModal />
            </v-layout>
          </v-card-actions>
        </v-flex>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import RegisterModal from '~/components/RegisterModal'

export default {
  components: {
    RegisterModal,
  },

  props: {
    modal: Boolean,
    close: {
      type: Function,
      default: _ => _,
    },
    userEmail: {
      type: String,
      default: '',
    },
    redirectTo: {
      type: String,
      default: '',
    },
  },

  data: function () {
    return {
      email: this.userEmail || '',
      emailDisabled: !!this.userEmail,
      password: '',
      loading: false,
      rules: {
        required: v => !!v || 'Required',
      },
      emailErrors: [],
    }
  },

  methods: {
    ...mapActions(['getProfile']),
    ...mapActions('snackbar', ['displaySnack']),
    ...mapMutations(['setLogged']),

    async login() {
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        })
        await this.getProfile()
        this.setLogged(true)
        if (this.redirectTo === '/') {
          this.$router.push('/account/dashboard')
        }
        this.displaySnack({ message: 'Welcome back', color: 'success' })
      } catch (e) {
        this.displaySnack({ message: 'Error', color: 'error' })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_variables.scss';

.v-card__text {
  padding: 0;
}

.login {
  margin-bottom: 30px;
}

@media (min-width: $medium) {
  .flex--centered {
    padding-left: 4%;
  }
  .v-card .container.container--small {
    width: 50%;
  }
}

.separator {
  border-top: 1px solid $greylighten-1;
  margin-bottom: 10px;
}

.v-card {
  border-radius: 6px;
  padding-bottom: 20px;

  .container {
    width: 80%;
    min-height: 90%;
    align-items: start;

    .icon-align--right {
      position: absolute;
      top: 35px;
      right: 35px;
    }
  }

  &__title {
    .headline {
      font-size: 32px !important;
    }
    .v-icon.outlined {
      border: 1px solid;
      border-radius: 50%;
      height: 24px;
      width: 24px;
    }
  }
}
</style>
