const gulp = require('gulp');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const resolveDependencies = require('gulp-resolve-dependencies');
const concat = require('gulp-concat');
const headerComment = require('gulp-header-comment');

function scripts(done) {
    gulp.src('src/ghost-search.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.init())
        .pipe(resolveDependencies({
            pattern: /\* @requires [\s-]*(.*\.js)/g
        }))
        .pipe(concat('ghost-search.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            preserveComments: 'some'
        }))
        .pipe(headerComment(`
            <%= pkg.name %> <%= pkg.version %> (<%= pkg.homepage %>)
            <%= pkg.description %>
            Copyright <%= moment().format('YYYY') %> Haunted Themes (<%= pkg.author.url %>)
            Released under <%= pkg.license %> License
            Released on: <%= moment().format('D MMM YYYY') %>
        `))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'))
        done();
};

function watch(done) {
    gulp.watch('src/*.js', gulp.series('scripts'));
    done();  
};

exports.scripts= gulp.series(scripts);
exports.default = gulp.series(watch);
