import React from 'react';

interface IProps {
    providers: string[];
}

// @ts-ignore
const StringField: React.FC<IProps> = ({
                                               providers,
                                           }) => {
    return (providers.map((prov: string, index: number) => {

        if (index > 3)
            return null;
        return (
            <div key={index}>
                {index < 2 ? prov : index === 3 ? "..." : <></>}
                <br/>
            </div>
        )
    }));
}

export default StringField;
