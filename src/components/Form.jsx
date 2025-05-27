import React, { useState } from 'react';
import '../App.css';
import Slideshow from './slideshow';
import Loading from './Loading';

const Form = () => {
  const [formData, setFormData] = useState({
    from_: '',
    Location: '',
    Budget: '',
    Duration: '',
    People: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itinerary, setItinerary] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setItinerary('');

    try {
      const response = await fetch('https://ai-travel-buddy.onrender.com/plan-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to get itinerary');

      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      from_: '',
      Location: '',
      Budget: '',
      Duration: '',
      People: ''
    });
    setItinerary('');
    setError('');
  };

  if (loading) return <Loading />;

  if (itinerary) {
    return (
      <div className="min-h-screen bg-[#000000] text-white p-8 flex flex-col items-start">
        <h2 className="text-3xl font-bold mb-4">Your Travel Itinerary</h2>
        <div className="whitespace-pre-wrap text-lg leading-relaxed bg-gray-900 p-6 rounded-xl border border-gray-700 w-full">
          {itinerary}
        </div>
        <button
          onClick={handleReset}
          className="mt-6 px-6 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Plan Another Trip
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#000000cb] text-white">
      <div className="w-full lg:w-1/2">
        <Slideshow />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 font-serif">Travel Buddy</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input name="from_" label="From" value={formData.from_} onChange={handleChange} />
          <Input name="Location" label="To" value={formData.Location} onChange={handleChange} />
          <Input name="Budget" label="Budget" value={formData.Budget} onChange={handleChange} />
          <Input name="Duration" label="Duration" value={formData.Duration} onChange={handleChange} />
          <Input name="People" label="People" value={formData.People} onChange={handleChange} type="number" />

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition w-full"
            >
              Get Your Itinerary Now
            </button>
          </div>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

const Input = ({ name, label, value, onChange, type = 'text' }) => (
  <div>
    <label className="text-sm text-gray-200">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={`Enter ${label}`}
      className="w-full px-4 py-3 mt-1 rounded-md bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default Form;
