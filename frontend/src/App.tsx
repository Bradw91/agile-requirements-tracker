import "./index.css";
import Header from "./components/Header/Header";
import ScrumBoard from "./components/WorkItemManagement/ScrumBoard";

function App() {
  return (
    <>
      <div className="pb-50">
        <Header />
      </div>
      <div className="ml-40 mr-40 p-10 h-auto place-content-center pl-20 pr-20">
        <ScrumBoard />
      </div>
    </>
  );
}

export default App;
