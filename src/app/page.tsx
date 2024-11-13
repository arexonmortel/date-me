'use client'

import React, { useState } from 'react';
import Confetti from 'react-confetti'
//import { Calendar, Clock } from 'lucide-react';

const DateInvitation = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dateType, setDateType] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState('Will you go on a date with me?');
  const [showConfetti, setShowConfetti] = useState(false);



  const messages = [
    "Are you sure? 🥺",
    "Are you teasing me? 😋",
    "Pretty please? 🥹"
  ];

  const dateTypes = [
    { id: 'dinner', name: 'Dinner Date 🍝', description: 'Romantic dinner for two at a cozy restaurant' },
    { id: 'movie', name: 'Movie Night 🎬', description: 'Cozy cinema experience with popcorn' },
    { id: 'picnic', name: 'Park Picnic 🧺', description: 'Outdoor dining with scenic views' },
    { id: 'cuddles', name: 'Stay-in Cuddles 🛋️', description: 'Netflix and chill at home' },
    { id: 'arcade', name: 'Arcade Adventure 🎮', description: 'Gaming fun and friendly competition' },
    { id: 'cooking', name: 'Cooking Together 👩‍🍳', description: 'Let\'s create a delicious meal together' },
    { id: 'beach', name: 'Beach Walk 🏖️', description: 'Romantic stroll along the shoreline' },
    { id: 'museum', name: 'Museum Visit 🏛️', description: 'Explore art and culture together' }
  ];

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    setMessage(messages[noCount % messages.length]);
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 30_000);
  };

  const calculateButtonSize = () => {
    //const baseSize = 'text-lg';
    const sizes = ['text-xl', 'text-2xl', 'text-3xl'];
    return noCount < sizes.length ? sizes[noCount] : sizes[sizes.length - 1];
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4 overflow-hidden">
      {showConfetti && 
      <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {!showConfirmation ? (
          <div className="space-y-6">
            {!yesPressed ? (
              <>
                <h2 className="text-2xl font-bold text-center text-pink-600 mb-8">
                  {message}
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleYesClick}
                    className={`${calculateButtonSize()} bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all`}
                  >
                    Yes 💝
                  </button>
                  {noCount < 3 && (
                    <button
                      onClick={handleNoClick}
                      className={`text-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full transform hover:scale-95 transition-all`}
                    >
                      No 😢
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Pick a date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Pick a time
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={(e) => setSelectedTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    What kind of date?
                  </label>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {dateTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setDateType(type.id)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          dateType === type.id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <div className="font-bold">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && selectedTime && dateType && (
                  <button
                    onClick={handleConfirm}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all"
                  >
                    Confirm Date 💕
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-pink-600">
              Yay! I&apos;m so excited! 🎉
            </h2>
            <p className="text-gray-600">
              Can&apos;t wait for our {dateTypes.find(t => t.id === dateType)?.name} on{' '}
              {formatDateTime(selectedDate, selectedTime)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateInvitation;
