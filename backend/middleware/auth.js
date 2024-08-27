// Assuming you already have user authentication logic in place
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  // Authenticate user logic here...

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role, // Include the role in the token
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ success: true, token, role: user.role });
};
