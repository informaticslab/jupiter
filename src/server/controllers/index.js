exports.index = function(req, res){
  res.render('index', {
  	bootstrappedUser: req.user
  });  
};