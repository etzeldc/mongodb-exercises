module.exports = function(db) {
// Which users(s) had the most checkouts?
    
	db.collection("checkouts").aggregate([
    {
        $sortByCount: "$userId"
    },
    {
        $lookup : {
            from: "checkouts",
            localField: "_id",
            foreignField: "userId",
            as: "userData"
        }
    }
    ], function(err, max) {
            if(err){
                console.log(err);
                return;
        }
    console.log (`Exercise 6:\n\tThe user ${max[0].userData[0].userId} had ${max[0].count} checkouts.`);
    });
};