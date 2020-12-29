import { Request, Response } from "express";
import { get, controller, post, bodyValidator } from "./decorators";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response) {
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
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password && email === "a@b.com" && password === "abcom") {
      req.session = { isLoggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    //   console.log("get logout", req.session);
    req.session = undefined;
    //   console.log("get logout after setting to undefined", req.session);
    res.redirect("/");
  }
}
