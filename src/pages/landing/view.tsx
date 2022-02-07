import React from 'react';
import RouterButton from 'src/components/common/RouterButton';
import { isDevelopment } from 'src/utils';
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
                {isDevelopment() ? (
                    <RouterButton
                        to="/editor"
                        className="mx-auto lg:mx-0 hover:underline bg-black dark:bg-white text-white dark:text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                        Open Editor
                    </RouterButton>
                ) : (
                    <button className="mx-auto lg:mx-0 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                        Coming Soon
                    </button>
                )}
            </div>
            <div className="flex justify-center h-full w-full md:w-2/5 py-6 text-center">
                <img className="h-full w-full" src={resolvePath('/assets/sample.svg')} />
            </div>
        </div>
    </div>
);

export default Landing;
