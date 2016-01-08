app.directive('petTable', function(){
  return {
    restrict: 'E',
    templateUrl: '/table/table.html',
    controller: ['$scope', '$http', 'httpFactory', function ($scope, $http, httpFactory) {

      //get all pets
      getPets = function (url) {
        httpFactory.get(url)
        .then(function(response){
          $scope.pets = response.data;
        });
      };

      getPets('api/pets');

      //delete pet
      $scope.deletePet = function (id) {
        httpFactory.delete('api/pet/' + id)
        .then(function(response){
        getPets('api/pets');
        });
      };

      //edit pet
      $scope.editPet = function (name, type, age, id) {
        var payload = {
          'name': name,
          'type': type,
          'age': age
        };
        httpFactory.put('api/pet/' + id, payload)
        .then(function(response){
        getPets('api/pets');
        });
      };

    }]
  };
});
