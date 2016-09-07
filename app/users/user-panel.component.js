"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Hienadz on 05.09.16.
 */
var core_1 = require('@angular/core');
var user_service_1 = require("./user.service");
var router_1 = require("@angular/router");
var authenticate_service_1 = require("./authenticate.service");
var user_model_1 = require("../models/user.model");
var forms_1 = require("@angular/forms");
var UserPanelComponent = (function () {
    function UserPanelComponent(userService, authService, router) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
    }
    UserPanelComponent.prototype.ngAfterViewChecked = function () {
        Materialize.updateTextFields();
    };
    UserPanelComponent.prototype.initAndGetUser = function () {
        if (this.authService.getCurrentUser())
            return this.authService.getCurrentUser();
        if (!this.user)
            this.user = new user_model_1.User();
        return this.user;
    };
    UserPanelComponent.prototype.onFormChange = function (checked) {
        this.isRegistrationForm = !checked;
        this.error = "";
    };
    UserPanelComponent.prototype.onBack = function () {
        this.router.navigate(['list']);
    };
    UserPanelComponent.prototype.onLogout = function () {
        this.authService.logout();
        this.initAndGetUser();
    };
    UserPanelComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.isRegistrationForm) {
            this.isPending = true;
            this.userService.createItem(this.user).subscribe(function (t) {
                if (t.success) {
                    _this.isPending = false;
                    _this.form.reset();
                }
                else {
                    _this.isPending = false;
                    _this.error = t.message;
                }
            });
        }
        else {
            this.isPending = true;
            this.authService.login(this.user).subscribe(function (t) {
                if (t.success) {
                    _this.isPending = false;
                    _this.form.reset();
                }
                else {
                    _this.isPending = false;
                    _this.error = t.message;
                }
            });
        }
    };
    UserPanelComponent.prototype.ngOnInit = function () {
        this.initAndGetUser();
        this.isRegistrationForm = true;
        this.isPending = false;
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm), 
        __metadata('design:type', forms_1.NgForm)
    ], UserPanelComponent.prototype, "form", void 0);
    UserPanelComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/users/user-panel.component.html',
            styleUrls: ['app/users/user-panel.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, authenticate_service_1.AuthenticateService, router_1.Router])
    ], UserPanelComponent);
    return UserPanelComponent;
}());
exports.UserPanelComponent = UserPanelComponent;
//# sourceMappingURL=user-panel.component.js.map