angular.module('bz.select-multiple').controller('mainCtrl',function($scope){
    var self = this;
    self.collection = [{id:1,name:"Item1",someProp:213},{id:2,name:"Item2",someProp:213}]
    self.selectedCollection = [{id:1,name:"Item1",someProp:213}];
    $scope.$watch(function(){
        return self.selectedCollection;
    },function(){
       console.log(self.selectedCollection);
    },true);
    self.addItem = function(){
        var newItem = {
            id:4,
            name:"Item4"
        };
        self.collection.push(newItem);
    }
    self.removeItem = function(){
        self.collection.splice(0,1);
    }
})
