import { Router, Response, Request, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  //   console.log("get root", req.session);
  if (req.session && req.session.isLoggedIn) {
    res.send(`
      <div>
      <div>You are logged in.</div>
      <a href="/logout">Logout</a>
      </div>
      `);
  } else {
    res.send(`
      <div>
      <div>You are logged out.</div>
      <a href="/login">Login</a>
      </div>
      `);
  }
});

router.get("/login", (req: Request, res: Response) => {
  //   console.log("get login", req.session);
  res.send(`
    <form method="POST">
    <div>
    <label>Email</label>
    <input name="email" />
    </div>
    <div>
    <label>Password</label>
    <input name="password" type="password" />
    </div>
    <button>Submit</button>
    </form>
    `);
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  //   console.log("post login before validation", req.session);
  if (email && password && email === "a@b.com" && password === "abcom") {
    req.session = { isLoggedIn: true };
    // console.log("post login after validation", req.session);
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/logout", (req: Request, res: Response) => {
  //   console.log("get logout", req.session);
  req.session = undefined;
  //   console.log("get logout after setting to undefined", req.session);
  res.redirect("/");
});

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    res.status(403).send("Not permitted");
  }
};

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("Welcome to the protected route, you logged-in user");
});

export { router };
