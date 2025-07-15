import React, { useState } from "react";
import "./Demo.css";

const Demo = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="demo-section">
      <h2 className="chat-heading">
        Chat example with <span className="highlight">AI-MediBot</span>
      </h2>

      <div className={`chatbox-wrapper ${isFullScreen ? "fullscreen" : ""}`}>
        <div className="chatbox-header">
          <button className="toggle-btn" onClick={toggleFullscreen}>
            {isFullScreen ? "❌" : "⛶"}
          </button>
        </div>

        <div className="chatbox-content">
          <div className="user-msg">I have a migraine.</div>

          <div className="bot-msg">
            ✨ Hello there!
            <br />
            I’m sorry to hear that you’re experiencing a migraine. Let’s see how
            we can help alleviate your symptoms. I’d like to ask a few questions:
            <ol>
              <li>
                How long have you been experiencing this migraine, and how often
                do they occur?
              </li>
              <li>
                Are there any specific symptoms like nausea, vomiting, or
                sensitivity to light/sound?
              </li>
            </ol>
          </div>

          <div className="user-msg">
            For two days, it occurs every week, sensitivity to light and sound.
          </div>

          <div className="bot-msg">
            Thanks for that. Sounds like chronic recurrent migraines with
            photophobia and phonophobia. Let me ask:
            <ul>
              <li>How long have you had them?</li>
              <li>What medications have you used?</li>
              <li>Are you allergic to anything?</li>
            </ul>
          </div>

          <div className="user-msg">
            I’ve been experiencing them for many years. I used Ibuprofen and
            Aspirin but they don’t help anymore. I take Candesartan. I have
            allergies.
          </div>

          <div className="bot-msg">
            Thanks for the info. Since OTC meds are no longer effective and
            you’re on Candesartan, it might help to explore more specialized
            options. Here's a tailored treatment overview:
          </div>

          <div className="bot-msg">
            <h3>🩺 Diagnosis:</h3>
            <ul>
              <li><strong>General:</strong> Migraines</li>
              <li><strong>Specific:</strong> Chronic Migraine</li>
            </ul>

            <h3>🧪 Recommended Diagnostics:</h3>
            <ul>
              <li><strong>MRI / CT:</strong> Rule out structural causes</li>
              <li><strong>EEG:</strong> Rule out seizure activity</li>
            </ul>

            <h3>💊 Treatment Plan:</h3>
            <p><strong>Acute:</strong></p>
            <ul>
              <li>Sumatriptan 50–100 mg (as needed)</li>
              <li>Alternative: Zolmitriptan</li>
            </ul>
            <p><strong>Symptomatic:</strong> Ondansetron 4 mg for nausea</p>
            <p>
              <strong>Preventive:</strong> Continue Candesartan. Explore
              beta-blockers or topiramate with doctor.
            </p>

            <h3>🛡️ Prevention Tips:</h3>
            <ul>
              <li>Avoid triggers</li>
              <li>Stay hydrated & sleep well</li>
              <li>Try yoga or meditation</li>
            </ul>

            <h3>📋 Note:</h3>
            <p>
              This is AI-generated guidance. Always consult a healthcare
              provider before taking action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
