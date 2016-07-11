myApp
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        console.log('here');
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = true;
        $scope.showMenu = false;
        $scope.message = 'Loading...';

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails
        };

        /*$scope.dishes = {};
         menuFactory.getDishes().then(
         function (response) {
         $scope.dishes = response.data;
         $scope.showMenu = true;
         // menu is now ready to be displayed
         },
         function (response) {
         $scope.message = "Error: " + response.status + " " + response.statusText;
         }
         );*/

        $scope.dishes = menuFactory.getDishes().query(
            function (response) {
                //success function
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                //error function
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

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
    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

        $scope.feedbackStatus = false;
        $scope.message = "";

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

                feedbackFactory.sendFeedback().save($scope.feedback,
                    function (response) {
                        $scope.feedbackStatus = true;
                        console.log(response);
                        //OK...Set Default Values Now
                        $scope.feedback = {
                            mychannel: "",
                            firstName: "",
                            lastName: "",
                            agree: false,
                            email: ""
                        };
                        $scope.feedbackForm.$setPristine();
                        console.log('Restored default values.... ' + $scope.feedback);
                        $scope.message = "Feedback Sent"

                    },
                    function (response) {
                        console.log(response);
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );


            }
        }

    }])
    .controller('dishDetailController', ['$scope', '$stateParams', 'menuFactory',
        function ($scope, $stateParams, menuFactory) {

            $scope.search = '';
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading...";

            /*menuFactory.getDish(parseInt($stateParams.id, 10)).then(
             function (response) {
             $scope.dish = response.data;
             $scope.showDish = true;
             },
             function (response) {
             $scope.message = "Error: " + response.status + " " + response.statusText;
             }
             );*/

            $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)}).$promise.then(
                function (response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

            function inArray(array, item) {
                for (var i = 0; i < array.length; ++i) {
                    if (array[i] === item) {
                        return true;
                    }
                }
                return false;
            }

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
    .controller('CommentFormController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

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
            $scope.compatibleObject.date = new Date().toISOString();
            console.log($scope.compatibleObject);

            $scope.dish.comments.push($scope.compatibleObject);

            //update on server

            menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);

            //restore defaults

            $scope.comments = {
                name: "",
                ratings: 5,
                comment: ""
            };

            $scope.commentsForm.$setPristine();
        }


    }])
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',
        function ($scope, menuFactory, corporateFactory) {

            /*$scope.dish = {};*/

            $scope.showPromotion = false;
            $scope.showDish = false;
            $scope.showLeader = false;
            $scope.message = "Loading...";
            $scope.promotions = menuFactory.getPromotions().query(
                function (response) {
                    //success function
                    $scope.showPromotion = true;
                    $scope.promotions = response;
                },
                function (response) {
                    //error function
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

            /*menuFactory.getDish(0).then(function (response) {
             $scope.dish = response.data;
             $scope.showDish = true;
             },
             function (response) {
             $scope.message = "Error: " + response.status + " " + response.statusText;
             }
             );*/

            $scope.dish = menuFactory.getDishes().get({id: 0})
                .$promise.then(function (response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );

            $scope.executiveChief = corporateFactory.getLeaders().get({id: 3})
                .$promise.then(function (response) {
                        $scope.showLeader = true;
                        $scope.executiveChief = response;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
        }])
    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.message = "Loading...";
        $scope.showLeaders = false;

        $scope.leaders = corporateFactory.getLeaders().query(
            function (response) {
                $scope.showLeaders = true;
                $scope.leaders = response;
            },
            function (response) {
                //error function
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        )
    }]);
// implement the IndexController and About Controller here