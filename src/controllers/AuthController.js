const boom = require("@hapi/boom");
const Controller = require("./Controller");


class AuthController extends Controller {

  async login(req, res, next) {
    try {
      const result = await this.service.login({
        ...req.body
      });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async signup(req, res, next) {
    try {
      const result = await this.service.signup({
        ...req.body,
        email: req.body.username
      });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }


  async changePassword(req, res, next) {
    try {
      const userId = req.extra.user.id;
      
      if(!userId){
        next(boom.unauthorized())
      }

      const { newPassword, repeatNewPassword } = req.body;
      if(newPassword !== repeatNewPassword){
        next(boom.badData("Las contraseñas no coinciden"))
      }

      const result = await this.service.changePassword({
        userId,
        password: newPassword
      });

      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const result = await this.service.logout(req.body);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

}


module.exports = AuthController;