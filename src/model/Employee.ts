export class Employee {

    public employeeId:number;
    public employeeName: string;
    public email: string;
    public contactNumber: string;
    public address: string;
    public position: string;


    constructor(employeeName: string, email: string, contactNumber: string, address: string, position: string,employeeId:number) {
        this.employeeName = employeeName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.position = position;
        this.employeeId=employeeId;


    }

}