import React from 'react';
import RouterButton from 'src/components/common/RouterButton';
import { resolvePath } from 'src/utils/path';

const Landing = () => (
    <div className="pt-10 pb-10">
        <div className="container px-3 mx-auto flex flex-wrap flex-col lg:flex-row items-center justify-evenly">
            <div className="flex flex-col w-full md:w-4/5 lg:w-2/5 justify-center items-center lg:items-start text-center lg:text-left">
                <p className="uppercase tracking-loose w-full">About the Project</p>
                <h1 className="my-4 text-5xl font-bold leading-tight w-full">VisualTez</h1>
                <p className="leading-normal text-2xl mb-8">
                    A visual programming tool for writing and testing smart contracts in the Tezos blockchain.
                </p>
                <div className="inline-flex p-2">
                    <RouterButton
                        to="/editor"
                        className="h-14 bg-yellow-500 hover:bg-yellow-400 border-2 border-yellow-700 hover:border-yellow-500 px-4 text-sm lg:text-lg text-white dark:text-black font-bold rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                        Open Editor
                    </RouterButton>
                    <a
                        href="/docs"
                        target="_blank"
                        className="h-14 inline-flex items-center px-4 text-sm lg:text-lg bg-black dark:bg-white text-white dark:text-black font-bold rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ml-2"
                    >
                        Documentation
                    </a>
                    <RouterButton
                        to="/releases"
                        className="h-14 px-4 text-sm lg:text-lg bg-black dark:bg-white text-white dark:text-black font-bold rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ml-2"
                    >
                        Releases
                    </RouterButton>
                </div>
            </div>
            <div className="flex justify-center h-full w-full lg:w-2/5 py-6 text-center">
                <img alt="example" className="h-full w-full" src={resolvePath('/assets/sample2.svg')} />
            </div>
        </div>
    </div>
);

export default Landing;
