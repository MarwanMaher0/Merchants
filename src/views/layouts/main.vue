<script>
import { layoutComputed } from "@/state/helpers";
import Vertical from "./vertical.vue";
import Horizontal from "./horizontal.vue";

export default {
  components: { Vertical, Horizontal },
  data() {
    { }
  },
  computed: {
    ...layoutComputed
  },
  methods: {},
  mounted() {
    // document.documentElement.setAttribute("dir", "rtl");
  }
};
</script>

<template>
  <div>
    <vertical v-if="layoutType === 'vertical'" :layout="layoutType">
      <slot />
    </vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>
