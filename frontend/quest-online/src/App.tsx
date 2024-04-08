import { createGlobalStyle } from "styled-components";
import Manager from "./pages/Manager/Manager";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #b2d8db;
    
  }
`;
function App() {

	return (
		<>
			<GlobalStyle />
			<Manager />
		</>
	);
}

export default App;
