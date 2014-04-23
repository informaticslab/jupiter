angular.module('apolloApp').filter('unCamelCase', function() {
return function(input) {
/**
 * Turns someCrazyName into Some Crazy Name
 * Decent job of acroynyms:
 * ABCAcryonym => ABC Acryoynm
 * xmlHTTPRequest => Xml HTTP Request
 */

  if(input != null)
  {
  	return input
  		// insert a space between lower & upper
  		.replace(/([a-z])([A-Z])/g, '$1 $2')
  		// space before last upper in a sequence followed by lower
  		.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
  		// uppercase the first character
  		.replace(/^./, function(input){ return input.toUpperCase(); })
  }
  else
  {
    return null
  }

  // input = input || '';
  // var out = "";
  // for (var i = 0; i < input.length; i++) {
  //   out = input.charAt(i) + out;
  // }
  // // conditional based on optional argument
  // if (uppercase) {
  //   out = out.toUpperCase();
  // }
  // return out;
};
})