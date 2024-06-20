<script>
import simplebar from "simplebar-vue";
import i18n from "../i18n";
import us from "@/assets/images/flags/us.jpg";
import french from "@/assets/images/flags/french.jpg";
import spain from "@/assets/images/flags/spain.jpg";
import chaina from "@/assets/images/flags/chaina.png";
import arabic from "@/assets/images/flags/arabic.png";

export default {
  data() {
    return {
      languages: [
        {
          flag: us,
          language: "en",
          title: "English"
        },
        {
          flag: french,
          language: "fr",
          title: "French"
        },
        {
          flag: spain,
          language: "es",
          title: "spanish"
        },
        {
          flag: chaina,
          language: "zh",
          title: "Chinese"
        },
        {
          flag: arabic,
          language: "ar",
          title: "Arabic"
        }
      ],
      current_language: "en",
      flag: us,
      title: "English"
    };
  },
  components: { simplebar },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale, country, flag) {
      this.text = country;
      this.flag = flag;
      this.current_language = i18n.locale;
      i18n.global.locale = locale;
    }
  }
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo.png" alt height="20" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo.png" alt height="20" />
            </span>
          </router-link>
        </div>

        <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn">
          <i class="ri-menu-2-line align-middle"></i>
        </button>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" />
            <span class="ri-search-line"></span>
          </div>
        </form>


      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block d-lg-none ms-2">
          <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="ri-search-line"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
            aria-labelledby="page-header-search-dropdown">
            <form class="p-3">
              <div class="form-group m-0">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search ..." />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="ri-search-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>





        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button type="button" class="btn header-item noti-icon waves-effect" @click="initFullScreen">
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>



        <BDropdown variant="white" right toggle-class="header-item" menu-class="dropdown-menu-end"
          class="d-inline-block user-dropdown">
          <template #button-content>
            <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-2.jpg"
              alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ms-1">{{
              $t("navbar.dropdown.kevin.text")
            }}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <BDropdownItem href="#">
            <i class="ri-user-line align-middle me-1"></i>
            {{ $t("navbar.dropdown.kevin.list.profile") }}
          </BDropdownItem>

          <BDropdownDivider />
          <BDropdownItem class="text-danger" href="/logout">
            <i class="ri-shut-down-line align-middle me-1 text-danger"></i>
            {{ $t("navbar.dropdown.kevin.list.logout") }}
          </BDropdownItem>
        </BDropdown>


      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
</style>