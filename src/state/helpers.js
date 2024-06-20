import { mapState, mapGetters, mapActions } from 'vuex';

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
};

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    loader: (state) => state.loader,
    mode: (state) => state.mode,
  }),
};

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'register', 'resetPassword']);

export const layoutMethods = mapActions('layout', ['changeLayoutType', 'changeLayoutWidth', 'changeLeftSidebarType', 'changeTopbar', 'changeLoaderValue', 'changeMode']);

export const authFackMethods = mapActions('authfack', ['login', 'registeruser', 'logout']);

export const notificationMethods = mapActions('notification', ['success', 'error', 'clear']);
