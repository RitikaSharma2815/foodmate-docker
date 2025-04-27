import express from 'express';
const router = express.Router();

router.get('/student', (req, res) => {
  res.json({
    name: "Ritika Sharma",  
    studentId: "s224686664"  
  });
});

export default router;
