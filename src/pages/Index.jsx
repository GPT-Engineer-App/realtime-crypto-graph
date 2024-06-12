import { Container, VStack } from "@chakra-ui/react";
import CryptoGraph from "../components/CryptoGraph";

const Index = () => {
  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <CryptoGraph />
      </VStack>
    </Container>
  );
};

export default Index;