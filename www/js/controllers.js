pushNotificationApp.controller('IndexCtrl', function($http, $scope, PhonegapService, Alert) {
  
  $scope.Alert = Alert;
  $scope.h = $http;
  
  $scope.token = undefined;

  PhonegapService.ready.then(function() {
    
    pushNotification = window.plugins.pushNotification;

    if(device.platform == 'iOS') {
      
      $scope.token = 'Requesting APNS token';
      
      pushNotification.register(
        pushCallbacks.APN.successfulRegistration,
        pushCallbacks.errorHandler,
        {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"pushCallbacks.APN.onNotification"
        }
      )
    } else {
      
      $scope.token = 'Requesting GCM token';
      
      pushNotification.register(
        pushCallbacks.GCM.successfulRegistration,
        pushCallbacks.errorHandler,
        {
          "senderID":"125902103424",
          "ecb":"pushCallbacks.GCM.onNotification"
        }
      )
    }
  });
});