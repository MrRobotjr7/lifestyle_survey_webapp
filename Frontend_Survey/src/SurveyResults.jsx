import React, { useEffect, useState } from 'react';

export default function SurveyResults() {
  const [activeTab, setActiveTab] = useState('results');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/surveys/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  if (!stats || stats.total_surveys === 0) {
    return <div className="text-center p-10 text-black">No Surveys Available.</div>;
  }

  return (
    <div className="min-h-screen w-full p-8">
      <div className="w-full p-8">

        {/* Survey Results  */}
        <div className="text-center mb-12">
          <h1 className="text-xl font-bold text-black">Survey Results</h1>
        </div>

        {/* Results Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Demographics Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">Total number of surveys :</span>
              <span className="text-sm text-black">{stats.total_surveys}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">Average Age :</span>
              <span className="text-sm text-black">{stats.average_age}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">Oldest person who participated in survey :</span>
              <span className="text-sm text-black">{stats.oldest_age}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">Youngest person who participated in survey :</span>
              <span className="text-sm text-black">{stats.youngest_age}</span>
            </div>
          </div>

          {/* Food Preferences Section */}
          <div className="space-y-4 pt-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">Percentage of people who like Pizza :</span>
              <span className="text-sm text-black">{stats.pizza_percent}%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">Percentage of people who like Pasta :</span>
              <span className="text-sm text-black">{stats.pasta_percent}%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">Percentage of people who like Pap and Wors :</span>
              <span className="text-sm text-black">{stats.pap_and_wors_percent}%</span>
            </div>
          </div>

          {/* Activity Ratings Section */}
          <div className="space-y-4 pt-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">People who like to watch movies :</span>
              <span className="text-sm text-black">{stats.watch_movies_avg}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">People who like to listen to radio :</span>
              <span className="text-sm text-black">{stats.listen_radio_avg}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">People who like to eat out :</span>
              <span className="text-sm text-black">{stats.eat_out_avg}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-black">People who like to watch TV :</span>
              <span className="text-sm text-black">{stats.watch_tv_avg}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
