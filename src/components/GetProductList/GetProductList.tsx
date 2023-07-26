import React, {useState} from 'react';
import {config} from "../../constants";
import useToken from "../../hooks/useToken";
import {throws} from "assert";

export default function GetProductList() {
  const {token} = useToken();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);
    return fetch(`${config.url.API_URL}marketplace/get-product-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        return res.blob();
      })
      .then(
        (result) => {
          if (result.type !== 'application/zip') {
            result.text()
              .then(errText => alert(errText))
            return;
          }

          // setItem(result);
          // Create blob link to download
          const url = window.URL.createObjectURL(
            new Blob([result], {type: 'application/zip'}),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `product-list.zip`,
          );

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          document.body.removeChild(link)
          setSubmitting(false);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
      )
      .catch(error => throws(() => error))
  };

  return (
    <div className="child-wrapper">
      <button disabled={submitting} onClick={onClick}>
        Get Product List
      </button>
    </div>
  );
}
