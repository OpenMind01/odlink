"use strict";

var odilinkApp = angular.module('odilinkApp', ['ngSanitize','ui.bootstrap','ui.select','ngDragDrop'])


    //  отслеживание contenteditable элементов

    // .directive('contenteditable', function() {
    //   return {
    //     require: 'ngModel',
    //     link: function(scope, elm, attrs, ctrl) {
    //       // вид -> модель
    //       elm.bind('blur keyup change', function() {
    //         scope.$apply(function() {
    //           ctrl.$setViewValue(elm.html());
    //         });
    //       });

    //       elm.bind('click' , function(){
    //         return false;
    //       });
     
    //       // модель -> вид
    //       ctrl.$render = function(value) {
    //         elm.html(value);
    //       };
     
    //       // загрузка начального значения из DOM
    //       //ctrl.$setViewValue(elm.html());
    //     }
    //   };
    // })


  //   .directive('contenteditable', function($sce,$timeout) {
  //   return {
  //     restrict: 'A', // only activate on element attribute
  //     require: '?ngModel', // get a hold of NgModelController
  //     link: function(scope, element, attrs, ngModel) {
  //       if(!ngModel) return; // do nothing if no ng-model
 
  //       // Specify how UI should be updated
  //       ngModel.$render = function() {
  //         var value = ngModel.$viewValue || '';
  //         //element.html($sce.trustAsHtml(value));
  //         element.html($sce.getTrustedHtml(value));
  //       };

  //       element.bind('click' , function(){
  //         return false;
  //       });

  //       // element.bind('keydown', function (e) {
  //       //   if (e.keyCode === 13) {
  //       //     $timeout(function () {
  //       //       scope.$apply("<br>");
  //       //     });
  //       //   }
  //       // });
 
  //       // Listen for change events to enable binding
  //       element.bind('blur change keyup', function (e) {
  //         if (e.keyCode === 13) {
  //           $timeout(function () {
  //             scope.$apply(attrs.enterKey);
  //           }, +attrs.enterKeyDelay);
  //         }else
  //         {
  //           scope.$apply(read);  
  //         }
          
  //         return false;
  //       });
  //       //read(); // initialize
 
  //       // Write data to the model
  //       function read() {
  //         ngModel.$setViewValue(element.html());
  //       }
  //     }
  //   };
  // })

    .directive('contenteditable', function contenteditableDir() {
        return {
          restrict: 'A', // only activate on element attribute
          require: '?ngModel', // get a hold of NgModelController
          link: function(scope, element, attrs, ngModel) {
            if(!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function renderFn() {
              element.html(ngModel.$viewValue || element.html() || '');
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function onListen() {
              scope.$apply(read);
            });

            element.on('keydown', function onEnter(e){
                if(attrs.noEnter && e.keyCode == 13)
                {
                    return false;
                }
            });

            element.on('click' , function onClick(){
              return false;
            });
            //ngModel.$render(); // initialize

            // Write data to the model
            function read() {
              var html = element.html();
              // When we clear the content editable the browser leaves a <br> behind
              // If strip-br attribute is provided then we strip this out
              if( attrs.stripBr && html == '<br>' ) {
                html = '';
              }
              ngModel.$setViewValue(html);
            }
          }
        };
    })


//  Controllers

    .controller('mainCtrl', ['$scope','$sce', function($scope,$sce) {

        $scope.selectExample = {
            selected: undefined,
            options:[
                {name: 'Monday'},
                {name: 'Tuesday'},
                {name: "Wednesday"},
                {name: "Thursday"},
                {name: "Friday"},
                {name: "Saturday"},
                {name: "Sunday"}
            ]
        };

        $scope.exampleObj = [
          {
              type: 'rating',
              options: [
                  {max: 5}
              ]
          },
          {
              type: 'radio',
              options:[
                  {title:'Radio Button', value: 'yes'}
              ]
          },
          {
              type: 'checkbox',
              options:[
                  {title:'Option 1', value: 'opt1'}
              ]
          },
          {
              type: 'select',
              options:[
                  {title: 'Monday'},
                  {title: 'Tuesday'},
                  {title: "Wednesday"},
                  {title: "Thursday"},
                  {title: "Friday"},
                  {title: "Saturday"},
                  {title: "Sunday"}
              ]
          },
          {
              type: 'text',
              options:[
                  {placeholder:'Some text'}
              ]
          }
        ];

        $scope.editMode = function (current) {
            for(var i=$scope.jsonObj.questions.length;i--;)
            {
                $scope.jsonObj.questions[i].edit = false;
            }
            $scope.jsonObj.questions[current].edit = true;
        };

        $scope.alert = function(text){
            alert(text);
        };

        $scope.jsonObj = {
            questions:[
                {
                    id: '1',
                    title: '1) Are you  a rewards member?',
                    body:[
                        {
                            type: 'checkbox',
                            options:[
                                {title:'Option 1', value: 'opt1'}
                            ]
                        },
                        {
                            type: 'checkbox',
                            options:[
                                {title:'Option 1', value: 'opt1'}
                            ]
                        }
                    ],
                    keywords: [],
                    notes: null
                },
                {
                    id: '2',
                    title: '2) Please, rate your overall satisfaction with your experience during this visit',
                    body:[
                        {
                            type: 'rating',
                            options: [
                                {max: 5}
                            ]
                        }
                    ],
                    keywords: [],
                    notes: ''
                },
                {
                    id: '3',
                    title: '3) During your most recent visit did you experience an issue?',
                    body:[
                        {
                            type: 'text',
                            options:[
                                {placeholder:'Some text'}
                            ]
                        }
                    ]
                },
                {
                    id: '4',
                    title: '4) When do you shop?',
                    body:[
                        {
                            type: 'select',
                            options:[
                                {title: 'Monday'},
                                {title: 'Tuesday'},
                                {title: "Wednesday"},
                                {title: "Thursday"},
                                {title: "Friday"},
                                {title: "Saturday"},
                                {title: "Sunday"}
                            ]
                        },
                        {
                            type: 'checkbox',
                            options:[
                                {title:'Option 1', value: 'opt1'}
                            ]
                        },
                        {
                            type: 'checkbox',
                            options:[
                                {title:'Option 1', value: 'opt1'}
                            ]
                        }
                    ]
                },
                {
                    id: '5',
                    title: '5) Why was it purchased?',
                    body:[
                        {
                            type: 'radio',
                            options:[
                                {title:'For myself', value: 'self'}
                            ]
                        },
                        {
                            type: 'radio',
                            options:[
                                {title:'Family purchase', value: 'family'}
                            ]
                        },
                        {
                            type: 'radio',
                            options:[
                                {title:'Business purchase', value: 'business'}
                            ]
                        }
                    ]
                }
            ]
        };

    }])

    //  header menu collapse
    .controller('CollapseDemoCtrl', function ($scope) {
        $scope.isCollapsed = true;
    });