
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'spoker-react',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  "proxy": {// 配置fetch 路由转发至后台API服务地址.
    "/poker": {
      "target": "http://localhost:8080/",
      "changeOrigin": true
    },
    "/api": {
      "target": "http://localhost:8080/",
      "changeOrigin": true
    }
  },
}
