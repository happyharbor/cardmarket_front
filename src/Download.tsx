import * as React from 'react';
import {useState} from 'react';

interface Props {
    error: {
        message: string
    } | null,
    item: any,
    isLoaded: boolean | null,
}

export const Download: React.FC<Props> = (props) => {
    const [error, setError] = useState(props.error);
    const [isLoaded, setIsLoaded] = useState(props.isLoaded);
    // const [item, setItem] = useState(props.item);

    const onClick = () => {
        setIsLoaded(false);
        fetch("https://www.learningcontainer.com/download/sample-text-file/?wpdmdl=1669&refresh=60684b80f027c1617447808", {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain'
                },
            })
            .then(res => res.blob())
            .then(
                (result) => {
                    setIsLoaded(true);
                    // setItem(result);
                    // Create blob link to download
                    const url = window.URL.createObjectURL(
                        new Blob([result]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `text.txt`,
                    );

                    // Append to html link element page
                    document.body.appendChild(link);

                    // Start download
                    link.click();

                    // Clean up and remove the link
                    document.body.removeChild(link)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    };

    const list = (() => {
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded !== null && !isLoaded) {
            return <div>Loading...</div>;
        }
        // else {
        //     return <div>{item}</div>;
        // }
    })();

    return <div>
        <button onClick={onClick}>
            Get Sample3.txt
        </button>
        {list}
    </div>
};