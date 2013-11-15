function(doc) {
  if (doc._id.substr(0,8) === "group:B:") {
    emit(doc._id.substr(8),{
    	"match": doc.match,
    	"group": doc.group,
    	"date": doc.date,
    	"time": doc.time
    });
  }
};