import { Footer } from '../components/footer';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';

export function Home(){
    return(
        <>
            <Header />
            <section className="relative h-screen w-full py-24 md:py-32">
                <div className="max-w-screen-xl mx-auto absolute w-full top-1/2 left-1/2 -translate-y-1/4 -translate-x-2/4 md:-translate-y-2/4 text-center">
                    <h1 className="text-white text-3xl md:text-4xl lg:text-4xl mb-6 leading-tight">Tenha acesso a diversas oportunidades para desenvolvedores.</h1>
                    <p className="text-white text-lg md:text-xl lg:text-lg pb-6 mb-8 md:mb-16 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                        voluptatum voluptatibus ut sunt beatae ducimus quibusdam odio dicta incidunt nostrum cupiditate vero ad distinctio atque quia illo saepe,
                        consequatur labore?
                    </p>
                    <Link to='/login'className="text-base md:text-lg px-6 py-3 text-white bg-[#2B805A] hover:bg-[#216340] transition duration-300 outline-none rounded-lg border border-white hover:border-[#6EE7B7] border-solid cursor-pointer w-full md:w-auto text-center" >Entrar na comunidade</Link>
                </div>
            </section>
            <Footer/>
        </>
    )
 }
