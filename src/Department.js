import { Component } from "react"; 
import { variables } from './Variables.js';
import DataTable from 'datatables.net-dt';
// import 'datatables.net-buttons-dt';
// import 'datatables.net-responsive-dt';

import $ from 'jquery'; 

export class Department extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            modalTitle: "",
            DepartmentName: "",
            DepartmentId: 0,

            DepartmentIdFilter: "",
            DepartmentNameFilter: "",
            departmentsWithoutFilter: []
        }
    }

    changeDepartmentName = (e) => {
        this.setState({ DepartmentName: e.target.value });
    }
   componentDidMount() {

   
        this.refreshList();
        $(document).ready(function () {
            $('#myTable').DataTable();
        });
       
    }
    
    addClick() {
        this.setState({
            modalTitle: "Add Department",
            DepartmentId: 0,
            DepartmentName: ""
        });
    }
    FilterFn() {

         //console.log(this.state.DepartmentIdFilter);
        var DepartmentIdFilter = this.state.DepartmentIdFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter;

        var filteredData = this.state.departmentsWithoutFilter.filter(
            function (el) {
                return el.DepartmentId.includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.DepartmentName.toString().toLowerCase().includes(
                        DepartmentNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ departments: filteredData });
    }


    changeDepartmentIdFilter=(e)=>
    {
this.state.DepartmentIdFilter=e.target.value;
this.FilterFn();

    }

    changeDepartmentNameFilter =(e)=>
    {
this.state.DepartmentNameFilter=e.target.value;
  //this.FilterFn();
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit Department",
            DepartmentId: dep.id,
            DepartmentName: dep.DepartmentName
        });
    }

sortResult(prop, asc) {
        var sortedData = this.state.departmentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ departments: sortedData });
    }
    refreshList() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8001/department", requestOptions)
            .then(response => response.json())
            .then((result) =>{

                this.setState({departments:result, departmentsWithoutFilter: result});
                //console.log(result);
            },(error)=>{
                console.log('Error');
            } )
            
               
            // let table = new DataTable('#myTable', {
            //     responsive: true,
            //     //bDestroy: true,
            // });


        // fetch(variables.API_URL + 'comments')
        //     .then(response => response.json())
        //     .then(data => {
        //         //this.setState({ departments: data, departmentsWithoutFilter: data });
        //     });
    }
    updateClick() {


        fetch('http://localhost:8001/department/'+this.state.DepartmentId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.DepartmentId,
                DepartmentName: this.state.DepartmentName
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                alert('Update succesfully..')
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:8001/department/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert('Deleted success..');
                    //alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }
    createClick() {
       //this.refreshList();
      // console.log( this.state.DepartmentName);
      var requestOptions = {
        method: 'POST',
        headers:  
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      },
    body: JSON.stringify({
            DepartmentName: this.state.DepartmentName
        }),
        redirect: 'follow'
      };

      fetch("http://localhost:8001/department", requestOptions)
      .then(response => response.json())
      .then((result) => {
            alert("sucessfully added..");
            this.refreshList();
      },(error)=>
        {
          alert('failed this action...')
        })
       // console.log(result)
      
      //.catch(error => console.log('error', error));

    //     fetch(variables.API_URL + 'department', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             DepartmentName: this.state.DepartmentName
    //         })
    //     })
    //         .then(res => res.json())
    //         .then((result) => {
    //             alert(result);
    //             //this.refreshList();
    //         }, (error) => {
    //             alert('Failed');
    //         })
    }
    render() {
        let table = new DataTable('#myTable');
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName
        } = this.state;
        return(

            <div>
            <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => this.addClick()}>
                Add Department
            </button>

            <table className="table table-striped" id='myTable'>
                    <thead>
                        <tr>
                            <th>
                                {/* <div className="d-flex flex-row">

                                    <input className="form-control m-2"
                                        onChange={this.changeDepartmentIdFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div> */}
                                Department Id
                            </th>
                            <th>
                                {/* <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeDepartmentNameFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div> */}
                                Department Name

                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep =>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Department Name</span>
                                    <input type="text" className="form-control"
                                        value={DepartmentName}
                                        onChange={this.changeDepartmentName} />
                                </div>

                                {DepartmentId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {DepartmentId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
            </div>
            </div>
            </div>
            </div>

        )
       
    }
   
      
}