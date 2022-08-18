const index = (req, res) => {
  res.send("authentication root");
};

const register = (req, res) => {
  res.send("authentication register root");
};

const login = (req, res) => {
  res.send("authentication login root");
};

export { index, register, login };
