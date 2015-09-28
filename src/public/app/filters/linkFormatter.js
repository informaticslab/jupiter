angular.module('jupiterApp').filter('linkFormatter', function() {
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
    	console.log(input);
      var links=input;
      var start="";
      var end="";
      var fstring;
      links.forEach(function(d){
        
        var leftright=d.split("-->");
        start=(leftright[0]).trim();
        end=(leftright[1]).trim();

        console.log(start,end);

        fstring=start+"    "+end;


      });
      //.replace(/-/g,'__' );
      console.log(fstring);

      return input;
    		//.replace(/-/g,'__' );
    }
    else
    {
      return null;
    }
  };
})