"use client";
import React from "react";
import Navbar from "./components/Navbar";
import me from "./img/me.jpg";
import meh from "./img/meh.jpg";
import mehh from "./img/mehh.jpeg";
import Top from "./components/Top";
// import Projects from "./components/Projects";
import Project from "./components/Project";
import Footer from './components/Footer'
import { TypewriterEffect } from "../src/ui/typewriter-effect";
import { useRef } from "react";
import { IconChevronDown } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import git from "./img/github.svg";
import linkedin from "./img/linkedin.svg";
import { BackgroundGradientAnimation } from './ui/background-gradient-animation';
import Sidebar from './components/Sidebar'; // Import the Sidebar component


const Landing = () => {

  const words = [
    {
      text: "A"
    },
    {
      text: "developer",
    },
    {
      text: "with",
    },
    {
      text: "a",
    },
    {
      text: "passion",

    },
    {
      text: "for",
    },
    {
      text: "building",
    },
    // {
    //   text: "innovative",
    //   className: "text-[#FFBE5C]",
    // },
    // {
    //   text: "&",
    // },
    {
      text: "user-centered",
      className: "text-[#1967D2]",
    },
    {
      text: "solutions.",
    },
  ];

  const secondPortionRef = useRef(null);

  const scrollToSecondPortion = () => {
    secondPortionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    { id: 'Home', title: 'Home' },
    { id: 'Experiences', title: 'Experiences' },
    { id: 'About', title: 'About' },
  ];

  return (
    <div className="relative isolate">
      <BackgroundGradientAnimation
        containerClassName="fixed inset-0 -z-10 pointer-events-none"
        interactive={false}
      />
      <Sidebar sections={sections} />
      {/* <div>
        <Top />
      </div> */}
      <div className="site-content">
        <section id="Home">
          <div className="relative h-screen">
            {/* <Navbar className="relative z-50" /> */}
            <div className="px-[10%] py-[10%] mt-[5%]">
              <div className="flex flex-row items-end mb-[3%] relative z-50">
                <div className="text-5xl font-semibold font-sans">
                  Hello, I'm <div className="text-7xl">Chu-Yin Weng</div>
                </div>
                <div className="ml-5 font-semibold text-3xl font-sans"> aka Dora</div>
              </div>
              <TypewriterEffect words={words} className="font-semibold text-2xl mb-5 relative text-left z-50 font-sans" />
              <div className="font-semibold text-2xl font-sans">
                Check out my projects below :)
              </div>

            </div>
            <div onClick={scrollToSecondPortion} className='absolute bottom-24 inset-x-0 z-50 group flex flex-col space-y-4 items-center hover:cursor-pointer justify-center'>
              <motion.div
                animate={{ y: ["0%", "-20%", "0%"] }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <IconChevronDown size={70} color='#202124' />
              </motion.div>
            </div>
          </div>
        </section>
        {/* <Navbar /> */}
        <section id="Experiences" ref={secondPortionRef} className="px-[15%] mt-20">
          <div>
            <div className="space-y-10">
              <div className="text-3xl font-semibold justify-center">
                Featured Work & Experiences
              </div>
              <div className="space-y-10">
                {/* <Projects /> */}
                <Project />
              </div>
            </div>
            <div className=" mt-5 mb-2">
              {" "}
              {/* GitHub Link Section */}
              Want to see more? Check out my {" "}
              <a
                href="https://github.com/dorawengg"
                className="font-bold underline"
              >

                GitHub!
              </a>
            </div>
          </div>

        </section>

        <section id="About" className="min-h-screen px-[15%] mt-20 pb-16">
          <div className="items-center">
            <div>
              <div className="flex flex-row items-start gap-10 sm:flex-col">
                <div className="flex flex-col min-w-0 flex-1 text-xl">
                  <div className="text-3xl font-semibold mb-2 sm:mb-1">
                    Still here? More about me:
                  </div>
                  <p className="mt-5 mb-2 leading-relaxed">
                    I’m a full-stack engineer who enjoys helping people understand complicated concepts and data by making information more intuitive through technology. I graduated from Cornell University with a B.S. in Computer Science and a minor in Information Science.
                  </p>
                  <p className="mt-5 mb-2 leading-relaxed">
                    At Kikoff, I build onboarding systems and internal tools, collaborate with external vendors on integrations, and work closely with Product Ops to improve the customer experience. My experience also spans data pipelines at AWS, healthcare-focused AI research, and freelance applications for education and financial analytics.
                  </p>
                  <p className="mt-5 mb-2 leading-relaxed">
                    I take pride in writing clean code, understanding the underlying problem, and choosing solutions that address it effectively. I value clear communication, thoughtful collaboration, and delivering results efficiently while staying open to new perspectives.
                  </p>
                  <p className="mt-5 mb-2 leading-relaxed">
                    Outside of work, I explore creative websites, experiment with coffee recipes, and put together monthly <a href="https://open.spotify.com/user/bz8bpaku8nlwtlnl2n4v3djh9?si=c8a0d409b5704a3b" className="font-bold underline text-[#1DB954]">Spotify</a> playlists. Have something in mind? <a href="https://www.linkedin.com/in/chuyinweng/" className="font-bold underline text-[#1967D2]">Let’s connect!</a>
                  </p>
                  <div className="flex flex-row items-center space-x-8 ">
                    <a
                      href="https://github.com/dorawengg"
                      target="_blank"
                    >
                      <img src={git} alt="GitHub Logo" className="w-full h-full" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/chuyinweng/"
                      target="_blank"
                    >
                      <img src={linkedin} alt="LinkedIn Logo" className="w-full h-full" />
                    </a>
                  </div>
                </div>
                <img
                  src={me}
                  alt="Pic of me"
                  className="rounded-3xl object-cover w-1/3 sm:w-4/5"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Landing;
