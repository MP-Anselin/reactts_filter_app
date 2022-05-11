import * as React from 'react';
import EnhancedTable from "./enhancedTable/EnhancedTable";
import {IAccountList} from "../interfaces";

const DataGrids: React.FC<IAccountList> = ({
                                               accountList
                                           }) => {

    return (
        <>
            <EnhancedTable accountList={accountList}/>
        </>
    );
}

export default DataGrids;
