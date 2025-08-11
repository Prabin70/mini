import React from "react";

function HomePage() {
  return (
    <div>
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center">
            Unlock Your Potential
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-100 text-center">
            Join thousands of learners mastering new skills, advancing their
            careers, and transforming their futures.
          </p>

          <div className="mt-8">
            <a
              href="/signup"
              className="bg-green-600 text-white px-8 py-3 rounded-sm text-lg font-semibold hover:bg-green-700 transition-all"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
