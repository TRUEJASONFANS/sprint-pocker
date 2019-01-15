
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
      hardSource: true,
    }],
  ],
  "publicPath": "/static/",
  "proxy": {
    "/poker": {
      "target": "http://localhost:8080/",
      "changeOrigin": true,
      "pathRewrite": { "^/poker" : "poker" }
    }
  },
}
