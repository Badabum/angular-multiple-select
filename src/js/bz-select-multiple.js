angular.module("bz.select-multiple",["angular.filter"]);
angular.module("bz.select-multiple")
    .directive('bzSelectMultiple',function($parse){
        var selectOption = function(selectedCollection, item){
           selectedCollection.push(item);
        }
        var selectAll = function(allItems,selectedCollection,id){
            _.forEach(allItems,function(item){
                var index = _.findIndex(selectedCollection,function(selectedItem){
                    return selectedItem[id]===item[id];
                })
                if(index===-1){
                    selectedCollection.push(item);
                }
            });
        }
        var unselectAll = function(selectedCollection){
            selectedCollection.splice(0,selectedCollection.length);
        }
        var filterItems = function(allItems, filterParam, label){
            var result = [];
            for(var i = 0;i<allItems.length;i++){
                if(allItems[i][label].indexOf(filterParam)>-1){
                    result.push(allItems[i]);
                }
            }
            return result;
        }
        var isSelected = function(item,selectedItems,id){
            var index = _.findIndex(selectedItems,function(selectedItem){
                return selectedItem[id]===item[id];
            })
            return index>-1;
        }
        var unselectItem = function(selectedCollection,item,id){
            var index = _.findIndex(selectedCollection,function(selectedItem){
                return selectedItem[id]===item[id];
            })
            if(index>-1){
                selectedCollection.splice(index,1);
            }
        }
        var removeFromSelected = function(selectedCollection, allItems,id){
            var items = [];
            _.forEach(selectedCollection,function(selectedItem){
                var index = _.findIndex(allItems,function(item){
                    return selectedItem[id]===item[id];
                })
                if(index>-1)
                items.push(selectedCollection[index]);
            });
            selectedCollection.splice(0,selectedCollection.length);
            _.forEach(items,function(item){
                selectedCollection.push(item);
            });
        }
        var activate = function(allItems,selectedItems,id){

        }
        return{
            restrict:"E",
            replace:true,
            templateUrl:"/src/tmpl/bz-select-multiple.html",
            require:"ngModel",
            scope:{
                items:"=items",
                multiple:"=multiple",
                checkAll:"=checkAll",
                placeholder:"=placeholder",
                selectedMode:"=selectedMode",
                searchEnabled:"=searchEnabled",
                selectedCollection:"=ngModel",
                label:"=label",
                id:"=id"
            },
            link:function(scope,element,attrs,ngModel){
                scope.filterString = {text:""};
                scope.opened = false;
                scope.unselectOption = function(item){
                    unselectItem(scope.selectedCollection,item,scope.id);
                    delete item.selected;
                    ngModel.$setViewValue(scope.selectedCollection);
                }
                scope.advancedOptionsEnabled = scope.checkAll|scope.searchEnabled;
                scope.selectOption = function(item){
                    selectOption(scope.selectedCollection,item);
                    ngModel.$setViewValue(scope.selectedCollection);
                }
                scope.isSelected = function(item){
                    return isSelected(item,scope.selectedCollection,scope.id);
                }
                scope.openSelect = function(){
                    scope.opened=!scope.opened;
                }
                scope.selectAll  = function(){
                    selectAll(scope.items,scope.selectedCollection,scope.id);
                    ngModel.$setViewValue(scope.selectedCollection);
                }
                scope.unselectAll = function(){
                    unselectAll(scope.selectedCollection);
                    ngModel.$setViewValue(scope.selectedCollection);
                }
                scope.$watch(function(){
                    return scope.items.length;
                },function(newVal,oldVal){
                    //item was removed from collection outside directive
                    if(newVal<oldVal){
                        removeFromSelected(scope.selectedCollection,scope.items,scope.id);
                    }
                });
            }
        }
});
