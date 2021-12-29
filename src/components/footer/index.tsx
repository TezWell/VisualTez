import React from 'react';
import { Link } from 'react-router-dom';
import { resolvePath } from 'src/utils/path';

const Footer = () => (
    <footer className="bg-white dark:bg-black border-t border-black dark:border-white">
        <div className="container mx-auto p-8">
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="flex-1 text-black h-32">
                    <Link to="/">
                        <img className="h-full" src={resolvePath('/assets/logo.svg')} />
                    </Link>
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-start justify-center text-black dark:text-white">
                    <div className="flex-1">
                        <p className="uppercase text-gray-500 md:mb-6">Links</p>
                        <ul className="list-reset">
                            {/* <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/faq" className="no-underline hover:underline hover:text-pink-500">
                                    FAQ
                                </Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/docs" className="no-underline hover:underline hover:text-pink-500">
                                    Documentation
                                </Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/about" className="no-underline hover:underline hover:text-pink-500">
                                    About
                                </Link>
                            </li> */}
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/contact" className="no-underline hover:underline hover:text-yellow-500">
                                    Contact
                                </Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a
                                    href="https://github.com/TezWell/VisualTez"
                                    target="_blank"
                                    className="no-underline hover:underline hover:text-yellow-500"
                                >
                                    Repository
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-gray-500 md:mb-6">Legal</p>
                        <ul className="list-reset">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/privacy" className="no-underline hover:underline hover:text-yellow-500">
                                    Privacy
                                </Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/terms" className="no-underline hover:underline hover:text-yellow-500">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-gray-500 md:mb-6">Social</p>
                        <ul className="list-reset">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a
                                    href="https://t.me/VisualTez"
                                    target="_blank"
                                    className="no-underline hover:underline hover:text-yellow-500"
                                >
                                    Telegram
                                </a>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a
                                    href="https://discord.gg/JKVwgBQPzh"
                                    target="_blank"
                                    className="no-underline hover:underline hover:text-yellow-500"
                                >
                                    Discord
                                </a>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a
                                    href="https://twitter.com/hashtag/VisualTez"
                                    target="_blank"
                                    className="no-underline hover:underline hover:text-yellow-500"
                                >
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
