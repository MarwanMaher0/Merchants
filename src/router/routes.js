import store from "@/state/store";

// Function to check if the user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem("token-access");
}

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/pages/account/login.vue"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (isAuthenticated()) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/pages/account/register.vue"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (isAuthenticated()) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot-password",
    component: () => import("../views/pages/account/forgot-password.vue"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (isAuthenticated()) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/logout",
    name: "Logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        localStorage.removeItem("token-access");
        const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
          route.push("/login")
        );
        next(authRequiredOnPreviousRoute ? { name: "home" } : { ...routeFrom });
      },
    },
  },
  {
    path: "/",
    name: "Products",
    meta: { authRequired: true },
    component: () => import("../views/pages/ecommerce/products.vue"),
  },
  {
    path: "/ecommerce/product-detail",
    name: "Product Detail",
    meta: { authRequired: true },
    component: () => import("../views/pages/ecommerce/product-detail.vue"),
  },
  {
    path: "/ecommerce/orders",
    name: "Orders",
    meta: { authRequired: true },
    component: () => import("../views/pages/ecommerce/orders.vue"),
  },
  {
    path: "/ecommerce/add-product",
    name: "Add-product",
    meta: { authRequired: true },
    component: () => import("../views/pages/ecommerce/add-product.vue"),
  },
  {
    path: "/auth/login-1",
    name: "login-1",
    meta: { authRequired: true },
    component: () => import("../views/pages/sample-auth/login-1.vue"),
  },
  {
    path: "/auth/register-1",
    name: "register-1",
    meta: { authRequired: true },
    component: () => import("../views/pages/sample-auth/register-1.vue"),
  },
  {
    path: "/auth/lock-screen-1",
    name: "Lock Screen",
    meta: { authRequired: true },
    component: () => import("../views/pages/sample-auth/lock-screen-1.vue"),
  },
  {
    path: "/auth/recoverpwd-1",
    name: "Recover Password",
    meta: { authRequired: true },
    component: () => import("../views/pages/sample-auth/recoverpwd-1.vue"),
  },
];

export default routes;
