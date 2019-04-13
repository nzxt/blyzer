/**
 * Extends interfaces in Vue.js
 */
import Vue, { ComponentOptions } from 'vue'
import { IApiService } from '~/types/interfaces'

declare module 'vue/types/vue' {
  interface Vue {
    $api: IApiService;
    $auth: any;
    $noty: any;
    guidRegex: RegExp;
    switchLocalePath: Function;
 }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // This adds the `auth` property to the existing `vue/types/options/ComponentOptions` type
    auth?: Boolean | string | string[];
  }
}
