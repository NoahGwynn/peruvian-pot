import React from 'react';

function ScreenContainer({children}) {
    return (
        <main className={"screen-container"}>
            {children}
        </main>
    );
}

export default ScreenContainer;