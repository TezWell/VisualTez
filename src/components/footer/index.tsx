import React from 'react';
import { Link } from 'react-router-dom';

import { resolvePath } from 'src/utils/path';
import DiscordIcon from 'src/components/common/icons/Discord';
import EmailIcon from 'src/components/common/icons/Email';
import GithubIcon from 'src/components/common/icons/Github';
import TelegramIcon from 'src/components/common/icons/Telegram';
import TwitterIcon from 'src/components/common/icons/Twitter';
import GlobeIcon from 'src/components/common/icons/Globe';

const Footer = () => (
    <footer className="bg-white dark:bg-black border-t border-black dark:border-white">
        <div className="container mx-auto p-8">
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="flex-1 text-black h-32 pb-10 md:pb-0">
                    <Link to="/">
                        <img className="h-24 md:h-full" src={resolvePath('/assets/logo.svg')} />
                    </Link>
                </div>
                <div className="w-full flex-1 flex flex-col md:flex-row items-start justify-center text-black dark:text-white">
                    <div className="flex-1 mb-6 md:mb-0">
                        <p className="uppercase text-gray-500 md:mb-6">Links</p>
                        <ul className="list-reset">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/contact" className="flex no-underline hover:text-yellow-500">
                                    <EmailIcon />
                                    <p className="ml-2">Contact</p>
                                </Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a
                                    href="https://github.com/TezWell/VisualTez"
                                    target="_blank"
                                    className="flex no-underline hover:text-yellow-500"
                                >
                                    <GithubIcon />
                                    <p className="ml-2">Github</p>
                                </a>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/nodes" className="flex no-underline hover:text-yellow-500">
                                    <GlobeIcon />
                                    <p className="ml-2">Public Nodes</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 mb-6 md:mb-0">
                        <p className="uppercase text-gray-500 md:mb-6">Legal</p>
                        <ul className="list-reset">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/privacy" className="flex hover:text-yellow-500">
                                    Privacy
                                </Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to="/terms" className="flex hover:text-yellow-500">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-gray-500 md:mb-6">Social</p>
                        <ul className="list-reset">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a href="https://t.me/VisualTez" target="_blank" className="flex hover:text-yellow-500">
                                    <TelegramIcon />
                                    <p className="ml-2">Telegram</p>
                                </a>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a
                                    href="https://discord.gg/JKVwgBQPzh"
                                    target="_blank"
                                    className="flex hover:text-yellow-500"
                                >
                                    <DiscordIcon />
                                    <p className="ml-2">Discord</p>
                                </a>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <a
                                    href="https://twitter.com/VisualTez"
                                    target="_blank"
                                    className="flex hover:text-yellow-500"
                                >
                                    <TwitterIcon />
                                    <p className="ml-2">Twitter</p>
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
