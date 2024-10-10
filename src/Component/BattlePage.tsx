import React, { useState } from "react";
import { Hero } from "../interface/Hero";
import { heroes } from "../interface/data";

const BattlePage: React.FC = () => {
  const [mode, setMode] = useState<number>(1); // Chế độ mặc định là 1:1
  const [team1, setTeam1] = useState<Hero[]>([]);
  const [team2, setTeam2] = useState<Hero[]>([]);
  const [result, setResult] = useState<string>("");

  const handleBattle = () => {
    if (team1.length === mode && team2.length === mode) {
      const team1Power = team1.reduce(
        (total, hero) => total + hero.physicalAttack + hero.magicalAttack,
        0
      );
      const team2Power = team2.reduce(
        (total, hero) => total + hero.physicalAttack + hero.magicalAttack,
        0
      );

      if (team1Power > team2Power) {
        setResult("Team 1 thắng!");
      } else if (team2Power > team1Power) {
        setResult("Team 2 thắng!");
      } else {
        setResult("Trận đấu hòa!");
      }
    }
  };

  const handleHeroSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    team: "team1" | "team2",
    index: number
  ) => {
    const hero = heroes.find((hero) => hero.name === e.target.value) || null;
    if (hero) {
      if (team === "team1") {
        const updatedTeam1 = [...team1];
        updatedTeam1[index] = hero;
        setTeam1(updatedTeam1);
      } else {
        const updatedTeam2 = [...team2];
        updatedTeam2[index] = hero;
        setTeam2(updatedTeam2);
      }
    }
  };

  return (
    <div className="battle-page flex flex-col items-center justify-center min-h-screen p-5 bg-gradient-to-r from-blue-900 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-10">Chọn Hero để Đánh Nhau</h1>

      <div className="mb-5 flex items-center space-x-4">
        <label className="text-lg font-semibold">Chế độ:</label>
        <select
          className="p-3 rounded-lg border border-gray-300 bg-white text-gray-700"
          value={mode}
          onChange={(e) => {
            setMode(parseInt(e.target.value));
            setTeam1(Array(parseInt(e.target.value)));
            setTeam2(Array(parseInt(e.target.value)));
            setResult("");
          }}
        >
          <option value={1}>1 đấu 1</option>
          <option value={3}>3 đấu 3</option>
          <option value={5}>5 đấu 5</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-x-10 mt-5">
        {/* Team 1 Selection */}
        <div className="team-1-selection">
          <h2 className="text-2xl font-bold mb-4">Team 1</h2>
          {Array.from({ length: mode }).map((_, index) => (
            <select
              key={index}
              className="p-3 rounded-lg border border-gray-300 bg-white text-gray-700 mb-3 w-52"
              onChange={(e) => handleHeroSelect(e, "team1", index)}
            >
              <option value="">Chọn Hero {index + 1}</option>
              {heroes.map((hero) => (
                <option key={hero.name} value={hero.name}>
                  {hero.name}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Team 2 Selection */}
        <div className="team-2-selection">
          <h2 className="text-2xl font-bold mb-4">Team 2</h2>
          {Array.from({ length: mode }).map((_, index) => (
            <select
              key={index}
              className="p-3 rounded-lg border border-gray-300 bg-white text-gray-700 mb-3 w-52"
              onChange={(e) => handleHeroSelect(e, "team2", index)}
            >
              <option value="">Chọn Hero {index + 1}</option>
              {heroes.map((hero) => (
                <option key={hero.name} value={hero.name}>
                  {hero.name}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <button
        onClick={handleBattle}
        className="mt-5 p-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300 shadow-lg"
        disabled={
          team1.length < mode ||
          team2.length < mode ||
          team1.includes(undefined) ||
          team2.includes(undefined)
        }
      >
        Đánh Nhau!
      </button>

      {result && <h2 className="mt-5 text-3xl font-bold">{result}</h2>}

      <div className="mt-10 w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Hero Đã Chọn
        </h2>
        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 w-full">
          <div className="team-1 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Team 1</h3>
            <div className="flex space-x-5">
              {team1.map((hero, index) =>
                hero ? (
                  <div
                    key={index}
                    className="hero-card p-6 bg-white rounded-lg shadow-lg text-gray-800 w-48"
                  >
                    <img
                      src={hero.avatar}
                      alt={`${hero.name} avatar`}
                      className="w-36 h-36 mb-3 rounded-full object-cover"
                    />
                    <h4 className="text-xl font-bold text-center">
                      {hero.name}
                    </h4>
                  </div>
                ) : null
              )}
            </div>
          </div>

          <div className="team-2 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Team 2</h3>
            <div className="flex space-x-5">
              {team2.map((hero, index) =>
                hero ? (
                  <div
                    key={index}
                    className="hero-card p-6 bg-white rounded-lg shadow-lg text-gray-800 w-48"
                  >
                    <img
                      src={hero.avatar}
                      alt={`${hero.name} avatar`}
                      className="w-36 h-36 mb-3 rounded-full object-cover"
                    />
                    <h4 className="text-xl font-bold text-center">
                      {hero.name}
                    </h4>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
