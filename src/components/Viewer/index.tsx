import { useQuery } from "graphql-hooks"

const VIEWER_QUERY = `query ViewerQuery {
    viewer {
      id
      displayName
      userName
    }
  }`

export const Viewer: React.FC = () => {
  const { loading, error, data } = useQuery(VIEWER_QUERY)

  if (loading) {
    return "loading"
  }

  if (error) {
    return "error"
  }

  return data.viewer.userName
}
