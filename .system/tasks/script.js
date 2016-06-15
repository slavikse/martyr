import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import notify from '../utility/notify';

let firstBuildReady = false;

const
  name = 'script',
  files = ['source/*.js'],
  there = 'public',

  production = process.env.NODE_ENV === 'production',
  webpack = webpackStream.webpack,

  /**
   * Сигнализирует о завершении первой сборки,
   * чтобы gulp смог продолжить выполнение.
   * Хотя webpack продолжит отслеживать файлы.
   * @type {Object} сигнал о завершении первой сборки
   */
  done = err => {
    firstBuildReady = true;

    if (err) {
      return 0
    }
  },

  options = {
    module: {
      loaders: [{
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }]
    },

    watch: !production,

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
      })
    ],

    devtool: production ? null : 'cheap-inline-module-source-map'
  };

if (production) {
  options.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

/**
 * Собираем скрипты с webpack и es6
 */
export default () => {
  gulp.task(name, cb => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(named())
      .pipe(webpackStream(options, null, done))
      .pipe(gulp.dest(there))
      .on('data', () => {
        if (firstBuildReady) {
          cb()
        }
      })
  })
}
