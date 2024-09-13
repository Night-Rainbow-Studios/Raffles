import React from 'react'

export default function About() {
    return (
        <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900" id="about">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
                        <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
                            Acerca de Nosotros
                        </h2>
                        <br></br>
                        <h2 className="text-3xl font-bold text-gray-200 md:text-2xl">Sorteos entre amigos con base a lotería Nacional</h2>
                        <br></br>
                        <h2 className="text-3xl font-bold text-red-400 md:text-2xl">¡Arriesga poco y gana mucho!</h2>
                    </div>
                    {/* Grid */}
                    <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:p-6 [&>*]:before:absolute [&>*]:before:bg-gray-800 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-gray-800 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] md:[&>*]:p-10">
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                                <svg
                                    className="fill-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                >
                                    <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm1 10a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                                </svg>
                                <span>Seguro</span>
                            </h3>
                            <p className="text-[15px] text-gray-400">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam praesentium pariatur consectetur soluta atque sunt eveniet odit necessitatibus maxime et obcaecati ratione animi reiciendis ab eum, a aperiam corrupti assumenda?
                            </p>
                        </article>
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                                <svg
                                    className="fill-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                >
                                    <path d="M14.29 2.614a1 1 0 0 0-1.58-1.228L6.407 9.492l-3.199-3.2a1 1 0 1 0-1.414 1.415l4 4a1 1 0 0 0 1.496-.093l7-9ZM1 14a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H1Z" />
                                </svg>
                                <span>Rápido</span>
                            </h3>
                            <p className="text-[15px] text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, magnam similique. Nam accusantium beatae inventore tenetur et! Debitis, cumque voluptates dolorum rem, porro nobis deserunt vel aut quidem officiis laudantium.
                            </p>
                        </article>
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                                <svg
                                    className="fill-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                >
                                    <path
                                        d="M2.248 6.285a1 1 0 0 1-1.916-.57A8.014 8.014 0 0 1 5.715.332a1 1 0 0 1 .57 1.916 6.014 6.014 0 0 0-4.037 4.037Z"
                                        opacity=".3"
                                    />
                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.715-6.752a1 1 0 0 1 .57-1.916 8.014 8.014 0 0 1 5.383 5.383 1 1 0 1 1-1.916.57 6.014 6.014 0 0 0-4.037-4.037Zm4.037 7.467a1 1 0 1 1 1.916.57 8.014 8.014 0 0 1-5.383 5.383 1 1 0 1 1-.57-1.916 6.014 6.014 0 0 0 4.037-4.037Zm-7.467 4.037a1 1 0 1 1-.57 1.916 8.014 8.014 0 0 1-5.383-5.383 1 1 0 1 1 1.916-.57 6.014 6.014 0 0 0 4.037 4.037Z" />
                                </svg>
                                <span>Garantizado</span>
                            </h3>
                            <p className="text-[15px] text-gray-400">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ea nisi suscipit magni id debitis ab quod voluptatum, pariatur laboriosam qui quidem repudiandae labore, aut eaque minima odio. Quam, vero!
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}
