import { useState } from "react";
import Input from "../common/input/input.component";
import Button, {
  BUTTON_TYPES_CLASSES,
} from "../common/button/button.component";
import {
  signInWithGooglePopUp,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { SignInContainer } from "./sign-in.styles";



const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const resetFormFields = () => {
    setFormFields(formFields);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopUp();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SignInContainer>
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Signin</Button>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            GoogleSignIn
          </Button>
        </div>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
