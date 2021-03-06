/**
 * Created by Nick on 6/23/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('adminController', adminController);

    function adminController($rootScope,
                             $location,
                             adminService,
                             $scope) {
        var model = this;
        model.roles = ['user', 'contributor', 'admin'];

        function init() {
            model.user = $rootScope.currentUser;
            adminService.users()
                .then(function (res) {
                    model.users = res.data;
                    for (var u in model.users) {
                        $scope.$watch('model.users[' + u +']',
                        function (newVal, oldVal) {
                            if (oldVal.role !== newVal.role) {
                                adminService.updateUserRole(newVal._id, newVal.role);
                            }
                        }, true);
                    }
                });
        }
        init();

        model.removeUser = function (userId) {
            adminService.deleteUser(userId)
                .then(function (res) {
                    for (var u in model.users) {
                        if (model.users[u]._id === userId)
                            model.users.splice(u, 1);
                    }
                }, function (err) {
                    // show error

                })
        };
    }
})();