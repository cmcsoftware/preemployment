import update from "immutability-helper";
const {
  Toolbar,
  Data: { Selectors }
} = require("react-data-grid-addons");
const ReactDataGrid = require("react-data-grid");
const React = require("react");

class EmptyRowsView extends React.Component {
  render() {
    return (
      <div className="container">
        <div
          className="row"
          style={{ paddingTop: "20px", paddingLeft: "400px" }}
        >
          <div className="col-md-6">
            <p>Nothing to show</p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: "username",
        name: "Username",
        resizable: true,
        width: 100,
        locked: true,
        filterable: true,
        sortable: true
      },
      {
        key: "name",
        name: "Name",
        resizable: true,
        width: 100,
        editable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "surname",
        name: "Surname",
        resizable: true,
        width: 200,
        editable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "stuff",
        name: "Stuff",
        resizable: true,
        width: 2600,
        editable: true,
        filterable: true,
        sortable: true
      }
    ];

    this.state = {
      rows: this.createRows(),
      filters: {},
      sortColumn: null,
      sortDirection: null
    };
  }

  createRows = () => {
    let url = "http://192.168.209.75:8080/user/getAllUsers";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("response", data);
        this.setState({ rows: data });
      });
  };

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = rowIdx => {
    const rows = this.getRows();
    return rows[rowIdx];
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  };

  handleFilterChange = filter => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    console.log(newFilters);
    console.log(filter);
    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows;

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];

      let updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;

      let url = "http://192.168.209.75:8080/user/updateUser";
      const response = fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: rows[i].username,
          password: rows[i].password,
          name: rows[i].name,
          surname: rows[i].surname,
          stuff: rows[i].stuff
        })
      });
    }

    this.setState({ rows });
  };

  render() {
    return (
      <div className="container">
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          rowHeight={30}
          minHeight={600}
          maxWidth={200}
          rowScrollTimeout={200}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          toolbar={<Toolbar enableFilter={true} />}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          emptyRowsView={EmptyRowsView}
        />
      </div>
    );
  }
}

export default Grid;
