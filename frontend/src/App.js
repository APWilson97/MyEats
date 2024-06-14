import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";


function App() {

  return (
    <>
      <Loading/>
      <Header/>
      <AppRoutes/>
    </>
  );
}

export default App;