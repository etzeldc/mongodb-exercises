module.exports = function (db) {
// Which users checked out any of the Lord of the Rings trilogy?
    
	// Looks in the checkouts collection to find object of movie ids that contain these three LOTR ids
	db.collection("checkouts").find({
        movieId: {
            $in: [8, 11, 15]
        }
    }).toArray(function (err, data) {
        // Creats an empty array to hold the user ids that have an associated transaction, push them once, and sort to make sure there arent duplicates 
        var LOTRUsers = [];
        for (var i = 0; i < data.length; i++) {
            if (LOTRUsers.indexOf(data[i].userId) === -1) {
                LOTRUsers.push(data[i].userId);
				LOTRUsers.sort(function (a, b) {
					return a-b;
				});
            }
        }
		// Joins at comma and space to print a string instead of array
        console.log("Exercise 2:\n\tThe LOTR movies were checked out by users " + LOTRUsers.join(", ") + ".");

    });
};