const User = require('../models/User');
const { updateProfileSchema, updateRoleSchema } = require('../validation/userValidation');

const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password -refreshToken');
  res.status(200).json({ user });
};

const updateMe = async (req, res) => {
  const { error, value } = updateProfileSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { profile: value } },
    { new: true }
  ).select('-password -refreshToken');

  res.status(200).json({ user });
};

// Admin endpoints
const listUsers = async (req, res) => {
  const { page = 1, limit = 20, q } = req.query;
  const filter = q ? { $or: [
    { email: { $regex: q, $options: 'i' } },
    { username: { $regex: q, $options: 'i' } },
  ] } : {};
  const users = await User.find(filter)
    .select('-password -refreshToken')
    .skip((page - 1) * limit)
    .limit(parseInt(limit, 10))
    .sort({ createdAt: -1 });
  const total = await User.countDocuments(filter);
  res.status(200).json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -refreshToken');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ user });
};

const updateUserRole = async (req, res) => {
  const { error, value } = updateRoleSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findByIdAndUpdate(req.params.id, { role: value.role }, { new: true })
    .select('-password -refreshToken');
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ message: 'User deleted' });
};

module.exports = {
  getMe,
  updateMe,
  listUsers,
  getUserById,
  updateUserRole,
  deleteUser,
};
