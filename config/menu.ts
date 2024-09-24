export const menuItems = [
  {
    id: "home",
    icon: "pi pi-home",
    label: "home",
    to: `/home/status`,
  },
  {
    id: "internet",
    icon: "pi pi-globe",
    label: "internet",
    to: `/internet/setting`,
  },
  {
    id: "wireless",
    icon: "pi pi-wifi",
    label: "wireless",
    to: `/wireless/setting`,
  },
  {
    id: "devices",
    icon: "pi pi-id-card",
    label: "devices",
    to: `/devices/status`,
  },
  {
    id: "setting",
    icon: "pi pi-table",
    label: "more",
    to: `/setting/`,
    subs: [
      {
        icon: "pi pi-times",
        label: "system",
        to: `/setting/second/`,
        subs: [
          {
            icon: "pi pi-times",
            label: "account",
            to: `/setting/account/`,
          },
          {
            icon: "pi pi-times",
            label: "node",
            to: `/setting/node/`,
          },
        ],
      },
    ],
  },
];
