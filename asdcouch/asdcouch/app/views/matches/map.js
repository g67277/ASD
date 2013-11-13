function(doc) {
  if (doc._id.substr(0,8) === "default:") {
    emit(doc._id.substr(8),{
    	"betDate": doc.betDate,
    	"friendName": doc.friendName,
    	"team1": doc.team1,
    	"team2": doc.team2,
    	"amount": doc.amount
    });
  }
};