import { useFormik } from "formik"
import { useMutation, useQuery } from "graphql-hooks"
import React from "react"

interface FormValues {
  email: string
  password: ""
}

const VIEWER_QUERY = `
  query ViewerQuery {
    viewer {
      id
      displayName
      userName
      avatar
    }
  }
`

const LOGIN = `
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      auth
    }
  }
`

const LOGOUT = `
  mutation UserLogout {
    userLogout
  }
`

export const Viewer: React.FC = () => {
  const [login] = useMutation(LOGIN)
  const [logout, { loading: loggingOut }] = useMutation(LOGOUT)

  const { loading, error, data } = useQuery(VIEWER_QUERY)

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }, { setSubmitting }) => {
      try {
        await login({ variables: { input: { email, password } } })
        window.location.reload()
      } catch (err) {
        console.error(err)
        setSubmitting(false)
      }
    },
  })

  if (loading) {
    return <span>Loading</span>
  }

  if (error) {
    return <span>{JSON.stringify(error, null, 2)}</span>
  }

  if (!data.viewer.userName) {
    return (
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <button type="submit" disabled={isSubmitting || !isValid}>
          Login
        </button>
      </form>
    )
  }

  return (
    <div>
      <span>{data.viewer.userName}</span>
      <img src={data.viewer.avatar} />
      <button
        type="button"
        onClick={async () => {
          await logout()
          window.location.reload()
        }}
        disabled={loggingOut}
      >
        {loggingOut ? <span>Logging out</span> : <span>Logout</span>}
      </button>
    </div>
  )
}
