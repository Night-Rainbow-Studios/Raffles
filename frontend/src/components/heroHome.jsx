"use client";
import { useState, useEffect } from 'react';

export default function HeroHome(props) {
    const [heroic, setHeroic] = useState("")

    async function fetchAPI() {
        const result = await props.service.getContent();
        setHeroic(result);
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    return (
        <section className="relative bg-[url('/images/dinero_img.webp')] h-[50rem]" id="hero">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Hero content */}
                <div className="pb-12 pt-32 md:pb-20 md:pt-40">
                    {/* Section header */}
                    <div className="pb-12 text-center md:pb-16">
                        <a href="/"
                            className="mb-6 border-y text-5xl [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            data-aos="zoom-y-out"
                            data-aos-delay={150}
                        >
                            {heroic.title}
                        </a>
                    </div>
                </div>
            </div>
            <div id="faq">
                <h1 className="text-3xl text-gray-200 shadow text-center bg-gray-800 py-5">PREGUNTAS FRECUENTES</h1>
                <p className="text-lg bg-white text-gray-800 shadow text-center my-5">
                    ¿CÓMO SE ELIGE A LOS GANADORES? <br></br>

                    Todos nuestros sorteos se realizan en base a la Lotería Nacional para la Asistencia Pública mexicana.

                    El ganador de SORTEOS HEREDIA será el participante cuyo número de boleto coincida con las últimas cifras del primer premio ganador de la Lotería Nacional (las fechas serán publicadas en nuestra página oficial).

                    <br></br>¿QUÉ SUCEDE CUANDO EL NÚMERO GANADOR ES UN BOLETO NO VENDIDO<br></br>

                    Se elige un nuevo ganador realizando la misma dinámica en otra fecha cercana (se anunciará la nueva fecha).

                    Esto significa que, ¡Tendrías el doble de oportunidades de ganar con tu mismo boleto!<br></br>

                    ¿DÓNDE SE PUBLICA A LOS GANADORES?<br></br>

                    En nuestra página oficial de Facebook SORTEOS HEREDIA puedes encontrar todos y cada uno de nuestros sorteos anteriores, así como las transmisiones en vivo con Lotería Nacional y las entregas de premios a los ganadores!

                </p>
            </div>
        </section>
    );
}
