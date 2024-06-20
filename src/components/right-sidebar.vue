<script>
import { layoutMethods } from "@/state/helpers";
import simplebar from "simplebar-vue"
/**
 * Right-sidebar 
 */
export default {
  data() {
    return {
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"],
      },
      layout: this.$store?.state?.layout?.layoutType || "vertical",
      width: this.$store?.state?.layout?.layoutWidth || "fluid",
      topbar: this.$store?.state?.layout?.topbar || "dark",
      sidebarType: this.$store?.state?.layout?.leftSidebarType || "dark",
      loader: this.$store?.state?.layout?.loader || false,
      mode: this.$store?.state?.layout?.mode || "light",
    };
  },
  components: {
    simplebar
  },
  methods: {
    ...layoutMethods,
    hide() {
      this.$parent.toggleRightSidebar();
    },
    // eslint-disable-next-line no-unused-vars
    handleRightBarClick(e, el) {
      this.$parent.hideRightSidebar();
    },
    // eslint-disable-next-line no-unused-vars
    middleware(event, el) {
      if (event.target.classList)
        return !event.target.classList.contains("toggle-right");
    },
    changeLayout(layout) {
      this.changeLayoutType({
        layoutType: layout,
      });
    },
    changeType(type) {
      return this.changeLeftSidebarType({
        leftSidebarType: type,
      });
    },
    changeWidth(width) {
      return this.changeLayoutWidth({
        layoutWidth: width,
      });
    },
    changeTopbartype(value) {
      return this.changeTopbar({
        topbar: value,
      });
    },
    changeloader() {
      return this.changeLoaderValue({
        loader: this.loader,
      });
    },
    changemode() {
      return this.changeMode({
        mode: this.mode,
      });
    },
  },
  watch: {
    mode: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-bs-theme", "dark");
              break;
            case "light":
              document.body.setAttribute("data-bs-theme", "light");
              break;
            default:
              document.body.setAttribute("data-bs-theme", "light");
              break;
          }
        }
      },
    }
  }
};
</script>

<template>
  <div>
    <!-- Right Sidebar -->
    <div v-click-outside="config" class="right-bar">
      <simplebar class="h-100">
        <div class="rightbar-title px-3 py-4">
          <a href="javascript:void(0);" class="right-bar-toggle float-end" @click="hide">
            <i class="mdi mdi-close noti-icon"></i>
          </a>
          <h5 class="m-0">Settings</h5>
        </div>
        <div class="p-3">
          <h6 class="mb-0">Layout</h6>
          <hr class="mt-1" />

          <BFormRadioGroup v-model="layout" stacked @input="changeLayout($event)">
            <BFormRadio value="vertical" class="mb-1">Vertical</BFormRadio>
            <BFormRadio value="horizontal" class="mb-1">Horizontal</BFormRadio>
          </BFormRadioGroup>
          <!-- Width -->
          <h6 class="mt-3">Width</h6>
          <hr class="mt-1" />
          <BFormRadioGroup v-model="width" stacked @input="changeWidth($event)">
            <BFormRadio value="fluid" class="mb-1">Fluid</BFormRadio>
            <BFormRadio value="boxed">Boxed</BFormRadio>
          </BFormRadioGroup>

          <h6 class="mt-3">Mode</h6>
          <hr class="mt-1" />
          <BFormRadioGroup v-model="mode" stacked @input="changemode($event)">
            <BFormRadio value="light" class="mb-1">Light</BFormRadio>
            <BFormRadio value="dark">Dark</BFormRadio>
          </BFormRadioGroup>

          <!-- Sidebar -->
          <div v-if="layout === 'vertical'">
            <h6 class="mt-3">Sidebar</h6>
            <hr class="mt-1" />

            <BFormRadioGroup v-model="sidebarType" stacked @input="changeType($event)">
              <BFormRadio value="dark" class="mb-1">Dark</BFormRadio>
              <BFormRadio value="light" class="mb-1">Light</BFormRadio>
              <BFormRadio value="compact" class="mb-1">Compact</BFormRadio>
              <BFormRadio value="icon" class="mb-1">Icon</BFormRadio>
              <BFormRadio value="colored">Colored</BFormRadio>
            </BFormRadioGroup>
          </div>

          <!-- Topbar -->
          <div v-if="layout === 'horizontal'">
            <h6 class="mt-3">Topbar</h6>
            <hr class="mt-1" />

            <BFormRadioGroup v-model="topbar" stacked @input="changeTopbartype($event)">
              <BFormRadio value="dark" class="mb-1">Dark</BFormRadio>
              <BFormRadio value="light" class="mb-1">Light</BFormRadio>
            </BFormRadioGroup>
          </div>

          <!-- Preloader -->
          <h6 class="mt-3">Preloader</h6>
          <hr class="mt-1" />

          <BFormCheckbox v-model="loader" name="check-button" switch @input="changeloader">Preloader</BFormCheckbox>
        </div>
        <!-- Settings -->
        <hr class="mt-0" />
        <h6 class="text-center mb-0">Choose Layouts</h6>

        <div class="p-4">
          <div class="mb-2">
            <router-link to="http://E-com.vuejs-light-h.themesdesign.in/" target="_blank">
              <img src="@/assets/images/layouts/layout-4.jpg" class="img-fluid img-thumbnail" alt />
            </router-link>
          </div>

          <div class="mb-2">
            <router-link to="http://E-com.vuejs-dark-h.themesdesign.in/" target="_blank">
              <img src="@/assets/images/layouts/layout-5.jpg" class="img-fluid img-thumbnail" alt />
            </router-link>
          </div>

          <div class="mb-2">
            <router-link to="http://E-com.vuejs-rtl-h.themesdesign.in/" target="_blank">
              <img src="@/assets/images/layouts/layout-6.jpg" class="img-fluid img-thumbnail" alt />
            </router-link>
          </div>
        </div>
      </simplebar>
      <!-- end slimscroll-menu-->
    </div>
    <!-- /Right-bar -->

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
  </div>
</template>