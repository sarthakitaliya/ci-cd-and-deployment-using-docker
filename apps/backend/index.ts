import express from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/users", async(req, res) => {
  const user = await prismaClient.user.findMany()
  res.json({user})
})

app.post("/user", async(req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  await prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080);