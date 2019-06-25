/* eslint max-len:0, no-console:0, func-names: 0, no-mixed-operators:0 */
const gulp = require('gulp');
const changed = require('gulp-changed');
const size = require('gulp-size');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const merge = require('merge-stream');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');

// https://github.com/twolfson/gulp.spritesmith
function createSprite(src, fileName, cssTemplate, externalClassName = 'sprite') {
  const spriteData = gulp.src(src)
    .pipe(spritesmith({
      imgName: `spriteSheet/${fileName.split('.')[0]}.png`,
      cssName: `spriteSheet/${fileName}`,
      padding: 4,
      imgOpts: {
        quality: 100,
      },
      cssTemplate,
      cssHandlebarsHelpers: {
        externalName(name) {
          let className = name;
          if (/^\d/.test(className)) {
            className = `a__${name}`;
          }
          return `.${externalClassName}.${className}`;
        },
        ifIndexOfBTN(name, options) {
          if (name.indexOf('_btn') !== -1) {
            return options.fn(this);
          }
          return options.inverse(this);
        },
        half(value) {
          return `${Math.floor(value / 2)}px`;
        },
        hoverPosition(position, height) {
          return `${position - Math.floor(height / 2)}px`;
        },
        percent(value, base) {
          return `${(value / base) * 100}%`;
        },
        bgPosition(spriteSize, imgSize, offset) {
          const result = (offset / (imgSize - spriteSize)) * 100;
          if (Number.isNaN(result)) {
            return '0';
          }
          return `${result}%`;
        },
      },
    }));
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('src/img_src/'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('src/css'));
  return merge(imgStream, cssStream);
}


gulp.task('sprite', () => {
  const basicTemplate = 'src/css/base/handlebars/basic.hbs';
  const basicMobile = 'src/css/base/handlebars/basic_m.hbs';

  const a = [
    createSprite('src/asset/sprite_src/*', 'sprite.css', basicTemplate),
    createSprite('src/asset/sprite_src_m/*', 'sprite_m.css', basicMobile),
  ];
  return merge(...a);
});


gulp.task('m', () => {
  const imgSrc = [
    'src/img_src/**/*.+(jpg|png|gif)',
    '!src/img_src/_*',
  ];
  const otherSrc = imgSrc.map(imgPath => (imgPath.indexOf('!') === 0 ? imgPath.substr(1) : `!${imgPath}`));
  const imgDest = 'src/asset/img';

  const taskOtherSrc = gulp.src(otherSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(imgDest));

  const taskImgSrc = gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(imagemin([
      imageminMozjpeg({ quality: 90 }),
      imageminPngquant({ quality: 90 }),
    ]))
    .pipe(gulp.dest(imgDest));

  return merge(taskOtherSrc, taskImgSrc);
});

gulp.task('watch', () => {
  gulp.watch('src/img_src/**/*', ['m']);
  // gulp.watch( 'src/asset/sprite_src/**/*', [ 'sprite' ] );
});

gulp.task('default', ['m', 'watch']);
