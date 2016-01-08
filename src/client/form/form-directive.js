app.directive('petForm', function(){
  return {
    restrict: 'E',
    templateUrl: 'form/form.html',
    controller: ['$scope', '$http', 'httpFactory',function ($scope, $http, httpFactory) {

      $scope.pet = {};

      //Add Pet
      $scope.addPet = function (){
        var payload = $scope.pet;
        httpFactory.post('/api/pet', payload)
        .then(function(response){
            $scope.pet = {};
            getPets('api/pets');
          });
      };


    }]
  };
});
