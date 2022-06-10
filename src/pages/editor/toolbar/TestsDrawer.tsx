import React from 'react';

import { filterCompilationKind, Target, TestCompilation } from 'src/blocks';
import Button from 'src/components/common/Button';
import useEditor from 'src/context/hooks/useEditor';
import ConditionalRender from 'src/components/common/ConditionalRender';
import TestModal from './modal/TestModal';

interface TabInfoProps {
    title: string;
    items: number;
}

const TabInfo: React.FC<TabInfoProps> = ({ title, items }) => (
    <div className="flex items-center justify-between w-full">
        <h1 className="font-mono text-ellipsis overflow-hidden">{title}</h1>
        <span className="ml-2 pr-4 pl-4 font-mono border rounded-full text-yellow-400 border-yellow-400">{items}</span>
    </div>
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TestsDrawerProps {}

const TestsDrawer: React.FC<TestsDrawerProps> = () => {
    const [testCompilation, setTestCompilation] = React.useState<TestCompilation>();
    const { state } = useEditor();

    const testCompilations = React.useMemo(
        () => (state.compilations || []).filter(filterCompilationKind<TestCompilation>(Target.Test)),
        [state.compilations],
    );

    return (
        <div className="flex-1 flex h-full w-full flex-col justify-stretch">
            <div className="flex items-center justify-between p-5 border-b border-t">
                <TabInfo title="Tests" items={testCompilations.length} />
            </div>
            <div className="grow basis-0 border-t p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                {testCompilations.map((compilation) => (
                    <div
                        key={compilation.result.name}
                        className="mb-3 bg-white shadow-lg rounded-md p-3 dark:bg-black border-2 border-black dark:border-white"
                    >
                        <div className="flex items-center justify-center text-xl text-center align-middle font-mono p-2 border-2 rounded-lg mb-3">
                            <p className="text-ellipsis overflow-hidden">{compilation.result.name}</p>
                        </div>
                        <Button
                            fullWidth
                            onClick={() => setTestCompilation(compilation)}
                            className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 mb-2 p-1"
                        >
                            Run Test
                        </Button>
                    </div>
                ))}
            </div>
            <ConditionalRender
                props={{
                    compilation: testCompilation,
                }}
            >
                {(props) => <TestModal onClose={() => setTestCompilation(undefined)} {...props} />}
            </ConditionalRender>
        </div>
    );
};

export default TestsDrawer;
