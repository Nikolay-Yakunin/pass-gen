import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import TestPage from "./pages/TestPage/TestPage";

function App() {
  return import.meta.env.DEV ? <TestPage /> : <MainPage />;
}

export default App;
