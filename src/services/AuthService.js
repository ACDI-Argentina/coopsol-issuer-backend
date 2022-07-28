const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const Service = require("./Service");
const UnauthorizedError = require("../errors/UnauthorizedError");
const DidiIssuerSdk = require("../libs/DidiIssuerSdk");
const { Console } = require("console");

const { DIDI_USER, DIDI_PASSWORD } = process.env;


function hashPassword(password) {
  return crypto.createHash("sha256").update(password, "utf8").digest("hex"); //TODO: add salt
}

class AuthService extends Service {

  async signup(data) { /* User data, comprobar que venga con un token a llamar a esto, sino cualquier req va a crear un usuario */
    const { password, ...userData } = data;
    const user = new User({
      ...userData,
      passwordHash: hashPassword(password)
    });
    const { _id, email } = await user.save();

    return { _id, email };
  }

  async login(data) {
    const { email, password } = data;
    const passwordHash = hashPassword(password);

    const user = await User.findOne({
      email: email,
      passwordHash,
    });

    if (!user) throw new UnauthorizedError();

    const token = jwt.sign({
      user: {
        id: user.id,
        email: email,
        roles: user.roles
      },
    }, process.env.JWT_SECRET, { expiresIn: "2h" });

    let tokenDidi;
    try {
      const result = await new DidiIssuerSdk().auth().login({ //TODO: Crear usuarios en el issuer backend
        name: DIDI_USER,
        password: DIDI_PASSWORD,
      });
      tokenDidi = result?.token;
    } catch (error) {
      console.log(`Error login on didi issuer with credentials: ${DIDI_USER}, ${DIDI_PASSWORD}`)
      console.log(error);
    }

    return {
      user: {
        _id: user._id,
        email: user.email,
        roles: user.roles,
      },
      token,
      tokenDidi: tokenDidi
    };
  }


  async changePassword(data) {
    const { userId, password } = data;
    const user = await User.findById(userId);
    user.passwordHash = hashPassword(password);
    await user.save();
    return user;
  }

}

module.exports = AuthService;
