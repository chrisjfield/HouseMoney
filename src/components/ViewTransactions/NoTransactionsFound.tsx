import * as React from 'react';

export const NoTransactionsFound: React.StatelessComponent = () => {
    const notFound = (
        <div>
            {' '}
            No transactions found. <p />
            Hint: you can click the plus button at the top right of the screen to add transactions.
            {' '}
        </div>
    );
    return notFound;
};
