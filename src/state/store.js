// store/index.js

import { createStore } from 'vuex';
import layoutModule from './modules/layout';
import auth from './modules/auth';
import authfack from './modules/authfack';

const store = createStore({
  modules: {
    layout: layoutModule,
    auth: auth,
    authfack: authfack
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: import.meta.env.NODE_ENV !== 'production',
});

export default store;
