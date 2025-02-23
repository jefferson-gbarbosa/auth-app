import React from 'react';
import { Footer } from '../components/footer';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';

export function Home(){
    return(
        <>
            <Header />
            <section className="h-screen w-full py-6 md:py-12">
                <div className="max-w-screen-xl mx-auto inset-0 flex flex-col md:justify-center items-center px-4 md:px-8 lg:px-16 text-center"> 
                    <div className="max-w-2xl md:w-full"> 
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                            Tenha acesso a diversas oportunidades para desenvolvedores.
                        </h1>
                        <p className="text-white text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, voluptatum voluptatibus ut sunt beatae ducimus quibusdam odio dicta incidunt nostrum cupiditate vero ad distinctio atque quia illo saepe, consequatur labore?
                        </p>
                        <Link
                            to="/login"
                            className="inline-block text-base md:text-lg px-6 py-3 text-white bg-[#2B805A] hover:bg-[#216340] transition duration-300 rounded-lg border border-white hover:border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#6EE7B7] w-full md:w-auto"
                        >
                            Entrar na comunidade
                        </Link>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
 }
