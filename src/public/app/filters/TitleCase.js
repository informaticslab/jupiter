angular.module('apolloApp').filter('TitleCase', function() {
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
    		.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    else
    {
      return null;
    }
  };
})