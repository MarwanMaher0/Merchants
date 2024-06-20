import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import axios from "axios";

// Function to check if the user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem("token-access");
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // Set page title
  document.title = routeTo.name
    ? routeTo.name + " | E-com - Vuejs Admin "
    : "E-com - Vuejs Admin ";

  // Check if auth is required on this route (including nested routes)
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

  // If auth isn't required for the route, just continue
  if (!authRequired) return next();

  // If auth is required and the user is logged in, continue
  if (isAuthenticated()) {
    next();
  } else {
    // If auth is required and the user is NOT currently logged in, redirect to login
    next({ name: "Login", query: { redirectFrom: routeTo.fullPath } });
  }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with the same arguments as the `beforeEnter` hook
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // Complete the redirect
              next(...args);
              reject(new Error("Redirected"));
            } else {
              resolve();
            }
          });
        } else {
          // Otherwise, continue resolving the route
          resolve();
        }
      });
    }
  } catch (error) {
    return;
  }

  // If we reach this point, continue resolving the route
  next();
});

export default router;

// Axios interceptor to add the token to the request headers
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token-access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.headers["Content-Type"] === "multipart/form-data") {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});
