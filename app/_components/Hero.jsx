import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
            <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
                AI Course Generator
                <strong className="font-extrabold text-black sm:block"> Custom Learning Path powered by AI  </strong>
                
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                Unlock personalized eduction with AI-driven course creation. Tailor your learning journey to fit your unique goals and pace.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                <a className="inline-block rounded border border-indigo-600 bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700" href="#">
                Get Started
                </a>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Hero