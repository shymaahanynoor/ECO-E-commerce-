require("dotenv").config();

const {
  createUserService,
  findUserService,
  updateUserService,
} = require("../services/user.service");
const {
  validateNewUser,
  validateLoginUser,
  validateEditUser
} = require("../validation/user.validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/////////////////////////////////////////////////////////////////////////

const createNewUser = async (req, res) => {
  //registration
  try {
    const { error, value } = validateNewUser(req.body); //value is a user
    if (error) {
      res.send({ message: "Invalid form field..", error: error });
    } else {
      const { userName, userEmail, userPassword } = req.body;

      //1-if email or password missing
      if (!userEmail || !userPassword) {
        return res.send({ message: "wrong email or password!" });
      }

      //2- if existing email
      const user = await findUserService(userEmail);
      if (user) {
        return res.send({
          message: "This email already exists, please choose another email...",
        });
      }

      const passwordHash = await bcrypt.hash(userPassword, 10);

      const newUser = await createUserService({
        userName,
        userEmail,
        passwordHash

      });
      res.send({ newUser: newUser, message: "successful registration" });
    }
  } catch (createNewUserError) {
    res.send({ message: createNewUserError.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
  try {
    const { error, value } = validateLoginUser(req.body); //value is a user
    if (error) {
      res.send({ message: "Invalid form field..", error: error });
    } else {
      const { userEmail, userPassword } = req.body;
      if (!userEmail || !userPassword) {
        return res.send({ message: "wrong email or password!" });
      }

      const user = await findUserService(userEmail);
      if (!user) {
        return res.send({ message: "Incorrect email or password..." });
      }

      const isValidPassword = await bcrypt.compare(
        userPassword,
        user.passwordHash
      );

      if (!isValidPassword) {
        return res.send({ message: "Incorrect email or password..." });
      }
      let token = 0;
      if (user.isAdmin) {
        token = jwt.sign({ userEmail }, process.env.JWT_ADMIN_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        }); //*takes the admin token with the admin secret key
      } else {
        token = jwt.sign({ userEmail }, process.env.JWT_USER_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        }); //*takes the user token with user secret key
      }

      if (user.isAdmin)
        res.header({ jwt: token }).send({
          token: token,
          userEmail: userEmail,
          message: `access granted,Welcome admin ${user.userName}`,
          role:"admin"
        });
      else
        res.header({ jwt: token }).send({
          token: token,
          userEmail: userEmail,
          message: `Welcome user ${user.userName}`,
          role:"user"
        });
    }
  } catch (LoginError) {
    res.send({ message: LoginError.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
const getCurrentUser = async (req, res) => {
  try {
    const userEmail = req.headers["useremail"]; //very very important : In JavaScript, header names are case-insensitive, so you should use consistent case when accessing headers.
    //  useremail not  userEmail
    const user = await findUserService(userEmail);
    if (!user) {
      res.send({ message: "the user with given email was not found" });
    } else {
      res.send({user:user});
    }
  } catch (getCurrentUserError) {
    res.send({ message: getCurrentUserError.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////

const updateUserProfile = async (req, res) => {
  try {
    const { error, value } = validateEditUser(req.body);
    if (error) {
      res.send({ message: "Invalid form field..", error: error });
    } else {
      const { userEmail } = req.body;
      const user = await findUserService(userEmail);
      if (!user) {
        res.send({ message: "the user with given email was not exist" });
      } else {
        await updateUserService(userEmail, req.body);
        const updatedUser = await findUserService(userEmail);
        res.send({
          message: "your profile was updated successfully",
          updatedUser: updatedUser,
        });
      }
    }
  } catch (updateUserProfileError) {
    res.send({ message: updateUserProfileError.message });
  }
};

module.exports = {
  createNewUser,
  login,
  getCurrentUser,
  updateUserProfile,
};
