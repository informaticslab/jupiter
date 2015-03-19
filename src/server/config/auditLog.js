var mongoose = require('mongoose');

var Log = mongoose.model('auditLog');

exports.add = function(type,userId,userName,notes){
	var auditLog = new Log();

            auditLog.type = type;
            auditLog.date = new Date();
            auditLog.userId = userId;
            auditLog.userName= userName;
            auditLog.notes = notes;

            auditLog.save(function(err) {
                        if (err)
                            throw err;
            });
}