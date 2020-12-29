import { Request, Response, NextFunction } from "express";
import { controller, get, use } from "./decorators";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    res.status(403).send("Not permitted");
  }
};

@controller("")
class RootController {
  @get("/")
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.isLoggedIn) {
      res.send(`
            <div>
            <div>You are logged in.</div>
            <a href="/auth/logout">Logout</a>
            </div>
            `);
    } else {
      res.send(`
            <div>
            <div>You are logged out.</div>
            <a href="/auth/login">Login</a>
            </div>
            `);
    }
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("Welcome to the protected route, you logged-in user");
  }
}
