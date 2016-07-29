talentScreen.controller('myChallengesController', ['$scope', 'myChallengeService', '$localStorage', '$cookieStore', '$modal', function ($scope, myChallengeService, $localStorage, $cookieStore, $modal) {
    var filterData = {};
    $scope.toggle = false;
    $scope.results = false;
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.totalItems = 0;
    $scope.count = [{id: 50, name: "50"}, {id: 100, name: "100"}, {id: 500, name: "500"}, {id: 1000, name: "1000"}];
    $scope.options = {thickness: 200};
    $scope.begin = 0;
    $scope.end = 0;
    $scope.options2 = {width: 500, height: 300, 'bar': 'aaa'};
    $scope.dataBar = [1, 2, 3, 4];
    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };
    $scope.barValue = 'None';
    $scope.quizTypes = $localStorage.quizType;
    var jsonData = {candidateid: $localStorage.candidateSessionData.data._id};
    filterData.candidateid = $localStorage.candidateSessionData.data._id;
    getChallengeData();
    $scope.showVideo = function (id) {
        $scope.videoid="http://www.youtube.com/embed/hgrc6WJ2VRI";
        var modalInstance = $modal.open({
            templateUrl: '/app/directives/views/studentDirectiveViews/myChallengeDetails.html',
            scope:$scope
        });
        modalInstance.result.then(function (selectedItems) {
            //products = selectedItems;
        }, function () {

        });
    }
    $scope.toggleModal = function (btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };
    $scope.options1 = {

        chart: {
            type: 'discreteBarChart',
            height: 150,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',f')(d);
            },
            transitionDuration: 100,
            xAxis: {
                axisLabel: 'Questions',
                axisLabelDistance: 5
            },
            yAxis: {
                axisLabel: 'Time in sec',
                axisLabelDistance: 5
            }
        }
    };
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 200,
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

    $scope.countChange = function () {
        $scope.numPerPage = $scope.selectCount;
    }
    $scope.reFresh = function () {
        $scope.challengessData = "";
        getChallengeData();
    }
    $scope.settings = function () {
        if ($scope.toggle) {
            $scope.toggle = false;
        }
        else {
            $scope.toggle = true;
        }
    }
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    $scope.paginate = function (value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.challengessData.indexOf(value);
        $scope.begin = begin;
        $scope.end = end;
        return (begin <= index && index < end);
    };
    $scope.subjectChange = function (value) {
        filterData.subject = value.name;
        myChallengeService.searchData(filterData).then(function (data) {
            sourceData(data);
        });
    }
    $scope.quizChange = function (value) {
        var quizName = value.name;
        filterData.quiztype = quizName.split(" ")[0];
        myChallengeService.searchData(filterData).then(function (data) {
            sourceData(data);
        });
    };
    myChallengeService.subjectDropDown().then(function (data) {
        $scope.subjectData = data;
    });
    function getChallengeData() {
        myChallengeService.getData(jsonData).then(function (data) {
            sourceData(data);
        });

    }

    function sourceData(data) {
        var source = data;
        for (var i = 0; i < data.length; i++) {
            source[i].pieData = [
                {key: "TQ", y: data[i].questions.length},
                {key: "AQ", y: data[i].atempted ? data[i].atempted : 0},
                {key: "CA", y: data[i].correctanswers ? data[i].correctanswers : 0},
            ];
            source[i].date = data[i].date.split(' ')[3] + "-" + data[i].date.split(' ')[2] + "-" + data[i].date.split(' ')[1];
            source[i].subject = data[i].subjectDetails.subjectName;
            source[i].quiz = data[i].quizdetails.quiztypename;
            var barchatGraph=[];
            for(var j=0;j<data[i].questions.length;j++){
                barchatGraph[j]={"label":j+1,"value":data[i].questions[j].timetaken};
            }
            source[i].pieData2 = [{
                key: "Cumulative Return",
                values:barchatGraph
            }]

        }

        $scope.challengessData = source;
        $scope.totalItems = $scope.challengessData.length;
    }

}]);








