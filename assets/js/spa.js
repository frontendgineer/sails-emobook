var app = angular.module('Platzi', ['ngSails']);
// app.config('$sailsProvider', function ($sailsProvider) {
//    $sailsProvider.url = 'http://localhost';
// });
app.controller('BaseCtrl', ['$scope', '$sails', function ($scope, $sails) {

    //    $scope.emojis = [];

    //   io.socket.get('/emoji', function(data) {
    //       $scope.emojis = data;
    //       $scope.$apply();
    //    });

    //   io.socket.on('emoji', function(event) {
    //       if (event.verb === 'created') {
    //           $scope.emojis.push(event.data);
    //           $scope.$apply();
    //       }
    //   });

    $scope.emojis = $scope.emojis || [];

    $sails.get('/emoji')
        .then(
            function (response) {
                $scope.emojis = response.data;
            },
            function (response) {
                alert("we have a problem")
            }
            );

    //watching for updates
    var emojiHandler = $sails.on('emoji', function (event) {
        if (event.verb === "created") {
            $scope.emojis.push(event.data);
        }
    });

    // Stop watching for updates
    $scope.$on('$destroy', function () {
        $sails.off('emoji', emojiHandler);
    });
}]);
