/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Input from "../common/input/input.component";
import Button from "../common/button/button.component";
import {
  createAuthUserFromEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { SignUpContainer } from "./sign-up.styles";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserFromEmailAndPassword(
        email,
        password
      );
      createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already taken please choose another");
      }
      if (error.code === "auth/weak-password") {
        alert("password should atleast six characters");
      }
      console.log("Error in creating user", error.message);
    }
  };
  return (
    <SignUpContainer>
      <div className="form-title">
        <h2>Don't have an account</h2>
        <span>Sign up with your email and password</span>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label="DisplayName"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
          type="text"
        />
        <Input
          label="Email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
        />
        <Input
          label="Password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
        />
        <Input
          label="Confirm Password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          type="password"
        />
        <Button type="submit"> Signup</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
