import * as React from 'react';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

//TODO: chloen: server side pagination

class Table extends React.PureComponent<{}, IGridProps> {

    private source: IGridProps['source'] = {
    };

    private columns: IGridProps['columns'] =
        [
            { text: 'Passenger Name', datafield: 'Name', width: 250 },
            { text: 'Sex', datafield: 'Sex', width: 100},
            { text: 'Age', datafield: 'Age'},
            { text: '# of Sibling/Spouse Aboard', datafield: 'SibSp', width: 80},
            { text: '# of Parent/Child aboard', datafield: 'Parch', width: 80 },
            { text: 'Ticket', datafield: 'Ticket', width: 160 },
            { text: 'Fare', datafield: 'Fare', width: 80 },
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

    public render() {
        let source = {
            datafields:
                [
                    { name: 'Name', type: 'string' },
                    { name: 'Sex', type: 'string' },
                    { name: 'Age', type: 'int' },
                    { name: 'SibSp', type: 'string' },
                    { name: 'Parch', type: 'int' },
                    { name: 'Ticket', type: 'string' },
                    { name: 'Fare', type: 'float' },
                    { name: 'Cabin', type: 'string' },
                    { name: 'PClass', type: 'int' },
                    { name: 'Embarked', type: 'string' },
                    { name: 'Survived', type: 'int' }
                ],
            datatype: 'json',
            content: "data",
            url: "http://localhost:5000/api/passengers/all"
        };
        let dataAdapter = new jqx.dataAdapter(source, {
            loadComplete: () => {
              // get data records.
              var records = dataAdapter.records;
              this.source.localdata = records;
            }
          });
        return (
            <JqxGrid
                width={1280} source={dataAdapter} columns={this.state.columns}
                pageable={true} autoheight={true} sortable={true} theme={'material-purple'}
                altrows={true} enabletooltips={true} editable={true}
            />
        );
    }
}

export default Table;