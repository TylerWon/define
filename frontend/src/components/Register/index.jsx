import LoginAndRegister from "../lib/LoginAndRegister";

import SignUpForm from "./SignUpForm";

// The Sign Up page
export default function Register(props) {
  return (
    <LoginAndRegister
      title="Sign up"
      description="Create your Define account"
      question="Already have an account?"
      answer="Sign in instead"
      route="/login"
    >
      <SignUpForm />
    </LoginAndRegister>
  )
}
