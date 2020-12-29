import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppRouter } from "../../AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

function bodyValidator(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`${key} is missing`);
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          bodyValidator(requiredBodyProps),
          routeHandler
        );
      }
    }
  };
}
