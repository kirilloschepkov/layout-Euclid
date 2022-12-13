const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const map = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const imageWebp = require('gulp-webp');

//clean dist directory
const clean = () => {
  return del('dist/*')
}

// styles
const styles = () => {
  return src(['./src/css/normalize.css', './src/css/style.css', './src/css/media.css', './src/css/**/*.css'])
    .pipe(map.init())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(concat('styles.min.css'))
    .pipe(map.write('.'))
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream());
};

//scripts
const scripts = () => {
  return src('./src/js/**/*.js')
    .pipe(map.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(concat('scripts.min.js'))
    .pipe(map.write('.'))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
}

//simple export
const exportResources = () => {
  return src('./src/resources/**')
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

const exportFonts = () => {
  return src('./src/fonts/*')
    .pipe(dest('./dist/fonts'))
    .pipe(browserSync.stream());
}

// convert in webp
const images = () => {
  return src('./src/img/*.{jpg,jpeg,png}')
    .pipe(imageWebp())
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
};

//export other images
const imagesOther = () => {
  return src([
    './src/img/default/*.{jpg,jpeg,png,svg}',
    './src/img/favicon/*'
  ])
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
};

//svg sprite
const svgSprites = () => {
  return src('./src/img/svg/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
}

//minify html
const html = () => {
  return src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

//check change
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
  });

  watch('./src/css/**/*.css', styles);
  watch('./src/*.html', html);
  watch('./src/js/**/*.js', scripts);
  watch('./src/resources/**', exportResources);
  watch('./src/fonts/**', exportFonts);
  watch('./src/img/default/*.{jpg,jpeg,png,svg}', imagesOther);
  watch('./src/img/*.{jpg,jpeg,png}', images);
  watch('./src/img/svg/*.svg', svgSprites);
}

exports.default = series(clean, scripts, styles, exportResources, exportFonts, images, imagesOther, svgSprites, html, watchFiles);
