import React, { useState } from 'react';

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    favoriteFood: [],
    movieRating: '',
    radioRating: '',
    eatOutRating: '',
    tvRating: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData(prev => ({
      ...prev,
      favoriteFood: prev.favoriteFood.includes(value)
        ? prev.favoriteFood.filter(item => item !== value)
        : [...prev.favoriteFood, value]
    }));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      dateOfBirth: '',
      contactNumber: '',
      favoriteFood: [],
      movieRating: '',
      radioRating: '',
      eatOutRating: '',
      tvRating: ''
    });
  };

  const handleSubmit = () => {
    const {
      fullName,
      email,
      dateOfBirth,
      contactNumber,
      favoriteFood,
      movieRating,
      radioRating,
      eatOutRating,
      tvRating
    } = formData;

    if (!fullName || !email || !dateOfBirth || !contactNumber) {
      return alert("⚠️ All personal detail fields are required.");
    }

    const age = calculateAge(dateOfBirth);
    if (age < 5 || age > 120) {
      return alert("Age must be between 5 and 120 years.");
    }

    if (favoriteFood.length === 0) {
      return alert("Please select at least one favorite food.");
    }

    if (!movieRating || !radioRating || !eatOutRating || !tvRating) {
      return alert("Please select a rating for all four questions.");
    }

    const payload = {
      full_name: fullName,
      email,
      date_of_birth: dateOfBirth,
      contact_number: contactNumber,
      favorite_foods: favoriteFood,
      ratings: {
        watch_movies: parseInt(movieRating),
        listen_radio: parseInt(radioRating),
        eat_out: parseInt(eatOutRating),
        watch_tv: parseInt(tvRating)
      }
    };

    fetch("http://localhost:5000/api/surveys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Submission failed");
        alert("Survey submitted successfully!");
        resetForm();
      })
      .catch(err => {
        console.error(err);
        alert("Error submitting survey");
      });
  };

  return (
    <div className="min-h-screen w-full p-8">
      <div className="w-full p-8">

        {/* Personal Details Section */}
        <div className="grid grid-cols-12 gap-8 mb-10">
          <div className="col-span-3">
            <h3 className="text-base font-small text-black-800 pt-2">Personal Details:</h3>
          </div>
          <div className="col-span-9 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Names</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full max-w-xs border border-blue-400 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full max-w-xs border border-blue-400 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full max-w-xs border border-blue-400 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full max-w-xs border border-blue-400 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Favorite Food Section */}
        <div className="mb-10">
          <div className="flex items-center gap-8 mb-4">
            <span className="text-base font-medium text-gray-800 min-w-fit">What is your favorite food?</span>
            <div className="flex items-center gap-8 flex-wrap">
              {["Pizza", "Pasta", "Pap and Wors", "Other"].map((food) => (
                <label key={food} className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.favoriteFood.includes(food)}
                    onChange={() => handleCheckboxChange(food)}
                    className="mr-3 w-4 h-4 text-blue-400 border-blue-400 rounded focus:ring-blue-400"
                  />
                  {food}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-10">
          <p className="text-base text-gray-800 mb-6 leading-relaxed">
            Please rate your level of agreement on a scale from 1 to 5, with 1 being "strongly agree" and 5 being "strongly disagree."
          </p>

          <div className="border border-blue-400 rounded-lg overflow-hidden shadow-sm">
            {/* Header Row */}
            <div className="grid grid-cols-6 bg-gray-300 border-b border-blue-400">
              <div className="p-4 border-r border-blue-400"></div>
              {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((label, i) => (
                <div key={i} className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-blue-400">
                  {label}
                </div>
              ))}
            </div>

            {/* Row Template */}
            {[
              { name: "movieRating", label: "I like to watch movies" },
              { name: "radioRating", label: "I like to listen to radio" },
              { name: "eatOutRating", label: "I like to eat out" },
              { name: "tvRating", label: "I like to watch TV" }
            ].map(({ name, label }, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-6 border-b border-blue-400 hover:bg-gray-50">
                <div className="p-4 text-sm font-medium text-black-800 border-r border-blue-400 bg-blue-25 flex items-center">
                  {label}
                </div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="p-4 text-center border-r border-blue-400 flex justify-center items-center">
                    <input
                      type="radio"
                      name={name}
                      value={value}
                      checked={formData[name] === String(value)}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-400 border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-400 hover:bg-blue-500 text-white px-12 py-3 text-sm font-semibold rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}