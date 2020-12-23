
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/register', name: 'register', component: () => import('pages/Register.vue'), meta: { guest: true} },
      { path: '/login', name: 'login', component: () => import('pages/Login.vue'), meta: { guest: true} },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/CustomerLayout.vue'),
    children: [
      { path: '/customer', name: 'customer', component: () => import('pages/Customer.vue'), meta: { auth: true} },
      { path: '/CustomerPage1', name: 'CustomerPage1', component: () => import('pages/CustomerPage1.vue'), meta: { auth: true} },
      { path: '/CustomerPage2', name: 'CustomerPage2', component: () => import('pages/CustomerPage2.vue'), meta: { auth: true} },
      { path: '/CustomerPage3', name: 'CustomerPage3', component: () => import('pages/CustomerPage3.vue'), meta: { auth: true} },
      { path: '/CustomerPage4', name: 'CustomerPage4', component: () => import('pages/CustomerPage4.vue'), meta: { auth: true} },
      { path: '/CustomerPage5', name: 'CustomerPage5', component: () => import('pages/CustomerPage5.vue'), meta: { auth: true} },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/v1Qx0KjofMgKSil77BRls2ofs5s1', name: 'v1Qx0KjofMgKSil77BRls2ofs5s1', component: () => import('pages/Admin.vue'), meta: { auth: true} },
      { path: '/v1Qx0KjofMgKSil77BRls2ofs5s1/my_profile', name: 'my_profile', component: () => import('pages/my_profile.vue'), meta: { auth: true} },
      { path: '/v1Qx0KjofMgKSil77BRls2ofs5s1/customer_management', name: 'customer_management', component: () => import('pages/customer_management.vue'), meta: { auth: true} },
      { path: '/v1Qx0KjofMgKSil77BRls2ofs5s1/department', name: 'department', component: () => import('pages/department.vue'), meta: { auth: true} },

    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}



export default routes
