// export const adminRoutes = [
//   {
//     title: "User Management",
//     items: [
//       {
//         title: "Analytics",
//         url: "/analytics",
//       },
//     ],
//   },
// ];

export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}
