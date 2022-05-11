import React from 'react';
import {StyledEngineProvider} from "@mui/material/styles";

import Header from '../components/Header';
import DataGrids from "../components/DataGrids";
import {useGetAccountsQuery} from "../api/accountApi";
import {IAccountData} from "../models/accountData.interface";
import {IAccountDataTable} from "../interfaces";

const HomePage = () => {

    const {data: dataAccountList} = useGetAccountsQuery(undefined);

    const createNewRow = (element: IAccountData): IAccountDataTable => {
        return {
            Code: element.Code,
            Providers: [element.Provider],
            Medias: [element.Media],
            Parameters: [element.Parameter],
            Measure: element.Measure,
            NbrAccount: 1,
            LawlimitEC: {avg: element["Law limit EC"], nbList: [element["Law limit EC"]]},
            LawlimitWHO: {avg: element["Law limit WHO"], nbList: [element["Law limit WHO"]]},
            EQsEC: {avg: element["EQS EC"], nbList: [element["EQS EC"]]},
            EQsWHO: {avg: element["EQS WHO"], nbList: [element["EQS WHO"]]}
        }
    }

    const average = (nbList: number[]): number => {
        const sum = nbList.reduce((a: number, b: number) => a + b, 0);
        return (sum / nbList.length) || 0;
    }

    const addElementInRow = (origin: IAccountDataTable, element: IAccountData): void => {
        if (origin.Code !== element.Code)
            return;

        if (!origin.Providers.includes(element.Provider)) origin.Providers.push(element.Provider);
        if (!origin.Medias.includes(element.Media)) origin.Medias.push(element.Media);
        if (!origin.Parameters.includes(element.Parameter)) origin.Parameters.push(element.Parameter);
        origin.Measure += element.Measure;
        origin.NbrAccount += 1;

        origin.LawlimitEC.nbList.push(element["Law limit EC"]);
        origin.LawlimitEC.avg = average(origin.LawlimitEC.nbList);

        origin.LawlimitWHO.nbList.push(element["Law limit WHO"]);
        origin.LawlimitWHO.avg = average(origin.LawlimitWHO.nbList);

        origin.EQsEC.nbList.push(element["EQS EC"]);
        origin.EQsEC.avg = average(origin.EQsEC.nbList);

        origin.EQsWHO.nbList.push(element["EQS WHO"]);
        origin.EQsWHO.avg = average(origin.EQsWHO.nbList);
    }

    const dataSort = (dataAccountList: IAccountData[] | undefined): IAccountDataTable[] => {
        const AccountMap = new Map();
        const accountGathered: IAccountDataTable[] = [];

        if (!dataAccountList) return [];

        dataAccountList.forEach((el: IAccountData, index) => {
            if (!AccountMap.has(el.Code)) {
                AccountMap.set(el.Code, createNewRow(el));
            } else {
                addElementInRow(AccountMap.get(el.Code), el);
            }
        })
        AccountMap.forEach((el: IAccountDataTable) =>  accountGathered.push(el))
        return accountGathered;
    }

    const dataParse = dataSort(dataAccountList);

    return (
        <div>
            <Header/>
            <StyledEngineProvider injectFirst>
                <DataGrids accountList={dataParse}/>
            </StyledEngineProvider>
        </div>
    );
};

export {HomePage};
