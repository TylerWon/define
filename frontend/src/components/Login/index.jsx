import LoginAndRegister from "../lib/LoginAndRegister";

import LoginForm from "./LoginForm";

// The Login page
export default function Login(props) {
  return (
    <LoginAndRegister
      title="Login"
      description="Access your Define account"
      question="Don't have an account?"
      answer="Sign up instead"
      route="/register"
    >
      <LoginForm />
    </LoginAndRegister>
  )
}
