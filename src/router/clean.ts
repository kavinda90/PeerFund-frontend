import {createRouter, createWebHashHistory, type RouteRecordRaw,} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useConfigStore} from "@/stores/config";

const investorRoutes = [
  {
    path: "/investor",
    name: "/investor/dashboard",
    component: () => import("@/layouts/main-layout/investor/InvestorLayout.vue"),
    meta: {
      allowedUserTypes: ["investor"],
    },
    children: [
      {
        path: "dashboard",
        name: "investor-dashboard",
        component: () => import("@/views/investor/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboard"],
        },
      },
      {
        path: "invest",
        name: "invest",
        component: () => import("@/views/investor/Invest.vue"),
        meta: {
          pageTitle: "Invest",
          breadcrumbs: ["Invest"],
        },
      },
      {
        path: "portfolio",
        name: "portfolio",
        component: () => import("@/views/investor/Portfolio.vue"),
        meta: {
          pageTitle: "My Portfolio",
          breadcrumbs: ["Portfolio"],
        },
      },
      {
        path: "funds",
        name: "transfer-funds",
        component: () => import("@/views/investor/TransferFunds.vue"),
        meta: {
          pageTitle: "Transfer Funds",
          breadcrumbs: ["Transfer-Funds"],
        },
      },
      {
        path: "account/profile",
        name: "profile",
        redirect: "/investor/account/profile/overview",
        component: () => import("@/views/investor/Account.vue"),
        meta: {
          pageTitle: "My Profile",
          breadcrumbs: ["My-Profile"],
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/investor/account/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/investor/account/Settings.vue"),
            meta: {
              pageTitle: "Settings",
            },
          },
          {
            path: "subscriptions",
            name: "account-subscriptions",
            component: () => import("@/views/investor/account/Subscriptions.vue"),
            meta: {
              pageTitle: "Subscriptions",
            },
          },
          {
            path: "documents",
            name: "account-documents",
            component: () => import("@/views/investor/account/Documents.vue"),
            meta: {
              pageTitle: "My Documents",
            },
          },
        ],
      },

    ]
  },
];

const borrowerRoutes = [
  {
    path: "/borrower",
    redirect: "/borrower/dashboard",
    component: () => import("@/layouts/main-layout/borrower/BorrowerLayout.vue"),
    meta: {
      allowedUserTypes: ["borrower"],
    },
    children: [
      {
        path: "dashboard",
        name: "borrower-dashboard",
        component: () => import("@/views/borrower/BorrowerDashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboard"],
        },
      },
      {
        path: "payment-methods",
        name: "PaymentMethods",
        component: () => import("@/views/borrower/PaymentMethods.vue"),
        meta: {
          pageTitle: "Payment Methods",
          breadcrumbs: ["Payment Methods"],
        },
      },
      {
        path: "history",
        name: "LoanHistory",
        component: () => import("@/views/borrower/LoanHistory.vue"),
        meta: {
          pageTitle: "Loan History",
          breadcrumbs: ["Loan History"],
        },
      },
      {
        path: "profile",
        name: "BorrowerProfile",
        component: () => import("@/views/borrower/BorrowerProfile.vue"),
        meta: {
          pageTitle: "Profile",
          breadcrumbs: ["Profile"],
        },
      },
      {
        path: "edit-profile",
        name: "EditProfile",
        component: () => import("@/views/borrower/ProfileSettings.vue"),
        meta: {
          pageTitle: "Edit Profile",
          breadcrumbs: ["Profile", "Edit Profile"],
        },
      },
      {
        path: "loans/:id",
        name: "LoanDetails",
        component: () => import("@/views/borrower/LoanDetails.vue"),
        meta: {
          pageTitle: "Loan Details",
          breadcrumbs: ["Loan History", "Loan Details"],
        },
        props: true,
      },
    ]
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/sign-in",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      allowedUserTypes: ["investor", "borrower"],
    },
    children: [
      ...investorRoutes,
      ...borrowerRoutes,
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
            import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
            import("@/views/crafted/authentication/basic-flow/SignUpInvestor.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
            import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
        import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();


  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  try {
    // verify auth token before each page change
    await authStore.verifyAuth();

    // before page access check if page requires authentication
    if (to.meta.middleware == "auth") {
      if (authStore.isAuthenticated) {
        if (
            !to.meta.allowedUserTypes ||
            to.meta.allowedUserTypes.includes(authStore.user.user_type)
        ) {
          next();
        } else {
          // Redirect to 404 if user type is not allowed for this route
          next({name: "404"});
        }
      } else {
        next({name: "sign-in"});
      }
    } else {
      next();
    }
  } catch (error) {
    // Handle authentication verification error
    console.error("Authentication verification error:", error);
    next({name: "sign-in"});
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
