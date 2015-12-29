angular.module("bz.select-multiple",[]);
angular.module("bz.select-multiple")
    .directive('bzSelectMultiple',function($parse){
        var selectOption = function(selectedCollection, item){
           selectedCollection.push(item);
           item.selected = true;
        }
        var selectAll = function(allItems){
            var array = [];
            angular.forEach(allItems,function(item){
                array.push(item)
                item.selected = true;
            })
            return array;
        }
        var unselectAll = function(allItems, selectedCollection){
            selectedCollection = selectedCollection.splice(0,selectedCollection.length);
            angular.forEach(allItems,function(item){
                delete item.selected;
            })
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
        var isSelected = function(allItems,selectedItems,id){
            for(var i = 0;i<allItems.length;i++){
                for(var j = 0;j<selectedItems.length;j++){
                    if(allItems[i][id]==selectedItems[j][id]){
                        return true;
                    }
                }
            }
            return false;
        }
        var unselectItem = function(selectedCollection,item,id){
            var index;
            for(var i = 0;i<selectedCollection.length;i++){
                if(selectedCollection[i][id]===item[id]){
                    index=i;
                }
            }
            if(index!==undefined){
                selectedCollection = selectedCollection.splice(index,1);
            }
        }
        var initialize = function(allItems,selectedItems,id){
            var copy = [];
            angular.copy(selectedItems,copy);
            for(var i = 0;i<allItems.length;i++){
                for(var j = 0;j<copy.length;j++){
                    if(allItems[i][id]===copy[j][id]){
                        allItems[i].selected = true;
                        selectedItems[j] = allItems[i];
                        copy = copy.splice(j,1);
                    }
                }
            }
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
                scope.filteredItems = scope.items;
                initialize(scope.filteredItems,scope.selectedCollection,scope.id);
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
                scope.openSelect = function(){
                    scope.opened=!scope.opened;
                }
                scope.selectAll  = function(){
                    scope.selectedCollection = selectAll(scope.filteredItems);
                    ngModel.$setViewValue(scope.selectedCollection);
                }
                scope.unselectAll = function(){
                    unselectAll(scope.items,scope.selectedCollection);
                    ngModel.$setViewValue(scope.selectedCollection);
                }
                scope.$watch(function(){
                    return scope.filterString.text;
                },function(){
                    scope.filteredItems = filterItems(scope.items,scope.filterString.text,scope.label);
                });
            }
        }
})