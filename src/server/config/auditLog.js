var mongoose = require('mongoose');

var Log = mongoose.model('auditLog');

exports.add = function(type,userId,displayName,notes){
	var auditLog = new Log();

            auditLog.type = type;
            auditLog.date = new Date();
            auditLog.userId = userId;
            auditLog.displayName= displayName;
            auditLog.notes = notes;

            auditLog.save(function(err) {
                        if (err)
                            throw err;
            });
}