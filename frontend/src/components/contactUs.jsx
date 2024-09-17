import React from 'react';
import { useState, useEffect } from 'react';

export default function Contact(props) {
    const [number, setNumber] = useState("")

    async function fetchAPI() {
        const result = await props.service.getContent();
        setNumber(result);
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    return (
        <section id="contact">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 my-5">
                <div
                    className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-200"
                    data-aos="zoom-y-out"
                >
                    {/* Glow */}
                    <div
                        className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
                        aria-hidden="true"
                    >
                        <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-500 blur-3xl" />
                    </div>
                    {/* Stripes illustration */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
                        aria-hidden="true"
                    >
                        <img
                            className="max-w-none"
                            src="/images/stripes.svg"
                            width={768}
                            height={432}
                            alt="Stripes"
                        />
                    </div>
                    <div className="px-4 py-12 md:px-12 md:py-20">
                        <h2 className="mb-6 border-y text-3xl font-bold text-gray-700 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.700/.7),transparent)1] md:mb-12 md:text-4xl">
                            Preguntas al Whatsapp
                        </h2>
                        <br />
                        <a href={"https://wa.me/" + number.phone} className="mb-6 border-y text-3xl font-bold text-gray-700 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.700/.7),transparent)1] md:mb-12 md:text-4xl">
                            WHATSAPP: {number.phone}
                        </a>
                        <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center my-5">
                            <a
                                className="btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                                href="#0"
                            >
                                <span className="relative inline-flex items-center">
                                    en Facebook{" "}
                                    <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                                        -&gt;
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
