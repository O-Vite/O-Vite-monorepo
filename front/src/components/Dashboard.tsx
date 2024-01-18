import React, { useState, useEffect, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useApi from "../hooks/useApi";
import LoadingScreen from "./LoadingScreen";
import "./HeroStyle.css";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {

  const [inputData, setInputData] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const api = useApi();
  const navigate = useNavigate();

  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  useEffect(() => {
    if (searchText) {
      api
        .getRecettes()
        .then((response) => {
          const filteredRecettes = response.data.filter((recette) =>
            recette.title.toLowerCase().includes(searchText.toLowerCase())
          );
          setSearchResults(filteredRecettes);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des recettes", error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await searchBarRecettes(inputData);
      navigate("/search-results", { state: { recettes: response.data } });
    } catch (error) {
      console.error("Erreur lors de la recherche des recettes", error);
    } finally {
      setLoading(false);
    }
  };

  // let recognition;
  // const startSpeechRecognition = () => {
  //   if (!isListening) {
  //     if ("webkitSpeechRecognition" in window) {
  //       recognition = new webkitSpeechRecognition();
  //       recognition.lang = "fr-FR";
  //       recognition.continuous = false;
  //       recognition.interimResults = false;

  //       recognition.onresult = (event) => {
  //         const transcript = event.results[0][0].transcript;
  //         setInputData(transcript);
  //         stopSpeechRecognition();
  //       };

  //       recognition.onerror = (event) => {
  //         console.error("Erreur de reconnaissance vocale:", event.error);
  //         setIsListening(false);
  //       };

  //       recognition.start();
  //       setIsListening(true);
  //     } else {
  //       console.log("La reconnaissance vocale n'est pas prise en charge");
  //     }
  //   } else {
  //     stopSpeechRecognition();
  //   }
  // };

  // const stopSpeechRecognition = () => {
  //   if (recognition) {
  //     recognition.stop();
  //   }
  //   setIsListening(false);
  // };

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage:
            "url(https://as1.ftcdn.net/v2/jpg/04/97/45/38/1000_F_497453879_CoPFJDklwqFUWdGzu6WTpwch2GKLPyue.jpg)", // Remplacez "background.jpg" par le chemin de votre image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 1,
        }}
      >
        {" "}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center text-center">
        <h1 className="text-white mb-2" style={{ fontSize: "20px" }}>
          Bienvenue sur CuisineConnect
        </h1>
        <h2 className="text-white mb-4" style={{ fontSize: "13px" }}>
          Quelle recette souhaitez-vous aujourd'hui ?
        </h2>

       

        {isChatbotVisible ? <Chatbot /> : null}

        <form
          onSubmit={handleSearch}
          className="flex border p-1 rounded-md text-black bg-gray-100/90 max-w-[700px] w-[80%] mx-auto"
        >
          <Autocomplete
            style={{ width: "100%" }}
            id="recette-search"
            freeSolo
            options={searchResults.map((recette) => recette.title)}
            onInputChange={(_, value) => setSearchText(value)}
            onChange={(_, value) => {
              const selectedRecette = searchResults.find(
                (recette) => recette.title === value
              );
              if (selectedRecette) {
                navigate(`/recette/${selectedRecette.id}`);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Recherche d'une recette..."
                className="full-width-textfield"
                style={{ width: "100%" }}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            )}
          />
        </form>
 
        <button
          onClick={toggleChatbot}
          className="fixed bottom-4 left-1/2 bg-black-500 text-white px-4 py-2 rounded-md cursor-pointer transform -translate-x-1/2"
        >
          Ouvrir le Chatbot
        </button>

        {loading && <LoadingScreen />}
        {searchResult && (
          <div style={{ color: "white", marginTop: "20px" }}>
            {searchResult}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;