const path = require('path');
const uglify = require('uglifyjs-webpack-plugin'); // 引入js压缩插件
const htmlPlugin = require('html-webpack-plugin'); // html打包插件
const extractTextPlugin = require('extract-text-webpack-plugin'); // css 分离， 这个现在已经有最新的代替了

module.exports = {
  mode: 'development',
  entry:{
    // main:path.join(__dirname,'../src/main.js')
    main:'./src/main.js',
    main2: './src/main2.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/webpack-react',
    filename: '[name].js' // 这里 [name]告诉我们入口进去的文件是什么名字，打包出来也同样是什么名字
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        // css 分离后这里需要重新配置，下面注释了
        // use: [
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'}
        // ]
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader:'css-loader'},
            {loader: 'postcss-loader'}
          ]
        })
      },
      {
        test:/\.(png|jpg|gif|jpeg)/,
        use:[{
          loader:'url-loader',
          options: {
            limit: 500,
            outputPath:'images/'
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']  // 在hmtl文件中引入<img>标签的问题
      },
      {
        test: /\.less$/,
        // use: [
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'},
        //   {loader: 'less-loader'}
        // ]
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'less-loader'}
          ]
        })
      },
      {
        test: /\.scss$/,
        // use: [
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'},
        //   {loader: 'sass-loader'}
        // ]
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ]
        })
      },
      {
        test:/\.(jsx|js)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new uglify(), // js压缩
    new htmlPlugin({
      minify: { // 对html文件进行压缩
        removeAttributeQuotes: false  // 去掉属性的双引号
      },
      hash: true, // 为了开发中js有缓存效果，加hash，避免缓存js
      template: './src/index.html'
    }),
    new extractTextPlugin('css/index.css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    port: 8888
  }

}