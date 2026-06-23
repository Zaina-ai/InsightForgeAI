"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("Drop your feedback.csv or upload");

  async function analyze() {
    if (!file) {
      setStatus("Choose a CSV first");
      return;
    }

    try {
      setStatus("Forging insights...");

      const formData = new FormData();
      formData.append("file", file, "feedback.csv");

      await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const res = await fetch("http://127.0.0.1:8000/analyze");
      const result = await res.json();

      setData(result);
      setStatus("Complete ✨");
    } catch {
      setStatus("Backend not running");
    }
  }

  return (
    <main
      className="min-h-screen text-white overflow-hidden"
      style={{ background: "#616360" }}
    >
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <nav className="relative z-10 border-b border-[#8B8C89] px-10 py-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-wide drop-shadow-[0_0_15px_#60A5FA]">
            InsightForge
          </h1>
          <p className="text-gray-300 text-xs tracking-[0.3em]">AI · V1</p>
        </div>

        <div className="text-blue-400 font-bold tracking-[0.3em] animate-pulse">
          ✦ FORGE
        </div>
      </nav>

      <section className="relative z-10 px-10 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-gray-300 tracking-[0.4em] text-sm mb-5">
            FUTURE GEN · CUSTOMER INTELLIGENCE
          </p>

          <h2 className="text-7xl font-black mt-4 leading-tight bg-gradient-to-r from-white via-blue-200 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_#3B82F6]">
            Turn raw feedback into decisions worth shipping.
          </h2>

          <p className="mt-8 text-gray-200 text-xl max-w-xl">
            Upload feedback and instantly generate sentiment analysis, detected
            themes, and priority recommendations.
          </p>

          <div className="flex gap-4 mt-10">
            <label>
              <input
                hidden
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <div className="cursor-pointer bg-blue-600 hover:bg-blue-700 hover:scale-105 transition duration-300 px-8 py-5 rounded-xl shadow-lg shadow-blue-500/30">
                📁 {file ? file.name : "UPLOAD CSV"}
              </div>
            </label>

            <button
              onClick={analyze}
              className="border border-[#8B8C89] px-8 py-5 rounded-xl hover:bg-[#777974] hover:scale-105 transition duration-300"
            >
              ⚡ ANALYZE
            </button>
          </div>

          <p className="mt-6 text-blue-100 animate-pulse">{status}</p>
        </div>

        <div className="bg-[#777974]/80 backdrop-blur-xl rounded-3xl p-14 text-center border border-white/20 shadow-2xl hover:scale-105 transition duration-500">
          <div className="text-blue-400 text-7xl drop-shadow-[0_0_25px_#60A5FA]">
            ▣
          </div>

          <h3 className="text-3xl mt-6 font-black">Drop feedback.csv</h3>

          <p className="text-gray-300 mt-3 tracking-widest">
            OR CLICK UPLOAD TO BROWSE
          </p>

          <pre className="mt-10 text-left bg-black/20 p-5 rounded-xl text-gray-200">
{`id,feedback
1,"Login keeps failing"
2,"Need dark mode"
3,"Payment failed"`}
          </pre>
        </div>
      </section>

      {data && (
        <section className="relative z-10 px-10 pb-20">
          <div className="grid md:grid-cols-4 gap-5 mb-10">
            <Card title="Feedback" value={data.total_feedback} />
            <Card title="Positive" value={`${data.sentiment_distribution.positive}%`} />
            <Card title="Negative" value={`${data.sentiment_distribution.negative}%`} />
            <Card title="Themes" value={data.theme_distribution.length} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-[#777974]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-blue-300 mb-6">
                Theme Distribution
              </h2>

              {data.theme_distribution.map((item: any) => (
                <div key={item.theme} className="mb-5">
                  <div className="flex justify-between">
                    <span>{item.theme}</span>
                    <span>{item.count}</span>
                  </div>

                  <div className="h-3 bg-white/20 rounded-full mt-2">
                    <div
                      className="h-3 rounded-full bg-blue-500 shadow-[0_0_15px_#3B82F6]"
                      style={{ width: `${Math.min(item.count * 15, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-[#777974]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-blue-300 mb-6">
                Recommendations
              </h2>

              {data.recommendations.map((rec: any, index: number) => (
                <div
                  key={index}
                  className="bg-black/20 rounded-2xl p-5 mb-4 border border-white/10"
                >
                  <h3 className="font-black text-xl">
                    Priority {index + 1}: {rec.theme}
                  </h3>
                  <p className="text-blue-300">Impact: {rec.impact}</p>
                  <p className="text-gray-200">{rec.recommendation}</p>
                </div>
              ))}
            </section>
          </div>
        </section>
      )}
    </main>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-[#777974]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl hover:scale-105 transition duration-300">
      <p className="text-gray-300">{title}</p>
      <h2 className="text-5xl font-black text-blue-300 drop-shadow-[0_0_20px_#60A5FA]">
        {value}
      </h2>
    </div>
  );
}