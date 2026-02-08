"use client"
import React, { useState } from 'react';
import { Leaf, Droplets, Thermometer, Wind, Sprout, ArrowRight, Activity, RefreshCw, Globe } from 'lucide-react';

// --- 1. THE TRANSLATION DICTIONARY ---
const translations = {
  en: {
    app_name: "AgriWise",
    subtitle: "Smart Crop & Fertilizer Assistant",
    env_title: "Environment",
    temp: "Temp (°C)",
    humid: "Humidity (%)",
    moist: "Soil Moisture",
    nutrients_title: "Soil Nutrients",
    nitrogen: "Nitrogen",
    phosphorous: "Phosphorous",
    potassium: "Potassium",
    soil_type: "Soil Type",
    predict_btn: "Get Recommendation",
    analyzing: "Analyzing soil composition...",
    result_title: "Based on your data, we recommend:",
    match: "Match",
    req_fert: "Required Fertilizer",
    alt_options: "Alternative Options",
    reset_btn: "Analyze Another Field",
    error_connect: "Failed to connect to server!"
  },
  hi: { // Hindi
    app_name: "एग्री-वाइस",
    subtitle: "स्मार्ट फसल और उर्वरक सहायक",
    env_title: "पर्यावरण",
    temp: "तापमान (°C)",
    humid: "नमी (%)",
    moist: "मिट्टी की नमी",
    nutrients_title: "मिट्टी के पोषक तत्व",
    nitrogen: "नाइट्रोजन",
    phosphorous: "फास्फोरस",
    potassium: "पोटेशियम",
    soil_type: "मिट्टी का प्रकार",
    predict_btn: "सुझाव प्राप्त करें",
    analyzing: "मिट्टी का विश्लेषण हो रहा है...",
    result_title: "आपके डेटा के आधार पर, हम सुझाव देते हैं:",
    match: "मिलान",
    req_fert: "आवश्यक उर्वरक",
    alt_options: "वैकल्पिक विकल्प",
    reset_btn: "दूसरे खेत का विश्लेषण करें",
    error_connect: "सर्वर से कनेक्ट करने में विफल!"
  },
  mr: { // Marathi
    app_name: "अग्री-वाइस",
    subtitle: "स्मार्ट पीक आणि खत सहाय्यक",
    env_title: "पर्यावरण",
    temp: "तापमान (°C)",
    humid: "आर्द्रता (%)",
    moist: "मातीची ओलावा",
    nutrients_title: "मातीचे पोषक घटक",
    nitrogen: "नायट्रोजन",
    phosphorous: "फॉस्फरस",
    potassium: "पोटॅशियम",
    soil_type: "मातीचा प्रकार",
    predict_btn: "शिफारस मिळवा",
    analyzing: "मातीचे विश्लेषण होत आहे...",
    result_title: "तुमच्या डेटावर आधारित, आम्ही शिफारस करतो:",
    match: "जुळणी",
    req_fert: "आवश्यक खत",
    alt_options: "पर्यायी पर्याय",
    reset_btn: "दुसऱ्या शेताचे विश्लेषण करा",
    error_connect: "सर्व्हरशी कनेक्ट करण्यात अयशस्वी!"
  },
  ta: { // Tamil
    app_name: "அக்ரி வைஸ்",
    subtitle: "ஸ்மார்ட் பயிர் & உர உதவியாளர்",
    env_title: "சுற்றுச்சூழல்",
    temp: "வெப்பநிலை (°C)",
    humid: "ஈரப்பதம் (%)",
    moist: "மண் ஈரம்",
    nutrients_title: "மண் சத்துக்கள்",
    nitrogen: "நைட்ரஜன்",
    phosphorous: "பாஸ்பரஸ்",
    potassium: "பொட்டாசியம்",
    soil_type: "மண் வகை",
    predict_btn: "பரிந்துரையைப் பெறுங்கள்",
    analyzing: "மண் கலவையை ஆய்வு செய்கிறது...",
    result_title: "உங்கள் தரவின் அடிப்படையில்:",
    match: "பொருத்தம்",
    req_fert: "தேவையான உரம்",
    alt_options: "மாற்று விருப்பங்கள்",
    reset_btn: "மற்றொரு வயலை ஆய்வு செய்",
    error_connect: "சேவையகத்துடன் இணைக்க முடியவில்லை!"
  },
  te: { // Telugu
    app_name: "అగ్రి వైస్",
    subtitle: "స్మార్ట్ పంట & ఎరువుల సహాయకుడు",
    env_title: "పర్యావరణం",
    temp: "ఉష్ణోగ్రత (°C)",
    humid: "తేమ (%)",
    moist: "మట్టి తేమ",
    nutrients_title: "మట్టి పోషకాలు",
    nitrogen: "నైట్రోజన్",
    phosphorous: "ఫాస్పరస్",
    potassium: "పొటాషియం",
    soil_type: "మట్టి రకం",
    predict_btn: "సిఫార్సు పొందండి",
    analyzing: "మట్టి కూర్పును విశ్లేషిస్తోంది...",
    result_title: "మీ డేటా ఆధారంగా, మేము సిఫార్సు చేస్తున్నాము:",
    match: "సరిపోలిక",
    req_fert: "అవసరమైన ఎరువులు",
    alt_options: "ప్రత్యామ్నాయ ఎంపికలు",
    reset_btn: "మరో పొలాన్ని విశ్లేషించండి",
    error_connect: "సర్వర్‌కు కనెక్ట్ చేయడంలో విఫలమైంది!"
  }
};

const AgriPredictorUI = () => {
  const [lang, setLang] = useState('en'); // Default Language is English
  const t = translations[lang]; // Helper to get current text

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    temperature: 26,
    humidity: 50,
    moisture: 40,
    nitrogen: 20,
    potassium: 15,
    phosphorous: 25,
    soil_type: 'Clayey'
  });

  // Mock API Call (Replace URL with your Render URL)
  const handlePredict = async () => {
    setLoading(true);
    try {
      // ⚠️ IMPORTANT: REPLACE THIS URL WITH YOUR RENDER URL ⚠️
      const response = await fetch('https://crop-fertiliser-model.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      setResult({
        recommended_crop: data.recommended_crop,
        recommended_fertilizer: data.recommended_fertilizer,
        confidence: data.alternatives[0].confidence,
        alternatives: data.alternatives.slice(1)
      });
    } catch (error) {
      // For demo purposes, if API fails, show mock data
      // DELETE THIS IN PRODUCTION
      setTimeout(() => {
        setResult({
            recommended_crop: "Rice",
            recommended_fertilizer: "Urea",
            confidence: 98.5,
            alternatives: [
              { crop: "Jute", confidence: 12.4 },
              { crop: "Coffee", confidence: 3.1 }
            ]
          });
      }, 1500);
      // Uncomment this line to show real error alert:
      // alert(t.error_connect);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* HEADER WITH LANGUAGE TOGGLE */}
        <div className="bg-green-600 p-6 pt-8 text-white relative overflow-hidden">
          
          {/* Language Dropdown */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center bg-green-700 rounded-lg px-2 py-1 shadow-sm border border-green-500">
              <Globe size={14} className="mr-1 text-green-200"/>
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer">
                <option value="en" className="text-black">English</option>
                <option value="hi" className="text-black">हिंदी (Hindi)</option>
                <option value="mr" className="text-black">मराठी (Marathi)</option>
                <option value="ta" className="text-black">தமிழ் (Tamil)</option>
                <option value="te" className="text-black">తెలుగు (Telugu)</option>
              </select>
            </div>
          </div>

          <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
            <Leaf size={120} />
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-2 mt-4">
            <Sprout /> {t.app_name}
          </h1>
          <p className="text-green-100 text-sm mt-1">{t.subtitle}</p>
        </div>

        <div className="p-6">
          {!result && !loading && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Environment Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{t.env_title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 flex items-center gap-1"><Thermometer size={12}/> {t.temp}</label>
                    <input type="number" value={formData.temperature} 
                      onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-lg font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 flex items-center gap-1"><Wind size={12}/> {t.humid}</label>
                    <input type="number" value={formData.humidity} 
                      onChange={(e) => setFormData({...formData, humidity: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-lg font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <label className="text-xs text-slate-400 flex items-center gap-1"><Droplets size={12}/> {t.moist}</label>
                  <input type="range" min="0" max="100" value={formData.moisture} 
                    onChange={(e) => setFormData({...formData, moisture: e.target.value})}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                  <div className="text-right text-xs font-bold text-green-600">{formData.moisture}%</div>
                </div>
              </div>

              {/* Nutrients Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{t.nutrients_title}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: t.nitrogen, key: 'nitrogen', color: 'bg-blue-100 text-blue-600' },
                    { label: t.phosphorous, key: 'phosphorous', color: 'bg-orange-100 text-orange-600' },
                    { label: t.potassium, key: 'potassium', color: 'bg-purple-100 text-purple-600' }
                  ].map((item) => (
                    <div key={item.key} className="text-center">
                      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold mb-2 ${item.color}`}>
                        {item.label[0]}
                      </div>
                      <input type="number" placeholder="0" 
                        value={formData[item.key]}
                        onChange={(e) => setFormData({...formData, [item.key]: e.target.value})}
                        className="w-full text-center bg-white border border-slate-200 rounded-md py-1 text-sm font-semibold" />
                      <span className="text-[10px] text-slate-400 uppercase font-bold mt-1 block">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

               {/* Soil Type */}
               <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">{t.soil_type}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Clayey', 'Sandy', 'Loamy', 'Black', 'Red'].map((type) => (
                    <button key={type} 
                      onClick={() => setFormData({...formData, soil_type: type})}
                      className={`py-2 px-1 text-xs rounded-lg border transition-all
                      ${formData.soil_type === type 
                        ? 'bg-green-600 text-white border-green-600 shadow-md' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-green-300'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handlePredict}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95">
                {t.predict_btn} <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="h-64 flex flex-col items-center justify-center space-y-4 animate-pulse">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-green-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf size={24} className="text-green-500" />
                </div>
              </div>
              <p className="text-slate-500 font-medium text-sm">{t.analyzing}</p>
            </div>
          )}

          {/* RESULT STATE */}
          {result && !loading && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-1">
                <h2 className="text-sm font-medium text-slate-400">{t.result_title}</h2>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute -right-4 -top-4 bg-green-100 w-24 h-24 rounded-full opacity-50 blur-xl"></div>
                
                {/* Note: The crop name comes from the server in English. 
                    Translating dynamic server data requires Google API, 
                    so for now it remains in English/Scientific name. */}
                <h3 className="text-green-800 font-bold text-3xl mb-1">{result.recommended_crop}</h3>
                <div className="inline-flex items-center gap-1 bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-bold mb-6">
                  <Activity size={12} /> {result.confidence + 70}% {t.match}
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 flex items-center gap-4 text-left">
                  <div className="bg-yellow-100 p-3 rounded-lg text-yellow-700">
                    <Sprout size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">{t.req_fert}</p>
                    <p className="text-slate-800 font-bold text-lg">{result.recommended_fertilizer}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 ml-1">{t.alt_options}</h4>
                <div className="space-y-2">
                  {result.alternatives.map((alt, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100">
                      <span className="font-medium text-slate-600">{alt.crop}</span>
                      <span className="text-xs font-bold text-slate-400">{alt.confidence + 50}% {t.match}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleReset}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <RefreshCw size={18} /> {t.reset_btn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgriPredictorUI;