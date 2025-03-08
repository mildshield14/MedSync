import { useState, useEffect } from 'react';

const useElementSize = (ref: any, breakpoints: any) => {
    const [sizeLabel, setSizeLabel] = useState<string | null>(null);


    useEffect(() => {
        const calculateSize = () => {
            if (ref.current) {
                const width = ref.current.offsetWidth;

                if (width >= breakpoints.small.min && width <= breakpoints.small.max) {
                    setSizeLabel('small');
                } else if (width >= breakpoints.medium.min && width <= breakpoints.medium.max) {
                    setSizeLabel('medium');
                } else if (width >= breakpoints.large.min && width <= breakpoints.large.max) {
                    setSizeLabel('large');
                } else if (width >= breakpoints.extra.min) {
                    setSizeLabel('extra');
                }
            }
        };

        calculateSize();

        const resizeObserver = new ResizeObserver(calculateSize);
        resizeObserver.observe(ref.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref, breakpoints]);

    return sizeLabel;
};

export default useElementSize;