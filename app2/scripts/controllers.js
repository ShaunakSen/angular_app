myApp
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        console.log('here');
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = true;

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails
        };
        $scope.dishes = menuFactory.getDishes();

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = 'appetizer';
            }
            else if (setTab === 3) {
                $scope.filtText = 'mains';
            }
            else if (setTab === 4) {
                $scope.filtText = 'dessert';
            }
            else {
                $scope.filtText = '';
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

    }])
    .controller('ContactController', ['$scope', function ($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };
        $scope.channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
        $scope.invalidChannelSelection = false;

    }])
    .controller('FeedbackController', ['$scope', function ($scope) {

        $scope.sendFeedback = function () {
            console.log($scope.feedback);

            if ($scope.feedback.agree && $scope.feedback.mychannel == "") {
                $scope.invalidChannelSelection = true;
                console.log('incorrect option');
            }
            else {
                $scope.invalidChannelSelection = false;
                //here ideally u would issue AJAX call to send data to server
                // restore default values now
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
                $scope.feedbackForm.$setPristine();
                console.log('Restored default values.... ' + $scope.feedback);

            }
        }

    }])
    .controller('dishDetailController', ['$scope', '$stateParams', 'menuFactory',
        function ($scope, $stateParams, menuFactory) {

            $scope.search = '';

            var dish = menuFactory.getDish(parseInt($stateParams.id, 10));

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
        }])
    .controller('CommentFormController', ['$scope', function ($scope) {

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