import gulp from 'gulp';
import watch from '../utility/watch';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import spritesmith from 'gulp.spritesmith';

const
  name = 'sprite',
  files = 'source/**/sprite/*',
  there = 'public/image';

/**
 * Создает из изображений спрайт и стили для использования
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
      })).pipe(gulp.dest(there))
  })
}
