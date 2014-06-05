angular.module('apolloApp').filter('unCamelCase', function() {
  return function(input) {
    // ganked lovingly from https://gist.github.com/mattwiebe/1005915

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
        //  replace underscore with space
        .replace(/_/g, ' ')
    		// space before last upper in a sequence followed by lower
    		.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    		// uppercase the first character
    		.replace(/^./, function(input){ return input.toUpperCase(); })
    }
    else
    {
      return null;
    }
  };
})