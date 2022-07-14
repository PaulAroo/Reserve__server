const controllers = {
  index: (req, res) => {
    return res.status(200).json({ messgae: "Hello World" });
  },
};

module.exports = controllers;
