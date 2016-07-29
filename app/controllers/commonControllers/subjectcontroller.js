/**
 * Created by Whitebox on 3/13/2016.
 */
talentScreen.controller('subjectController', ['$scope', '$localStorage', 'tsCategory', 'tsQuizCount', '$timeout', function ($scope, $localStorage, tsCategory, tsQuizCount, $timeout) {
    $scope.toggle = false;
    $scope.videoIcon = false;
    $scope.options = {thickness: 200};
    $scope.limit = 3;
    $scope.categoryName = "Category";
    $scope.SortBy = "Sort by";
    $scope.orderByValue = "name";
    $scope.dropdown = [{name: "Popularity", fun: "-counts", id: 1}, {
        name: "Subjects",
        fun: "name",
        id: 2
    }, {name: "Latest Added", fun: "date", id: 3}];
    $scope.all = [{name: "ALL", fun: "category(0)"}];

    $scope.like = function () {
        alert("like me");
    };
    $scope.popularitys = function (item) {
        $scope.orderByValue = item.fun;
    };
    if (!$localStorage.subjectDesign) {
        tsQuizCount.query().$promise.then(function (response) {
            myShow(response);
              $scope.dataNew=response;
            loadMore();
            $localStorage.subjectDesign = response;
        });
    } else {
        $scope.dataNew = $localStorage.subjectDesign;
        loadMore();
    }
    if (!$localStorage.subjectCategory) {
        tsCategory.query().$promise.then(function (data) {
            $scope.dataNewCat = data;
            $localStorage.subjectCategory = data;
        });
    } else {
        $scope.dataNewCat = $localStorage.subjectCategory;
    }
    $scope.filter = function () {
        if ($scope.toggle) {
            $scope.toggle = false;
        }
        else {
            $scope.toggle = true;
        }
    };
    $scope.category = function (item) {
        var id = item.id;
        $scope.test = '';
        $scope.popularityShow = true;
        $scope.normal = false;
        $scope.subjectShow = true;
        $scope.latestShow = true;
        $scope.dataNew = [];
        $scope.SortBy = "Sort by";
        if (id == 0) {
            $scope.dataNew = $localStorage.subjectDesign;
            $scope.categoryName = "All";
        }
        for (var a = 0; a < $localStorage.subjectCategory.length; a++) {
            if ($localStorage.subjectCategory[a].id == id) {
                $scope.categoryName = $localStorage.subjectCategory[a].name;
            }
        }
        var categeorySubjects = $localStorage.subjectDesign;
        for (var i = 0; i < categeorySubjects.length; i++) {
            if ($localStorage.subjectDesign[i].categoryid == id) {
                $scope.dataNew.push($localStorage.subjectDesign[i]);
            }
        }
    }
    function myShow(response) {
        for (var i in response) {
            if (!response[i].icon_class) {
                response[i].icon_class = ' fa fa-book';

            }
            if (response[i].videoquiz == 0) {
                $scope.videoIcon = true;
            }
        }
    };
    function loadMore() {
        $scope.loadMore = function () {
            if ($scope.limit + 3 < $scope.dataNew.length) {
                $scope.limit += 3;
            } else {
                $scope.limit = $scope.dataNew.length;
            }
        };
        $scope.loadMore();
    };

}]).controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.buttonClicked = "";
    $scope.pieData=[
        {key: "TQ", y: 10},
        {key: "AQ", y: 20},
        {key: "CA", y: 30},
    ];
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 400,
            x: function (d) {
                return d.key;
            },
            y: function (d) {
                return d.y;
            },
            showLabels: true,
            duration: 100,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };
    $scope.toggleModal = function (btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };
}).directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ buttonClicked }} details</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

