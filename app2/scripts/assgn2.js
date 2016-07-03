var app = angular.module('confusionApp', []);

app.controller('dishDetailController', ['$scope', function ($scope) {
    $scope.search = '';

    var dish = {
        name: 'Uthapizza',
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables, living in conFusion!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
            },
            {
                rating: 4,
                comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites",
                date: "2014-09-05T17:57:28.556094Z"
            },
            {
                rating: 3,
                comment: "Eat it, just eat it!",
                author: "Michael Jaikishan",
                date: "2015-02-13T17:57:28.556094Z"
            },
            {
                rating: 4,
                comment: "Ultimate, Reaching for the stars!",
                author: "Ringo Starry",
                date: "2013-12-02T17:57:28.556094Z"
            },
            {
                rating: 2,
                comment: "It's your birthday, we're gonna party!",
                author: "25 Cent",
                date: "2011-12-02T17:57:28.556094Z"
            }

        ]
    };

    function inArray(array, item) {
        for (var i = 0; i < array.length; ++i) {
            if (array[i] === item) {
                return true;
            }
        }
        return false;
    }

    $scope.dish = dish;
    $scope.order = function (param) {
        orderString = '';
        var acceptable2 = ['-rating', '-date', '-author', '-comment'];
        var acceptable = ['rating', 'date', 'author', 'comment'];
        if (param.charAt(0) === '-') {
            if (inArray(acceptable2, param)) {
                return param;
            }
            else {
                return '';
            }
        }
        else {
            if (inArray(acceptable, param)) {
                return param;
            }
            else {
                return '';
            }
        }
    }
}]);

app.controller('CommentFormController', ['$scope', function ($scope) {

    //SETTING DEFAULT VALUES
    $scope.comments = {
        name: "",
        ratings: 5,
        comment: ""
    };

    $scope.validateTextarea = function () {
        return $scope.comments['comment'] == "" && !$scope.commentsForm.comment.$pristine;

    };

    $scope.validateForm = function () {
        if ($scope.commentsForm.$invalid) {
            return false;
        }
        else {
            var comment = $scope.comments.comment;
            if (comment != "")
                return true;
        }
    };

    $scope.processComment = function () {
        $scope.addPreview();
    };

    $scope.addPreview = function () {
        $scope.compatibleObject = {
            author: "",
            rating: 5,
            comment: "",
            date: "Ok"
        };
        $scope.compatibleObject.author = $scope.comments.name;
        $scope.compatibleObject.rating = $scope.comments.ratings;
        $scope.compatibleObject.comment = $scope.comments.comment;
        $scope.compatibleObject.date = new Date();
        console.log($scope.compatibleObject);

        $scope.dish.comments.push($scope.compatibleObject);
        //restore defaults

        $scope.comments = {
            name: "",
            ratings: 5,
            comment: ""
        };

        $scope.commentsForm.$setPristine();
    }


}]);