//defining twitchApp which is main and injecting ngResource module
var twitchApp = angular.module('twitchApp',['ngResource']);   

//defining controller
twitchApp.controller('maincontroller',['$scope','$resource',function($scope,$resource){
    //the variable for ng-model directive which will be changed while user types
    $scope.searchword = '';
    //userlist array with all required info
    $scope.userlist = [
        {name: "freecodecamp", 
        logourl: 'http://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-f1b681380c0b0380-300x300.png',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/freecodecamp',
        isVisible: true},
        {name: "storbeck",
        logourl: 'http://static-cdn.jtvnw.net/jtv_user_pictures/storbeck-profile_image-7ab13c2f781b601d-300x300.jpeg',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/GeoffStorbeck',
        isVisible: true},
        {name: "terakilobyte",
        logourl: 'http://tr3.cbsistatic.com/fly/280-fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/terakilobyte',
        isVisible: true},
        {name: "habathcx",
        logourl: 'http://static-cdn.jtvnw.net/jtv_user_pictures/habathcx-profile_image-d75385dbe4f42a66-300x300.jpeg',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/habathcx',
        isVisible: true},
        {name: "RobotCaleb",
        logourl: 'http://static-cdn.jtvnw.net/jtv_user_pictures/robotcaleb-profile_image-9422645f2f0f093c-300x300.png',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/RobotCaleb',
        isVisible: true},
        {name: "thomasballinger",
        logourl: 'http://tr3.cbsistatic.com/fly/280-fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/thomasballinger',
        isVisible: true},
        {name: "noobs2ninjas",
        logourl: 'http://static-cdn.jtvnw.net/jtv_user_pictures/noobs2ninjas-profile_image-34707f847a73d934-300x300.png',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/noobs2ninjas',
        isVisible: true},
        {name: "beohoff",
        logourl: 'http://tr3.cbsistatic.com/fly/280-fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/beohoff',
        isVisible: true},
        {name: "MedryBW",
        logourl: 'http://static-cdn.jtvnw.net/jtv_user_pictures/medrybw-profile_image-19fce7e1b0d6c194-300x300.jpeg',
        status: 'offline',
        profileurl: 'http://www.twitch.tv/MedryBW',
        isVisible: true}
    ];
    //if searchword var changes when user types it loops through all user's names slicing and making
    //the same lenth as searchword var and comparing them if matches isVisible is true, because of
    //ng-if directive content is whown when isVisible is true, otherwise not shown
    $scope.$watch('searchword',function(){
        if($scope.searchword.length>0){
            $scope.searchword = $scope.searchword.toLowerCase();
            for(var j=0; j<$scope.userlist.length; j++){
                var usname = $scope.userlist[j].name.slice(0,$scope.searchword.length).toLowerCase();
                if($scope.searchword===usname){
                    $scope.userlist[j].isVisible = true;
                }else{
                    $scope.userlist[j].isVisible = false;
                }
            }
        //if searchword length is zero all isVisible key of each object of userlist array should have false value
        //and all user's names are visible
        }else if($scope.searchword.length===0){
            for(j=0; j<$scope.userlist.length; j++){
               $scope.userlist[j].isVisible = true; 
            }
        }
    });
    for(var i = 0; i<$scope.userlist.length; i++){
        //with resource service of ngResource module we get user information from external API with get method
        $scope.twitchStreamAPI = $resource("https://api.twitch.tv/kraken/streams?",{callback: "JSON_CALLBACK"},{get:{method: "JSONP"}});
        $scope.resultOfStream =  $scope.twitchStreamAPI.get({channel: $scope.userlist[i].name});
        //while looping we get channel status of users, if they are online we get their display_name
        //property and compare with user's name in userlist array. With this we find which user
        //the status relates to and repace its default 'offline' value with what we get from API
        $scope.resultOfStream.$promise.then(function(data){
              if(data.streams[0].channel.status!==undefined){
                var username = data.streams[0].channel.display_name;
                for(var k=0; k<$scope.userlist.length; k++){
                    if(username===$scope.userlist[k].name){
                        $scope.userlist[k].status = $scope.userlist[k].status.replace('offline',data.streams[0].channel.status);
                    }
                }
              }
        });
    }
}]);