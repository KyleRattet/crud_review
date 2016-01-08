app.directive('petTable', function(){
  return {
    restrict: 'E',
    templateUrl: '/table/table.html',
    controller: ['$scope', '$http', 'httpFactory',function ($scope, $http, httpFactory) {

      //get all pets
      getPets = function (url) {
        httpFactory.get(url)
        .then(function(response){
          $scope.pets = response.data;
          console.log(response.data)
        });
      };

      getPets('api/pets');

    }]
  };
});
