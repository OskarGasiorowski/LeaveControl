import { ChakraProvider } from '@chakra-ui/react'
import { CreateAccountPage } from "./pages";

export function App() {
  return (
      <ChakraProvider>
          <CreateAccountPage />
      </ChakraProvider>
  )
}
