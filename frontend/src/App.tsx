import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthUser } from "@aws-amplify/auth";

import { AppHeader } from "./components/app-header/AppHeader";
import { AllPokemons } from "./pages/all-pokemons/AllPokemons";
import { MyPokemons } from "./pages/my-pokemons/MyPokemons";
import { Fight } from "./pages/fight/Fight";

import { GlobalStyles } from "./assets/style/setup/globalStyles"
import { userService } from "./services/user.service";
import { User } from "./data/types/user";

interface AppProps {
  cognitoUser: AuthUser | undefined
}

function App({ cognitoUser }: AppProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (cognitoUser) saveUser()
  }, [])

  async function saveUser() {
    try {
      const loginUser = await userService.saveUser(cognitoUser!)
      setUser(loginUser as User)
    } catch (err) {
      console.error('Failed to save user')
    }
  }

  const userId = user ? user.id : undefined

  return (
    <Router>
      <GlobalStyles />
      <AppHeader user={user} />
      <Routes>
        <Route path="/" element={<AllPokemons userId={userId} />} />
        <Route path="/myPokemons" element={<MyPokemons userId={userId} />} />
        <Route path="/fight" element={<Fight userId={userId} />} />
      </Routes>
    </Router>
  )
}

export default App