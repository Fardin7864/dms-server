import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const getEmployee = asyncHandler (async (req, res) => { 
    try {
        const employees = await Employee.find()
        return res
            .status(200)
            .json(new ApiResponse(200, employees, "Find all employees successfully!"))
    } catch (error) {
        throw new ApiError(500, "Faild to load employees!")
    }
 })

const getSingleEmployee = asyncHandler (async (req,res) => { 
    try {
        const {id} = req.params;
        console.log(id)
        const employee = await Employee.findById(id);
        return res
                .status(200)
                .json(new ApiResponse(200, employee, "Employee loaded!"))       
    } catch (error) {
        throw new ApiError(500, "Single employee faild to load!")
    }
 })

const employeeAddController = asyncHandler ( async (req,res) => { 
    console.log(req.body)
    let {employeeName, email, company, designation, mobile, startingDate} = req.body;
    employeeName = employeeName?.toLowerCase();
    email = email?.toLowerCase();
    designation = designation?.toLowerCase();
    mobile = mobile?.toLowerCase();
    // startingDate = startingDate?.toLowerCase();


    if([employeeName, email, company, designation, mobile].some((field) =>  field?.trim() === "")) throw new ApiError(400, "EmployeeName, email, designation, mobile and company required!")

    const employee = await Employee.create({
        employeeName,
        email,
        designation,
        mobile,
        startingDate: new Date(),
        company
    })

    console.log(employee)

    return res
        .status(200)
        .json(new ApiResponse(200, employee, "Employee added succefully!"))
 }
 );

 const employeeUpdate = asyncHandler(async (req, res) => { 
    const id  = req.params.id;
    if(!id) throw ApiError(400, "Id is requred to update employee!");

    let {employeeName, email, company, designation, mobile, startingDate} = req.body;

    employeeName = employeeName.toLowerCase();
    email = email.toLowerCase();
    designation = designation.toLowerCase();
    mobile = mobile.toLowerCase();


    if([employeeName, email, company, designation, mobile].some((field) =>  field.trim() === "")) throw new ApiError(400, "EmployeeName, email, designation, mobile and company required!")

    const updatedEmployee = {
        employeeName,
        email,
        designation,
        mobile,
        company
    }

    const findEmployee = await Employee.findByIdAndUpdate(id, updatedEmployee, {new: true});


    return res
        .status(200)
        .json(new ApiResponse(200, findEmployee, "Employee updated succefully!"))
  })

const deleteEmployee = asyncHandler (async (req,res) => { 
    const id = req.params.id;
    if(!id) throw ApiError(400, "Id is requred to delete employee!");

    const deleteEmployee = await Employee.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, deleteEmployee, "Employee deleted successfylly!"))
    

 })

 export {getEmployee, getSingleEmployee, employeeAddController, employeeUpdate, deleteEmployee }