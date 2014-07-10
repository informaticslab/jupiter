exports.nodeUrl = function(req, id) {
    return req.protocol + '://' + req.get('host') + '/apollo/api/node/' + id;
}

exports.nodeRelationsUrl = function(req, id){
	return exports.nodeUrl(req, id) + '/relations';
}

exports.nodeLinksUrl = function(req, id){
	return exports.nodeUrl(req, id) + '/labels';
}