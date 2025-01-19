import { Footer } from '../components/footer';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';

export function Home(){
    return(
        <>
            <Header />
            <section className="home relative h-screen w-full">
                <div className="max-w-screen-xl mx-auto  absolute w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-center">
                    <h1 className="text-white text-3xl mb-6">Tenha acesso a diversas oportunidades para desenvolvedores.</h1>
                    <p className="max-w-5xl mx-auto text-white text-lg pb-6 mb-16">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                        voluptatum voluptatibus ut sunt beatae ducimus quibusdam odio dicta incidunt nostrum cupiditate vero ad distinctio atque quia illo saepe,
                        consequatur labore?
                    </p>
                    <Link to='/login'className="text-xl p-4 text-[#6EE7B7] bg-[#2B805A] outline-none rounded-lg border-2 border-[#6EE7B7] border-solid cursor-pointer" >Entrar na comunidade</Link>
                </div>
            </section>
            <Footer/>
        </>
    )
 }
