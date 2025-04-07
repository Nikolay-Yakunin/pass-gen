import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import TestPage from "./pages/TestPage/TestPage";

function App() {
  return process.env.DEVELOPMENT ? <TestPage /> : <MainPage />;
}

export default App;
