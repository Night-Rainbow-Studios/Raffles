import React from 'react'
import { Link } from 'react-router-dom';
import Tickets_List from '../components/tickets';
import ConsultOrder from '../components/orderConsultor';
import GenerateDb from '../components/generateDb';
import ClearRaffleButton from '../components/clearRaffleButton';
import PayOrder from '../components/payOrder';
import CloseOrder from '../components/closeOrder';
import WinRaffle from '../components/winRaffle';

export default function AdminDashboard() {
    return (
        <section className='bg-slate-200'>
            <header className='flex max-w-full justify-end m-3 md:m-5 p-2 md:p-4 bg-neutral-800 font-mono font-bold sticky top-0'>
                <Link to={'/'} className='bg-gray-200 m-1 p-1 rounded-sm text-slate-950 text-lg hover:bg-gray-400 hover:text-slate-200'>Inicio</Link>
                <a href='#edit' className=' m-1 p-1 text-lg rounded-sm bg-yellow-400 text-slate-800 hover:bg-yellow-700 hover:text-slate-300'>Editar</a>
            </header>

            <div className='md:flex justify-around'>
                <label id='edit' className='flex md:grid max-w-full justify-between m-3 p-2 border-2 border-black rounded bg-white'>
                <h1 className='p-1 overline font-sans font-semibold'>Editar titulo:</h1>
                    <div className='flex'>
                        <input type='text' id='title' name="titleEdit" className='m-1 p-3 border-2 border-black bg-slate-100 focus:outline-none focus:ring-blue-500 focus:border-cyan-600' placeholder='Titulo'/>
                        <button type='submit' className='m-2 p-2 border-2 border-black rounded hover:bg-gray-800 hover:text-white placeholder-slate-400'>Enviar</button>
                    </div>
                </label>
                {/* <label className='flex md:grid max-w-full justify-between m-3 p-2 border-2'> 
                <h1 className='text-bold font-sans font-semibold'>Buscar boletos</h1>
                <div className='flex'>
                    <input type='text' id='ticketsAmount' className='m-3 block p-3 md:m-1 md:p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' placeholder='Número de boleto  '/>
                    <button type="submit" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-blue-800 my-2">
                        Buscar</button>
                    </div>
                </label> */}
                {/* <label className='flex md:grid max-w-full justify-between m-3 p-2 border-2'> 
                <h1 className='text-bold font-sans font-semibold'>Buscar orden</h1>
                <div className='flex'>
                    <input type='text' id='ticketsAmount' className='m-3 block p-3 md:m-1 md:p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' placeholder='Número de orden'/>
                    <button type="submit" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-blue-800 my-2">
                        Buscar</button>
                    </div>
                </label> */}
            <ConsultOrder/>
            </div>

            <div className='bg-white max-w-full m-2 md:m-4 p-2 md: p-3'>
                <h1 className='text-center font-sans font-bold underline'>Editar contenido: Hasta 4 renglones</h1>
                <input type='text' id='content1' className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' placeholder='Linea 1'/> <br/>
                <input type='text' id='content2' className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' placeholder='Linea 2'/> <br/>
                <input type='text' id='content3' className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' placeholder='Linea 3'/> <br/>
                <input type='text' id='content4' className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' placeholder='Linea 4'/> <br/>
      <button type="submit" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-blue-800">Enviar</button>
            </div>
            {/* <div className='md:flex md:justify-around'>
                <div className='m-3 p-2 bg-white max-w-full border-2 border-slate-500'>
                    <h1 className='font-sans font-bold underline'>Generar Base de datos de boletos</h1>
                    <label >Elegir cantidad
                        <input type='text' id='ticketsAmount' className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' placeholder='Ingresar cantidad'/>
                    </label>
                    <button type="submit" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-blue-800 my-2">Generar</button>
                </div>
                <div className='m-2 md:m-5 p-2 md:p-5'>
                    <button className='bg-red-700 text-white rounded p-4 font-sans font-bold hover:bg-red-500'>Eliminar base de datos de boletos</button>
                </div>
            </div> */}
            <GenerateDb/>
            <ClearRaffleButton/>
            <PayOrder/>
            <CloseOrder/>
            <WinRaffle/>
            <div>
                <Tickets_List/>
            </div>
        </section>
    )
}
