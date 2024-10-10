import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Users } from 'lucide-react';

interface GameMode {
  mode: string;
  playersPerTeam: number;
}

const gameModes: GameMode[] = [
  { mode: "1:1", playersPerTeam: 1 },
  { mode: "3:3", playersPerTeam: 3 },
  { mode: "5:5", playersPerTeam: 5 },
];

const GameChoice: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const navigate = useNavigate();


  const gotoDicegame = () => {
    navigate('/dice')
  }

  return (
    <div className="min-h-screen bg-slate-300 text-gray-100 p-6 flex flex-col items-center justify-center">
    <h2 className="text-4xl font-bold mb-8 text-center text-black">Chọn Chế Độ Chơi</h2>
    <div className="space-y-4 w-full max-w-md">
      {gameModes.map((mode) => (
        <div
          
          className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
            selectedMode === mode
              ? 'bg-blue-500 shadow-lg shadow-purple-500/50 transform scale-105'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedMode(mode)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{mode.mode}</h3>
              <div className="flex items-center text-gray-300">
                <Users size={18} className="mr-2" />
                <span>Số người mỗi đội: {mode.playersPerTeam}</span>
              </div>
            </div>
            {selectedMode === mode && (
              <div className="text-yellow-300 font-bold text-xl">
                ✓
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    <button
    onClick={gotoDicegame}
      className={`mt-8 py-3 px-8 rounded-full text-lg font-bold transition-all duration-300 ${
        selectedMode
          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 transform hover:scale-105'
          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
      }`}
      disabled={!selectedMode}
    >
      Mời xúc sắc
    </button>
  </div>
);
};

export default GameChoice;
