import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function VisitorCount() {
  const URL = 'https://ip.nf/me.json';
  useEffect(() => {
    axios
      .get(URL)
      .then((result) => {
        axios
          .post('/countvisitors', { data: result.data })
          .then((visitResult) => {})
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }, []);
  return <div></div>;
}
