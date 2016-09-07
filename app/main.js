"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_routes_1 = require("./app.routes");
var app_module_1 = require("./app.module");
var rxjs_1 = require("rxjs");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, [app_routes_1.appRouterProviders]);
var obsv = new rxjs_1.Observable(function (observer) {
    setTimeout(function () {
        observer.next(1);
    }, 1000);
    setTimeout(function () {
        observer.next("s");
    }, 2000);
    setTimeout(function () {
        observer.next(3);
    }, 3000);
    setTimeout(function () {
        observer.next(4);
    }, 1000);
});
// Subscription A
setTimeout(function () {
    obsv.subscribe(function (value) { return console.log(value); });
}, 0);
// Subscription B
setTimeout(function () {
    obsv.subscribe(function (value) { return console.log(" >>>> " + value); });
}, 2500);
//# sourceMappingURL=main.js.map