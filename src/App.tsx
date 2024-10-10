import { Route, Routes } from "react-router-dom";
import HeroList from "./Component/Herolist";
import CreateHero from "./Component/CreateHero";
import { HeroProvider } from "./Contexts/HeroContext";
import HeroDetail from "./Component/HeroDetail";
import DiceGame from "./Component/DiceGame";
import HeroInformation from "./Component/HeroInformation";
import Review from "./Component/Review";
import GameChoice from "./Component/GameChoice";
import EditHero from "./Component/EditHero";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HeroList />} />
        <Route path="/hero/:id" element={<HeroDetail />} />
        <Route path="/createhero" element={<CreateHero />} />
        <Route path="/gamechoice" element={<GameChoice />} />
        <Route path="/dice" element={<DiceGame />} />
        <Route path="/infor" element={<HeroInformation />} />
        <Route path="/review" element={<Review />} />
        <Route path="/edithero/:id" element={<EditHero />} />
      </Routes>
    </>
  );
};

export default App;
