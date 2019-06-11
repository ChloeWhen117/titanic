import * as React from 'react';
import axios from 'axios';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';

import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

//TODO: chloen: server side pagination

class Table extends React.PureComponent<{}, IGridProps> {

    private source: IGridProps['source'] = {
        localdata:
            [
                ["Braund, Mr. Owen Harris", "male", 22, "1", 0, "A/5 21171", 7.25, "", 3, "S", 0],
                ["Cumings, Mrs. John Bradley (Florence Briggs Thayer)", "female", 38, "1", 0, "PC 17599", 71.2833, "C85", 1, "C", 1],
                ["Heikkinen, Miss. Laina", "female", 26, "0", 0, "STON/O2. 3101282", 7.925, "", 3, "S", 1],
                ["Futrelle, Mrs. Jacques Heath (Lily May Peel)", "female", 35, "1", 0, "113803", 53.1, "C123", 1, "S", 1],
                ["Allen, Mr. William Henry", "male", 35, "0", 0, "373450", 8.05, "", 3, "S", 0],
                ["McCarthy, Mr. Timothy J", "male", 54, "0", 0, "17463", 51.8625, "E46", 1, "S", 0],
                ["Palsson, Master. Gosta Leonard", "male", 2, "3", 1, "349909", 21.075, "", 3, "S", 0],
                ["Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)", "female", 27, "0", 2, "347742", 11.1333, "", 3, "S", 1],
                ["Nasser, Mrs. Nicholas (Adele Achem)", "female", 14, "1", 0, "237736", 30.0708, "", 2, "C", 1],
                ["Sandstrom, Miss. Marguerite Rut", "female", 4, "1", 1, "PP 9549", 16.7, "G6", 3, "S", 1]
            ],
        datafields:
            [
                { name: 'Name', type: 'string', map: '0' },
                { name: 'Sex', type: 'string', map: '1' },
                { name: 'Age', type: 'int', map: '2' },
                { name: 'SibSp', type: 'string', map: '3' },
                { name: 'Parch', type: 'int', map: '4' },
                { name: 'Ticket', type: 'string', map: '5' },
                { name: 'Fare', type: 'float', map: '6' },
                { name: 'Cabin', type: 'string', map: '7' },
                { name: 'PClass', type: 'int', map: '8' },
                { name: 'Embarked', type: 'string', map: '9' },
                { name: 'Survived', type: 'int', map: '10' }
            ],
        datatype: 'array'
    };

    private columns: IGridProps['columns'] =
        [
            { text: 'Passenger Name', datafield: 'Name'},
            { text: 'Sex', datafield: 'Sex'},
            { text: 'Age', datafield: 'Age'},
            { text: 'Number of Sibling/Spouse Aboard', datafield: 'SibSp'},
            { text: 'Number of Parent/Child aboard', datafield: 'Parch' },
            { text: 'Ticket', datafield: 'Ticket' },
            { text: 'Fare', datafield: 'Fare' },
            { text: 'Cabin', datafield: 'Cabin' },            
            { text: 'Class of Travel', datafield: 'PClass' },
            { text: 'Port Embarked', datafield: 'Embarked' },
            { text: 'Survived', datafield: 'Survived' }
        ];

    constructor(props: {}) {
        super(props);

        this.state = {
            columns: this.columns
        };
    }

    public componentDidMount() {
        axios
            .get('http://localhost:5000/api/passengers/all')
            .then((res) => {
                let data_arr = [];
                res.data.forEach(passenger => {
                    let arr = [];
                    arr.push(passenger.Name);
                    arr.push(passenger.Sex);
                    arr.push(passenger.Age);
                    arr.push(passenger.SibSp);
                    arr.push(passenger.Parch);
                    arr.push(passenger.Ticket);
                    arr.push(passenger.Fare);
                    arr.push(passenger.Cabin);
                    arr.push(passenger.PClass);
                    arr.push(passenger.Embarked);
                    arr.push(passenger.Survived);
                    data_arr.push(arr);
                });
                this.source.localdata = data_arr;
            })
            .catch((error) => {
                // handle error
                console.log(error);
              });
    }

    public render() {
        let dataAdapter = new jqx.dataAdapter(this.source);
        return (
            <JqxGrid
                width={850} source={dataAdapter} columns={this.state.columns}
                pageable={true} autoheight={true} sortable={true} theme={'material-purple'}
                altrows={true} enabletooltips={true} editable={true}
            />
        );
    }
}

export default Table;