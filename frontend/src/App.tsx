import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { RouterProvider } from "react-router-dom"
import routes from "./route"

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: "secret_key"
  }
})

export default function App() {
  
  return <>
    <ApolloProvider client={client}>
      <RouterProvider router={routes}/>
    </ApolloProvider>
  </>
}