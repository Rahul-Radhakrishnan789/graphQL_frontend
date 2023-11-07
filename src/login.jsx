import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const USER_LOGIN = gql`
mutation userLogin {
    login{
        accessToken
        refreshToken
    }
}
`;

const REFRESH_TOKEN = gql`
  mutation refreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken){
        accessToken
    }
  }
`



export const Login = () => {

    const nav = useNavigate()
   
    const [userLogin] = useMutation(USER_LOGIN);

    const [refreshAccessToken] = useMutation(REFRESH_TOKEN)
  
   const handleRefreshToken = async() => {

    const refreshToken = Cookies.get('refreshToken')

    try {
        const { data } = await refreshAccessToken({ variables: { refreshToken } });
        const { accessToken } = data.refreshAccessToken;
  
     

        Cookies.set('accessToken', accessToken, ); 


      } catch (error) {
        console.error("Login failed:", error);
      }
     

   }

    const handleLogin = async () => {
        try {
          const { data } = await userLogin(); 
          const { accessToken, refreshToken } = data.login;
    
        
          Cookies.set('accessToken', accessToken, ); 
          Cookies.set('refreshToken', refreshToken,);
          localStorage.setItem('accessToken',accessToken);
          localStorage.setItem('refreshToken',refreshToken);
          nav('/displaydata')
    
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
    
    

   
    useEffect(() => {
   
        const intervalId = setInterval(() => {
         
            handleRefreshToken()
        }, 1000000); 
    
    
        return () => clearInterval(intervalId);
      
    }, []);
    
  return (
    <div>
   
    <button onClick={handleLogin}>Login</button>
 
 
   </div>
  )
}
