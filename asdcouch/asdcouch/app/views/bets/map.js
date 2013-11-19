function(doc) {
  if (doc._id.substr(0,2) == "4e") {
    emit(doc._id,{
    	"betDate": doc.bdate,
    	"friendName": doc.friendName,
    	"team1": doc.team1,
    	"team2": doc.team2,
    	"amount": doc.amount,
    	"id": doc._id,
    	"rev": doc._rev
    });
  }
};