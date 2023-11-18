export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    keenthemesIcon?: string;
    bootstrapIcon?: string;
    sub?: Array<MenuItem>;
  }

  const MainMenuConfig: Array<MenuItem> = [
    {
      pages: [
        {
          heading: "Dashboard",
          route: "/borrower/dashboard",
          keenthemesIcon: "home",
        },
        {
          heading: "Payment Methods",
          route: "/borrower/payment-methods",
          keenthemesIcon: "bill",
        },
        {
          heading: "Loan History",
          route: "/borrower/history",
          keenthemesIcon: "calendar",
        },
        {
          heading: "Profile",
          route: "/borrower/profile",
          keenthemesIcon: "user",
        },
        {
          heading: "sample-dashboard",
          route: "/borrower/sample-dashboard",
          keenthemesIcon: "home-1",
        },
      ],
    },
  ];

  export default MainMenuConfig;
