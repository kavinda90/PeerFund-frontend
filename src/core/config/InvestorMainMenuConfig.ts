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
            route: "/investor/dashboard",
            keenthemesIcon: "element-11",
            bootstrapIcon: "bi-app-indicator",
        },
        {
            heading: "Invest",
            route: "/investor/invest",
            keenthemesIcon: "rocket",
            bootstrapIcon: "bi-layers",
        },
        {
            heading: "Portfolio",
            route: "/investor/portfolio",
            keenthemesIcon: "briefcase",
            bootstrapIcon: "bi-layers",
        },
        {
            heading: "Transfer Funds",
            route: "/investor/funds",
            keenthemesIcon: "bank",
            bootstrapIcon: "bi-layers",
        },
      ],
    },
    {
      heading: "account",
      route: "/investor/account",
      pages: [
        {
          heading: "My Profile",
          route: "/investor/account/profile",
          keenthemesIcon: "user",
          bootstrapIcon: "bi-layers",
        },
      ]
    }
  ];

  export default MainMenuConfig;
