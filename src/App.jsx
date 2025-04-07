import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import TestPage from "./pages/TestPage/TestPage";

function App() {
  return import.meta.env.MODE ? <TestPage /> : <MainPage />;
}

export default App;
