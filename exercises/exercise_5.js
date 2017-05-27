module.exports = function(db) {
// Which movie(s) had the most checkouts in April?

    db.collection("checkouts").aggregate([
    { 
        $match : { month : "apr" } 
    },
    {
        $sortByCount: "$movieId"
    },
    {
        $lookup : {
                from: "movies",
                localField: "_id",
                foreignField: "movieId",
                as: "movieData"
        }
    }
    ], function(err, max) {
            if(err){
                console.log(err);
                return;
        }
    console.log(`Exercise 5:\n\tThe movie "${max[0].movieData[0].title}" had the most checkouts in April.`);
    });
};