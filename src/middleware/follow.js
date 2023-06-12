const User = require("../models/user");

const follow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("user not found");
    }
    let exist = false;
    user.followers.forEach((follower) => {
      if (follower.follower.equals(req.user._id)) {
        exist = true;
      }
    });
    req.user.following.forEach((following) => {
      if (following.follow.equals(req.params.id)) {
        exist = true;
      }
    });
    if (exist) {
      throw new Error("Already followed");
    }
    req.user.following.push({ follow: req.params.id });
    user.followers.push({ follower: req.user._id });

    await req.user.save();
    await user.save();

    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

const unfollow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("user not found");
    }


    let exist = false;
    user.followers.forEach((follower) => {
      if (follower.follower.equals(req.user._id)) {
        exist = true;
      }
    });
    req.user.following.forEach((following) => {
      if (following.follow.equals(req.params.id)) {
        exist = true;
      }
    });
    if (!exist) {
      throw new Error("User is not among your those who you follow");
    }

    req.user.following.pop({ follow: req.params.id });
    user.followers.pop({ follower: req.user._id });

    await req.user.save();
    await user.save();

    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

module.exports = { follow, unfollow };
