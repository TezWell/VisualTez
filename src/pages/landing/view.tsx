import React from 'react';
import RouterButton from 'src/components/common/RouterButton';
import { resolvePath } from 'src/utils/path';

const Landing: React.FC = () => (
    <div className="pt-20 pb-20">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-evenly">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-center md:items-start text-center md:text-left">
                <p className="uppercase tracking-loose w-full">About the Project</p>
                <h1 className="my-4 text-5xl font-bold leading-tight w-full">VisualTez</h1>
                <p className="leading-normal text-2xl mb-8">
                    A visual programming tool for writing smart contracts in the Tezos blockchain.
                </p>
                <div className="inline-flex spacing-2">
                    <RouterButton
                        to="/editor"
                        className="h-14 inline-flex items-center px-4 text-sm md:text-lg bg-black dark:bg-white text-white dark:text-black font-bold rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                        Open Editor
                    </RouterButton>
                    <a
                        href="/docs"
                        target="_blank"
                        className="h-14 inline-flex items-center px-4 text-sm md:text-lg bg-black dark:bg-white text-white dark:text-black font-bold rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ml-2"
                    >
                        Documentation
                    </a>
                </div>
            </div>
            <div className="flex justify-center h-full w-full md:w-2/5 py-6 text-center">
                <img alt="example" className="h-full w-full" src={resolvePath('/assets/sample.svg')} />
            </div>
        </div>
    </div>
);

export default Landing;
