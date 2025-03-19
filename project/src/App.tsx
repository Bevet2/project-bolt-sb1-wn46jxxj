import React, { useState, useRef } from 'react';
import { Music, Upload, Wand2, Download, Loader2 } from 'lucide-react';

type Genre = 'rock' | 'electronic' | 'jazz' | 'hiphop' | 'lofi';

interface GenreOption {
  id: Genre;
  name: string;
  icon: string;
  gradient: string;
}

const genres: GenreOption[] = [
  { 
    id: 'rock', 
    name: 'Rock', 
    icon: '🎸',
    gradient: 'from-red-500 to-orange-500'
  },
  { 
    id: 'electronic', 
    name: 'Electronic', 
    icon: '🎧',
    gradient: 'from-blue-500 to-purple-500'
  },
  { 
    id: 'jazz', 
    name: 'Jazz', 
    icon: '🎷',
    gradient: 'from-yellow-500 to-amber-500'
  },
  { 
    id: 'hiphop', 
    name: 'Hip-Hop', 
    icon: '🎤',
    gradient: 'from-gray-800 to-gray-900'
  },
  { 
    id: 'lofi', 
    name: 'Lo-Fi', 
    icon: '🎼',
    gradient: 'from-teal-500 to-emerald-500'
  }
];

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'audio/mpeg' || selectedFile.type === 'audio/wav')) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'audio/mpeg' || droppedFile.type === 'audio/wav')) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleGenerate = () => {
    if (!file || !selectedGenre) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Music className="w-12 h-12 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Remix Generator AI</h1>
            <p className="text-lg text-gray-300">Transform your music into a new style with AI</p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            {/* File Upload */}
            <div 
              className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center mb-8 cursor-pointer hover:border-purple-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".mp3,.wav"
                className="hidden"
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              {file ? (
                <div className="text-purple-400 font-medium">{file.name}</div>
              ) : (
                <div>
                  <p className="text-lg mb-2">Drop your audio file here</p>
                  <p className="text-sm text-gray-400">Supports MP3 and WAV</p>
                </div>
              )}
            </div>

            {/* Genre Selection */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedGenre === genre.id
                      ? `bg-gradient-to-r ${genre.gradient} scale-105`
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-2">{genre.icon}</div>
                  <div className="font-medium">{genre.name}</div>
                </button>
              ))}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!file || !selectedGenre || isProcessing}
              className={`w-full py-4 rounded-lg font-medium text-lg flex items-center justify-center space-x-2 ${
                !file || !selectedGenre || isProcessing
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  <span>Generate Remix</span>
                </>
              )}
            </button>

            {/* Download Section */}
            {isComplete && (
              <div className="mt-8 text-center">
                <button className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium">
                  <Download className="w-5 h-5" />
                  <span>Download Remix</span>
                </button>
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '1', text: 'Upload your music file (MP3/WAV)' },
              { number: '2', text: 'Choose your target music style' },
              { number: '3', text: 'Get your AI-generated remix' }
            ].map((step, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <p className="text-gray-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;