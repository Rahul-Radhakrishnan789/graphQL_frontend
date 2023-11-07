import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import {setContext} from '@apollo/client/link/context';
import { Login } from './login'
import { DisplayData } from './displayData'
import './App.css'

function App() {

  const authLink = setContext((_ , {headers}) => {
    const token = localStorage.getItem('accessToken')
    
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer  ${token}` : '', 
      },
    };
  });

const httpLink = createHttpLink({
  uri:"http://localhost:4000/graphql"
})

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link:authLink.concat(httpLink),
  });

 

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/displaydata' element={<DisplayData/>}/>
        </Routes>
      </Router>
    </div>
      </ApolloProvider>
  )
}

export default App
