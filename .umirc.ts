import { defineConfig } from 'umi';

export default defineConfig({
  locale: { antd: true },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/day/:date', component: '@/pages/day' },
  ],
  fastRefresh: {},
});
