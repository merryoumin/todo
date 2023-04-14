const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const client = new PrismaClient();

router.post("/", async (req, res) => {
  //코드가 위에서 아래로 통신 하기 때문에
  try {
    const { account } = req.body;

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (existUser) {
      return res.status(400).json({ ok: false, error: "already have" });
    }

    const user = await client.user.create({
      data: {
        account,
      },
    });

    res.json({ ok: true, user }); //어웨잇없으면 펜딩 당함
  } catch (error) {
    console.error();
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log(id);

//     res.send("임시");
//   } catch (error) {
//     console.error(error);
//   }
// });

// 유저조회
router.get("/:account", async (req, res) => {
  try {
    const { account } = req.params;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "No user.",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
