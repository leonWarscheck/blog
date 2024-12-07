export function downloadHighScoresJSON() {
  const scoresJSON = localStorage.getItem("highScores");

  if (scoresJSON) {
    const blob = new Blob([scoresJSON], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "symbol-trainer-highScores.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } else {
    console.error("No highScores found in localStorage.");
  }
}

export function importBackup(event, setMessage) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem("highScores", JSON.stringify(data));
      setMessage("Import Successful.");
   
    } catch (error) {
      console.error("Invalid JSON file", error);
      setMessage("Import Error:", error);
    }
  };

  if (file) {
    reader.readAsText(file);
  }
}
