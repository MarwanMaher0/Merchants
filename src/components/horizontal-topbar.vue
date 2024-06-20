<script>
import simplebar from "simplebar-vue";
import i18n from "../i18n";
import { layoutComputed } from "@/state/helpers";

import us from "@/assets/images/flags/us.jpg";
import french from "@/assets/images/flags/french.jpg";
import spain from "@/assets/images/flags/spain.jpg";
import chaina from "@/assets/images/flags/chaina.png";
import arabic from "@/assets/images/flags/arabic.png";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...layoutComputed,
  },
  components: { simplebar },
  data() {
    return {
      languages: [
        {
          flag: us,
          language: "en",
          title: "English",
        },
        {
          flag: french,
          language: "fr",
          title: "French",
        },
        {
          flag: spain,
          language: "es",
          title: "spanish",
        },
        {
          flag: chaina,
          language: "zh",
          title: "Chinese",
        },
        {
          flag: arabic,
          language: "ar",
          title: "Arabic",
        },
      ],
      current_language: "en",
      flag: us,
      title: "English"
    };
  },
  methods: {
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
    toggleMenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
    setLanguage(locale, country, flag) {
      this.text = country;
      this.flag = flag;
      this.current_language = i18n.locale;
      i18n.global.locale = locale;
    }
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar", "light");
              document.body.removeAttribute("data-layout-size", "boxed");
              break;
            case "colored":
              document.body.setAttribute("data-topbar", "colored");
              document.body.removeAttribute("data-layout-size", "boxed");
              break;
            default:
              document.body.setAttribute("data-topbar", "dark");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
  },
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

        <button type="button" class="btn btn-sm px-3 font-size-24 d-lg-none header-item" data-toggle="collapse"
          @click="toggleMenu">
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

        <BDropdown variant="white" right toggle-class="header-item">
          <template #button-content> <img class :src="flag" alt="Header Language" height="16" /> </template>
          <BDropdownItem class="notify-item" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :link-class="{ active: entry.language === current_language }">
            <img :src="`${entry.flag}`" alt="user-image" class="me-1" height="12" />
            <span class="align-middle">{{ entry.title }}</span>
          </BDropdownItem>
        </BDropdown>

        <BDropdown variant="white" class="d-none d-lg-inline-block d-lg-inline-block ms-1" menu-class="dropdown-menu-lg"
          right toggle-class="header-item noti-icon">
          <template #button-content>
            <i class="ri-apps-2-line"></i>
          </template>
          <div class="px-lg-2">
            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/github.png" alt="Github" />
                  <span>{{ $t("navbar.dropdown.site.list.github") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/bitbucket.png" alt="bitbucket" />
                  <span>{{ $t("navbar.dropdown.site.list.github") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/dribbble.png" alt="dribbble" />
                  <span>{{ $t("navbar.dropdown.site.list.dribbble") }}</span>
                </a>
              </div>
            </div>

            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/dropbox.png" alt="dropbox" />
                  <span>{{ $t("navbar.dropdown.site.list.dropbox") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/mail_chimp.png" alt="mail_chimp" />
                  <span>{{ $t("navbar.dropdown.site.list.mailchimp") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/slack.png" alt="slack" />
                  <span>{{ $t("navbar.dropdown.site.list.slack") }}</span>
                </a>
              </div>
            </div>
          </div>
        </BDropdown>

        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen"
            @click="initFullScreen">
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>

        <BDropdown variant="white" right menu-class="dropdown-menu-lg p-0" toggle-class="header-item noti-icon">
          <template #button-content>
            <i class="ri-notification-3-line"></i>
            <span class="noti-dot"></span>
          </template>
          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">
                  {{ $t("navbar.dropdown.notification.text") }}
                </h6>
              </div>
              <div class="col-auto">
                <a href="#!" class="small">{{
                  $t("navbar.dropdown.notification.subtext")
                }}</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px">
            <a href class="text-reset notification-item">
              <div class="d-flex">
                <div class="avatar-xs me-3">
                  <span class="avatar-title bg-primary rounded-circle font-size-16">
                    <i class="ri-shopping-cart-line"></i>
                  </span>
                </div>
                <div class="flex-1">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.order.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.order.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.order.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="d-flex">
                <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                <div class="flex-1">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.james.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.james.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.james.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="d-flex">
                <div class="avatar-xs me-3">
                  <span class="avatar-title bg-success rounded-circle font-size-16">
                    <i class="ri-checkbox-circle-line"></i>
                  </span>
                </div>
                <div class="flex-1">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.item.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.item.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.item.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="d-flex">
                <img src="@/assets/images/users/avatar-4.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                <div class="flex-1">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.salena.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.salena.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.salena.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div class="p-2 border-top">
            <a class="btn btn-sm btn-link font-size-14 btn-block text-center" href="javascript:void(0)">
              <i class="mdi mdi-arrow-right-circle me-1"></i>
              {{ $t("navbar.dropdown.notification.button") }}
            </a>
          </div>
        </BDropdown>

        <BDropdown variant="white" right toggle-class="header-item" class="d-inline-block user-dropdown">
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
          <BDropdownItem href="#">
            <i class="ri-wallet-2-line align-middle me-1"></i>
            {{ $t("navbar.dropdown.kevin.list.mywallet") }}
          </BDropdownItem>

          <BDropdownItem href="#">
            <i class="ri-lock-unlock-line align-middle me-1"></i>
            {{ $t("navbar.dropdown.kevin.list.lockscreen") }}
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