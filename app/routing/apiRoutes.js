var friends = require("../data/friends")

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var user = req.body;
        var userValues = user.scores;
        var userMatch = {
            name: "",
            photo: "",
            compatibilityDifference: 100
        }
        var totalDifference;
        for (var i = 0; i < friends.length; i++) {
            var eachFriend = friends[i];
            for (var j = 0; j < eachFriend.scores.length; j++) {
                var eachFriendValues = eachFriend.scores[j];
                totalDifference = Math.abs(parseInt(eachFriendValues) - parseInt(userValues))
            }
            if (totalDifference < userMatch.compatibilityDifference) {
                userMatch.name = eachFriend.name;
                userMatch.photo = eachFriend.photo;
                userMatch.compatibilityDifference = totalDifference;
            }
            // comparison logic not functioning properly, must correct
        }
        friends.push(user);
        res.json(userMatch);
    });
}