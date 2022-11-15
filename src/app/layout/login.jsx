import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    )
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-4 shadow p-3">
          {formType === 'register' ? (
            <>
              <h3>Register</h3>
              <RegisterForm />
              <p>
                Already have account?{' '}
                <a
                  className="link-primary"
                  role="button"
                  onClick={toggleFormType}
                >
                  Sign in
                </a>
              </p>
            </>
          ) : (
            <>
              <h3>Login</h3>
              <LoginForm />
              <p>
                Dont have account?{' '}
                <a
                  className="link-primary"
                  role="button"
                  onClick={toggleFormType}
                >
                  Sign up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Login
