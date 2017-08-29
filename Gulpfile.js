const gulp = require('gulp'),
      path = require('path'),
      less = require('gulp-less'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      ts = require('gulp-typescript'),
      jshint = require('gulp-jshint'),
      csslint = require('gulp-csslint'),
      minifyCss = require('gulp-minify-css'),
      htmlLint = require('gulp-html-linter'),
      sourcemaps = require('gulp-sourcemaps'),
      htmlmin = require('gulp-html-minifier2'),
      config = require('./config.gulp.plugins'),
      webserver = require('gulp-webserver');

const vendorsJS = [
        "./node_modules/angular/angular.js",
        "./node_modules/angular-ui-router/release/angular-ui-router.js",
        "./node_modules/jquery/dist/jquery.js",
        "./node_modules/moment/min/moment-with-locales.min.js",
        "./node_modules/gerador-validador-cpf/dist/js/CPF.js"
      ],
      vendorsCSS = [
        "./node_modules/bootstrap/dist/css/bootstrap.css",
        "./node_modules/bootstrap/dist/css/bootstrap-theme.css"        
      ],
      testesSpecsCore = [
          "./node_modules/jasmine-core/lib/jasmine-core/jasmine.js",
          "./node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js",
          "./node_modules/jasmine-core/lib/jasmine-core/boot.js"
      ];

/**
 * Copia o style do teste
 */
gulp.task("copycssSpec", () => {
    return gulp.src("./node_modules/jasmine-core/lib/jasmine-core/jasmine.css")
            .pipe(gulp.dest("./specs"))
});

/**
 * Faz o bundle do core de testes
 */
gulp.task("jsTestSpec", () => {
    return gulp.src(testesSpecsCore)
            .pipe(concat("jasmine.js"))
            .pipe(gulp.dest("./specs"))
});

/**
 * Compila js da aplicação e passa para os teste
 */
gulp.task('scriptsBuildTests', () => {
    return gulp.src('./src/ts/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'app.min.js'
    }))
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(sourcemaps.write('maps', {
        mapSources: (sourcePath) => `./maps/${sourcePath}`
    }))
    .pipe(gulp.dest("./specs"));
});

/**
 * Prepara os vendors para testes
 */
gulp.task('compressVendorJSTests', (cb) => {
    let files = Array.from(vendorsJS);
    files.push("./node_modules/angular-mocks/angular-mocks.js");
    return gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(concat("vendors.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write('maps', {
        mapSources: (sourcePath) => `./maps/${sourcePath}`
    }))
    .pipe(gulp.dest("./specs"));
});

/**
 * Executa as tarefas para preparar as specs de teste
*/
gulp.task("testPrepare", ["copycssSpec", "jsTestSpec", "scriptsBuildTests", "compressVendorJSTests"]);

/**
 * Tarefa para rodar um server local
 */
gulp.task('webserver', function() {
    gulp.src('./public/')
        .pipe(webserver({
            livereload: {
                enable: true,
                filter: function(fileName) {
                    if (fileName.match(/.map$/)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    ));
});

/**
 * Tarefa para rodar um server local para teste
 */
gulp.task('webservertest', ["testPrepare"], function() {
    gulp.src('./specs/')
        .pipe(webserver({
            livereload: {
                enable: true,
                fallback: 'SpecRunner.html',
                filter: function(fileName) {
                    if (fileName.match(/.map$/)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    ));
});

/**
 * Tarefa para minificar e arrumar o html da aplicação
 */
gulp.task('minifyHtml', () => {
    return gulp.src('./src/html/**/*.html')
        .pipe(htmlLint(config.HTMLINTER))
        .pipe(htmlLint.format())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public'));
});

/**
 * Tarefa para compilar e comprimir todos os arquivos de less na aplicação
 */
gulp.task('lessCompile', () => {
    return gulp.src('./src/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            filename: 'style.less'
        }))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `./maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/css'));
});

/**
 * Tarefa para compilar e comprimir os arquivos de typescript da aplicação
 */
gulp.task('scriptsBuild', () => {
    return  gulp.src('./src/ts/**/*.ts')
                .pipe(sourcemaps.init())
                .pipe(ts({
                    noImplicitAny: true,
                    outFile: 'app.min.js'
                }))
                .pipe(jshint())
                .pipe(jshint.reporter())
                .pipe(uglify())                
                .pipe(sourcemaps.write('maps', {
                    mapSources: (sourcePath) => `./maps/${sourcePath}`
                }))
                .pipe(gulp.dest("./public/assets/js"));
});

/**
 * Tarefa para comprimir todos os JSs de terceiros usados na aplicação
 */
gulp.task('compressVendorJS', (cb) => {
    return gulp.src(vendorsJS)
                .pipe(sourcemaps.init())
                .pipe(concat("vendors.min.js"))
                .pipe(uglify())
                .pipe(sourcemaps.write('maps', {
                    mapSources: (sourcePath) => `./maps/${sourcePath}`
                }))
                .pipe(gulp.dest("./public/assets/js"));
});

/**
 * Tarefa para comprimir todos os CSSs de terceiros usados na aplicação
 */
gulp.task('compressVendorCSS', (cb) => {
    return gulp.src(vendorsCSS)
        .pipe(sourcemaps.init())
        .pipe(concat("vendors.min.css"))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `./maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/css'));
});

//Tarefa default para observar as modificações e atualizar os arquivos
gulp.task('default', ['webserver'], () => {
    gulp.watch("./src/ts/**/*.ts", ["scriptsBuild"]);
    gulp.watch("./src/less/**/*.less", ["lessCompile"]);
    gulp.watch("./src/html/**/*.html", ["minifyHtml"]);
});