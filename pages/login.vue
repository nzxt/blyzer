<template lang="pug">
v-layout(wrap, justify-center)
  v-flex(xs9)
    v-alert.error(v-model='loginHasError', icon='mdi-alert-decagram')
      | {{ 'Error while logging in..' }}
  v-flex(xs11, sm8, md6, lg4)
    v-card(color='blue-grey lighten-5')
      //- v-img(contain, src='/images/white-boccia-ball.jpg', alt='Boccia Ball')
      v-form(v-model='valid', @submit.prevent='submit')
        v-card-title.justify-center.display-1.blue-grey.lighten-5.font-weight-thin.warning--text {{ $t('signin') }}
          v-spacer
          v-btn(icon, @click='signOut', v-if='$auth.loggedIn')
            v-icon.mdi-24px mdi-logout-variant

          v-btn-toggle(v-else, v-model='authStrategy', mandatory)
            v-btn(icon, value='local')
              v-icon.mdi-24px mdi-account-circle
            v-btn(icon, value='facebook')
              v-icon.mdi-24px mdi-facebook-box
            v-btn(icon, value='google')
              v-icon.mdi-24px mdi-google
        v-card-text
          v-text-field(
            v-model='login',
            :label='authStrategy === "local" ? $t("login") : $t("email")',
            :prepend-icon='authStrategy === "local" ? "mdi-account-box-outline" : "mdi-email-variant"',
            :suffix='suffix',
            browser-autocomplete='username',
            clearable
          )
          v-text-field(
            v-model='password',
            :label='$t("password")',
            prepend-icon='mdi-textbox-password',
            :type='visible ? "text" : "password"',
            :append-icon='visible ? "mdi-eye-off" : "mdi-eye"',
            @click:append="visible = !visible"
            browser-autocomplete='current-password',
            clearable
          )
        v-card-actions.blue-grey.lighten-4
          v-btn.primary(flat, block, type='submit') Submit
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthMixin from '~/mixins/auth'

@Component({
  auth: false,
  mixins: [AuthMixin]
})
export default class LoginPage extends Vue {
  valid: Boolean = false
  visible: Boolean = false
  login: String | null = 'molfardevs'
  password: String | null = 'm01f4rD3v$'
  googleDomain: String = '@gmail.com'

  submit (): void {
    switch (this.authStrategy) {
    case 'local': {
      this.localSignIn()
      break
    }
    case 'facebook': {
      this.facebookSignIn()
      break
    }
    case 'google': {
      this.googleSignIn()
      break
    }
    }
  }

  get username (): String | null {
    return `${this.login}@example.com`
  }
  get email (): String | null {
    return this.authStrategy === 'google' ? `username${this.googleDomain}` : null
  }
  get suffix (): String | null {
    return this.authStrategy === 'google' ? this.googleDomain : null
  }
}
</script>

<style lang="stylus" scoped>
.theme--light.v-btn-toggle
  background: none
.v-btn-toggle--selected
  box-shadow: none
</style>
