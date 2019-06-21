import * as React from 'react';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxPanel from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxpanel';

//TODO: chloen: server side pagination

class Table extends React.PureComponent<{}, IGridProps> {

    private myGrid = React.createRef<JqxGrid>();
    private myPanel = React.createRef<JqxPanel>();
    private pagingInfo = React.createRef<HTMLDivElement>();
    private eventsLog = React.createRef<HTMLDivElement>();

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
        this.onPageChanged = this.onPageChanged.bind(this);
        this.onPageSizeChanged = this.onPageSizeChanged.bind(this);
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
            <div>
                <JqxGrid
                    theme={'material-purple'} ref={this.myGrid} 
                    onPagechanged={this.onPageChanged} onPagesizechanged={this.onPageSizeChanged}
                    width={'100%'} source={dataAdapter} columns={this.state.columns}
                    pageable={true} sortable={true} columnsresize={true}
                    autoheight={true} selectionmode={'multiplerowsextended'}
                />
                <div ref={this.eventsLog} style={{ display: 'none', marginTop: '30px' }}>
                    <div style={{ float: 'left' }}>
                        Event Log:
                        <JqxPanel theme={'material-purple'} ref={this.myPanel} style={{ border: 'none' }} width={300} height={300} />
                    </div>
                    <div style={{ float: 'left' }}>
                        Paging Details:
                        <div ref={this.pagingInfo} />
                    </div>
                </div>
            </div>
        );
    }

    private onPageChanged(event: any): void {
        this.eventsLog.current!.style.display = 'block';
        const loggedElements = document.getElementsByClassName('logged');
        if (loggedElements.length >= 5) {
            this.myPanel.current!.clearcontent();
        }
        const args = event.args;
        const eventData = 'pagechanged <div>Page:' + args.pagenum + ', Page Size: ' + args.pagesize + '</div>';
        this.myPanel.current!.prepend('<div class="logged" style="margin-top: 5px;">' + eventData + '</div>');
        // get page information.
        const paginginformation = this.myGrid.current!.getpaginginformation();
        this.pagingInfo.current!.innerHTML = '<div style="margin-top: 5px;">Page:' + paginginformation.pagenum + ', Page Size: ' + paginginformation.pagesize + ', Pages Count: ' + paginginformation.pagescount + '</div>';
    }

    private onPageSizeChanged(event: any): void {
        this.eventsLog.current!.style.display = 'block';
        this.myPanel.current!.clearcontent();
        const args = event.args;
        const eventData = 'pagesizechanged <div>Page:' + args.pagenum + ', Page Size: ' + args.pagesize + ', Old Page Size: ' + args.oldpagesize + '</div>';
        this.myPanel.current!.prepend('<div style="margin-top: 5px">' + eventData + '</div>');
        // get page information.
        const paginginformation = this.myGrid.current!.getpaginginformation();
        this.pagingInfo.current!.innerHTML = '<div style="margin-top: 5px;">Page:' + paginginformation.pagenum + ', Page Size: ' + paginginformation.pagesize + ', Pages Count: ' + paginginformation.pagescount + '</div>';
    }
}

export default Table;