var parse =require('csv');


exports.upload = function(req, res){
	var input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"';

	parse(input, function(err, output){
		console.log(output);
		res.send('ok');
	});
};
