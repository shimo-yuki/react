module.exports = {
  entry: './src/main.js',
  mode: 'production',
  output: {
    filename: './out/bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets:['es2015', 'react']
        }
      }
    ]
  }
};


