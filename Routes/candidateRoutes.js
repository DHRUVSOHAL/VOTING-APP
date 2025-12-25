const express = require('express');
const router = express.Router();
const User = require('./../models/user.js');
const Candidate = require('./../models/candidates.js');
const { jwtAuthMiddleware } = require('./../jwt.js');

// check admin role
const adminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user && user.role === 'admin';
  } catch {
    return false;
  }
};

// ADD CANDIDATE (ADMIN ONLY)
router.post('/addCandidate', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await adminRole(req.user.id))) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      message: "Candidate added successfully",
      candidate
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE CANDIDATE
router.put('/:candidateId', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await adminRole(req.user.id))) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.candidateId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate updated successfully",
      candidate
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find({}, 'name party _id');
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE CANDIDATE
router.delete('/:candidateId', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await adminRole(req.user.id))) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const candidate = await Candidate.findByIdAndDelete(req.params.candidateId);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate deleted successfully",
      candidate
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// VOTE FOR CANDIDATE (VOTER ONLY)
router.put('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
  try {
    if (await adminRole(req.user.id)) {
      return res.status(403).json({ error: "Admin cannot vote." });
    }

    const user = await User.findById(req.user.id);
    if (user.isVoted) {
      return res.status(403).json({ error: "User has already voted" });
    }

    const candidate = await Candidate.findById(req.params.candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    candidate.votes.push({ user: user._id });
    candidate.voteCount += 1;
    await candidate.save();

    user.isVoted = true;
    await user.save();

    res.status(200).json({
      message: "Vote cast successfully",
      candidate
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET VOTE COUNT (PUBLIC)
router.get('/vote/count', async (req, res) => {
  try {
    const candidates = await Candidate.find({})
      .sort({ voteCount: -1 })
      .select('name party voteCount');

    const record = candidates.map(c => ({
      name: c.name,
      party: c.party,
      voteCount: c.voteCount
    }));

    res.status(200).json({ results: record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
