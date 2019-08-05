import { Application, Request, Response, NextFunction } from 'express';
import express from 'express';
import * as jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      token: string
    }
  }
}

const app: Application = express()


app.get("/api", (req: Request, res: Response) => {
  res.send("Welcome to json web token api")
})

app.post("/api/login", (req: Request, res: Response) => {
  const user = {
    id: 1,
    username: "ajay",
    email: "ajay@gmail.com"
  }
  jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err: Error, token: string) => {
    res.json({
      token: token
    })
  })
})

app.post("/api/post", verifyToken, (req: Request, res: Response) => {

  jwt.verify(req.token, 'secretkey', (err: Error, authData: Object) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post Created",
        authData
      })
    }
  })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access token>

// Verify Token

function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Get auth header value

  const token = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof token !== 'undefined') {
    // Set the token
    req.token = token
    // Next middleware
    next()
  } else {
    // Forbidden
    res.sendStatus(403)
  }
}


app.listen(5000, () => {
  console.log("Server listening on 5000 port");

})