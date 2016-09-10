/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  var ngVer = '@2.0.0-rc.4'; // lock in the angular package version; do not let it float to current!
  var routerVer = '@3.0.0-beta.2'; // lock router version
  var formsVer = '@0.2.0'; // lock forms version
  var routerDeprecatedVer = '@2.0.0-rc.2'; // temporarily until we update all the guides

  //map tells the System loader where to look for things
  var  map = {
    'app':                        'app',

    '@angular':                   '../node_modules/@angular', // sufficient if we didn't pin the version
    '@angular/router':            '../node_modules/@angular/router',
    '@angular/forms':            '../node_modules/@angular/forms' ,
    '@angular/router-deprecated': '../node_modules/@angular/router-deprecated' ,
    'angular2-in-memory-web-api': '../node_modules/angular2-in-memory-web-api', // get latest
    'rxjs':                       '../node_modules/rxjs',
    '@angular/core':                   '../node_modules/@angular/core',
     "ts": "../node_modules/plugin-typescript/",
     "typescript": "../node_modules/typescript/"


  };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs':                       { main:"Rx.js",defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    "ts": {main: "lib/plugin.js"},
    "typescript": {main: "lib/typescript.js",
                    meta: {"lib/typescript.js": {"exports": "ts"}
                          }
                  }
      };


  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'upgrade'
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = '../node_modules/@angular/' + pkgName ;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  // No umd for router yet
  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

  // Forms not on rc yet
  packages['@angular/forms'] = { main: 'index.js', defaultExtension: 'js' };

  // Temporarily until we update the guides
  packages['@angular/router-deprecated'] = { main: '/bundles/router-deprecated' + '.umd.js', defaultExtension: 'js' };

  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/