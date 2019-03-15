<template lang="pug">
  //- v-layout(wrap, justify-center, align-center)
  v-flex
    v-card(dark, color='purple')
      v-card-title.headline(class='purple darken-1')
        | {{ fullName }}&nbsp;<span class='font-weight-thin'>{{ $t('profile') }}</span>
        v-spacer
        //- v-avatar(v-if='picture', size='36', color='grey lighten-4')
        //-   img(:src='avatar', alt='avatar')
        v-icon.mdi-36px(@click='$auth.logout()') mdi-account-circle-outline
      v-card-text.pt-0
          //- v-container(pa-0, grid-list-md)
          v-layout(wrap, justify-space-between, align-start)
            v-flex.mt-3.ml-2(xs3, layout, align-center)
              v-layout(column)
                v-flex
                  v-avatar(size='80', color='grey lighten-4')
                    img(v-if='avatar', :src='avatar', :alt='fullName')
                v-flex
                  span.subheading
                    |{{ country }}
                    flag.ml-1(iso='ua', style='font-size:18px;border-radius:50%')
                v-flex
                  span.subheading
                    |{{ dateOfBirth }}
            v-flex(xs8)
              v-text-field(label='Given Name', v-model='firstName', readonly, hide-details)
              v-text-field(label='Family Name', v-model='lastName', readonly, hide-details)
              v-text-field(
                :label='$t("email")'
                v-model='userEmail'
                readonly
                hide-details
                :append-icon='emailVerified ? "mdi-checkbox-marked-circle-outline" : "mdi-alert-outline"'
              )
              //- v-flex(layout)
                v-text-field(label='Country', v-model='country', readonly, hide-details, suffix='UA')
                div.d-flex.align-end(style='font-size:24px')
                  flag.ml-1(iso='ua', :squared='false')
              //- v-text-field(label='Date of Birth', v-model='dateOfBirth', readonly, hide-details)
            //- v-flex(mt-3, layout, justify-center)
              | {{ $t("email") }}: {{ userEmail }}
              v-icon.mdi-18px.ml-1(color='success', v-if='emailVerified') mdi-checkbox-marked-circle-outline
              v-icon.mdi-18px.ml-1(color='grey', v-else) mdi-alert-outline
      v-card-actions
        v-spacer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class UserProfile extends Vue {
  $auth!: any
  country: string = 'Ukraine'
  dateOfBirth: any = '1985-01-31'

  get avatar (): string | null {
    const { picture } = this.$auth.user
    return picture || null
  }

  get fullName (): string | null {
    const { full_name: fullName, name } = this.$auth.user
    return fullName || name
  }

  get firstName (): string | null {
    const { given_name: givenName, first_name: firstName } = this.$auth.user
    return givenName || firstName
  }

  get lastName (): string | null {
    const { family_name: familyName, last_name: lastName } = this.$auth.user
    return familyName || lastName
  }

  get userEmail (): string | null {
    const { email } = this.$auth.user
    return email
  }

  get emailVerified (): Boolean {
    const { email_verified: emailVerified } = this.$auth.user
    return !!emailVerified
  }
}
</script>
