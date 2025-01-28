const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

// Use body-parser middleware
router.use(bodyParser.json()); // For parsing JSON data
router.use(bodyParser.urlencoded({ extended: true })); // For parsing URL-encoded data

// Define routes for this router
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    include: { playlists: true },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: +id },
    include: { playlists: true },
  });
  res.json(user);
});

router.post("/:id/playlist", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  console.log(id);
  console.log(req.body);
  const playlistCreated = await prisma.playlist.create({
    data: {
      name,
      description,
      userId: +id,
    },
  });

  res.json(playlistCreated);
});

module.exports = router;
