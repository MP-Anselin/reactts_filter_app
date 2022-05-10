import React from 'react';
import Header from '../components/Header';
import {useGetAccountsQuery} from "../api/accountApi";

const HomePage = () => {

    const {data: accountsData} = useGetAccountsQuery(undefined);

    console.log("DAT1A => ", accountsData);
    return (
    <div>
      <Header />
    </div>
  );
};

export { HomePage };
