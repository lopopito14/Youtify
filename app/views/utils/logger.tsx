/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import React from "react";

const logger = () => {
    // const [logOptions] = React.useState('color: blue;');
    // const [warningOptions] = React.useState('color: yellow');
    // const [errorOptions] = React.useState('color: red');

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const log = React.useCallback((message: any) => {
        console.log(`${message}`);
    }, []);

    const warning = React.useCallback((message: any) => {
        console.warn(`${message}`);
    }, []);

    const error = React.useCallback((message: any) => {
        console.error(`${message}`);
    }, []);

    return { log, warning, error };
}

export default logger;