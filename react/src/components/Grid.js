import update from "immutability-helper";
const ReactDataGrid = require("react-data-grid");
const React = require("react");

class EmptyRowsView extends React.Component {
  render() {
    return <div>Nothing to show</div>;
  }
}

class Grid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      {
        key: "username",
        name: "Username",
        resizable: true,
        width: 100,
        locked: true
      },
      {
        key: "name",
        name: "Name",
        resizable: true,
        width: 100,
        editable: true
      },
      {
        key: "surname",
        name: "Surname",
        resizable: true,
        width: 200,
        editable: true
      },
      { key: "stuff", name: "Stuff", resizable: true, width: 2600 }
    ];

    this.state = {
      users: []
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
        this.setState({ users: data });
      });
  };

  rowGetter = i => {
    return this.state.users[i];
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.users;

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
          enableCellSelect={true}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.users.length}
          rowHeight={30}
          minHeight={600}
          maxWidth={200}
          rowScrollTimeout={200}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          emptyRowsView={EmptyRowsView}
        />
      </div>
    );
  }
}

export default Grid;
