import * as yup from "yup";

const loginFormSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 20 characters"),
    // .matches(
    //   /^[a-zA-Z0-9._-]+$/,
    //   "Username can only contain letters, numbers, dots, underscores, and dashes"
    // ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  })
  .required();

const driverFormSchema = yup
  .object({
    fullname: yup
      .string()
      .required("Fullname is required")
      .min(1, "Fullname must be at least 3 characters")
      .max(30, "Fullname cannot exceed 20 characters"),
    phone: yup
      .string()
      .required("Phone is required")
      .length(10, "Phone must be at least 10 characters")
      .matches(/[0-9]/, "Phone must contain number"),
    licenseNumber: yup
      .string()
      .required("License number is required")
      .length(12, "License number must be at least 12 characters")
      .matches(/[0-9]/, "License number must contain number"),
    address: yup
      .string()
      .required("Address is required")
      .min(1, "Address must be at least 3 characters")
      .max(100, "Address cannot exceed 100 characters"),

  })
  .required();

const vehicleFormSchema = yup
  .object({
    licensePlate: yup
      .string()
      .required("License plate is required"),
    driverId: yup
      .string()
      .required("Driver is required"),
    brand: yup
      .string()
      .required("Brand is required"),
    capacity: yup
      .number()
      .required("Capacity is required")
      .min(4, "Capacity must be at least 4")
      .max(45, "Capacity must be greater than or equal to 45"),
    // model: yup
    //   .string()
    //   .required("Model is required")
    //   .min(1, "Model must be at least 3 characters")
    //   .max(100, "Model cannot exceed 100 characters"),

  })
  .required();

const routeFormSchema = yup
  .object({
    startPoint: yup
      .string()
      .required("Start point is required"),
    endPoint: yup
      .string()
      .required("End point is required"),
    distance: yup
      .number()
      .required("Distance is required")
      .min(10, "Distance must be at least 10 km"),
    estimateTime: yup
      .number()
      .required("Estimate time is required")
      .min(1, "Estimate time must be at least 1 hour")
  })
  .required();

const scheduleFormSchema = yup
  .object({
    routeId: yup
      .string()
      .required("Route is required"),
    date: yup
      .string()
      .required("Date is required"),
    time: yup
      .string()
      .required("Time is required"),
    vehicleIds: yup
      .array()
      .of(
        yup.string()
          .required("Vehicle is required")
      )
      .min(1, "At least one vehicle is required"),
    status: yup
      .string()
      .oneOf(
        ["scheduled", "ongoing", "cancelled", "completed"],
        "Invalid status"
      )
  })
  .required();


const bookingFormSchema = yup
  .object({
    scheduleId: yup.string().required("Schedule is required"),
    pickUpLocation: yup
      .string()
      .required("Pick up location is required"),
    dropOffLocation: yup
      .string()
      .required("Drop off location is required"),
    customerName: yup
      .string()
      .required("Name location is required"),
    customerPhone: yup
      .string()
      .length(10, "Phone must be at least 10 characters")
      .required("Phone number location is required"),
    date: yup
      .string()
      .required("Date is required"),
    time: yup
      .string()
      .required("Time is required"),
  })
  .required();

const searchFormSchema = yup
  .object({
    searchInput: yup
      .string()
      .required("Search field is required")
  })
  .required();


const schemas = {
  loginFormSchema,
  driverFormSchema,
  searchFormSchema,
  vehicleFormSchema,
  routeFormSchema,
  scheduleFormSchema,
  bookingFormSchema
};

export default schemas;
