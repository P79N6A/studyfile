
angular.module('ui.pagination', ["template/pagination/pagination.html"])

.controller('PaginationController', ['$scope', '$attrs', '$parse', '$interpolate', function ($scope, $attrs, $parse, $interpolate) {
  var self = this;

  this.init = function(defaultItemsPerPage) {
    if ($attrs.itemsPerPage) {
		$scope.itemsPerPage = $attrs.itemsPerPage;
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
        self.itemsPerPage = parseInt(value, 10);
        $scope.totalPages = self.calculateTotalPages();
      });
    } else {
      this.itemsPerPage = defaultItemsPerPage;
	  $scope.itemsPerPage = defaultItemsPerPage;
    }
	
	if($attrs.pageSize){
         $scope.pageSize = $attrs.pageSize.split(',');
	}else{
		$scope.showSelectedPage = false;
	}
  };

  this.noPrevious = function() {
    return this.page === 1;
  };
  this.noNext = function() {
    return this.page === $scope.totalPages;
  };

  this.isActive = function(page) {
    return this.page === page;
  };

  this.calculateTotalPages = function() {
	  return this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
  };

  this.getAttributeValue = function(attribute, defaultValue, interpolate) {
    return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
  };

  this.render = function() {
	    this.page = parseInt($scope.page, 10) || 1;
	    $scope.pages = this.getPages(this.page, $scope.totalPages);
	  };

  $scope.selectPage = function(page) {
    if ( ! self.isActive(page) && page > 0 && page <= $scope.totalPages) {
      $scope.page = page;
      $scope.onSelectPage({ page: page,pagesize:self.itemsPerPage });
    }
  };
  
  $scope.selectPageSize = function(value){
	self.itemsPerPage = parseInt(value, 10);
    $scope.totalPages = self.calculateTotalPages();
	$scope.onSelectPage({ page: this.page,pagesize: parseInt(value, 10)});
  };
  
  $scope.enterSubmit = function($event){
	  if ( ! self.isActive($scope.goPageNum) && $scope.goPageNum > 0 && $scope.goPageNum <= $scope.totalPages) {
		  if($event.keyCode == 13){
			  	$scope.page = $scope.goPageNum;
			  	$scope.onSelectPage({ page: $scope.goPageNum,pagesize: self.itemsPerPage});
				$event.preventDefault();
		}
	  }
  };

  $scope.$watch('totalItems', function() {
    $scope.totalPages = self.calculateTotalPages();
  });

  $scope.$watch('totalPages', function(value) {
    if ( $attrs.numPages ) {
      $scope.numPages = value; // Readonly variable
    }
    
    if ( self.page > value ) {
      $scope.selectPage(value);
    }else {
      self.render();
    }
  });

  $scope.$watch('page', function() {
    self.render();
  });
}])

.constant('paginationConfig', {
  itemsPerPage: 20,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last'
//  ,rotate: true
})

.directive('pagination', ['$parse', 'paginationConfig', function($parse, config) {
  return {
    restrict: 'EA',
    scope: {
      page: '=',
      totalItems: '=',
      onSelectPage:' &',
      numPages: '='
    },
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pagination.html',
    replace: true,
    link: function(scope, element, attrs, paginationCtrl) {

      // Setup configuration parameters
      var maxSize,
      boundaryLinks  = paginationCtrl.getAttributeValue(attrs.boundaryLinks,  config.boundaryLinks      ),
      directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks     ),
      itemsPerPage = paginationCtrl.getAttributeValue(attrs.itemsPerPage, config.itemsPerPage     ),
      firstText      = paginationCtrl.getAttributeValue(attrs.firstText,      config.firstText,     true),
      previousText   = paginationCtrl.getAttributeValue(attrs.previousText,   config.previousText,  true),
      nextText       = paginationCtrl.getAttributeValue(attrs.nextText,       config.nextText,      true),
      lastText       = paginationCtrl.getAttributeValue(attrs.lastText,       config.lastText,      true)
      //,rotate         = paginationCtrl.getAttributeValue(attrs.rotate,         config.rotate);

      scope.selectValue = itemsPerPage;
      
      scope.showSelectedPage = true;
      
      paginationCtrl.init(config.itemsPerPage);
      
      if (attrs.maxSize) {
        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
          maxSize = parseInt(value, 10);
          paginationCtrl.render();
        });
      }

      // Create page object used in template
      function makePage(number, text, isActive, isDisabled) {
        return {
          number: number,
          text: text,
          active: isActive,
          disabled: isDisabled
        };
      }

      paginationCtrl.getPages = function(currentPage, totalPages) {
        var pages = [];

        // Default page limits
        var startPage = 1, endPage = totalPages;
        var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

        // recompute if maxSize
//        if ( isMaxSized ) {
//          if ( rotate ) {
//            // Current page is displayed in the middle of the visible ones
//            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
//            endPage   = startPage + maxSize - 1;
//
//            // Adjust if limit is exceeded
//            if (endPage > totalPages) {
//              endPage   = totalPages;
//              startPage = endPage - maxSize + 1;
//            }
//          } else {
//            // Visible pages are paginated with maxSize
//            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;
//
//            // Adjust last page if limit is exceeded
//            endPage = Math.min(startPage + maxSize - 1, totalPages);
//          }
//        }

        // Add page number links
//        for (var number = startPage; number <= endPage; number++) {
//          var page = makePage(number, number, paginationCtrl.isActive(number), false);
//          pages.push(page);
//        }

        // Add links to move between page sets
//        if ( isMaxSized && ! rotate ) {
//          if ( startPage > 1 ) {
//            var previousPageSet = makePage(startPage - 1, '...', false, false);
//            pages.unshift(previousPageSet);
//          }
//
//          if ( endPage < totalPages ) {
//            var nextPageSet = makePage(endPage + 1, '...', false, false);
//            pages.push(nextPageSet);
//          }
//        }

        // Add previous & next links
        if (directionLinks) {
          var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
          pages.unshift(previousPage);

          var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
          pages.push(nextPage);
        }

        // Add first & last links
        if (boundaryLinks) {
          var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
          pages.unshift(firstPage);

          var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
          pages.push(lastPage);
        }
        return pages;
      };
    }
  };
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put(	"template/pagination/pagination.html",
	    "<div class=\"contPage\"><span>当前：{{page}}/{{totalPages}}</span>\n<span>共 {{totalItems}} 条记录</span>\n&nbsp;&nbsp;&nbsp;&nbsp;\n<span ng-show=\"showSelectedPage\">显示条数\n <select ng-model=\"selectValue\" ng-change=\"selectPageSize(selectValue)\" style=\"width:56px;\"><option ng-repeat=\"size in pageSize track by $index\">{{size}}</option></select></span>\n" +
	    "  <a ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\" ng-click=\"selectPage(page.number)\">{{page.text}}</a>\n" +
	    "  &nbsp;\n转到 <input type=\"text\" size=\"4\" class=\"pageBd\" ng-model=\"goPageNum\" ng-keydown=\"enterSubmit($event)\"/>\n<input type=\"button\" value=\"GO\" class=\"pageBtn\" ng-click=\"selectPage(goPageNum)\"/>" +
	    "</div>\n" +
    "");
}]);
