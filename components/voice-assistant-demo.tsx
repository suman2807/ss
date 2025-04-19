"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function VoiceAssistantDemo() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [language, setLanguage] = useState("en-IN")
  const [supported, setSupported] = useState(true)
  const [showExamples, setShowExamples] = useState(true)

  const recognitionRef = useRef(null)
  const speechSynthesisRef = useRef(null)

  const languages = [
    { code: "en-IN", name: "English (India)" },
    { code: "hi-IN", name: "Hindi" },
    { code: "ta-IN", name: "Tamil" },
    { code: "te-IN", name: "Telugu" },
    { code: "mr-IN", name: "Marathi" },
    { code: "bn-IN", name: "Bengali" },
  ]

  // Sample responses based on common queries
  const sampleResponses = {
    "en-IN": {
      market:
        "You can sell your produce on the marketplace by going to the 'My Products' section and clicking on 'Add New Product'.",
      weather:
        "The weather forecast for your area shows a high chance of rain tomorrow. Consider delaying any planned spraying activities.",
      disease:
        "To use the Crop Doctor, take a clear photo of the affected plant part and upload it in the Crop Doctor tool.",
      price: "Current market prices for tomatoes range from ₹40 to ₹60 per kg depending on quality and location.",
      help: "I can help you navigate FarmLink, check weather forecasts, get market prices, use the Crop Doctor, or list your products. What would you like to do?",
    },
    "hi-IN": {
      market: "आप 'मेरे उत्पाद' अनुभाग में जाकर और 'नया उत्पाद जोड़ें' पर क्लिक करके मार्केटप्लेस पर अपनी उपज बेच सकते हैं।",
      weather:
        "आपके क्षेत्र के लिए मौसम का पूर्वानुमान कल बारिश की अधिक संभावना दिखाता है। किसी भी नियोजित छिड़काव गतिविधियों में देरी पर विचार करें।",
      disease: "क्रॉप डॉक्टर का उपयोग करने के लिए, प्रभावित पौधे के हिस्से की एक स्पष्ट तस्वीर लें और इसे क्रॉप डॉक्टर टूल में अपलोड करें।",
      price: "टमाटर के लिए वर्तमान बाजार मूल्य गुणवत्ता और स्थान के आधार पर ₹40 से ₹60 प्रति किलो तक हैं।",
      help: "मैं आपको FarmLink नेविगेट करने, मौसम का पूर्वानुमान जांचने, बाजार मूल्य प्राप्त करने, क्रॉप डॉक्टर का उपयोग करने या अपने उत्पादों को सूचीबद्ध करने में मदद कर सकता हूं। आप क्या करना चाहेंगे?",
    },
    "ta-IN": {
      market:
        "நீங்கள் 'எனது தயாரிப்புகள்' பிரிவுக்குச் சென்று, 'புதிய தயாரிப்பைச் சேர்' என்பதைக் கிளிக் செய்வதன் மூலம் உங்கள் விளைபொருட்களை சந்தையில் விற்கலாம்.",
      weather:
        "உங்கள் பகுதிக்கான வானிலை முன்னறிவிப்பு நாளை மழை பெய்யும் வாய்ப்பு அதிகம் என்று காட்டுகிறது. திட்டமிட்ட தெளிப்பு நடவடிக்கைகளை தாமதப்படுத்த பரிசீலிக்கவும்.",
      disease:
        "பயிர் மருத்துவரைப் பயன்படுத்த, பாதிக்கப்பட்ட தாவரப் பகுதியின் தெளிவான படத்தை எடுத்து, பயிர் மருத்துவர் கருவியில் பதிவேற்றவும்.",
      price: "தக்காளிக்கான தற்போதைய சந்தை விலைகள் தரம் மற்றும் இடத்தைப் பொறுத்து கிலோவுக்கு ₹40 முதல் ₹60 வரை இருக்கும்.",
      help: "FarmLink ஐ வழிநடத்த, வானிலை முன்னறிவிப்புகளைச் சரிபார்க்க, சந்தை விலைகளைப் பெற, பயிர் மருத்துவரைப் பயன்படுத்த அல்லது உங்கள் தயாரிப்புகளைப் பட்டியலிட நான் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
    },
  }

  const exampleQueries = {
    "en-IN": [
      "How do I sell my produce?",
      "What's the weather forecast?",
      "How do I use the Crop Doctor?",
      "What are current tomato prices?",
      "Help me navigate FarmLink",
    ],
    "hi-IN": [
      "मैं अपनी उपज कैसे बेचूं?",
      "मौसम का पूर्वानुमान क्या है?",
      "मैं क्रॉप डॉक्टर का उपयोग कैसे करूं?",
      "टमाटर के वर्तमान मूल्य क्या हैं?",
      "मुझे FarmLink नेविगेट करने में मदद करें",
    ],
    "ta-IN": [
      "நான் எனது விளைபொருட்களை எப்படி விற்பது?",
      "வானிலை முன்னறிவிப்பு என்ன?",
      "நான் பயிர் மருத்துவரை எப்படி பயன்படுத்துவது?",
      "தக்காளியின் தற்போதைய விலைகள் என்ன?",
      "FarmLink ஐ வழிநடத்த எனக்கு உதவுங்கள்",
    ],
  }

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false

        recognitionRef.current.onresult = (event) => {
          const transcriptText = event.results[0][0].transcript
          setTranscript(transcriptText)
          handleUserQuery(transcriptText)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      } else {
        setSupported(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language
    }
  }, [language])

  const startListening = () => {
    setTranscript("")
    setResponse("")
    setShowExamples(false)

    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleUserQuery = (query) => {
    // Simple keyword matching for demo purposes
    const queryLower = query.toLowerCase()
    let responseKey = null

    if (
      queryLower.includes("sell") ||
      queryLower.includes("market") ||
      queryLower.includes("बेच") ||
      queryLower.includes("उपज") ||
      queryLower.includes("விற்") ||
      queryLower.includes("சந்தை")
    ) {
      responseKey = "market"
    } else if (
      queryLower.includes("weather") ||
      queryLower.includes("rain") ||
      queryLower.includes("forecast") ||
      queryLower.includes("मौसम") ||
      queryLower.includes("बारिश") ||
      queryLower.includes("வானிலை") ||
      queryLower.includes("மழை")
    ) {
      responseKey = "weather"
    } else if (
      queryLower.includes("disease") ||
      queryLower.includes("crop doctor") ||
      queryLower.includes("plant health") ||
      queryLower.includes("रोग") ||
      queryLower.includes("क्रॉप डॉक्टर") ||
      queryLower.includes("நோய்") ||
      queryLower.includes("பயிர் மருத்துவர்")
    ) {
      responseKey = "disease"
    } else if (
      queryLower.includes("price") ||
      queryLower.includes("cost") ||
      queryLower.includes("rate") ||
      queryLower.includes("मूल्य") ||
      queryLower.includes("कीमत") ||
      queryLower.includes("விலை") ||
      queryLower.includes("செலவு")
    ) {
      responseKey = "price"
    } else {
      responseKey = "help"
    }

    const responseText = sampleResponses[language]?.[responseKey] || sampleResponses["en-IN"][responseKey]
    setResponse(responseText)

    // Speak the response
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(responseText)

      // Try to find a voice that matches the selected language
      const voices = window.speechSynthesis.getVoices()
      const voice = voices.find((v) => v.lang.startsWith(language.split("-")[0]))
      if (voice) {
        utterance.voice = voice
      }

      utterance.lang = language
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      window.speechSynthesis.cancel() // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance)
      speechSynthesisRef.current = utterance
    }
  }

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleExampleClick = (example) => {
    setTranscript(example)
    handleUserQuery(example)
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Multilingual Voice Assistant</span>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!supported ? (
            <div className="p-4 text-center bg-amber-50 text-amber-700 rounded-md">
              Your browser doesn't support speech recognition. Please try using Chrome or Edge.
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex gap-4">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    className={isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                    disabled={isSpeaking}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="mr-2 h-4 w-4" /> Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" /> Start Listening
                      </>
                    )}
                  </Button>

                  {isSpeaking && (
                    <Button variant="outline" onClick={stopSpeaking}>
                      <VolumeX className="mr-2 h-4 w-4" /> Stop Speaking
                    </Button>
                  )}
                </div>

                {isListening && (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Listening...
                  </div>
                )}
              </div>

              {transcript && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-sm text-gray-500">You said:</h3>
                  <p className="mt-1">{transcript}</p>
                </div>
              )}

              {response && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Volume2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Assistant response:</h3>
                      <p className="mt-1">{response}</p>
                    </div>
                  </div>
                </div>
              )}

              {showExamples && (
                <div className="mt-6">
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Try asking:</h3>
                  <div className="flex flex-wrap gap-2">
                    {exampleQueries[language]?.map((example, index) => (
                      <Badge
                        key={index}
                        className="cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleExampleClick(example)}
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
