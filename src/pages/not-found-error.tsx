import React from 'react';
import { Link } from "react-router-dom";
import { NotPage404 } from "../components/404-not-page";

export function ErrorNotPage(){
    return(
      <section className="h-screen w-full py-6 md:py-12">
        <div className="max-w-screen-xl mx-auto inset-0 flex flex-col md:justify-center items-center px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-20 text-center"> 
            <div className="max-w-xs md:w-full"> 
              <NotPage404 />
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">Oops!</h1>
              <p className="text-white text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 leading-relaxed">
                 Desculpe, página não encontrada
              </p>
              <Link
                  to="/home"
                  className="inline-block text-base md:text-lg px-6 py-3 text-white bg-[#2B805A] hover:bg-[#216340] transition duration-300 rounded-lg border border-white hover:border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#6EE7B7] w-full md:w-auto"
              >
                  Go home
              </Link>
            </div>
        </div>
      </section>
    )
}
