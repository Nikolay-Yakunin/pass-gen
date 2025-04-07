import React, { useState } from "react";
import { Button, CopyText } from "../../components/shared";
import { generatePassword } from "../../models/Password/password";
import "./MainPage.css";

function MainPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [complexity, setComplexity] = useState("medium");

  const handleGeneratePassword = () => {
    try {
      const newPassword = generatePassword(length, complexity);
      setPassword(newPassword);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Pass-Gen</h1>
        <p>Безопасный генератор паролей</p>
      </header>

      <main>
        <div className="password-display">
          {password ? (
            <CopyText>{password}</CopyText>
          ) : (
            <div className="empty-password">
              Нажмите кнопку для генерации пароля
            </div>
          )}
        </div>

        <div className="controls">
          <div className="control-group">
            <label>Длина пароля: {length}</label>
            <input
              type="range"
              min="12"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Сложность:</label>
            <div className="complexity-buttons">
              <Button
                onClick={() => setComplexity("low")}
                className={complexity === "low" ? "active" : ""}
              >
                Низкая
              </Button>
              <Button
                onClick={() => setComplexity("medium")}
                className={complexity === "medium" ? "active" : ""}
              >
                Средняя
              </Button>
              <Button
                onClick={() => setComplexity("high")}
                className={complexity === "high" ? "active" : ""}
              >
                Высокая
              </Button>
            </div>
          </div>

          <Button onClick={handleGeneratePassword} className="generate-button">
            Сгенерировать пароль
          </Button>
        </div>
      </main>

      <footer>
        <p>© 2023 Pass-Gen. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default MainPage;
