import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DiceGame: React.FC = () => {
  const [player1Score, setPlayer1Score] = useState<number | null>(null);
  const [player2Score, setPlayer2Score] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");
  const [rolling, setRolling] = useState<number | null>(null);
  const navigate = useNavigate();

  const rollDice = (): number => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const handlePlayerRoll = (player: number) => {
    setRolling(player);
    setTimeout(() => {
      const score = rollDice();
      if (player === 1) {
        setPlayer1Score(score);
      } else {
        setPlayer2Score(score);
      }
      setRolling(null);
    }, 1000);
  };

  const checkWinner = () => {
    if (player1Score !== null && player2Score !== null) {
      if (player1Score > player2Score) {
        setResult("Player 1 được chơi trước!");
      } else if (player2Score > player1Score) {
        setResult("Player 2 được chơi trước!");
      } else {
        setResult("Hoà! Ném lại.");
      }
    }
  };

  const renderDiceIcon = (score: number | null, player: number) => {
    const isRolling = rolling === player;
    if (score === null || isRolling)
      return (
        <span className={`text-5xl ${isRolling ? "animate-spin" : ""}`}>
          🎲
        </span>
      );

    const diceIcons = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return <span className="text-5xl">{diceIcons[score - 1]}</span>;
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-slate-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Xúc xắc ai là người may mắn
        </h1>

        <div className="flex justify-around mb-8">
          {[1, 2].map((player) => (
            <div key={player} className="text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Player {player}
              </h2>
              <div
                className="dice-container mb-4 cursor-pointer transform hover:scale-110 transition-transform duration-200"
                onClick={() => handlePlayerRoll(player)}
              >
                {renderDiceIcon(
                  player === 1 ? player1Score : player2Score,
                  player
                )}
              </div>
              {(player === 1 ? player1Score : player2Score) !== null && (
                <p className="text-lg mt-2">
                  Quay ra: {player === 1 ? player1Score : player2Score}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={checkWinner}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
          disabled={player1Score === null || player2Score === null}
        >
          Kiểm tra ai chơi trước
        </button>
        <p className="flex mt-5 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={goHome} // Điều hướng quay lại
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          Trang chu
        </p>

        {result && (
          <p className="text-2xl font-bold mt-6 text-center text-purple-600 animate-pulse">
            {result}
          </p>
        )}
      </div>
    </div>
  );
};

export default DiceGame;
